import { getPostBySlug, getAllPosts } from "@/lib/get-all-posts"

type Params = {
  params: { slug: string }
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
      <h1>{post.title}</h1>
      <p className="text-gray-500">{post.date}</p>
      {post.content}
    </article>
  );
}
