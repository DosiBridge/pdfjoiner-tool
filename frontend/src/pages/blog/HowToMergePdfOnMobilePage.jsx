import React from 'react';
import { Link } from 'react-router-dom';
import PdfTool from '../../components/PdfTool';
import FAQSection from '../../components/FAQSection';
import SEOHead from '../../components/SEOHead';

const faqItems = [
  {
    question: 'What is the best app to merge PDFs on mobile?',
    answer:
      'You do not need an app. DOSIBridge works directly in your phone browser (Safari, Chrome, Firefox) with full merge functionality. No download, no storage used, no subscription. If you prefer an app, Adobe Scan and Smallpdf have mobile apps, but they require subscriptions for merge features.',
  },
  {
    question: 'Can I merge PDFs from Google Drive or iCloud on my phone?',
    answer:
      'Yes. When you tap the upload area on DOSIBridge, your phone\'s file picker opens. You can select PDFs from Google Drive, iCloud, Dropbox, OneDrive, or any other cloud storage app connected to your phone.',
  },
  {
    question: 'Does drag-and-drop work on touchscreens?',
    answer:
      'Yes. Long-press a page tile in the reorder panel and drag it to a new position. The interface is designed for touch input and works on all modern touchscreen devices.',
  },
];

function HowToMergePdfOnMobilePage() {
  return (
    <>
      <SEOHead
        title="How to Merge PDF on Mobile — iPhone & Android Guide | DOSIBridge"
        description="Step-by-step guide to merging PDF files on your iPhone or Android phone. No app needed — use your browser to combine PDFs in under a minute."
        path="/blog/how-to-merge-pdf-on-mobile"
      />

      <section className="bg-gradient-to-b from-primary-50 to-white py-8 sm:py-10 md:py-12">
        <div className="max-w-4xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            How to Merge PDF on Mobile
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Combine PDF files on your iPhone or Android — no app download, no account. Step-by-step guide with screenshots-equivalent instructions.
          </p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-8 sm:py-10 md:py-12">
        <article className="prose prose-gray max-w-none">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
            Merge PDFs on iPhone (Safari or Chrome)
          </h2>
          <ol className="list-decimal list-inside text-gray-700 leading-relaxed mb-6 space-y-3">
            <li><strong>Open Safari or Chrome</strong> and go to <Link to="/merge-pdf-on-mobile" className="text-primary-600 hover:text-primary-700 underline">DOSIBridge PDF Merger</Link>.</li>
            <li><strong>Tap the upload area</strong> — the iOS file picker will open.</li>
            <li><strong>Select your PDF files</strong> — browse your iPhone storage, iCloud Drive, or connected cloud apps (Google Drive, Dropbox). Tap to select each file you want to merge.</li>
            <li><strong>Select pages</strong> — Tap on each uploaded file to see page thumbnails. Tap pages to select them (a blue checkmark appears).</li>
            <li><strong>Reorder if needed</strong> — Long-press a page tile and drag it to a new position.</li>
            <li><strong>Tap Merge</strong> — Your combined PDF is generated.</li>
            <li><strong>Download</strong> — Tap the download button. The file saves to your Downloads folder or Files app.</li>
          </ol>

          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mt-8 mb-4">
            Merge PDFs on Android (Chrome)
          </h2>
          <ol className="list-decimal list-inside text-gray-700 leading-relaxed mb-6 space-y-3">
            <li><strong>Open Chrome</strong> and go to <Link to="/merge-pdf-on-mobile" className="text-primary-600 hover:text-primary-700 underline">DOSIBridge PDF Merger</Link>.</li>
            <li><strong>Tap the upload area</strong> — Android's file manager opens.</li>
            <li><strong>Select your PDF files</strong> — browse your device storage, Google Drive, or other cloud apps. On newer Android versions you can select multiple files at once.</li>
            <li><strong>Select pages</strong> — Tap each uploaded file to preview its pages. Select the pages you want to include.</li>
            <li><strong>Reorder</strong> — Long-press and drag pages to rearrange them.</li>
            <li><strong>Tap Merge</strong> — The merged PDF is created.</li>
            <li><strong>Download</strong> — The file saves to your Downloads folder. Find it in your Files app or notification tray.</li>
          </ol>

          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mt-8 mb-4">
            Why Use a Browser Tool Instead of an App?
          </h2>
          <ul className="list-disc list-inside text-gray-700 leading-relaxed mb-4 space-y-2">
            <li><strong>Zero storage used</strong> — PDF apps take 50-200 MB. DOSIBridge runs in your browser.</li>
            <li><strong>No subscription</strong> — Most PDF apps charge $5-15/month for merge. DOSIBridge is free.</li>
            <li><strong>No permissions</strong> — Apps request access to all files, contacts, camera. DOSIBridge only accesses files you explicitly select.</li>
            <li><strong>Always updated</strong> — No need to update an app. The website is always the latest version.</li>
            <li><strong>Works on any phone</strong> — iPhone, Android, older phones — if it has a browser, it works.</li>
          </ul>

          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mt-8 mb-4">
            Tips for Mobile PDF Merging
          </h2>
          <ul className="list-disc list-inside text-gray-700 leading-relaxed mb-4 space-y-2">
            <li><strong>Use Wi-Fi for large files</strong> — Uploading over cellular data works but Wi-Fi is faster for files over 10 MB.</li>
            <li><strong>Landscape mode</strong> — On tablets, rotating to landscape gives you more room for the page reorder panel.</li>
            <li><strong>Cloud files</strong> — You can select PDFs directly from Google Drive, iCloud, or Dropbox through your phone's file picker.</li>
            <li><strong>Add to home screen</strong> — DOSIBridge works as a Progressive Web App. Add it to your home screen for instant access.</li>
          </ul>

          <div className="mt-8 p-4 bg-primary-50 rounded-lg border border-primary-100">
            <p className="text-gray-700 text-sm">
              Ready to merge? <Link to="/merge-pdf-on-mobile" className="text-primary-600 hover:text-primary-700 underline">Open the mobile PDF merger</Link> or scroll down to use the tool right here.
            </p>
          </div>
        </article>
      </section>

      <section className="bg-gray-100 py-8 sm:py-10">
        <div className="max-w-4xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 text-center mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Merge PDFs Right Here</h2>
        </div>
        <PdfTool />
      </section>

      <section className="max-w-4xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-8">
        <FAQSection items={faqItems} />
      </section>
    </>
  );
}

export default HowToMergePdfOnMobilePage;
