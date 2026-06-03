import React, { useState } from 'react';
import SEOHead from '../components/SEOHead';
import SingleFileTool from '../components/SingleFileTool';
import FAQSection from '../components/FAQSection';
import { pdfAPI } from '../services/api';

const faqItems = [
  { question: 'How do I delete pages from a PDF?', answer: 'Upload your PDF, enter the page numbers you want to remove (e.g., 2, 5, 8), and click Delete Pages. A new PDF is created without those pages.' },
  { question: 'Does this modify my original file?', answer: 'No. A new PDF is generated with the selected pages removed. Your original file stays unchanged.' },
  { question: 'Can I delete multiple pages at once?', answer: 'Yes. Enter all the page numbers you want to remove, separated by commas. They will all be removed in one step.' },
];

function DeletePdfPagesPage() {
  const [pagesToDelete, setPagesToDelete] = useState('');

  return (
    <>
      <SEOHead
        title="Delete PDF Pages — Remove Pages from PDF Online Free | DOSIBridge"
        description="Remove unwanted pages from a PDF document. Free online PDF page remover — no signup, no watermark."
        path="/delete-pdf-pages"
        keywords="delete PDF pages, remove pages from PDF, PDF page remover, remove PDF pages online"
        faqItems={faqItems}
      />
      <section className="bg-gradient-to-b from-primary-50 to-white py-8 sm:py-12 md:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight">Delete Pages from PDF</h1>
          <p className="mt-3 text-sm sm:text-base text-gray-600 max-w-xl mx-auto">Remove unwanted pages from your PDF. Free, instant, no signup.</p>
        </div>
      </section>
      <SingleFileTool
        toolTitle="Delete Pages"
        onProcess={async (sessionId, fileId) => {
          const pages = pagesToDelete.split(/[,\s]+/).map(Number).filter((n) => n > 0);
          if (!pages.length) throw new Error('Enter page numbers to delete');
          return pdfAPI.deletePages(sessionId, fileId, pages);
        }}
        renderOptions={(fileInfo) => (
          <div className="bg-white rounded-xl border border-gray-200 p-4 space-y-2">
            <label className="text-sm font-medium text-gray-700 block">
              Pages to delete <span className="text-gray-400 font-normal">({fileInfo?.page_count} pages total)</span>
            </label>
            <input
              type="text"
              value={pagesToDelete}
              onChange={(e) => setPagesToDelete(e.target.value)}
              className="input text-sm"
              placeholder="e.g. 2, 5, 8"
            />
            <p className="text-xs text-gray-500">Enter page numbers to remove, separated by commas.</p>
          </div>
        )}
      />
      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-8"><FAQSection items={faqItems} /></section>
    </>
  );
}

export default DeletePdfPagesPage;
