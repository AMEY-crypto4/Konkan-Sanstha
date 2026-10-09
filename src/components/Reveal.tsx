import type { CSSProperties, ElementType, ReactNode } from 'react';
import { useReveal } from '../lib/useReveal';

type Props = { as?: ElementType; className?: string; delay?: number; children: ReactNode };

/** Fades content in the first time it scrolls into view. Content is visible without JavaScript. */
export function Reveal({ as: Tag = 'div', className = '', delay = 0, children }: Props) {
  const ref = useReveal<HTMLElement>();
  return (
    <Tag ref={ref} className={`reveal ${className}`.trim()} style={{ '--i': delay } as CSSProperties}>
      {children}
    </Tag>
  );
}
