import { getAllPosts } from "@/lib/api";
import BlogCard from "@/app/_components/BlogCard";

type Props = {
  params: { locale: string };
};

export default function BlogIndexPage({ params }: Props) {
  const posts = getAllPosts(params.locale);

  return (
    <main className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold mb-8">Nouvo Ayiti Blog</h1>
      {posts.length === 0 && <p>No articles found for this language.</p>}
      <div className="grid gap-8">
        {posts.map((post) => (
          <BlogCard
            key={post.slug}
            title={post.title}
            date={post.date}
            excerpt={post.excerpt}
            coverImage={post.coverImage}
            author={
              typeof post.author === "string" ? post.author : post.author?.name
            }
            slug={post.slug}
          />
        ))}
      </div>
    </main>
  );
}





