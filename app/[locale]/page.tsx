// app/[locale]/page.tsx
import Link from "next/link";

import { getDictionary } from "@/lib/i18n/get-dictionary";
import { getAllPosts } from "@/lib/get-all-posts";
import { getProjects } from "@/lib/get-projects";
import { locales, defaultLocale, type Locale } from "@/lib/i18n/settings";

type HomePageProps = {
  params: { locale: string };
};

type HeroSectionDict = {
  goToMain?: string;
  title?: string;
  subtitle?: string;
  joinNow?: string;
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

// Slugs / URLs used by hero CTAs
const VISION_SLUG = "welcome-to-ayiti-2075-blog";
const MAIN_SITE_URL = "https://nouvoayiti2075.com";
const JOIN_URL = "https://nouvoayiti2075.com/join";

export default async function LocaleHome({ params }: HomePageProps) {
  const rawLocale = params.locale;

  const locale: Locale = locales.includes(rawLocale as Locale)
    ? (rawLocale as Locale)
    : defaultLocale;

  // 🔑 read from dictionaries/en|fr|ht|es via getDictionary
  const dict = (await getDictionary(locale)) as HomeDictShape;

  const hero = dict.HeroSection ?? dict.hero ?? {};
  const blogSection = dict.BlogSection ?? dict.blog ?? {};

  // --- HERO COPY ---
  const heroTitle = hero.title ?? "Nouvo Ayiti 2075";
  const heroSubtitle = hero.subtitle ?? "Restoring dignity. Raising hope.";
  const heroPrimaryLabel = hero.watchVideos ?? "Watch Videos";
  const heroSecondaryLabel = hero.readMore ?? "Read the Vision";
  const joinNowLabel = hero.joinNow ?? "Join the Movement";
  const goToMainLabel = hero.goToMain ?? "Main Site";

  // --- BLOG SECTION COPY ---
  const blogTitle = blogSection.title ?? "Our Blog";
  const blogSubtitle =
    blogSection.subtitle ?? "Stories, updates, and visions for the future.";
  const blogViewAll = blogSection.viewAll ?? "View All Posts";

  // NOTE: our helpers return all posts/projects; we just slice
  const posts = getAllPosts().slice(0, 3);
  const projects = getProjects().slice(0, 3);

  return (
    <main className="na-page">
      {/* HERO */}
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

        {/* Foreground */}
        <div className="na-hero-inner">
          <div className="na-hero-copy">
            <h1 className="na-hero-title">{heroTitle}</h1>
            <p className="na-hero-subtitle">{heroSubtitle}</p>

            <div className="na-hero-actions">
              {/* Watch videos → /{locale}/videos */}
              <Link href={`/${locale}/videos`} className="na-btn-primary">
                {heroPrimaryLabel}
              </Link>

              {/* Read the vision → /{locale}/blog/welcome-to-ayiti-2075-blog */}
              <Link
                href={`/${locale}/blog/${VISION_SLUG}`}
                className="na-btn-secondary"
              >
                {heroSecondaryLabel}
              </Link>
            </div>

            <div className="na-hero-links">
              {/* Join the movement → main site /join */}
              <a
                href={JOIN_URL}
                className="na-link-strong mr-4"
                target="_blank"
                rel="noreferrer"
              >
                {joinNowLabel}
              </a>

              {/* Main site */}
              <a
                href={MAIN_SITE_URL}
                className="na-link-subtle"
                target="_blank"
                rel="noreferrer"
              >
                {goToMainLabel}
              </a>
            </div>
          </div>

          <div className="na-hero-map" />
        </div>
      </section>

      {/* BLOG PREVIEW */}
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
                <Link href={`/${locale}/blog/${post.slug}`}>{post.title}</Link>
              </h3>

              <p className="na-card-meta">{post.date}</p>
              <p className="na-card-body">{post.summary}</p>

              <Link
                href={`/${locale}/blog/${post.slug}`}
                className="na-card-link"
              >
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

          <Link href={`/${locale}/projects`} className="na-link-strong">
            View all projects
          </Link>
        </header>

        <div className="grid gap-6 md:grid-cols-3">
          {projects.map((project) => (
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

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}
