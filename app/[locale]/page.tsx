import { getDictionary } from "@/lib/get-dictionary";
import type { Locale } from "@/lib/settings";
import { getAllPosts } from "@/lib/get-all-posts";

import HeroPost from "@/components/HeroPost";
import MoreStories from "@/components/MoreStories";

type Props = {
  params: { locale: Locale };
};

export default async function HomePage({ params }: Props) {
  const locale = params?.locale || "en";
  const dict = await getDictionary(locale);

  const allPosts = getAllPosts(locale) || [];
  const heroPost = allPosts.length > 0 ? allPosts[0] : null;
  const morePosts = allPosts.length > 1 ? allPosts.slice(1) : [];

  return (
    <div>
      {/* 🔹 Show fallback if no posts exist */}
      {allPosts.length === 0 && (
        <p className="text-center text-gray-500 my-12">{dict.blog.noPosts}</p>
      )}

      {/* 🔹 Otherwise show Hero + MoreStories */}
      {allPosts.length > 0 && heroPost && (
        <>
          <HeroPost
            title={heroPost.title}
            coverImage={heroPost.coverImage}
            date={heroPost.date}
            author={heroPost.author}
            slug={heroPost.slug}
            excerpt={heroPost.excerpt}
          />

          {morePosts.length > 0 && <MoreStories posts={morePosts} />}
        </>
      )}
    </div>
  );
}
