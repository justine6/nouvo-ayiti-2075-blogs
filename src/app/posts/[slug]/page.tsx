import { notFound } from "next/navigation";
import { getPostBySlug } from "@/lib/api";
import markdownToHtml from "@/lib/markdownToHtml";
import Container from "@app/_components/container";
import Header from "@app/_components/header";
import PostBody from "@app/_components/post-body";
import PostHeader from "@app/_components/post-header";
import Alert from "@app/_components/alert";
import type { Metadata } from "next";
import { CMS_NAME } from "@/lib/constants";
import type { Post as PostType } from "@/interfaces/post";

type Params = {
  params: {
    locale: string;
    slug: string;
  };
};


export default async function Post({ params }: Params) {
  const post: PostType | null = getPostBySlug("en", params.slug); // ✅ hardcoded fallback to 'en'



  if (!post) return notFound();

  const content = await markdownToHtml(post.content || "");

  return (
    <main>
      <Alert preview={post.preview} />
      <Container>
        <Header />
        <article className="mb-32">
          <PostHeader
            title={post.title}
            coverImage={post.coverImage}
            date={post.date}
            author={post.author}
          />
          <PostBody content={content} />
        </article>
      </Container>
    </main>
  );
}
