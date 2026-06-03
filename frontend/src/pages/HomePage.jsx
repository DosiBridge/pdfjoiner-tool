import React from 'react';
import { Link } from 'react-router-dom';
import PdfTool from '../components/PdfTool';
import FAQSection from '../components/FAQSection';
import SEOHead from '../components/SEOHead';

const faqItems = [
  {
    question: 'Is this PDF joiner completely free?',
    answer:
      'Yes. DOSIBridge PDF Joiner is 100% free. There are no hidden fees, no premium tier, no daily limits, and no account signup required. Upload your files, merge them, and download your result — all without paying a cent. We believe essential document tools should be accessible to everyone.',
  },
  {
    question: 'Can I merge PDF files without installing software?',
    answer:
      'Absolutely. DOSIBridge PDF Joiner runs entirely in your web browser. There is nothing to install, no plugins to enable, and no desktop application to download. It works on any device with a modern browser — Windows, Mac, Linux, Chromebook, iPad, or Android phone.',
  },
  {
    question: 'Are my files stored on your servers?',
    answer:
      'No. Your uploaded files are processed temporarily and automatically deleted after your session ends. We never store, share, sell, or access your documents. All file transfers happen over encrypted HTTPS connections. Your privacy is built into every step.',
  },
  {
    question: 'Can I reorder PDF pages before merging?',
    answer:
      'Yes. After uploading your PDFs, you can select specific pages from each document, then drag and drop them into any order you want. This gives you complete control over the final document — perfect for assembling reports, combining chapters, or creating custom presentations.',
  },
  {
    question: 'Does this tool add a watermark to my merged PDF?',
    answer:
      'No. DOSIBridge PDF Joiner never adds watermarks, logos, or branding to your documents. The merged PDF is exactly what you created — clean, professional, and ready to share or print.',
  },
  {
    question: 'What is the maximum file size I can upload?',
    answer:
      'You can upload PDF files up to 50 MB each, and up to 20 files at once. This is enough for most document merging needs, including large reports, presentations, and scanned documents.',
  },
];

