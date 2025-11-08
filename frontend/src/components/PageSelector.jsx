import { Check, Grid3x3, List, Loader, Square } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { pdfAPI } from '../services/api';

// Optimized Thumbnail Image Component - fast loading
const ThumbnailImage = ({ sessionId, fileId, pageNumber, viewMode }) => {
  const [imageSrc, setImageSrc] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    // Load immediately - no lazy loading for speed
    loadThumbnailFast();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionId, fileId, pageNumber]);

  const loadThumbnailFast = () => {
    const url = pdfAPI.getThumbnailUrl(sessionId, fileId, pageNumber);
    
    // Create image with optimized settings
    const img = new Image();
    img.decoding = 'async';
    img.loading = 'eager';
    
    let timeoutId = null;
    
    img.onload = () => {
      if (timeoutId) clearTimeout(timeoutId);
      setImageSrc(url);
      setIsLoading(false);
      setError(false);
    };
    
    img.onerror = () => {
      if (timeoutId) clearTimeout(timeoutId);
      setIsLoading(false);
      setError(true);
    };
    
    // Fast timeout - 3 seconds max
    timeoutId = setTimeout(() => {
      if (!img.complete) {
        img.onerror();
      }
    }, 3000);
    
    // Start loading immediately
    img.src = url;
  };

  if (isLoading) {
    return (
      <div 
        ref={containerRef}
        className="w-full h-full bg-gray-200 rounded flex flex-col items-center justify-center animate-pulse"
      >
        <Loader className="w-4 h-4 sm:w-5 sm:h-5 animate-spin text-gray-400" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-full bg-gray-200 rounded flex flex-col items-center justify-center text-gray-500">
        <span className="text-xs">Page {pageNumber}</span>
      </div>
    );
  }

  return (
    <img
      src={imageSrc}
      alt={`Page ${pageNumber}`}
      className="w-full h-full object-cover rounded"
      loading="eager"
      decoding="async"
      fetchpriority="high"
    />
  );
};

