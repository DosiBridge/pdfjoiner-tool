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
    title: 'Merge PDF Online — Free, No Signup | DOSIBridge',
    description: 'Merge PDF files, join PDFs, or combine documents into one. Free online PDF merger with drag-and-drop reorder. No installation, no signup, no watermark.',
    h1: 'Merge PDF Files Online',
  },
  {
    route: '/merge-pdf-online-free',
    title: 'Merge PDF Online Free — No Limits, No Signup | DOSIBridge',
    description: 'Merge PDF files online for free with no daily limits, no account required, and no watermarks. Upload, reorder, and download your merged PDF instantly.',
    h1: 'Merge PDF Online Free — No Limits',
  },
  {
    route: '/merge-pdf-no-watermark',
    title: 'Merge PDF Without Watermark — Free, Clean Output | DOSIBridge',
    description: 'Merge PDF files online without any watermarks added to your output. DOSIBridge produces clean, professional PDFs with no branding, no signup, and no cost.',
    h1: 'Merge PDF Without Watermark',
  },
  {
    route: '/merge-pdf-on-mobile',
    title: 'Merge PDF on Mobile — iPhone & Android PDF Merger | DOSIBridge',
    description: 'Merge PDF files directly on your phone. Works on iPhone, Android, and tablets. No app download needed — just open your browser, upload PDFs, and merge. Free.',
    h1: 'Merge PDF on Mobile',
  },
  {
    route: '/merge-pdf-for-job-application',
    title: 'Merge PDF for Job Application — CV + Cover Letter + Certificates | DOSIBridge',
    description: 'Combine your CV, cover letter, and certificates into one professional PDF for job applications. Free, no watermark, and ready to submit in seconds.',
    h1: 'Merge PDF for Job Application',
  },
  {
    route: '/combine-cv-and-certificates-pdf',
    title: 'Combine CV and Certificates into One PDF — Free | DOSIBridge',
    description: 'Merge your CV, certificates, diplomas, and credentials into a single professional PDF. Free, no watermark, perfect for job applications.',
    h1: 'Combine CV and Certificates into One PDF',
  },
  {
    route: '/merge-university-documents-pdf',
    title: 'Merge University Documents PDF — Transcripts, Certificates, Applications | DOSIBridge',
    description: 'Combine university transcripts, degree certificates, recommendation letters, and application forms into one PDF. Free, secure, and ready for submission.',
    h1: 'Merge University Documents into One PDF',
  },
  {
    route: '/merge-scanned-documents-pdf',
    title: 'Merge Scanned Documents into One PDF — Free | DOSIBridge',
    description: 'Combine scanned documents, receipts, and paper forms into a single PDF. Upload scanned pages, remove blanks, reorder, and download one clean file.',
    h1: 'Merge Scanned Documents into One PDF',
  },
  {
    route: '/compress-pdf',
    title: 'Compress PDF — Reduce PDF File Size Online Free | DOSIBridge',
    description: 'Reduce PDF file size without losing quality. Free online PDF compressor — no signup, no watermark.',
    h1: 'Compress PDF Online',
  },
  {
    route: '/split-pdf',
    title: 'Split PDF — Extract Pages from PDF Online Free | DOSIBridge',
    description: 'Split a PDF into separate files or extract specific pages. Free online PDF splitter — no signup, no watermark.',
    h1: 'Split PDF Online',
  },
  {
    route: '/image-to-pdf',
    title: 'Image to PDF — Convert Images to PDF Online Free | DOSIBridge',
    description: 'Convert JPG, PNG, and other images to PDF format. Combine multiple photos into one PDF. Free online.',
    h1: 'Image to PDF Converter',
  },
  {
    route: '/reorder-pdf',
    title: 'Reorder PDF Pages — Rearrange PDF Online Free | DOSIBridge',
    description: 'Rearrange pages in a PDF document. Enter your desired page order and download the reordered PDF. Free, no signup.',
    h1: 'Reorder PDF Pages',
  },
  {
    route: '/delete-pdf-pages',
    title: 'Delete PDF Pages — Remove Pages from PDF Online Free | DOSIBridge',
    description: 'Remove unwanted pages from a PDF document. Free online PDF page remover — no signup, no watermark.',
    h1: 'Delete Pages from PDF',
  },
  {
    route: '/blog/how-to-merge-pdf-files-online',
    title: 'How to Merge PDF Files Online — Step-by-Step Guide | DOSIBridge',
    description: 'Learn how to merge PDF files into one document. Step-by-step guide covering free online tools, desktop methods, and mobile options.',
    h1: 'How to Merge PDF Files Online',
  },
  {
    route: '/blog/how-to-combine-cv-certificates-into-one-pdf',
    title: 'How to Combine CV and Certificates into One PDF — Guide | DOSIBridge',
    description: 'Step-by-step guide to merging your CV, certificates, and diplomas into one professional PDF for job applications.',
    h1: 'How to Combine CV and Certificates into One PDF',
  },
  {
    route: '/blog/how-to-merge-pdf-on-mobile',
    title: 'How to Merge PDF on Mobile — iPhone & Android Guide | DOSIBridge',
    description: 'Step-by-step guide to merging PDF files on your iPhone or Android phone. No app needed — use your browser to combine PDFs in under a minute.',
    h1: 'How to Merge PDF on Mobile',
  },
  {
    route: '/blog/how-to-reorder-pdf-before-merging',
    title: 'How to Reorder PDF Pages Before Merging — Free Guide | DOSIBridge',
    description: 'Learn how to rearrange PDF pages before merging them. Drag-and-drop page reordering, cross-file interleaving, and page removal.',
    h1: 'How to Reorder PDF Pages Before Merging',
  },
];

