import { getPostBySlug, getAllPosts } from "@/lib/get-all-posts";

type Params = {
  params: { slug: string };
};

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Params) {
  const post = await getPostBySlug(params.slug);

  return {
    title: post?.metaTitle ?? "Nouvo Ayiti 2075 - Blog",
    description:
      post?.metaDescription ??
      "Stories, updates, and visions from Nouvo Ayiti 2075.",
  };
}

export default async function PostPage({ params }: Params) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    return (
      <div className="prose mx-auto py-10">
        <h1>Post not found</h1>
        <p>This blog post could not be loaded.</p>
      </div>
    );
  }

  return (
    <article className="prose mx-auto py-10">
      <h1>{post.title ?? "Untitled Post"}</h1>
      <p className="text-gray-500">{post.date ?? "Date unavailable"}</p>
      <div
        dangerouslySetInnerHTML={{
          __html: post.content ?? "<p>Content coming soon.</p>",
        }}
      />
    </article>
  );
}
