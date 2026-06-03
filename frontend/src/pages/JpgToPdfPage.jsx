import React, { useState } from 'react';
import SEOHead from '../components/SEOHead';
import SingleFileTool from '../components/SingleFileTool';
import FAQSection from '../components/FAQSection';
import { pdfAPI } from '../services/api';

const faqItems = [
  { question: 'How do I convert JPG to PDF?', answer: 'Upload one or more JPG/JPEG images using the tool above. Click Convert to PDF. Your images are combined into a single PDF, one image per page. Download the result instantly.' },
  { question: 'Can I combine multiple JPGs into one PDF?', answer: 'Yes. Upload all your JPG files at once. They will be combined in order into a single multi-page PDF document.' },
  { question: 'Is the conversion free?', answer: 'Yes. DOSIBridge JPG to PDF converter is completely free with no signup, no watermark, and no daily limits.' },
];

function JpgToPdfPage() {
  const [outputName, setOutputName] = useState('photos.pdf');

  return (
    <>
      <SEOHead
        title="JPG to PDF — Convert JPEG Images to PDF Free | DOSIBridge"
        description="Convert JPG and JPEG images to PDF documents. Combine multiple photos into one PDF. Free online."
        path="/jpg-to-pdf"
        keywords="JPG to PDF, JPEG to PDF, convert JPG to PDF, photo to PDF, multiple JPG to PDF"
        faqItems={faqItems}
      />
      <section className="bg-gradient-to-b from-primary-50 to-white py-8 sm:py-12 md:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight">JPG to PDF Converter</h1>
          <p className="mt-3 text-sm sm:text-base text-gray-600 max-w-xl mx-auto">Convert JPEG photos into a clean PDF document. Free, instant, no signup.</p>
        </div>
      </section>
      <SingleFileTool
        toolTitle="Convert JPG to PDF"
        acceptImages
        acceptMultiple
        onProcess={async (sessionId, _fileId, _fileInfo, imageFiles) => pdfAPI.imageToPath(imageFiles, sessionId, outputName)}
        renderOptions={() => (
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <label className="text-sm font-medium text-gray-700 mb-1.5 block">Output filename</label>
            <input type="text" value={outputName} onChange={(e) => setOutputName(e.target.value)}
              className="input text-sm" placeholder="photos.pdf" />
          </div>
        )}
      />
      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-8"><FAQSection items={faqItems} /></section>
    </>
  );
}

export default JpgToPdfPage;
