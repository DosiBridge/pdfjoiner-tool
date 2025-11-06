"""File upload routes."""
import logging
import sys
from pathlib import Path
from flask import Blueprint, request, jsonify, current_app
from werkzeug.utils import secure_filename

# Add parent directories to path (backend directory)
_backend_dir = Path(__file__).parent.parent.parent
if str(_backend_dir) not in sys.path:
    sys.path.insert(0, str(_backend_dir))
from app.utils.validators import FileValidator
from app.utils.security import SecurityUtils
from app.utils.helpers import format_file_size, ensure_session_folders
from app.services.pdf_processor import PDFProcessor
from app.models.schemas import UploadResponse, ErrorResponse
from config import Config

logger = logging.getLogger(__name__)

upload_bp = Blueprint('upload', __name__)


@upload_bp.route('/upload', methods=['POST'])
def upload_files():
    """
    Upload PDF files.
    
    Returns:
        JSON response with uploaded file information
    """
    try:
        # Get session ID from request
        session_id = request.form.get('session_id')
        if not session_id:
            session_id = SecurityUtils.generate_session_id()
        
        # Check if files are present
        if 'files' not in request.files:
            return jsonify(ErrorResponse(
                error="No files provided",
                status_code=400
            ).dict()), 400
        
        files = request.files.getlist('files')
        
        if not files or all(f.filename == '' for f in files):
            return jsonify(ErrorResponse(
                error="No files selected",
                status_code=400
            ).dict()), 400
        
        # Check file count limit
        if len(files) > Config.MAX_FILES_PER_REQUEST:
            return jsonify(ErrorResponse(
                error=f"Too many files. Maximum {Config.MAX_FILES_PER_REQUEST} allowed",
                status_code=400
            ).dict()), 400
        
        # Ensure session folders exist
        session_upload_folder = Config.UPLOAD_FOLDER / session_id
        ensure_session_folders(session_id, Config.UPLOAD_FOLDER)
        
        uploaded_files = []
        errors = []
        
        for file in files:
            try:
                # Validate filename
                if not FileValidator.allowed_file(file.filename):
                    errors.append(f"{file.filename}: Invalid file type")
                    continue
                
                # Generate file ID and sanitize filename
                file_id = SecurityUtils.generate_file_id()
                original_filename = file.filename
                safe_filename = FileValidator.sanitize_filename(original_filename)
                
                # Save file
                file_path = session_upload_folder / f"{file_id}_{safe_filename}"
                file.save(str(file_path))
                
                # Validate PDF
                is_valid, error_msg = FileValidator.validate_pdf(file_path)
                if not is_valid:
                    file_path.unlink()  # Delete invalid file
                    errors.append(f"{original_filename}: {error_msg}")
                    continue
                
                # Validate PDF structure
                is_valid_pdf, pdf_error = PDFProcessor.validate_pdf(file_path)
                if not is_valid_pdf:
                    file_path.unlink()
                    errors.append(f"{original_filename}: {pdf_error}")
                    continue
                
                # Get PDF information
                page_count = PDFProcessor.get_page_count(file_path)
                file_size = file_path.stat().st_size
                
                # Store file info in file manager
                file_manager = current_app.config['file_manager']
                file_manager.add_file(
                    session_id,
                    file_id,
                    file_path,
                    {
                        'filename': safe_filename,
                        'original_filename': original_filename,
                        'page_count': page_count,
                        'file_size': file_size
                    }
                )
                
                # Create response
                upload_response = UploadResponse(
                    file_id=file_id,
                    filename=safe_filename,
                    original_filename=original_filename,
                    page_count=page_count,
                    file_size=file_size,
                    file_size_formatted=format_file_size(file_size)
                )
                
                uploaded_files.append(upload_response.dict())
                logger.info(f"Uploaded file: {original_filename} ({file_id})")
                
            except Exception as e:
                logger.error(f"Error processing file {file.filename}: {e}")
                errors.append(f"{file.filename}: {str(e)}")
        
        response = {
            'session_id': session_id,
            'uploaded_files': uploaded_files,
            'errors': errors,
            'success_count': len(uploaded_files),
            'error_count': len(errors)
        }
        
        return jsonify(response), 200 if uploaded_files else 400
        
    except Exception as e:
        logger.error(f"Upload error: {e}")
        return jsonify(ErrorResponse(
            error="Upload failed",
            detail=str(e),
            status_code=500
        ).dict()), 500


@upload_bp.route('/pdf/<session_id>/<file_id>/metadata', methods=['GET'])
def get_pdf_metadata(session_id: str, file_id: str):
    """
    Get detailed PDF metadata.
    
    Args:
        session_id: Session ID
        file_id: File ID
        
    Returns:
        JSON response with PDF metadata
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
                error="File no longer exists",
                status_code=404
            ).dict()), 404
        
        # Get detailed metadata
        metadata = PDFProcessor.get_metadata(pdf_path)
        
        response = {
            'file_id': file_id,
            'filename': file_info['metadata']['filename'],
            'page_count': metadata['page_count'],
            'file_size': file_info['metadata']['file_size'],
            'pages': metadata['pages'],
            'title': metadata.get('title'),
            'author': metadata.get('author'),
            'subject': metadata.get('subject')
        }
        
        return jsonify(response), 200
        
    except Exception as e:
        logger.error(f"Error getting metadata: {e}")
        return jsonify(ErrorResponse(
            error="Failed to get metadata",
            detail=str(e),
            status_code=500
        ).dict()), 500


@upload_bp.route('/session/<session_id>/files', methods=['GET'])
def list_session_files(session_id: str):
    """
    List all files in a session.
    
    Args:
        session_id: Session ID
        
    Returns:
        JSON response with list of files
    """
    try:
        file_manager = current_app.config['file_manager']
        files = file_manager.get_session_files(session_id)
        
        file_list = []
        for file_id, file_info in files.items():
            file_list.append({
                'file_id': file_id,
                'filename': file_info['metadata']['filename'],
                'original_filename': file_info['metadata']['original_filename'],
                'page_count': file_info['metadata']['page_count'],
                'file_size': file_info['metadata']['file_size'],
                'file_size_formatted': format_file_size(
                    file_info['metadata']['file_size']
                )
            })
        
        return jsonify({
            'session_id': session_id,
            'files': file_list,
            'count': len(file_list)
        }), 200
        
    except Exception as e:
        logger.error(f"Error listing files: {e}")
        return jsonify(ErrorResponse(
            error="Failed to list files",
            detail=str(e),
            status_code=500
        ).dict()), 500


@upload_bp.route('/session/<session_id>/file/<file_id>', methods=['DELETE'])
def delete_file(session_id: str, file_id: str):
    """
    Delete a file from session.
    
    Args:
        session_id: Session ID
        file_id: File ID
        
    Returns:
        JSON response
    """
    try:
        file_manager = current_app.config['file_manager']
        success = file_manager.delete_file(session_id, file_id)
        
        if success:
            return jsonify({
                'message': 'File deleted successfully',
                'file_id': file_id
            }), 200
        else:
            return jsonify(ErrorResponse(
                error="File not found or could not be deleted",
                status_code=404
            ).dict()), 404
            
    except Exception as e:
        logger.error(f"Error deleting file: {e}")
        return jsonify(ErrorResponse(
            error="Failed to delete file",
            detail=str(e),
            status_code=500
        ).dict()), 500

