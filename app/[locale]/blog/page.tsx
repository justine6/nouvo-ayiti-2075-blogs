import Link from "next/link";
import { getAllPosts } from "../../../lib/get-all-posts";
import { getDictionary } from "../../../lib/i18n/get-dictionary";
import { normalizeLocale } from "../../../lib/i18n/settings";

type PageProps = {
  params: { locale: string };
};

export default async function BlogIndexPage({ params }: PageProps) {
  const locale = normalizeLocale(params.locale);
  const dict = await getDictionary(locale);
  const labels = dict.blogSection ?? {};

  const posts = getAllPosts();

  return (
    <main className="min-h-screen bg-white py-10">
      <div className="mx-auto max-w-5xl px-4">
        <h1 className="text-3xl font-bold">{labels.title ?? "Our Blog"}</h1>
        <p className="mt-2 text-neutral-600">
          {labels.subtitle ?? "Stories, updates, and visions for the future."}
        </p>

        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => {
            const formattedDate = new Date(post.date).toLocaleDateString(
              locale === "ht" ? "en-US" : locale,
              { year: "numeric", month: "short", day: "numeric" },
            );

            return (
              <article
                key={post.slug}
                className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm transition hover:shadow-md"
              >
                <Link
                  href={`/${locale}/blog/${post.slug}`}
                  className="text-lg font-semibold hover:underline"
                >
                  {post.title}
                </Link>

                <p className="mt-1 text-sm text-neutral-500">{formattedDate}</p>

                <p className="mt-3 text-sm text-neutral-700">{post.summary}</p>

                <Link
                  href={`/${locale}/blog/${post.slug}`}
                  className="mt-4 inline-block text-sm font-medium text-purple-700 hover:underline"
                >
                  {labels.readMore ?? "Read the vision"}
                </Link>
              </article>
            );
          })}
        </div>
      </div>
    </main>
  );
}
