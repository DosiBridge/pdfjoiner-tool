import React from 'react';
import { Link } from 'react-router-dom';
import PdfTool from '../components/PdfTool';
import FAQSection from '../components/FAQSection';
import SEOHead from '../components/SEOHead';

const faqItems = [
  {
    question: 'What is a PDF joiner?',
    answer:
      'A PDF joiner is a tool that combines multiple PDF files into a single document. It is the same thing as a PDF merger or PDF combiner — the terms are interchangeable. DOSIBridge PDF Joiner lets you upload multiple PDFs, select and reorder pages, and download one unified file.',
  },
  {
    question: 'Is DOSIBridge PDF Joiner free to use?',
    answer:
      'Yes. DOSIBridge is completely free with no daily limits, no signup required, and no watermarks on your output. Every feature — page selection, drag-and-drop reordering, page numbering, and password protection — is included at no cost.',
  },
  {
    question: 'Can I join PDF files on my phone?',
    answer:
      'Yes. DOSIBridge works in any mobile browser. Open the site, upload your PDFs from your phone storage or cloud apps, arrange the pages, and download the joined PDF. No app installation needed.',
  },
  {
    question: 'How many PDF files can I join at once?',
    answer:
      'You can upload and join up to 20 PDF files in a single session, with each file up to 50 MB. This is enough for most document joining tasks.',
  },
];

function PdfJoinerPage() {
  return (
    <>
      <SEOHead
        title="PDF Joiner — Join PDF Files Online Free | DOSIBridge"
        description="Join multiple PDF files into one document online. Free PDF joiner with page selection and drag-and-drop reorder. No signup, no watermark, works on all devices."
        path="/pdf-joiner"
        faqItems={faqItems}
      />

      <section className="bg-gradient-to-b from-primary-50 to-white py-8 sm:py-10 md:py-12">
        <div className="max-w-4xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            PDF Joiner — Join PDF Files Online
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Join two or more PDF files into a single document. Select pages, reorder them with drag-and-drop, and download your joined PDF. Free and instant.
          </p>
        </div>
      </section>

      <PdfTool />

      <section className="max-w-4xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-8 sm:py-10 md:py-12">
        <article className="prose prose-gray max-w-none">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
            The Best Free PDF Joiner Online
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            DOSIBridge PDF Joiner does exactly what you need: takes multiple PDF files and joins them into one
            document. No complexity, no subscription, no tricks. Upload your files, pick the pages you want,
            arrange them in order, and click join.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Most people searching for "PDF joiner" want a tool that works immediately without creating an account
            or installing software. That is exactly what DOSIBridge delivers. The tool runs in your browser — on
            desktop, laptop, tablet, or phone — and produces clean, unbranded output every time.
          </p>

          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mt-8 mb-4">
            How to Join PDF Files
          </h2>
          <ol className="list-decimal list-inside text-gray-700 leading-relaxed mb-6 space-y-2">
            <li><strong>Upload your PDFs</strong> — Drag files onto the upload area or tap to browse. Upload up to 20 files at once.</li>
            <li><strong>Select pages</strong> — Click each file to preview pages. Select all or pick specific pages to include.</li>
            <li><strong>Arrange order</strong> — Drag and drop pages into the sequence you want in the final document.</li>
            <li><strong>Join</strong> — Click the Merge button. Your joined PDF is ready to download in seconds.</li>
          </ol>

          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mt-8 mb-4">
            PDF Joiner vs PDF Merger — What Is the Difference?
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            There is no difference. "PDF joiner," "PDF merger," "PDF combiner," and "combine PDF" all describe
            the same operation: taking multiple PDF files and producing one single PDF document. Different tools
            use different terminology, but the result is identical.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            DOSIBridge handles all of these terms because it does all of these things. Whether you want to join
            two PDFs, merge ten files, or combine a stack of scanned documents, the process is the same: upload,
            select, reorder, download.
          </p>

          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mt-8 mb-4">
            Why People Choose DOSIBridge as Their PDF Joiner
          </h2>
          <ul className="list-disc list-inside text-gray-700 leading-relaxed mb-4 space-y-2">
            <li><strong>No signup wall</strong> — Many PDF joiners force you to create an account before downloading. DOSIBridge does not.</li>
            <li><strong>No watermark</strong> — Free-tier PDF joiners often brand your output. DOSIBridge <Link to="/merge-pdf-no-watermark" className="text-primary-600 hover:text-primary-700 underline">never adds watermarks</Link>.</li>
            <li><strong>Page-level control</strong> — Most joiners just stack files. DOSIBridge lets you pick individual pages and reorder them.</li>
            <li><strong>Works on mobile</strong> — Full functionality on <Link to="/merge-pdf-on-mobile" className="text-primary-600 hover:text-primary-700 underline">iPhone, Android, and tablet</Link>.</li>
            <li><strong>Privacy-first</strong> — Files are auto-deleted after your session. Nothing is stored.</li>
            <li><strong>No daily limits</strong> — Join as many PDFs as you need, <Link to="/merge-pdf-online-free" className="text-primary-600 hover:text-primary-700 underline">completely free</Link>.</li>
          </ul>

          <div className="mt-8 p-4 bg-primary-50 rounded-lg border border-primary-100">
            <p className="text-gray-700 text-sm">
              Looking for something specific?{' '}
              <Link to="/merge-pdf" className="text-primary-600 hover:text-primary-700 underline">Merge PDF</Link> |{' '}
              <Link to="/combine-pdf-files" className="text-primary-600 hover:text-primary-700 underline">Combine PDF files</Link> |{' '}
              <Link to="/merge-pdf-for-job-application" className="text-primary-600 hover:text-primary-700 underline">Job application PDF</Link>
            </p>
          </div>
        </article>

        <FAQSection items={faqItems} />
      </section>
    </>
  );
}

export default PdfJoinerPage;
