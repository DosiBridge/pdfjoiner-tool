import { AlertCircle, CheckCircle, Download, Loader } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { pdfAPI } from '../services/api';
import { downloadFile } from '../utils/helpers';

const DownloadManager = ({ jobId, onComplete }) => {
  const [status, setStatus] = useState('processing');
  const [jobInfo, setJobInfo] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (jobId) {
      checkJobStatus();
    }
  }, [jobId]);

  const checkJobStatus = async () => {
    try {
      const response = await pdfAPI.getJobStatus(jobId);
      setJobInfo(response);
      setStatus(response.status);

      if (response.status === 'completed') {
        toast.success('PDF merged successfully!');
      } else if (response.status === 'failed') {
        setError('Merge operation failed');
        toast.error('Failed to merge PDFs');
      }
    } catch (error) {
      console.error('Error checking job status:', error);
      setError('Failed to check job status');
      setStatus('failed');
    }
  };

  const handleDownload = () => {
    try {
      const downloadUrl = pdfAPI.getDownloadUrl(jobId);
      downloadFile(downloadUrl, jobInfo.output_filename);
      toast.success('Download started!');
      
      if (onComplete) {
        onComplete();
      }
    } catch (error) {
      console.error('Download error:', error);
      toast.error('Failed to download file');
    }
  };

  if (!jobId) return null;

  return (
    <div className="card p-4 sm:p-5 md:p-6">
      <div className="space-y-3 sm:space-y-4">
        {status === 'processing' && (
          <div className="flex items-center space-x-2 sm:space-x-3 text-primary-600">
            <Loader className="w-5 h-5 sm:w-6 sm:h-6 animate-spin flex-shrink-0" />
            <div className="min-w-0">
              <p className="font-semibold text-sm sm:text-base">Processing...</p>
              <p className="text-xs sm:text-sm text-gray-600">Merging your PDFs</p>
            </div>
          </div>
        )}

        {status === 'completed' && jobInfo && (
          <div className="space-y-3 sm:space-y-4">
            <div className="flex items-center space-x-2 sm:space-x-3 text-green-600">
              <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" />
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-sm sm:text-base">Ready to download!</p>
                <p className="text-xs sm:text-sm text-gray-600">
                  {jobInfo.total_pages} pages merged successfully
                </p>
              </div>
            </div>

            <button
              onClick={handleDownload}
              className="w-full btn btn-primary flex items-center justify-center space-x-2 py-2.5 sm:py-3 text-sm sm:text-base"
            >
              <Download className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="truncate">Download {jobInfo.output_filename}</span>
            </button>
          </div>
        )}

        {status === 'failed' && (
          <div className="flex items-center space-x-2 sm:space-x-3 text-red-600">
            <AlertCircle className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" />
            <div className="min-w-0">
              <p className="font-semibold text-sm sm:text-base">Merge failed</p>
              <p className="text-xs sm:text-sm text-gray-600 break-words">
                {error || 'An error occurred while merging PDFs'}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DownloadManager;

