import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { PostType } from "@/interfaces/post";

const postsDirectory = path.join(process.cwd(), "src/_posts");

// Function 1: getPostBySlug
export function getPostBySlug(slug: string): PostType {
  const realSlug = slug.replace(/\.mdx$/, "");
  const fullPath = path.join(postsDirectory, `${realSlug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    title: data.title,
    slug: realSlug,
    date: data.date,
    excerpt: data.excerpt,
    coverImage: data.coverImage,
    author: data.author,
    content,
    preview: false,
  };
}

// Function 2: getAllPosts
export function getAllPosts(): PostType[] {
  const slugs = fs.readdirSync(postsDirectory);
  const posts = slugs.map((slug) => {
    const realSlug = slug.replace(/\.mdx$/, "");
    const fullPath = path.join(postsDirectory, slug);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    return {
      title: data.title,
      slug: realSlug,
      date: data.date,
      excerpt: data.excerpt,
      coverImage: data.coverImage,
      author: data.author,
      content,
      preview: false,
    };
  });

  return posts;
}





