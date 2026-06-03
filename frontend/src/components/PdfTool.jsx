import { Shuffle, Upload as UploadIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import DownloadManager from './DownloadManager';
import FileList from './FileList';
import FileUploader from './FileUploader';
import MergeOptions from './MergeOptions';
import PageReorderer from './PageReorderer';
import PageSelector from './PageSelector';

import { pdfAPI } from '../services/api';
import { clearSession, getSessionId } from '../utils/helpers';

function PdfTool() {
  const [sessionId, setSessionId] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [selectedFileId, setSelectedFileId] = useState(null);
  const [fileSelections, setFileSelections] = useState({});
  const [orderedPages, setOrderedPages] = useState([]);
  const [mergeOptions, setMergeOptions] = useState({
    output_filename: 'merged.pdf',
    add_page_numbers: false,
    watermark_text: '',
    password: '',
  });
  const [jobId, setJobId] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isMerging, setIsMerging] = useState(false);

  useEffect(() => {
    const sid = getSessionId();
    setSessionId(sid);
  }, []);

  useEffect(() => {
    updateOrderedPages();
  }, [fileSelections, uploadedFiles]);

  const updateOrderedPages = () => {
    const pages = [];
    Object.entries(fileSelections).forEach(([fileId, selectedPages]) => {
      const file = uploadedFiles.find((f) => f.file_id === fileId);
      if (file) {
        selectedPages.forEach((pageNumber) => {
          pages.push({
            fileId,
            pageNumber,
            filename: file.original_filename || file.filename,
          });
        });
      }
    });
    setOrderedPages(pages);
  };

  const handleFilesSelected = async (files) => {
    setIsUploading(true);
    try {
      const response = await pdfAPI.uploadFiles(files, sessionId);
      if (response.uploaded_files && response.uploaded_files.length > 0) {
        setUploadedFiles((prev) => [...prev, ...response.uploaded_files]);
        toast.success(`${response.uploaded_files.length} file(s) uploaded successfully`);
        if (!selectedFileId && response.uploaded_files.length > 0) {
          setSelectedFileId(response.uploaded_files[0].file_id);
        }
      }
      if (response.errors && response.errors.length > 0) {
        response.errors.forEach((error) => {
          toast.error(error);
        });
      }
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Failed to upload files');
    } finally {
      setIsUploading(false);
    }
  };

  const handleDeleteFile = async (fileId) => {
    try {
      await pdfAPI.deleteFile(sessionId, fileId);
      setUploadedFiles((prev) => prev.filter((f) => f.file_id !== fileId));
      const newSelections = { ...fileSelections };
      delete newSelections[fileId];
      setFileSelections(newSelections);
      if (selectedFileId === fileId) {
        const remainingFiles = uploadedFiles.filter((f) => f.file_id !== fileId);
        setSelectedFileId(remainingFiles.length > 0 ? remainingFiles[0].file_id : null);
      }
      toast.success('File deleted');
    } catch (error) {
      console.error('Delete error:', error);
      toast.error('Failed to delete file');
    }
  };

  const handlePageSelectionChange = (fileId, selectedPages) => {
    setFileSelections((prev) => ({
      ...prev,
      [fileId]: selectedPages,
    }));
  };

  const handlePageReorder = (newOrderedPages) => {
    setOrderedPages(newOrderedPages);
  };

  const handleRemovePage = (index) => {
    const newPages = [...orderedPages];
    newPages.splice(index, 1);
    setOrderedPages(newPages);
  };

  const handleMerge = async () => {
    if (orderedPages.length === 0) {
      toast.error('Please select at least one page to merge');
      return;
    }
    setIsMerging(true);
    try {
      const selectionsMap = {};
      orderedPages.forEach((page) => {
        if (!selectionsMap[page.fileId]) {
          selectionsMap[page.fileId] = [];
        }
        selectionsMap[page.fileId].push(page.pageNumber);
      });
      const selections = Object.entries(selectionsMap).map(([fileId, pages]) => ({
        file_id: fileId,
        pages,
      }));
      const mergeRequest = {
        session_id: sessionId,
        selections,
        ...mergeOptions,
      };
      const response = await pdfAPI.mergePDFs(mergeRequest);
      setJobId(response.job_id);
      toast.success('PDFs merged successfully!');
    } catch (error) {
      console.error('Merge error:', error);
      toast.error('Failed to merge PDFs');
    } finally {
      setIsMerging(false);
    }
  };

  const handleNewProject = () => {
    setUploadedFiles([]);
    setSelectedFileId(null);
    setFileSelections({});
    setOrderedPages([]);
    setJobId(null);
    clearSession();
    const newSessionId = getSessionId();
    setSessionId(newSessionId);
    toast.success('Started new project');
  };

  const selectedFile = uploadedFiles.find((f) => f.file_id === selectedFileId);

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
        {/* Left column - Upload & File List */}
        <div className="lg:col-span-1 space-y-4 sm:space-y-5 md:space-y-6 order-2 lg:order-1">
          <div className="card p-4 sm:p-5 md:p-6">
            <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4 flex items-center space-x-2">
              <UploadIcon aria-hidden="true" className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Upload PDFs</span>
            </h2>
            <FileUploader
              onFilesSelected={handleFilesSelected}
              existingFilesCount={uploadedFiles.length}
            />
          </div>

          <div className="card p-4 sm:p-5 md:p-6">
            <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">
              Uploaded Files ({uploadedFiles.length})
            </h2>
            <FileList
              files={uploadedFiles}
              onDeleteFile={handleDeleteFile}
              onSelectFile={setSelectedFileId}
              selectedFileId={selectedFileId}
            />
          </div>
        </div>

        {/* Middle column - Page Selection */}
        <div className="lg:col-span-2 space-y-4 sm:space-y-5 md:space-y-6 order-1 lg:order-2">
          {selectedFile && (
            <div className="card p-4 sm:p-5 md:p-6">
              <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">
                <span className="block sm:inline">Select Pages</span>
                <span className="block text-sm sm:text-base text-gray-600 sm:ml-2 mt-1 sm:mt-0 sm:inline truncate">
                  {selectedFile.original_filename || selectedFile.filename}
                </span>
              </h2>
              <PageSelector
                file={selectedFile}
                sessionId={sessionId}
                selectedPages={fileSelections[selectedFileId] || []}
                onSelectionChange={handlePageSelectionChange}
              />
            </div>
          )}

          <div className="card p-4 sm:p-5 md:p-6">
            <PageReorderer
              pages={orderedPages}
              onReorder={handlePageReorder}
              onRemove={handleRemovePage}
              sessionId={sessionId}
            />
          </div>

          {orderedPages.length > 0 && (
            <>
              <MergeOptions
                options={mergeOptions}
                onOptionsChange={setMergeOptions}
              />
              <button
                onClick={handleMerge}
                disabled={isMerging || orderedPages.length === 0}
                className="w-full btn btn-primary flex items-center justify-center space-x-2 py-3 sm:py-4 text-base sm:text-lg"
              >
                {isMerging ? (
                  <>
                    <div className="spinner w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full" />
                    <span>Merging...</span>
                  </>
                ) : (
                  <>
                    <Shuffle aria-hidden="true" className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="whitespace-nowrap">
                      <span className="hidden sm:inline">Merge PDFs </span>
                      <span className="sm:hidden">Merge </span>
                      ({orderedPages.length} pages)
                    </span>
                  </>
                )}
              </button>
            </>
          )}

          {jobId && (
            <DownloadManager
              jobId={jobId}
              onComplete={() => {}}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default PdfTool;
