// src/app/_components/more-stories.tsx

"use client";

import PostPreview from "@app/_components/post-preview";

import type { PostType } from "@interfaces/post";

type Props = {
  posts: PostType[];
};

const MoreStories = ({ posts }: Props) => {
  return (
    <section className="py-8 px-4 sm:px-6 lg:px-8">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6">More Stories</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <PostPreview key={post.slug} {...post} />
        ))}
      </div>
    </section>
  );
};

export default MoreStories;
