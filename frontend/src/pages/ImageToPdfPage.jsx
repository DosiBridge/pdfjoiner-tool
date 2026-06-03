import React, { useState } from 'react';
import SEOHead from '../components/SEOHead';
import SingleFileTool from '../components/SingleFileTool';
import FAQSection from '../components/FAQSection';
import { pdfAPI } from '../services/api';

const faqItems = [
  { question: 'What image formats are supported?', answer: 'JPG/JPEG, PNG, BMP, GIF, TIFF, and WebP. All common image formats are accepted.' },
  { question: 'Can I combine multiple images into one PDF?', answer: 'Yes. Upload multiple images at once and they will all be combined into a single PDF, one image per page.' },
  { question: 'What resolution will the PDF use?', answer: 'Images are embedded at 150 DPI by default, which provides good quality for both screen viewing and printing.' },
];

function ImageToPdfPage() {
  const [outputName, setOutputName] = useState('images.pdf');

  return (
    <>
      <SEOHead
        title="Image to PDF — Convert Images to PDF Online Free | DOSIBridge"
        description="Convert JPG, PNG, and other images to PDF format. Combine multiple photos into one PDF. Free online."
        path="/image-to-pdf"
        keywords="image to PDF, convert image to PDF, JPG to PDF, PNG to PDF, photo to PDF"
        faqItems={faqItems}
      />
      <section className="bg-gradient-to-b from-primary-50 to-white py-8 sm:py-12 md:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight">Image to PDF Converter</h1>
          <p className="mt-3 text-sm sm:text-base text-gray-600 max-w-xl mx-auto">Convert JPG, PNG, and other images into a single PDF. Free, no signup.</p>
        </div>
      </section>
      <SingleFileTool
        toolTitle="Convert to PDF"
        acceptImages
        acceptMultiple
        onProcess={async (sessionId, _fileId, _fileInfo, imageFiles) => pdfAPI.imageToPath(imageFiles, sessionId, outputName)}
        renderOptions={() => (
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <label className="text-sm font-medium text-gray-700 mb-1.5 block">Output filename</label>
            <input type="text" value={outputName} onChange={(e) => setOutputName(e.target.value)}
              className="input text-sm" placeholder="images.pdf" />
          </div>
        )}
      />
      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-8"><FAQSection items={faqItems} /></section>
    </>
  );
}

export default ImageToPdfPage;
