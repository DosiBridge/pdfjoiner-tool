import React, { useState } from 'react';
import SEOHead from '../components/SEOHead';
import SingleFileTool from '../components/SingleFileTool';
import FAQSection from '../components/FAQSection';
import { pdfAPI } from '../services/api';

const faqItems = [
  { question: 'How do I reorder pages in a PDF?', answer: 'Upload your PDF, then enter the new page order (e.g., 3,1,4,2 to put page 3 first, then page 1, etc.). Click Reorder and download the result.' },
  { question: 'Does reordering change my original file?', answer: 'No. A new PDF is created with pages in your specified order. Your original file is untouched.' },
  { question: 'Can I reverse the page order?', answer: 'Yes. If your PDF has 5 pages, enter 5,4,3,2,1 to reverse the entire document.' },
];

function ReorderPdfPage() {
  const [pageOrderText, setPageOrderText] = useState('');

  return (
    <>
      <SEOHead
        title="Reorder PDF Pages — Rearrange PDF Online Free | DOSIBridge"
        description="Rearrange pages in a PDF document. Enter your desired page order and download the reordered PDF. Free, no signup."
        path="/reorder-pdf"
        faqItems={faqItems}
      />
      <section className="bg-gradient-to-b from-primary-50 to-white py-8 sm:py-12 md:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight">Reorder PDF Pages</h1>
          <p className="mt-3 text-sm sm:text-base text-gray-600 max-w-xl mx-auto">Rearrange pages in your PDF by specifying the new order. Free and instant.</p>
        </div>
      </section>
      <SingleFileTool
        toolTitle="Reorder Pages"
        onProcess={async (sessionId, fileId) => {
          const order = pageOrderText.split(/[,\s]+/).map(Number).filter((n) => n > 0);
          if (!order.length) throw new Error('Enter page numbers separated by commas');
          return pdfAPI.reorderPdf(sessionId, fileId, order);
        }}
        renderOptions={(fileInfo) => (
          <div className="bg-white rounded-xl border border-gray-200 p-4 space-y-2">
            <label className="text-sm font-medium text-gray-700 block">
              New page order <span className="text-gray-400 font-normal">({fileInfo?.page_count} pages)</span>
            </label>
            <input
              type="text"
              value={pageOrderText}
              onChange={(e) => setPageOrderText(e.target.value)}
              className="input text-sm"
              placeholder={fileInfo?.page_count ? `e.g. ${Array.from({ length: fileInfo.page_count }, (_, i) => fileInfo.page_count - i).join(', ')}` : 'e.g. 3, 1, 4, 2'}
            />
            <p className="text-xs text-gray-500">Enter page numbers separated by commas in the order you want.</p>
          </div>
        )}
      />
      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-8"><FAQSection items={faqItems} /></section>
    </>
  );
}

export default ReorderPdfPage;
