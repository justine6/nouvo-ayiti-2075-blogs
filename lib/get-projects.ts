export interface Project {
  slug: string;
  title: string;
  summary?: string;
  date?: string;
}

/**
 * Returns all projects for a locale.
 * For now this is just a stub returning an empty list.
 * You can replace this with real data later.
 */
export function getProjects(locale: string = "en"): Project[] {
  return [];
}

/**
 * Backwards-compatible alias some files may import.
 */
export function getAllProjects(locale: string = "en"): Project[] {
  return getProjects(locale);
}
