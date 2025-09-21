import { getDictionary } from "@/lib/i18n/get-dictionary";
import { getAllPosts } from "@/lib/get-all-posts";
import BlogCard from "@/components/BlogCard";
import Intro from "@/components/Intro";
import MoreStories from "@/components/MoreStories";

// Define supported locales here since settings.ts doesn't exist
export type Locale = "en" | "fr" | "ht" | "es";

type Props = {
  params: { locale: Locale };
};

export default async function HomePage({ params }: Props) {
  const { locale } = params;

  // Get locale dictionary + posts
  const dict = await getDictionary(locale);
  const posts = await getAllPosts(locale);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Intro Section */}
      <Intro title={dict.title} subtitle={dict.subtitle} locale={locale} />

      {/* Blog posts */}
      {posts.length > 0 ? (
        <>
          {/* First 3 posts */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.slice(0, 3).map((post) => (
              <BlogCard
                key={post.slug}
                post={post}
                locale={locale}
                readMoreLabel={dict.readMore}
              />
            ))}
          </div>

          {/* More stories */}
          {posts.length > 3 && (
            <MoreStories
              posts={posts.slice(3)}
              locale={locale}
              moreStoriesLabel={dict.moreStories}
              readMoreLabel={dict.readMore}
            />
          )}
        </>
      ) : (
        <p className="text-center text-gray-500 dark:text-gray-400">
          {dict.noPosts || "No posts available."}
        </p>
      )}
    </div>
  );
}
