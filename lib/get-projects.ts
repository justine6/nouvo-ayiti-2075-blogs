export type Project = {
  slug: string;
  title: string;
  summary: string;
};

const PROJECTS: Project[] = [
  {
    slug: "clean-water",
    title: "Clean Water",
    summary: "Providing safe drinking water for communities across Haiti.",
  },
  {
    slug: "education",
    title: "Education",
    summary: "Schools and learning opportunities for the next generation.",
  },
  {
    slug: "healthcare",
    title: "Healthcare",
    summary: "Improving access to clinics, hospitals, and medical support.",
  },
  {
    slug: "infrastructure",
    title: "Infrastructure",
    summary: "Rebuilding roads, bridges, and essential public services.",
  },
  {
    slug: "agriculture",
    title: "Agriculture",
    summary: "Supporting local farmers and sustainable food systems.",
  },
  {
    slug: "technology",
    title: "Technology",
    summary: "Digital inclusion, connectivity, and tech training programs.",
  },
];

export function getProjects(): Project[] {
  return PROJECTS;
}
