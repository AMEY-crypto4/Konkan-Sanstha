import { AlertTriangle, Info, ShieldAlert } from 'lucide-react';
import type { ReactNode } from 'react';
import { CAUTION, CONCEPT } from '../content/org';
import { ExternalLink } from './Button';

export function CautionNotice() {
  return (
    <aside className="notice warn" aria-label="Safety notice">
      <ShieldAlert aria-hidden="true" />
      <p>{CAUTION}</p>
    </aside>
  );
}

export function ConceptNote({ children }: { children?: ReactNode }) {
  return (
    <aside className="notice info" aria-label="Concept notice">
      <Info aria-hidden="true" />
      <p>
        {children ?? (
          <>
            <b>Concept only.</b> Nothing on this page is sent or stored. To give, use{' '}
            <ExternalLink href={CONCEPT.officialSite}>the official website</ExternalLink>.
          </>
        )}
      </p>
    </aside>
  );
}

/** Honest placeholder for places where the original site is empty or thin. */
export function ContentGap({ children }: { children: ReactNode }) {
  return (
    <aside className="notice todo" aria-label="Content needed">
      <AlertTriangle aria-hidden="true" color="var(--saffron-600)" />
      <p>
        <b>Content needed. </b>
        {children}
      </p>
    </aside>
  );
}
