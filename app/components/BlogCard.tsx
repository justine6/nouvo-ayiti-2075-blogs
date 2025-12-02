// app/components/PostCard.tsx
import Link from "next/link";
import type { Post } from "@/lib/get-all-posts";

type PostCardProps = {
  post: Post;
  locale: string;
  readMoreLabel: string;
};

export default function PostCard({ post, locale, readMoreLabel }: PostCardProps) {
  const dateLabel =
    post.date &&
    new Date(post.date).toLocaleDateString(locale, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  return (
    <article className="flex flex-col justify-between rounded-xl border border-gray-100 bg-white/90 p-4 shadow-sm">
      <header className="space-y-1">
        <h3 className="text-base font-semibold text-gray-900">
          {post.title}
        </h3>
        {dateLabel && (
          <p className="text-xs text-gray-500">
            {dateLabel}
          </p>
        )}
      </header>

      {post.excerpt && (
        <p className="mt-2 line-clamp-3 text-sm text-gray-700">
          {post.excerpt}
        </p>
      )}

      <div className="mt-3">
        <Link
          href={`/${locale}/posts/${post.slug}`}
          className="inline-flex items-center text-xs font-semibold text-blue-600 hover:text-blue-700"
        >
          {readMoreLabel}
          <span aria-hidden="true" className="ml-1">→</span>
        </Link>
      </div>
    </article>
  );
}
