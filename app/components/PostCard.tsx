// app/components/PostCard.tsx
import Link from "next/link";
import Image from "next/image";

type PostCardProps = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  coverImage?: string;
  variant?: "blog" | "more"; // controls size/layout
};

export default function PostCard({
  slug,
  title,
  date,
  excerpt,
  coverImage,
  variant = "blog",
}: PostCardProps) {
  const isBlog = variant === "blog";

  return (
    <div
      className={`rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow duration-200 bg-white dark:bg-gray-900 ${
        isBlog ? "max-w-md" : ""
      }`}
    >
      <Link href={`/posts/${slug}`} className="block group">
        {coverImage && (
          <div className={`relative w-full ${isBlog ? "h-60" : "h-40"}`}>
            <Image
              src={coverImage}
              alt={`Cover Image for ${title}`}
              fill
              className="object-cover rounded-t-lg group-hover:scale-105 transition-transform duration-200"
              priority={isBlog}
            />
          </div>
        )}
        <div className="p-4">
          <h3
            className={`font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors ${
              isBlog ? "text-xl" : "text-lg"
            }`}
          >
            {title}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
            {new Date(date).toLocaleDateString()}
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
