import React from 'react';
import { Link } from 'react-router-dom';
import PdfTool from '../components/PdfTool';
import FAQSection from '../components/FAQSection';
import SEOHead from '../components/SEOHead';

const faqItems = [
  {
    question: 'Does DOSIBridge add any watermark to merged PDFs?',
    answer:
      'No. DOSIBridge never adds watermarks, logos, branding, or any modification to your merged PDF. The output file contains exactly the pages you selected, in the order you arranged them — nothing more, nothing less.',
  },
  {
    question: 'Why do other PDF tools add watermarks?',
    answer:
      'Most online PDF tools use a freemium business model. They offer basic functionality for free but degrade the output with watermarks to push you toward a paid subscription. DOSIBridge is open-source and does not use this model.',
  },
  {
    question: 'Can I use watermark-free merged PDFs for professional work?',
    answer:
      'Absolutely. PDFs merged with DOSIBridge are clean and professional — suitable for client deliverables, job applications, legal filings, academic submissions, and any context where a branded watermark would be unacceptable.',
  },
  {
    question: 'Is there a paid tier that removes watermarks?',
    answer:
      'No, because there are no watermarks to remove. DOSIBridge is free at every level. There is no paid tier, no premium plan, and no feature that requires payment to unlock.',
  },
];

function MergePdfNoWatermarkPage() {
  return (
    <>
      <SEOHead
        title="Merge PDF Without Watermark — Free, Clean Output | DOSIBridge"
        description="Merge PDF files online without any watermarks added to your output. DOSIBridge produces clean, professional PDFs with no branding, no signup, and no cost."
        path="/merge-pdf-no-watermark"
        faqItems={faqItems}
      />

      <section className="bg-gradient-to-b from-primary-50 to-white py-8 sm:py-10 md:py-12">
        <div className="max-w-4xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Merge PDF Without Watermark
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Get clean, professional PDF output with zero watermarks or branding. Upload, merge, and download — your document stays yours.
          </p>
        </div>
      </section>

      <PdfTool />

      <section className="max-w-4xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-8 sm:py-10 md:py-12">
        <article className="prose prose-gray max-w-none">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
            Why Watermark-Free Matters
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            You have spent time creating, formatting, and reviewing your PDF documents. The last thing you need
            is a third-party tool stamping its logo across every page of your merged output. Yet this is exactly
            what most "free" PDF merging tools do — they use your documents as advertising space.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            A watermark on a merged PDF is not just ugly. It is unprofessional. Imagine sending a client proposal
            with "Merged with [Product Name]" stamped on every page. Or submitting a job application where your
            carefully formatted CV has a diagonal watermark running through it. That is not the impression you
            want to make.
          </p>

          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mt-8 mb-4">
            DOSIBridge: Zero Watermarks, Always
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            DOSIBridge PDF Joiner produces completely clean output. No watermarks, no logos, no "powered by"
            text, no branding of any kind. The merged PDF contains exactly the pages you selected, in the order
            you arranged them, with no additions or modifications.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            This is not a premium feature. It is not gated behind a paid plan. Every merge you do with
            DOSIBridge produces watermark-free output, whether it is your first merge or your thousandth.
          </p>

          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mt-8 mb-4">
            When Clean Output Is Essential
          </h2>
          <ul className="list-disc list-inside text-gray-700 leading-relaxed mb-4 space-y-2">
            <li><strong>Client-facing documents</strong> — Proposals, reports, and presentations must look professional. A third-party watermark undermines your credibility.</li>
            <li><strong>Job applications</strong> — Your <Link to="/merge-pdf-for-job-application" className="text-primary-600 hover:text-primary-700 underline">CV and cover letter</Link> should represent you, not a PDF tool.</li>
            <li><strong>Legal documents</strong> — Courts, regulatory bodies, and law firms expect clean, unmodified document submissions.</li>
            <li><strong>Academic work</strong> — Thesis submissions and research papers must be free of extraneous branding.</li>
            <li><strong>Government forms</strong> — Official applications and filings should contain only the required information.</li>
          </ul>

          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mt-8 mb-4">
            Your Own Watermarks (Optional)
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            While DOSIBridge never adds its own watermark, it does offer an optional watermarking feature that
            lets you add your own custom text to the merged PDF. This is useful for marking documents as "DRAFT,"
            "CONFIDENTIAL," or adding your organization's name. You control whether a watermark appears and what
            it says — DOSIBridge never makes that decision for you.
          </p>

          <div className="mt-8 p-4 bg-primary-50 rounded-lg border border-primary-100">
            <p className="text-gray-700 text-sm">
              Want all features free?{' '}
              <Link to="/merge-pdf-online-free" className="text-primary-600 hover:text-primary-700 underline">Merge PDF online free</Link> — no limits, no signup.{' '}
              On mobile? <Link to="/merge-pdf-on-mobile" className="text-primary-600 hover:text-primary-700 underline">Merge PDFs on your phone</Link>.
            </p>
          </div>
        </article>

        <FAQSection items={faqItems} />
      </section>
    </>
  );
}

export default MergePdfNoWatermarkPage;
