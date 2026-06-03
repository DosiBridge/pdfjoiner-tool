import os
from pathlib import Path
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

class Config:
    """Application configuration."""
    
    # Base directory
    BASE_DIR = Path(__file__).parent.parent
    
    # Flask configuration
    SECRET_KEY = os.getenv('SECRET_KEY', 'dev-secret-key-change-in-production')
    DEBUG = os.getenv('DEBUG', 'True').lower() == 'true'
    
    # Server configuration
    HOST = os.getenv('HOST', '0.0.0.0')
    PORT = int(os.getenv('PORT', 5000))
    
    # File upload configuration
    MAX_FILE_SIZE = int(os.getenv('MAX_FILE_SIZE', 52428800))  # 50MB
    MAX_FILES_PER_REQUEST = int(os.getenv('MAX_FILES_PER_REQUEST', 20))
    ALLOWED_EXTENSIONS = {'pdf'}
    
    # Folder configuration
    UPLOAD_FOLDER = BASE_DIR / os.getenv('UPLOAD_FOLDER', 'temp/uploads')
    THUMBNAIL_FOLDER = BASE_DIR / os.getenv('THUMBNAIL_FOLDER', 'temp/thumbnails')
    MERGED_FOLDER = BASE_DIR / os.getenv('MERGED_FOLDER', 'temp/merged')
    
    # Security
    # CORS origins - comma-separated list, strip whitespace
    cors_origins_str = os.getenv('CORS_ORIGINS', 'http://localhost:3000,http://localhost:5173')
    CORS_ORIGINS = [origin.strip() for origin in cors_origins_str.split(',') if origin.strip()]
    RATE_LIMIT = os.getenv('RATE_LIMIT', '1000/hour')  # Increased for better UX
    
    # Session configuration
    SESSION_TIMEOUT = int(os.getenv('SESSION_TIMEOUT', 3600))
    CLEANUP_INTERVAL = int(os.getenv('CLEANUP_INTERVAL', 1800))
    
    # Preview configuration - optimized for speed
    THUMBNAIL_SIZE = int(os.getenv('THUMBNAIL_SIZE', 150))  # Smaller size for faster generation
    THUMBNAIL_QUALITY = int(os.getenv('THUMBNAIL_QUALITY', 60))  # Lower quality for speed (still acceptable)
    MAX_PREVIEW_PAGES = int(os.getenv('MAX_PREVIEW_PAGES', 10000))  # Increased for large PDFs
    PAGES_PER_PAGE = int(os.getenv('PAGES_PER_PAGE', 100))  # Increased pages per pagination
    
    # Performance
    WORKER_THREADS = int(os.getenv('WORKER_THREADS', 4))
    MAX_CONCURRENT_JOBS = int(os.getenv('MAX_CONCURRENT_JOBS', 10))
    
    # Logging
    LOG_LEVEL = os.getenv('LOG_LEVEL', 'INFO')
    LOG_FILE = BASE_DIR / os.getenv('LOG_FILE', 'logs/app.log')
    
    @classmethod
    def ensure_directories(cls):
        """Create necessary directories if they don't exist."""
        cls.UPLOAD_FOLDER.mkdir(parents=True, exist_ok=True)
        cls.THUMBNAIL_FOLDER.mkdir(parents=True, exist_ok=True)
        cls.MERGED_FOLDER.mkdir(parents=True, exist_ok=True)
        # Ensure log directory exists
        if cls.LOG_FILE.parent:
            cls.LOG_FILE.parent.mkdir(parents=True, exist_ok=True)

