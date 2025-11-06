"""File validation utilities."""
import logging
import os
from pathlib import Path
from werkzeug.utils import secure_filename

# Try to import magic, but make it optional
try:
    import magic
    HAS_MAGIC = True
except ImportError:
    HAS_MAGIC = False

try:
    from config import Config
except ImportError:
    import sys
    from pathlib import Path
    sys.path.insert(0, str(Path(__file__).parent.parent.parent))
    from config import Config


class FileValidator:
    """Validator for uploaded files."""
    
    @staticmethod
    def allowed_file(filename: str) -> bool:
        """Check if file has allowed extension."""
        return '.' in filename and \
               filename.rsplit('.', 1)[1].lower() in Config.ALLOWED_EXTENSIONS
    
    @staticmethod
    def validate_pdf(file_path: Path) -> tuple[bool, str]:
        """
        Validate if file is a real PDF.
        
        Returns:
            tuple: (is_valid, error_message)
        """
        try:
            # Check file size
            file_size = file_path.stat().st_size
            if file_size > Config.MAX_FILE_SIZE:
                max_mb = Config.MAX_FILE_SIZE / (1024 * 1024)
                return False, f"File size exceeds maximum limit of {max_mb}MB"
            
            if file_size == 0:
                return False, "File is empty"
            
            # Check MIME type (if magic is available)
            if HAS_MAGIC:
                try:
                    mime = magic.Magic(mime=True)
                    file_type = mime.from_file(str(file_path))
                    
                    if file_type != 'application/pdf':
                        return False, f"Invalid file type: {file_type}. Expected PDF"
                except Exception as e:
                    # If magic fails, skip MIME check but log warning
                    logger = logging.getLogger(__name__)
                    logger.warning(f"MIME type check failed: {e}")
            else:
                # Basic validation: check file extension and first few bytes
                with open(file_path, 'rb') as f:
                    header = f.read(4)
                    if header != b'%PDF':
                        return False, "File does not appear to be a valid PDF"
            
            return True, ""
            
        except Exception as e:
            return False, f"Validation error: {str(e)}"
    
    @staticmethod
    def sanitize_filename(filename: str) -> str:
        """Sanitize and secure filename."""
        # Remove path components
        filename = os.path.basename(filename)
        # Secure the filename
        filename = secure_filename(filename)
        # Ensure it's not empty
        if not filename:
            filename = "document.pdf"
        return filename
    
    @staticmethod
    def validate_page_range(pages: list[int], max_pages: int) -> tuple[bool, str]:
        """
        Validate page numbers.
        
        Args:
            pages: List of page numbers (1-indexed)
            max_pages: Maximum number of pages in PDF
            
        Returns:
            tuple: (is_valid, error_message)
        """
        if not pages:
            return False, "No pages specified"
        
        for page in pages:
            if not isinstance(page, int):
                return False, f"Invalid page number: {page}"
            if page < 1 or page > max_pages:
                return False, f"Page {page} out of range (1-{max_pages})"
        
        return True, ""

