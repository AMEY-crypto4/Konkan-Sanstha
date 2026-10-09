import { useId, useState, type ReactNode } from 'react';
import { Plus } from 'lucide-react';

export type AccItem = { id?: string; title: string; body: ReactNode };

/** Single-open disclosure list. Buttons are real <button>s inside headings, as the APG pattern asks. */
export function Accordion({ items, headingLevel = 3, defaultOpen = 0 }: { items: AccItem[]; headingLevel?: 3 | 4; defaultOpen?: number | null }) {
  const [open, setOpen] = useState<number | null>(defaultOpen);
  const base = useId();
  const H = `h${headingLevel}` as 'h3' | 'h4';
  return (
    <div className="acc">
      {items.map((it, i) => {
        const isOpen = open === i;
        const bid = `${base}-b${i}`;
        const pid = `${base}-p${i}`;
        return (
          <div className="acc-item" key={it.id ?? it.title}>
            <H>
              <button type="button" id={bid} className="acc-btn" aria-expanded={isOpen} aria-controls={pid} onClick={() => setOpen(isOpen ? null : i)}>
                <span>{it.title}</span>
                <Plus aria-hidden="true" />
              </button>
            </H>
            <div id={pid} role="region" aria-labelledby={bid} className={`acc-panel${isOpen ? ' open' : ''}`}
              aria-hidden={!isOpen}
              {...(!isOpen ? ({ inert: '' } as object) : {})}
            >
              <div>
                <div className="inner">{it.body}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
