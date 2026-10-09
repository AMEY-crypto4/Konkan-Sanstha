import { OFFICES } from '../content/org';
import { MapPin } from 'lucide-react';

export function OfficeCards() {
  return (
    <div className="offices">
      {OFFICES.map((o, i) => (
        <article key={o.city} className={`office${i === 0 ? ' primary' : ''}`}>
          <span className="area">{o.area}</span>
          <h3>{o.city}</h3>
          <address>
            <MapPin aria-hidden="true" size={16} style={{ display: 'inline', verticalAlign: '-2px', marginRight: 6 }} />
            {o.address}
          </address>
        </article>
      ))}
    </div>
  );
}
