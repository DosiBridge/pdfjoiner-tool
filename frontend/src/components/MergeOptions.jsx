import { FileText, Hash, Lock, Type } from 'lucide-react';
import React from 'react';

const MergeOptions = ({ options, onOptionsChange }) => {
  const handleChange = (key, value) => {
    onOptionsChange({ ...options, [key]: value });
  };

  return (
    <div className="card p-4 sm:p-5 md:p-6 space-y-4 sm:space-y-5 md:space-y-6">
      <h3 className="text-base sm:text-lg font-semibold text-gray-900">Merge Options</h3>

      {/* Output filename */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
          <div className="flex items-center space-x-1.5 sm:space-x-2">
            <FileText className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>Output Filename</span>
          </div>
        </label>
        <input
          type="text"
          value={options.output_filename || 'merged.pdf'}
          onChange={(e) => handleChange('output_filename', e.target.value)}
          className="input text-sm sm:text-base"
          placeholder="merged.pdf"
        />
      </div>

      {/* Add page numbers */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-1.5 sm:space-x-2">
          <Hash className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-600" />
          <label className="text-sm font-medium text-gray-700">
            Add Page Numbers
          </label>
        </div>
        <button
          onClick={() => handleChange('add_page_numbers', !options.add_page_numbers)}
          className={`
            relative inline-flex h-6 w-11 items-center rounded-full transition-colors
            ${options.add_page_numbers ? 'bg-primary-600' : 'bg-gray-200'}
          `}
        >
          <span
            className={`
              inline-block h-4 w-4 transform rounded-full bg-white transition-transform
              ${options.add_page_numbers ? 'translate-x-6' : 'translate-x-1'}
            `}
          />
        </button>
      </div>

      {/* Watermark */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
          <div className="flex items-center space-x-1.5 sm:space-x-2">
            <Type className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>Watermark Text (Optional)</span>
          </div>
        </label>
        <input
          type="text"
          value={options.watermark_text || ''}
          onChange={(e) => handleChange('watermark_text', e.target.value)}
          className="input text-sm sm:text-base"
          placeholder="Enter watermark text"
        />
      </div>

      {/* Password protection */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
          <div className="flex items-center space-x-1.5 sm:space-x-2">
            <Lock className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>Password Protection (Optional)</span>
          </div>
        </label>
        <input
          type="password"
          value={options.password || ''}
          onChange={(e) => handleChange('password', e.target.value)}
          className="input text-sm sm:text-base"
          placeholder="Enter password"
        />
        <p className="text-xs text-gray-500 mt-1">
          Leave empty for no password protection
        </p>
      </div>
    </div>
  );
};

export default MergeOptions;

