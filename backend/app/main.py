"""Main Flask application."""
import logging
import sys
import time
from pathlib import Path
from flask import Flask, jsonify, request, g
from flask_cors import CORS
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
import atexit
from apscheduler.schedulers.background import BackgroundScheduler

# Add parent directory to path to import config
sys.path.insert(0, str(Path(__file__).parent.parent))
from config import Config
from app.routes.upload import upload_bp
from app.routes.preview import preview_bp
from app.routes.merge import merge_bp
from app.services.file_manager import FileManager
from app.models.schemas import HealthResponse
from app.utils.middleware import add_request_id, log_request_time, get_request_id
from app.utils.metrics import metrics, get_system_stats, get_folder_size

# Ensure directories exist before configuring logging
Config.ensure_directories()

# Configure logging
logging.basicConfig(
    level=getattr(logging, Config.LOG_LEVEL),
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler(Config.LOG_FILE),
        logging.StreamHandler()
    ]
)

logger = logging.getLogger(__name__)

# Optional compression - install Flask-Compress for better performance
try:
    from flask_compress import Compress
    COMPRESS_AVAILABLE = True
except ImportError:
    COMPRESS_AVAILABLE = False
    logger.warning("Flask-Compress not installed. Install it for better performance: pip install Flask-Compress")

# Create Flask app
app = Flask(__name__)
app.config.from_object(Config)

# Enable CORS
# Log CORS origins for debugging
logger.info(f"CORS Origins: {Config.CORS_ORIGINS}")

CORS(app, 
    resources={
        r"/api/*": {
            "origins": Config.CORS_ORIGINS,
            "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
            "allow_headers": ["Content-Type", "Authorization", "X-Requested-With"],
            "supports_credentials": True,
            "expose_headers": ["Content-Type", "Content-Disposition", "X-Request-ID", "X-Response-Time", "X-Thumbnail-Generation-Time"]
        }
    },
    supports_credentials=True,
    automatic_options=True)

# Add response compression for faster transfers (gzip/brotli) - optional
if COMPRESS_AVAILABLE:
    compress = Compress()
    compress.init_app(app)
    logger.info("Response compression enabled")
else:
    logger.info("Response compression disabled (Flask-Compress not installed)")

# Rate limiting
limiter = Limiter(
    app=app,
    key_func=get_remote_address,
    default_limits=[Config.RATE_LIMIT],
    storage_uri="memory://",  # Use in-memory storage for better performance
    default_limits_per_method=True
)

# Directories already ensured above

# Initialize file manager
file_manager = FileManager(Config.UPLOAD_FOLDER)
app.config['file_manager'] = file_manager

# Initialize job manager (in-memory for now)
app.config['job_manager'] = {}

# Store app start time for health check
app.config['start_time'] = time.time()

# Register blueprints
app.register_blueprint(upload_bp, url_prefix='/api')
app.register_blueprint(preview_bp, url_prefix='/api')
app.register_blueprint(merge_bp, url_prefix='/api')


# Add middleware for request tracking
@app.before_request
def before_request():
    """Add request ID and start timing."""
    add_request_id()
    if request.method == 'OPTIONS':
        logger.debug(f"OPTIONS preflight request from origin: {request.headers.get('Origin', 'None')}")


@app.after_request
def after_request(response):
    """Log request completion and record metrics."""
    # Record metrics
    duration = time.time() - g.start_time
    endpoint = request.endpoint or 'unknown'
    metrics.record_request(endpoint, duration, response.status_code)
    
    # Add request ID to response headers
    response.headers['X-Request-ID'] = get_request_id()
    response.headers['X-Response-Time'] = f"{duration:.3f}s"
    
    # Log request completion
    log_request_time()
    
    return response



