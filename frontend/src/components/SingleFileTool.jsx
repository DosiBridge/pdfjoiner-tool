import { Download, Loader, Upload, CheckCircle, AlertCircle } from 'lucide-react';
import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import toast from 'react-hot-toast';
import { pdfAPI } from '../services/api';
import { getSessionId, downloadFile, validatePDFFile } from '../utils/helpers';

/**
 * Shared component for single-file PDF tools (compress, split, reorder, delete pages).
 * Handles: upload → process → download.
 *
 * Props:
 *   toolTitle: string — section heading
 *   acceptImages: boolean — accept image files instead of PDFs
 *   acceptMultiple: boolean — allow multiple file uploads
 *   onProcess: (sessionId, fileId, fileInfo) => Promise<result> — called after upload
 *   renderOptions: (fileInfo, setOptions) => JSX — optional options UI before processing
 *   renderResult: (result, downloadUrl) => JSX — optional custom result display
 */
function SingleFileTool({ toolTitle, acceptImages = false, acceptMultiple = false, onProcess, renderOptions, renderResult }) {
  const [sessionId] = useState(() => getSessionId());
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [imageFiles, setImageFiles] = useState([]);

  const accept = acceptImages
    ? { 'image/jpeg': ['.jpg', '.jpeg'], 'image/png': ['.png'], 'image/bmp': ['.bmp'], 'image/gif': ['.gif'], 'image/tiff': ['.tiff', '.tif'], 'image/webp': ['.webp'] }
    : { 'application/pdf': ['.pdf'] };

  const onDrop = async (acceptedFiles) => {
    if (!acceptedFiles.length) return;
    setError(null);
    setResult(null);

    if (acceptImages) {
      setImageFiles(acceptedFiles);
      setUploadedFile({ name: `${acceptedFiles.length} image(s) selected`, page_count: acceptedFiles.length });
      return;
    }

    const file = acceptedFiles[0];
    const validation = validatePDFFile(file);
    if (!validation.valid) {
      toast.error(validation.error);
      return;
    }

    setIsUploading(true);
    try {
      const response = await pdfAPI.uploadFiles([file], sessionId);
      if (response.uploaded_files?.length > 0) {
        setUploadedFile(response.uploaded_files[0]);
        toast.success('File uploaded');
      }
    } catch (err) {
      toast.error('Upload failed');
      setError('Upload failed');
    } finally {
      setIsUploading(false);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    maxSize: 50 * 1024 * 1024,
    multiple: acceptMultiple || acceptImages,
    disabled: isUploading || isProcessing,
  });

  const handleProcess = async () => {
    if (!onProcess) return;
    setIsProcessing(true);
    setError(null);
    try {
      const res = await onProcess(sessionId, uploadedFile?.file_id, uploadedFile, imageFiles);
      setResult(res);
      toast.success('Done!');
    } catch (err) {
      const msg = err.response?.data?.error || err.message || 'Processing failed';
      setError(msg);
      toast.error(msg);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = (jobId, filename) => {
    const url = pdfAPI.getDownloadUrl(jobId);
    downloadFile(url, filename);
    toast.success('Download started');
  };

  const handleReset = () => {
    setUploadedFile(null);
    setResult(null);
    setError(null);
    setImageFiles([]);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
      {/* Upload */}
      {!uploadedFile && (
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-2xl p-8 sm:p-12 text-center transition-all cursor-pointer
            ${isUploading ? 'border-primary-400 bg-primary-50 cursor-wait' : isDragActive ? 'border-primary-500 bg-primary-50' : 'border-gray-300 bg-white hover:border-primary-400'}`}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center gap-3">
            <div className={`p-4 rounded-full ${isUploading || isDragActive ? 'bg-primary-100' : 'bg-gray-100'}`}>
              {isUploading ? (
                <Loader aria-hidden="true" className="w-10 h-10 text-primary-600 animate-spin" />
              ) : (
                <Upload aria-hidden="true" className={`w-10 h-10 ${isDragActive ? 'text-primary-600' : 'text-gray-400'}`} />
              )}
            </div>
            <p className="text-base font-semibold text-gray-700">
              {isUploading ? 'Uploading...' : isDragActive ? 'Drop here' : `Drop ${acceptImages ? 'images' : 'a PDF'} here`}
            </p>
            <p className="text-sm text-gray-500">
              or click to browse {acceptImages ? '(JPG, PNG, BMP, TIFF, WebP)' : '(max 50 MB)'}
            </p>
          </div>
        </div>
      )}

      {/* File info + Process button */}
      {uploadedFile && !result && (
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-5 flex items-center justify-between">
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-gray-900 truncate">
                {uploadedFile.original_filename || uploadedFile.name}
              </p>
              <p className="text-xs text-gray-500 mt-0.5">
                {uploadedFile.page_count ? `${uploadedFile.page_count} pages` : ''}
                {uploadedFile.file_size_formatted ? ` · ${uploadedFile.file_size_formatted}` : ''}
              </p>
            </div>
            <button onClick={handleReset} className="text-xs text-gray-500 hover:text-red-600 ml-3">Change</button>
          </div>

          {renderOptions && renderOptions(uploadedFile)}

          <button
            onClick={handleProcess}
            disabled={isProcessing}
            className="w-full btn btn-primary flex items-center justify-center gap-2 py-3 text-base"
          >
            {isProcessing ? (
              <>
                <Loader aria-hidden="true" className="w-5 h-5 animate-spin" />
                <span>Processing...</span>
              </>
            ) : (
              <span>{toolTitle}</span>
            )}
          </button>
        </div>
      )}

      {/* Result */}
      {result && (
        <div className="space-y-4">
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 sm:p-5 flex items-center gap-3">
            <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-green-900">Processing complete</p>
              {result.reduction_percent !== undefined && (
                <p className="text-xs text-green-700 mt-0.5">Reduced by {result.reduction_percent}%</p>
              )}
              {result.total_pages !== undefined && (
                <p className="text-xs text-green-700 mt-0.5">{result.total_pages} pages</p>
              )}
            </div>
          </div>

          {renderResult ? renderResult(result, handleDownload) : (
            <>
              {/* Single file download */}
              {result.job_id && (
                <button
                  onClick={() => handleDownload(result.job_id, result.output_filename)}
                  className="w-full btn btn-primary flex items-center justify-center gap-2 py-3 text-base"
                >
                  <Download aria-hidden="true" className="w-5 h-5" />
                  <span className="truncate">Download {result.output_filename}</span>
                </button>
              )}

              {/* Multiple file downloads (split) */}
              {result.files && (
                <div className="space-y-2">
                  {result.files.map((f) => (
                    <button
                      key={f.job_id}
                      onClick={() => handleDownload(f.job_id, f.filename)}
                      className="w-full btn btn-secondary flex items-center justify-center gap-2 py-2.5 text-sm"
                    >
                      <Download aria-hidden="true" className="w-4 h-4" />
                      <span className="truncate">{f.filename} ({f.page_count} pages)</span>
                    </button>
                  ))}
                </div>
              )}
            </>
          )}

          <button onClick={handleReset} className="w-full btn btn-secondary py-2.5 text-sm">
            Process another file
          </button>
        </div>
      )}

      {/* Error */}
      {error && !result && (
        <div className="mt-4 bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}
    </div>
  );
}

export default SingleFileTool;
