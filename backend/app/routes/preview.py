"""Preview and thumbnail routes."""
import logging
import sys
from flask import Blueprint, send_file, current_app, jsonify
from pathlib import Path

# Add parent directories to path
sys.path.insert(0, str(Path(__file__).parent.parent.parent))
from app.services.thumbnail_generator import ThumbnailGenerator
from app.models.schemas import ErrorResponse
from config import Config

logger = logging.getLogger(__name__)

preview_bp = Blueprint('preview', __name__)


@preview_bp.route('/pdf/<session_id>/<file_id>/thumbnail/<int:page_number>', methods=['GET'])
def get_page_thumbnail(session_id: str, file_id: str, page_number: int):
    """
    Get thumbnail for a specific page.
    
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
        
        # Generate thumbnail with caching
        thumbnail_folder = Config.THUMBNAIL_FOLDER / session_id / file_id
        thumbnail_folder.mkdir(parents=True, exist_ok=True)
        
        thumbnail_path = ThumbnailGenerator.generate_thumbnail_on_demand(
            pdf_path,
            page_number,
            thumbnail_folder
        )
        
        if not thumbnail_path or not thumbnail_path.exists():
            return jsonify(ErrorResponse(
                error="Failed to generate thumbnail",
                status_code=500
            ).dict()), 500
        
        return send_file(
            str(thumbnail_path),
            mimetype='image/jpeg',
            as_attachment=False
        )
        
    except Exception as e:
        logger.error(f"Error generating thumbnail: {e}")
        return jsonify(ErrorResponse(
            error="Failed to generate thumbnail",
            detail=str(e),
            status_code=500
        ).dict()), 500


@preview_bp.route('/pdf/<session_id>/<file_id>/thumbnails', methods=['POST'])
def generate_all_thumbnails(session_id: str, file_id: str):
    """
    Generate thumbnails for all pages in a PDF.
    
    Args:
        session_id: Session ID
        file_id: File ID
        
    Returns:
        JSON response with thumbnail URLs
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
        
        # Limit number of pages for preview
        max_pages = min(page_count, Config.MAX_PREVIEW_PAGES)
        
        thumbnail_folder = Config.THUMBNAIL_FOLDER / session_id / file_id
        thumbnail_folder.mkdir(parents=True, exist_ok=True)
        
        # Generate thumbnails
        thumbnail_paths = ThumbnailGenerator.generate_all_thumbnails(
            pdf_path,
            thumbnail_folder,
            prefix=f"{file_id}_page",
            max_pages=max_pages
        )
        
        # Create URL list - only include pages that were successfully generated
        thumbnail_urls = []
        for thumb_path in thumbnail_paths:
            # Extract page number from filename (e.g., "file_id_page_1.jpg" -> 1)
            try:
                page_num_str = thumb_path.stem.split('_')[-1]
                page_num = int(page_num_str)
                thumbnail_urls.append({
                    'page_number': page_num,
                    'url': f"/api/pdf/{session_id}/{file_id}/thumbnail/{page_num}"
                })
            except (ValueError, IndexError):
                # If we can't parse the page number, skip this thumbnail
                logger.warning(f"Could not parse page number from thumbnail path: {thumb_path}")
                continue
        
        # Sort by page number
        thumbnail_urls.sort(key=lambda x: x['page_number'])
        
        return jsonify({
            'file_id': file_id,
            'thumbnails': thumbnail_urls,
            'count': len(thumbnail_urls),
            'total_pages': page_count
        }), 200
        
    except Exception as e:
        logger.error(f"Error generating thumbnails: {e}")
        return jsonify(ErrorResponse(
            error="Failed to generate thumbnails",
            detail=str(e),
            status_code=500
        ).dict()), 500

