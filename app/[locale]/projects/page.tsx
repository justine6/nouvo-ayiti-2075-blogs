import Link from "next/link";
import type { Metadata } from "next";
import { getProjects } from "@/lib/get-projects";
import { getDictionary } from "../../../lib/i18n/get-dictionary";
import { normalizeLocale } from "../../../lib/i18n/settings";

type PageProps = {
  params: {
    locale: string;
  };
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const locale = normalizeLocale(params.locale);
  const dict = await getDictionary(locale);

  const title = dict.blogSection?.title ?? "Ayiti 2075 Projects";
  const description =
    dict.blogSection?.subtitle ??
    "Pilot initiatives and community projects connected to the Nouvo Ayiti 2075 vision.";

  return {
    title,
    description,
  };
}

export default async function ProjectsIndexPage({ params }: PageProps) {
  const locale = normalizeLocale(params.locale);
  const projects = getProjects();

  return (
    <main className="min-h-screen bg-white py-10">
      <section className="mx-auto max-w-6xl px-4">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold">Ayiti 2075 Projects</h1>
            <p className="mt-2 text-sm text-neutral-600">
              Early pilots and stories that show what a renewed Ayiti could look
              like.
            </p>
          </div>
        </div>

        <div className="mt-8 space-y-6">
          {projects.map((project) => (
            <article
              key={project.slug}
              className="border-b pb-4 last:border-none"
            >
              <h2 className="text-lg font-semibold">
                <Link href={`/${locale}/projects/${project.slug}`}>
                  {project.title}
                </Link>
              </h2>

              {project.date && (
                <p className="mt-1 text-xs text-neutral-500">
                  {new Date(project.date).toLocaleDateString(
                    locale === "ht" ? "en-US" : locale,
                    { year: "numeric", month: "short", day: "numeric" },
                  )}
                </p>
              )}

              <Link
                href={`/${locale}/projects/${project.slug}`}
                className="mt-2 inline-flex text-sm font-semibold underline underline-offset-4"
              >
                Learn more
              </Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
