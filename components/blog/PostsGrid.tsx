import Link from "next/link";
import type { Post } from "@/lib/get-all-posts";
import type { Locale } from "@/lib/i18n/settings";

type PostsGridProps = {
  posts: Post[];
  locale: Locale;
};

export default function PostsGrid({ posts, locale }: PostsGridProps) {
  if (!posts || posts.length === 0) {
    return (
      <p className="na-blog-empty">
        No posts available yet. Please check back soon.
      </p>
    );
  }

  return (
    <section aria-label="Blog posts" className="na-blog-grid">
      {posts.map((post) => {
        const formattedDate =
          post.date && post.date.trim().length > 0
            ? new Date(post.date).toLocaleDateString(
                locale === "ht" ? "en-US" : locale,
                { year: "numeric", month: "short", day: "numeric" }
              )
            : "";

        return (
          <article key={post.slug} className="na-blog-card">
            {formattedDate && (
              <p className="na-blog-card-date">{formattedDate}</p>
            )}

            <h2 className="na-blog-card-title">
              <Link href={`/${locale}/blog/${post.slug}`}>{post.title}</Link>
            </h2>

            {post.summary && (
              <p className="na-blog-card-excerpt">{post.summary}</p>
            )}

            <div className="na-blog-card-footer">
              <Link
                href={`/${locale}/blog/${post.slug}`}
                className="na-blog-card-link"
              >
                Read more →
              </Link>
            </div>
          </article>
        );
      })}
    </section>
  );
}
