"""PDF tool routes: compress, split, image-to-pdf, reorder, delete pages."""
import logging
import sys
import io
from pathlib import Path
from flask import Blueprint, request, jsonify, send_file, current_app
from PIL import Image

sys.path.insert(0, str(Path(__file__).parent.parent.parent))
from app.services.pdf_processor import PDFProcessor
from app.utils.security import SecurityUtils
from app.utils.validators import FileValidator
from app.models.schemas import ErrorResponse
from config import Config

logger = logging.getLogger(__name__)

tools_bp = Blueprint('tools', __name__)


# ── Compress PDF ──

@tools_bp.route('/compress', methods=['POST'])
def compress_pdf():
    """Compress a PDF by reducing image quality and removing unused objects."""
    try:
        file_manager = current_app.config['file_manager']
        data = request.get_json()
        if not data:
            return jsonify(ErrorResponse(error="No data provided", status_code=400).dict()), 400

        session_id = data.get('session_id')
        file_id = data.get('file_id')
        quality = data.get('quality', 'medium')  # low, medium, high

        if not session_id or not file_id:
            return jsonify(ErrorResponse(error="session_id and file_id required", status_code=400).dict()), 400

        file_info = file_manager.get_file(session_id, file_id)
        if not file_info:
            return jsonify(ErrorResponse(error="File not found", status_code=404).dict()), 404

        pdf_path = file_info['path']
        job_id = SecurityUtils.generate_job_id()
        output_folder = Config.MERGED_FOLDER / session_id
        output_folder.mkdir(parents=True, exist_ok=True)

        original_filename = file_info['metadata'].get('original_filename', 'compressed.pdf')
        output_filename = f"compressed_{original_filename}"
        output_path = output_folder / f"{job_id}_{output_filename}"

        compressed_pages = PDFProcessor.compress_pdf(pdf_path, output_path, quality)

        original_size = pdf_path.stat().st_size
        compressed_size = output_path.stat().st_size
        reduction = round((1 - compressed_size / original_size) * 100, 1) if original_size > 0 else 0

        job_manager = current_app.config.get('job_manager', {})
        job_manager[job_id] = {
            'session_id': session_id,
            'output_path': output_path,
            'output_filename': output_filename,
            'status': 'completed',
            'total_pages': compressed_pages,
        }
        current_app.config['job_manager'] = job_manager

        return jsonify({
            'job_id': job_id,
            'status': 'completed',
            'output_filename': output_filename,
            'total_pages': compressed_pages,
            'original_size': original_size,
            'compressed_size': compressed_size,
            'reduction_percent': reduction,
        }), 200

    except Exception as e:
        logger.error(f"Compress error: {e}")
        return jsonify(ErrorResponse(error="Compression failed", detail=str(e), status_code=500).dict()), 500


# ── Split PDF ──

