import React from 'react';
import { Link } from 'react-router-dom';
import PdfTool from '../../components/PdfTool';
import FAQSection from '../../components/FAQSection';
import SEOHead from '../../components/SEOHead';

const faqItems = [
  {
    question: 'Can I rearrange pages from different PDF files?',
    answer:
      'Yes. Upload multiple PDF files, select pages from each one, and drag them into any order in the reorder panel. You can interleave pages from different documents — for example, page 3 from File A, then page 1 from File B, then page 5 from File A.',
  },
  {
    question: 'Can I remove pages I don\'t want?',
    answer:
      'Yes. When selecting pages from each uploaded file, only select the pages you want to keep. Any unselected pages will not appear in the merged output. You can also remove individual pages from the reorder panel by clicking the remove button.',
  },
  {
    question: 'Does reordering change my original files?',
    answer:
      'No. Your original PDF files are never modified. DOSIBridge creates a new merged PDF with pages in your chosen order. Your source files remain unchanged.',
  },
];

function HowToReorderPdfPage() {
  return (
    <>
      <SEOHead
        title="How to Reorder PDF Pages Before Merging — Free Guide | DOSIBridge"
        description="Learn how to rearrange PDF pages before merging them. Drag-and-drop page reordering, cross-file interleaving, and page removal. Free online, no software needed."
        path="/blog/how-to-reorder-pdf-before-merging"
        keywords="how to reorder PDF pages, rearrange PDF pages, reorder PDF before merging, how to rearrange pages in PDF, reorder PDF pages online, drag and drop PDF pages"
      />

      <section className="bg-gradient-to-b from-primary-50 to-white py-8 sm:py-10 md:py-12">
        <div className="max-w-4xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            How to Reorder PDF Pages Before Merging
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Arrange pages from multiple PDF files in exactly the order you want before combining them into one document. Free drag-and-drop interface.
          </p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-8 sm:py-10 md:py-12">
        <article className="prose prose-gray max-w-none">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
            Why Reorder Pages Before Merging?
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Most PDF merge tools simply stack files end-to-end: File A pages, then File B pages, then File C pages.
            But real-world documents are rarely that simple. You might need:
          </p>
          <ul className="list-disc list-inside text-gray-700 leading-relaxed mb-4 space-y-2">
            <li>Page 1 from your cover letter, followed by all pages of your CV, followed by select certificate pages</li>
            <li>Chapters from different source documents assembled in a custom order</li>
            <li>A report where charts from one PDF are inserted between sections of another</li>
            <li>A presentation where you skip irrelevant slides and rearrange the rest</li>
          </ul>
          <p className="text-gray-700 leading-relaxed mb-4">
            Page reordering gives you this level of control. Instead of merging and then fighting with the result,
            you arrange everything perfectly before the merge happens.
          </p>

          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mt-8 mb-4">
            How to Reorder Pages with DOSIBridge
          </h2>
          <ol className="list-decimal list-inside text-gray-700 leading-relaxed mb-6 space-y-3">
            <li>
              <strong>Upload your PDF files</strong> — Drag all the PDFs you want to work with onto the upload area. You can upload up to 20 files.
            </li>
            <li>
              <strong>Select pages from each file</strong> — Click on a file in the file list to see page thumbnails. Click individual pages to select them, or use "Select All" to include every page. Repeat for each file.
            </li>
            <li>
              <strong>Open the reorder panel</strong> — All selected pages appear in the "Selected Pages" panel with their order number, file name, and page number.
            </li>
            <li>
              <strong>Drag to reorder</strong> — Click and hold (or long-press on mobile) any page tile, then drag it to a new position. The order numbers update automatically.
            </li>
            <li>
              <strong>Remove pages</strong> — Click the trash icon on any page tile to remove it from the merge. The page is deselected, not deleted from the source file.
            </li>
            <li>
              <strong>Merge</strong> — When the order is right, click Merge. The output PDF will have pages in exactly the sequence you arranged.
            </li>
          </ol>

          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mt-8 mb-4">
            Reordering Examples
          </h2>

          <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-2">Example 1: Job Application Package</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            You have three files: Cover Letter (2 pages), CV (3 pages), and Certificates (5 pages, but you only want 2).
            Upload all three, select pages 1-2 from the cover letter, all pages from the CV, and pages 1 and 3 from
            certificates. Drag them into order: Cover Letter → CV → Certificates. Merge.
          </p>

          <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-2">Example 2: Report Assembly</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            You have an executive summary (1 page), a data analysis (8 pages), and an appendix (4 pages), each in
            separate PDFs. Upload all three, select all pages, and drag the executive summary to position 1, analysis
            to positions 2-9, and appendix to positions 10-13. Merge into one polished report.
          </p>

          <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-2">Example 3: Interleaved Content</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            You have a presentation (slides 1-10) and supporting data charts in a separate PDF (5 charts). You want
            to insert a chart after every two slides. Upload both, select all pages, then drag chart pages into
            positions 3, 6, 9, 12, and 15. The result interleaves your content perfectly.
          </p>

          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mt-8 mb-4">
            Tips for Effective Page Reordering
          </h2>
          <ul className="list-disc list-inside text-gray-700 leading-relaxed mb-4 space-y-2">
            <li><strong>Preview before selecting</strong> — Click each file to see page thumbnails so you know exactly which pages you're working with.</li>
            <li><strong>Be selective</strong> — Don't select all pages by default. Only include what belongs in the final document.</li>
            <li><strong>Use the page labels</strong> — Each tile shows the source filename and page number, so you always know where each page came from.</li>
            <li><strong>Check the order numbers</strong> — The order numbers (1, 2, 3...) update in real time as you drag. Verify the sequence before merging.</li>
            <li><strong>Add page numbers</strong> — Enable page numbering in the merge options so the final document has proper pagination.</li>
          </ul>

          <div className="mt-8 p-4 bg-primary-50 rounded-lg border border-primary-100">
            <p className="text-gray-700 text-sm">
              Ready to reorder and merge? Use the tool below, or visit <Link to="/merge-pdf" className="text-primary-600 hover:text-primary-700 underline">Merge PDF</Link> for a full-page experience.
            </p>
          </div>
        </article>
      </section>

      <section className="bg-gray-100 py-8 sm:py-10">
        <div className="max-w-4xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 text-center mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Reorder and Merge Your PDFs</h2>
        </div>
        <PdfTool />
      </section>

      <section className="max-w-4xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-8">
        <FAQSection items={faqItems} />
      </section>
    </>
  );
}

export default HowToReorderPdfPage;
