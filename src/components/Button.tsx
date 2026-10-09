import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';
import { Link, type LinkProps } from 'react-router-dom';

type Variant = 'primary' | 'secondary' | 'ghost' | 'light' | 'outline-light';
type Size = 'sm' | 'md' | 'lg';

const cls = (variant: Variant, size: Size, extra?: string) =>
  ['btn', variant === 'secondary' ? '' : `btn-${variant}`, size === 'md' ? '' : `btn-${size}`, extra].filter(Boolean).join(' ');

type Common = { variant?: Variant; size?: Size; children: ReactNode; className?: string };

export function ButtonLink({ variant = 'primary', size = 'md', className, children, ...rest }: Common & LinkProps) {
  return (
    <Link {...rest} className={cls(variant, size, className)}>
      {children}
    </Link>
  );
}

export function ButtonA({ variant = 'primary', size = 'md', className, children, ...rest }: Common & AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a {...rest} className={cls(variant, size, className)}>
      {children}
    </a>
  );
}

export function Button({ variant = 'primary', size = 'md', className, children, ...rest }: Common & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button type="button" {...rest} className={cls(variant, size, className)}>
      {children}
    </button>
  );
}

/** External link to the official site: always opens safely and says so for screen readers. */
export function ExternalLink({ href, children, className }: { href: string; children: ReactNode; className?: string }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}
