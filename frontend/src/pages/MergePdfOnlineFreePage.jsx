import React from 'react';
import { Link } from 'react-router-dom';
import PdfTool from '../components/PdfTool';
import FAQSection from '../components/FAQSection';
import SEOHead from '../components/SEOHead';

const faqItems = [
  {
    question: 'Is this PDF merger really free with no hidden costs?',
    answer:
      'Yes. DOSIBridge PDF Joiner is completely free. There is no freemium model, no trial period, no daily usage cap, and no credit card required. Every feature — page selection, reordering, page numbering, watermarking, and password protection — is available at no cost.',
  },
  {
    question: 'How does DOSIBridge offer a free PDF merger?',
    answer:
      'DOSIBridge is an open-source project built to make essential document tools accessible to everyone. It is not funded by advertising, data collection, or premium upsells. The tool is free because we believe it should be.',
  },
  {
    question: 'Are there any daily limits on free merges?',
    answer:
      'No. You can merge as many PDFs as you need, as many times as you need, every day. There are no daily limits, no cooldown periods, and no throttling. The only per-session limits are 20 files and 50 MB per file.',
  },
  {
    question: 'Do I need to create an account to merge PDFs for free?',
    answer:
      'No. DOSIBridge requires no signup, no email address, and no login. Open the page and start merging immediately. Your session is anonymous and temporary.',
  },
];

function MergePdfOnlineFreePage() {
  return (
    <>
      <SEOHead
        title="Merge PDF Online Free — No Limits, No Signup | DOSIBridge"
        description="Merge PDF files online for free with no daily limits, no account required, and no watermarks. Upload, reorder, and download your merged PDF instantly."
        path="/merge-pdf-online-free"
        keywords="merge PDF online free, free PDF merger, merge PDF free no limit, merge PDF without signup, free online PDF merge tool"
      />

      <section className="bg-gradient-to-b from-primary-50 to-white py-8 sm:py-10 md:py-12">
        <div className="max-w-4xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Merge PDF Online Free — No Limits
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            A genuinely free PDF merger. No daily caps, no signup wall, no watermarks on your output. Upload your files and merge them right now.
          </p>
        </div>
      </section>

      <PdfTool />

      <section className="max-w-4xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-8 sm:py-10 md:py-12">
        <article className="prose prose-gray max-w-none">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
            What "Free" Actually Means Here
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Most online PDF tools use the word "free" loosely. You visit the site, upload your files, and then
            discover you can only merge 2 files per day, or that the output will have a watermark, or that you
            need to create an account to download the result. That is not free — it is a sales funnel.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            DOSIBridge PDF Joiner is different. When we say free, we mean:
          </p>
          <ul className="list-disc list-inside text-gray-700 leading-relaxed mb-4 space-y-2">
            <li><strong>No daily limits</strong> — Merge as many PDFs as you want, as often as you want.</li>
            <li><strong>No signup required</strong> — No email, no password, no account creation of any kind.</li>
            <li><strong>No watermarks</strong> — Your merged PDF is clean, professional, and unbranded.</li>
            <li><strong>No feature gating</strong> — Page selection, reordering, page numbers, watermarks, and password protection are all available for free.</li>
            <li><strong>No ads</strong> — No pop-ups, no banners, no sponsored content cluttering the interface.</li>
          </ul>

          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mt-8 mb-4">
            Free PDF Merger Comparison
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Here is how DOSIBridge compares to other "free" PDF merging tools:
          </p>
          <div className="overflow-x-auto mb-6">
            <table className="min-w-full text-sm text-gray-700 border border-gray-200 rounded-lg">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-3 text-left font-semibold border-b">Feature</th>
                  <th className="px-4 py-3 text-left font-semibold border-b">DOSIBridge</th>
                  <th className="px-4 py-3 text-left font-semibold border-b">Most Others</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b"><td className="px-4 py-2">Daily merge limit</td><td className="px-4 py-2">Unlimited</td><td className="px-4 py-2">2–5 per day</td></tr>
                <tr className="border-b"><td className="px-4 py-2">Account required</td><td className="px-4 py-2">No</td><td className="px-4 py-2">Usually yes</td></tr>
                <tr className="border-b"><td className="px-4 py-2">Watermark on output</td><td className="px-4 py-2">Never</td><td className="px-4 py-2">Free tier: yes</td></tr>
                <tr className="border-b"><td className="px-4 py-2">Page reordering</td><td className="px-4 py-2">Yes, drag-and-drop</td><td className="px-4 py-2">Premium only</td></tr>
                <tr className="border-b"><td className="px-4 py-2">Password protection</td><td className="px-4 py-2">Included free</td><td className="px-4 py-2">Premium only</td></tr>
                <tr><td className="px-4 py-2">File retention</td><td className="px-4 py-2">Auto-deleted</td><td className="px-4 py-2">Stored 1–24 hours</td></tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mt-8 mb-4">
            Who Benefits Most from a Free PDF Merger
          </h2>
          <ul className="list-disc list-inside text-gray-700 leading-relaxed mb-4 space-y-2">
            <li><strong>Students</strong> — Merge assignments, notes, and references without paying for software you will only use occasionally.</li>
            <li><strong>Freelancers</strong> — Package client deliverables professionally without adding tool subscriptions to your overhead.</li>
            <li><strong>Small businesses</strong> — Combine invoices, contracts, and reports without buying enterprise document software.</li>
            <li><strong>Job seekers</strong> — Merge your <Link to="/merge-pdf-for-job-application" className="text-primary-600 hover:text-primary-700 underline">CV and certificates</Link> into one clean application file.</li>
            <li><strong>Anyone in a hurry</strong> — Skip signup forms and software installation. Open the page, upload, merge, done.</li>
          </ul>

          <div className="mt-8 p-4 bg-primary-50 rounded-lg border border-primary-100">
            <p className="text-gray-700 text-sm">
              Need a clean output with no branding?{' '}
              <Link to="/merge-pdf-no-watermark" className="text-primary-600 hover:text-primary-700 underline">Merge PDF with no watermark</Link>.{' '}
              On your phone? Try our <Link to="/merge-pdf-on-mobile" className="text-primary-600 hover:text-primary-700 underline">mobile PDF merger</Link>.
            </p>
          </div>
        </article>

        <FAQSection items={faqItems} />
      </section>
    </>
  );
}

export default MergePdfOnlineFreePage;
