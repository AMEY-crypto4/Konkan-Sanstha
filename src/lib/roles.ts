import type { RoleItem } from '../content/careers';

export function filterRoles(roles: RoleItem[], query: string, departmentId: string | 'all'): RoleItem[] {
  const q = query.trim().toLowerCase();
  const words = q.split(/\s+/).filter(Boolean);
  return roles.filter((r) => {
    if (departmentId !== 'all' && r.departmentId !== departmentId) return false;
    if (words.length === 0) return true;
    const haystack = `${r.title} ${r.department}`.toLowerCase();
    return words.every((w) => haystack.includes(w));
  });
}
