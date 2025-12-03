import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface Post {
  slug: string;
  title: string;
  date: string;
  summary: string;
  content: string;
  excerpt?: string;
}

/**
 * Read all markdown posts from content/<locale>.
 * If the locale folder is missing, return an empty list instead of recursing.
 */
export function getAllPosts(locale: string = "en"): Post[] {
  const safeLocale = (locale ?? "en").trim() || "en";

  const postsDirectory = path.join(process.cwd(), "content", safeLocale);

  if (!fs.existsSync(postsDirectory)) {
    console.warn(
      `⚠️ Locale folder not found: ${postsDirectory}. Returning empty post list.`
    );
    return [];
  }

  const fileNames = fs
    .readdirSync(postsDirectory)
    .filter((file) => file.endsWith(".md") || file.endsWith(".mdx"));

  const posts: Post[] = fileNames.map((fileName) => {
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    return {
      slug: fileName.replace(/\.mdx?$/, ""),
      title: data.title || "",
      date: data.date || "",
      summary: data.summary || "",
      content,
      excerpt: data.excerpt || data.summary || "",
    };
  });

  return posts;
}
