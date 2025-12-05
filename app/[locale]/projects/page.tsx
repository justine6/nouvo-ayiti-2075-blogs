import ProjectGrid from "@/components/projects/ProjectGrid";

type ProjectsPageProps = {
  params: {
    locale: string;
  };
};

export default function ProjectsPage({ params }: ProjectsPageProps) {
  return (
    <main className="min-h-screen bg-gradient-to-b from-amber-50 via-orange-50/40 to-rose-100/70 px-3 sm:px-6 py-10 sm:py-16">
      <section
        className="
          relative mx-auto max-w-5xl sm:max-w-6xl
          overflow-hidden
          rounded-3xl border border-amber-200/70
          bg-white/95
          px-4 sm:px-8 lg:px-12
          py-10 sm:py-12 lg:py-14
          shadow-[0_22px_45px_rgba(15,23,42,0.16)]
        "
      >
        {/* Soft golden / rose glow inside the scroll */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-60 mix-blend-soft-light"
          style={{
            backgroundImage:
              "radial-gradient(circle at top, rgba(251,191,36,0.18), transparent 60%), radial-gradient(circle at bottom, rgba(244,114,182,0.18), transparent 55%)",
          }}
        />

        {/* Top + bottom ornamental lines */}
        <div className="pointer-events-none absolute inset-x-10 top-4 h-px bg-gradient-to-r from-transparent via-amber-300/70 to-transparent" />
        <div className="pointer-events-none absolute inset-x-10 bottom-4 h-px bg-gradient-to-r from-transparent via-amber-300/70 to-transparent" />

        <div className="relative">
          {/* Page heading */}
          <header className="mx-auto max-w-3xl text-center">
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-amber-700/90">
              Our Projects
            </p>

            <h1 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-slate-900">
              Each project is a promise to the future of Haiti.
            </h1>

            {/* Royal tagline + tiny gold lines */}
            <div className="mt-4 flex items-center justify-center gap-3 text-[0.7rem] tracking-[0.35em] uppercase text-amber-700/80">
              <span className="h-px w-10 rounded-full bg-gradient-to-r from-transparent via-amber-400/80 to-transparent" />
              <span>Pillars of Renewal</span>
              <span className="h-px w-10 rounded-full bg-gradient-to-l from-transparent via-amber-400/80 to-transparent" />
            </div>

            <p className="mt-5 text-sm sm:text-base text-slate-700">
              Discover our key initiatives to restore dignity, rebuild hope, and
              renew vision across Haiti. Each project strengthens a pillar that
              helps communities stand taller together.
            </p>

            <p className="mt-2 text-xs sm:text-sm text-slate-500/90">
              These cards are placeholders. The full write-ups for each project
              will be published on this blog as the movement grows.
            </p>
          </header>

          {/* Royal project pillars */}
          <ProjectGrid locale={params.locale} />
        </div>
      </section>
    </main>
  );
}
