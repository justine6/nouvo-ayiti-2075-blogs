import Link from "next/link";
import type { Post } from "@/lib/get-all-posts";
import type { BlogDictionary } from "@/lib/i18n/types";

type BlogSectionProps = {
  locale: string;
  posts: Post[];
  dictionary?: BlogDictionary; // can be undefined on /projects
};

export default function BlogSection({ locale, posts, dictionary }: BlogSectionProps) {
  const safeLocale = (locale || "en").trim();

  // ✅ Never crash if dictionary.blogSection is missing
  const blogSection =
    (dictionary as any)?.blogSection ?? {
      title: "Ayiti 2075 Blog",
      paragraph: "Stories, updates, and visions for the future.",
      cta: "View all posts",
      blogUnavailable: "No posts available yet.",
      readMore: "Read more",
    };

  const latestPosts = posts.slice(0, 3);
  const hasPosts = latestPosts.length > 0;

  return (
    <section className="py-12 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading + CTA */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {blogSection.title}
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              {blogSection.paragraph}
            </p>
          </div>
          <Link
            href={`/${safeLocale}/blog`}
            className="mt-4 md:mt-0 inline-block bg-blue-600 text-white px-5 py-2 rounded-lg shadow hover:scale-105 transition-transform"
          >
            {blogSection.cta}
          </Link>
        </div>

        {/* No posts available */}
        {!hasPosts ? (
          <p className="text-center text-gray-500 italic">
            {blogSection.blogUnavailable}
          </p>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {latestPosts.map((post) => (
              <article
                key={post.slug}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 hover:shadow-lg transition"
              >
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                  {post.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                  {post.excerpt || post.summary || blogSection.blogUnavailable}
                </p>
                <Link
                  href={`/${safeLocale}/blog/${post.slug}`}
                  className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
                >
                  {blogSection.readMore}
                </Link>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
