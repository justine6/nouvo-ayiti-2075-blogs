// components/blog/PostsGrid.tsx
import PostCard from "@/components/blog/PostCard";
import type { Post } from "@/lib/get-all-posts";
import type { Locale } from "@/lib/i18n/settings";

type PostsGridProps = {
  posts: Post[];
  locale: Locale;
  variant?: "blog" | "more";
};

export default function PostsGrid({
  posts,
  locale,
  variant = "blog",
}: PostsGridProps) {
  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <PostCard
          key={post.slug}
          locale={locale}
          slug={post.slug}
          title={post.title}
          date={post.date}
          excerpt={post.summary ?? post.excerpt ?? ""}
          variant={variant}
        />
      ))}
    </div>
  );
}
