import React from 'react';
import { Link } from 'react-router-dom';
import PdfTool from '../components/PdfTool';
import FAQSection from '../components/FAQSection';
import SEOHead from '../components/SEOHead';

const faqItems = [
  {
    question: 'What university documents can I merge into one PDF?',
    answer:
      'You can merge any PDF documents — transcripts, degree certificates, enrollment letters, recommendation letters, research papers, course syllabi, and application forms. Upload them all and combine them into one organized file.',
  },
  {
    question: 'Will merging affect the official formatting of my transcripts?',
    answer:
      'No. DOSIBridge preserves the original quality, layout, fonts, and formatting of every page. Official documents like transcripts will look exactly the same in the merged file as they do individually.',
  },
  {
    question: 'Can I merge documents from different universities?',
    answer:
      'Yes. Upload PDFs from any source and combine them in any order. This is especially useful for graduate school applications where you need to submit transcripts from multiple institutions.',
  },
  {
    question: 'Is this secure enough for academic documents?',
    answer:
      'Yes. Files are uploaded over encrypted HTTPS and automatically deleted after your session ends. DOSIBridge never stores, shares, or accesses your documents. You can also add password protection to the merged output.',
  },
];

function MergeUniversityDocumentsPage() {
  return (
    <>
      <SEOHead
        title="Merge University Documents PDF — Transcripts, Certificates, Applications | DOSIBridge"
        description="Combine university transcripts, degree certificates, recommendation letters, and application forms into one PDF. Free, secure, and ready for submission."
        path="/merge-university-documents-pdf"
        keywords="merge university documents PDF, combine transcripts PDF, merge academic documents, university application PDF, merge degree certificates, combine school documents"
      />

      <section className="bg-gradient-to-b from-primary-50 to-white py-8 sm:py-10 md:py-12">
        <div className="max-w-4xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Merge University Documents into One PDF
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Combine transcripts, degree certificates, recommendation letters, and application forms into a single PDF for university submissions.
          </p>
        </div>
      </section>

      <PdfTool />

      <section className="max-w-4xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-8 sm:py-10 md:py-12">
        <article className="prose prose-gray max-w-none">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
            Why University Applications Need Merged PDFs
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            University applications — whether for undergraduate admission, graduate school, scholarships, or
            exchange programs — almost always require multiple documents. Most application portals have a single
            upload field or limit the number of attachments. Merging everything into one PDF is the cleanest
            solution.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            A single merged PDF is also easier for admissions committees to review. Instead of clicking through
            five separate files, the reviewer scrolls through one organized document. This shows professionalism
            and attention to detail — qualities that matter in competitive admissions.
          </p>

          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mt-8 mb-4">
            Recommended Document Order for University Applications
          </h2>
          <ol className="list-decimal list-inside text-gray-700 leading-relaxed mb-6 space-y-2">
            <li><strong>Cover letter or personal statement</strong> — Your introduction to the admissions committee.</li>
            <li><strong>CV or academic resume</strong> — Your experience, publications, and achievements.</li>
            <li><strong>Official transcripts</strong> — Academic records from all institutions attended.</li>
            <li><strong>Degree certificates</strong> — Diplomas from completed programs.</li>
            <li><strong>Recommendation letters</strong> — Letters from professors, employers, or mentors.</li>
            <li><strong>Language certificates</strong> — IELTS, TOEFL, or other language proficiency proof.</li>
            <li><strong>Supplementary materials</strong> — Research proposals, writing samples, or portfolio pieces.</li>
          </ol>

          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mt-8 mb-4">
            Common University Document Merging Scenarios
          </h2>
          <ul className="list-disc list-inside text-gray-700 leading-relaxed mb-4 space-y-2">
            <li><strong>Graduate school applications</strong> — Merge CV, statement of purpose, transcripts from multiple universities, and GRE score reports.</li>
            <li><strong>Scholarship applications</strong> — Combine financial documents, academic records, and recommendation letters into one submission file.</li>
            <li><strong>Study abroad programs</strong> — Bundle passport copies, enrollment verification, and insurance documents.</li>
            <li><strong>Thesis submission</strong> — Merge your thesis document with appendices, data tables, and ethics approval forms.</li>
            <li><strong>Course registration</strong> — Combine prerequisite completion certificates with registration forms.</li>
          </ul>

          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mt-8 mb-4">
            Tips for Merging University Documents
          </h2>
          <ul className="list-disc list-inside text-gray-700 leading-relaxed mb-4 space-y-2">
            <li><strong>Use a clear filename</strong> — Name your file something like "LastName_GradApp_Fall2026.pdf" so admissions staff can identify it immediately.</li>
            <li><strong>Add page numbers</strong> — DOSIBridge can automatically add page numbers to your merged document, making it easier to navigate.</li>
            <li><strong>Remove blank pages</strong> — Scanned documents often have blank backs. Select only pages with content.</li>
            <li><strong>Check the order</strong> — Follow the application instructions for document order. If none are given, use the recommended order above.</li>
            <li><strong>Keep file size manageable</strong> — Most portals accept 10–25 MB. If your merged file is too large, consider compressing source PDFs first.</li>
          </ul>

          <div className="mt-8 p-4 bg-primary-50 rounded-lg border border-primary-100">
            <p className="text-gray-700 text-sm">
              Also useful: <Link to="/combine-cv-and-certificates-pdf" className="text-primary-600 hover:text-primary-700 underline">Combine CV and certificates</Link> |{' '}
              <Link to="/merge-pdf-for-job-application" className="text-primary-600 hover:text-primary-700 underline">Merge PDF for job application</Link> |{' '}
              <Link to="/merge-scanned-documents-pdf" className="text-primary-600 hover:text-primary-700 underline">Merge scanned documents</Link>
            </p>
          </div>
        </article>

        <FAQSection items={faqItems} />
      </section>
    </>
  );
}

export default MergeUniversityDocumentsPage;
