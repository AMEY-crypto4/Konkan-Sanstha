/** Decorative sunrise: concentric arcs and a glowing disc. Pure SVG, no raster images. */
export function SunriseArt({ className = 'hero-art' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 1100 640" aria-hidden="true" focusable="false">
      <defs>
        <radialGradient id="sa-glow" cx="50%" cy="100%" r="60%">
          <stop offset="0" stopColor="#ffc53d" stopOpacity="0.55" />
          <stop offset="0.5" stopColor="#f26b1d" stopOpacity="0.18" />
          <stop offset="1" stopColor="#f26b1d" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="sa-disc" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffd978" />
          <stop offset="1" stopColor="#f26b1d" />
        </linearGradient>
      </defs>
      <ellipse cx="550" cy="640" rx="560" ry="420" fill="url(#sa-glow)" />
      {[420, 340, 262, 190].map((r, i) => (
        <circle
          key={r}
          cx="550"
          cy="640"
          r={r}
          fill="none"
          stroke={i % 2 ? '#8f86e6' : '#cfc9f5'}
          strokeOpacity={0.14 + i * 0.07}
          strokeWidth={i === 3 ? 2.5 : 1.5}
        />
      ))}
      <circle cx="550" cy="640" r="128" fill="url(#sa-disc)" />
      <g stroke="#ffd978" strokeOpacity="0.5" strokeWidth="3" strokeLinecap="round">
        {Array.from({ length: 11 }).map((_, i) => {
          const a = Math.PI + ((i + 0.5) * Math.PI) / 11;
          const x1 = 550 + Math.cos(a) * 150;
          const y1 = 640 + Math.sin(a) * 150;
          const x2 = 550 + Math.cos(a) * (i % 2 ? 190 : 214);
          const y2 = 640 + Math.sin(a) * (i % 2 ? 190 : 214);
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />;
        })}
      </g>
      <g fill="#ffd978">
        {[
          [760, 90, 2.2], [880, 150, 1.8], [980, 60, 2.4], [1040, 210, 1.8], [820, 40, 1.6],
        ].map(([x, y, r]) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r={r} opacity="0.7" />
        ))}
      </g>
    </svg>
  );
}

/** Quieter arcs for inner-page headers. */
export function ArcsArt({ className = 'arcs' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 560 560" aria-hidden="true" focusable="false">
      {[260, 210, 160, 110].map((r, i) => (
        <circle key={r} cx="280" cy="280" r={r} fill="none" stroke={i % 2 ? '#8f86e6' : '#cfc9f5'} strokeOpacity={0.25 + i * 0.1} strokeWidth="1.6" />
      ))}
      <circle cx="280" cy="280" r="54" fill="#ffc53d" fillOpacity="0.9" />
    </svg>
  );
}
