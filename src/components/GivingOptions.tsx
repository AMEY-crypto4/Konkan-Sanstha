import { Link } from 'react-router-dom';
import type { GivingGroup } from '../content/types';
import { formatINR } from '../lib/format';

/**
 * Each option links to the concept donate page with the amount filled in.
 * In production the same link would carry the programme or campaign code to the payment gateway.
 */
export function GivingOptions({ groups, source }: { groups: GivingGroup[]; source: string }) {
  return (
    <div className="give-groups">
      {groups.map((g) => (
        <section className="give-group" key={g.title} aria-label={g.title}>
          <h3>{g.title}</h3>
          {g.note ? <p>{g.note}</p> : null}
          <ul className="give-opts">
            {g.options.map((o, i) => (
              <li key={`${o.label}-${o.amount}-${i}`}>
                <Link className="give-opt" to={`/donate?amount=${o.amount}&for=${encodeURIComponent(source)}`}>
                  <b>{o.label}</b>
                  {o.detail ? <small>{o.detail}</small> : null}
                  <span className="amt">
                    {formatINR(o.amount)}
                    {o.cadence ? <small> {o.cadence}</small> : null}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
