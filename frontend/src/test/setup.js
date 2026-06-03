import '@testing-library/jest-dom/vitest';

// Mock window.scrollTo for jsdom
window.scrollTo = () => {};
