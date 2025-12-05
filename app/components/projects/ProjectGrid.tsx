type Project = {
  id: string;
  name: string;
  description: string;
};

const PROJECTS: Project[] = [
  {
    id: "clean-water",
    name: "Clean Water",
    description: "Providing safe drinking water for communities across Haiti.",
  },
  {
    id: "education",
    name: "Education",
    description: "Schools and learning opportunities for the next generation.",
  },
  {
    id: "healthcare",
    name: "Healthcare",
    description: "Improving access to clinics, hospitals, and medical support.",
  },
  {
    id: "infrastructure",
    name: "Infrastructure",
    description: "Rebuilding roads, bridges, and essential public services.",
  },
  {
    id: "agriculture",
    name: "Agriculture",
    description: "Supporting local farmers and sustainable food systems.",
  },
  {
    id: "technology",
    name: "Technology",
    description:
      "Digital inclusion, connectivity, and tech training programs for young people.",
  },
];

type ProjectGridProps = {
  locale: string;
  blogSlug?: string;
};

export default function ProjectGrid({
  locale,
  blogSlug = "welcome-to-ayiti-2075-blog",
}: ProjectGridProps) {
  return (
    <div className="mt-12 flex flex-col items-center space-y-12">
      {PROJECTS.map((project) => (
        <article
          key={project.id}
          className="max-w-2xl w-full text-center border border-slate-200 rounded-2xl bg-white p-8 shadow-sm hover:shadow-md transition"
        >
          <h2 className="text-2xl font-bold text-slate-900">{project.name}</h2>
          <p className="mt-3 text-slate-700 text-base">{project.description}</p>

          <a
            href={`/${locale}/blog/${blogSlug}`}
            className="mt-4 inline-flex items-center justify-center font-semibold text-rose-600 hover:underline underline-offset-4"
          >
            Read the vision behind this work →
          </a>
        </article>
      ))}
    </div>
  );
}
