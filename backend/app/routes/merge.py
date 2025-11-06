"""PDF merge routes."""
import logging
import sys
from pathlib import Path
from flask import Blueprint, request, jsonify, send_file, current_app
from pydantic import ValidationError

# Add parent directories to path
sys.path.insert(0, str(Path(__file__).parent.parent.parent))
from app.services.pdf_processor import PDFProcessor
from app.utils.security import SecurityUtils
from app.utils.validators import FileValidator
from app.models.schemas import MergeRequest, MergeResponse, ErrorResponse
from config import Config

logger = logging.getLogger(__name__)

merge_bp = Blueprint('merge', __name__)


@merge_bp.route('/merge', methods=['POST'])
def merge_pdfs():
    """
    Merge multiple PDFs with selected pages.
    
    Request body:
        MergeRequest schema
        
    Returns:
        JSON response with job information
    """
    try:
        # Parse request
        data = request.get_json()
        
        if not data:
            return jsonify(ErrorResponse(
                error="No data provided",
                status_code=400
            ).dict()), 400
        
        try:
            merge_request = MergeRequest(**data)
        except ValidationError as e:
            return jsonify(ErrorResponse(
                error="Invalid request data",
                detail=str(e),
                status_code=400
            ).dict()), 400
        
        # Get file manager
        file_manager = current_app.config['file_manager']
        
        # Validate all files exist and build merge list
        pdf_sources = []
        total_pages = 0
        
        for selection in merge_request.selections:
            file_info = file_manager.get_file(
                merge_request.session_id,
                selection.file_id
            )
            
            if not file_info:
                return jsonify(ErrorResponse(
                    error=f"File not found: {selection.file_id}",
                    status_code=404
                ).dict()), 404
            
            pdf_path = file_info['path']
            
            if not pdf_path.exists():
                return jsonify(ErrorResponse(
                    error=f"PDF file not found: {selection.file_id}",
                    status_code=404
                ).dict()), 404
            
            # Validate page numbers
            max_pages = file_info['metadata']['page_count']
            is_valid, error_msg = FileValidator.validate_page_range(
                selection.pages,
                max_pages
            )
            
            if not is_valid:
                return jsonify(ErrorResponse(
                    error=f"Invalid page selection for {selection.file_id}",
                    detail=error_msg,
                    status_code=400
                ).dict()), 400
            
            pdf_sources.append((pdf_path, selection.pages))
            total_pages += len(selection.pages)
        
        # Generate job ID
        job_id = SecurityUtils.generate_job_id()
        
        # Create output path
        output_folder = Config.MERGED_FOLDER / merge_request.session_id
        output_folder.mkdir(parents=True, exist_ok=True)
        
        output_filename = merge_request.output_filename
        if not output_filename.endswith('.pdf'):
            output_filename = f"{output_filename}.pdf"
        
        output_path = output_folder / f"{job_id}_{output_filename}"
        
        # Merge PDFs
        try:
            metadata = {
                'title': getattr(merge_request, 'title', None),
                'author': getattr(merge_request, 'author', None),
                'subject': getattr(merge_request, 'subject', None)
            }
            
            merged_pages = PDFProcessor.merge_pdfs(
                pdf_sources,
                output_path,
                add_page_numbers=merge_request.add_page_numbers,
                watermark_text=merge_request.watermark_text,
                password=merge_request.password,
                metadata=metadata
            )
            
            logger.info(f"Successfully merged {merged_pages} pages to {output_path}")
            
            # Store job info
            job_manager = current_app.config.get('job_manager', {})
            job_manager[job_id] = {
                'session_id': merge_request.session_id,
                'output_path': output_path,
                'output_filename': output_filename,
                'status': 'completed',
                'total_pages': merged_pages
            }
            current_app.config['job_manager'] = job_manager
            
            response = MergeResponse(
                job_id=job_id,
                status='completed',
                output_filename=output_filename,
                total_pages=merged_pages
            )
            
            return jsonify(response.dict()), 200
            
        except Exception as e:
            logger.error(f"Merge failed: {e}")
            return jsonify(ErrorResponse(
                error="Merge operation failed",
                detail=str(e),
                status_code=500
            ).dict()), 500
        
    except Exception as e:
        logger.error(f"Merge error: {e}")
        return jsonify(ErrorResponse(
            error="Merge request failed",
            detail=str(e),
            status_code=500
        ).dict()), 500


