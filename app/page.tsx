import Image from "next/image";
import Container from "@/app/_components/container";
import Intro from "@/app/_components/intro";
import { HeroPost } from "@/app/_components/hero-post";
import { MoreStories } from "@/app/_components/more-stories";
import { getAllPosts } from "@/lib/api";

export default function Index() {
  const allPosts = getAllPosts();

  const heroPost = allPosts[0];
  const morePosts = allPosts.slice(1);

  return (
    <main>
      {/* Mission Banner */}
      <section className="relative w-full h-[40vh] md:h-[55vh] overflow-hidden">

        <Image
          src="/images/blog/mission-banner.png"
          alt="Map of Haiti"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <h1 className="text-white text-3xl md:text-5xl font-bold text-center px-4">
            Nouvo Ayiti 2075 — Restoring Dignity
          </h1>
        </div>
      </section>

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
        {morePosts.length > 0 && <MoreStories posts={morePosts} />}
      </Container>
    </main>
  );
}