const PageSelector = ({ file, sessionId, selectedPages, onSelectionChange }) => {
  const [thumbnails, setThumbnails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid');
  const [selectAll, setSelectAll] = useState(false);
  const [allPagesLoaded, setAllPagesLoaded] = useState(false);
  const [loadedCount, setLoadedCount] = useState(0);
  const containerRef = useRef(null);

  // Stream pages: Load all page metadata immediately, thumbnails load progressively
  useEffect(() => {
    loadAllPagesMetadata();
  }, [file.file_id]);

  useEffect(() => {
    setSelectAll(selectedPages.length === file.page_count);
  }, [selectedPages, file.page_count]);

  // Load all page metadata immediately (fast, no API call needed)
  const loadAllPagesMetadata = async () => {
    try {
      setLoading(true);
      const totalPages = file.page_count || 1;
      
      // Create complete page list immediately - this is instant
      const pages = [];
      for (let i = 1; i <= totalPages; i++) {
        pages.push({
          page_number: i,
          url: pdfAPI.getThumbnailUrl(sessionId, file.file_id, i),
          loaded: false
        });
      }
      
      setThumbnails(pages);
      setAllPagesLoaded(true);
      setLoading(false);
      
      // Start ultra-fast parallel loading - all at once with high concurrency
      // Don't await - let it run in background
      loadAllThumbnailsFast(pages).catch(err => {
        console.error('Error in thumbnail loading:', err);
      });
    } catch (error) {
      console.error('Error loading pages:', error);
      toast.error('Failed to load pages');
      
      // Even on error, show page list
      const totalPages = file.page_count || 1;
      const pages = [];
      for (let i = 1; i <= totalPages; i++) {
        pages.push({
          page_number: i,
          url: pdfAPI.getThumbnailUrl(sessionId, file.file_id, i),
          loaded: false
        });
      }
      setThumbnails(pages);
      setAllPagesLoaded(true);
      setLoading(false);
    }
  };

  // Ultra-fast parallel loading - load all thumbnails concurrently for 1s target
  const loadAllThumbnailsFast = async (pages) => {
    const startTime = performance.now();
    const totalPages = pages.length;
    
    // Load ALL thumbnails in parallel - maximum concurrency for speed
    const concurrency = 100; // High concurrency but not too high to avoid browser limits
    const allPromises = [];
    
    // Load all pages in parallel batches - no server batch API (faster)
    for (let i = 0; i < totalPages; i += concurrency) {
      const batch = pages.slice(i, Math.min(i + concurrency, totalPages));
      const batchPromises = batch.map(page => preloadThumbnailFast(page.page_number));
      allPromises.push(...batchPromises);
      
      // Update progress immediately
      const loaded = Math.min(i + concurrency, totalPages);
      setLoadedCount(loaded);
      
      // Small delay between batches to prevent browser overload
      if (i + concurrency < totalPages) {
        await new Promise(resolve => setTimeout(resolve, 10)); // 10ms delay
      }
    }
    
    // Wait for all to complete in parallel
    await Promise.allSettled(allPromises);
    
    setLoadedCount(totalPages);
    
    const duration = performance.now() - startTime;
    console.log(`⚡ Loaded ${totalPages} thumbnails in ${duration.toFixed(0)}ms (${(duration/1000).toFixed(2)}s)`);
  };

  // Ultra-fast preload - optimized for 1s loading
  const preloadThumbnailFast = (pageNumber) => {
    return new Promise((resolve) => {
      const img = new Image();
      
      // Maximum optimization for speed
      img.decoding = 'async';
      img.loading = 'eager';
      if (img.fetchPriority) {
        img.fetchPriority = 'high';
      }
      
      let resolved = false;
      let timeoutId = null;
      
      const markComplete = () => {
        if (resolved) return;
        resolved = true;
        if (timeoutId) clearTimeout(timeoutId);
        setThumbnails(prev => prev.map(t => 
          t.page_number === pageNumber ? { ...t, loaded: true } : t
        ));
        resolve();
      };
      
      img.onload = markComplete;
      img.onerror = markComplete; // Don't block on errors
      
      // Fast timeout - 2 seconds max
      timeoutId = setTimeout(() => {
        if (!resolved) markComplete();
      }, 2000);
      
      // Start loading immediately - no delays
      const url = pdfAPI.getThumbnailUrl(sessionId, file.file_id, pageNumber);
      img.src = url;
    });
  };

  const handlePageToggle = (pageNumber) => {
    const newSelection = selectedPages.includes(pageNumber)
      ? selectedPages.filter((p) => p !== pageNumber)
      : [...selectedPages, pageNumber].sort((a, b) => a - b);
    
    onSelectionChange(file.file_id, newSelection);
  };

  const handleSelectAll = () => {
    if (selectAll) {
      onSelectionChange(file.file_id, []);
    } else {
      const allPages = Array.from({ length: file.page_count }, (_, i) => i + 1);
      onSelectionChange(file.file_id, allPages);
    }
  };

  const handleSelectVisible = () => {
    const visiblePages = thumbnails.map(t => t.page_number);
    const allVisibleSelected = visiblePages.every(p => selectedPages.includes(p));
    
    if (allVisibleSelected) {
      // Deselect visible pages
      const newSelection = selectedPages.filter(p => !visiblePages.includes(p));
      onSelectionChange(file.file_id, newSelection);
    } else {
      // Select all visible pages
      const newSelection = [...new Set([...selectedPages, ...visiblePages])].sort((a, b) => a - b);
      onSelectionChange(file.file_id, newSelection);
    }
  };

  if (loading && thumbnails.length === 0) {
    return (
      <div className="flex items-center justify-center py-8 sm:py-12">
        <Loader className="w-6 h-6 sm:w-8 sm:h-8 animate-spin text-primary-600" />
        <span className="ml-2 sm:ml-3 text-sm sm:text-base text-gray-600">Loading page previews...</span>
      </div>
    );
  }

  const visiblePagesSelected = thumbnails.length > 0 && 
    thumbnails.every(t => selectedPages.includes(t.page_number));

  return (
    <div className="space-y-3 sm:space-y-4">
      {/* Controls */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-0">
        <div className="flex flex-col xs:flex-row items-stretch xs:items-center space-y-2 xs:space-y-0 xs:space-x-3 sm:space-x-4 flex-1">
          <button
            onClick={handleSelectAll}
            className="flex items-center justify-center xs:justify-start space-x-2 px-3 sm:px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-sm sm:text-base"
          >
            {selectAll ? <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : <Square className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
            <span className="whitespace-nowrap">{selectAll ? 'Deselect All' : 'Select All'}</span>
          </button>

          <button
            onClick={handleSelectVisible}
            className="flex items-center justify-center xs:justify-start space-x-2 px-3 sm:px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors text-sm sm:text-base"
          >
            {visiblePagesSelected ? <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : <Square className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
            <span className="whitespace-nowrap">{visiblePagesSelected ? 'Deselect Visible' : 'Select Visible'}</span>
          </button>
          
          <span className="text-xs sm:text-sm text-gray-600 flex items-center justify-center xs:justify-start">
            {selectedPages.length} of {file.page_count} pages selected
          </span>
        </div>

        <div className="flex items-center space-x-2 self-center sm:self-auto">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-lg transition-colors ${
              viewMode === 'grid'
                ? 'bg-primary-100 text-primary-700'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
            title="Grid view"
          >
            <Grid3x3 className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-lg transition-colors ${
              viewMode === 'list'
                ? 'bg-primary-100 text-primary-700'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
            title="List view"
          >
            <List className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
      </div>

      {/* Pages - All pages shown with streaming thumbnails */}
      {loading && thumbnails.length === 0 && (
        <div className="flex items-center justify-center py-8">
          <Loader className="w-6 h-6 animate-spin text-primary-600" />
          <span className="ml-2 text-sm text-gray-600">Loading pages...</span>
        </div>
      )}
      
      {thumbnails.length > 0 && (
        <div className="space-y-2" ref={containerRef}>
          <div className="flex items-center justify-between text-xs sm:text-sm text-gray-500">
            <span>
              Showing all {thumbnails.length} pages
            </span>
            {loadedCount < thumbnails.length && (
              <span className="flex items-center space-x-2">
                <Loader className="w-3 h-3 animate-spin" />
                <span>Loading thumbnails... {loadedCount}/{thumbnails.length}</span>
              </span>
            )}
          </div>
          
      <div className={`
        ${viewMode === 'grid'
          ? 'grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-3 md:gap-4'
          : 'space-y-2 sm:space-y-3'
        }
      `}>
        {thumbnails.map((thumbnail) => {
          const isSelected = selectedPages.includes(thumbnail.page_number);
          
          return (
            <div
              key={thumbnail.page_number}
              onClick={() => handlePageToggle(thumbnail.page_number)}
              className={`
                page-thumbnail relative cursor-pointer rounded-lg border-2 overflow-hidden
                transition-all duration-200
                ${isSelected ? 'border-primary-500 ring-2 ring-primary-200' : 'border-gray-200 hover:border-primary-300'}
                ${viewMode === 'list' ? 'flex items-center space-x-3 sm:space-x-4 p-2 sm:p-3' : 'p-1.5 sm:p-2'}
              `}
            >
              {/* Selection indicator */}
              <div className={`
                absolute top-1 right-1 sm:top-2 sm:right-2 z-10 w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center
                transition-all duration-200
                ${isSelected ? 'bg-primary-600 text-white' : 'bg-white border-2 border-gray-300'}
              `}>
                {isSelected && <Check className="w-3 h-3 sm:w-4 sm:h-4" />}
              </div>

              {/* Thumbnail */}
              <div className={viewMode === 'list' ? 'w-16 h-20 sm:w-24 sm:h-32 flex-shrink-0' : 'w-full aspect-[3/4] bg-gray-100 rounded relative overflow-hidden'}>
                <ThumbnailImage
                  sessionId={sessionId}
                  fileId={file.file_id}
                  pageNumber={thumbnail.page_number}
                  viewMode={viewMode}
                />
              </div>

              {/* Page number */}
              <div className={`
                ${viewMode === 'list' ? 'flex-1 min-w-0' : 'mt-1 sm:mt-2 text-center'}
              `}>
                <p className="text-xs sm:text-sm font-medium text-gray-700 truncate">
                  Page {thumbnail.page_number}
                </p>
              </div>
            </div>
          );
        })}
      </div>
        </div>
      )}

    </div>
  );
};

export default PageSelector;
