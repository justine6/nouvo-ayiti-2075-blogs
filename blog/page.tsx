import { notFound } from "next/navigation";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { getAllPosts } from "@/lib/get-all-posts";
import Container from "@/app/components/Container";
import BlogCard from "@/app/components/BlogCard";

type Props = {
  params: { locale: string };
};

export default async function BlogIndex({ params }: Props) {
  const { locale } = params;
  const dict = await getDictionary(locale);

  // Load posts for the current locale
  let posts = getAllPosts(locale);

  // Fallback to English if none are found
  if (!posts || posts.length === 0) {
    if (locale !== "en") {
      posts = getAllPosts("en");
    } else {
      return notFound();
    }
  }

  return (
    <Container>
      <section className="prose lg:prose-xl mx-auto p-8">
        <h1>{dict.blog.title}</h1>
        <p className="text-gray-600">{dict.blog.subtitle}</p>

        {posts.length === 0 ? (
          <p>{dict.blog.noPosts}</p>
        ) : (
          <div className="grid gap-6 mt-8 md:grid-cols-2">
            {posts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        )}
      </section>
    </Container>
  );
}






