import React from 'react';
import { Link } from 'react-router-dom';
import PdfTool from '../components/PdfTool';
import FAQSection from '../components/FAQSection';
import SEOHead from '../components/SEOHead';

const faqItems = [
  {
    question: 'How do I merge two PDF files into one?',
    answer:
      'Upload both PDF files using the uploader above. Select the pages you want from each file, arrange them in your preferred order using drag-and-drop, then click the Merge button. Your combined PDF will be ready to download in seconds.',
  },
  {
    question: 'Can I merge more than two PDFs at once?',
    answer:
      'Yes. DOSIBridge supports uploading and merging up to 20 PDF files simultaneously. Upload all your files, select pages from each one, reorder as needed, and merge them all into a single document.',
  },
  {
    question: 'Will merging reduce the quality of my PDFs?',
    answer:
      'No. DOSIBridge merges your PDF pages without re-encoding or compressing them. The merged output retains the original quality, resolution, fonts, and formatting of every page from your source files.',
  },
  {
    question: 'Do I need to install any software to merge PDFs?',
    answer:
      'No. This PDF merger runs entirely in your web browser. There is nothing to download or install. It works on Windows, Mac, Linux, and mobile devices — any platform with a modern web browser.',
  },
  {
    question: 'Is this the same as a PDF joiner?',
    answer:
      'Yes. "PDF joiner," "PDF merger," "combine PDF," and "join PDF files" all refer to the same action — combining multiple PDF documents into one file. DOSIBridge handles all of these. Upload your files, select pages, reorder them, and download one merged PDF.',
  },
  {
    question: 'What is the difference between merging and concatenating PDFs?',
    answer:
      'Concatenating simply stacks files end-to-end with no control over page order. DOSIBridge goes further — it lets you select individual pages from each file and arrange them in any sequence before merging. You get a custom document, not just a file dump.',
  },
];

