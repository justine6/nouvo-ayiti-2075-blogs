import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDir = path.join(process.cwd(), "src/content/posts");

export type Post = {
  slug: string;
  locale: string;
  title: string;
  date: string;
  excerpt?: string;
  coverImage?: string;
  content: string; // ✅ include full MDX content
};

export function getAllPosts(locale: string): Post[] {
  const localeDir = path.join(postsDir, locale);

  if (!fs.existsSync(localeDir)) return [];

  return fs
    .readdirSync(localeDir)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const slug = file.replace(/\.mdx$/, "");
      const fullPath = path.join(localeDir, file);
      const fileContents = fs.readFileSync(fullPath, "utf-8");

      const { data, content } = matter(fileContents);

      return {
        slug,
        locale,
        title: data.title || slug,
        date: data.date || "",
        excerpt: data.excerpt || "",
        coverImage: data.coverImage || "",
        content, // ✅ keep raw MDX here
      };
    })
    .sort((a, b) => (a.date > b.date ? -1 : 1));
}
