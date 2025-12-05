// app/[locale]/blog/page.tsx
import type { Metadata } from "next";
import PostCard from "@/components/blog/PostCard";
import { getAllPosts, type Post } from "@/lib/get-all-posts";
import {
  SUPPORTED_LOCALES,
  normalizeLocale,
  type Locale,
} from "@/lib/i18n/settings";

type PageParams = {
  locale: string;
};

type PageProps = {
  params: PageParams;
};

// Pre-generate static params for all locales
export function generateStaticParams() {
  return SUPPORTED_LOCALES.map((locale) => ({ locale }));
}

// Optional – basic metadata; tweak later
export function generateMetadata({ params }: PageProps): Metadata {
  const locale = normalizeLocale(params.locale);

  return {
    title: "Ayiti 2075 Blog",
    description:
      "All Nouvo Ayiti 2075 blog posts – stories, updates, and vision for a renewed Haiti.",
    alternates: {
      canonical: `/${locale}/blog`,
    },
  };
}

export default function BlogIndexPage({ params }: PageProps) {
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
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <PostCard
                key={post.slug}
                locale={locale}
                post={post}
                // You can localize this later if you want:
                readMoreLabel="Read the vision"
              />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
