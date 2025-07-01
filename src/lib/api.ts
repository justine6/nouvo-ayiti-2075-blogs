import fs from "fs";
import { join } from "path";
import matter from "gray-matter";
import { Post } from "@/interfaces/post";

const postsDirectory = join(process.cwd(), "src/_posts");

export function getAllPosts(locale: string): Post[] {
  const slugs = fs.readdirSync(postsDirectory);

  const posts = slugs.map((slug) => {
    const fullPath = join(postsDirectory, slug);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data } = matter(fileContents);

    return {
      title: data.title,
      slug: slug.replace(/\.mdx$/, ""),
      date: data.date,
      author: data.author,
      excerpt: data.excerpt,
      coverImage: data.coverImage,
    };
  });

  return posts;
}
