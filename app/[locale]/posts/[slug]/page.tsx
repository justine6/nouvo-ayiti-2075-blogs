import Link from "next/link";
import type { Post } from "@/lib/get-all-posts";
import { getAllPosts } from "@/lib/get-all-posts";

const supportedLocales = ["en", "fr", "ht", "es"] as const;
type Locale = (typeof supportedLocales)[number];

type PostPageProps = {
  params: { locale: string; slug: string };
};

export default function PostPage({ params }: PostPageProps) {
  const rawLocale = params.locale;
  const locale: Locale = supportedLocales.includes(rawLocale as Locale)
    ? (rawLocale as Locale)
    : "en";

  const postsForLocale = getAllPosts(locale);
  const fallbackPosts = locale === "en" ? [] : getAllPosts("en");

  const post: Post | undefined =
    postsForLocale.find((p) => p.slug === params.slug) ??
    fallbackPosts.find((p) => p.slug === params.slug);

  if (!post) {
    const fallbackBackLabel =
      locale === "fr"
        ? "Retour au blog"
        : locale === "ht"
        ? "Tounen nan blog la"
        : locale === "es"
        ? "Volver al blog"
        : "Back to blog";

    return (
      <main className="na-page">
        <section className="na-section">
          <h1 className="na-page-title">Post not found</h1>
          <p className="na-page-lead">
            We could not find the requested article.
          </p>
          <Link href={`/${locale}/blog`} className="na-link">
            {fallbackBackLabel}
          </Link>
        </section>
      </main>
    );
  }

  const backLabel: string =
    locale === "fr"
      ? "Retour au blog"
      : locale === "ht"
      ? "Tounen nan blog la"
      : locale === "es"
      ? "Volver al blog"
      : "Back to blog";

  return (
    <main className="na-page">
      <article className="na-article">
        <h1 className="na-article-title">{post.title}</h1>
        {post.date && (
          <p className="na-article-meta">
            {post.date}
          </p>
        )}
        <div className="na-article-body">
          {post.content}
        </div>
      </article>

      <section className="na-section mt-8">
        <Link href={`/${locale}/blog`} className="na-link">
          {backLabel}
        </Link>
      </section>
    </main>
  );
}
