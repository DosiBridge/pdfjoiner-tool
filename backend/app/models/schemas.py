"""Data models and schemas."""
from typing import Optional, List
from pydantic import BaseModel, Field, validator


class UploadResponse(BaseModel):
    """Response model for file upload."""
    file_id: str
    filename: str
    original_filename: str
    page_count: int
    file_size: int
    file_size_formatted: str


class PageInfo(BaseModel):
    """Information about a PDF page."""
    page_number: int
    width: float
    height: float
    rotation: int = 0


class PDFMetadata(BaseModel):
    """PDF file metadata."""
    file_id: str
    filename: str
    page_count: int
    file_size: int
    pages: List[PageInfo]
    title: Optional[str] = None
    author: Optional[str] = None
    subject: Optional[str] = None


class PageSelection(BaseModel):
    """Page selection for merging."""
    file_id: str
    pages: List[int] = Field(..., description="1-indexed page numbers")
    
    @validator('pages')
    def validate_pages(cls, v):
        if not v:
            raise ValueError("At least one page must be selected")
        if any(p < 1 for p in v):
            raise ValueError("Page numbers must be positive")
        return v


class MergeRequest(BaseModel):
    """Request model for PDF merge operation."""
    session_id: str
    selections: List[PageSelection]
    output_filename: Optional[str] = "merged.pdf"
    add_page_numbers: bool = False
    watermark_text: Optional[str] = None
    password: Optional[str] = None
    
    @validator('output_filename')
    def validate_filename(cls, v):
        if not v.endswith('.pdf'):
            v = f"{v}.pdf"
        return v
    
    @validator('selections')
    def validate_selections(cls, v):
        if not v:
            raise ValueError("At least one file must be selected")
        return v


class MergeResponse(BaseModel):
    """Response model for merge operation."""
    job_id: str
    status: str = "processing"
    output_filename: str
    total_pages: int


class JobStatus(BaseModel):
    """Job status model."""
    job_id: str
    status: str  # processing, completed, failed
    progress: int = 0  # 0-100
    message: Optional[str] = None
    download_url: Optional[str] = None


class ErrorResponse(BaseModel):
    """Error response model."""
    error: str
    detail: Optional[str] = None
    status_code: int = 400


class HealthResponse(BaseModel):
    """Health check response."""
    status: str = "healthy"
    version: str = "1.0.0"
    uptime: float

