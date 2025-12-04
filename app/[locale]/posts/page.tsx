// app/[locale]/posts/page.tsx
import Link from "next/link";
import type { Metadata } from "next";
import { getAllPosts, type Post } from "@/lib/get-all-posts";
import { normalizeLocale, type Locale } from "@/lib/i18n/settings";

type PageProps = {
  params: {
    locale: string;
  };
};

export function generateMetadata({ params }: PageProps): Metadata {
  const locale = normalizeLocale(params.locale);

  return {
    title: `All posts – Ayiti 2075 (${locale})`,
    description:
      "Browse all posts from the Nouvo Ayiti 2075 blog: stories of hope, progress, and collective action.",
  };
}

export default function PostsIndexPage({ params }: PageProps) {
  const locale: Locale = normalizeLocale(params.locale);
  const posts: Post[] = getAllPosts();

  return (
    <main className="min-h-screen bg-white py-10">
      <section className="mx-auto max-w-5xl px-4">
        <header className="mb-8">
          <h1 className="text-3xl font-semibold">All Posts</h1>
          <p className="mt-2 text-sm text-neutral-700">
            This page lists all Ayiti 2075 blog posts. Select a story to read
            the full article.
          </p>
        </header>

        {posts.length === 0 ? (
          <p className="text-sm text-neutral-600">
            No posts are available yet. Please check back soon.
          </p>
        ) : (
          <ul className="space-y-4">
            {posts.map((post) => (
              <li
                key={post.slug}
                className="rounded-xl border border-neutral-200 bg-white p-4 shadow-sm hover:border-purple-300 hover:shadow-md transition"
              >
                <h2 className="text-lg font-semibold">
                  {/* Keep detail pages under /blog/[slug] */}
                  <Link href={`/${locale}/blog/${post.slug}`}>
                    {post.title}
                  </Link>
                </h2>
                <p className="mt-1 text-xs text-neutral-500">
                  {new Date(post.date).toLocaleDateString(
                    locale === "ht" ? "en-US" : locale,
                    { year: "numeric", month: "short", day: "numeric" },
                  )}
                </p>
                <p className="mt-2 text-sm text-neutral-700">{post.summary}</p>
                <Link
                  href={`/${locale}/blog/${post.slug}`}
                  className="mt-3 inline-flex text-sm font-semibold underline underline-offset-4"
                >
                  Read full story
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
