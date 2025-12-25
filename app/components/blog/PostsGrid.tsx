// app/components/blog/PostCard.tsx
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

  // ✅ Point to /[locale]/blog/[slug], not /posts/<slug>
  const href = `/${locale}/blog/${slug}`;

  const formattedDate =
    date && date.trim().length > 0
      ? new Date(date).toLocaleDateString(locale, {
          year: "numeric",
          month: "short",
          day: "numeric",
        })
      : "";

  return (
    <article
      className={`rounded-lg border border-slate-200 bg-white/70 shadow-sm transition hover:shadow-md ${
        isBlog ? "flex flex-col" : "flex flex-row gap-4"
      }`}
    >
      {coverImage && (
        <div
          className={
            isBlog
              ? "relative h-48 w-full"
              : "relative h-24 w-32 flex-shrink-0"
          }
        >
          <Image
            src={coverImage}
            alt={title}
            fill
            className="rounded-t-lg object-cover"
            sizes={isBlog ? "(min-width: 1024px) 25vw, 100vw" : "128px"}
          />
        </div>
      )}

      <div className="flex flex-1 flex-col gap-2 p-4">
        {formattedDate && (
          <div className="text-xs font-medium uppercase tracking-wide text-slate-500">
            {formattedDate}
          </div>
        )}

        <h3 className="text-lg font-semibold text-slate-900 line-clamp-2">
          {title}
        </h3>

        <p className="mt-1 text-sm text-slate-600 line-clamp-3">
          {excerpt}
        </p>

        <div className="mt-3">
          <Link
            href={href}
            className="inline-flex items-center text-sm font-medium text-blue-700 hover:underline"
          >
            Read more
            <span aria-hidden="true" className="ml-1">
              →
            </span>
          </Link>
        </div>
      </div>
    </article>
  );
}
