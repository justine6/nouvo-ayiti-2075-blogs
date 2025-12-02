// components/blog/PostsGrid.tsx
import Link from "next/link";
import type { Post } from "@/lib/get-all-posts";

type PostsGridProps = {
  posts: Post[];
  locale: string;
  readMoreLabel: string;
};

export default function PostsGrid({ posts, locale, readMoreLabel }: PostsGridProps) {
  if (!posts || posts.length === 0) return null;

  return (
    <section className="na-section mt-10">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => {
          const href = `/${locale}/blog/${post.slug}`;

          return (
            <article
              key={post.slug}
              className="flex flex-col rounded-2xl border border-gray-100 bg-white p-5 shadow-sm"
            >
              <h3 className="text-lg font-semibold leading-snug">
                <Link href={href} className="text-purple-700 hover:underline">
                  {post.title}
                </Link>
              </h3>

              <p className="mt-1 text-xs text-gray-500">{post.date}</p>

              <p className="mt-3 flex-1 text-sm leading-relaxed text-gray-700">
                {post.summary}
              </p>

              <div className="mt-4">
                <Link
                  href={href}
                  className="text-sm font-semibold text-purple-700 hover:underline"
                >
                  {readMoreLabel}
                </Link>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
