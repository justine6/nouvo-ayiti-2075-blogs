import Container from "@/app/components/Container";
import Intro from "@/app/components/Intro";
import HeroPost from "@/app/components/HeroPost";
import MoreStories from "@/app/components/MoreStories";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllPosts } from "@/lib/get-all-posts";
import { getDictionary } from "@/lib/i18n/get-dictionary";
type Props = {
  params: { slug: string; locale: string };
};

export default async function PostPage({ params }: Props) {
  const { slug, locale } = params;
  const dict = await getDictionary(locale);

  // Load posts for this locale
  let posts = getAllPosts(locale);
  let post = posts.find((p) => p.slug === slug);

  // Fallback to English if not found
  const isFallback = !post && locale !== "en";
  if (isFallback) {
    posts = getAllPosts("en");
    post = posts.find((p) => p.slug === slug);
  }

  if (!post) return notFound();

  return (
    <Container>
      <article className="prose lg:prose-xl mx-auto p-8">
        <h1>{post.title}</h1>
        <p className="text-gray-500">{post.date}</p>
        <MDXRemote source={post.content} />

        {/* Back to list button */}
        <div className="mt-8">
          <a
            href={`/${locale}/blog`}
            className="text-blue-600 hover:underline"
          >
            ← {dict.blog.backToList}
          </a>
        </div>
      </article>

      {/* Optional: show related stories */}
      <section className="mt-12">
        <h2>{dict.blog.moreStories}</h2>
        <MoreStories posts={posts.filter((p) => p.slug !== slug)} />
      </section>
    </Container>
  );
}
