import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Layout from './components/Layout';

// Main tool pages
import HomePage from './pages/HomePage';
import MergePdfPage from './pages/MergePdfPage';
import PdfJoinerPage from './pages/PdfJoinerPage';
import CombinePdfFilesPage from './pages/CombinePdfFilesPage';

// Free/no-friction intent pages
import MergePdfOnlineFreePage from './pages/MergePdfOnlineFreePage';
import MergePdfNoWatermarkPage from './pages/MergePdfNoWatermarkPage';

// Device/use-case intent pages
import MergePdfOnMobilePage from './pages/MergePdfOnMobilePage';
import MergePdfJobApplicationPage from './pages/MergePdfJobApplicationPage';
import CombineCvCertificatesPage from './pages/CombineCvCertificatesPage';
import MergeUniversityDocumentsPage from './pages/MergeUniversityDocumentsPage';
import MergeScannedDocumentsPage from './pages/MergeScannedDocumentsPage';

// Blog/guide pages
import HowToMergePdfPage from './pages/blog/HowToMergePdfPage';
import HowToCombineCvCertificatesPage from './pages/blog/HowToCombineCvCertificatesPage';
import HowToMergePdfOnMobilePage from './pages/blog/HowToMergePdfOnMobilePage';
import HowToReorderPdfPage from './pages/blog/HowToReorderPdfPage';

// Related tool placeholders
import ComingSoonToolPage from './pages/ComingSoonToolPage';

import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <Layout>
      <Routes>
        {/* Homepage */}
        <Route path="/" element={<HomePage />} />

        {/* Cluster: Merge PDF (main tool intent) */}
        <Route path="/merge-pdf" element={<MergePdfPage />} />
        <Route path="/pdf-joiner" element={<PdfJoinerPage />} />
        <Route path="/combine-pdf-files" element={<CombinePdfFilesPage />} />

        {/* Cluster: Free/no-friction intent */}
        <Route path="/merge-pdf-online-free" element={<MergePdfOnlineFreePage />} />
        <Route path="/merge-pdf-no-watermark" element={<MergePdfNoWatermarkPage />} />

        {/* Cluster: Device/use-case intent */}
        <Route path="/merge-pdf-on-mobile" element={<MergePdfOnMobilePage />} />
        <Route path="/merge-pdf-for-job-application" element={<MergePdfJobApplicationPage />} />
        <Route path="/combine-cv-and-certificates-pdf" element={<CombineCvCertificatesPage />} />
        <Route path="/merge-university-documents-pdf" element={<MergeUniversityDocumentsPage />} />
        <Route path="/merge-scanned-documents-pdf" element={<MergeScannedDocumentsPage />} />

        {/* Cluster: Blog/guides (problem/guide intent) */}
        <Route path="/blog/how-to-merge-pdf-files-online" element={<HowToMergePdfPage />} />
        <Route path="/blog/how-to-combine-cv-certificates-into-one-pdf" element={<HowToCombineCvCertificatesPage />} />
        <Route path="/blog/how-to-merge-pdf-on-mobile" element={<HowToMergePdfOnMobilePage />} />
        <Route path="/blog/how-to-reorder-pdf-before-merging" element={<HowToReorderPdfPage />} />

        {/* Cluster: Related tools (coming soon — SEO placeholders) */}
        <Route path="/compress-pdf" element={
          <ComingSoonToolPage
            title="Compress PDF Online"
            seoTitle="Compress PDF — Reduce PDF File Size Online Free | DOSIBridge"
            description="Reduce PDF file size without losing quality. Compress large PDFs for email, upload, or storage. Free online PDF compressor — coming soon."
            path="/compress-pdf"
            keywords="compress PDF, reduce PDF size, PDF compressor, shrink PDF, make PDF smaller, compress PDF online free"
            relatedText="While we build the compressor, you can merge your PDFs to combine multiple smaller files into one organized document."
          />
        } />
        <Route path="/split-pdf" element={
          <ComingSoonToolPage
            title="Split PDF Online"
            seoTitle="Split PDF — Extract Pages from PDF Online Free | DOSIBridge"
            description="Split a PDF into separate files or extract specific pages. Free online PDF splitter — coming soon to DOSIBridge."
            path="/split-pdf"
            keywords="split PDF, extract PDF pages, PDF splitter, split PDF online, separate PDF pages, break apart PDF"
            relatedText="Need to select specific pages from a PDF? You can already do this with our merge tool — upload a PDF, select only the pages you want, and merge them into a new file."
          />
        } />
        <Route path="/image-to-pdf" element={
          <ComingSoonToolPage
            title="Image to PDF Converter"
            seoTitle="Image to PDF — Convert Images to PDF Online Free | DOSIBridge"
            description="Convert JPG, PNG, and other images to PDF format. Free online image to PDF converter — coming soon to DOSIBridge."
            path="/image-to-pdf"
            keywords="image to PDF, convert image to PDF, JPG to PDF, PNG to PDF, photo to PDF, image to PDF converter"
          />
        } />
        <Route path="/jpg-to-pdf" element={
          <ComingSoonToolPage
            title="JPG to PDF Converter"
            seoTitle="JPG to PDF — Convert JPEG Images to PDF Free | DOSIBridge"
            description="Convert JPG and JPEG images to PDF documents. Combine multiple photos into one PDF. Free online — coming soon to DOSIBridge."
            path="/jpg-to-pdf"
            keywords="JPG to PDF, JPEG to PDF, convert JPG to PDF, photo to PDF, multiple JPG to PDF, JPG to PDF converter"
          />
        } />
        <Route path="/reorder-pdf" element={
          <ComingSoonToolPage
            title="Reorder PDF Pages"
            seoTitle="Reorder PDF Pages — Rearrange PDF Online Free | DOSIBridge"
            description="Rearrange pages in a PDF document by dragging and dropping. Free online PDF page reorderer — coming soon as a standalone tool."
            path="/reorder-pdf"
            keywords="reorder PDF pages, rearrange PDF, PDF page reorder, move PDF pages, reorganize PDF, sort PDF pages"
            relatedText="You can already reorder PDF pages with our merge tool. Upload your PDF, select pages, drag them into order, and merge into a new file."
          />
        } />
        <Route path="/delete-pdf-pages" element={
          <ComingSoonToolPage
            title="Delete Pages from PDF"
            seoTitle="Delete PDF Pages — Remove Pages from PDF Online Free | DOSIBridge"
            description="Remove unwanted pages from a PDF document. Free online PDF page remover — coming soon to DOSIBridge."
            path="/delete-pdf-pages"
            keywords="delete PDF pages, remove pages from PDF, PDF page remover, remove PDF pages online, delete page from PDF free"
            relatedText="You can already remove pages with our merge tool. Upload your PDF, select only the pages you want to keep, and merge them into a new file without the unwanted pages."
          />
        } />

        {/* 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Layout>
  );
}

export default App;