const toolLinks = [
  ['/', 'PDF Joiner Home'],
  ['/merge-pdf', 'Merge PDF'],
  ['/merge-pdf-online-free', 'Free PDF Merger'],
  ['/merge-pdf-no-watermark', 'No-watermark PDF merger'],
  ['/merge-pdf-on-mobile', 'Merge PDF on mobile'],
  ['/merge-pdf-for-job-application', 'Job application PDFs'],
  ['/combine-cv-and-certificates-pdf', 'CV and certificates PDF'],
  ['/reorder-pdf', 'Reorder PDF pages'],
  ['/delete-pdf-pages', 'Delete PDF pages'],
  ['/compress-pdf', 'Compress PDF'],
  ['/split-pdf', 'Split PDF'],
  ['/image-to-pdf', 'Image to PDF'],
];

const blogLinks = [
  ['/blog/how-to-merge-pdf-files-online', 'How to merge PDF files online'],
  ['/blog/how-to-combine-cv-certificates-into-one-pdf', 'Combine CV and certificates into one PDF'],
  ['/blog/how-to-merge-pdf-on-mobile', 'Merge PDF on iPhone and Android'],
  ['/blog/how-to-reorder-pdf-before-merging', 'Reorder PDF pages before merging'],
];

const blogCopy = {
  '/blog/how-to-merge-pdf-files-online': [
    ['Fastest method: merge PDFs online', 'Open the DOSIBridge merge tool, upload the PDF files, choose the pages you want to keep, reorder them, and download one clean PDF. This is usually faster than installing desktop software because it works directly in Chrome, Edge, Firefox, Safari, and mobile browsers.'],
    ['Mac, Windows, and mobile options', 'Mac users can use Preview for small jobs, but it is limited for batch uploads and page selection. Windows does not include a built-in PDF merger, so a browser-based tool is often the simplest option. Mobile users can pick files from local storage, Google Drive, iCloud, Dropbox, or OneDrive.'],
    ['Quality checklist before downloading', 'Check page order, remove blank pages from scans, use a descriptive filename, and add page numbers or password protection when the document is long or sensitive. For job applications, keep the CV first and place supporting documents after it.'],
  ],
  '/blog/how-to-combine-cv-certificates-into-one-pdf': [
    ['Why one application PDF is better', 'Sending a single merged PDF is easier for HR teams to review than many separate attachments. It also avoids missing files in email threads and works better when a job portal only provides one upload field.'],
    ['Recommended order', 'Place the CV or resume first, then the most relevant professional certificates, then academic certificates, language certificates, and older supporting credentials. Remove irrelevant certificates so the final document looks focused.'],
    ['Before submitting', 'Use readable scans, remove blank backs of scanned pages, name the file with your name and role, and verify the merged document opens correctly on phone and desktop before uploading it to the employer portal.'],
  ],
  '/blog/how-to-merge-pdf-on-mobile': [
    ['Merge PDFs on iPhone', 'Open Safari or Chrome, choose the upload area, select PDFs from Files, iCloud Drive, Google Drive, Dropbox, or OneDrive, then reorder pages using touch controls. After merging, save the final PDF to Downloads or Files.'],
    ['Merge PDFs on Android', 'Open Chrome, upload PDFs from the Android file picker or cloud apps, preview pages, remove unnecessary pages, reorder with drag-and-drop, and download the combined document. No app installation or subscription is needed.'],
    ['Mobile tips', 'Use Wi-Fi for large files, rotate tablets to landscape for more page preview space, and add the site to your home screen if you merge documents often. The tool works as a browser-based PDF workflow.'],
  ],
  '/blog/how-to-reorder-pdf-before-merging': [
    ['Why page order matters', 'Merged PDFs are easier to read when pages follow the reviewer’s workflow. Put cover pages, CVs, invoices, or forms in the correct order before generating the final document.'],
    ['How to reorder', 'Upload the PDFs, select the pages to include, drag pages into the desired order, remove duplicates or blanks, and then merge. Cross-file ordering lets you place pages from different PDFs exactly where they belong.'],
    ['Final review', 'Preview the first and last pages, verify page numbers, check that scanned pages are upright, and use a clear filename before sharing the merged PDF.'],
  ],
};

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

