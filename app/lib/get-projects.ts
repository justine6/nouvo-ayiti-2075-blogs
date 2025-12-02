export interface Project {
  slug: string;
  title: string;
  summary?: string;
  date?: string;
}

/**
 * Base implementation: returns all projects for a locale.
 * For now this can be an empty list or some static data.
 * You can later replace this with real filesystem or CMS loading.
 */
export function getProjects(locale: string = "en"): Project[] {
  // TODO: implement real project loading if needed
  return [];
}

/**
 * Backwards-compatible alias used in some parts of the code.
 */
export function getAllProjects(locale: string = "en"): Project[] {
  return getProjects(locale);
}
