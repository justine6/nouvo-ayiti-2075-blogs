import Link from "next/link";
import type { Locale } from "@/lib/i18n/settings";

type PostCardProps = {
  locale: Locale;
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  variant?: "blog" | "more";
};

export default function PostCard({
  locale,
  slug,
  title,
  date,
  excerpt,
}: PostCardProps) {
  if (!slug) return null;

  const href = `/${locale}/blog/${slug}`;

  const formattedDate =
    date && date.trim().length > 0
      ? new Date(date).toLocaleDateString(
          locale === "ht" ? "en-US" : locale,
          { year: "numeric", month: "short", day: "numeric" }
        )
      : "";

  return (
    <article className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <header className="mb-2">
        {formattedDate && (
          <p className="text-xs text-slate-500">{formattedDate}</p>
        )}
        <h2 className="mt-1 text-sm font-semibold leading-snug text-slate-900">
          <Link href={href} className="hover:underline">
            {title}
          </Link>
        </h2>
      </header>

      <p className="mb-3 line-clamp-3 text-xs text-slate-600">{excerpt}</p>

      <div className="mt-auto pt-2">
        <Link
          href={href}
          className="text-xs font-semibold text-sky-700 hover:text-sky-800"
        >
          Read the vision
        </Link>
      </div>
    </article>
  );
}
