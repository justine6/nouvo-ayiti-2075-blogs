// src/components/blog/PostsGrid.tsx
import PostCard from "@/components/blog/PostCard";
import type { Locale } from "@/lib/i18n/settings";
import type { Post } from "@/lib/get-all-posts";

type PostsGridProps = {
  locale: Locale;
  posts: Post[];
  variant?: "blog" | "more";
};

export default function PostsGrid({
  locale,
  posts,
  variant = "more",
}: PostsGridProps) {
  if (!posts || posts.length === 0) {
    return (
      <p className="text-sm text-neutral-600">
        No posts are available yet. Please check back soon.
      </p>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <PostCard
          key={post.slug}
          locale={locale}
          post={post} // ✅ pass whole post
          variant={variant}
          readMoreLabel="Read the vision"
        />
      ))}
    </div>
  );
}
