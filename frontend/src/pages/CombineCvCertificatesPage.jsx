import React from 'react';
import { Link } from 'react-router-dom';
import PdfTool from '../components/PdfTool';
import FAQSection from '../components/FAQSection';
import SEOHead from '../components/SEOHead';

const faqItems = [
  {
    question: 'What order should I put my CV and certificates in?',
    answer:
      'Place your CV first, followed by certificates in order of relevance to the position. The most important or most recent certificates should come immediately after your CV. Academic transcripts and less relevant credentials can go at the end.',
  },
  {
    question: 'Can I include scanned certificates?',
    answer:
      'Yes. If you have scanned your certificates to PDF format using a phone scanner app or a flatbed scanner, you can upload them just like any other PDF. DOSIBridge will merge them alongside your digital CV into one combined file.',
  },
  {
    question: 'How do I remove blank pages from scanned certificates?',
    answer:
      'After uploading a scanned certificate, click on it in the file list to see page thumbnails. Only select the pages that contain actual certificate content — skip any blank pages. Only selected pages will be included in the merged output.',
  },
  {
    question: 'Will the combined PDF look professional enough for employers?',
    answer:
      'Yes. DOSIBridge preserves the original quality and formatting of every page. There are no watermarks, no branding, and no quality loss. The combined PDF is indistinguishable from a document assembled with professional desktop software.',
  },
];

function CombineCvCertificatesPage() {
  return (
    <>
      <SEOHead
        title="Combine CV and Certificates into One PDF — Free | DOSIBridge"
        description="Merge your CV, certificates, diplomas, and credentials into a single professional PDF. Free, no watermark, perfect for job applications and academic submissions."
        path="/combine-cv-and-certificates-pdf"
        keywords="combine CV and certificates PDF, merge CV certificates, combine resume and certificates, merge diploma and CV, combine credentials PDF, CV certificate merger"
        faqItems={faqItems}
      />

      <section className="bg-gradient-to-b from-primary-50 to-white py-8 sm:py-10 md:py-12">
        <div className="max-w-4xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Combine CV and Certificates into One PDF
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Merge your CV with professional certificates, diplomas, and credentials into a single, polished PDF.
            Ready for job applications and submissions in seconds.
          </p>
        </div>
      </section>

      <PdfTool />

      <section className="max-w-4xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-8 sm:py-10 md:py-12">
        <article className="prose prose-gray max-w-none">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
            Why Combine Your CV and Certificates
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Employers increasingly want all application materials in a single file. When you list certifications
            on your CV, having the actual certificates attached in the same document adds credibility and saves
            the recruiter time. Instead of asking "Can you send me proof of your AWS certification?" they can
            simply scroll past your CV to see it.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Combining your CV with certificates is especially important for positions where credentials are
            verified — healthcare, engineering, IT, finance, education, and government roles. A single PDF
            with everything included makes the verification process faster and shows that you are organized.
          </p>

          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mt-8 mb-4">
            How to Combine Your CV and Certificates
          </h2>
          <ol className="list-decimal list-inside text-gray-700 leading-relaxed mb-6 space-y-2">
            <li><strong>Upload your CV</strong> — Drag your CV PDF onto the upload area above.</li>
            <li><strong>Upload your certificates</strong> — Add all relevant certificates, diplomas, transcripts, or credential documents.</li>
            <li><strong>Select pages</strong> — For each file, select only the pages you want. Skip cover pages, blank pages, or irrelevant sections.</li>
            <li><strong>Arrange the order</strong> — Put your CV first, then certificates in order of relevance. Drag pages to reorder them.</li>
            <li><strong>Name your file</strong> — Use a professional filename like "Jane_Doe_CV_Certificates.pdf" instead of the default "merged.pdf."</li>
            <li><strong>Merge and download</strong> — Click Merge to combine everything into one clean PDF.</li>
          </ol>

          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mt-8 mb-4">
            Types of Certificates You Can Include
          </h2>
          <ul className="list-disc list-inside text-gray-700 leading-relaxed mb-4 space-y-2">
            <li><strong>Professional certifications</strong> — AWS, PMP, CPA, CCNA, Google Analytics, HubSpot, and other industry certificates.</li>
            <li><strong>Academic diplomas</strong> — Bachelor's, Master's, or PhD degree certificates from universities.</li>
            <li><strong>Language certificates</strong> — IELTS, TOEFL, DELF, Goethe-Zertifikat, and other language proficiency certificates.</li>
            <li><strong>Training completions</strong> — Coursera, Udemy, LinkedIn Learning, or corporate training certificates.</li>
            <li><strong>Licenses</strong> — Medical licenses, legal bar admissions, teaching credentials, or trade certifications.</li>
            <li><strong>Awards and recognitions</strong> — Employee of the year, academic honors, competition awards.</li>
          </ul>

          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mt-8 mb-4">
            Best Practices for CV + Certificate PDFs
          </h2>
          <ul className="list-disc list-inside text-gray-700 leading-relaxed mb-4 space-y-2">
            <li><strong>Order by relevance</strong> — Put the certificates most relevant to the job immediately after your CV.</li>
            <li><strong>Remove blank pages</strong> — Scanned certificates often have blank backs. Select only the pages with content.</li>
            <li><strong>Use a professional filename</strong> — "FirstName_LastName_CV_Certificates.pdf" tells the recruiter exactly what the file contains.</li>
            <li><strong>Keep it concise</strong> — Include only certificates relevant to the position. Ten certificates for a junior developer role is overkill.</li>
            <li><strong>Check readability</strong> — Make sure scanned certificates are clear and legible before merging.</li>
          </ul>

          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mt-8 mb-4">
            Industries Where CV + Certificate PDFs Matter Most
          </h2>
          <ul className="list-disc list-inside text-gray-700 leading-relaxed mb-4 space-y-2">
            <li><strong>Healthcare</strong> — Medical degrees, board certifications, and continuing education credits are required proof.</li>
            <li><strong>IT and cybersecurity</strong> — Cloud certifications (AWS, Azure, GCP), security certifications (CISSP, CEH), and vendor credentials.</li>
            <li><strong>Finance and accounting</strong> — CPA, CFA, FRM, and financial regulatory licenses.</li>
            <li><strong>Engineering</strong> — Professional Engineer (PE) licenses, LEED certifications, and safety training.</li>
            <li><strong>Education</strong> — Teaching credentials, TESOL/TEFL certificates, and subject-specific qualifications.</li>
            <li><strong>International job applications</strong> — Translated diplomas, apostilled documents, and language certificates for visa applications.</li>
          </ul>

          <div className="mt-8 p-4 bg-primary-50 rounded-lg border border-primary-100">
            <p className="text-gray-700 text-sm">
              Need to include a cover letter too?{' '}
              <Link to="/merge-pdf-for-job-application" className="text-primary-600 hover:text-primary-700 underline">Merge all job application documents into one PDF</Link>.{' '}
              Doing this on your phone? <Link to="/merge-pdf-on-mobile" className="text-primary-600 hover:text-primary-700 underline">Merge PDFs on mobile</Link>.
            </p>
          </div>
        </article>

        <FAQSection items={faqItems} />
      </section>
    </>
  );
}

export default CombineCvCertificatesPage;
