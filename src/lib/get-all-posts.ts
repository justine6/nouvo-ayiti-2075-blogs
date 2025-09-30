import fs from "fs";
import { join } from "path";
import matter from "gray-matter";
import type { PostType } from "@/interfaces/post";

const postsDirectory = join(process.cwd(), "src/content/posts");

/**
 * Get all posts for a given locale
 */
export function getAllPosts(locale: string): PostType[] {
  const dir = join(postsDirectory, locale);
  if (!fs.existsSync(dir)) return [];

  const slugs = fs.readdirSync(dir);

  const posts: PostType[] = slugs
    .filter((slug) => slug.endsWith(".mdx") || slug.endsWith(".md"))
    .map((slug) => {
      const realSlug = slug.replace(/\.mdx?$/, "");
      const fullPath = join(dir, slug);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);

      return {
        ...data,
        slug: realSlug,
        locale, // ✅ always include locale
        content,
      } as PostType;
    });

  // sort by date descending
  return posts.sort((a, b) => (a.date > b.date ? -1 : 1));
}

/**
 * Get a single post by slug for a given locale
 */
export function getPostBySlug(slug: string, locale: string): PostType | null {
  const dir = join(postsDirectory, locale);
  const fullPath = join(dir, `${slug}.mdx`);

  if (!fs.existsSync(fullPath)) return null;

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    ...data,
    slug,
    locale, // ✅ include locale here too
    content,
  } as PostType;
}
