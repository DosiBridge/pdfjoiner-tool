"""Thumbnail generation service."""
import logging
import sys
from pathlib import Path
from typing import Optional
from pdf2image import convert_from_path
from PIL import Image

# Add parent directories to path (backend directory)
_backend_dir = Path(__file__).parent.parent.parent
if str(_backend_dir) not in sys.path:
    sys.path.insert(0, str(_backend_dir))
from config import Config

logger = logging.getLogger(__name__)


class ThumbnailGenerator:
    """Generate thumbnails from PDF pages."""
    
    @staticmethod
    def generate_page_thumbnail(
        pdf_path: Path,
        page_number: int,
        output_path: Path,
        size: Optional[int] = None,
        quality: Optional[int] = None
    ) -> bool:
        """
        Generate thumbnail for a specific PDF page.
        
        Args:
            pdf_path: Path to PDF file
            page_number: Page number (1-indexed)
            output_path: Path to save thumbnail
            size: Thumbnail size (width/height for square thumbnail)
            quality: JPEG quality (1-100)
            
        Returns:
            bool: True if successful
        """
        size = size or Config.THUMBNAIL_SIZE
        quality = quality or Config.THUMBNAIL_QUALITY
        
        try:
            # Convert specific page to image
            images = convert_from_path(
                str(pdf_path),
                first_page=page_number,
                last_page=page_number,
                dpi=72,  # Lower DPI for faster generation
                fmt='jpeg'
            )
            
            if not images:
                logger.error(f"No image generated for page {page_number}")
                return False
            
            # Get the image
            image = images[0]
            
            # Create thumbnail
            image.thumbnail((size, size), Image.Resampling.LANCZOS)
            
            # Ensure output directory exists
            output_path.parent.mkdir(parents=True, exist_ok=True)
            
            # Save thumbnail
            image.save(str(output_path), 'JPEG', quality=quality, optimize=True)
            
            logger.debug(f"Generated thumbnail for page {page_number}: {output_path}")
            return True
            
        except Exception as e:
            logger.error(f"Error generating thumbnail for page {page_number}: {e}")
            return False
    
    @staticmethod
    def generate_all_thumbnails(
        pdf_path: Path,
        output_folder: Path,
        prefix: str = "page",
        max_pages: Optional[int] = None
    ) -> list[Path]:
        """
        Generate thumbnails for all pages in a PDF.
        
        Args:
            pdf_path: Path to PDF file
            output_folder: Folder to save thumbnails
            prefix: Filename prefix for thumbnails
            max_pages: Maximum number of pages to process
            
        Returns:
            list[Path]: List of generated thumbnail paths
        """
        try:
            from pypdf import PdfReader
            reader = PdfReader(str(pdf_path))
            page_count = len(reader.pages)
            
            if max_pages:
                page_count = min(page_count, max_pages)
            
            thumbnail_paths = []
            
            for page_num in range(1, page_count + 1):
                output_path = output_folder / f"{prefix}_{page_num}.jpg"
                
                try:
                    if ThumbnailGenerator.generate_page_thumbnail(
                        pdf_path, page_num, output_path
                    ):
                        thumbnail_paths.append(output_path)
                except Exception as e:
                    logger.error(f"Failed to generate thumbnail for page {page_num}: {e}")
                    # Continue with other pages even if one fails
                    continue
            
            logger.info(
                f"Generated {len(thumbnail_paths)} thumbnails for {pdf_path.name}"
            )
            return thumbnail_paths
            
        except Exception as e:
            logger.error(f"Error generating thumbnails: {e}")
            return []
    
    @staticmethod
    def generate_thumbnail_on_demand(
        pdf_path: Path,
        page_number: int,
        cache_folder: Path
    ) -> Optional[Path]:
        """
        Generate thumbnail on-demand with caching.
        
        Args:
            pdf_path: Path to PDF file
            page_number: Page number (1-indexed)
            cache_folder: Folder for caching thumbnails
            
        Returns:
            Optional[Path]: Path to thumbnail if successful
        """
        # Create cache path
        pdf_id = pdf_path.stem
        cache_path = cache_folder / f"{pdf_id}_page_{page_number}.jpg"
        
        # Check if thumbnail already exists
        if cache_path.exists():
            logger.debug(f"Using cached thumbnail: {cache_path}")
            return cache_path
        
        # Generate thumbnail
        if ThumbnailGenerator.generate_page_thumbnail(
            pdf_path, page_number, cache_path
        ):
            return cache_path
        
        return None

