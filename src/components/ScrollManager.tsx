import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * On route changes: scroll to the top (or to the #hash target) and move focus to <main>,
 * so keyboard and screen-reader users land at the start of the new page, not where the old link was.
 */
export function ScrollManager() {
  const { pathname, hash } = useLocation();
  const first = useRef(true);
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1));
      if (el) {
        el.scrollIntoView();
        return;
      }
    }
    window.scrollTo(0, 0);
    if (first.current) {
      first.current = false;
      return;
    }
    const main = document.getElementById('main');
    main?.focus({ preventScroll: true });
  }, [pathname, hash]);
  return null;
}
