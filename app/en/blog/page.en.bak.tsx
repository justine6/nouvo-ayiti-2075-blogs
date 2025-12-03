import type { Locale } from "@/lib/i18n/settings";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { getAllPosts } from "@/lib/get-all-posts";

import BlogTopbar from "../../../components/layout/BlogTopbar";
import PostsGrid from "../../../components/blog/PostsGrid";

const locale: Locale = "en" as Locale;

export default async function BlogPage() {
  const dict = await getDictionary(locale);
  const posts = getAllPosts(locale);

  const blogDict = (dict as any).blogPage || (dict as any).blog || {};

  const title = blogDict.title || "Ayiti 2075 Blog";
  const subtitle =
    blogDict.subtitle ||
    "Stories, updates, and visions for the future.";

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <BlogTopbar locale={locale} />

      <main className="mx-auto max-w-5xl px-4 pb-20 pt-10">
        <section className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-wide text-sky-700">
            Nouvo Ayiti 2075 · Blog
          </p>
          <h1 className="mt-2 text-2xl font-bold tracking-tight md:text-3xl">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-2 text-sm text-slate-600">
              {subtitle}
            </p>
          )}
        </section>

        <PostsGrid posts={posts} locale={locale} />
      </main>
    </div>
  );
}
