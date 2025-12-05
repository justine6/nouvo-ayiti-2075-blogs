import ProjectGrid from "@/components/projects/ProjectGrid";

type ProjectsPageProps = {
  params: {
    locale: string;
  };
};

export default function ProjectsPage({ params }: ProjectsPageProps) {
  return (
    <main className="min-h-screen bg-slate-50">
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <header className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-wide text-rose-600">
            Our Projects
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Each project is a promise to the future of Haiti.
          </h1>
          <p className="mt-4 text-base text-slate-600">
            Discover our key initiatives to restore dignity, rebuild hope, and
            renew vision across Haiti.
          </p>
          <p className="mt-2 text-sm text-slate-500">
            These cards are placeholders. The full write-ups for each project
            will be published on this blog as the movement grows.
          </p>
        </header>

        <ProjectGrid locale={params.locale} />
      </section>
    </main>
  );
}
