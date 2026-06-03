import React from 'react';
import { Link } from 'react-router-dom';
import { Wrench } from 'lucide-react';
import SEOHead from '../components/SEOHead';

function ComingSoonToolPage({ title, seoTitle, description, path, keywords, relatedText }) {
  return (
    <>
      <SEOHead title={seoTitle} description={description} path={path} keywords={keywords} noindex />

      <section className="bg-gradient-to-b from-primary-50 to-white py-8 sm:py-10 md:py-12">
        <div className="max-w-4xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            {title}
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            {description}
          </p>
        </div>
      </section>

      <section className="max-w-2xl mx-auto px-4 py-16 text-center">
        <Wrench aria-hidden="true" className="w-16 h-16 mx-auto mb-6 text-primary-300" />
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Coming Soon</h2>
        <p className="text-gray-600 mb-8 leading-relaxed">
          We are building this tool as part of the DOSIBridge PDF suite. In the meantime,
          you can use our fully functional PDF merger to combine, reorder, and manage your PDF files.
        </p>
        <Link to="/merge-pdf" className="btn btn-primary inline-block px-6 py-3 mb-8">
          Merge PDF Files Now — Free
        </Link>

        <div className="mt-12 text-left max-w-lg mx-auto">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Available PDF Tools</h3>
          <nav>
            <ul className="space-y-3 text-sm text-gray-600">
              <li><Link to="/merge-pdf" className="text-primary-600 hover:text-primary-700 underline">Merge PDF</Link> — Combine multiple PDFs into one document</li>
              <li><Link to="/combine-pdf-files" className="text-primary-600 hover:text-primary-700 underline">Combine PDF Files</Link> — Join documents together</li>
              <li><Link to="/merge-pdf-no-watermark" className="text-primary-600 hover:text-primary-700 underline">Merge PDF No Watermark</Link> — Clean, professional output</li>
              <li><Link to="/merge-pdf-on-mobile" className="text-primary-600 hover:text-primary-700 underline">Merge PDF on Mobile</Link> — Works on any phone or tablet</li>
              <li><Link to="/blog/how-to-reorder-pdf-before-merging" className="text-primary-600 hover:text-primary-700 underline">Reorder PDF Pages</Link> — Rearrange pages before merging</li>
            </ul>
          </nav>
        </div>

        {relatedText && (
          <div className="mt-8 p-4 bg-primary-50 rounded-lg border border-primary-100 text-left">
            <p className="text-gray-700 text-sm">{relatedText}</p>
          </div>
        )}
      </section>
    </>
  );
}

export default ComingSoonToolPage;
