import BlogCard from "@/components/BlogCard";
import type { Locale } from "@/lib/i18n/get-dictionary";

type MoreStoriesProps = {
  posts: {
    slug: string;
    title: string;
    excerpt: string;
    coverImage?: string;
  }[];
  locale: Locale;
  moreStoriesLabel?: string; // from dict.moreStories
  readMoreLabel?: string;    // from dict.readMore
};

export default function MoreStories({ posts, locale, moreStoriesLabel, readMoreLabel }: MoreStoriesProps) {
  if (!posts || posts.length === 0) return null;

  return (
    <section id="more" className="mt-16">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">
        {moreStoriesLabel || "More stories"}
      </h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <BlogCard
            key={post.slug}
            post={post}
            locale={locale}
            readMoreLabel={readMoreLabel}
          />
        ))}
      </div>
    </section>
  );
}

