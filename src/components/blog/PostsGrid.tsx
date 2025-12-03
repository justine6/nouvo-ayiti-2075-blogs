import type { Post } from "@/lib/get-all-posts";
import type { Locale } from "@/lib/i18n/settings";
import PostCard from "@/components/blog/PostCard";

type PostsGridProps = {
  posts: Post[];
  locale: Locale;
};

export default function PostsGrid({ posts, locale }: PostsGridProps) {
  if (!posts || posts.length === 0) {
    return (
      <p className="mt-4 text-sm text-slate-500">
        No posts available yet. Please check back soon.
      </p>
    );
  }

  return (
    <section aria-label="More blog posts" className="space-y-3">
      <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-600">
        Latest posts
      </h2>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <PostCard
            key={post.slug}
            locale={locale}
            slug={post.slug}
            title={post.title}
            date={post.date}
            excerpt={post.summary}
            variant="more"
          />
        ))}
      </div>
    </section>
  );
}
