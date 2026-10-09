import type { TimelineEntry } from '../content/about';

export function Timeline({ entries, wide = false }: { entries: TimelineEntry[]; wide?: boolean }) {
  return (
    <ol className={`timeline${wide ? ' wide' : ''}`}>
      {entries.map((e) => (
        <li key={e.when + e.title} className={`tl-item${e.when === '2030' ? ' goal' : ''}`}>
          <div className="tl-when">{e.when}</div>
          <h3>{e.title}</h3>
          <p>{e.body}</p>
        </li>
      ))}
    </ol>
  );
}
