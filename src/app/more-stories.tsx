import type { PostType } from "@/interfaces/post";


import PostPreview from "@/app/_components/post-preview";

type Props = {
  posts: PostType[];
};

export default function MoreStories({ posts }: Props) {
  if (!posts || posts.length === 0) return null;

  return (
    <section>
      <h2 className="mb-8 text-4xl md:text-6xl font-bold tracking-tighter leading-tight">
        More Stories
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-20 md:gap-x-16 mb-32">
        {posts.map((post) => (
          <PostPreview
            key={post.slug}
            title={post.title}
            coverImage={post.coverImage}
            date={post.date}
            author={post.author}
            slug={post.slug}
            excerpt={post.excerpt}
          />
        ))}
      </div>
    </section>
  );
}
