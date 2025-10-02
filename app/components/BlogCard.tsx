import Link from "next/link";
import Image from "next/image";
import type { Post } from "@/lib/get-all-posts";

type BlogCardProps = {
  post: Post;
  locale: string;
  readMoreLabel?: string;
};

export default function BlogCard({ post, locale, readMoreLabel }: BlogCardProps) {
  // ✅ Use ogImage (or fallback to logo)
  const coverImage = post.ogImage || "/images/nouvoayiti2075-logo.png";

  // ✅ Format the date nicely
  const formattedDate = post.date
    ? new Intl.DateTimeFormat(locale, {
        year: "numeric",
        month: "long",
        day: "numeric",
      }).format(new Date(post.date))
    : null;

  return (
    <div className="border rounded-xl shadow-sm overflow-hidden bg-white hover:shadow-md transition">
      <div className="relative w-full h-48">
        <Image
          src={coverImage}
          alt={post.title || "Nouvo Ayiti 2075"}
          fill
          className="object-cover bg-gray-100"
        />
      </div>
      <div className="p-4">
        <h3 className="text-xl font-bold">
          <Link href={`/${locale}/posts/${post.slug}`} className="hover:underline">
            {post.title}
          </Link>
        </h3>

        {/* 🔹 Show formatted date if available */}
        {formattedDate && (
          <p className="text-sm text-gray-500 mt-1">{formattedDate}</p>
        )}

        {post.excerpt && (
          <p className="mt-2 text-gray-700">
            {post.excerpt.length > 120 ? post.excerpt.slice(0, 120) + "..." : post.excerpt}
          </p>
        )}
        <Link
          href={`/${locale}/posts/${post.slug}`}
          className="text-blue-600 hover:underline mt-3 inline-block"
        >
          {readMoreLabel || "Read more"}
        </Link>
      </div>
    </div>
  );
}
