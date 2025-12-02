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
 * Keep track of which locales we've already warned about,
 * so the logs don't get spammed.
 */
const warnedLocales = new Set<string>();

export function getAllPosts(locale: string = "en"): Post[] {
  const postsDirectory = path.join(process.cwd(), "content", locale);

  // If the folder for this locale doesn't exist, handle fallback safely
  if (!fs.existsSync(postsDirectory)) {
    if (!warnedLocales.has(locale)) {
      warnedLocales.add(locale);

      if (locale !== "en") {
        console.warn(
          `⚠️ Locale folder not found for "${locale}": ${postsDirectory}. Falling back to "en".`
        );
      } else {
        console.warn(
          `⚠️ Default locale folder not found at ${postsDirectory}. Returning empty post list.`
        );
      }
    }

    // If we're not already on the default locale, try "en"
    if (locale !== "en") {
      return getAllPosts("en");
    }

    // If we *are* already on "en", don't recurse again — just return []
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
