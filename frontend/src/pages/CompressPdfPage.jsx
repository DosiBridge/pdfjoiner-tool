import React, { useState } from 'react';
import SEOHead from '../components/SEOHead';
import SingleFileTool from '../components/SingleFileTool';
import FAQSection from '../components/FAQSection';
import { pdfAPI } from '../services/api';

const faqItems = [
  { question: 'How does PDF compression work?', answer: 'DOSIBridge removes unused objects, compresses content streams, and optimizes the internal structure of your PDF. This reduces file size without visually changing the content.' },
  { question: 'Will compression reduce the quality of my PDF?', answer: 'For text-heavy PDFs, there is no visible quality loss. For image-heavy PDFs, some slight quality reduction may occur depending on the compression level you choose.' },
  { question: 'Is there a file size limit?', answer: 'You can upload PDFs up to 50 MB. The compressed output is typically 20-70% smaller depending on the content.' },
];

function CompressPdfPage() {
  const [quality, setQuality] = useState('medium');

  return (
    <>
      <SEOHead
        title="Compress PDF — Reduce PDF File Size Online Free | DOSIBridge"
        description="Reduce PDF file size without losing quality. Free online PDF compressor — no signup, no watermark."
        path="/compress-pdf"
        keywords="compress PDF, reduce PDF size, PDF compressor, shrink PDF, make PDF smaller"
        faqItems={faqItems}
      />
      <section className="bg-gradient-to-b from-primary-50 to-white py-8 sm:py-12 md:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight">Compress PDF Online</h1>
          <p className="mt-3 text-sm sm:text-base text-gray-600 max-w-xl mx-auto">Reduce your PDF file size while keeping quality. Free, no signup, instant download.</p>
        </div>
      </section>
      <SingleFileTool
        toolTitle="Compress PDF"
        onProcess={async (sessionId, fileId) => pdfAPI.compressPdf(sessionId, fileId, quality)}
        renderOptions={() => (
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <label className="text-sm font-medium text-gray-700 mb-2 block">Compression Level</label>
            <div className="flex gap-2">
              {['low', 'medium', 'high'].map((q) => (
                <button key={q} onClick={() => setQuality(q)}
                  className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${quality === q ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
                  {q.charAt(0).toUpperCase() + q.slice(1)}
                </button>
              ))}
            </div>
          </div>
        )}
      />
      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-8"><FAQSection items={faqItems} /></section>
    </>
  );
}

export default CompressPdfPage;
