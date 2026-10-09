import type { DataTable } from '../content/types';
import { formatINR, formatNumber } from '../lib/format';

/** Accessible table: caption, column + row headers, horizontally scrollable on small screens. */
export function DataTableView({ table }: { table: DataTable }) {
  const fmt = (v: string | number) => (typeof v === 'number' ? (table.money ? formatINR(v) : formatNumber(v)) : v);
  return (
    <div>
      {/* tabIndex lets keyboard users scroll a wide table */}
      <div className="table-wrap" role="region" aria-label={`${table.title} (scrollable)`} tabIndex={0}>
        <table className="data">
          <caption>{table.title}</caption>
          <thead>
            <tr>
              {table.columns.map((c, i) => (
                <th key={c} scope="col" className={i > 0 && typeof table.rows[0]?.[i] === 'number' ? 'num' : undefined}>
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {table.rows.map((row, r) => (
              <tr key={r}>
                {row.map((cell, i) =>
                  i === 0 ? (
                    <th key={i} scope="row">
                      {fmt(cell)}
                    </th>
                  ) : (
                    <td key={i} className={typeof cell === 'number' ? 'num' : undefined}>
                      {fmt(cell)}
                    </td>
                  ),
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {table.note ? <p className="table-note">{table.note}</p> : null}
    </div>
  );
}
