export interface Project {
  slug: string;
  title: string;
  summary?: string;
  date?: string;
}

export function getProjects(locale: string = "en"): Project[] {
  return [];
}

export function getAllProjects(locale: string = "en"): Project[] {
  return getProjects(locale);
}