@tools_bp.route('/split', methods=['POST'])
def split_pdf():
    """Split a PDF into multiple files by page ranges."""
    try:
        file_manager = current_app.config['file_manager']
        data = request.get_json()
        if not data:
            return jsonify(ErrorResponse(error="No data provided", status_code=400).dict()), 400

        session_id = data.get('session_id')
        file_id = data.get('file_id')
        split_mode = data.get('mode', 'individual')  # individual, ranges, every_n
        ranges = data.get('ranges', [])  # for ranges mode: [[1,3], [4,6]]
        every_n = data.get('every_n', 1)  # for every_n mode

        if not session_id or not file_id:
            return jsonify(ErrorResponse(error="session_id and file_id required", status_code=400).dict()), 400

        file_info = file_manager.get_file(session_id, file_id)
        if not file_info:
            return jsonify(ErrorResponse(error="File not found", status_code=404).dict()), 404

        pdf_path = file_info['path']
        page_count = file_info['metadata']['page_count']
        job_id = SecurityUtils.generate_job_id()
        output_folder = Config.MERGED_FOLDER / session_id
        output_folder.mkdir(parents=True, exist_ok=True)

        split_files = []

        if split_mode == 'individual':
            # Split each page into its own file
            for i in range(1, page_count + 1):
                out_path = output_folder / f"{job_id}_page_{i}.pdf"
                PDFProcessor.extract_pages(pdf_path, [i], out_path)
                split_files.append({'filename': f"page_{i}.pdf", 'pages': [i], 'path': out_path})

        elif split_mode == 'ranges':
            for idx, r in enumerate(ranges):
                start, end = r[0], r[-1]
                pages = list(range(start, end + 1))
                out_path = output_folder / f"{job_id}_pages_{start}-{end}.pdf"
                PDFProcessor.extract_pages(pdf_path, pages, out_path)
                split_files.append({'filename': f"pages_{start}-{end}.pdf", 'pages': pages, 'path': out_path})

        elif split_mode == 'every_n':
            for start in range(1, page_count + 1, max(1, every_n)):
                end = min(start + every_n - 1, page_count)
                pages = list(range(start, end + 1))
                out_path = output_folder / f"{job_id}_pages_{start}-{end}.pdf"
                PDFProcessor.extract_pages(pdf_path, pages, out_path)
                split_files.append({'filename': f"pages_{start}-{end}.pdf", 'pages': pages, 'path': out_path})

        # Store all split files as jobs for download
        job_manager = current_app.config.get('job_manager', {})
        result_files = []
        for sf in split_files:
            sub_job_id = SecurityUtils.generate_job_id()
            job_manager[sub_job_id] = {
                'session_id': session_id,
                'output_path': sf['path'],
                'output_filename': sf['filename'],
                'status': 'completed',
                'total_pages': len(sf['pages']),
            }
            result_files.append({
                'job_id': sub_job_id,
                'filename': sf['filename'],
                'pages': sf['pages'],
                'page_count': len(sf['pages']),
            })

        current_app.config['job_manager'] = job_manager

        return jsonify({
            'job_id': job_id,
            'status': 'completed',
            'total_files': len(result_files),
            'files': result_files,
        }), 200

    except Exception as e:
        logger.error(f"Split error: {e}")
        return jsonify(ErrorResponse(error="Split failed", detail=str(e), status_code=500).dict()), 500


# ── Image to PDF ──

@tools_bp.route('/image-to-pdf', methods=['POST'])
def image_to_pdf():
    """Convert uploaded images to a single PDF."""
    try:
        session_id = request.form.get('session_id')
        if not session_id:
            return jsonify(ErrorResponse(error="session_id required", status_code=400).dict()), 400

        files = request.files.getlist('files')
        if not files:
            return jsonify(ErrorResponse(error="No files provided", status_code=400).dict()), 400

        images = []
        for f in files:
            if not f.filename:
                continue
            ext = f.filename.rsplit('.', 1)[-1].lower() if '.' in f.filename else ''
            if ext not in ('jpg', 'jpeg', 'png', 'bmp', 'gif', 'tiff', 'tif', 'webp'):
                return jsonify(ErrorResponse(
                    error=f"Unsupported image format: {f.filename}. Use JPG, PNG, BMP, GIF, TIFF, or WebP.",
                    status_code=400
                ).dict()), 400
            try:
                img = Image.open(f.stream)
                if img.mode == 'RGBA':
                    img = img.convert('RGB')
                elif img.mode not in ('RGB', 'L'):
                    img = img.convert('RGB')
                images.append(img)
            except Exception as e:
                return jsonify(ErrorResponse(error=f"Failed to read image {f.filename}: {str(e)}", status_code=400).dict()), 400

        if not images:
            return jsonify(ErrorResponse(error="No valid images found", status_code=400).dict()), 400

        job_id = SecurityUtils.generate_job_id()
        output_folder = Config.MERGED_FOLDER / session_id
        output_folder.mkdir(parents=True, exist_ok=True)

        output_filename = request.form.get('output_filename', 'images.pdf')
        if not output_filename.endswith('.pdf'):
            output_filename += '.pdf'
        output_path = output_folder / f"{job_id}_{output_filename}"

        # Save first image, append rest
        first = images[0]
        rest = images[1:] if len(images) > 1 else []
        first.save(str(output_path), 'PDF', save_all=True, append_images=rest, resolution=150)

        job_manager = current_app.config.get('job_manager', {})
        job_manager[job_id] = {
            'session_id': session_id,
            'output_path': output_path,
            'output_filename': output_filename,
            'status': 'completed',
            'total_pages': len(images),
        }
        current_app.config['job_manager'] = job_manager

        return jsonify({
            'job_id': job_id,
            'status': 'completed',
            'output_filename': output_filename,
            'total_pages': len(images),
        }), 200

    except Exception as e:
        logger.error(f"Image-to-PDF error: {e}")
        return jsonify(ErrorResponse(error="Image conversion failed", detail=str(e), status_code=500).dict()), 500


# ── Reorder PDF Pages ──

