/**
 * Post-build script: generates unique index.html per route with correct
 * <title>, <meta description>, <canonical>, OG tags, and structured data
 * baked into the raw HTML. This ensures Google sees correct metadata
 * without needing JavaScript to render.
 *
 * Run after `vite build`: node scripts/generate-static-meta.js
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST = join(__dirname, '..', 'dist');
const BASE_URL = 'https://pdfjoiner.dosibridge.com';

const pages = [
  {
    route: '/merge-pdf',
    title: 'Merge PDF — Free PDF Joiner & Merger Online | DOSIBridge',
    description: 'Merge PDF files, join PDFs, or combine documents into one. Free online PDF merger with drag-and-drop reorder. No installation, no signup, no watermark.',
    h1: 'Merge PDF Files Online',
    keywords: 'merge PDF, PDF joiner, PDF merger, combine PDF, join PDF files, merge PDF online',
  },
  {
    route: '/pdf-joiner',
    title: 'PDF Joiner — Join PDF Files Online Free | DOSIBridge',
    description: 'Join multiple PDF files into one document online. Free PDF joiner with page selection and drag-and-drop reorder. No signup, no watermark.',
    h1: 'PDF Joiner — Join PDF Files Online',
    keywords: 'PDF joiner, join PDF files, joiner PDF, PDF joiner online, free PDF joiner',
  },
  {
    route: '/combine-pdf-files',
    title: 'Combine PDF Files Into One — Free Online PDF Combiner | DOSIBridge',
    description: 'Combine multiple PDF files into a single document online. Select pages, reorder them, and download your combined PDF. Free, no signup, no watermark.',
    h1: 'Combine PDF Files Into One Document',
    keywords: 'combine PDF files, combine PDFs into one, PDF combiner, merge multiple PDFs',
  },
  {
    route: '/merge-pdf-online-free',
    title: 'Merge PDF Online Free — No Limits, No Signup | DOSIBridge',
    description: 'Merge PDF files online for free with no daily limits, no account required, and no watermarks. Upload, reorder, and download your merged PDF instantly.',
    h1: 'Merge PDF Online Free — No Limits',
    keywords: 'merge PDF online free, free PDF merger, merge PDF free no limit',
  },
  {
    route: '/merge-pdf-no-watermark',
    title: 'Merge PDF Without Watermark — Free, Clean Output | DOSIBridge',
    description: 'Merge PDF files online without any watermarks added to your output. DOSIBridge produces clean, professional PDFs with no branding, no signup, and no cost.',
    h1: 'Merge PDF Without Watermark',
    keywords: 'merge PDF no watermark, PDF merger without watermark, free PDF merge no branding',
  },
  {
    route: '/merge-pdf-on-mobile',
    title: 'Merge PDF on Mobile — iPhone & Android PDF Merger | DOSIBridge',
    description: 'Merge PDF files directly on your phone. Works on iPhone, Android, and tablets. No app download needed — just open your browser, upload PDFs, and merge. Free.',
    h1: 'Merge PDF on Mobile',
    keywords: 'merge PDF on mobile, merge PDF iPhone, merge PDF Android, mobile PDF merger',
  },
  {
    route: '/merge-pdf-for-job-application',
    title: 'Merge PDF for Job Application — CV + Cover Letter + Certificates | DOSIBridge',
    description: 'Combine your CV, cover letter, and certificates into one professional PDF for job applications. Free, no watermark, and ready to submit in seconds.',
    h1: 'Merge PDF for Job Application',
    keywords: 'merge PDF job application, combine CV cover letter, merge resume PDF',
  },
  {
    route: '/combine-cv-and-certificates-pdf',
    title: 'Combine CV and Certificates into One PDF — Free | DOSIBridge',
    description: 'Merge your CV, certificates, diplomas, and credentials into a single professional PDF. Free, no watermark, perfect for job applications.',
    h1: 'Combine CV and Certificates into One PDF',
    keywords: 'combine CV and certificates PDF, merge CV certificates, combine resume and certificates',
  },
  {
    route: '/merge-university-documents-pdf',
    title: 'Merge University Documents PDF — Transcripts, Certificates, Applications | DOSIBridge',
    description: 'Combine university transcripts, degree certificates, recommendation letters, and application forms into one PDF. Free, secure, and ready for submission.',
    h1: 'Merge University Documents into One PDF',
    keywords: 'merge university documents PDF, combine transcripts PDF, merge academic documents',
  },
  {
    route: '/merge-scanned-documents-pdf',
    title: 'Merge Scanned Documents into One PDF — Free | DOSIBridge',
    description: 'Combine scanned documents, receipts, and paper forms into a single PDF. Upload scanned pages, remove blanks, reorder, and download one clean file.',
    h1: 'Merge Scanned Documents into One PDF',
    keywords: 'merge scanned documents PDF, combine scanned pages, merge scanned PDF',
  },
  {
    route: '/compress-pdf',
    title: 'Compress PDF — Reduce PDF File Size Online Free | DOSIBridge',
    description: 'Reduce PDF file size without losing quality. Free online PDF compressor — no signup, no watermark.',
    h1: 'Compress PDF Online',
    keywords: 'compress PDF, reduce PDF size, PDF compressor, shrink PDF, make PDF smaller',
  },
  {
    route: '/split-pdf',
    title: 'Split PDF — Extract Pages from PDF Online Free | DOSIBridge',
    description: 'Split a PDF into separate files or extract specific pages. Free online PDF splitter — no signup, no watermark.',
    h1: 'Split PDF Online',
    keywords: 'split PDF, extract PDF pages, PDF splitter, split PDF online, separate PDF pages',
  },
  {
    route: '/image-to-pdf',
    title: 'Image to PDF — Convert Images to PDF Online Free | DOSIBridge',
    description: 'Convert JPG, PNG, and other images to PDF format. Combine multiple photos into one PDF. Free online.',
    h1: 'Image to PDF Converter',
    keywords: 'image to PDF, convert image to PDF, JPG to PDF, PNG to PDF, photo to PDF',
  },
  {
    route: '/jpg-to-pdf',
    title: 'JPG to PDF — Convert JPEG Images to PDF Free | DOSIBridge',
    description: 'Convert JPG and JPEG images to PDF documents. Combine multiple photos into one PDF. Free online.',
    h1: 'JPG to PDF Converter',
    keywords: 'JPG to PDF, JPEG to PDF, convert JPG to PDF, photo to PDF, multiple JPG to PDF',
  },
  {
    route: '/reorder-pdf',
    title: 'Reorder PDF Pages — Rearrange PDF Online Free | DOSIBridge',
    description: 'Rearrange pages in a PDF document. Enter your desired page order and download the reordered PDF. Free, no signup.',
    h1: 'Reorder PDF Pages',
    keywords: 'reorder PDF pages, rearrange PDF, PDF page reorder, move PDF pages, reorganize PDF',
  },
  {
    route: '/delete-pdf-pages',
    title: 'Delete PDF Pages — Remove Pages from PDF Online Free | DOSIBridge',
    description: 'Remove unwanted pages from a PDF document. Free online PDF page remover — no signup, no watermark.',
    h1: 'Delete Pages from PDF',
    keywords: 'delete PDF pages, remove pages from PDF, PDF page remover, remove PDF pages online',
  },
  {
    route: '/blog/how-to-merge-pdf-files-online',
    title: 'How to Merge PDF Files Online — Step-by-Step Guide | DOSIBridge',
    description: 'Learn how to merge PDF files into one document. Step-by-step guide covering free online tools, desktop methods, and mobile options.',
    h1: 'How to Merge PDF Files Online',
    keywords: 'how to merge PDF files, how to combine PDFs, how to merge PDF',
  },
  {
    route: '/blog/how-to-combine-cv-certificates-into-one-pdf',
    title: 'How to Combine CV and Certificates into One PDF — Guide | DOSIBridge',
    description: 'Step-by-step guide to merging your CV, certificates, and diplomas into one professional PDF for job applications.',
    h1: 'How to Combine CV and Certificates into One PDF',
    keywords: 'how to combine CV and certificates PDF, merge CV certificates',
  },
  {
    route: '/blog/how-to-merge-pdf-on-mobile',
    title: 'How to Merge PDF on Mobile — iPhone & Android Guide | DOSIBridge',
    description: 'Step-by-step guide to merging PDF files on your iPhone or Android phone. No app needed — use your browser to combine PDFs in under a minute.',
    h1: 'How to Merge PDF on Mobile',
    keywords: 'how to merge PDF on mobile, merge PDF iPhone, merge PDF Android',
  },
  {
    route: '/blog/how-to-reorder-pdf-before-merging',
    title: 'How to Reorder PDF Pages Before Merging — Free Guide | DOSIBridge',
    description: 'Learn how to rearrange PDF pages before merging them. Drag-and-drop page reordering, cross-file interleaving, and page removal.',
    h1: 'How to Reorder PDF Pages Before Merging',
    keywords: 'how to reorder PDF pages, rearrange PDF pages, reorder PDF before merging',
  },
];

function generatePage(templateHtml, page) {
  const canonicalUrl = `${BASE_URL}${page.route}`;
  let html = templateHtml;

  // Replace title
  html = html.replace(
    /<title>[^<]*<\/title>/,
    `<title>${page.title}</title>`
  );

  // Replace meta description
  html = html.replace(
    /<meta name="description" content="[^"]*"/,
    `<meta name="description" content="${page.description}"`
  );

  // Replace meta keywords
  html = html.replace(
    /<meta name="keywords" content="[^"]*"/,
    `<meta name="keywords" content="${page.keywords}"`
  );

  // Replace canonical
  html = html.replace(
    /<link rel="canonical" href="[^"]*"/,
    `<link rel="canonical" href="${canonicalUrl}"`
  );

  // Replace OG tags
  html = html.replace(
    /<meta property="og:title" content="[^"]*"/,
    `<meta property="og:title" content="${page.title}"`
  );
  html = html.replace(
    /<meta property="og:description" content="[^"]*"/,
    `<meta property="og:description" content="${page.description}"`
  );
  html = html.replace(
    /<meta property="og:url" content="[^"]*"/,
    `<meta property="og:url" content="${canonicalUrl}"`
  );

  // Replace Twitter tags
  html = html.replace(
    /<meta name="twitter:title" content="[^"]*"/,
    `<meta name="twitter:title" content="${page.title}"`
  );
  html = html.replace(
    /<meta name="twitter:description" content="[^"]*"/,
    `<meta name="twitter:description" content="${page.description}"`
  );

  // Add H1 in noscript for crawlers
  html = html.replace(
    /<noscript>[\s\S]*?<\/noscript>/,
    `<noscript>
      <div style="padding: 2rem; text-align: center; font-family: system-ui, sans-serif;">
        <h1>${page.h1}</h1>
        <p>${page.description}</p>
        <p><a href="${BASE_URL}">Go to DOSIBridge PDF Joiner</a></p>
      </div>
    </noscript>`
  );

  return html;
}

function main() {
  const templatePath = join(DIST, 'index.html');

  if (!existsSync(templatePath)) {
    console.error('dist/index.html not found. Run `vite build` first.');
    process.exit(1);
  }

  const templateHtml = readFileSync(templatePath, 'utf-8');
  let generated = 0;

  for (const page of pages) {
    const html = generatePage(templateHtml, page);
    const routeDir = join(DIST, page.route);
    const outputPath = join(routeDir, 'index.html');

    mkdirSync(routeDir, { recursive: true });
    writeFileSync(outputPath, html, 'utf-8');
    generated++;
  }

  console.log(`Generated ${generated} static HTML files for SEO.`);
}

main();
