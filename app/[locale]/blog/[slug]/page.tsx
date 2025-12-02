// app/[locale]/blog/[slug]/page.tsx

import Link from "next/link";
import { getAllPosts } from "@/lib/get-all-posts";
import { locales, defaultLocale, type Locale } from "@/lib/i18n/settings";

type Props = {
  params: { locale: string; slug: string };
};

export default function BlogPostPage({ params }: Props) {
  const rawLocale = params.locale;
  const locale: Locale = locales.includes(rawLocale as Locale)
    ? (rawLocale as Locale)
    : defaultLocale;

  const posts = getAllPosts(locale);
  const post = posts.find((p) => p.slug === params.slug);

  if (!post) {
    return (
      <main className="na-page">
        <h1 className="text-xl font-semibold">Post not found</h1>
        <p className="mt-2 text-gray-600">
          The blog post you’re looking for does not exist.
        </p>
        <a
          href={`/${locale}/blog`}
          className="mt-4 inline-flex text-purple-700 hover:underline font-semibold"
        >
          ← Back to all posts
        </a>
      </main>
    );
  }

  // Split content into paragraphs on blank lines
  const paragraphs = post.content.split(/\n{2,}/);

  return (
    <main className="na-page">
      {/* Shared hero section */}
      <section className="na-hero mb-16">
        <h1 className="na-hero-title">Nouvo Ayiti 2075</h1>
        <p className="na-hero-subtitle">Restoring dignity. Raising hope.</p>

        <div className="na-hero-actions mt-6 flex flex-wrap justify-center gap-4">
          <Link
            href={`/${locale}/vision#videos`}
            className="btn-primary"
          >
            Watch Videos
          </Link>
          <Link
            href={`/${locale}/vision`}
            className="btn-outline"
          >
            Read the Vision
          </Link>
        </div>
      </section>

      {/* Article content */}
      <article className="na-article max-w-3xl mx-auto pb-16">
        <header className="mb-8">
          <p className="text-sm text-gray-500">{post.date}</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight">
            {post.title}
          </h1>
        </header>

        <section className="prose max-w-none">
          {paragraphs.map((para, idx) => (
            <p key={idx} className="mb-4 leading-relaxed text-gray-800">
              {para}
            </p>
          ))}
        </section>

        <footer className="mt-10">
          <Link
            href={`/${locale}/blog`}
            className="inline-flex text-purple-700 hover:underline font-semibold"
          >
            ← Back to all posts
          </Link>
        </footer>
      </article>
    </main>
  );
}
