import type { Locale } from "@/lib/i18n/settings";
import type { Post } from "@/lib/get-all-posts";
import PostCard from "@/components/blog/PostCard";

type PostsGridProps = {
  locale: Locale;
  posts: Post[];
  readMoreLabel: string;
  variant?: "blog" | "more";
};

export default function PostsGrid({
  locale,
  posts,
  readMoreLabel,
  variant = "blog",
}: PostsGridProps) {
  if (!posts || posts.length === 0) {
    return (
      <p className="mt-6 text-sm text-slate-500">
        No posts available yet. Please check back soon.
      </p>
    );
  }

  return (
    <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <PostCard
          key={post.slug}
          locale={locale}
          post={post}
          readMoreLabel={readMoreLabel}
          variant={variant}
        />
      ))}
    </div>
  );
}
