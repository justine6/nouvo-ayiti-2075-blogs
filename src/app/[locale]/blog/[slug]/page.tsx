import { notFound } from "next/navigation";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import Container from "@/app/components/Container";
import type { Params } from "@/interfaces/post";
import { getAllPosts } from "@/lib/get-all-posts";
import markdownToHtml from "@/lib/markdownToHtml";
import type { Dictionary } from "@/lib/i18n/types";
import Link from "next/link";

type Props = {
  params: { slug: string; locale: string };
};

export default async function PostPage({ params }: Props) {
  const { slug, locale } = await Promise.resolve(params);

  const dict: Dictionary = await getDictionary(locale);

  const posts = getAllPosts(locale);
  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    return notFound();
  }

  const content = await markdownToHtml(post.content || "");

  return (
    <Container>
      <article className="prose prose-lg mx-auto py-8">
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        <div className="text-gray-500 text-sm mb-6">{post.date}</div>
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </article>

      <div className="mt-8">
        <Link href={`/${locale}/blog`} className="text-blue-600 hover:underline">
          ← {dict.blog.backToList}
        </Link>
      </div>
    </Container>
  );
}
