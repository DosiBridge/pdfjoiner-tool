"""Preview and thumbnail routes."""
import logging
import sys
import time
from flask import Blueprint, send_file, current_app, jsonify, request
from pathlib import Path

# Add parent directories to path
sys.path.insert(0, str(Path(__file__).parent.parent.parent))
from app.services.thumbnail_generator import ThumbnailGenerator
from app.models.schemas import ErrorResponse
from app.utils.metrics import metrics
from config import Config

logger = logging.getLogger(__name__)

preview_bp = Blueprint('preview', __name__)


@preview_bp.route('/pdf/<session_id>/<file_id>/thumbnail/<int:page_number>', methods=['GET'])
def get_page_thumbnail(session_id: str, file_id: str, page_number: int):
    """
    Get thumbnail for a specific page.
    Note: Rate limit is set to 1000/hour to allow loading many thumbnails.
    
    Args:
        session_id: Session ID
        file_id: File ID
        page_number: Page number (1-indexed)
        
    Returns:
        Image file (JPEG)
    """
    try:
        file_manager = current_app.config['file_manager']
        file_info = file_manager.get_file(session_id, file_id)
        
        if not file_info:
            return jsonify(ErrorResponse(
                error="File not found",
                status_code=404
            ).dict()), 404
        
        pdf_path = file_info['path']
        
        if not pdf_path.exists():
            return jsonify(ErrorResponse(
                error="PDF file not found",
                status_code=404
            ).dict()), 404
        
        # Validate page number
        page_count = file_info['metadata']['page_count']
        if page_number < 1:
            return jsonify(ErrorResponse(
                error=f"Invalid page number. Must be at least 1",
                status_code=400
            ).dict()), 400
        
        # If page number exceeds page count, return 404 instead of 400
        # This is more semantically correct - the resource doesn't exist
        if page_number > page_count:
            logger.warning(f"Requested page {page_number} but PDF only has {page_count} pages")
            return jsonify(ErrorResponse(
                error=f"Page {page_number} does not exist. PDF has {page_count} page(s)",
                status_code=404
            ).dict()), 404
        
        # Generate thumbnail with caching and timing
        thumbnail_folder = Config.THUMBNAIL_FOLDER / session_id / file_id
        thumbnail_folder.mkdir(parents=True, exist_ok=True)
        
        # Time thumbnail generation
        gen_start = time.time()
        
        try:
            thumbnail_path = ThumbnailGenerator.generate_thumbnail_on_demand(
                pdf_path,
                page_number,
                thumbnail_folder
            )
        except Exception as gen_error:
            logger.error(f"Thumbnail generation exception for page {page_number}: {gen_error}", exc_info=True)
            thumbnail_path = None
        
        gen_duration = time.time() - gen_start
        
        # Record metrics
        if thumbnail_path:
            metrics.record_thumbnail_generation(gen_duration)
        
        if not thumbnail_path or not thumbnail_path.exists():
            logger.warning(f"Thumbnail not available for page {page_number} after {gen_duration:.3f}s")
            # Return a placeholder image or 404 - don't fail completely
            return jsonify(ErrorResponse(
                error="Thumbnail not available",
                detail=f"Could not generate thumbnail for page {page_number}",
                status_code=404
            ).dict()), 404
        
        # Add caching headers for better performance
        response = send_file(
            str(thumbnail_path),
            mimetype='image/jpeg',
            as_attachment=False
        )
        
        # Optimize caching headers for speed
        response.cache_control.max_age = 86400  # 24 hours cache
        response.cache_control.public = True
        response.cache_control.immutable = True  # Thumbnails don't change
        response.headers['X-Thumbnail-Generation-Time'] = f"{gen_duration:.3f}s"
        response.headers['X-Content-Type-Options'] = 'nosniff'
        # Enable HTTP/2 push hints
        response.headers['Link'] = f'</api/pdf/{session_id}/{file_id}/thumbnail/{page_number}>; rel=preload; as=image'
        
        return response
        
    except Exception as e:
        logger.error(f"Error generating thumbnail: {e}")
        return jsonify(ErrorResponse(
            error="Failed to generate thumbnail",
            detail=str(e),
            status_code=500
        ).dict()), 500


