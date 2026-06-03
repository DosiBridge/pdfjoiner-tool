import React from 'react';
import { Link } from 'react-router-dom';
import PdfTool from '../../components/PdfTool';
import FAQSection from '../../components/FAQSection';
import SEOHead from '../../components/SEOHead';

const faqItems = [
  {
    question: 'What is the easiest way to merge PDF files?',
    answer:
      'The easiest way is to use a free online tool like DOSIBridge. Open the page, drag your PDF files onto the upload area, select pages, and click merge. No software installation, no account creation, and no watermarks. The entire process takes under 30 seconds.',
  },
  {
    question: 'Can I merge PDFs without Adobe Acrobat?',
    answer:
      'Yes. Adobe Acrobat is not the only option — and at $19.99/month, it is far from the most economical one. DOSIBridge provides the same merge functionality for free, directly in your browser. No subscription required.',
  },
  {
    question: 'How do I merge PDFs on a Mac?',
    answer:
      'On Mac, you can use the built-in Preview app (open one PDF, drag pages from another into the sidebar). For a faster experience with more features, use DOSIBridge in your browser — upload multiple files, reorder pages, and download the merged result.',
  },
  {
    question: 'How do I merge PDFs on Windows?',
    answer:
      'Windows does not include a built-in PDF merger. You can use DOSIBridge in any browser (Chrome, Edge, Firefox) — upload your files, select and reorder pages, and download the merged PDF. No software installation needed.',
  },
];

