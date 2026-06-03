import { FileCheck, Lock, Monitor, Shield, Smartphone, Upload, ArrowDown, Layers, MousePointerClick, Settings, Download } from 'lucide-react';
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

const steps = [
  { icon: Upload, title: 'Upload PDFs', desc: 'Drag & drop or browse. Up to 20 files, 50 MB each.' },
  { icon: MousePointerClick, title: 'Select Pages', desc: 'Click to preview. Pick all pages or just the ones you need.' },
  { icon: Layers, title: 'Reorder', desc: 'Drag pages into any order across all your files.' },
  { icon: Settings, title: 'Set Options', desc: 'Name your file, add page numbers, watermark, or password.' },
  { icon: Download, title: 'Download', desc: 'Click merge. Your combined PDF is ready in seconds.' },
];

const features = [
  { icon: FileCheck, title: 'No Signup Required', desc: 'Open the page and start merging. No email, no password, no account.' },
  { icon: Shield, title: 'No Watermark, Ever', desc: 'Your merged PDF is clean and professional. Zero branding added.' },
  { icon: Lock, title: 'Privacy by Design', desc: 'Files encrypted in transit, auto-deleted after session. Nothing stored.' },
  { icon: Monitor, title: 'Works on Every Device', desc: 'Desktop, laptop, tablet, phone. Any browser, any OS.' },
  { icon: Smartphone, title: 'Mobile Optimized', desc: 'Full touch support with drag-and-drop on phones and tablets.' },
  { icon: Layers, title: 'Page-Level Control', desc: 'Select individual pages from each PDF and arrange them freely.' },
];

const useCases = [
  { title: 'Job Applications', desc: 'CV + cover letter + certificates', link: '/merge-pdf-for-job-application' },
  { title: 'Business Reports', desc: 'Cover pages, charts, and appendices', link: '/merge-pdf' },
  { title: 'Academic Papers', desc: 'Research, references, supplements', link: '/merge-university-documents-pdf' },
  { title: 'Scanned Documents', desc: 'Receipts, contracts, forms', link: '/merge-scanned-documents-pdf' },
  { title: 'CV + Certificates', desc: 'Diplomas and credentials in one file', link: '/combine-cv-and-certificates-pdf' },
  { title: 'Mobile Merging', desc: 'Merge on iPhone or Android', link: '/merge-pdf-on-mobile' },
];

