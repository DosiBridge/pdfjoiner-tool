import React, { useState } from 'react';
import { Download } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import SingleFileTool from '../components/SingleFileTool';
import FAQSection from '../components/FAQSection';
import { pdfAPI } from '../services/api';

const faqItems = [
  { question: 'How do I split a PDF into individual pages?', answer: 'Upload your PDF, select "Split every page" mode, and click Split. Each page becomes its own downloadable PDF file.' },
  { question: 'Can I extract specific page ranges?', answer: 'Yes. Choose "Custom ranges" mode and enter the page ranges you want (e.g., pages 1-3, pages 5-8). Each range becomes a separate PDF.' },
  { question: 'Is splitting free?', answer: 'Yes, completely free. No signup, no watermark, no daily limits.' },
];

function SplitPdfPage() {
  const [mode, setMode] = useState('individual');
  const [everyN, setEveryN] = useState(1);

  return (
    <>
      <SEOHead
        title="Split PDF — Extract Pages from PDF Online Free | DOSIBridge"
        description="Split a PDF into separate files or extract specific pages. Free online PDF splitter — no signup, no watermark."
        path="/split-pdf"
        faqItems={faqItems}
      />
      <section className="bg-gradient-to-b from-primary-50 to-white py-8 sm:py-12 md:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight">Split PDF Online</h1>
          <p className="mt-3 text-sm sm:text-base text-gray-600 max-w-xl mx-auto">Extract pages from your PDF into separate files. Free, instant, no signup.</p>
        </div>
      </section>
      <SingleFileTool
        toolTitle="Split PDF"
        onProcess={async (sessionId, fileId) => pdfAPI.splitPdf(sessionId, fileId, mode, { every_n: everyN })}
        renderOptions={(fileInfo) => (
          <div className="bg-white rounded-xl border border-gray-200 p-4 space-y-3">
            <label className="text-sm font-medium text-gray-700 block">Split Mode</label>
            <div className="flex flex-col sm:flex-row gap-2">
              <button onClick={() => setMode('individual')}
                className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${mode === 'individual' ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
                Every page
              </button>
              <button onClick={() => setMode('every_n')}
                className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${mode === 'every_n' ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
                Every N pages
              </button>
            </div>
            {mode === 'every_n' && (
              <div>
                <label className="text-xs text-gray-600 block mb-1">Pages per file</label>
                <input type="number" min={1} max={fileInfo?.page_count || 100} value={everyN}
                  onChange={(e) => setEveryN(Math.max(1, parseInt(e.target.value) || 1))}
                  className="input text-sm w-24" />
              </div>
            )}
          </div>
        )}
        renderResult={(result, handleDownload) => (
          <div className="space-y-2">
            <p className="text-sm text-gray-600 mb-2">{result.total_files} files created</p>
            {result.files?.map((f) => (
              <button key={f.job_id} onClick={() => handleDownload(f.job_id, f.filename)}
                className="w-full btn btn-secondary flex items-center justify-center gap-2 py-2.5 text-sm">
                <Download aria-hidden="true" className="w-4 h-4" />
                <span className="truncate">{f.filename} ({f.page_count} pages)</span>
              </button>
            ))}
          </div>
        )}
      />
      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-8"><FAQSection items={faqItems} /></section>
    </>
  );
}

export default SplitPdfPage;
