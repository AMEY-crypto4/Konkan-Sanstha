import { useId, useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import { ALL_ROLES, DEPARTMENTS } from '../content/careers';
import { filterRoles } from '../lib/roles';
import { CONTACT } from '../content/org';

export function RoleBrowser() {
  const uid = useId();
  const [query, setQuery] = useState('');
  const [dept, setDept] = useState<string>('all');
  const results = useMemo(() => filterRoles(ALL_ROLES, query, dept), [query, dept]);

  return (
    <div>
      <div className="roles-toolbar">
        <div className="field">
          <label htmlFor={`${uid}-q`}>Search roles</label>
          <div className="input-affix">
            <span aria-hidden="true" style={{ display: 'grid', placeItems: 'center' }}>
              <Search size={18} />
            </span>
            <input
              id={`${uid}-q`}
              type="search"
              className="input"
              placeholder="Try “developer”, “fundraising” or “video”"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoComplete="off"
            />
          </div>
        </div>
        <div role="group" aria-label="Filter by department" className="chips">
          <button type="button" className="chip" aria-pressed={dept === 'all'} onClick={() => setDept('all')}>
            All ({ALL_ROLES.length})
          </button>
          {DEPARTMENTS.map((d) => (
            <button key={d.id} type="button" className="chip" aria-pressed={dept === d.id} onClick={() => setDept(d.id)}>
              {d.name} ({d.roles.length})
            </button>
          ))}
        </div>
        <p className="roles-count" role="status" aria-live="polite">
          Showing {results.length} of {ALL_ROLES.length} role types
        </p>
      </div>

      {results.length === 0 ? (
        <p className="empty">No role types match. Try a shorter search or choose “All”.</p>
      ) : (
        <ul className="role-list">
          {results.map((r) => (
            <li key={r.id} className="role">
              <span>
                <b>{r.title}</b>
                <small>{r.department}</small>
              </span>
              <a
                className="btn btn-ghost btn-sm"
                href={`mailto:${CONTACT.emails.general}?subject=${encodeURIComponent(`Enquiry: ${r.title}`)}`}
                aria-label={`Ask about ${r.title}`}
              >
                Ask
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
