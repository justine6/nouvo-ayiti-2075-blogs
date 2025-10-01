import fs from "fs";
import { join } from "path";
import matter from "gray-matter";
import type { PostType } from "@/types";

const postsDirectory = join(process.cwd(), "content/posts");

export function getAllPosts(locale?: string): PostType[] {
  const safeLocale = locale || "en";
  const dir = join(postsDirectory, safeLocale);

  if (!fs.existsSync(dir)) return [];

  const slugs = fs.readdirSync(dir);

  const posts: PostType[] = slugs
    .filter((slug) => slug.endsWith(".mdx"))
    .map((slug) => {
      const realSlug = slug.replace(/\.mdx$/, "");
      const fullPath = join(dir, slug);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);

      return {
        ...data,
        slug: realSlug,
        locale: safeLocale, // always include locale
        content,
      } as PostType;
    });

  // sort by date descending
  return posts.sort((a, b) => (a.date > b.date ? -1 : a.date < b.date ? 1 : 0));
}

export function getPostBySlug(slug: string, locale?: string): PostType | null {
  const safeLocale = locale || "en";
  const dir = join(postsDirectory, safeLocale);
  const fullPath = join(dir, `${slug}.mdx`);

  if (!fs.existsSync(fullPath)) return null;

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    ...data,
    slug,
    locale: safeLocale,
    content,
  } as PostType;
}
