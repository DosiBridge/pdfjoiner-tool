import React from 'react';
import { Link } from 'react-router-dom';
import PdfTool from '../components/PdfTool';
import FAQSection from '../components/FAQSection';
import SEOHead from '../components/SEOHead';

const faqItems = [
  {
    question: 'Can I merge scanned PDF documents?',
    answer:
      'Yes. If your scanned documents are saved as PDF files, you can upload and merge them just like any other PDF. DOSIBridge works with all valid PDF files regardless of whether they were created digitally or from a scanner.',
  },
  {
    question: 'How do I scan documents to PDF on my phone?',
    answer:
      'Use your phone\'s built-in scanner (Google Drive on Android, Notes on iPhone) or apps like Adobe Scan or Microsoft Lens. These create PDF files from your camera that you can then upload to DOSIBridge and merge with other documents.',
  },
  {
    question: 'Can I remove blank pages from scanned documents before merging?',
    answer:
      'Yes. After uploading a scanned PDF, click on it to see page thumbnails. Only select the pages with content — skip blank backs or empty pages. Only selected pages will be included in the merged output.',
  },
  {
    question: 'Will merging reduce the quality of my scanned pages?',
    answer:
      'No. DOSIBridge preserves the original resolution and quality of every page. Scanned images within the PDF are not re-compressed or downsampled during the merge process.',
  },
];

function MergeScannedDocumentsPage() {
  return (
    <>
      <SEOHead
        title="Merge Scanned Documents into One PDF — Free | DOSIBridge"
        description="Combine scanned documents, receipts, and paper forms into a single PDF. Upload scanned pages, remove blanks, reorder, and download one clean file. Free online."
        path="/merge-scanned-documents-pdf"
        faqItems={faqItems}
      />

      <section className="bg-gradient-to-b from-primary-50 to-white py-8 sm:py-10 md:py-12">
        <div className="max-w-4xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Merge Scanned Documents into One PDF
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Combine scanned pages, receipts, and paper forms into a single organized PDF. Remove blank pages, reorder, and download a clean file.
          </p>
        </div>
      </section>

      <PdfTool />

      <section className="max-w-4xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-8 sm:py-10 md:py-12">
        <article className="prose prose-gray max-w-none">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
            Why Merge Scanned Documents?
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Scanners and phone scanning apps often create separate PDF files for each page or each scanning
            session. If you scan a 10-page contract, you might end up with 10 individual PDF files. Merging
            them into one document makes them easier to store, share, email, and print.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            DOSIBridge is particularly useful for scanned documents because of its page selection feature. Scanned
            PDFs often include blank backs, cover pages you don't need, or pages that were scanned in the wrong
            order. You can preview every page, select only what you need, and drag them into the correct sequence
            before merging.
          </p>

          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mt-8 mb-4">
            How to Merge Scanned Documents
          </h2>
          <ol className="list-decimal list-inside text-gray-700 leading-relaxed mb-6 space-y-2">
            <li><strong>Scan your documents</strong> — Use a flatbed scanner, multi-function printer, or phone scanning app (Google Drive, Apple Notes, Adobe Scan, Microsoft Lens).</li>
            <li><strong>Save as PDF</strong> — Make sure your scans are saved as PDF files, not images. Most scanning apps have a "Save as PDF" option.</li>
            <li><strong>Upload to DOSIBridge</strong> — Drag all your scanned PDF files onto the upload area above.</li>
            <li><strong>Preview and select pages</strong> — Click each file to see thumbnails. Remove blank pages, cover sheets, or pages scanned twice.</li>
            <li><strong>Reorder if needed</strong> — If pages were scanned out of order, drag them into the correct sequence.</li>
            <li><strong>Merge and download</strong> — Click merge to combine everything into one clean PDF file.</li>
          </ol>

          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mt-8 mb-4">
            Common Scanned Document Merging Scenarios
          </h2>
          <ul className="list-disc list-inside text-gray-700 leading-relaxed mb-4 space-y-2">
            <li><strong>Receipts for expense reports</strong> — Scan receipts from a business trip and merge them into one PDF for reimbursement.</li>
            <li><strong>Signed contracts</strong> — Combine scanned signature pages with the original digital contract.</li>
            <li><strong>Medical records</strong> — Merge scanned lab results, prescriptions, and doctor's notes into one patient file.</li>
            <li><strong>Tax documents</strong> — Combine W-2s, 1099s, receipts, and bank statements into one tax filing package.</li>
            <li><strong>Old paper documents</strong> — Digitize and merge old paper records, letters, or archives into organized PDF files.</li>
            <li><strong>ID document packages</strong> — Merge scanned passport, driver's license, and utility bills for verification.</li>
          </ul>

          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mt-8 mb-4">
            Tips for Better Scanned PDF Merges
          </h2>
          <ul className="list-disc list-inside text-gray-700 leading-relaxed mb-4 space-y-2">
            <li><strong>Scan at 300 DPI</strong> — This gives good readability without making files too large. Most scanner apps default to this.</li>
            <li><strong>Use black and white for text</strong> — If your document is primarily text, scanning in B&W reduces file size significantly.</li>
            <li><strong>Straighten before scanning</strong> — Most phone scanner apps auto-crop and straighten. This makes the merged result look cleaner.</li>
            <li><strong>Name your merged file clearly</strong> — Use DOSIBridge's filename option to create a descriptive name like "Tax_Receipts_2025.pdf."</li>
            <li><strong>Add page numbers</strong> — For multi-page scanned documents, enable page numbering for easier reference later.</li>
          </ul>

          <div className="mt-8 p-4 bg-primary-50 rounded-lg border border-primary-100">
            <p className="text-gray-700 text-sm">
              Related tools: <Link to="/merge-pdf" className="text-primary-600 hover:text-primary-700 underline">Merge PDF</Link> |{' '}
              <Link to="/combine-pdf-files" className="text-primary-600 hover:text-primary-700 underline">Combine PDF files</Link> |{' '}
              <Link to="/merge-pdf-on-mobile" className="text-primary-600 hover:text-primary-700 underline">Merge PDF on mobile</Link>
            </p>
          </div>
        </article>

        <FAQSection items={faqItems} />
      </section>
    </>
  );
}

export default MergeScannedDocumentsPage;
