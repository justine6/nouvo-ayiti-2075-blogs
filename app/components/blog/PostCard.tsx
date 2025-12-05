// app/components/blog/PostCard.tsx
import Link from "next/link";
import type { Locale } from "@/lib/i18n/settings";
import type { Post } from "@/lib/get-all-posts";

type PostCardProps = {
  locale: Locale;

  // New style (preferred)
  post?: Post;

  // Legacy style (still supported)
  slug?: string;
  title?: string;
  date?: string;
  excerpt?: string;

  readMoreLabel?: string;
  variant?: "blog" | "more";
};

export default function PostCard({
  locale,
  post,
  slug,
  title,
  date,
  excerpt,
  readMoreLabel = "Read the vision",
  variant = "blog",
}: PostCardProps) {
  // 🔁 Unify all inputs: prefer `post`, fall back to individual props
  const effectiveSlug = post?.slug ?? slug ?? "";
  const effectiveTitle = post?.title ?? title ?? "";
  const effectiveDate = post?.date ?? date ?? "";
  const effectiveExcerpt = post?.excerpt ?? post?.summary ?? excerpt ?? "";

  // Safety: don't render if we still don't have a slug
  if (!effectiveSlug) return null;

  const href = `/${locale}/blog/${effectiveSlug}`;

  const formattedDate =
    effectiveDate && effectiveDate.trim().length > 0
      ? new Date(effectiveDate).toLocaleDateString(
          locale === "ht" ? "en-US" : locale,
          { year: "numeric", month: "short", day: "numeric" },
        )
      : "";

  const isBlog = variant === "blog";

  return (
    <article
      className={[
        "flex h-full flex-col rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md",
        isBlog ? "p-4" : "p-3",
      ].join(" ")}
    >
      <header className="mb-2">
        {formattedDate && (
          <p className="text-xs text-slate-500">{formattedDate}</p>
        )}
        <h2 className="mt-1 text-sm font-semibold leading-snug text-slate-900">
          <Link href={href} className="hover:underline">
            {effectiveTitle}
          </Link>
        </h2>
      </header>

      {effectiveExcerpt && (
        <p className="mb-3 line-clamp-3 text-xs text-slate-600">
          {effectiveExcerpt}
        </p>
      )}

      <div className="mt-auto pt-2">
        <Link
          href={href}
          className="text-xs font-semibold text-sky-700 hover:text-sky-800"
        >
          {readMoreLabel}
        </Link>
      </div>
    </article>
  );
}