function HomePage() {
  return (
    <>
      <SEOHead
        title="Merge PDF Online Free — No Signup, No Watermark, Unlimited | DOSIBridge"
        description="Merge PDFs online for free. Reorder pages, combine CVs, certificates, scanned files, and documents. No signup, no watermark, unlimited, works on mobile."
        path="/"
        keywords="PDF joiner, merge PDF, combine PDF files, PDF merger online, free PDF tool, join PDF, merge PDF pages, reorder PDF, merge PDF no watermark"
        faqItems={faqItems}
      />

      {/* ── Hero ── */}
      <section className="bg-gradient-to-b from-primary-50 via-primary-50/50 to-white pt-10 pb-6 sm:pt-14 sm:pb-8 md:pt-20 md:pb-10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight tracking-tight">
            Merge PDF Files Online for Free
          </h1>
          <p className="mt-4 sm:mt-5 text-base sm:text-lg text-gray-600 leading-relaxed max-w-xl mx-auto">
            Combine multiple PDFs into one clean document. Drag-and-drop reorder, page selection — no signup, no watermark.
          </p>

          {/* Trust badges */}
          <div className="mt-6 sm:mt-8 flex flex-wrap justify-center gap-2 sm:gap-3">
            {['100% Free', 'No Signup', 'No Watermark', 'Mobile Ready'].map((badge) => (
              <span key={badge} className="inline-flex items-center gap-1.5 bg-white text-gray-700 text-xs sm:text-sm font-medium px-3 py-1.5 rounded-full border border-gray-200 shadow-sm">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full flex-shrink-0" />
                {badge}
              </span>
            ))}
          </div>

          {/* Scroll hint */}
          <div className="mt-8 sm:mt-10 flex justify-center">
            <ArrowDown className="w-5 h-5 text-gray-400 animate-bounce" />
          </div>
        </div>
      </section>

      {/* ── Tool ── */}
      <section className="relative -mt-2">
        <PdfTool />
      </section>

      {/* ── How It Works ── */}
      <section className="bg-white py-12 sm:py-16 md:py-20 border-t border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-3">
            How to Merge PDF Files
          </h2>
          <p className="text-sm sm:text-base text-gray-500 text-center mb-10 sm:mb-12 max-w-lg mx-auto">
            Five steps, under 30 seconds. No software to install.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 sm:gap-6">
            {steps.map((step, i) => (
              <div key={i} className="text-center group">
                <div className="mx-auto w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-primary-50 group-hover:bg-primary-100 flex items-center justify-center transition-colors mb-3">
                  <step.icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary-600" />
                </div>
                <span className="block text-xs font-bold text-primary-600 mb-1">Step {i + 1}</span>
                <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-1">{step.title}</h3>
                <p className="text-xs sm:text-sm text-gray-500 leading-snug">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why DOSIBridge ── */}
      <section className="bg-gray-50 py-12 sm:py-16 md:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-3">
            Why Use DOSIBridge PDF Joiner?
          </h2>
          <p className="text-sm sm:text-base text-gray-500 text-center mb-10 sm:mb-12 max-w-lg mx-auto">
            Built for speed, privacy, and simplicity. No tricks, no upsells.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {features.map((feat, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-200 p-5 sm:p-6 hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center mb-4">
                  <feat.icon className="w-5 h-5 text-primary-600" />
                </div>
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1.5">{feat.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Use Cases ── */}
      <section className="bg-white py-12 sm:py-16 md:py-20 border-t border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-3">
            Common Uses for PDF Merging
          </h2>
          <p className="text-sm sm:text-base text-gray-500 text-center mb-10 sm:mb-12 max-w-lg mx-auto">
            Thousands of people use DOSIBridge every day for these scenarios.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
            {useCases.map((uc, i) => (
              <Link
                key={i}
                to={uc.link}
                className="block rounded-xl border border-gray-200 p-4 sm:p-5 hover:border-primary-300 hover:shadow-sm transition-all group"
              >
                <h3 className="text-sm sm:text-base font-semibold text-gray-900 group-hover:text-primary-700 transition-colors mb-1">
                  {uc.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-500">{uc.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Advanced Features ── */}
      <section className="bg-gray-50 py-12 sm:py-16 border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-10 sm:mb-12">
            Advanced Features
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            {[
              { title: 'Page Numbering', desc: 'Automatically add page numbers to your merged document for easy navigation.' },
              { title: 'Custom Watermarks', desc: 'Add your own text watermark — useful for drafts, confidential, or branding.' },
              { title: 'Password Protection', desc: 'Secure your merged PDF with a password so only authorized recipients can open it.' },
              { title: 'Custom File Naming', desc: 'Set a meaningful filename like "Report_Q4_2026.pdf" instead of generic "merged.pdf."' },
            ].map((feat, i) => (
              <div key={i} className="flex gap-3 sm:gap-4 bg-white rounded-xl border border-gray-200 p-4 sm:p-5">
                <div className="w-8 h-8 rounded-lg bg-primary-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-primary-600 font-bold text-sm">{i + 1}</span>
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-1">{feat.title}</h3>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">{feat.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Related Tools ── */}
      <section className="bg-white py-12 sm:py-16 border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-3">
            Related PDF Tools
          </h2>
          <p className="text-sm sm:text-base text-gray-500 text-center mb-8 sm:mb-10 max-w-lg mx-auto">
            DOSIBridge PDF Joiner is part of the{' '}
            <a href="https://dosibridge.com/projects" className="text-primary-600 hover:text-primary-700 underline">
              DOSIBridge project suite
            </a>.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
            {[
              { label: 'Merge PDF', to: '/merge-pdf', desc: 'Quick PDF merge tool' },
              { label: 'Combine PDF Files', to: '/combine-pdf-files', desc: 'Join documents together' },
              { label: 'Merge on Mobile', to: '/merge-pdf-on-mobile', desc: 'Optimized for phones' },
              { label: 'Job Application PDF', to: '/merge-pdf-for-job-application', desc: 'CV + cover letter' },
              { label: 'DOSIBridge Converter', to: 'https://converter.dosibridge.com', desc: 'File conversion tools', external: true },
              { label: 'SD Tools', to: 'https://sd.dosibridge.com', desc: 'More DOSIBridge tools', external: true },
            ].map((tool, i) => (
              tool.external ? (
                <a key={i} href={tool.to} className="block rounded-xl border border-gray-200 p-4 hover:border-primary-300 hover:shadow-sm transition-all">
                  <p className="text-sm font-semibold text-gray-900 mb-0.5">{tool.label}</p>
                  <p className="text-xs text-gray-500">{tool.desc}</p>
                </a>
              ) : (
                <Link key={i} to={tool.to} className="block rounded-xl border border-gray-200 p-4 hover:border-primary-300 hover:shadow-sm transition-all">
                  <p className="text-sm font-semibold text-gray-900 mb-0.5">{tool.label}</p>
                  <p className="text-xs text-gray-500">{tool.desc}</p>
                </Link>
              )
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="bg-gray-50 py-12 sm:py-16 md:py-20 border-t border-gray-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <FAQSection items={faqItems} />
        </div>
      </section>
    </>
  );
}

export default HomePage;
