// lib/get-all-posts.ts

import fs from "fs";
import path from "path";
import matter from "gray-matter";

// Define the shape of a post
export interface Post {
  slug: string;
  content: string;
  title?: string;
  date?: string;
  [key: string]: any; // allow extra fields from frontmatter
}

const postsDirectory = path.join(process.cwd(), "content");

export function getAllPosts(locale: string = "en"): Post[] {
  const localeDir = path.join(postsDirectory, locale);

  if (!fs.existsSync(localeDir)) {
    console.warn(`⚠️ Locale folder not found: ${localeDir}, falling back to 'en'`);
    return getAllPosts("en"); // fallback
  }

  const fileNames = fs.readdirSync(localeDir);

  const posts: Post[] = fileNames
    .filter((file) => file.endsWith(".md") || file.endsWith(".mdx"))
    .map((fileName) => {
      const fullPath = path.join(localeDir, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);

      return {
        slug: fileName.replace(/\.mdx?$/, ""),
        content,
        ...(data as Record<string, any>),
      };
    });

  return posts;
}
