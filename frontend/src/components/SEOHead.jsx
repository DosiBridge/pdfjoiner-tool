import { useEffect } from 'react';

const BASE_URL = 'https://pdfjoiner.dosibridge.com';

function SEOHead({ title, description, path = '/', faqItems, noindex = false }) {
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

    setMeta('name', 'robots', noindex
      ? 'noindex, nofollow'
      : 'index, follow'
    );

    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute('href', canonicalUrl);
    }

    setMeta('property', 'og:title', title);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:url', canonicalUrl);

    setMeta('name', 'twitter:title', title);
    setMeta('name', 'twitter:description', description);

    // FAQ structured data
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
  }, [title, description, path, faqItems]);

  return null;
}

export default SEOHead;
