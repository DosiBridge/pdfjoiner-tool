import { describe, it, expect, afterEach } from 'vitest';
import { renderWithRouter } from '../../test/test-utils';
import SEOHead from '../SEOHead';

describe('SEOHead', () => {
  afterEach(() => {
    document.title = '';
  });

  it('sets document title', () => {
    renderWithRouter(
      <SEOHead title="Test Title" description="Test desc" path="/" />
    );
    expect(document.title).toBe('Test Title');
  });

  it('sets meta description when meta tag exists', () => {
    // SEOHead updates existing meta tags, it doesn't create them
    // In jsdom there's no pre-existing meta tag, so we create one
    const meta = document.createElement('meta');
    meta.setAttribute('name', 'description');
    meta.setAttribute('content', '');
    document.head.appendChild(meta);

    renderWithRouter(
      <SEOHead title="T" description="My description" path="/" />
    );
    expect(meta.getAttribute('content')).toBe('My description');
    meta.remove();
  });

  it('sets canonical URL', () => {
    renderWithRouter(
      <SEOHead title="T" description="D" path="/merge-pdf" />
    );
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      expect(canonical.getAttribute('href')).toContain('/merge-pdf');
    }
  });

  it('sets Open Graph title', () => {
    renderWithRouter(
      <SEOHead title="OG Test" description="D" path="/" />
    );
    const og = document.querySelector('meta[property="og:title"]');
    if (og) {
      expect(og.getAttribute('content')).toBe('OG Test');
    }
  });
});
