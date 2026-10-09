import { useId, useState } from 'react';
import { UNIT_COSTS } from '../content/impact';
import { equivalents, parseAmount, unitPhrase, validateAmount } from '../lib/calc';
import { formatINR, formatNumber } from '../lib/format';
import { GIVING } from '../content/org';
import { AlertCircle } from 'lucide-react';

const QUICK = [500, 1000, 5000, 10000, 25000];

export function ImpactCalculator({ initial = 2500 }: { initial?: number }) {
  const uid = useId();
  const [raw, setRaw] = useState(String(initial));
  const amount = parseAmount(raw);
  const error = validateAmount({ amount, minimum: 1 });
  const results = error || amount === null ? [] : equivalents(amount, UNIT_COSTS).slice(0, 6);

  return (
    <div className="calc">
      <div className="calc-panel">
        <label htmlFor={`${uid}-amt`} style={{ fontWeight: 650, color: 'var(--ink)', display: 'block', marginBottom: 8 }}>
          If you gave
        </label>
        <div className="input-affix">
          <span aria-hidden="true">₹</span>
          <input
            id={`${uid}-amt`}
            className="input"
            inputMode="numeric"
            autoComplete="off"
            value={raw}
            aria-invalid={error ? true : undefined}
            aria-describedby={`${uid}-hint`}
            onChange={(e) => setRaw(e.target.value)}
            style={{ fontSize: '1.4rem', fontWeight: 650, minHeight: 60 }}
          />
        </div>
        <ul className="chips" style={{ marginTop: 14 }} aria-label="Quick amounts">
          {QUICK.map((q) => (
            <li key={q}>
              <button type="button" className="chip" aria-pressed={amount === q} onClick={() => setRaw(String(q))}>
                {formatINR(q)}
              </button>
            </li>
          ))}
        </ul>
        <p id={`${uid}-hint`} className="help" style={{ marginTop: 14 }}>
          {error ? (
            <span className="error">
              <AlertCircle aria-hidden="true" /> {error}
            </span>
          ) : (
            <>Gifts on the donate page start at {formatINR(GIVING.minCustomAmount)}. This calculator is only a guide.</>
          )}
        </p>
      </div>

      <div>
        <h3 style={{ marginBottom: 14 }}>It could fund roughly</h3>
        {results.length ? (
          <ul className="calc-result" aria-live="polite">
            {results.map(({ item, count }) => (
              <li key={item.id}>
                <span className="count">{formatNumber(count)}</span>
                <span className="what">
                  {unitPhrase(item, count)}
                  <small>
                    {formatINR(item.cost)} each · {item.source}
                  </small>
                </span>
                <span className={`badge ${item.basis}`} title={item.basis === 'derived' ? 'Worked out from the published packages' : 'Printed on the original site'}>
                  {item.basis === 'derived' ? 'Worked out' : 'Published'}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="empty" aria-live="polite">
            {error ? 'Enter a valid amount to see examples.' : 'This amount is below the smallest unit cost. Try a larger amount.'}
          </p>
        )}
        <p className="fine" style={{ marginTop: 14 }}>
          “Published” costs are printed on the original site. “Worked out” costs are divided from its package prices (for example 150 meals for
          ₹6,000). Actual spend depends on the programme and the season.
        </p>
      </div>
    </div>
  );
}
