// lib/get-projects.ts

export interface Project {
  slug: string;
  title: string;
  summary: string;
  content: string;
  status?: string;
  date?: string;
}

// Example data – keep / expand your own
const PROJECTS: Project[] = [
  {
    slug: "clean-water-pilot",
    title: "Clean Water Pilot",
    summary:
      "Bringing safe, affordable drinking water to vulnerable communities.",
    content: `This pilot focuses on clean, accessible drinking water as a
foundation for health, education, and economic dignity in Haiti.`,
    status: "planned",
    date: "2025-01-10",
  },
];

export function getProjects(locale?: string): Project[] {
  // use the param to satisfy eslint even if we don’t branch by locale yet
  void locale;
  return PROJECTS;
}

export function getAllProjectSlugs(locale?: string): string[] {
  void locale;
  return PROJECTS.map((p) => p.slug);
}

export function getProjectBySlug(
  slug: string,
  locale?: string,
): Project | undefined {
  void locale;
  return PROJECTS.find((p) => p.slug === slug);
}
