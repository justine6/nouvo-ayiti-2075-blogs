import { locales } from "@/lib/i18n/settings";
import { getProjects } from "@/lib/get-projects";

type ProjectsPageProps = {
  params: { locale: string };
};

export default function ProjectsPage({}: ProjectsPageProps) {
  const projects = getProjects();

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-16">
      <section className="max-w-6xl mx-auto text-center">
        <h1 className="text-3xl font-bold mb-4">Our Projects</h1>

        <p className="text-lg text-gray-600 mb-4">
          Discover our key initiatives to restore dignity, rebuild hope, and
          renew vision across Haiti.
        </p>

        <p className="text-xl italic font-medium text-gray-800 mb-10">
          Each project is a promise to the future.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
          {projects.map((project) => (
            <div
              key={project.slug}
              className="bg-white rounded-xl shadow-md border border-purple-100 p-6"
            >
              <h2 className="text-lg font-semibold mb-2">{project.title}</h2>
              <p className="text-sm text-gray-600">{project.summary}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}
