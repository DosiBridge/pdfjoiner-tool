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

// Related tool pages
import CompressPdfPage from './pages/CompressPdfPage';
import SplitPdfPage from './pages/SplitPdfPage';
import ImageToPdfPage from './pages/ImageToPdfPage';
import JpgToPdfPage from './pages/JpgToPdfPage';
import ReorderPdfPage from './pages/ReorderPdfPage';
import DeletePdfPagesPage from './pages/DeletePdfPagesPage';

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

        {/* Cluster: Related PDF tools (fully working) */}
        <Route path="/compress-pdf" element={<CompressPdfPage />} />
        <Route path="/split-pdf" element={<SplitPdfPage />} />
        <Route path="/image-to-pdf" element={<ImageToPdfPage />} />
        <Route path="/jpg-to-pdf" element={<JpgToPdfPage />} />
        <Route path="/reorder-pdf" element={<ReorderPdfPage />} />
        <Route path="/delete-pdf-pages" element={<DeletePdfPagesPage />} />

        {/* 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Layout>
  );
}

export default App;
