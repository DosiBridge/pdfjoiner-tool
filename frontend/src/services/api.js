import axios from 'axios';

// Get API base URL from environment variables
// Priority:
// 1. VITE_API_URL environment variable (can be absolute or relative)
// 2. Relative path '/api' (uses Vite proxy in development)
// 3. Fallback to localhost:5000 for server-side rendering
const getApiBaseUrl = () => {
  // If VITE_API_URL is explicitly set, use it
  if (import.meta.env.VITE_API_URL) {
    const url = import.meta.env.VITE_API_URL.trim();
    // If it's an absolute URL, use it as-is
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return url;
    }
    // If it's a relative path, use it as-is (will use proxy in dev)
    return url;
  }
  
  // Default: use relative path (proxy handles it in dev, works in production)
  return typeof window !== 'undefined' ? '/api' : 'http://localhost:5000/api';
};

const API_BASE_URL = getApiBaseUrl();

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export const pdfAPI = {
  // Upload files
  uploadFiles: async (files, sessionId = null) => {
    const formData = new FormData();
    
    files.forEach((file) => {
      formData.append('files', file);
    });
    
    if (sessionId) {
      formData.append('session_id', sessionId);
    }
    
    const response = await api.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
    return response.data;
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

  // Generate all thumbnails
  generateAllThumbnails: async (sessionId, fileId) => {
    const response = await api.post(`/pdf/${sessionId}/${fileId}/thumbnails`);
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

  // Merge PDFs
  mergePDFs: async (mergeRequest) => {
    const response = await api.post('/merge', mergeRequest);
    return response.data;
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

