export const APP_NAME = 'PDF Joiner Pro';
export const APP_VERSION = '1.0.0';

export const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB
export const MAX_FILES = 20;

export const ALLOWED_FILE_TYPES = {
  'application/pdf': ['.pdf'],
};

export const VIEW_MODES = {
  GRID: 'grid',
  LIST: 'list',
};

export const ROTATION_ANGLES = [0, 90, 180, 270];

export const TOAST_DURATION = 3000;

export const ERROR_MESSAGES = {
  UPLOAD_FAILED: 'Failed to upload file',
  INVALID_FILE: 'Invalid file type. Please upload PDF files only',
  FILE_TOO_LARGE: 'File size exceeds 50MB limit',
  MERGE_FAILED: 'Failed to merge PDFs',
  DOWNLOAD_FAILED: 'Failed to download file',
  NO_FILES: 'Please upload at least one PDF file',
  NO_PAGES: 'Please select at least one page to merge',
};

export const SUCCESS_MESSAGES = {
  UPLOAD_SUCCESS: 'Files uploaded successfully',
  MERGE_SUCCESS: 'PDFs merged successfully',
  FILE_DELETED: 'File deleted successfully',
};

