import React from 'react';
import { Link } from 'react-router-dom';
import PdfTool from '../components/PdfTool';
import FAQSection from '../components/FAQSection';
import SEOHead from '../components/SEOHead';

const faqItems = [
  {
    question: 'How do I combine multiple PDF files into one?',
    answer:
      'Upload all your PDF files using the tool above — you can drag and drop up to 20 files at once. Select the pages you want from each file, arrange them in your preferred order, and click Merge. Your combined PDF is ready to download instantly.',
  },
  {
    question: 'Can I choose which pages to include from each PDF?',
    answer:
      'Yes. After uploading, click on any file to see thumbnail previews of every page. Select individual pages or all pages, then arrange them in any order using the drag-and-drop reorderer. Only the pages you select will appear in the final combined PDF.',
  },
  {
    question: 'Is there a limit on how many PDFs I can combine?',
    answer:
      'You can upload and combine up to 20 PDF files in a single session, with each file up to 50 MB in size. This is enough for most document assembly tasks, from simple two-file merges to complex multi-document packages.',
  },
  {
    question: 'Will my combined PDF lose any formatting?',
    answer:
      'No. DOSIBridge combines your PDF pages at the structural level, preserving all original text, fonts, images, links, and formatting. The combined output is identical in quality to your source files.',
  },
];

function CombinePdfFilesPage() {
  return (
    <>
      <SEOHead
        title="Combine PDF Files Into One — Free Online PDF Combiner | DOSIBridge"
        description="Combine multiple PDF files into a single document online. Select pages, reorder them, and download your combined PDF. Free, no signup, no watermark."
        path="/combine-pdf-files"
        faqItems={faqItems}
      />

      <section className="bg-gradient-to-b from-primary-50 to-white py-8 sm:py-10 md:py-12">
        <div className="max-w-4xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Combine PDF Files Into One Document
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Upload multiple PDFs, select and reorder pages, and download a single combined document. Fast, free, and private.
          </p>
        </div>
      </section>

      <PdfTool />

      <section className="max-w-4xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-8 sm:py-10 md:py-12">
        <article className="prose prose-gray max-w-none">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
            Why Combine PDF Files?
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Sending multiple PDF attachments is messy. Recipients have to open each file separately, and files
            can get lost or downloaded out of order. Combining your PDFs into one clean document solves all of
            these problems — one file, one attachment, one download.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Whether you are assembling a proposal with multiple sections, bundling receipts for expense reporting,
            or packaging application materials, combining PDFs into one file makes your documents more
            professional and easier to handle.
          </p>

          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mt-8 mb-4">
            How to Combine PDFs Step by Step
          </h2>
          <ol className="list-decimal list-inside text-gray-700 leading-relaxed mb-6 space-y-2">
            <li><strong>Upload your files</strong> — Drag all your PDFs onto the upload area. You can upload up to 20 files at once.</li>
            <li><strong>Preview and select pages</strong> — Click each file to see page thumbnails. Select all pages or just the ones you need.</li>
            <li><strong>Arrange the order</strong> — Drag pages in the reorder panel to set the exact sequence you want in the final document.</li>
            <li><strong>Add options</strong> — Set a custom filename, add page numbers, or protect with a password.</li>
            <li><strong>Combine and download</strong> — Click Merge to combine your selected pages into one PDF and download it immediately.</li>
          </ol>

          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mt-8 mb-4">
            Scenarios Where Combining PDFs Saves Time
          </h2>
          <ul className="list-disc list-inside text-gray-700 leading-relaxed mb-4 space-y-2">
            <li><strong>Client deliverables</strong> — Package your project report, timeline, and invoice into one professional document.</li>
            <li><strong>Government applications</strong> — Combine ID scans, proof of address, and application forms into a single submission file.</li>
            <li><strong>Event planning</strong> — Merge venue contracts, vendor agreements, and floor plans into one event package.</li>
            <li><strong>Insurance claims</strong> — Bundle photos, repair estimates, and claim forms into one organized file.</li>
            <li><strong>School projects</strong> — Combine your essay, bibliography, and appendices into one submission PDF.</li>
          </ul>

          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mt-8 mb-4">
            Combine PDFs Without Compromising Privacy
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            DOSIBridge processes your files over encrypted connections and deletes them automatically after your
            session ends. Unlike many online tools, we never store your documents on our servers beyond what is
            needed to perform the merge. No registration means no data collection — your files and your identity
            stay private.
          </p>

          <div className="mt-8 p-4 bg-primary-50 rounded-lg border border-primary-100">
            <p className="text-gray-700 text-sm">
              Need to combine specific types of documents?{' '}
              <Link to="/combine-cv-and-certificates-pdf" className="text-primary-600 hover:text-primary-700 underline">Combine CV and certificates</Link>{' '}
              or <Link to="/merge-pdf-for-job-application" className="text-primary-600 hover:text-primary-700 underline">merge PDFs for a job application</Link>.
            </p>
          </div>
        </article>

        <FAQSection items={faqItems} />
      </section>
    </>
  );
}

export default CombinePdfFilesPage;