@preview_bp.route('/pdf/<session_id>/<file_id>/thumbnails/batch', methods=['POST'])
def generate_batch_thumbnails(session_id: str, file_id: str):
    """
    Generate thumbnails for multiple pages in batch - OPTIMIZED FOR SPEED.
    
    Request body:
        {
            "pages": [1, 2, 3, ...],  # List of page numbers (max 200 for speed)
            "force_regenerate": false  # Optional: regenerate even if cached
        }
    
    Returns:
        JSON response with generated thumbnail URLs
    """
    try:
        file_manager = current_app.config['file_manager']
        file_info = file_manager.get_file(session_id, file_id)
        
        if not file_info:
            return jsonify(ErrorResponse(
                error="File not found",
                status_code=404
            ).dict()), 404
        
        pdf_path = file_info['path']
        page_count = file_info['metadata']['page_count']
        
        # Get request data
        data = request.get_json() or {}
        pages = data.get('pages', [])
        force_regenerate = data.get('force_regenerate', False)
        
        if not pages:
            return jsonify(ErrorResponse(
                error="No pages specified",
                detail="Please provide a 'pages' array with page numbers",
                status_code=400
            ).dict()), 400
        
        # Limit batch size for performance
        if len(pages) > 200:
            pages = pages[:200]
        
        # Validate page numbers
        invalid_pages = [p for p in pages if p < 1 or p > page_count]
        if invalid_pages:
            return jsonify(ErrorResponse(
                error="Invalid page numbers",
                detail=f"Pages {invalid_pages} are out of range (1-{page_count})",
                status_code=400
            ).dict()), 400
        
        # Generate thumbnails folder
        thumbnail_folder = Config.THUMBNAIL_FOLDER / session_id / file_id
        thumbnail_folder.mkdir(parents=True, exist_ok=True)
        
        # Use concurrent processing for speed
        import concurrent.futures
        
        def generate_single(page_num):
            """Generate a single thumbnail."""
            try:
                if force_regenerate:
                    cache_path = thumbnail_folder / f"{pdf_path.stem}_page_{page_num}.jpg"
                    if cache_path.exists():
                        cache_path.unlink()
                
                page_start = time.time()
                thumbnail_path = ThumbnailGenerator.generate_thumbnail_on_demand(
                    pdf_path,
                    page_num,
                    thumbnail_folder
                )
                page_duration = time.time() - page_start
                
                if thumbnail_path:
                    metrics.record_thumbnail_generation(page_duration)
                
                return {
                    'page_number': page_num,
                    'url': f"/api/pdf/{session_id}/{file_id}/thumbnail/{page_num}",
                    'status': 'success' if (thumbnail_path and thumbnail_path.exists()) else 'failed',
                    'generation_time': round(page_duration, 3)
                }
            except Exception as e:
                logger.error(f"Error generating thumbnail for page {page_num}: {e}")
                return {
                    'page_number': page_num,
                    'status': 'failed',
                    'error': str(e)
                }
        
        # Generate thumbnails in parallel for maximum speed
        start_time = time.time()
        max_workers = min(10, len(pages))  # Limit concurrent workers
        
        with concurrent.futures.ThreadPoolExecutor(max_workers=max_workers) as executor:
            results = list(executor.map(generate_single, pages))
        
        total_duration = time.time() - start_time
        
        return jsonify({
            'file_id': file_id,
            'total_pages': len(pages),
            'successful': len([r for r in results if r['status'] == 'success']),
            'failed': len([r for r in results if r['status'] == 'failed']),
            'total_time': round(total_duration, 3),
            'thumbnails': results
        }), 200
        
    except Exception as e:
        logger.error(f"Error in batch thumbnail generation: {e}", exc_info=True)
        return jsonify(ErrorResponse(
            error="Failed to generate batch thumbnails",
            detail=str(e),
            status_code=500
        ).dict()), 500


@preview_bp.route('/pdf/<session_id>/<file_id>/thumbnails', methods=['POST'])
def generate_all_thumbnails(session_id: str, file_id: str):
    """
    Get list of all pages (lazy loading - thumbnails generated on-demand).
    
    Args:
        session_id: Session ID
        file_id: File ID
        
    Returns:
        JSON response with page list (thumbnails generated on-demand)
    """
    try:
        file_manager = current_app.config['file_manager']
        file_info = file_manager.get_file(session_id, file_id)
        
        if not file_info:
            return jsonify(ErrorResponse(
                error="File not found",
                status_code=404
            ).dict()), 404
        
        pdf_path = file_info['path']
        page_count = file_info['metadata']['page_count']
        
        # Don't generate all thumbnails at once - return page list instead
        # Thumbnails will be generated on-demand when requested
        # This allows handling PDFs with thousands of pages
        
        # Create page list with URLs (thumbnails generated on-demand)
        pages = []
        for page_num in range(1, page_count + 1):
            pages.append({
                    'page_number': page_num,
                    'url': f"/api/pdf/{session_id}/{file_id}/thumbnail/{page_num}"
                })
        
        return jsonify({
            'file_id': file_id,
            'thumbnails': pages,
            'count': len(pages),
            'total_pages': page_count
        }), 200
        
    except Exception as e:
        logger.error(f"Error getting page list: {e}")
        return jsonify(ErrorResponse(
            error="Failed to get page list",
            detail=str(e),
            status_code=500
        ).dict()), 500


@preview_bp.route('/pdf/<session_id>/<file_id>/pages', methods=['GET'])
def get_pages_list(session_id: str, file_id: str):
    """
    Get paginated list of pages.
    
    Query parameters:
        page: Page number (1-indexed, default: 1)
        per_page: Items per page (default: 50)
        
    Returns:
        JSON response with paginated page list
    """
    try:
        file_manager = current_app.config['file_manager']
        file_info = file_manager.get_file(session_id, file_id)
        
        if not file_info:
            return jsonify(ErrorResponse(
                error="File not found",
                status_code=404
            ).dict()), 404
        
        page_count = file_info['metadata']['page_count']
        
        # Get pagination parameters
        page = int(request.args.get('page', 1))
        per_page = int(request.args.get('per_page', Config.PAGES_PER_PAGE))
        
        # Validate pagination
        if page < 1:
            page = 1
        if per_page < 1:
            per_page = Config.PAGES_PER_PAGE
        if per_page > 200:  # Max limit
            per_page = 200
        
        # Calculate pagination
        total_pages = (page_count + per_page - 1) // per_page
        start_page = (page - 1) * per_page + 1
        end_page = min(start_page + per_page - 1, page_count)
        
        # Create page list for current page
        pages = []
        for page_num in range(start_page, end_page + 1):
            pages.append({
                'page_number': page_num,
                'url': f"/api/pdf/{session_id}/{file_id}/thumbnail/{page_num}"
            })
        
        return jsonify({
            'file_id': file_id,
            'pages': pages,
            'pagination': {
                'current_page': page,
                'per_page': per_page,
                'total_pages': total_pages,
                'total_items': page_count,
                'start_page': start_page,
                'end_page': end_page
            }
        }), 200
        
    except Exception as e:
        logger.error(f"Error getting paginated pages: {e}")
        return jsonify(ErrorResponse(
            error="Failed to get pages",
            detail=str(e),
            status_code=500
        ).dict()), 500

