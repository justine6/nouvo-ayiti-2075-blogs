import Link from "next/link";
import type { Metadata } from "next";
import {
  getAllProjectSlugs,
  getProjectBySlug,
} from "../../../../lib/get-projects";
import { getDictionary } from "../../../../lib/i18n/get-dictionary";
import {
  SUPPORTED_LOCALES,
  normalizeLocale,
} from "../../../../lib/i18n/settings";

type PageParams = {
  locale: string;
  slug: string;
};

type PageProps = {
  params: PageParams;
};

export async function generateStaticParams() {
  const slugs = getAllProjectSlugs();

  const params: PageParams[] = [];
  for (const locale of SUPPORTED_LOCALES) {
    for (const slug of slugs) {
      params.push({ locale, slug });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const locale = normalizeLocale(params.locale);
  await getDictionary(locale);
  const project = getProjectBySlug(params.slug);

  if (!project) {
    return {
      title: "Project not found – Ayiti 2075 Projects",
    };
  }

  return {
    title: `${project.title} – Ayiti 2075 Projects`,
    description: project.summary,
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const locale = normalizeLocale(params.locale);
  const project = getProjectBySlug(params.slug);

  if (!project) {
    return (
      <main className="min-h-screen bg-white py-10">
        <div className="mx-auto max-w-3xl px-4">
          <p className="text-sm text-neutral-600">
            Project not found.{" "}
            <Link
              href={`/${locale}/projects`}
              className="underline underline-offset-4"
            >
              Back to projects
            </Link>
          </p>
        </div>
      </main>
    );
  }

  // 🔐 Safe date formatting – handles undefined dates
  const formattedDate = project.date
    ? new Date(project.date).toLocaleDateString(
        locale === "ht" ? "en-US" : locale,
        { year: "numeric", month: "short", day: "numeric" },
      )
    : "";

  return (
    <main className="min-h-screen bg-white py-10">
      <article className="mx-auto max-w-3xl px-4">
        <p className="text-xs text-neutral-500">
          {formattedDate} • {project.status ?? "planned"}
        </p>
        <h1 className="mt-2 text-3xl font-semibold">{project.title}</h1>

        <div className="mt-6 space-y-4 text-sm leading-relaxed text-neutral-800 whitespace-pre-line">
          {project.content}
        </div>

        <div className="mt-8">
          <Link
            href={`/${locale}/projects`}
            className="text-sm font-semibold underline underline-offset-4"
          >
            Back to projects
          </Link>
        </div>
      </article>
    </main>
  );
}
