import Container from "@/app/components/Container";
import Intro from "@/app/components/Intro";
import HeroPost from "@/app/components/HeroPost";
import MoreStories from "@/app/components/MoreStories";
import { getAllPosts } from "@/lib/get-all-posts";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import type { Locale } from "@/lib/i18n/settings";

type Props = {
  params: { locale: Locale };
};

export default async function HomePage({ params }: Props) {
  const { locale } = params;
  const dict = await getDictionary(locale);

  // ✅ Load posts for this locale
  let posts = getAllPosts(locale);

  // ✅ Fallback to English if none exist
  if (!posts || posts.length === 0) {
    posts = getAllPosts("en");
  }

  const heroPost = posts[0];
  const morePosts = posts.slice(1);

  return (
    <main>
      <Container>
        <Intro />

        {heroPost && (
          <HeroPost
            title={heroPost.title}
            coverImage={heroPost.coverImage}
            date={heroPost.date}
            author={heroPost.author}
            slug={heroPost.slug}
            excerpt={heroPost.excerpt}
          />
        )}

        {morePosts.length > 0 && (
          <>
            <h2 className="mt-12 mb-6 text-2xl font-bold">
              {dict.blog.moreStories}
            </h2>
            <MoreStories posts={morePosts} />
          </>
        )}
      </Container>
    </main>
  );
}