@merge_bp.route('/download/<job_id>', methods=['GET'])
def download_merged_pdf(job_id: str):
    """
    Download merged PDF.
    Checks in-memory first, then filesystem if not found.
    
    Args:
        job_id: Job ID from merge operation
        
    Returns:
        PDF file download
    """
    try:
        job_manager = current_app.config.get('job_manager', {})
        job_info = job_manager.get(job_id)
        
        # If not in memory, check filesystem
        if not job_info:
            merged_folder = Config.MERGED_FOLDER
            if merged_folder.exists():
                # Search for files starting with job_id
                for session_folder in merged_folder.iterdir():
                    if session_folder.is_dir():
                        for file_path in session_folder.glob(f"{job_id}_*"):
                            if file_path.is_file() and file_path.suffix.lower() == '.pdf':
                                # Extract filename
                                output_filename = file_path.name[len(job_id) + 1:]
                                
                                # Try to get page count
                                try:
                                    total_pages = PDFProcessor.get_page_count(file_path)
                                except:
                                    total_pages = 0
                                
                                # Restore job info
                                job_info = {
                                    'session_id': session_folder.name,
                                    'output_path': file_path,
                                    'output_filename': output_filename,
                                    'status': 'completed',
                                    'total_pages': total_pages
                                }
                                
                                # Add back to in-memory job manager
                                job_manager[job_id] = job_info
                                current_app.config['job_manager'] = job_manager
                                
                                logger.info(f"Restored job {job_id} from filesystem for download")
                                break
                        
                        if job_info:
                            break
        
        if not job_info:
            return jsonify(ErrorResponse(
                error="Job not found",
                status_code=404
            ).dict()), 404
        
        output_path = job_info['output_path']
        
        if not output_path.exists():
            return jsonify(ErrorResponse(
                error="Output file not found",
                status_code=404
            ).dict()), 404
        
        return send_file(
            str(output_path),
            mimetype='application/pdf',
            as_attachment=True,
            download_name=job_info['output_filename']
        )
        
    except Exception as e:
        logger.error(f"Download error: {e}")
        return jsonify(ErrorResponse(
            error="Download failed",
            detail=str(e),
            status_code=500
        ).dict()), 500


@merge_bp.route('/job/<job_id>/status', methods=['GET'])
def get_job_status(job_id: str):
    """
    Get status of a merge job.
    Checks in-memory first, then filesystem if not found.
    
    Args:
        job_id: Job ID
        
    Returns:
        JSON response with job status
    """
    try:
        job_manager = current_app.config.get('job_manager', {})
        job_info = job_manager.get(job_id)
        
        # If not in memory, check filesystem
        if not job_info:
            # Look for merged PDF files matching the job_id pattern
            merged_folder = Config.MERGED_FOLDER
            if merged_folder.exists():
                # Search for files starting with job_id
                for session_folder in merged_folder.iterdir():
                    if session_folder.is_dir():
                        for file_path in session_folder.glob(f"{job_id}_*"):
                            if file_path.is_file() and file_path.suffix.lower() == '.pdf':
                                # Extract filename (remove job_id_ prefix)
                                output_filename = file_path.name[len(job_id) + 1:]
                                
                                # Try to get page count from PDF
                                try:
                                    total_pages = PDFProcessor.get_page_count(file_path)
                                except:
                                    total_pages = 0
                                
                                # Restore job info
                                job_info = {
                                    'session_id': session_folder.name,
                                    'output_path': file_path,
                                    'output_filename': output_filename,
                                    'status': 'completed',
                                    'total_pages': total_pages
                                }
                                
                                # Add back to in-memory job manager
                                job_manager[job_id] = job_info
                                current_app.config['job_manager'] = job_manager
                                
                                logger.info(f"Restored job {job_id} from filesystem")
                                break
                        
                        if job_info:
                            break
        
        if not job_info:
            return jsonify(ErrorResponse(
                error="Job not found",
                status_code=404
            ).dict()), 404
        
        return jsonify({
            'job_id': job_id,
            'status': job_info['status'],
            'output_filename': job_info['output_filename'],
            'total_pages': job_info['total_pages'],
            'download_url': f"/api/download/{job_id}"
        }), 200
        
    except Exception as e:
        logger.error(f"Error getting job status: {e}")
        return jsonify(ErrorResponse(
            error="Failed to get job status",
            detail=str(e),
            status_code=500
        ).dict()), 500