function MergePdfPage() {
  return (
    <>
      <SEOHead
        title="Merge PDF — Free PDF Joiner & Merger Online | DOSIBridge"
        description="Merge PDF files, join PDFs, or combine documents into one. Free online PDF merger with drag-and-drop reorder. No installation, no signup, no watermark."
        path="/merge-pdf"
        keywords="merge PDF, PDF joiner, PDF merger, combine PDF, join PDF files, merge PDF files, merge PDF online, pdf joiner online, merge two PDFs, pdf merge tool"
      />

      <section className="bg-gradient-to-b from-primary-50 to-white py-8 sm:py-10 md:py-12">
        <div className="max-w-4xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Merge PDF Files Online
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            The fastest free PDF joiner and merger. Upload your files, choose pages, reorder them, and download one combined PDF. No software, no signup, no watermark.
          </p>
        </div>
      </section>

      <PdfTool />

      <section className="max-w-4xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-8 sm:py-10 md:py-12">
        <article className="prose prose-gray max-w-none">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
            PDF Joiner, Merger, and Combiner — All in One Tool
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Whether you call it merging, joining, or combining — the task is the same: take multiple PDF files and
            produce one single document. DOSIBridge handles this with a simple drag-and-drop interface that works
            on any device, in any browser, with zero installation.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Unlike Adobe Acrobat ($20/month), unlike desktop tools that require installation, and unlike "free"
            services that watermark your output or cap you at 2 merges per day — DOSIBridge is genuinely free,
            unlimited, and produces clean professional output every time.
          </p>

          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mt-8 mb-4">
            How to Merge PDF Files
          </h2>
          <ol className="list-decimal list-inside text-gray-700 leading-relaxed mb-6 space-y-2">
            <li><strong>Upload PDFs</strong> — Drag and drop up to 20 files (50 MB each) onto the upload area, or click to browse.</li>
            <li><strong>Select pages</strong> — Click any file to see page thumbnails. Pick all pages or select only what you need.</li>
            <li><strong>Reorder pages</strong> — Drag pages into any sequence. Interleave pages from different files, skip what you don't want.</li>
            <li><strong>Set options</strong> — Name your output file, add page numbers, watermark text, or password protection.</li>
            <li><strong>Merge and download</strong> — Click merge. Your combined PDF downloads in seconds.</li>
          </ol>

          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mt-8 mb-4">
            How PDF Merging Works Under the Hood
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            When you merge PDFs with DOSIBridge, the tool combines the internal page structures of each file into
            a single PDF document. This is not a screenshot or image conversion — the original text, fonts, images,
            links, and formatting are preserved exactly as they appear in the source files. The quality of your
            merged output is identical to your source documents.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            The page reordering feature lets you select individual pages from multiple files and arrange them in any
            sequence before merging. You can interleave pages from different documents, skip pages you don't need,
            or rearrange sections to create exactly the document structure you want.
          </p>

          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mt-8 mb-4">
            When You Need to Merge PDFs
          </h2>
          <ul className="list-disc list-inside text-gray-700 leading-relaxed mb-4 space-y-2">
            <li><strong>Office work</strong> — Combine reports, memos, and spreadsheet exports into one file for distribution.</li>
            <li><strong>Freelancing</strong> — Merge your invoice, contract, and deliverables into a single client package.</li>
            <li><strong>Job applications</strong> — <Link to="/merge-pdf-for-job-application" className="text-primary-600 hover:text-primary-700 underline">Combine CV, cover letter, and certificates</Link> into one professional file.</li>
            <li><strong>Education</strong> — Combine lecture notes, assignments, and reference materials into one study document.</li>
            <li><strong>Real estate</strong> — Assemble inspection reports, disclosures, and contracts into one transaction package.</li>
            <li><strong>Healthcare</strong> — Merge patient intake forms, consent forms, and insurance documents into one file.</li>
            <li><strong>Scanned documents</strong> — <Link to="/merge-scanned-documents-pdf" className="text-primary-600 hover:text-primary-700 underline">Combine scanned pages</Link> from a scanner or phone camera into one document.</li>
          </ul>

          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mt-8 mb-4">
            Why DOSIBridge Beats Other PDF Merge Tools
          </h2>
          <div className="overflow-x-auto mb-6">
            <table className="min-w-full text-sm text-gray-700 border border-gray-200 rounded-lg">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-3 text-left font-semibold border-b">Feature</th>
                  <th className="px-4 py-3 text-left font-semibold border-b">DOSIBridge</th>
                  <th className="px-4 py-3 text-left font-semibold border-b">Adobe Acrobat</th>
                  <th className="px-4 py-3 text-left font-semibold border-b">Most Free Tools</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b"><td className="px-4 py-2">Price</td><td className="px-4 py-2">Free</td><td className="px-4 py-2">$19.99/mo</td><td className="px-4 py-2">Free (limited)</td></tr>
                <tr className="border-b"><td className="px-4 py-2">Daily limit</td><td className="px-4 py-2">Unlimited</td><td className="px-4 py-2">Unlimited</td><td className="px-4 py-2">2–5/day</td></tr>
                <tr className="border-b"><td className="px-4 py-2">Signup required</td><td className="px-4 py-2">No</td><td className="px-4 py-2">Yes</td><td className="px-4 py-2">Usually</td></tr>
                <tr className="border-b"><td className="px-4 py-2">Watermark</td><td className="px-4 py-2">Never</td><td className="px-4 py-2">No</td><td className="px-4 py-2">Free tier: yes</td></tr>
                <tr className="border-b"><td className="px-4 py-2">Page reordering</td><td className="px-4 py-2">Drag-and-drop</td><td className="px-4 py-2">Yes</td><td className="px-4 py-2">Premium only</td></tr>
                <tr className="border-b"><td className="px-4 py-2">Installation</td><td className="px-4 py-2">None (browser)</td><td className="px-4 py-2">Desktop app</td><td className="px-4 py-2">None</td></tr>
                <tr><td className="px-4 py-2">Mobile support</td><td className="px-4 py-2">Full</td><td className="px-4 py-2">Separate app</td><td className="px-4 py-2">Varies</td></tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mt-8 mb-4">
            More PDF Merge Options
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
            <Link to="/merge-pdf-online-free" className="block p-4 bg-white border border-gray-200 rounded-lg hover:border-primary-300 transition-colors">
              <p className="font-semibold text-gray-900 text-sm">Merge PDF Online Free</p>
              <p className="text-xs text-gray-500 mt-1">No limits, no signup, every feature included</p>
            </Link>
            <Link to="/merge-pdf-no-watermark" className="block p-4 bg-white border border-gray-200 rounded-lg hover:border-primary-300 transition-colors">
              <p className="font-semibold text-gray-900 text-sm">Merge PDF No Watermark</p>
              <p className="text-xs text-gray-500 mt-1">Clean professional output, zero branding</p>
            </Link>
            <Link to="/merge-pdf-on-mobile" className="block p-4 bg-white border border-gray-200 rounded-lg hover:border-primary-300 transition-colors">
              <p className="font-semibold text-gray-900 text-sm">Merge PDF on Mobile</p>
              <p className="text-xs text-gray-500 mt-1">iPhone, Android, tablet — no app needed</p>
            </Link>
            <Link to="/merge-pdf-for-job-application" className="block p-4 bg-white border border-gray-200 rounded-lg hover:border-primary-300 transition-colors">
              <p className="font-semibold text-gray-900 text-sm">Merge PDF for Job Application</p>
              <p className="text-xs text-gray-500 mt-1">CV + cover letter + certificates in one file</p>
            </Link>
            <Link to="/combine-cv-and-certificates-pdf" className="block p-4 bg-white border border-gray-200 rounded-lg hover:border-primary-300 transition-colors">
              <p className="font-semibold text-gray-900 text-sm">Combine CV and Certificates</p>
              <p className="text-xs text-gray-500 mt-1">Merge credentials into one professional PDF</p>
            </Link>
            <Link to="/merge-scanned-documents-pdf" className="block p-4 bg-white border border-gray-200 rounded-lg hover:border-primary-300 transition-colors">
              <p className="font-semibold text-gray-900 text-sm">Merge Scanned Documents</p>
              <p className="text-xs text-gray-500 mt-1">Combine scanned pages into one clean file</p>
            </Link>
          </div>
        </article>

        <FAQSection items={faqItems} />
      </section>
    </>
  );
}

export default MergePdfPage;
