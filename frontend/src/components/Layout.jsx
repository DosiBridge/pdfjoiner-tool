import { FileText } from 'lucide-react';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

function Layout({ children }) {
  const { pathname } = useLocation();

  // Scroll to top on route change
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:top-2 focus:left-2 focus:bg-primary-600 focus:text-white focus:px-4 focus:py-2 focus:rounded-lg"
      >
        Skip to main content
      </a>
      <Toaster position="top-right" />

      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50" role="banner">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-3 sm:py-4 md:py-6">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <Link to="/" className="flex items-center space-x-2 sm:space-x-3 min-w-0 flex-1">
              <div className="p-1.5 sm:p-2 bg-primary-600 rounded-lg flex-shrink-0">
                <FileText aria-hidden="true" className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-white" />
              </div>
              <div className="min-w-0 flex-1">
                <span className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 truncate block">
                  DOSIBridge PDF Joiner
                </span>
                <span className="text-xs sm:text-sm text-gray-600 hidden sm:block">
                  Free online PDF merge tool — no signup, no watermark
                </span>
              </div>
            </Link>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main id="main-content" className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-8 sm:mt-10 md:mt-12">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-6 sm:py-8">
          <div className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 mb-6">
            {/* PDF Merge Tools */}
            <div>
              <h3 className="text-xs sm:text-sm font-semibold text-gray-900 mb-2 sm:mb-3">PDF Merge Tools</h3>
              <nav aria-label="PDF Merge Tools">
                <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-gray-600">
                  <li><Link to="/merge-pdf" className="hover:text-primary-600 transition-colors">Merge PDF</Link></li>
                  <li><Link to="/pdf-joiner" className="hover:text-primary-600 transition-colors">PDF Joiner</Link></li>
                  <li><Link to="/combine-pdf-files" className="hover:text-primary-600 transition-colors">Combine PDF Files</Link></li>
                  <li><Link to="/merge-pdf-online-free" className="hover:text-primary-600 transition-colors">Merge PDF Free</Link></li>
                  <li><Link to="/merge-pdf-no-watermark" className="hover:text-primary-600 transition-colors">No Watermark</Link></li>
                </ul>
              </nav>
            </div>

            {/* Use Cases */}
            <div>
              <h3 className="text-xs sm:text-sm font-semibold text-gray-900 mb-2 sm:mb-3">Use Cases</h3>
              <nav aria-label="Use Cases">
                <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-gray-600">
                  <li><Link to="/merge-pdf-on-mobile" className="hover:text-primary-600 transition-colors">Merge on Mobile</Link></li>
                  <li><Link to="/merge-pdf-for-job-application" className="hover:text-primary-600 transition-colors">Job Applications</Link></li>
                  <li><Link to="/combine-cv-and-certificates-pdf" className="hover:text-primary-600 transition-colors">CV + Certificates</Link></li>
                  <li><Link to="/merge-university-documents-pdf" className="hover:text-primary-600 transition-colors">University Docs</Link></li>
                  <li><Link to="/merge-scanned-documents-pdf" className="hover:text-primary-600 transition-colors">Scanned Documents</Link></li>
                </ul>
              </nav>
            </div>

            {/* Guides */}
            <div>
              <h3 className="text-xs sm:text-sm font-semibold text-gray-900 mb-2 sm:mb-3">How-To Guides</h3>
              <nav aria-label="How-To Guides">
                <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-gray-600">
                  <li><Link to="/blog/how-to-merge-pdf-files-online" className="hover:text-primary-600 transition-colors">How to Merge PDFs</Link></li>
                  <li><Link to="/blog/how-to-combine-cv-certificates-into-one-pdf" className="hover:text-primary-600 transition-colors">How to Combine CV + Certs</Link></li>
                  <li><Link to="/blog/how-to-merge-pdf-on-mobile" className="hover:text-primary-600 transition-colors">How to Merge on Mobile</Link></li>
                  <li><Link to="/blog/how-to-reorder-pdf-before-merging" className="hover:text-primary-600 transition-colors">How to Reorder Pages</Link></li>
                </ul>
              </nav>
            </div>

            {/* More Tools + DOSIBridge */}
            <div>
              <h3 className="text-xs sm:text-sm font-semibold text-gray-900 mb-2 sm:mb-3">More PDF Tools</h3>
              <nav aria-label="More PDF Tools">
                <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-gray-600">
                  <li><Link to="/compress-pdf" className="hover:text-primary-600 transition-colors">Compress PDF</Link></li>
                  <li><Link to="/split-pdf" className="hover:text-primary-600 transition-colors">Split PDF</Link></li>
                  <li><Link to="/image-to-pdf" className="hover:text-primary-600 transition-colors">Image to PDF</Link></li>
                  <li><Link to="/reorder-pdf" className="hover:text-primary-600 transition-colors">Reorder PDF</Link></li>
                  <li><Link to="/delete-pdf-pages" className="hover:text-primary-600 transition-colors">Delete PDF Pages</Link></li>
                </ul>
              </nav>

              <h3 className="text-xs sm:text-sm font-semibold text-gray-900 mt-4 sm:mt-5 mb-2 sm:mb-3">DOSIBridge</h3>
              <nav aria-label="DOSIBridge links">
                <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-gray-600">
                  <li><a href="https://dosibridge.com" className="hover:text-primary-600 transition-colors">Homepage</a></li>
                  <li><a href="https://dosibridge.com/projects" className="hover:text-primary-600 transition-colors">All Projects</a></li>
                  <li><a href="https://sd.dosibridge.com" className="hover:text-primary-600 transition-colors">SD Tools</a></li>
                  <li><a href="https://converter.dosibridge.com" className="hover:text-primary-600 transition-colors">Converter</a></li>
                </ul>
              </nav>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-4">
            <p className="text-center text-xs sm:text-sm text-gray-500">
              DOSIBridge PDF Joiner — Free online PDF merge tool. No signup, no watermark, no limits.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Layout;
