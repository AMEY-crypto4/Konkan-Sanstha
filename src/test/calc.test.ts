import { describe, expect, it } from 'vitest';
import { equivalents, parseAmount, unitPhrase, validateAmount } from '../lib/calc';
import { formatINR, formatINRShort, formatNumber } from '../lib/format';
import { UNIT_COSTS } from '../content/impact';

describe('formatting', () => {
  it('groups digits the Indian way', () => {
    expect(formatNumber(1470152)).toBe('14,70,152');
    expect(formatNumber(42068)).toBe('42,068');
    expect(formatINR(100000)).toBe('₹1,00,000');
  });
  it('shortens large rupee amounts', () => {
    expect(formatINRShort(250000)).toBe('₹2.5 lakh');
    expect(formatINRShort(30000000)).toBe('₹3 crore');
    expect(formatINRShort(4500)).toBe('₹4,500');
  });
});

describe('parseAmount', () => {
  it.each([
    ['2500', 2500],
    ['2,500', 2500],
    ['₹ 2,500', 2500],
    ['  1000 ', 1000],
  ])('parses %s', (raw, expected) => expect(parseAmount(raw)).toBe(expected));
  it.each(['', 'abc', '12.5', '-5', '1e3', '₹'])('rejects %j', (raw) => expect(parseAmount(raw)).toBeNull());
});

describe('validateAmount', () => {
  it('requires a value', () => expect(validateAmount({ amount: null, minimum: 500 })).toBe('Enter an amount.'));
  it('enforces the minimum', () => expect(validateAmount({ amount: 499, minimum: 500 })).toMatch(/minimum gift is ₹500/));
  it('accepts the minimum exactly', () => expect(validateAmount({ amount: 500, minimum: 500 })).toBeNull());
  it('rejects fractions', () => expect(validateAmount({ amount: 500.5, minimum: 500 })).toMatch(/whole number/));
  it('sends very large gifts to the team', () => expect(validateAmount({ amount: 10000001, minimum: 500 })).toMatch(/contact the team/));
});

describe('equivalents', () => {
  it('returns nothing for zero, negative or non-finite amounts', () => {
    expect(equivalents(0, UNIT_COSTS)).toEqual([]);
    expect(equivalents(-5, UNIT_COSTS)).toEqual([]);
    expect(equivalents(Number.NaN, UNIT_COSTS)).toEqual([]);
  });
  it('omits items the gift cannot afford once', () => {
    const ids = equivalents(100, UNIT_COSTS).map((e) => e.item.id);
    expect(ids).toEqual(['meal']);
  });
  it('orders by most units first and floors the counts', () => {
    const eq = equivalents(2500, UNIT_COSTS);
    expect(eq[0].item.id).toBe('meal');
    expect(eq[0].count).toBe(62);
    expect(eq.map((e) => e.count)).toEqual([...eq.map((e) => e.count)].sort((a, b) => b - a));
  });
  it('reports the remainder', () => {
    const meal = equivalents(130, UNIT_COSTS).find((e) => e.item.id === 'meal')!;
    expect(meal.count).toBe(3);
    expect(meal.remainder).toBe(10);
  });
});

describe('unitPhrase', () => {
  const shoes = UNIT_COSTS.find((u) => u.id === 'shoes')!;
  it('uses the singular for one', () => expect(unitPhrase(shoes, 1)).toBe('pair of school shoes'));
  it('uses the plural otherwise', () => expect(unitPhrase(shoes, 4)).toBe('pairs of school shoes'));
});
