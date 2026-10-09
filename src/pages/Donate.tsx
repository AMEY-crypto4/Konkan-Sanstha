import { useSearchParams, Link } from 'react-router-dom';
import { CalendarHeart, ReceiptText, ShieldCheck } from 'lucide-react';
import { PageHero } from '../components/PageHero';
import { DonationWidget, type GiveMode } from '../components/DonationWidget';
import { CautionNotice, ConceptNote } from '../components/Notices';
import { GIVING } from '../content/org';
import { PROGRAMS } from '../content/programs';
import { parseAmount } from '../lib/calc';
import { usePageMeta } from '../lib/usePageMeta';

export default function Donate() {
  usePageMeta('Donate', 'Choose a gift amount and see what it could fund.');
  const [params] = useSearchParams();
  const amount = parseAmount(params.get('amount') ?? '');
  const mode: GiveMode = params.get('mode') === 'monthly' ? 'monthly' : 'once';
  const forLabel = (params.get('for') ?? '').slice(0, 80) || undefined;

  return (
    <>
      <PageHero title="Donate" eyebrow="Give" crumbs={[{ label: 'Donate' }]} lead="Choose an amount, see what it could fund, then review your gift." />
      <section className="section tight">
        <div className="container split-2 wide-left sticky">
          <div style={{ display: 'grid', gap: 28 }}>
            <ConceptNote />
            <DonationWidget key={params.toString()} variant="page" initialAmount={amount} initialMode={mode} forLabel={forLabel} />
          </div>
          <aside style={{ display: 'grid', gap: 18 }} aria-label="About giving">
            <div className="way">
              <ReceiptText aria-hidden="true" color="var(--indigo-700)" />
              <h2 style={{ fontSize: '1.25rem' }}>Tax benefit</h2>
              <p>{GIVING.taxNote}</p>
            </div>
            <div className="way">
              <CalendarHeart aria-hidden="true" color="var(--indigo-700)" />
              <h2 style={{ fontSize: '1.25rem' }}>Monthly giving</h2>
              <p>{GIVING.recurringNote}</p>
            </div>
            <div className="way">
              <ShieldCheck aria-hidden="true" color="var(--indigo-700)" />
              <h2 style={{ fontSize: '1.25rem' }}>Where it goes</h2>
              <p>
                Pick a programme to read about it first. There are {PROGRAMS.length} to choose from.{' '}
                <Link to="/programs">Browse programmes</Link>
              </p>
            </div>
            <CautionNotice />
          </aside>
        </div>
      </section>
    </>
  );
}
