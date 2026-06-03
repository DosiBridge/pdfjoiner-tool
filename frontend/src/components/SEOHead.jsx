import { useEffect } from 'react';

const BASE_URL = 'https://pdfjoiner.dosibridge.com';

function SEOHead({ title, description, path = '/', keywords }) {
  useEffect(() => {
    document.title = title;

    const setMeta = (attr, attrValue, content) => {
      let el = document.querySelector(`meta[${attr}="${attrValue}"]`);
      if (el) {
        el.setAttribute('content', content);
      }
    };

    const canonicalUrl = `${BASE_URL}${path === '/' ? '/' : path}`;

    setMeta('name', 'description', description);
    if (keywords) {
      setMeta('name', 'keywords', keywords);
    }

    // Update canonical
    let canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute('href', canonicalUrl);
    }

    // Open Graph
    setMeta('property', 'og:title', title);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:url', canonicalUrl);

    // Twitter
    setMeta('name', 'twitter:title', title);
    setMeta('name', 'twitter:description', description);
  }, [title, description, path, keywords]);

  return null;
}

export default SEOHead;
