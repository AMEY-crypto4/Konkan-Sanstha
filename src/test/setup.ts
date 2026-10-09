import '@testing-library/jest-dom/vitest';

// jsdom has no IntersectionObserver or matchMedia; provide minimal stand-ins.
class IO {
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() { return []; }
}
(globalThis as any).IntersectionObserver = IO;

if (!window.matchMedia) {
  (window as any).matchMedia = (query: string) => ({
    matches: query.includes('prefers-reduced-motion'),
    media: query,
    onchange: null,
    addEventListener() {},
    removeEventListener() {},
    addListener() {},
    removeListener() {},
    dispatchEvent() { return false; },
  });
}
window.scrollTo = (() => {}) as any;
