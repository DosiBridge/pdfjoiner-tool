import { Check, Grid3x3, List, Loader, Square } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { pdfAPI } from '../services/api';

const ThumbnailImage = ({ sessionId, fileId, pageNumber }) => {
  const [imageSrc, setImageSrc] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    loadThumbnail();
  }, [sessionId, fileId, pageNumber]);

  const loadThumbnail = () => {
    const url = pdfAPI.getThumbnailUrl(sessionId, fileId, pageNumber);
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

    timeoutId = setTimeout(() => {
      if (!img.complete) img.onerror();
    }, 3000);

    img.src = url;
  };

  if (isLoading) {
    return (
      <div className="w-full h-full bg-gray-200 rounded flex items-center justify-center animate-pulse">
        <Loader aria-hidden="true" className="w-4 h-4 sm:w-5 sm:h-5 animate-spin text-gray-400" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-full bg-gray-200 rounded flex items-center justify-center text-gray-500">
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
    />
  );
};

const PageSelector = ({ file, sessionId, selectedPages, onSelectionChange }) => {
  const [thumbnails, setThumbnails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid');
  const [selectAll, setSelectAll] = useState(false);
  const [loadedCount, setLoadedCount] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    loadPages();
  }, [file.file_id]);

  useEffect(() => {
    setSelectAll(selectedPages.length === file.page_count);
  }, [selectedPages, file.page_count]);

  const loadPages = async () => {
    try {
      setLoading(true);
      const totalPages = file.page_count || 1;
      const pages = [];
      for (let i = 1; i <= totalPages; i++) {
        pages.push({
          page_number: i,
          url: pdfAPI.getThumbnailUrl(sessionId, file.file_id, i),
          loaded: false,
        });
      }
      setThumbnails(pages);
      setLoading(false);

      loadThumbnailsParallel(pages).catch((err) => {
        console.error('Thumbnail loading error:', err);
      });
    } catch (error) {
      console.error('Error loading pages:', error);
      toast.error('Failed to load pages');
      const totalPages = file.page_count || 1;
      const pages = [];
      for (let i = 1; i <= totalPages; i++) {
        pages.push({
          page_number: i,
          url: pdfAPI.getThumbnailUrl(sessionId, file.file_id, i),
          loaded: false,
        });
      }
      setThumbnails(pages);
      setLoading(false);
    }
  };

  const loadThumbnailsParallel = async (pages) => {
    const concurrency = 100;
    const allPromises = [];

    for (let i = 0; i < pages.length; i += concurrency) {
      const batch = pages.slice(i, Math.min(i + concurrency, pages.length));
      const batchPromises = batch.map((page) => preloadThumbnail(page.page_number));
      allPromises.push(...batchPromises);
      setLoadedCount(Math.min(i + concurrency, pages.length));
      if (i + concurrency < pages.length) {
        await new Promise((resolve) => setTimeout(resolve, 10));
      }
    }

    await Promise.allSettled(allPromises);
    setLoadedCount(pages.length);
  };

  const preloadThumbnail = (pageNumber) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.decoding = 'async';
      img.loading = 'eager';

      let resolved = false;
      let timeoutId = null;

      const done = () => {
        if (resolved) return;
        resolved = true;
        if (timeoutId) clearTimeout(timeoutId);
        setThumbnails((prev) =>
          prev.map((t) =>
            t.page_number === pageNumber ? { ...t, loaded: true } : t
          )
        );
        resolve();
      };

      img.onload = done;
      img.onerror = done;
      timeoutId = setTimeout(() => { if (!resolved) done(); }, 2000);
      img.src = pdfAPI.getThumbnailUrl(sessionId, file.file_id, pageNumber);
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

  if (loading && thumbnails.length === 0) {
    return (
      <div className="flex items-center justify-center py-8 sm:py-12">
        <Loader aria-hidden="true" className="w-6 h-6 sm:w-8 sm:h-8 animate-spin text-primary-600" />
        <span className="ml-2 sm:ml-3 text-sm sm:text-base text-gray-600">Loading page previews...</span>
      </div>
    );
  }

  return (
    <div className="space-y-3 sm:space-y-4">
      {/* Controls */}
      <div className="flex flex-wrap items-center gap-2 sm:gap-3">
        <button
          onClick={handleSelectAll}
          className="flex items-center space-x-1.5 px-3 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-xs sm:text-sm"
        >
          {selectAll ? (
            <Check aria-hidden="true" className="w-3.5 h-3.5" />
          ) : (
            <Square aria-hidden="true" className="w-3.5 h-3.5" />
          )}
          <span>{selectAll ? 'Deselect All' : 'Select All'}</span>
        </button>

        <span className="text-xs sm:text-sm text-gray-600">
          {selectedPages.length}/{file.page_count} selected
        </span>

        <div className="ml-auto flex items-center space-x-1">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-1.5 sm:p-2 rounded-lg transition-colors ${
              viewMode === 'grid'
                ? 'bg-primary-100 text-primary-700'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
            title="Grid view"
            aria-label="Grid view"
            aria-pressed={viewMode === 'grid'}
          >
            <Grid3x3 aria-hidden="true" className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-1.5 sm:p-2 rounded-lg transition-colors ${
              viewMode === 'list'
                ? 'bg-primary-100 text-primary-700'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
            title="List view"
            aria-label="List view"
            aria-pressed={viewMode === 'list'}
          >
            <List aria-hidden="true" className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Loading progress */}
      {loadedCount < thumbnails.length && loadedCount > 0 && (
        <div className="flex items-center space-x-2 text-xs text-gray-500">
          <Loader aria-hidden="true" className="w-3 h-3 animate-spin" />
          <span>Loading thumbnails... {loadedCount}/{thumbnails.length}</span>
        </div>
      )}

      {/* Pages grid/list */}
      {thumbnails.length > 0 && (
        <div
          ref={containerRef}
          className={
            viewMode === 'grid'
              ? 'grid grid-cols-3 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-3'
              : 'space-y-2'
          }
        >
          {thumbnails.map((thumbnail) => {
            const isSelected = selectedPages.includes(thumbnail.page_number);

            return (
              <div
                key={thumbnail.page_number}
                onClick={() => handlePageToggle(thumbnail.page_number)}
                role="checkbox"
                aria-checked={isSelected}
                aria-label={`Page ${thumbnail.page_number}`}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === ' ' || e.key === 'Enter') {
                    e.preventDefault();
                    handlePageToggle(thumbnail.page_number);
                  }
                }}
                className={`
                  page-thumbnail relative cursor-pointer rounded-lg border-2 overflow-hidden
                  transition-all duration-200 active:scale-[0.97]
                  ${isSelected ? 'border-primary-500 ring-2 ring-primary-200' : 'border-gray-200 hover:border-primary-300'}
                  ${viewMode === 'list' ? 'flex items-center space-x-3 p-2 sm:p-3' : 'p-1 sm:p-1.5'}
                `}
              >
                {/* Selection indicator */}
                <div
                  className={`
                    absolute top-0.5 right-0.5 sm:top-1.5 sm:right-1.5 z-10 w-5 h-5 sm:w-6 sm:h-6 rounded-full
                    flex items-center justify-center transition-all duration-200
                    ${isSelected ? 'bg-primary-600 text-white' : 'bg-white/80 border-2 border-gray-300'}
                  `}
                >
                  {isSelected && <Check aria-hidden="true" className="w-3 h-3 sm:w-3.5 sm:h-3.5" />}
                </div>

                {/* Thumbnail */}
                <div
                  className={
                    viewMode === 'list'
                      ? 'w-12 h-16 sm:w-20 sm:h-28 flex-shrink-0'
                      : 'w-full aspect-[3/4] bg-gray-100 rounded relative overflow-hidden'
                  }
                >
                  <ThumbnailImage
                    sessionId={sessionId}
                    fileId={file.file_id}
                    pageNumber={thumbnail.page_number}
                  />
                </div>

                {/* Page number */}
                <div className={viewMode === 'list' ? 'flex-1 min-w-0' : 'mt-1 text-center'}>
                  <p className="text-xs sm:text-sm font-medium text-gray-700 truncate">
                    Page {thumbnail.page_number}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default PageSelector;
