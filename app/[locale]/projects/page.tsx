import type { Project } from "@/lib/get-projects";
import { getProjects } from "@/lib/get-projects";

const supportedLocales = ["en", "fr", "ht", "es"] as const;
type Locale = (typeof supportedLocales)[number];

type ProjectsPageProps = {
  params: { locale: string };
};

export default function ProjectsPage({ params }: ProjectsPageProps) {
  const rawLocale = params.locale;
  const locale: Locale = supportedLocales.includes(rawLocale as Locale)
    ? (rawLocale as Locale)
    : "en";

  const projects: Project[] = getProjects(locale);

  return (
    <main className="na-page">
      <section className="na-page-hero">
        <h1 className="na-page-title">Projects</h1>
        <p className="na-page-lead">
          Highlights of key initiatives that support the Nouvo Ayiti 2075 vision.
        </p>
      </section>

      <section className="na-section">
        {projects.length === 0 ? (
          <p>No projects are listed yet.</p>
        ) : (
          <ul className="na-project-list">
            {projects.map((p) => (
              <li key={p.slug} className="na-project-item">
                <h2>{p.title}</h2>
                {p.summary && <p>{p.summary}</p>}
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
