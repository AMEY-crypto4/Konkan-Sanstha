/** Indian digit grouping: 1470152 -> "14,70,152". */
const inNumber = new Intl.NumberFormat('en-IN');

export const formatNumber = (n: number) => inNumber.format(n);

export const formatINR = (n: number) => `₹${inNumber.format(n)}`;

/** "₹1.5 lakh"-style short form for tight spaces. Falls back to full digits under one lakh. */
export function formatINRShort(n: number): string {
  if (n >= 10000000) return `₹${trim(n / 10000000)} crore`;
  if (n >= 100000) return `₹${trim(n / 100000)} lakh`;
  return formatINR(n);
}

const trim = (n: number) => String(Math.round(n * 100) / 100);
