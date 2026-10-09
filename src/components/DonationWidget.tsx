import { useId, useMemo, useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertCircle, ArrowRight, CheckCircle2, Lightbulb } from 'lucide-react';
import { CONCEPT, GIVING } from '../content/org';
import { UNIT_COSTS } from '../content/impact';
import { equivalents, parseAmount, unitPhrase, validateAmount } from '../lib/calc';
import { formatINR, formatNumber } from '../lib/format';
import { Button, ButtonA } from './Button';

export type GiveMode = 'once' | 'monthly';

type Props = {
  /** `card` sits in the hero and hands off to /donate. `page` reviews the gift in place. */
  variant?: 'card' | 'page';
  initialAmount?: number | null;
  initialMode?: GiveMode;
  forLabel?: string;
  headingLevel?: 2 | 3;
};

/** Plain-language line for what a gift can fund. Uses at most two items, most units first. */
export function impactLine(amount: number | null): string | null {
  if (amount === null) return null;
  const eq = equivalents(amount, UNIT_COSTS).slice(0, 2);
  if (eq.length === 0) return null;
  return eq.map((e) => `${formatNumber(e.count)} ${unitPhrase(e.item, e.count)}`).join(' or ');
}

export function DonationWidget({ variant = 'card', initialAmount = null, initialMode = 'once', forLabel, headingLevel = 2 }: Props) {
  const uid = useId();
  const navigate = useNavigate();
  const presets = GIVING.presets as readonly number[];
  const isPreset = initialAmount !== null && presets.includes(initialAmount);
  const [mode, setMode] = useState<GiveMode>(initialMode);
  const [choice, setChoice] = useState<number | 'custom'>(initialAmount === null ? 1000 : isPreset ? initialAmount : 'custom');
  const [custom, setCustom] = useState(initialAmount !== null && !isPreset ? String(initialAmount) : '');
  const [touched, setTouched] = useState(false);
  const [reviewed, setReviewed] = useState(false);

  const amount = choice === 'custom' ? parseAmount(custom) : choice;
  const error = choice === 'custom' && (touched || custom !== '') ? validateAmount({ amount, minimum: GIVING.minCustomAmount }) : null;
  const valid = choice !== 'custom' || validateAmount({ amount, minimum: GIVING.minCustomAmount }) === null;
  const line = useMemo(() => (valid ? impactLine(amount) : null), [amount, valid]);
  const H = `h${headingLevel}` as 'h2' | 'h3';

  const submit = (e: FormEvent) => {
    e.preventDefault();
    setTouched(true);
    if (!valid || amount === null) return;
    if (variant === 'card') {
      navigate(`/donate?amount=${amount}&mode=${mode}`);
    } else {
      setReviewed(true);
    }
  };

  const errId = `${uid}-err`;

  return (
    <form className="give-card" onSubmit={submit} noValidate aria-labelledby={`${uid}-title`}>
      <H id={`${uid}-title`}>{variant === 'card' ? 'Give today' : 'Choose your gift'}</H>
      <p className="sub">{forLabel ? `Supporting: ${forLabel}` : 'Every rupee goes to the work you pick. Change it any time.'}</p>

      <fieldset style={{ border: 0, padding: 0, margin: 0, minWidth: 0 }}>
        <legend className="sr-only">Frequency</legend>
        <div className="seg">
          {(['once', 'monthly'] as const).map((m) => (
            <label key={m}>
              <input type="radio" name={`${uid}-mode`} value={m} checked={mode === m} onChange={() => { setMode(m); setReviewed(false); }} />
              <span>{m === 'once' ? 'Give once' : 'Give monthly'}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset style={{ border: 0, padding: 0, margin: 0, minWidth: 0 }}>
        <legend className="sr-only">Amount</legend>
        <div className="amounts four">
          {presets.map((p) => (
            <label key={p}>
              <input type="radio" name={`${uid}-amt`} value={p} checked={choice === p} onChange={() => { setChoice(p); setReviewed(false); }} />
              <span>{formatINR(p)}</span>
            </label>
          ))}
        </div>
        <div className="amounts" style={{ marginTop: 10 }}>
          <label style={{ gridColumn: '1 / -1' }}>
            <input type="radio" name={`${uid}-amt`} value="custom" checked={choice === 'custom'} onChange={() => { setChoice('custom'); setReviewed(false); }} />
            <span>Another amount</span>
          </label>
        </div>
      </fieldset>

      {choice === 'custom' ? (
        <div className="field">
          <label htmlFor={`${uid}-custom`}>Amount in rupees</label>
          <div className="input-affix">
            <span aria-hidden="true">₹</span>
            <input
              id={`${uid}-custom`}
              className="input"
              inputMode="numeric"
              autoComplete="off"
              placeholder={`${GIVING.minCustomAmount} or more`}
              value={custom}
              aria-invalid={error ? true : undefined}
              aria-describedby={error ? errId : `${uid}-help`}
              onChange={(e) => { setCustom(e.target.value); setReviewed(false); }}
              onBlur={() => setTouched(true)}
            />
          </div>
          {error ? (
            <p className="error" id={errId} role="alert">
              <AlertCircle aria-hidden="true" /> {error}
            </p>
          ) : (
            <p className="help" id={`${uid}-help`}>
              Minimum {formatINR(GIVING.minCustomAmount)}.
            </p>
          )}
        </div>
      ) : null}

      <p className="give-impact" aria-live="polite">
        <Lightbulb aria-hidden="true" />
        <span>
          {line ? (
            <>
              <b>{formatINR(amount ?? 0)}</b> could fund roughly {line}.
            </>
          ) : (
            'Choose an amount to see what it could fund.'
          )}
        </span>
      </p>

      <Button type="submit" variant="primary" size="lg">
        {variant === 'card' ? 'Continue' : 'Review my gift'} <ArrowRight aria-hidden="true" />
      </Button>
      <p className="fine">{mode === 'monthly' ? GIVING.recurringNote : GIVING.taxNote}</p>

      {variant === 'page' && reviewed && amount !== null ? (
        <div className="notice info" role="status" style={{ marginTop: 18, display: 'grid' }}>
          <p style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <CheckCircle2 aria-hidden="true" style={{ width: 22, height: 22, color: 'var(--leaf-600)' }} />
            <b>
              {formatINR(amount)} {mode === 'monthly' ? 'every month' : 'one time'}
            </b>
          </p>
          <p>
            This is a concept, so no payment is taken and nothing is stored. On the official site you would be asked for the details a receipt
            needs. {GIVING.taxNote}
          </p>
          <ButtonA href={CONCEPT.officialSite} target="_blank" rel="noopener noreferrer" variant="secondary">
            Continue on the official website <span className="sr-only">(opens in a new tab)</span>
          </ButtonA>
        </div>
      ) : null}
    </form>
  );
}
