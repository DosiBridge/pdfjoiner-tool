import { FileText, Shuffle, Trash2, Upload as UploadIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

import DownloadManager from './components/DownloadManager';
import FileList from './components/FileList';
import FileUploader from './components/FileUploader';
import MergeOptions from './components/MergeOptions';
import PageReorderer from './components/PageReorderer';
import PageSelector from './components/PageSelector';

import { pdfAPI } from './services/api';
import { APP_NAME } from './utils/constants';
import { clearSession, getSessionId } from './utils/helpers';

function App() {
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
        
        // Auto-select first file if none selected
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
      
      // Remove selections for this file
      const newSelections = { ...fileSelections };
      delete newSelections[fileId];
      setFileSelections(newSelections);
      
      // Update selected file if deleted
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
      // Build selections from ordered pages
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
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-right" />
      
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-3 sm:py-4 md:py-6">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center space-x-2 sm:space-x-3 min-w-0 flex-1">
              <div className="p-1.5 sm:p-2 bg-primary-600 rounded-lg flex-shrink-0">
                <FileText className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-white" />
              </div>
              <div className="min-w-0 flex-1">
                <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 truncate">{APP_NAME}</h1>
                <p className="text-xs sm:text-sm text-gray-600 hidden sm:block">Merge, reorder, and manage PDF files</p>
              </div>
            </div>
            
            {uploadedFiles.length > 0 && (
              <button
                onClick={handleNewProject}
                className="btn btn-secondary flex items-center space-x-1.5 sm:space-x-2 text-sm sm:text-base flex-shrink-0"
              >
                <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">New Project</span>
                <span className="sm:hidden">New</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
          {/* Left column - Upload & File List */}
          <div className="lg:col-span-1 space-y-4 sm:space-y-5 md:space-y-6 order-2 lg:order-1">
            <div className="card p-4 sm:p-5 md:p-6">
              <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4 flex items-center space-x-2">
                <UploadIcon className="w-4 h-4 sm:w-5 sm:h-5" />
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

            {/* Page Reorderer */}
            <div className="card p-4 sm:p-5 md:p-6">
              <PageReorderer
                pages={orderedPages}
                onReorder={handlePageReorder}
                onRemove={handleRemovePage}
                sessionId={sessionId}
              />
            </div>

            {/* Merge Options */}
            {orderedPages.length > 0 && (
              <>
                <MergeOptions
                  options={mergeOptions}
                  onOptionsChange={setMergeOptions}
                />

                {/* Merge Button */}
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
                      <Shuffle className="w-4 h-4 sm:w-5 sm:h-5" />
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

            {/* Download Manager */}
            {jobId && (
              <DownloadManager
                jobId={jobId}
                onComplete={() => {
                  // Optionally handle completion
                }}
              />
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-8 sm:mt-10 md:mt-12">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-5 md:py-6">
          <p className="text-center text-xs sm:text-sm text-gray-600">
            <span className="hidden sm:inline">{APP_NAME} - Professional PDF Management Tool</span>
            <span className="sm:hidden">{APP_NAME}</span>
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;

