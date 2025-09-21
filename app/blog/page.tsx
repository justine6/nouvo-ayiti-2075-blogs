import { notFound } from "next/navigation";
import { getAllPosts } from "@/app/lib/get-all-posts";
import Container from "@/app/components/Container";
import BlogCard from "@/app/components/BlogCard";

type Props = {
  params: { locale: string };
};

export default function BlogIndex({ params }: Props) {
  const { locale } = params;

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
