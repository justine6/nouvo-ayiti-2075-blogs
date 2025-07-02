import { notFound } from "next/navigation";
import { getPostBySlug } from "@/lib/api";
import markdownToHtml from "@/lib/markdownToHtml";
import Container from "@/app/_components/container";
import Header from "@/app/_components/header";
import { PostHeader } from "@/app/_components/post-header";
import { PostBody } from "@/app/_components/post-body";
import Alert from "@/app/_components/alert";

import type { PostType, Params } from "@/interfaces/post";

export default async function Post({ params }: { params: Params }) {
  const raw = getPostBySlug(params.slug);

  if (!raw) return notFound();

  const content = await markdownToHtml(raw.content || "");

  // Normalize author (in case it's a string in .mdx)
  const author =
    typeof raw.author === "string"
      ? {
          name: raw.author,
          picture: "/images/default-author.jpg", // Use your own default
        }
      : raw.author;

const post: PostType = {
  ...raw,
  content,
  author,
  coverImage: raw.coverImage || "/images/default.jpg",
};


  return (
    <main>
      <Alert preview={!!post.preview} />
      <Container>
        <Header />
        <article className="mb-32">
          <PostHeader
            title={post.title}
            coverImage={post.coverImage}
            date={post.date}
            author={post.author}
          />
          <PostBody content={post.content} />
        </article>
      </Container>
    </main>
  );
}
