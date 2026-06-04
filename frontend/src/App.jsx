import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

import Layout from './components/Layout';

// Pages
import HomePage from './pages/HomePage';
import MergePdfPage from './pages/MergePdfPage';
import MergePdfOnlineFreePage from './pages/MergePdfOnlineFreePage';
import MergePdfNoWatermarkPage from './pages/MergePdfNoWatermarkPage';
import MergePdfOnMobilePage from './pages/MergePdfOnMobilePage';
import MergePdfJobApplicationPage from './pages/MergePdfJobApplicationPage';
import CombineCvCertificatesPage from './pages/CombineCvCertificatesPage';
import MergeUniversityDocumentsPage from './pages/MergeUniversityDocumentsPage';
import MergeScannedDocumentsPage from './pages/MergeScannedDocumentsPage';

// Blog
import HowToMergePdfPage from './pages/blog/HowToMergePdfPage';
import HowToCombineCvCertificatesPage from './pages/blog/HowToCombineCvCertificatesPage';
import HowToMergePdfOnMobilePage from './pages/blog/HowToMergePdfOnMobilePage';
import HowToReorderPdfPage from './pages/blog/HowToReorderPdfPage';

// Tools
import CompressPdfPage from './pages/CompressPdfPage';
import SplitPdfPage from './pages/SplitPdfPage';
import ImageToPdfPage from './pages/ImageToPdfPage';
import ReorderPdfPage from './pages/ReorderPdfPage';
import DeletePdfPagesPage from './pages/DeletePdfPagesPage';

import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/merge-pdf" element={<MergePdfPage />} />

        {/* Redirects: consolidate duplicate pages */}
        <Route path="/pdf-joiner" element={<Navigate to="/merge-pdf" replace />} />
        <Route path="/combine-pdf-files" element={<Navigate to="/merge-pdf" replace />} />
        <Route path="/jpg-to-pdf" element={<Navigate to="/image-to-pdf" replace />} />

        <Route path="/merge-pdf-online-free" element={<MergePdfOnlineFreePage />} />
        <Route path="/merge-pdf-no-watermark" element={<MergePdfNoWatermarkPage />} />
        <Route path="/merge-pdf-on-mobile" element={<MergePdfOnMobilePage />} />
        <Route path="/merge-pdf-for-job-application" element={<MergePdfJobApplicationPage />} />
        <Route path="/combine-cv-and-certificates-pdf" element={<CombineCvCertificatesPage />} />
        <Route path="/merge-university-documents-pdf" element={<MergeUniversityDocumentsPage />} />
        <Route path="/merge-scanned-documents-pdf" element={<MergeScannedDocumentsPage />} />

        <Route path="/blog/how-to-merge-pdf-files-online" element={<HowToMergePdfPage />} />
        <Route path="/blog/how-to-combine-cv-certificates-into-one-pdf" element={<HowToCombineCvCertificatesPage />} />
        <Route path="/blog/how-to-merge-pdf-on-mobile" element={<HowToMergePdfOnMobilePage />} />
        <Route path="/blog/how-to-reorder-pdf-before-merging" element={<HowToReorderPdfPage />} />

        <Route path="/compress-pdf" element={<CompressPdfPage />} />
        <Route path="/split-pdf" element={<SplitPdfPage />} />
        <Route path="/image-to-pdf" element={<ImageToPdfPage />} />
        <Route path="/reorder-pdf" element={<ReorderPdfPage />} />
        <Route path="/delete-pdf-pages" element={<DeletePdfPagesPage />} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Layout>
  );
}

export default App;
