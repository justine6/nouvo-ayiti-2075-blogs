import { getAllPosts } from "@/lib/get-all-posts";
import Container from "@/components/Container";
import BlogCard from "@/components/BlogCard";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import type { Locale } from "@/lib/i18n/settings";

type Props = {
  params: { locale: Locale };
};

// ✅ Blog Page
export default async function BlogPage({ params }: Props) {
  const { locale } = await params;  // <-- fix

  const dict = await getDictionary(locale);
  const posts = getAllPosts(locale);

  return (
    <Container>
      <h1>{dict.blog.metaTitle}</h1>
      {/* render posts */}
    </Container>
  );
}

// ✅ Metadata
export async function generateMetadata({ params }: Props) {
  const { locale } = await params;  // <-- fix
  const dict = await getDictionary(locale);

  return {
    title: dict.blog.metaTitle || "Blog - Nouvo Ayiti 2075",
    description:
      dict.blog.metaDescription ||
      "Discover stories, insights, and updates from Nouvo Ayiti 2075."
  };
}
