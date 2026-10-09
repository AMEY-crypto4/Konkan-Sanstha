import type { CSSProperties } from 'react';
import { useCountUp } from '../lib/useCountUp';
import { formatNumber } from '../lib/format';
import type { Stat } from '../content/types';

export function CountUp({ value, prefix = '', suffix = '' }: { value: number; prefix?: string; suffix?: string }) {
  const { ref, value: v } = useCountUp<HTMLSpanElement>(value);
  return (
    <span ref={ref} className="num">
      {/* The animated digits are hidden from screen readers; they hear the final value once. */}
      <span aria-hidden="true">
        {prefix}
        {formatNumber(v)}
        {suffix}
      </span>
      <span className="sr-only">
        {prefix}
        {formatNumber(value)}
        {suffix}
      </span>
    </span>
  );
}

export function StatCard({ stat, dark = false }: { stat: Stat; dark?: boolean }) {
  return (
    <div className={`stat${dark ? ' on-dark' : ''}`}>
      <div className="v" style={{ '--len': `${stat.prefix ?? ''}${formatNumber(stat.value)}${stat.suffix ?? ''}`.length } as CSSProperties}>
        <CountUp value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
      </div>
      <div className="l">{stat.label}</div>
      {stat.note ? <div className="n">{stat.note}</div> : null}
    </div>
  );
}

export function StatGrid({ stats, cols = 4, dark = false }: { stats: Stat[]; cols?: 1 | 3 | 4; dark?: boolean }) {
  if (stats.length === 0) return null;
  return (
    <div className={`stat-grid cols-${cols}`}>
      {stats.map((s) => (
        <StatCard key={s.label} stat={s} dark={dark} />
      ))}
    </div>
  );
}
