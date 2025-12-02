// app/[locale]/page.tsx

import Link from "next/link";
import { getHomeDictionary } from "@/lib/i18n/get-dictionary";
import { getAllPosts } from "@/lib/get-all-posts";
import { getProjects } from "@/lib/get-projects";
import { locales, defaultLocale, type Locale } from "@/lib/i18n/settings";
import { redirect } from "next/navigation";

type Props = {
  params: { locale: string };
};

type HeroSectionDict = {
  title?: string;
  subtitle?: string;
  watchVideos?: string;
  readMore?: string;
};

type BlogSectionDict = {
  title?: string;
  subtitle?: string;
  viewAll?: string;
};

type HomeDictShape = {
  HeroSection?: HeroSectionDict;
  hero?: HeroSectionDict;
  BlogSection?: BlogSectionDict;
  blog?: BlogSectionDict;
};

export default async function LocaleHome({ params }: Props) {
  const rawLocale = params.locale;

  // Ensure we only use a supported locale
  const locale: Locale = locales.includes(rawLocale as Locale)
    ? (rawLocale as Locale)
    : defaultLocale;

  // Load full home dictionary for this locale
  const dict = (await getHomeDictionary(locale)) as HomeDictShape;

  // Resolve hero and blog sections (with fallbacks)
  const hero = dict.HeroSection ?? dict.hero ?? {};
  const blogSection = dict.BlogSection ?? dict.blog ?? {};

  // --- HERO COPY ---
  const heroTitle = hero.title ?? "Nouvo Ayiti 2075";
  const heroSubtitle = hero.subtitle ?? "Restoring dignity. Raising hope.";
  const heroPrimaryLabel = hero.watchVideos ?? "Watch Videos";
  const heroSecondaryLabel = hero.readMore ?? "Read the Vision";

  // --- BLOG SECTION COPY ---
  const blogTitle = blogSection.title ?? "Our Blog";
  const blogSubtitle =
    blogSection.subtitle ??
    "Stories, updates, and visions for the future.";
  const blogViewAll = blogSection.viewAll ?? "View All Posts";

  // Latest 3 blog posts for homepage mini-grid
  const posts = getAllPosts(locale).slice(0, 3);

  // Mini project grid for homepage
  const projects = getProjects(locale);

  return (
    <main className="na-page">
      {/* HERO – Style B + Style E combo */}
      <section className="na-hero na-hero-bg rounded-3xl overflow-hidden shadow-xl">
        {/* Background Haiti map */}
        <div className="na-hero-bg-map">
          <img
            src="/images/haiti-map-hero.png"
            alt="Map of Haiti"
            className="na-hero-bg-img"
          />
          <div className="na-hero-bg-overlay" />
        </div>

        {/* Foreground content */}
        <div className="na-hero-inner">
          <div className="na-hero-copy">
            <h1 className="na-hero-title">{heroTitle}</h1>
            <p className="na-hero-subtitle">{heroSubtitle}</p>

            <div className="na-hero-actions">
              <Link
                href={`/${locale}/vision#videos`}
                className="na-btn-primary"
              >
                {heroPrimaryLabel}
              </Link>

              <Link href={`/${locale}/vision`} className="na-btn-secondary">
                {heroSecondaryLabel}
              </Link>
            </div>
          </div>

          {/* Reserved for future side illustration if needed */}
          <div className="na-hero-map" />
        </div>
      </section>

      {/* BLOG PREVIEW + MINI GRID */}
      <section className="na-blog-preview">
        <header className="na-blog-header">
          <div>
            <h2 className="na-section-title">{blogTitle}</h2>
            <p className="na-section-subtitle">{blogSubtitle}</p>
          </div>

          <Link href={`/${locale}/blog`} className="na-link-strong">
            {blogViewAll}
          </Link>
        </header>

        <div className="na-blog-grid">
          {posts.map((post) => (
            <article key={post.slug} className="na-card na-card-blog">
              <h3 className="na-card-title">
                {/* For now we send them to the blog index;
                   later this can become /[locale]/blog/[slug] */}
                <Link href={`/${locale}/blog`}>{post.title}</Link>
              </h3>

              <p className="na-card-meta">{post.date}</p>
              <p className="na-card-body">{post.summary}</p>

              <Link href={`/${locale}/blog`} className="na-card-link">
                {heroSecondaryLabel}
              </Link>
            </article>
          ))}
        </div>
      </section>

      {/* PROJECTS MINI-GRID */}
      <section className="na-section mt-20">
        <header className="flex flex-wrap items-baseline justify-between gap-3 mb-6">
          <div>
            <h2 className="na-section-title">Our Projects</h2>
            <p className="na-section-subtitle">
              Each project is a promise to the future of Haiti.
            </p>
          </div>

          <Link
            href={`/${locale}/projects`}
            className="na-link-strong"
          >
            View all projects
          </Link>
        </header>

        <div className="grid gap-6 md:grid-cols-3">
          {projects.slice(0, 3).map((project) => (
            <article
              key={project.slug}
              className="na-card rounded-2xl border border-purple-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <h3 className="na-card-title">{project.title}</h3>

              <p className="na-card-body mt-3">{project.summary}</p>

              <Link
                href={`/${locale}/projects#${project.slug}`}
                className="na-card-link mt-4 inline-flex"
              >
                Read the vision behind this work
              </Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
