import PostCard from "@/components/blog/PostCard";
import type { Post } from "@/lib/get-all-posts";
import type { Locale } from "@/lib/i18n/settings";

type PostsGridProps = {
  posts: Post[];
  locale: Locale;
  readMoreLabel: string;
};

export default function PostsGrid({
  posts,
  locale,
  readMoreLabel,
}: PostsGridProps) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <PostCard
          key={post.slug}
          post={post}
          locale={locale}
          readMoreLabel={readMoreLabel}
        />
      ))}
    </div>
  );
}
