import axios from 'axios';

// Get API base URL from environment variables
// Priority:
// 1. VITE_API_URL environment variable (can be absolute or relative)
// 2. Relative path '/api' (uses Vite proxy in development)
// 3. Fallback to localhost:5000 for server-side rendering
const getApiBaseUrl = () => {
  // If VITE_API_URL is explicitly set, use it
  if (import.meta.env.VITE_API_URL) {
    let url = import.meta.env.VITE_API_URL.trim();
    // If it's an absolute URL, ensure it ends with /api
    if (url.startsWith('http://') || url.startsWith('https://')) {
      // Remove trailing slash if present
      url = url.replace(/\/+$/, '');
      // Ensure it ends with /api
      if (!url.endsWith('/api')) {
        url = url + '/api';
      }
      return url;
    }
    // If it's a relative path, use it as-is (will use proxy in dev)
    return url;
  }
  
  // Default: use relative path (proxy handles it in dev, works in production)
  return typeof window !== 'undefined' ? '/api' : 'http://localhost:5000/api';
};

const API_BASE_URL = getApiBaseUrl();

// Log API base URL in development for debugging
if (import.meta.env.DEV) {
  console.log('API Base URL:', API_BASE_URL);
}

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  // Optimize for speed - HTTP/2 multiplexing
  maxRedirects: 5,
  timeout: 60000, // Default 60 seconds (increased from 30s for large operations)
  // Enable HTTP keep-alive for connection reuse
  httpAgent: typeof window === 'undefined' ? undefined : undefined, // Browser handles this
  httpsAgent: typeof window === 'undefined' ? undefined : undefined,
});

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const requestUrl = error.config ? `${error.config.baseURL}${error.config.url}` : 'unknown';
    
    // Extract meaningful error message
    let errorMessage = error.message || 'Unknown error';
    
    if (error.response) {
      // Server responded with error status
      const status = error.response.status;
      const data = error.response.data;
      
      if (data?.error) {
        errorMessage = data.error;
      } else if (data?.detail) {
        errorMessage = data.detail;
      } else if (data?.message) {
        errorMessage = data.message;
      } else {
        errorMessage = `Server error (${status})`;
      }
      
      console.error('API Error:', {
        message: errorMessage,
        url: requestUrl,
        status: status,
        data: data
      });
    } else if (error.request) {
      // Request was made but no response received
      if (error.code === 'ECONNABORTED') {
        errorMessage = `Request timeout: ${error.message || 'Operation took too long'}`;
      } else {
        errorMessage = 'Network error: No response from server';
      }
      console.error('API Error: Network error -', {
        message: error.message,
        code: error.code,
        url: requestUrl
      });
    } else {
      // Something else happened (timeout, etc.)
      if (error.code === 'ECONNABORTED') {
        errorMessage = `Request timeout: ${error.message || 'Operation took too long'}`;
      } else {
        errorMessage = error.message || 'Unknown error';
      }
      console.error('API Error:', {
        message: error.message,
        code: error.code,
        url: requestUrl
      });
    }
    
    // Attach formatted error message to error object
    error.formattedMessage = errorMessage;
    
    return Promise.reject(error);
  }
);

export const pdfAPI = {
  // Upload files with progress tracking
  uploadFiles: async (files, sessionId = null, onProgress = null) => {
    const formData = new FormData();
    
    files.forEach((file) => {
      formData.append('files', file);
    });
    
    if (sessionId) {
      formData.append('session_id', sessionId);
    }
    
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      // Increase timeout for large files (60 seconds)
      timeout: 60000,
    };

    // Add progress tracking if callback provided
    if (onProgress) {
      config.onUploadProgress = (progressEvent) => {
        if (progressEvent.total) {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          onProgress(percentCompleted);
        } else {
          // If total is unknown, show indeterminate progress
          onProgress(50);
        }
      };
    }
    
    try {
      const response = await api.post('/upload', formData, config);
      return response.data;
    } catch (error) {
      // Re-throw with better context
      if (error.code === 'ECONNABORTED') {
        error.formattedMessage = 'Upload timeout: File is too large or connection is too slow';
      } else if (error.code === 'ERR_NETWORK') {
        error.formattedMessage = 'Network error: Please check your internet connection';
      }
      throw error;
    }
  },

  // Get PDF metadata
  getMetadata: async (sessionId, fileId) => {
    const response = await api.get(`/pdf/${sessionId}/${fileId}/metadata`);
    return response.data;
  },

  // Get page thumbnail
  getThumbnailUrl: (sessionId, fileId, pageNumber) => {
    return `${API_BASE_URL}/pdf/${sessionId}/${fileId}/thumbnail/${pageNumber}`;
  },

  // Generate all thumbnails (returns page list, thumbnails generated on-demand)
  generateAllThumbnails: async (sessionId, fileId) => {
    const response = await api.post(`/pdf/${sessionId}/${fileId}/thumbnails`);
    return response.data;
  },

  // Batch generate thumbnails - FAST parallel generation
  generateBatchThumbnails: async (sessionId, fileId, pages) => {
    const response = await api.post(`/pdf/${sessionId}/${fileId}/thumbnails/batch`, {
      pages: pages,
      force_regenerate: false
    });
    return response.data;
  },

  // Get paginated pages list
  getPagesList: async (sessionId, fileId, page = 1, perPage = 50) => {
    const response = await api.get(`/pdf/${sessionId}/${fileId}/pages`, {
      params: { page, per_page: perPage }
    });
    return response.data;
  },

  // List session files
  listSessionFiles: async (sessionId) => {
    const response = await api.get(`/session/${sessionId}/files`);
    return response.data;
  },

  // Delete file
  deleteFile: async (sessionId, fileId) => {
    const response = await api.delete(`/session/${sessionId}/file/${fileId}`);
    return response.data;
  },

  // Merge PDFs - with extended timeout for large PDFs
  mergePDFs: async (mergeRequest) => {
    try {
      const response = await api.post('/merge', mergeRequest, {
        timeout: 300000, // 5 minutes for large PDF merging
      });
      return response.data;
    } catch (error) {
      // Re-throw with better context for merge operations
      if (error.code === 'ECONNABORTED') {
        error.formattedMessage = 'Merge timeout: PDFs are too large or processing is taking too long. Please try with fewer pages.';
      } else if (error.code === 'ERR_NETWORK') {
        error.formattedMessage = 'Network error: Please check your internet connection';
      }
      throw error;
    }
  },

  // Get job status
  getJobStatus: async (jobId) => {
    const response = await api.get(`/job/${jobId}/status`);
    return response.data;
  },

  // Get download URL
  getDownloadUrl: (jobId) => {
    return `${API_BASE_URL}/download/${jobId}`;
  },

  // Clean up session
  cleanupSession: async (sessionId) => {
    const response = await api.delete(`/session/${sessionId}`);
    return response.data;
  },

  // Health check
  healthCheck: async () => {
    const response = await api.get('/health');
    return response.data;
  },
};

export default api;

