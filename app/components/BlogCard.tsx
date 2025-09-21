import Link from "next/link";
import type { Locale } from "@/lib/i18n/get-dictionary";

type BlogCardProps = {
  post: {
    slug: string;
    title: string;
    excerpt: string;
    coverImage?: string;
  };
  locale: Locale;
  readMoreLabel?: string; // from dict.readMore
};

export default function BlogCard({ post, locale, readMoreLabel }: BlogCardProps) {
  return (
    <div className="border rounded-lg shadow-sm overflow-hidden bg-white dark:bg-gray-800 transition-colors">
      {/* Optional Cover Image */}
      {post.coverImage && (
        <img
          src={post.coverImage}
          alt={post.title}
          className="w-full h-48 object-cover"
        />
      )}

      {/* Content */}
      <div className="p-4 flex flex-col justify-between h-full">
        <div>
          <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-100">
            {post.title}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">{post.excerpt}</p>
        </div>

        {/* Read More Button */}
        <Link
          href={`/${locale}/posts/${post.slug}`}
          className="inline-block text-blue-600 dark:text-blue-400 font-medium hover:underline mt-auto"
        >
          {readMoreLabel || "Read more"}
        </Link>
      </div>
    </div>
  );
}
