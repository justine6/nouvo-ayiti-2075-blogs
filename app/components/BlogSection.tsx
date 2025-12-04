import Link from "next/link";
import type { Post } from "../../lib/get-all-posts";
import type { BlogDictionary } from "../../lib/i18n/types";

type BlogSectionProps = {
  locale: string;
  posts: Post[];
  dictionary?: BlogDictionary;
};

export default function BlogSection({
  locale,
  posts,
  dictionary,
}: BlogSectionProps) {
  const labels = dictionary?.blogSection ?? {};

  if (!posts || posts.length === 0) {
    return (
      <section className="py-10">
        <div className="mx-auto max-w-4xl px-4">
          <h2 className="text-2xl font-semibold">
            {labels.title ?? "Ayiti 2075 Blog"}
          </h2>
          <p className="mt-4 text-sm text-neutral-600">
            {labels.blogUnavailable ??
              "No posts are available yet. Please check back soon."}
          </p>
        </div>
      </section>
    );
  }

  const [first, ...rest] = posts;

  return (
    <section className="py-10">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold">
              {labels.title ?? "From the Ayiti 2075 Blog"}
            </h2>
            {labels.subtitle && (
              <p className="mt-2 text-sm text-neutral-600">{labels.subtitle}</p>
            )}
          </div>
          <div>
            <Link
              href={`/${locale}/blog`}
              className="text-sm font-semibold underline underline-offset-4"
            >
              {labels.viewAll ?? "View all posts"}
            </Link>
          </div>
        </div>

        <div className="mt-8 space-y-6">
          {[first, ...rest].map((post) =>
            post ? (
              <article
                key={post.slug}
                className="border-b pb-4 last:border-none"
              >
                <h3 className="text-lg font-semibold">
                  <Link href={`/${locale}/blog/${post.slug}`}>
                    {post.title}
                  </Link>
                </h3>
                <p className="mt-1 text-xs text-neutral-500">
                  {new Date(post.date).toLocaleDateString(
                    locale === "ht" ? "en-US" : locale,
                    { year: "numeric", month: "short", day: "numeric" },
                  )}
                </p>
                <p className="mt-2 text-sm text-neutral-700">{post.summary}</p>
                <Link
                  href={`/${locale}/blog/${post.slug}`}
                  className="mt-2 inline-flex text-sm font-semibold underline underline-offset-4"
                >
                  {labels.readMore ?? "Read more"}
                </Link>
              </article>
            ) : null,
          )}
        </div>
      </div>
    </section>
  );
}
