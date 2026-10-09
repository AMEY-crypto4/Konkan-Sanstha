import { describe, expect, it } from 'vitest';
import { PROGRAMS, PROGRAM_GROUPS, programBySlug } from '../content/programs';
import { CAMPAIGNS } from '../content/campaigns';
import { ALL_ROLES, DEPARTMENTS } from '../content/careers';
import { UNIT_COSTS, IMPACT_BLOCKS } from '../content/impact';
import { GIVING, OFFICES } from '../content/org';
import type { GivingGroup } from '../content/types';

const unique = (xs: string[]) => new Set(xs).size === xs.length;

describe('programme content', () => {
  it('has unique slugs', () => expect(unique(PROGRAMS.map((p) => p.slug))).toBe(true));
  it('uses only declared groups', () => {
    for (const p of PROGRAMS) expect(PROGRAM_GROUPS).toContain(p.group);
  });
  it('only relates to programmes that exist', () => {
    for (const p of PROGRAMS) for (const r of p.related ?? []) expect(programBySlug(r), `${p.slug} -> ${r}`).toBeDefined();
  });
  it('never relates a programme to itself', () => {
    for (const p of PROGRAMS) expect(p.related ?? []).not.toContain(p.slug);
  });
  it('flags thin pages honestly instead of inventing text', () => {
    const thin = PROGRAMS.filter((p) => p.activities.length === 0);
    expect(thin.length).toBeGreaterThan(0);
    for (const p of thin) expect(p.needsContent, p.slug).toBeTruthy();
  });
  it('has sane stats', () => {
    for (const p of PROGRAMS) for (const s of p.stats) {
      expect(Number.isFinite(s.value) && s.value >= 0, `${p.slug}: ${s.label}`).toBe(true);
      expect(s.label.length).toBeGreaterThan(2);
    }
  });
});

const giving = (groups: GivingGroup[] = []) => groups.flatMap((g) => g.options);

describe('giving options', () => {
  it('uses positive whole-rupee amounts', () => {
    for (const o of [...PROGRAMS.flatMap((p) => giving(p.giving)), ...CAMPAIGNS.flatMap((c) => giving(c.giving))]) {
      expect(Number.isInteger(o.amount) && o.amount > 0, o.label).toBe(true);
    }
  });
  it('never repeats the same label and amount inside one group', () => {
    const groups = [...PROGRAMS.flatMap((p) => p.giving ?? []), ...CAMPAIGNS.flatMap((c) => c.giving ?? [])];
    for (const g of groups) {
      const keys = g.options.map((o) => `${o.label}|${o.amount}`);
      expect(new Set(keys).size, g.title).toBe(keys.length);
    }
  });
  it('has presets at or above the minimum custom amount', () => {
    for (const p of GIVING.presets) expect(p).toBeGreaterThanOrEqual(GIVING.minCustomAmount);
  });
});

describe('campaigns', () => {
  it('has unique slugs', () => expect(unique(CAMPAIGNS.map((c) => c.slug))).toBe(true));
});

describe('unit costs', () => {
  it('has unique ids and positive costs', () => {
    expect(unique(UNIT_COSTS.map((u) => u.id))).toBe(true);
    for (const u of UNIT_COSTS) expect(u.cost).toBeGreaterThan(0);
  });
  // Derived costs are divided from published packages; keep the arithmetic honest.
  it.each([
    ['meal', 6000 / 150],
    ['blanket', 3750 / 10],
    ['specs', 12475 / 25],
    ['surgery', 11000 / 2],
  ])('derived cost for %s matches its published package', (id, expected) => {
    expect(UNIT_COSTS.find((u) => u.id === id)!.cost).toBe(expected);
  });
  it('labels derived costs as derived', () => {
    for (const id of ['meal', 'blanket', 'specs', 'surgery']) expect(UNIT_COSTS.find((u) => u.id === id)!.basis).toBe('derived');
  });
});

describe('careers and offices', () => {
  it('has unique role ids', () => expect(unique(ALL_ROLES.map((r) => r.id))).toBe(true));
  it('counts every role once', () => expect(ALL_ROLES.length).toBe(DEPARTMENTS.reduce((n, d) => n + d.roles.length, 0)));
  it('lists the Dadar office first', () => expect(OFFICES[0].area).toBe('Dadar East'));
});

describe('impact blocks', () => {
  it('link to real programme pages or known special pages', () => {
    for (const b of IMPACT_BLOCKS) {
      if (['padyatra', 'csr-partnership'].includes(b.slug)) continue;
      expect(programBySlug(b.slug), b.slug).toBeDefined();
    }
  });
});
