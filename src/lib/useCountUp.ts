import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from './useReducedMotion';

/**
 * Counts from 0 to `target` the first time the element scrolls into view.
 * The final value is rendered on first paint, so without JavaScript, with reduced motion,
 * or in a screenshot the number is never shown as 0.
 */
export function useCountUp<T extends HTMLElement>(target: number, durationMs = 1400) {
  const ref = useRef<T | null>(null);
  const reduced = useReducedMotion();
  const [value, setValue] = useState(target);
  const started = useRef(false);

  useEffect(() => {
    setValue(target);
    started.current = false;
  }, [target]);

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced || typeof IntersectionObserver === 'undefined') return;
    let raf = 0;
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting) || started.current) return;
        started.current = true;
        io.disconnect();
        const t0 = performance.now();
        const tick = (now: number) => {
          const p = Math.min(1, (now - t0) / durationMs);
          const eased = 1 - Math.pow(1 - p, 3);
          setValue(Math.round(target * eased));
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        setValue(0);
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [target, durationMs, reduced]);

  return { ref, value };
}
