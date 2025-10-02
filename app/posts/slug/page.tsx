import { getPostBySlug, getAllPosts } from "@/lib/get-all-posts";

type Params = {
  params: { slug: string };
};

// Pre-generate paths for all posts
export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

// Generate metadata dynamically
export async function generateMetadata({ params }: Params) {
  const post = await getPostBySlug(params?.slug);

  if (!post) {
    return {
      title: "Post Not Found - Nouvo Ayiti 2075",
      description: "The requested blog post could not be found.",
    };
  }

  // 👇 Add this block inside generateMetadata
  const baseUrl = "https://blogs.nouvoayiti2075.com";

  const ogImage = post.image
    ? `${baseUrl}/api/og?title=${encodeURIComponent(
        post.title
      )}&image=${encodeURIComponent(baseUrl + post.image)}&locale=${
        post.locale ?? "en"
      }`
    : `${baseUrl}/api/og?slug=${post.slug}&locale=${post.locale ?? "en"}`;

  return {
    title: post.metaTitle ?? post.title,
    description:
      post.metaDescription ??
      post.excerpt ??
      "Stories, updates, and visions from Nouvo Ayiti 2075.",
    openGraph: {
      title: post.title,
      description:
        post.excerpt ??
        "Stories, updates, and visions from Nouvo Ayiti 2075.",
      images: [ogImage], // ✅ use dynamic OG here
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description:
        post.excerpt ??
        "Stories, updates, and visions from Nouvo Ayiti 2075.",
      images: [ogImage], // ✅ same for Twitter
    },
  };
}

// Render the page
export default async function PostPage({ params }: Params) {
  const post = await getPostBySlug(params?.slug);

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
      {post.content} {/* ✅ MDX content renders as React */}
    </article>
  );
}
