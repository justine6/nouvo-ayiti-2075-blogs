import HeroPost from "@/components/blog/HeroPost";
import PostsGrid from "@/components/blog/PostsGrid";
import type { Post } from "@/lib/get-all-posts";
import { getAllPosts } from "@/lib/get-all-posts";
import { getDictionary } from "@/lib/i18n/get-dictionary";

const supportedLocales = ["en", "fr", "ht", "es"] as const;
type Locale = (typeof supportedLocales)[number];

type BlogPageProps = {
  params: { locale: string };
};

export default async function BlogPage({ params }: BlogPageProps) {
  const rawLocale = params.locale;
  const locale: Locale = supportedLocales.includes(rawLocale as Locale)
    ? (rawLocale as Locale)
    : "en";

  // 👇 loosen types so we can safely read title, tagline, etc.
  const rawDict: any = await getDictionary(locale, "blog");
  const base: any = (rawDict.blog ?? rawDict) || {};
  const heading: string =
    base.title ?? "Welcome to the Ayiti 2075 Blog";
  const subtitle: string =
    base.tagline ??
    "Stories, updates, and visions for the future.";
  const readMoreLabel: string =
    base.readMore ??
    base.readMoreLabel ??
    (locale === "fr"
      ? "Lire la suite"
      : locale === "ht"
      ? "Li plis"
      : locale === "es"
      ? "Leer más"
      : "Read more");
  // Try posts for this locale, then fall back to English
  let posts: Post[] = getAllPosts(locale);
  if (!posts || posts.length === 0) {
    posts = getAllPosts("en");
  }

  const heroPost = posts[0];
  const morePosts = posts.slice(1);

  return (
    <main className="na-page">
      <section className="na-page-hero">
        <h1 className="na-page-title">{heading}</h1>
        <p className="na-page-lead">{subtitle}</p>
      </section>

      {heroPost && (
        <HeroPost
          post={heroPost}
          locale={locale}
          readMoreLabel={readMoreLabel}
        />
      )}

      {morePosts.length > 0 && (
        <PostsGrid
          posts={morePosts}
          locale={locale}
          readMoreLabel={readMoreLabel}
        />
      )}
    </main>
  );
}
