import { Link } from 'react-router-dom';

/**
 * Original concept mark: a rising sun over three arcs. It is deliberately not the organisation's logo.
 */
export function BrandMark({ className = 'brand-mark' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="bm-sun" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffc53d" />
          <stop offset="1" stopColor="#f26b1d" />
        </linearGradient>
      </defs>
      <rect width="48" height="48" rx="14" fill="#17134a" />
      <circle cx="24" cy="25" r="8" fill="url(#bm-sun)" />
      <path d="M8 36c4-9 10-13 16-13s12 4 16 13" fill="none" stroke="#cfc9f5" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M13 38c3-6 7-9 11-9s8 3 11 9" fill="none" stroke="#8f86e6" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M4 40h40" stroke="#ffc53d" strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  );
}

export function Brand({ onClick }: { onClick?: () => void }) {
  return (
    <Link to="/" className="brand" onClick={onClick}>
      <BrandMark />
      <span className="brand-text">
        <b>Kokan</b>
        <span>NGO India</span>
        <span className="sr-only"> home</span>
      </span>
    </Link>
  );
}
