// components/blog/HeroPost.tsx
import Link from "next/link";
import type { Post } from "@/lib/get-all-posts";

type HeroPostProps = {
  post: Post;
  locale: string;
  readMoreLabel: string;
};

export default function HeroPost({ post, locale, readMoreLabel }: HeroPostProps) {
  const href = `/${locale}/blog/${post.slug}`;

  return (
    <section className="na-hero-post mt-8 mb-12">
      <article className="rounded-2xl border border-purple-100 bg-white p-6 shadow-sm">
        <p className="text-xs font-medium uppercase tracking-wide text-purple-700">
          Featured Story
        </p>

        <h2 className="mt-2 text-2xl font-semibold tracking-tight">
          <Link href={href} className="hover:underline">
            {post.title}
          </Link>
        </h2>

        <p className="mt-1 text-sm text-gray-500">{post.date}</p>

        <p className="mt-4 text-sm leading-relaxed text-gray-700">
          {post.summary}
        </p>

        <div className="mt-5">
          <Link
            href={href}
            className="inline-flex items-center rounded-full border border-purple-600 px-4 py-2 text-sm font-semibold text-purple-700 hover:bg-purple-50"
          >
            {readMoreLabel}
          </Link>
        </div>
      </article>
    </section>
  );
}
