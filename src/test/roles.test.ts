import { describe, expect, it } from 'vitest';
import { filterRoles } from '../lib/roles';
import { ALL_ROLES } from '../content/careers';

describe('filterRoles', () => {
  it('returns everything for an empty query and "all"', () => expect(filterRoles(ALL_ROLES, '', 'all')).toHaveLength(ALL_ROLES.length));
  it('matches case-insensitively on the title', () => {
    const r = filterRoles(ALL_ROLES, 'DEVELOPER', 'all');
    expect(r.map((x) => x.title)).toEqual(expect.arrayContaining(['Front-End Web Developer', 'Back End Web Developer']));
  });
  it('requires every word to match', () => {
    const r = filterRoles(ALL_ROLES, 'web front', 'all');
    expect(r.map((x) => x.title)).toEqual(['Front-End Web Developer']);
  });
  it('filters by department', () => {
    const r = filterRoles(ALL_ROLES, '', 'digital');
    expect(r.length).toBeGreaterThan(5);
    expect(r.every((x) => x.departmentId === 'digital')).toBe(true);
  });
  it('combines query and department', () => {
    expect(filterRoles(ALL_ROLES, 'developer', 'consultant')).toEqual([]);
  });
  it('can match the department name', () => {
    expect(filterRoles(ALL_ROLES, 'consultant', 'all').length).toBeGreaterThan(5);
  });
  it('trims whitespace', () => expect(filterRoles(ALL_ROLES, '   video   ', 'all').length).toBeGreaterThan(0));
});
