import type { Post } from "@/lib/get-all-posts";
import type { Locale } from "@/lib/i18n/settings";
import PostCard from "@/components/blog/PostCard";

type PostsGridProps = {
  locale: Locale;
  posts: Post[];
};

export default function PostsGrid({ locale, posts }: PostsGridProps) {
  if (!posts || posts.length === 0) {
    return (
      <section className="py-12">
        <div className="mx-auto max-w-5xl rounded-2xl border border-dashed border-slate-300 bg-white/60 p-8 text-center text-slate-600">
          No posts available yet. Please check back soon.
        </div>
      </section>
    );
  }

  return (
    <section className="py-10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <header className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Blog
            </h1>
            <p className="mt-1 text-sm text-slate-600">
              Stories, progress updates, and reflections from the Nouvo Ayiti
              2075 journey.
            </p>
          </div>
        </header>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.slug} locale={locale} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}
