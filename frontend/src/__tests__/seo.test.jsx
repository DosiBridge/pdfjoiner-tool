import { describe, it, expect, vi } from 'vitest';
import { renderWithRouter } from '../test/test-utils';
import App from '../App';

vi.mock('../components/PdfTool', () => ({
  default: () => <div data-testid="pdf-tool">PDF Tool</div>,
}));

describe('SEO - Page Metadata', () => {
  const pages = [
    { route: '/', titleContains: 'Merge PDF Online Free' },
    { route: '/merge-pdf', titleContains: 'Merge PDF' },
    { route: '/merge-pdf-online-free', titleContains: 'Merge PDF Online Free' },
    { route: '/merge-pdf-no-watermark', titleContains: 'Watermark' },
    { route: '/merge-pdf-on-mobile', titleContains: 'Mobile' },
    { route: '/merge-pdf-for-job-application', titleContains: 'Job Application' },
    { route: '/combine-cv-and-certificates-pdf', titleContains: 'CV' },
    { route: '/compress-pdf', titleContains: 'Compress' },
    { route: '/split-pdf', titleContains: 'Split' },
    { route: '/image-to-pdf', titleContains: 'Image' },
    { route: '/blog/how-to-merge-pdf-files-online', titleContains: 'How to Merge' },
  ];

  pages.forEach(({ route, titleContains }) => {
    it(`${route} sets title containing "${titleContains}"`, () => {
      renderWithRouter(<App />, { route });
      expect(document.title).toContain(titleContains);
    });
  });

  it('all pages include DOSIBridge in title', () => {
    pages.forEach(({ route }) => {
      renderWithRouter(<App />, { route });
      expect(document.title).toContain('DOSIBridge');
    });
  });
});

describe('SEO - Heading Hierarchy', () => {
  const toolPages = [
    { route: '/', h1: 'Merge PDF Files Online for Free' },
    { route: '/merge-pdf', h1: 'Merge PDF Files Online' },
    { route: '/merge-pdf-on-mobile', h1: 'Merge PDF on Mobile' },
    { route: '/compress-pdf', h1: 'Compress PDF Online' },
  ];

  toolPages.forEach(({ route, h1 }) => {
    it(`${route} has exactly one H1`, () => {
      renderWithRouter(<App />, { route });
      const h1Elements = document.querySelectorAll('h1');
      expect(h1Elements.length).toBe(1);
    });

    it(`${route} H1 matches "${h1}"`, () => {
      renderWithRouter(<App />, { route });
      const h1Element = document.querySelector('h1');
      expect(h1Element.textContent).toBe(h1);
    });
  });
});

describe('SEO - Redirects', () => {
  it('/pdf-joiner redirects to /merge-pdf', () => {
    renderWithRouter(<App />, { route: '/pdf-joiner' });
    expect(document.querySelector('h1').textContent).toBe('Merge PDF Files Online');
  });

  it('/combine-pdf-files redirects to /merge-pdf', () => {
    renderWithRouter(<App />, { route: '/combine-pdf-files' });
    expect(document.querySelector('h1').textContent).toBe('Merge PDF Files Online');
  });

  it('/jpg-to-pdf redirects to /image-to-pdf', () => {
    renderWithRouter(<App />, { route: '/jpg-to-pdf' });
    expect(document.querySelector('h1').textContent).toBe('Image to PDF Converter');
  });
});

describe('SEO - Footer Links', () => {
  it('footer has core tool links', () => {
    renderWithRouter(<App />, { route: '/' });
    const footerLinks = document.querySelectorAll('footer a[href]');
    const hrefs = Array.from(footerLinks).map((a) => a.getAttribute('href'));
    expect(hrefs).toContain('/merge-pdf');
    expect(hrefs).toContain('/compress-pdf');
    expect(hrefs).toContain('https://dosibridge.com');
  });

  it('footer does not have excessive links (max 12)', () => {
    renderWithRouter(<App />, { route: '/' });
    const footerLinks = document.querySelectorAll('footer a[href]');
    expect(footerLinks.length).toBeLessThanOrEqual(12);
  });
});
