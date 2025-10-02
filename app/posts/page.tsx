import Link from "next/link";
import { getAllPosts } from "@/lib/get-all-posts";

export default async function PostsPage() {
  const posts = await getAllPosts();

  if (!posts || posts.length === 0) {
    return (
      <div className="prose mx-auto py-10">
        <h1>Blog</h1>
        <p>No blog posts available yet. Please check back soon.</p>
      </div>
    );
  }

  return (
    <div className="prose mx-auto py-10">
      <h1>Blog</h1>
      <ul className="space-y-6">
        {posts.map((post) => (
          <li key={post.slug}>
            <h2 className="text-xl font-semibold">
              <Link href={`/posts/${post.slug}`}>
                {post.title ?? "Untitled Post"}
              </Link>
            </h2>
            <p className="text-gray-600">
              {post.excerpt ?? "No description available."}
            </p>
            <p className="text-sm text-gray-500">
              {post.date ?? "Date unavailable"}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
