import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import Container from "@/components/Container";
import BlogCard from "@/components/BlogCard";         // ✅ BlogCard from PostCard
import MoreStories from "@/components/MoreStories";   // ✅ MoreStories from PostCard
import { getAllPosts } from "@/lib/get-all-posts";

type Props = {
  params: { slug: string; locale: string };
};

export default function PostPage({ params }: Props) {
  const { slug, locale } = params;

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
      </article>

      {/* ✅ Featured BlogCard (optional, e.g., highlight current post) */}
      <section className="mt-12">
        <BlogCard
          slug={post.slug}
          title={post.title}
          date={post.date}
          excerpt={post.excerpt}
          coverImage={post.coverImage}
        />
      </section>

      {/* ✅ More Stories Section */}
      <section className="mt-16">
        <h2 className="text-2xl font-bold mb-6">More Stories</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {posts
            .filter((p) => p.slug !== slug) // skip current post
            .slice(0, 4) // limit to 4
            .map((p) => (
              <MoreStories
                key={p.slug}
                slug={p.slug}
                title={p.title}
                date={p.date}
                excerpt={p.excerpt}
                coverImage={p.coverImage}
              />
            ))}
        </div>
      </section>
    </Container>
  );
}
