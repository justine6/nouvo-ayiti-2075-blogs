import Container from "@/components/Container";
import Intro from "@/components/Intro";
import HeroPost from "@/components/HeroPost";
import MoreStories from "@/components/MoreStories";
import { getAllPosts } from "@/lib/get-all-posts";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import type { Locale } from "@/lib/i18n/settings";

type Props = {
  params: { locale: Locale };
};

export default async function HomePage({ params }: Props) {
  const { locale } = params;
  const dict = await getDictionary(locale);

  // Load posts for this locale
  let posts = getAllPosts(locale);

  // Fallback to English if none exist
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
            post={heroPost}
            locale={locale}
            readMoreLabel={dict.blog.readMore}
          />
        )}

        {morePosts.length > 0 && (
          <MoreStories
            posts={morePosts}
            locale={locale}
            readMoreLabel={dict.blog.readMore}
          />
        )}
      </Container>
    </main>
  );
}