function renderLinks(items) {
  return items
    .map(([path, label]) => `<li><a href="${BASE_URL}${path === '/' ? '/' : path}">${escapeHtml(label)}</a></li>`)
    .join('\n');
}

function renderStaticFallback(page) {
  const sections = blogCopy[page.route] || [
    ['Free browser-based PDF workflow', `${page.description} DOSIBridge works in the browser, so users can combine, reorder, split, compress, convert, and clean up documents without creating an account.`],
    ['Useful document tasks', 'Common workflows include combining job application files, merging university documents, cleaning scanned files, rearranging pages, removing blank pages, and creating one organized PDF for email or upload portals.'],
    ['Privacy and convenience', 'The tool is designed for quick document handling with no signup and no watermark. It works on desktop and mobile browsers, including Windows, Mac, Linux, Chromebook, iPhone, iPad, and Android.'],
  ];

  return `<div id="root">
    <div class="seo-static-fallback">
      <header>
        <p><a href="${BASE_URL}/">DOSIBridge PDF Joiner</a></p>
        <nav aria-label="Primary PDF tools"><ul>${renderLinks(toolLinks)}</ul></nav>
      </header>
      <main>
        <article>
          <h1>${escapeHtml(page.h1)}</h1>
          <p>${escapeHtml(page.description)}</p>
          ${sections.map(([heading, text]) => `<section><h2>${escapeHtml(heading)}</h2><p>${escapeHtml(text)}</p></section>`).join('\n')}
          <section>
            <h2>Related PDF guides</h2>
            <ul>${renderLinks(blogLinks)}</ul>
          </section>
        </article>
      </main>
      <footer>
        <p>DOSIBridge PDF Joiner is a free online PDF tool for merging, reordering, compressing, splitting, and converting documents.</p>
      </footer>
    </div>
  </div>`;
}

function articleSchema(page, canonicalUrl) {
  if (!page.route.startsWith('/blog/')) return '';

  return `<script type="application/ld+json">
${JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: page.h1,
    description: page.description,
    url: canonicalUrl,
    mainEntityOfPage: canonicalUrl,
    author: { '@type': 'Organization', name: 'DOSIBridge' },
    publisher: { '@type': 'Organization', name: 'DOSIBridge' },
    dateModified: new Date().toISOString().slice(0, 10),
  }, null, 2)}
    </script>`;
}

function generatePage(templateHtml, page) {
  const canonicalUrl = `${BASE_URL}${page.route === '/' ? '/' : page.route}`;
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

  // Remove meta keywords tag (Google ignores it)
  html = html.replace(/<meta name="keywords" content="[^"]*"\s*\/?>/, '');

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

  // Add raw Article schema for blog pages before the closing head.
  html = html.replace('</head>', `${articleSchema(page, canonicalUrl)}\n  </head>`);

  // Replace noscript with page-specific H1, description, and links.
  html = html.replace(
    /<noscript>[\s\S]*?<\/noscript>/,
    `<noscript>
      <div style="padding: 2rem; font-family: system-ui, sans-serif; max-width: 760px; margin: auto;">
        <h1>${escapeHtml(page.h1)}</h1>
        <p>${escapeHtml(page.description)}</p>
        <p><a href="${BASE_URL}/">Back to DOSIBridge PDF Joiner</a></p>
        <ul>${renderLinks(blogLinks)}</ul>
      </div>
    </noscript>`
  );

  // Vite serves an empty SPA root by default. Add crawlable static HTML into
  // the initial document; React replaces it after JS loads. This gives Google
  // meaningful content and internal links even before the rendering queue runs.
  html = html.replace(/<div id="root"><\/div>/, renderStaticFallback(page));

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

  const homePage = {
    route: '/',
    title: 'Merge PDF Online Free — No Signup, No Watermark, Unlimited | DOSIBridge',
    description: 'Merge PDFs online for free. Reorder pages, combine CVs, certificates, scanned files, and documents. No signup, no watermark, unlimited, works on mobile.',
    h1: 'DOSIBridge PDF Joiner',
  };

  writeFileSync(templatePath, generatePage(templateHtml, homePage), 'utf-8');
  generated++;

  for (const page of pages) {
    const html = generatePage(templateHtml, page);
    const routeDir = join(DIST, page.route);
    const outputPath = join(routeDir, 'index.html');

    mkdirSync(routeDir, { recursive: true });
    writeFileSync(outputPath, html, 'utf-8');
    generated++;
  }

  const sitemapPath = join(DIST, 'sitemap.xml');
  if (existsSync(sitemapPath)) {
    const today = new Date().toISOString().slice(0, 10);
    const sitemap = readFileSync(sitemapPath, 'utf-8').replace(
      /<lastmod>[^<]+<\/lastmod>/g,
      `<lastmod>${today}</lastmod>`
    );
    writeFileSync(sitemapPath, sitemap, 'utf-8');
  }

  console.log(`Generated ${generated} static HTML files for SEO.`);
}

main();
