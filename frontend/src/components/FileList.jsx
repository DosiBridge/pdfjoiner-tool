import { File, FileText, Trash2 } from 'lucide-react';
import React from 'react';
import { formatFileSize } from '../utils/helpers';

const FileList = ({ files, onDeleteFile, onSelectFile, selectedFileId }) => {
  if (files.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        <FileText className="w-16 h-16 mx-auto mb-4 text-gray-300" />
        <p className="text-lg font-medium">No files uploaded yet</p>
        <p className="text-sm">Upload PDF files to get started</p>
      </div>
    );
  }

  return (
    <div className="space-y-2 sm:space-y-3">
      {files.map((file) => (
        <div
          key={file.file_id}
          className={`
            flex items-center justify-between p-3 sm:p-4 rounded-lg border-2 
            transition-all duration-200 cursor-pointer hover:shadow-md
            ${
              selectedFileId === file.file_id
                ? 'border-primary-500 bg-primary-50'
                : 'border-gray-200 bg-white hover:border-gray-300'
            }
          `}
          onClick={() => onSelectFile && onSelectFile(file.file_id)}
        >
          <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-4 flex-1 min-w-0">
            <div className={`
              p-2 sm:p-2.5 md:p-3 rounded-lg flex-shrink-0
              ${selectedFileId === file.file_id ? 'bg-primary-100' : 'bg-gray-100'}
            `}>
              <File className={`
                w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6
                ${selectedFileId === file.file_id ? 'text-primary-600' : 'text-gray-600'}
              `} />
            </div>
            
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm sm:text-base text-gray-900 truncate">
                {file.original_filename || file.filename}
              </p>
              <div className="flex items-center flex-wrap gap-x-2 gap-y-0.5 text-xs sm:text-sm text-gray-500 mt-0.5 sm:mt-1">
                <span>{file.page_count} pages</span>
                <span className="hidden sm:inline">•</span>
                <span>{file.file_size_formatted || formatFileSize(file.file_size)}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-1 sm:space-x-2 flex-shrink-0">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDeleteFile(file.file_id);
              }}
              className="p-1.5 sm:p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              title="Delete file"
            >
              <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FileList;

