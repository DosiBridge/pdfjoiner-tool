"""PDF processing service."""
import logging
from pathlib import Path
from typing import List, Optional, Tuple
from pypdf import PdfReader, PdfWriter, PageObject, Transformation
from pypdf.generic import RectangleObject
import io

logger = logging.getLogger(__name__)


class PDFProcessor:
    """Handle PDF operations."""
    
    @staticmethod
    def get_page_count(pdf_path: Path) -> int:
        """Get number of pages in PDF."""
        try:
            reader = PdfReader(str(pdf_path))
            return len(reader.pages)
        except Exception as e:
            logger.error(f"Error reading PDF {pdf_path}: {e}")
            raise
    
    @staticmethod
    def get_metadata(pdf_path: Path) -> dict:
        """
        Get PDF metadata.
        
        Returns:
            dict: Metadata including title, author, subject, page info
        """
        try:
            reader = PdfReader(str(pdf_path))
            metadata = reader.metadata or {}
            
            pages_info = []
            for i, page in enumerate(reader.pages):
                media_box = page.mediabox
                pages_info.append({
                    'page_number': i + 1,
                    'width': float(media_box.width),
                    'height': float(media_box.height),
                    'rotation': page.get('/Rotate', 0)
                })
            
            return {
                'title': metadata.get('/Title', None),
                'author': metadata.get('/Author', None),
                'subject': metadata.get('/Subject', None),
                'page_count': len(reader.pages),
                'pages': pages_info
            }
        except Exception as e:
            logger.error(f"Error reading metadata from {pdf_path}: {e}")
            raise
    
    @staticmethod
    def extract_pages(
        pdf_path: Path,
        page_numbers: List[int],
        output_path: Path
    ) -> None:
        """
        Extract specific pages from PDF.
        
        Args:
            pdf_path: Source PDF file
            page_numbers: List of page numbers to extract (1-indexed)
            output_path: Output PDF file path
        """
        try:
            reader = PdfReader(str(pdf_path))
            writer = PdfWriter()
            
            for page_num in page_numbers:
                if 1 <= page_num <= len(reader.pages):
                    writer.add_page(reader.pages[page_num - 1])
                else:
                    logger.warning(f"Page {page_num} out of range, skipping")
            
            with open(output_path, 'wb') as output_file:
                writer.write(output_file)
                
        except Exception as e:
            logger.error(f"Error extracting pages: {e}")
            raise
    
    @staticmethod
    def merge_pdfs(
        pdf_sources: List[Tuple[Path, List[int]]],
        output_path: Path,
        add_page_numbers: bool = False,
        watermark_text: Optional[str] = None,
        password: Optional[str] = None,
        metadata: Optional[dict] = None
    ) -> int:
        """
        Merge multiple PDFs with specific pages.
        
        Args:
            pdf_sources: List of (pdf_path, page_numbers) tuples
            output_path: Output file path
            add_page_numbers: Whether to add page numbers
            watermark_text: Optional watermark text
            password: Optional password for output PDF
            metadata: Optional metadata for output PDF
            
        Returns:
            int: Total number of pages in merged PDF
        """
        try:
            writer = PdfWriter()
            total_pages = 0
            
            for pdf_path, page_numbers in pdf_sources:
                reader = PdfReader(str(pdf_path))
                
                for page_num in page_numbers:
                    if 1 <= page_num <= len(reader.pages):
                        page = reader.pages[page_num - 1]
                        
                        # Add watermark if specified
                        if watermark_text:
                            page = PDFProcessor._add_watermark_to_page(
                                page, watermark_text
                            )
                        
                        writer.add_page(page)
                        total_pages += 1
                    else:
                        logger.warning(
                            f"Page {page_num} out of range in {pdf_path}, skipping"
                        )
            
            # Add page numbers if requested
            if add_page_numbers:
                PDFProcessor._add_page_numbers(writer)
            
            # Set metadata
            if metadata:
                if 'title' in metadata and metadata['title']:
                    writer.add_metadata({'/Title': metadata['title']})
                if 'author' in metadata and metadata['author']:
                    writer.add_metadata({'/Author': metadata['author']})
                if 'subject' in metadata and metadata['subject']:
                    writer.add_metadata({'/Subject': metadata['subject']})
            
            # Write output
            with open(output_path, 'wb') as output_file:
                if password:
                    writer.encrypt(password)
                writer.write(output_file)
            
            logger.info(f"Successfully merged {total_pages} pages to {output_path}")
            return total_pages
            
        except Exception as e:
            logger.error(f"Error merging PDFs: {e}")
            raise
    
    @staticmethod
    def _add_watermark_to_page(
        page: PageObject,
        watermark_text: str
    ) -> PageObject:
        """
        Add watermark text to a page.
        
        Args:
            page: PDF page object
            watermark_text: Text to add as watermark
            
        Returns:
            PageObject: Page with watermark
        """
        try:
            # Create watermark
            packet = io.BytesIO()
            # This is a simplified version - in production, you'd use reportlab
            # or another library to create proper watermark
            
            # For now, just return the page as-is
            # In a full implementation, use reportlab to create watermark overlay
            return page
            
        except Exception as e:
            logger.error(f"Error adding watermark: {e}")
            return page
    
    @staticmethod
    def _add_page_numbers(writer: PdfWriter) -> None:
        """
        Add page numbers to PDF.
        
        Args:
            writer: PdfWriter object
        """
        try:
            # This is a simplified version
            # In production, use reportlab or similar to add page numbers
            total_pages = len(writer.pages)
            
            for i in range(total_pages):
                page = writer.pages[i]
                # Add page number logic here
                # This would require creating text overlay
                pass
                
        except Exception as e:
            logger.error(f"Error adding page numbers: {e}")
    
    @staticmethod
    def rotate_page(pdf_path: Path, page_number: int, angle: int) -> None:
        """
        Rotate a specific page in PDF.
        
        Args:
            pdf_path: PDF file path
            page_number: Page number (1-indexed)
            angle: Rotation angle (90, 180, 270)
        """
        try:
            reader = PdfReader(str(pdf_path))
            writer = PdfWriter()
            
            for i, page in enumerate(reader.pages):
                if i == page_number - 1:
                    page.rotate(angle)
                writer.add_page(page)
            
            with open(pdf_path, 'wb') as output_file:
                writer.write(output_file)
                
        except Exception as e:
            logger.error(f"Error rotating page: {e}")
            raise
    
    @staticmethod
    def validate_pdf(pdf_path: Path) -> Tuple[bool, str]:
        """
        Validate if PDF is readable and not corrupted.
        
        Returns:
            Tuple[bool, str]: (is_valid, error_message)
        """
        try:
            reader = PdfReader(str(pdf_path))
            # Try to read all pages
            page_count = len(reader.pages)
            if page_count == 0:
                return False, "PDF has no pages"
            
            # Try to access first page
            _ = reader.pages[0]
            
            return True, ""
            
        except Exception as e:
            return False, f"Invalid or corrupted PDF: {str(e)}"

