import Link from "next/link";
import Image from "next/image";
import type { Locale } from "@/lib/i18n/settings";
import type { Post } from "@/lib/get-all-posts";

type PostCardProps = {
  locale: Locale;
  post: Post;
};

export default function PostCard({ locale, post }: PostCardProps) {
  const { slug, title, date, summary, coverImage } = post;

  if (!slug) return null;

  const href = `/${locale}/blog/${slug}`;

  const formattedDate =
    date && date.trim().length > 0
      ? new Date(date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })
      : "";

  const imageSrc = coverImage || "/images/nouvoayiti2075-logo.png";

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white/80 shadow-sm backdrop-blur transition hover:-translate-y-1 hover:border-emerald-400/80 hover:shadow-lg">
      <div className="relative h-44 w-full overflow-hidden">
        <Image
          src={imageSrc}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
        />
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        {formattedDate && (
          <p className="text-xs font-medium uppercase tracking-wide text-emerald-700/80">
            {formattedDate}
          </p>
        )}

        <h2 className="line-clamp-2 text-lg font-semibold text-slate-900 group-hover:text-emerald-700">
          {title}
        </h2>

        <p className="line-clamp-3 text-sm text-slate-600">{summary}</p>

        <div className="mt-4 flex items-center justify-between gap-2">
          <Link
            href={href}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-emerald-700 hover:text-emerald-800"
          >
            Read more
            <span
              aria-hidden="true"
              className="transition group-hover:translate-x-0.5"
            >
              →
            </span>
          </Link>

          <span className="rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-emerald-700">
            Nouvo Ayiti 2075
          </span>
        </div>
      </div>
    </article>
  );
}
