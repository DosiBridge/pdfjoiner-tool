/**
 * Format file size in human-readable format
 */
export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
};

/**
 * Generate unique ID
 */
export const generateId = () => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Download file from URL
 */
export const downloadFile = (url, filename) => {
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

/**
 * Validate PDF file
 */
export const validatePDFFile = (file) => {
  const maxSize = 50 * 1024 * 1024; // 50MB
  
  if (file.type !== 'application/pdf') {
    return { valid: false, error: 'File must be a PDF' };
  }
  
  if (file.size > maxSize) {
    return { valid: false, error: 'File size exceeds 50MB limit' };
  }
  
  if (file.size === 0) {
    return { valid: false, error: 'File is empty' };
  }
  
  return { valid: true };
};

/**
 * Get or create session ID
 */
export const getSessionId = () => {
  let sessionId = sessionStorage.getItem('pdf_session_id');
  
  if (!sessionId) {
    sessionId = generateId();
    sessionStorage.setItem('pdf_session_id', sessionId);
  }
  
  return sessionId;
};

/**
 * Clear session
 */
export const clearSession = () => {
  sessionStorage.removeItem('pdf_session_id');
};

/**
 * Debounce function
 */
export const debounce = (func, wait) => {
  let timeout;
  
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/**
 * Group pages by file
 */
export const groupPagesByFile = (pages) => {
  const grouped = {};
  
  pages.forEach((page) => {
    if (!grouped[page.fileId]) {
      grouped[page.fileId] = [];
    }
    grouped[page.fileId].push(page);
  });
  
  return grouped;
};

/**
 * Calculate total pages
 */
export const calculateTotalPages = (selections) => {
  return selections.reduce((total, selection) => {
    return total + selection.pages.length;
  }, 0);
};

