import React from 'react';
import { Link } from 'react-router-dom';
import PdfTool from '../components/PdfTool';
import FAQSection from '../components/FAQSection';
import SEOHead from '../components/SEOHead';

const faqItems = [
  {
    question: 'What documents should I merge for a job application?',
    answer:
      'A typical job application PDF package includes your CV or resume, cover letter, and any relevant certificates or credentials. Some employers also ask for a portfolio, reference letters, or transcripts. Combine them in the order specified by the employer, or use: cover letter first, CV second, certificates last.',
  },
  {
    question: 'Does the merged PDF maintain the formatting of my CV?',
    answer:
      'Yes. DOSIBridge merges PDF pages at the structural level, preserving all original formatting, fonts, images, and layout. Your carefully designed CV will look exactly the same in the merged file as it does in the original.',
  },
  {
    question: 'Should I use one merged PDF or multiple attachments for job applications?',
    answer:
      'Most HR systems and recruiters prefer a single PDF file. It is easier to review, less likely to get lost in an inbox, and shows that you are organized and professional. Unless the employer specifically requests separate files, merge everything into one document.',
  },
  {
    question: 'Can I add a cover page to my merged application?',
    answer:
      'Yes. If you have a cover page as a separate PDF, simply upload it along with your other documents and drag it to the first position in the page reorderer. The cover page will appear as the first page of your merged application.',
  },
];

function MergePdfJobApplicationPage() {
  return (
    <>
      <SEOHead
        title="Merge PDF for Job Application — CV + Cover Letter + Certificates | DOSIBridge"
        description="Combine your CV, cover letter, and certificates into one professional PDF for job applications. Free, no watermark, and ready to submit in seconds."
        path="/merge-pdf-for-job-application"
        keywords="merge PDF job application, combine CV cover letter, merge resume PDF, job application PDF, combine application documents, merge CV and certificates"
      />

      <section className="bg-gradient-to-b from-primary-50 to-white py-8 sm:py-10 md:py-12">
        <div className="max-w-4xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Merge PDF for Job Application
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Combine your CV, cover letter, certificates, and references into one polished PDF. Make a professional impression with a single, clean application file.
          </p>
        </div>
      </section>

      <PdfTool />

      <section className="max-w-4xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-8 sm:py-10 md:py-12">
        <article className="prose prose-gray max-w-none">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
            Why Merge Your Application Documents
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            When you apply for a job, you typically need to submit multiple documents: your CV or resume, a
            cover letter, professional certificates, academic transcripts, and sometimes reference letters.
            Sending these as separate attachments is messy, unprofessional, and makes it easy for a recruiter
            to lose one of your files.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Merging everything into one PDF solves this problem. The recruiter receives a single file that opens
            in one click, scrolls through logically, and stays organized in their applicant tracking system. It
            shows attention to detail — exactly what employers look for.
          </p>

          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mt-8 mb-4">
            Recommended Document Order
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Unless the employer specifies a different order, arrange your application documents like this:
          </p>
          <ol className="list-decimal list-inside text-gray-700 leading-relaxed mb-6 space-y-2">
            <li><strong>Cover letter</strong> — Your introduction and pitch. This should be the first thing the recruiter sees.</li>
            <li><strong>CV / Resume</strong> — Your experience, skills, and education. The core of your application.</li>
            <li><strong>Certificates and credentials</strong> — Professional certifications, language certificates, or licenses that support your application.</li>
            <li><strong>Academic transcripts</strong> — If requested, include your degree transcripts or grade reports.</li>
            <li><strong>Reference letters</strong> — Letters from previous employers or professors, if applicable.</li>
            <li><strong>Portfolio samples</strong> — Selected work samples, if relevant to the position.</li>
          </ol>

          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mt-8 mb-4">
            Tips for a Professional Application PDF
          </h2>
          <ul className="list-disc list-inside text-gray-700 leading-relaxed mb-4 space-y-2">
            <li><strong>Name the file clearly</strong> — Use DOSIBridge's custom filename option to name your output something like "John_Smith_Application_Marketing_Manager.pdf" instead of "merged.pdf."</li>
            <li><strong>Check page order</strong> — Use the page reorderer to make sure your cover letter is first and everything flows logically.</li>
            <li><strong>Remove unnecessary pages</strong> — If a certificate has a blank page or a transcript includes irrelevant semesters, select only the pages you need.</li>
            <li><strong>Keep file size reasonable</strong> — Most employers accept PDFs up to 10–25 MB. DOSIBridge handles files up to 50 MB each, but aim for a smaller final file.</li>
            <li><strong>Skip watermarks</strong> — DOSIBridge never adds watermarks. Your application will look exactly as you intended.</li>
          </ul>

          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mt-8 mb-4">
            Common Job Application Scenarios
          </h2>
          <ul className="list-disc list-inside text-gray-700 leading-relaxed mb-4 space-y-2">
            <li><strong>Corporate applications</strong> — Merge CV, cover letter, and professional references into one file for HR portals.</li>
            <li><strong>Government positions</strong> — Combine application forms, identity documents, and certifications as required.</li>
            <li><strong>Academic positions</strong> — Merge your CV, research statement, teaching philosophy, and publication list.</li>
            <li><strong>Visa sponsorship applications</strong> — Bundle employment contracts, degree certificates, and supporting documents.</li>
            <li><strong>Freelance proposals</strong> — Combine your pitch, portfolio samples, rate sheet, and past project summaries.</li>
          </ul>

          <div className="mt-8 p-4 bg-primary-50 rounded-lg border border-primary-100">
            <p className="text-gray-700 text-sm">
              Specifically merging CV and certificates?{' '}
              <Link to="/combine-cv-and-certificates-pdf" className="text-primary-600 hover:text-primary-700 underline">Combine CV and certificates into one PDF</Link>.{' '}
              Need to merge on your phone? <Link to="/merge-pdf-on-mobile" className="text-primary-600 hover:text-primary-700 underline">Merge PDF on mobile</Link>.
            </p>
          </div>
        </article>

        <FAQSection items={faqItems} />
      </section>
    </>
  );
}

export default MergePdfJobApplicationPage;
