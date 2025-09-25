import BlogCard from "@/components/BlogCard";
import type { Post } from "@/lib/get-all-posts";

type MoreStoriesProps = {
  posts: Post[];
  locale: string;
  readMoreLabel: string;
};

export default function MoreStories({
  posts,
  locale,
  readMoreLabel,
}: MoreStoriesProps) {
  if (!posts?.length) return null;

  return (
    <section className="mt-12">
      <h2 className="text-2xl font-bold mb-6">More Stories</h2>
      <div className="grid gap-6 md:grid-cols-2">
        {posts.map((post) => (
          <BlogCard
            key={post.slug}
            post={post}
            locale={locale}
            readMoreLabel={readMoreLabel}
          />
        ))}
      </div>
    </section>
  );
}
