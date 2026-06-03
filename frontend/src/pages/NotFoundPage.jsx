import React from 'react';
import { Link } from 'react-router-dom';
import { FileX } from 'lucide-react';
import SEOHead from '../components/SEOHead';

function NotFoundPage() {
  return (
    <>
      <SEOHead
        title="Page Not Found — DOSIBridge PDF Joiner"
        description="The page you are looking for does not exist. Use DOSIBridge PDF Joiner to merge PDF files online for free."
        path="/404"
      />

      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <FileX aria-hidden="true" className="w-20 h-20 mx-auto mb-6 text-gray-300" />
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Page Not Found</h1>
        <p className="text-lg text-gray-600 mb-8">
          The page you are looking for does not exist or has been moved.
        </p>
        <div className="space-y-3 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
          <Link
            to="/"
            className="btn btn-primary inline-block px-6 py-3"
          >
            Merge PDF Files — Go Home
          </Link>
        </div>
        <div className="mt-12">
          <p className="text-sm text-gray-500 mb-3">Or try one of these tools:</p>
          <nav className="flex flex-wrap justify-center gap-3 text-sm">
            <Link to="/merge-pdf" className="text-primary-600 hover:text-primary-700 underline">Merge PDF</Link>
            <Link to="/combine-pdf-files" className="text-primary-600 hover:text-primary-700 underline">Combine PDF Files</Link>
            <Link to="/merge-pdf-on-mobile" className="text-primary-600 hover:text-primary-700 underline">Merge on Mobile</Link>
            <Link to="/merge-pdf-for-job-application" className="text-primary-600 hover:text-primary-700 underline">Job Application PDF</Link>
          </nav>
        </div>
      </div>
    </>
  );
}

export default NotFoundPage;
