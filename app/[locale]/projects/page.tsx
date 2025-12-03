// app/[locale]/projects/page.tsx
import Link from "next/link";
import type { Locale } from "@/lib/i18n/settings";
import { getDictionary } from "@/lib/i18n/get-dictionary";

type ProjectsPageProps = {
  params: { locale: Locale };
};

export default async function ProjectsPage({ params }: ProjectsPageProps) {
  const locale = (params?.locale ?? "en") as Locale;

  // Load translations specific to the projects page
  const dict = (await getDictionary(locale, "projectsPage")) as any;

  return (
    <main className="na-page">
      <section className="na-page-section">
        <h1 className="na-page-title">{dict.title}</h1>

        <p className="na-page-subtitle">{dict.intro}</p>

        <p className="na-page-text">
          {dict.followupPrefix}
          <Link href={`/${locale}/blog`} className="na-link">
            {dict.blogLinkLabel}
          </Link>
          .
        </p>
      </section>
    </main>
  );
}
