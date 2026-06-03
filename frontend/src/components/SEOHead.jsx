import { useEffect } from 'react';

const BASE_URL = 'https://pdfjoiner.dosibridge.com';

function SEOHead({ title, description, path = '/', keywords, faqItems, noindex = false }) {
  useEffect(() => {
    document.title = title;

    const setMeta = (attr, attrValue, content) => {
      const el = document.querySelector(`meta[${attr}="${attrValue}"]`);
      if (el) {
        el.setAttribute('content', content);
      }
    };

    const canonicalUrl = `${BASE_URL}${path === '/' ? '/' : path}`;

    setMeta('name', 'description', description);
    if (keywords) {
      setMeta('name', 'keywords', keywords);
    }

    // Set robots meta for noindex pages
    setMeta('name', 'robots', noindex
      ? 'noindex, nofollow'
      : 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1'
    );

    // Update canonical
    const canonical = document.querySelector('link[rel="canonical"]');
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

    // Inject FAQPage structured data if FAQ items provided
    const existingFaqScript = document.getElementById('faq-structured-data');
    if (existingFaqScript) {
      existingFaqScript.remove();
    }

    if (faqItems && faqItems.length > 0) {
      const faqSchema = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqItems.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.answer,
          },
        })),
      };

      const script = document.createElement('script');
      script.id = 'faq-structured-data';
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(faqSchema);
      document.head.appendChild(script);
    }

    return () => {
      const script = document.getElementById('faq-structured-data');
      if (script) {
        script.remove();
      }
    };
  }, [title, description, path, keywords, faqItems]);

  return null;
}

export default SEOHead;
