import Link from "next/link";
import type { Post } from "@/lib/get-all-posts";
import type { Locale } from "@/lib/i18n/settings";

type HeroPostProps = {
  post: Post;
  locale: Locale;
  readMoreLabel?: string;
};

const READ_MORE_LABELS: Record<Locale, string> = {
  en: "Read more",
  fr: "Lire la suite",
  ht: "Li plis",
  es: "Leer más",
};

function getReadMoreLabel(locale: Locale, override?: string) {
  if (override && override.trim().length > 0) return override;
  return READ_MORE_LABELS[locale] ?? READ_MORE_LABELS.en;
}

export default function HeroPost({ post, locale, readMoreLabel }: HeroPostProps) {
  if (!post) return null;

  const formattedDate =
    post.date && post.date.trim().length > 0
      ? new Date(post.date).toLocaleDateString(
          locale === "ht" ? "en-US" : locale,
          { year: "numeric", month: "short", day: "numeric" }
        )
      : "";

  const href = `/${locale}/blog/${post.slug}`;
  const finalReadMore = getReadMoreLabel(locale, readMoreLabel);

  return (
    <section className="mb-8 rounded-2xl border border-slate-200 bg-white/90 p-5 shadow-sm ring-1 ring-slate-100">
      <p className="text-xs font-semibold uppercase tracking-wide text-sky-700">
        Nouvo Ayiti 2075 · Featured story
      </p>

      <h2 className="mt-2 text-xl font-bold tracking-tight text-slate-900">
        <Link href={href} className="hover:underline">
          {post.title}
        </Link>
      </h2>

      {formattedDate && (
        <p className="mt-1 text-xs text-slate-500">{formattedDate}</p>
      )}

      <p className="mt-3 text-sm leading-relaxed text-slate-700">
        {post.summary}
      </p>

      <div className="mt-4">
        <Link
          href={href}
          className="inline-flex items-center gap-2 rounded-full bg-sky-600 px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-sky-700"
        >
          {finalReadMore}
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  );
}
