import React from 'react';
import { Link } from 'react-router-dom';
import PdfTool from '../../components/PdfTool';
import FAQSection from '../../components/FAQSection';
import SEOHead from '../../components/SEOHead';

const faqItems = [
  {
    question: 'What is the best order for CV and certificates?',
    answer:
      'Place your CV first, then certificates ordered by relevance to the position. Most relevant or most recent certificates go right after the CV. Academic transcripts and older credentials go at the end.',
  },
  {
    question: 'Should I include all my certificates?',
    answer:
      'No. Only include certificates relevant to the position you are applying for. Ten certificates for a junior role looks unfocused. Choose 3-5 that directly support your application and show you are qualified.',
  },
  {
    question: 'Can I include scanned paper certificates?',
    answer:
      'Yes. Scan them to PDF using your phone camera (Google Drive, Apple Notes, or Adobe Scan), then upload the scanned PDFs to DOSIBridge. Make sure scans are clear and legible before merging.',
  },
];

function HowToCombineCvCertificatesPage() {
  return (
    <>
      <SEOHead
        title="How to Combine CV and Certificates into One PDF — Guide | DOSIBridge"
        description="Step-by-step guide to merging your CV, certificates, and diplomas into one professional PDF for job applications. Includes recommended order and formatting tips."
        path="/blog/how-to-combine-cv-certificates-into-one-pdf"
        keywords="how to combine CV and certificates PDF, merge CV certificates, how to merge resume and certificates, combine diploma CV PDF, CV certificate one PDF"
      />

      <section className="bg-gradient-to-b from-primary-50 to-white py-8 sm:py-10 md:py-12">
        <div className="max-w-4xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            How to Combine CV and Certificates into One PDF
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            A step-by-step guide to creating a single, polished application PDF with your CV, professional certificates, and academic credentials.
          </p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-8 sm:py-10 md:py-12">
        <article className="prose prose-gray max-w-none">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
            Why Combine Your CV and Certificates?
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            When an employer asks for your CV and certificates, sending five separate attachments is messy and
            unprofessional. A single merged PDF is cleaner to review, less likely to get lost in an inbox, and
            shows attention to detail. Most HR portals also have a single upload field — one file is the only option.
          </p>

          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mt-8 mb-4">
            Step-by-Step: Merge CV and Certificates
          </h2>
          <ol className="list-decimal list-inside text-gray-700 leading-relaxed mb-6 space-y-3">
            <li>
              <strong>Prepare your files</strong> — Make sure your CV is saved as a PDF. If your certificates are paper documents, scan them to PDF using your phone (Google Drive scanner, Apple Notes, or Adobe Scan).
            </li>
            <li>
              <strong>Open the merge tool</strong> — Use the <Link to="/combine-cv-and-certificates-pdf" className="text-primary-600 hover:text-primary-700 underline">DOSIBridge CV and certificates merger</Link> or scroll down to use the tool on this page.
            </li>
            <li>
              <strong>Upload your CV first</strong> — Drag your CV PDF onto the upload area.
            </li>
            <li>
              <strong>Upload certificates</strong> — Add all relevant certificate PDFs. Upload professional certifications, diplomas, language certificates, and training completions.
            </li>
            <li>
              <strong>Select pages</strong> — Click each file to preview. Remove blank pages (backs of scanned certificates), irrelevant cover pages, or duplicate pages.
            </li>
            <li>
              <strong>Arrange the order</strong> — Drag your CV to the top, then arrange certificates by relevance. Most relevant certifications go directly after the CV.
            </li>
            <li>
              <strong>Name your file</strong> — Change the output filename to something professional: "Jane_Doe_CV_Certificates.pdf" or "John_Smith_Application_Materials.pdf."
            </li>
            <li>
              <strong>Merge and download</strong> — Click the merge button. Your combined PDF is ready to download and attach to your application.
            </li>
          </ol>

          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mt-8 mb-4">
            Recommended Document Order
          </h2>
          <ol className="list-decimal list-inside text-gray-700 leading-relaxed mb-6 space-y-2">
            <li><strong>CV / Resume</strong> — Always first. This is what the employer reads most carefully.</li>
            <li><strong>Most relevant professional certificate</strong> — The certification that directly qualifies you for the role.</li>
            <li><strong>Additional professional certificates</strong> — Other relevant credentials, in order of importance.</li>
            <li><strong>Academic degree certificate</strong> — Your highest relevant degree.</li>
            <li><strong>Language certificates</strong> — IELTS, TOEFL, etc., if required by the position.</li>
            <li><strong>Training completions</strong> — Online courses, workshops, or bootcamp certificates.</li>
          </ol>

          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mt-8 mb-4">
            Common Mistakes to Avoid
          </h2>
          <ul className="list-disc list-inside text-gray-700 leading-relaxed mb-4 space-y-2">
            <li><strong>Including too many certificates</strong> — Quality over quantity. 3–5 relevant certificates is better than 15 irrelevant ones.</li>
            <li><strong>Leaving blank pages</strong> — Scanned certificates often have blank backs. Remove them.</li>
            <li><strong>Wrong file name</strong> — "merged.pdf" or "Document1.pdf" looks unprofessional. Use your name and "CV" in the filename.</li>
            <li><strong>Wrong order</strong> — Always put your CV first. Don't bury it after 8 certificate pages.</li>
            <li><strong>Low-quality scans</strong> — If a certificate is hard to read, re-scan it in better lighting or higher resolution.</li>
            <li><strong>Using a tool that adds watermarks</strong> — DOSIBridge <Link to="/merge-pdf-no-watermark" className="text-primary-600 hover:text-primary-700 underline">never adds watermarks</Link>. Your application should look professional.</li>
          </ul>

          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mt-8 mb-4">
            Certificates by Industry
          </h2>
          <ul className="list-disc list-inside text-gray-700 leading-relaxed mb-4 space-y-2">
            <li><strong>IT</strong> — AWS, Azure, Google Cloud, CISSP, CompTIA, Kubernetes (CKA/CKAD)</li>
            <li><strong>Finance</strong> — CPA, CFA, FRM, Series 7, Bloomberg Market Concepts</li>
            <li><strong>Healthcare</strong> — Medical license, board certification, BLS/ACLS, continuing education</li>
            <li><strong>Project Management</strong> — PMP, PRINCE2, Scrum Master, SAFe Agilist</li>
            <li><strong>Marketing</strong> — Google Analytics, HubSpot, Meta Blueprint, Hootsuite</li>
            <li><strong>Language</strong> — IELTS, TOEFL, Cambridge (FCE/CAE/CPE), DELF/DALF, Goethe-Zertifikat</li>
          </ul>
        </article>
      </section>

      <section className="bg-gray-100 py-8 sm:py-10">
        <div className="max-w-4xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 text-center mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Merge Your CV and Certificates Now</h2>
          <p className="text-gray-600 mt-2">Upload your files below — free, no signup, no watermark.</p>
        </div>
        <PdfTool />
      </section>

      <section className="max-w-4xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-8">
        <FAQSection items={faqItems} />
      </section>
    </>
  );
}

export default HowToCombineCvCertificatesPage;
