import Link from "next/link";
import type { Locale } from "@/lib/i18n/settings";

type PostCardProps = {
  locale: Locale;
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  variant?: "blog" | "more"; // controls size/layout
};

export default function PostCard({
  locale,
  slug,
  title,
  date,
  excerpt,
  variant = "blog",
}: PostCardProps) {
  const isBlog = variant === "blog";

  const formattedDate =
    date && date.trim().length > 0
      ? new Date(date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })
      : "";

  return (
    <div
      className={`rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow duration-200 bg-white dark:bg-gray-900 ${
        isBlog ? "max-w-md" : ""
      }`}
    >
      <Link href={`/${locale}/posts/${slug}`} className="block group">
        <div className="p-4">
          <h3
            className={`font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors ${
              isBlog ? "text-xl" : "text-lg"
            }`}
          >
            {title}
          </h3>

          {formattedDate && (
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
              {formattedDate}
            </p>
          )}

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
