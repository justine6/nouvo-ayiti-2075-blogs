import { getDictionary } from "@/lib/get-dictionary";
import type { Locale } from "@/lib/settings";
import { getAllPosts } from "@/lib/get-all-posts";

import BlogCard from "@/components/BlogCard";

type Props = {
  params: { locale: Locale };
};

export default async function BlogIndexPage({ params }: Props) {
  const locale = params?.locale || "en";
  const dict = await getDictionary(locale);

  const posts = getAllPosts(locale) || [];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">{dict.blog?.title || "Blog"}</h1>

      {/* 🔹 Show fallback if no posts */}
      {posts.length === 0 && (
        <p className="text-center text-gray-500 my-12">
          {dict.blog?.noPosts || "No posts available."}
        </p>
      )}

      {/* 🔹 Render posts if available */}
      {posts.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <BlogCard key={post.slug} post={post} locale={locale} />
          ))}
        </div>
      )}
    </div>
  );
}
