import { AlertCircle, Upload, X } from 'lucide-react';
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { MAX_FILES } from '../utils/constants';
import { validatePDFFile } from '../utils/helpers';

const FileUploader = ({ onFilesSelected, existingFilesCount = 0 }) => {
  const [uploadProgress, setUploadProgress] = useState({});
  const [errors, setErrors] = useState([]);

  const onDrop = useCallback(
    (acceptedFiles, rejectedFiles) => {
      setErrors([]);
      
      // Handle rejected files
      if (rejectedFiles.length > 0) {
        const newErrors = rejectedFiles.map((rejection) => ({
          file: rejection.file.name,
          error: rejection.errors[0]?.message || 'Invalid file',
        }));
        setErrors(newErrors);
      }

      // Validate file count
      const totalFiles = existingFilesCount + acceptedFiles.length;
      if (totalFiles > MAX_FILES) {
        setErrors([
          {
            file: 'Multiple files',
            error: `Maximum ${MAX_FILES} files allowed`,
          },
        ]);
        return;
      }

      // Validate each file
      const validFiles = [];
      const fileErrors = [];

      acceptedFiles.forEach((file) => {
        const validation = validatePDFFile(file);
        if (validation.valid) {
          validFiles.push(file);
        } else {
          fileErrors.push({
            file: file.name,
            error: validation.error,
          });
        }
      });

      if (fileErrors.length > 0) {
        setErrors((prev) => [...prev, ...fileErrors]);
      }

      if (validFiles.length > 0) {
        onFilesSelected(validFiles);
      }
    },
    [onFilesSelected, existingFilesCount]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
    },
    maxSize: 50 * 1024 * 1024, // 50MB
    multiple: true,
  });

  return (
    <div className="space-y-3 sm:space-y-4">
      <div
        {...getRootProps()}
        className={`
          border-2 border-dashed rounded-lg sm:rounded-xl p-6 sm:p-8 md:p-12 text-center cursor-pointer
          transition-all duration-200 hover:border-primary-500
          ${isDragActive ? 'border-primary-500 bg-primary-50' : 'border-gray-300 bg-white'}
        `}
      >
        <input {...getInputProps()} />
        
        <div className="flex flex-col items-center space-y-3 sm:space-y-4">
          <div className={`
            p-3 sm:p-4 rounded-full transition-colors
            ${isDragActive ? 'bg-primary-100' : 'bg-gray-100'}
          `}>
            <Upload className={`
              w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 transition-colors
              ${isDragActive ? 'text-primary-600' : 'text-gray-400'}
            `} />
          </div>
          
          <div>
            <p className="text-base sm:text-lg font-semibold text-gray-700 mb-1 sm:mb-2">
              {isDragActive ? 'Drop files here' : 'Drag & drop PDF files here'}
            </p>
            <p className="text-xs sm:text-sm text-gray-500 px-2">
              or click to browse (max {MAX_FILES} files, 50MB each)
            </p>
          </div>
        </div>
      </div>

      {/* Error messages */}
      {errors.length > 0 && (
        <div className="space-y-2">
          {errors.map((error, index) => (
            <div
              key={index}
              className="flex items-start space-x-2 p-2.5 sm:p-3 bg-red-50 border border-red-200 rounded-lg"
            >
              <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1 min-w-0">
                <p className="text-xs sm:text-sm font-medium text-red-800 truncate">{error.file}</p>
                <p className="text-xs text-red-600 break-words">{error.error}</p>
              </div>
              <button
                onClick={() =>
                  setErrors((prev) => prev.filter((_, i) => i !== index))
                }
                className="text-red-600 hover:text-red-800 flex-shrink-0 ml-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FileUploader;