# Health check endpoint
@app.route('/api/health', methods=['GET'])
def health_check():
    """Enhanced health check endpoint with system stats."""
    uptime = time.time() - app.config['start_time']
    
    # Get system statistics
    system_stats = get_system_stats()
    
    # Get folder sizes
    upload_size = get_folder_size(Config.UPLOAD_FOLDER)
    thumbnail_size = get_folder_size(Config.THUMBNAIL_FOLDER)
    merged_size = get_folder_size(Config.MERGED_FOLDER)
    
    # Get metrics
    app_metrics = metrics.get_stats()
    
    response = {
        'status': 'healthy',
        'version': '1.0.0',
        'uptime_seconds': round(uptime, 2),
        'uptime_human': f"{int(uptime // 3600)}h {int((uptime % 3600) // 60)}m {int(uptime % 60)}s",
        'system': system_stats,
        'storage': {
            'uploads_mb': round(upload_size / (1024 * 1024), 2),
            'thumbnails_mb': round(thumbnail_size / (1024 * 1024), 2),
            'merged_mb': round(merged_size / (1024 * 1024), 2),
            'total_mb': round((upload_size + thumbnail_size + merged_size) / (1024 * 1024), 2)
        },
        'metrics': app_metrics,
        'request_id': get_request_id()
    }
    
    return jsonify(response), 200


# Metrics endpoint
@app.route('/api/metrics', methods=['GET'])
def get_metrics():
    """Get application performance metrics."""
    stats = metrics.get_stats()
    system_stats = get_system_stats()
    
    return jsonify({
        'application': stats,
        'system': system_stats,
        'request_id': get_request_id()
    }), 200


# Session cleanup endpoint
@app.route('/api/session/<session_id>', methods=['DELETE'])
def cleanup_session(session_id: str):
    """Clean up a session and all its files."""
    try:
        file_manager = app.config['file_manager']
        success = file_manager.cleanup_session(session_id)
        
        if success:
            return jsonify({
                'message': 'Session cleaned up successfully',
                'session_id': session_id
            }), 200
        else:
            return jsonify({
                'error': 'Session not found or could not be cleaned up',
                'session_id': session_id
            }), 404
            
    except Exception as e:
        logger.error(f"Error cleaning up session: {e}")
        return jsonify({
            'error': 'Failed to clean up session',
            'detail': str(e)
        }), 500


# Error handlers
@app.errorhandler(404)
def not_found(error):
    """Handle 404 errors."""
    return jsonify({
        'error': 'Not found',
        'message': str(error)
    }), 404


@app.errorhandler(500)
def internal_error(error):
    """Handle 500 errors."""
    logger.error(f"Internal server error: {error}")
    return jsonify({
        'error': 'Internal server error',
        'message': 'An unexpected error occurred'
    }), 500


@app.errorhandler(413)
def request_entity_too_large(error):
    """Handle file too large errors."""
    return jsonify({
        'error': 'File too large',
        'message': f'Maximum file size is {Config.MAX_FILE_SIZE / (1024*1024)}MB'
    }), 413


# Background cleanup scheduler
def scheduled_cleanup():
    """Run periodic cleanup of old sessions."""
    try:
        logger.info("Running scheduled cleanup...")
        file_manager = app.config['file_manager']
        cleaned = file_manager.cleanup_old_sessions(max_age_hours=1)
        logger.info(f"Cleanup completed: {cleaned} sessions removed")
    except Exception as e:
        logger.error(f"Scheduled cleanup failed: {e}")


# Initialize scheduler
scheduler = BackgroundScheduler()
scheduler.add_job(
    func=scheduled_cleanup,
    trigger="interval",
    seconds=Config.CLEANUP_INTERVAL
)
scheduler.start()

# Shutdown scheduler on exit
atexit.register(lambda: scheduler.shutdown())


if __name__ == '__main__':
    logger.info("Starting PDF Joiner API server...")
    logger.info(f"Upload folder: {Config.UPLOAD_FOLDER}")
    logger.info(f"Thumbnail folder: {Config.THUMBNAIL_FOLDER}")
    logger.info(f"Merged folder: {Config.MERGED_FOLDER}")
    
    app.run(
        host=Config.HOST,
        port=Config.PORT,
        debug=Config.DEBUG
    )

