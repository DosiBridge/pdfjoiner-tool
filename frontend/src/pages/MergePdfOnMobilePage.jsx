import React from 'react';
import { Link } from 'react-router-dom';
import PdfTool from '../components/PdfTool';
import FAQSection from '../components/FAQSection';
import SEOHead from '../components/SEOHead';

const faqItems = [
  {
    question: 'Can I merge PDFs on my iPhone or Android phone?',
    answer:
      'Yes. DOSIBridge PDF Joiner works in any modern mobile browser — Safari on iPhone, Chrome on Android, and others. There is no app to download. Just open the website, upload your PDFs from your phone\'s file storage or cloud apps, and merge them.',
  },
  {
    question: 'How do I upload PDFs from my phone?',
    answer:
      'Tap the upload area and your phone\'s file picker will open. You can select PDF files from your device storage, iCloud, Google Drive, Dropbox, or any other file app installed on your phone. Select your files and they will upload automatically.',
  },
  {
    question: 'Does the drag-and-drop reorder work on touchscreens?',
    answer:
      'Yes. The page reorderer is built with touch support. Long-press a page tile and drag it to a new position. The interface is responsive and designed to work well on smaller screens.',
  },
  {
    question: 'Is there a mobile app for DOSIBridge PDF Joiner?',
    answer:
      'No dedicated app is needed. DOSIBridge works as a Progressive Web App (PWA), meaning you can add it to your home screen directly from your browser for instant access. It functions just like a native app without taking up storage space.',
  },
];

function MergePdfOnMobilePage() {
  return (
    <>
      <SEOHead
        title="Merge PDF on Mobile — iPhone & Android PDF Merger | DOSIBridge"
        description="Merge PDF files directly on your phone. Works on iPhone, Android, and tablets. No app download needed — just open your browser, upload PDFs, and merge. Free."
        path="/merge-pdf-on-mobile"
        faqItems={faqItems}
      />

      <section className="bg-gradient-to-b from-primary-50 to-white py-8 sm:py-10 md:py-12">
        <div className="max-w-4xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Merge PDF on Mobile
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Merge PDF files directly on your iPhone, Android phone, or tablet. No app to install — just open your browser and go.
          </p>
        </div>
      </section>

      <PdfTool />

      <section className="max-w-4xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-8 sm:py-10 md:py-12">
        <article className="prose prose-gray max-w-none">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
            Why Merge PDFs on Your Phone?
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            You are not always at your desk. Sometimes you need to combine documents while commuting, between
            meetings, or on a job site. Maybe someone emailed you two PDFs that need to be one file before you
            can forward them. Maybe you need to merge a scanned receipt with an expense form from your phone's
            camera.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            DOSIBridge PDF Joiner is built to work on mobile from the ground up. The interface adapts to your
            screen size, the upload process works with your phone's file picker, and the drag-and-drop page
            reorder works with touch gestures. No app download, no account creation — just open the browser
            and merge.
          </p>

          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mt-8 mb-4">
            How to Merge PDFs on Your Phone
          </h2>
          <ol className="list-decimal list-inside text-gray-700 leading-relaxed mb-6 space-y-2">
            <li><strong>Open DOSIBridge</strong> in your phone's browser (Safari, Chrome, Firefox, or any other modern browser).</li>
            <li><strong>Tap the upload area</strong> to open your file picker. Select PDF files from your device, iCloud, Google Drive, or Dropbox.</li>
            <li><strong>Select pages</strong> — Tap on each uploaded file to see page thumbnails. Choose the pages you want to include.</li>
            <li><strong>Reorder if needed</strong> — Long-press and drag page tiles to rearrange them.</li>
            <li><strong>Tap Merge</strong> and download your combined PDF. It saves to your Downloads folder or wherever your browser stores files.</li>
          </ol>

          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mt-8 mb-4">
            Mobile PDF Merging vs. PDF Apps
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            There are dozens of PDF apps on the App Store and Google Play, but most of them have significant
            drawbacks:
          </p>
          <ul className="list-disc list-inside text-gray-700 leading-relaxed mb-4 space-y-2">
            <li><strong>Storage space</strong> — PDF apps take up 50–200 MB on your phone. DOSIBridge runs in your browser and uses zero storage.</li>
            <li><strong>Subscriptions</strong> — Most PDF apps charge $5–15/month for merge functionality. DOSIBridge is free.</li>
            <li><strong>Permissions</strong> — PDF apps often request access to all your files, contacts, and camera. DOSIBridge only accesses the files you explicitly select.</li>
            <li><strong>Watermarks</strong> — Free-tier PDF apps almost always watermark your output. DOSIBridge never adds watermarks.</li>
            <li><strong>Updates</strong> — Apps need regular updates and can break after OS upgrades. DOSIBridge is a website — always up to date.</li>
          </ul>

          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mt-8 mb-4">
            Supported Mobile Devices
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            DOSIBridge works on any mobile device with a modern web browser:
          </p>
          <ul className="list-disc list-inside text-gray-700 leading-relaxed mb-4 space-y-2">
            <li><strong>iPhone</strong> — Safari, Chrome, Firefox</li>
            <li><strong>Android phones</strong> — Chrome, Firefox, Samsung Internet, Brave</li>
            <li><strong>iPad and Android tablets</strong> — All major browsers</li>
            <li><strong>Chromebooks</strong> — Chrome browser (full desktop experience on touchscreen)</li>
          </ul>

          <div className="mt-8 p-4 bg-primary-50 rounded-lg border border-primary-100">
            <p className="text-gray-700 text-sm">
              Merging documents for a job? See our guide to{' '}
              <Link to="/merge-pdf-for-job-application" className="text-primary-600 hover:text-primary-700 underline">merging PDFs for job applications</Link> or{' '}
              <Link to="/combine-cv-and-certificates-pdf" className="text-primary-600 hover:text-primary-700 underline">combining CV and certificates</Link>.
            </p>
          </div>
        </article>

        <FAQSection items={faqItems} />
      </section>
    </>
  );
}

export default MergePdfOnMobilePage;
