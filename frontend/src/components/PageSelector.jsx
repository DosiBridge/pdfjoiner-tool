import { Check, Grid3x3, List, Loader, Square } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { pdfAPI } from '../services/api';

const PageSelector = ({ file, sessionId, selectedPages, onSelectionChange }) => {
  const [thumbnails, setThumbnails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid');
  const [selectAll, setSelectAll] = useState(false);

  useEffect(() => {
    loadThumbnails();
  }, [file.file_id]);

  useEffect(() => {
    setSelectAll(selectedPages.length === file.page_count);
  }, [selectedPages, file.page_count]);

  const loadThumbnails = async () => {
    try {
      setLoading(true);
      const response = await pdfAPI.generateAllThumbnails(sessionId, file.file_id);
      
      // Get the actual page count from the response or file metadata
      const actualPageCount = response.total_pages || file.page_count || 1;
      
      // ALWAYS use the thumbnails array from response - it only contains successfully generated thumbnails
      // This ensures we never request pages that don't exist
      if (response.thumbnails && response.thumbnails.length > 0) {
        // Use only the thumbnails that were successfully generated
        // These are guaranteed to exist
        setThumbnails(response.thumbnails);
      } else {
        // If no thumbnails in response, create URLs only up to actual page count
        // This is a fallback - should rarely happen
        const thumbnails = [];
        for (let i = 1; i <= actualPageCount; i++) {
          thumbnails.push({
            page_number: i,
            url: pdfAPI.getThumbnailUrl(sessionId, file.file_id, i)
          });
        }
        setThumbnails(thumbnails);
      }
    } catch (error) {
      console.error('Error loading thumbnails:', error);
      toast.error('Failed to load page previews');
      
      // Fallback: create thumbnails based on file's page count
      const thumbnails = [];
      const pageCount = file.page_count || 1;
      for (let i = 1; i <= pageCount; i++) {
        thumbnails.push({
          page_number: i,
          url: pdfAPI.getThumbnailUrl(sessionId, file.file_id, i)
        });
      }
      setThumbnails(thumbnails);
    } finally {
      setLoading(false);
    }
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

  const handleSelectRange = (start, end) => {
    const rangePages = [];
    for (let i = Math.min(start, end); i <= Math.max(start, end); i++) {
      rangePages.push(i);
    }
    onSelectionChange(file.file_id, rangePages);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8 sm:py-12">
        <Loader className="w-6 h-6 sm:w-8 sm:h-8 animate-spin text-primary-600" />
        <span className="ml-2 sm:ml-3 text-sm sm:text-base text-gray-600">Loading page previews...</span>
      </div>
    );
  }

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

      {/* Pages */}
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
              <div className={viewMode === 'list' ? 'w-16 h-20 sm:w-24 sm:h-32 flex-shrink-0' : 'w-full aspect-[3/4] bg-gray-100 rounded relative'}>
                <img
                  src={pdfAPI.getThumbnailUrl(sessionId, file.file_id, thumbnail.page_number)}
                  alt={`Page ${thumbnail.page_number}`}
                  className="w-full h-full object-cover rounded"
                  loading="lazy"
                  onError={(e) => {
                    // Silently handle 404/400 errors - page doesn't exist
                    // Hide the broken image and show a placeholder
                    e.target.style.display = 'none';
                    const container = e.target.parentElement;
                    if (container && !container.querySelector('.page-placeholder')) {
                      const placeholder = document.createElement('div');
                      placeholder.className = 'page-placeholder w-full h-full bg-gray-200 rounded flex flex-col items-center justify-center text-gray-500';
                      placeholder.innerHTML = `
                        <span class="text-xs">Page ${thumbnail.page_number}</span>
                        <span class="text-xs mt-1">Not available</span>
                      `;
                      container.appendChild(placeholder);
                    }
                  }}
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
  );
};

export default PageSelector;