@tools_bp.route('/reorder', methods=['POST'])
def reorder_pdf():
    """Reorder pages within a single PDF."""
    try:
        file_manager = current_app.config['file_manager']
        data = request.get_json()
        if not data:
            return jsonify(ErrorResponse(error="No data provided", status_code=400).dict()), 400

        session_id = data.get('session_id')
        file_id = data.get('file_id')
        page_order = data.get('page_order', [])  # e.g. [3, 1, 4, 2]

        if not session_id or not file_id:
            return jsonify(ErrorResponse(error="session_id and file_id required", status_code=400).dict()), 400
        if not page_order:
            return jsonify(ErrorResponse(error="page_order is required", status_code=400).dict()), 400

        file_info = file_manager.get_file(session_id, file_id)
        if not file_info:
            return jsonify(ErrorResponse(error="File not found", status_code=404).dict()), 404

        pdf_path = file_info['path']
        job_id = SecurityUtils.generate_job_id()
        output_folder = Config.MERGED_FOLDER / session_id
        output_folder.mkdir(parents=True, exist_ok=True)

        original_filename = file_info['metadata'].get('original_filename', 'reordered.pdf')
        output_filename = f"reordered_{original_filename}"
        output_path = output_folder / f"{job_id}_{output_filename}"

        PDFProcessor.extract_pages(pdf_path, page_order, output_path)

        job_manager = current_app.config.get('job_manager', {})
        job_manager[job_id] = {
            'session_id': session_id,
            'output_path': output_path,
            'output_filename': output_filename,
            'status': 'completed',
            'total_pages': len(page_order),
        }
        current_app.config['job_manager'] = job_manager

        return jsonify({
            'job_id': job_id,
            'status': 'completed',
            'output_filename': output_filename,
            'total_pages': len(page_order),
        }), 200

    except Exception as e:
        logger.error(f"Reorder error: {e}")
        return jsonify(ErrorResponse(error="Reorder failed", detail=str(e), status_code=500).dict()), 500


# ── Delete PDF Pages ──

@tools_bp.route('/delete-pages', methods=['POST'])
def delete_pages():
    """Remove specific pages from a PDF."""
    try:
        file_manager = current_app.config['file_manager']
        data = request.get_json()
        if not data:
            return jsonify(ErrorResponse(error="No data provided", status_code=400).dict()), 400

        session_id = data.get('session_id')
        file_id = data.get('file_id')
        pages_to_delete = data.get('pages', [])  # 1-indexed pages to remove

        if not session_id or not file_id:
            return jsonify(ErrorResponse(error="session_id and file_id required", status_code=400).dict()), 400
        if not pages_to_delete:
            return jsonify(ErrorResponse(error="pages to delete required", status_code=400).dict()), 400

        file_info = file_manager.get_file(session_id, file_id)
        if not file_info:
            return jsonify(ErrorResponse(error="File not found", status_code=404).dict()), 404

        pdf_path = file_info['path']
        page_count = file_info['metadata']['page_count']

        # Build list of pages to KEEP
        pages_to_keep = [p for p in range(1, page_count + 1) if p not in pages_to_delete]
        if not pages_to_keep:
            return jsonify(ErrorResponse(error="Cannot delete all pages", status_code=400).dict()), 400

        job_id = SecurityUtils.generate_job_id()
        output_folder = Config.MERGED_FOLDER / session_id
        output_folder.mkdir(parents=True, exist_ok=True)

        original_filename = file_info['metadata'].get('original_filename', 'modified.pdf')
        output_filename = f"modified_{original_filename}"
        output_path = output_folder / f"{job_id}_{output_filename}"

        PDFProcessor.extract_pages(pdf_path, pages_to_keep, output_path)

        job_manager = current_app.config.get('job_manager', {})
        job_manager[job_id] = {
            'session_id': session_id,
            'output_path': output_path,
            'output_filename': output_filename,
            'status': 'completed',
            'total_pages': len(pages_to_keep),
        }
        current_app.config['job_manager'] = job_manager

        return jsonify({
            'job_id': job_id,
            'status': 'completed',
            'output_filename': output_filename,
            'total_pages': len(pages_to_keep),
            'deleted_pages': len(pages_to_delete),
            'remaining_pages': len(pages_to_keep),
        }), 200

    except Exception as e:
        logger.error(f"Delete pages error: {e}")
        return jsonify(ErrorResponse(error="Delete pages failed", detail=str(e), status_code=500).dict()), 500