function HowToMergePdfPage() {
  return (
    <>
      <SEOHead
        title="How to Merge PDF Files Online — Step-by-Step Guide | DOSIBridge"
        description="Learn how to merge PDF files into one document. Step-by-step guide covering free online tools, desktop methods, and mobile options. Merge PDFs in under 30 seconds."
        path="/blog/how-to-merge-pdf-files-online"
        keywords="how to merge PDF files, how to combine PDFs, how to merge PDF, how to make one PDF from many files, how to combine multiple PDFs into one, merge PDF tutorial"
      />

      <section className="bg-gradient-to-b from-primary-50 to-white py-8 sm:py-10 md:py-12">
        <div className="max-w-4xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            How to Merge PDF Files Online
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            A complete guide to combining multiple PDFs into one file — using free online tools, desktop software, or your phone.
          </p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-8 sm:py-10 md:py-12">
        <article className="prose prose-gray max-w-none">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
            Method 1: Merge PDFs Online (Fastest)
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            The fastest way to merge PDF files is with a free online tool. No installation, no account — just
            upload and merge. Here is how to do it with DOSIBridge:
          </p>
          <ol className="list-decimal list-inside text-gray-700 leading-relaxed mb-6 space-y-2">
            <li><strong>Go to the merge tool</strong> — Scroll down to the tool on this page, or visit <Link to="/merge-pdf" className="text-primary-600 hover:text-primary-700 underline">DOSIBridge Merge PDF</Link>.</li>
            <li><strong>Upload your PDF files</strong> — Drag and drop files onto the upload area, or click to browse. You can upload up to 20 files, each up to 50 MB.</li>
            <li><strong>Select pages</strong> — Click on any uploaded file to see page thumbnails. Select all pages or choose specific ones.</li>
            <li><strong>Reorder pages</strong> — Drag and drop pages into your preferred order in the reorder panel.</li>
            <li><strong>Click Merge</strong> — Your combined PDF is ready to download in seconds.</li>
          </ol>

          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mt-8 mb-4">
            Method 2: Merge PDFs on Mac (Built-in)
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            macOS includes a free PDF merge feature through the Preview app:
          </p>
          <ol className="list-decimal list-inside text-gray-700 leading-relaxed mb-6 space-y-2">
            <li>Open the first PDF in Preview.</li>
            <li>Go to View → Thumbnails to show the sidebar.</li>
            <li>Drag additional PDF files from Finder into the sidebar at the position where you want them.</li>
            <li>Rearrange pages by dragging thumbnails in the sidebar.</li>
            <li>Go to File → Export as PDF to save the merged document.</li>
          </ol>
          <p className="text-gray-700 leading-relaxed mb-4">
            <strong>Limitation:</strong> Preview works fine for simple merges but has no batch upload, no page selection
            from multiple files, and no options like page numbering or password protection. For those features,
            use <Link to="/merge-pdf" className="text-primary-600 hover:text-primary-700 underline">DOSIBridge</Link>.
          </p>

          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mt-8 mb-4">
            Method 3: Merge PDFs on Windows
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Windows does not include a built-in PDF merger. Your options are:
          </p>
          <ul className="list-disc list-inside text-gray-700 leading-relaxed mb-4 space-y-2">
            <li><strong>Online tool (recommended)</strong> — Use <Link to="/merge-pdf" className="text-primary-600 hover:text-primary-700 underline">DOSIBridge</Link> in Edge, Chrome, or Firefox. No installation needed.</li>
            <li><strong>Adobe Acrobat</strong> — Full PDF editor with merge. $19.99/month subscription.</li>
            <li><strong>PDFsam Basic</strong> — Free desktop app for merging. Requires download and installation.</li>
          </ul>

          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mt-8 mb-4">
            Method 4: Merge PDFs on Mobile
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            You can merge PDFs directly on your phone without downloading any app. See our detailed guide:
            <Link to="/merge-pdf-on-mobile" className="text-primary-600 hover:text-primary-700 underline ml-1">How to merge PDF on mobile</Link>.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Quick steps: Open DOSIBridge in your phone browser → tap upload → select PDFs from your files app
            → select pages → tap merge → download the result.
          </p>

          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mt-8 mb-4">
            Which Method Should You Use?
          </h2>
          <div className="overflow-x-auto mb-6">
            <table className="min-w-full text-sm text-gray-700 border border-gray-200 rounded-lg">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-3 text-left font-semibold border-b">Method</th>
                  <th className="px-4 py-3 text-left font-semibold border-b">Best For</th>
                  <th className="px-4 py-3 text-left font-semibold border-b">Cost</th>
                  <th className="px-4 py-3 text-left font-semibold border-b">Page Reorder</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b"><td className="px-4 py-2">DOSIBridge (online)</td><td className="px-4 py-2">Any device, any OS</td><td className="px-4 py-2">Free</td><td className="px-4 py-2">Yes</td></tr>
                <tr className="border-b"><td className="px-4 py-2">Mac Preview</td><td className="px-4 py-2">Quick 2-file merge</td><td className="px-4 py-2">Free (Mac only)</td><td className="px-4 py-2">Limited</td></tr>
                <tr className="border-b"><td className="px-4 py-2">Adobe Acrobat</td><td className="px-4 py-2">Professional workflows</td><td className="px-4 py-2">$19.99/mo</td><td className="px-4 py-2">Yes</td></tr>
                <tr><td className="px-4 py-2">PDFsam Basic</td><td className="px-4 py-2">Offline desktop use</td><td className="px-4 py-2">Free</td><td className="px-4 py-2">Yes</td></tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mt-8 mb-4">
            Tips for Better PDF Merges
          </h2>
          <ul className="list-disc list-inside text-gray-700 leading-relaxed mb-4 space-y-2">
            <li><strong>Check page order before merging</strong> — <Link to="/blog/how-to-reorder-pdf-before-merging" className="text-primary-600 hover:text-primary-700 underline">Reorder pages</Link> using drag-and-drop to avoid re-doing the merge.</li>
            <li><strong>Remove unnecessary pages</strong> — Skip blank pages, duplicate pages, or sections you don't need.</li>
            <li><strong>Use a descriptive filename</strong> — Name your output file clearly instead of keeping "merged.pdf."</li>
            <li><strong>Add page numbers</strong> — For long documents, enable automatic page numbering.</li>
            <li><strong>Password-protect sensitive documents</strong> — DOSIBridge lets you add a password to the merged output.</li>
          </ul>
        </article>
      </section>

      {/* Tool inline */}
      <section className="bg-gray-100 py-8 sm:py-10">
        <div className="max-w-4xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 text-center mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Try It Now — Merge Your PDFs</h2>
          <p className="text-gray-600 mt-2">Upload your files below and merge them in seconds.</p>
        </div>
        <PdfTool />
      </section>

      <section className="max-w-4xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-8">
        <FAQSection items={faqItems} />
      </section>
    </>
  );
}

export default HowToMergePdfPage;