function HomePage() {
  return (
    <>
      <SEOHead
        title="Merge PDF Files Online Free — No Signup, No Watermark | DOSIBridge"
        description="Combine multiple PDF files into one document instantly. Free PDF merger with drag-and-drop reorder, no signup, no watermark, and mobile support."
        path="/"
        keywords="PDF joiner, merge PDF, combine PDF files, PDF merger online, free PDF tool, join PDF, merge PDF pages, reorder PDF, merge PDF no watermark"
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary-50 to-white py-8 sm:py-10 md:py-12">
        <div className="max-w-4xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Merge PDF Files Online for Free
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Combine multiple PDF documents into one clean file. Drag-and-drop reorder, page selection,
            no signup, no watermark — works on desktop and mobile.
          </p>
        </div>
      </section>

      {/* Tool */}
      <PdfTool />

      {/* SEO Content */}
      <section className="max-w-4xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-8 sm:py-10 md:py-12">
        <article className="prose prose-gray max-w-none">

          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
            How to Merge PDF Files
          </h2>
          <p className="text-gray-700 leading-relaxed mb-2">
            Merging PDFs with DOSIBridge takes under 30 seconds:
          </p>
          <ol className="list-decimal list-inside text-gray-700 leading-relaxed mb-6 space-y-2">
            <li><strong>Upload your PDF files</strong> — Drag and drop files onto the upload area or click to browse. You can upload up to 20 PDFs at once, each up to 50 MB.</li>
            <li><strong>Select pages</strong> — Click any uploaded file to view its pages. Choose all pages or pick only the ones you need.</li>
            <li><strong>Reorder pages</strong> — Drag and drop pages into your preferred sequence across all uploaded files.</li>
            <li><strong>Set options</strong> — Name your output file, add page numbers, watermark text, or password protection.</li>
            <li><strong>Merge and download</strong> — Click merge and download your combined PDF in seconds.</li>
          </ol>

          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mt-8 mb-4">
            Why Use DOSIBridge PDF Joiner?
          </h2>

          <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-2">No Signup Required</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            Most PDF tools force you to create an account before you can do anything. DOSIBridge skips all of that.
            Open the page, upload your files, and merge. No email address, no password, no verification step. Your
            time matters more than our email list.
          </p>

          <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-2">No Watermark, Ever</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            Free PDF tools that stamp their logo on every page of your document are not actually free — they are
            advertising on your work. DOSIBridge never adds watermarks, branding, or any modification to your
            merged PDF. What you create is what you get.
          </p>

          <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-2">Privacy by Design</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            Your files are uploaded over encrypted HTTPS, processed on our secure servers, and automatically deleted
            when your session ends. We never store your documents, never share them with third parties, and never
            use them for any purpose other than performing the merge you requested.
          </p>

          <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-2">Works on Every Device</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            DOSIBridge PDF Joiner runs in your browser. Use it on your Windows PC, Mac, Linux workstation,
            Chromebook, iPad, or Android phone. There is no software to install, no Java plugin to enable, and no
            compatibility issues. If your device has a browser and internet, you can merge PDFs.
          </p>

          <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-2">Drag-and-Drop Page Reordering</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            Most merging tools stack files end-to-end with no control over page order. DOSIBridge lets you select
            specific pages from each PDF, then drag them into exactly the order you want. Need page 5 from one
            document before page 1 of another? Just drag and drop. This is what makes DOSIBridge different from
            simple file concatenation tools.
          </p>

          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mt-8 mb-4">
            Common Uses for PDF Merging
          </h2>
          <ul className="list-disc list-inside text-gray-700 leading-relaxed mb-4 space-y-2">
            <li><strong>Job applications</strong> — Combine your CV, cover letter, and certificates into one PDF for clean submission.</li>
            <li><strong>Business reports</strong> — Merge cover pages, summaries, charts, and appendices into a single polished document.</li>
            <li><strong>Academic papers</strong> — Combine research papers, references, and supplementary materials for submission.</li>
            <li><strong>Legal filings</strong> — Assemble contracts, exhibits, and supporting documentation into one filing package.</li>
            <li><strong>Invoice bundles</strong> — Combine monthly invoices or receipts into one PDF for accounting or reimbursement.</li>
          </ul>

          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mt-8 mb-4">
            Advanced Features
          </h2>
          <ul className="list-disc list-inside text-gray-700 leading-relaxed mb-4 space-y-2">
            <li><strong>Page numbering</strong> — Automatically add page numbers to your merged document.</li>
            <li><strong>Watermarking</strong> — Add custom text watermarks for drafts, confidential documents, or branding.</li>
            <li><strong>Password protection</strong> — Secure your merged PDF with a password.</li>
            <li><strong>Custom file naming</strong> — Set a meaningful filename instead of "merged.pdf."</li>
          </ul>

          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mt-8 mb-4">
            Related PDF Tools
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            DOSIBridge PDF Joiner is part of the{' '}
            <a href="https://dosibridge.com/projects" className="text-primary-600 hover:text-primary-700 underline">
              DOSIBridge project suite
            </a>. Explore our other free tools:
          </p>
          <ul className="list-disc list-inside text-gray-700 leading-relaxed mb-4 space-y-2">
            <li><Link to="/merge-pdf" className="text-primary-600 hover:text-primary-700 underline">Merge PDF</Link> — Quick PDF merge tool</li>
            <li><Link to="/combine-pdf-files" className="text-primary-600 hover:text-primary-700 underline">Combine PDF Files</Link> — Combine multiple documents into one</li>
            <li><Link to="/merge-pdf-on-mobile" className="text-primary-600 hover:text-primary-700 underline">Merge PDF on Mobile</Link> — Mobile-optimized PDF merging</li>
            <li><Link to="/merge-pdf-for-job-application" className="text-primary-600 hover:text-primary-700 underline">Merge PDF for Job Application</Link> — Combine CV, cover letter, and certificates</li>
            <li><a href="https://converter.dosibridge.com" className="text-primary-600 hover:text-primary-700 underline">DOSIBridge Converter</a> — File conversion tools</li>
          </ul>
        </article>

        <FAQSection items={faqItems} />
      </section>
    </>
  );
}

export default HomePage;
