// components/blog/PostCard.tsx
import Link from "next/link";
import Image from "next/image";
import type { Locale } from "@/lib/i18n/settings";

type PostCardProps = {
  locale: Locale;
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  coverImage?: string;
  variant?: "blog" | "more"; // controls size/layout
};

export default function PostCard({
  locale,
  slug,
  title,
  date,
  excerpt,
  coverImage,
  variant = "blog",
}: PostCardProps) {
  const isBlog = variant === "blog";

  // Safety: don't generate a broken URL if slug is missing
  if (!slug) {
    console.warn("PostCard: missing slug for post", { title });
    return null;
  }

  const href = `/${locale}/blog/${slug}`;

  const formattedDate =
    date && date.trim().length > 0
      ? new Date(date).toLocaleDateString(locale)
      : "";

  return (
    <div
      className={`rounded-lg border border-gray-200 bg-white shadow-sm transition-shadow duration-200 hover:shadow-md dark:border-gray-700 dark:bg-gray-900 ${
        isBlog ? "max-w-md" : ""
      }`}
    >
      <Link href={href} className="block group">
        {coverImage && (
          <div className={`relative w-full ${isBlog ? "h-60" : "h-40"}`}>
            <Image
              src={coverImage}
              alt={`Cover Image for ${title}`}
              fill
              className="rounded-t-lg object-cover transition-transform duration-200 group-hover:scale-105"
              priority={isBlog}
            />
          </div>
        )}
        <div className="p-4">
          <h3
            className={`font-semibold text-gray-900 transition-colors group-hover:text-blue-600 dark:text-white ${
              isBlog ? "text-xl" : "text-lg"
            }`}
          >
            {title}
          </h3>
          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
            {formattedDate}
          </p>
          <p
            className={`text-sm text-gray-600 dark:text-gray-300 ${
              isBlog ? "line-clamp-4" : "line-clamp-3"
            }`}
          >
            {excerpt}
          </p>
        </div>
      </Link>
    </div>
  );
}
