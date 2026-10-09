import type { UnitCost } from '../content/impact';

export type Equivalent = { item: UnitCost; count: number; remainder: number };

/**
 * What a gift can fund. Only items the gift can afford at least once are returned,
 * ordered from the most units to the fewest so the first lines feel tangible.
 */
export function equivalents(amount: number, items: UnitCost[]): Equivalent[] {
  if (!Number.isFinite(amount) || amount <= 0) return [];
  return items
    .map((item) => ({ item, count: Math.floor(amount / item.cost), remainder: amount % item.cost }))
    .filter((e) => e.count >= 1)
    .sort((a, b) => b.count - a.count);
}

/** "1 pair of school shoes" or "4 pairs of school shoes": the noun phrase only, without the number. */
export function unitPhrase(item: UnitCost, count: number): string {
  return count === 1 ? item.one : item.many;
}

export type GiftInput = { amount: number | null; minimum: number };

export function validateAmount({ amount, minimum }: GiftInput): string | null {
  if (amount === null || Number.isNaN(amount)) return 'Enter an amount.';
  if (!Number.isInteger(amount)) return 'Enter a whole number of rupees.';
  if (amount < minimum) return `The minimum gift is ₹${minimum.toLocaleString('en-IN')}.`;
  if (amount > 10000000) return 'For gifts above ₹1 crore, please contact the team directly.';
  return null;
}

/** Parses "2,500", "₹2500" and " 2500 " into a number; returns null for anything else. */
export function parseAmount(raw: string): number | null {
  const cleaned = raw.replace(/[₹,\s]/g, '');
  if (cleaned === '' || !/^\d+$/.test(cleaned)) return null;
  return Number(cleaned);
}
