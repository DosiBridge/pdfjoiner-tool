import { FileText } from 'lucide-react';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

function Layout({ children }) {
  const { pathname } = useLocation();

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
      <header className="bg-white/95 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50" role="banner">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-14 sm:h-16">
            <Link to="/" className="flex items-center gap-2.5 sm:gap-3 min-w-0">
              <div className="p-1.5 sm:p-2 bg-primary-600 rounded-lg flex-shrink-0">
                <FileText aria-hidden="true" className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <div className="min-w-0">
                <span className="text-base sm:text-lg font-bold text-gray-900 block truncate">
                  DOSIBridge PDF Joiner
                </span>
                <span className="text-[10px] sm:text-xs text-gray-500 hidden sm:block leading-none">
                  Free PDF merge — no signup, no watermark
                </span>
              </div>
            </Link>
          </div>
        </div>
      </header>

      {/* Main */}
      <main id="main-content" className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 mt-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
            {/* PDF Merge Tools */}
            <div>
              <h3 className="text-xs font-semibold text-gray-200 uppercase tracking-wider mb-3">PDF Tools</h3>
              <nav aria-label="PDF Merge Tools">
                <ul className="space-y-2 text-sm">
                  <li><Link to="/merge-pdf" className="hover:text-white transition-colors">Merge PDF</Link></li>
                  <li><Link to="/pdf-joiner" className="hover:text-white transition-colors">PDF Joiner</Link></li>
                  <li><Link to="/combine-pdf-files" className="hover:text-white transition-colors">Combine PDF Files</Link></li>
                  <li><Link to="/merge-pdf-online-free" className="hover:text-white transition-colors">Merge PDF Free</Link></li>
                  <li><Link to="/merge-pdf-no-watermark" className="hover:text-white transition-colors">No Watermark</Link></li>
                </ul>
              </nav>
            </div>

            {/* Use Cases */}
            <div>
              <h3 className="text-xs font-semibold text-gray-200 uppercase tracking-wider mb-3">Use Cases</h3>
              <nav aria-label="Use Cases">
                <ul className="space-y-2 text-sm">
                  <li><Link to="/merge-pdf-on-mobile" className="hover:text-white transition-colors">Merge on Mobile</Link></li>
                  <li><Link to="/merge-pdf-for-job-application" className="hover:text-white transition-colors">Job Applications</Link></li>
                  <li><Link to="/combine-cv-and-certificates-pdf" className="hover:text-white transition-colors">CV + Certificates</Link></li>
                  <li><Link to="/merge-university-documents-pdf" className="hover:text-white transition-colors">University Docs</Link></li>
                  <li><Link to="/merge-scanned-documents-pdf" className="hover:text-white transition-colors">Scanned Documents</Link></li>
                </ul>
              </nav>
            </div>

            {/* Guides */}
            <div>
              <h3 className="text-xs font-semibold text-gray-200 uppercase tracking-wider mb-3">Guides</h3>
              <nav aria-label="How-To Guides">
                <ul className="space-y-2 text-sm">
                  <li><Link to="/blog/how-to-merge-pdf-files-online" className="hover:text-white transition-colors">How to Merge PDFs</Link></li>
                  <li><Link to="/blog/how-to-combine-cv-certificates-into-one-pdf" className="hover:text-white transition-colors">Combine CV + Certs</Link></li>
                  <li><Link to="/blog/how-to-merge-pdf-on-mobile" className="hover:text-white transition-colors">Merge on Mobile</Link></li>
                  <li><Link to="/blog/how-to-reorder-pdf-before-merging" className="hover:text-white transition-colors">Reorder Pages</Link></li>
                </ul>
              </nav>
            </div>

            {/* More Tools + DOSIBridge */}
            <div>
              <h3 className="text-xs font-semibold text-gray-200 uppercase tracking-wider mb-3">More Tools</h3>
              <nav aria-label="More PDF Tools">
                <ul className="space-y-2 text-sm">
                  <li><Link to="/compress-pdf" className="hover:text-white transition-colors">Compress PDF</Link></li>
                  <li><Link to="/split-pdf" className="hover:text-white transition-colors">Split PDF</Link></li>
                  <li><Link to="/image-to-pdf" className="hover:text-white transition-colors">Image to PDF</Link></li>
                  <li><Link to="/reorder-pdf" className="hover:text-white transition-colors">Reorder PDF</Link></li>
                  <li><Link to="/delete-pdf-pages" className="hover:text-white transition-colors">Delete PDF Pages</Link></li>
                </ul>
              </nav>

              <h3 className="text-xs font-semibold text-gray-200 uppercase tracking-wider mt-6 mb-3">DOSIBridge</h3>
              <nav aria-label="DOSIBridge links">
                <ul className="space-y-2 text-sm">
                  <li><a href="https://dosibridge.com" className="hover:text-white transition-colors">Homepage</a></li>
                  <li><a href="https://dosibridge.com/projects" className="hover:text-white transition-colors">All Projects</a></li>
                  <li><a href="https://sd.dosibridge.com" className="hover:text-white transition-colors">SD Tools</a></li>
                  <li><a href="https://converter.dosibridge.com" className="hover:text-white transition-colors">Converter</a></li>
                </ul>
              </nav>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-10 pt-6 text-center text-xs text-gray-500">
            DOSIBridge PDF Joiner — Free online PDF merge tool. No signup, no watermark, no limits.
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Layout;
