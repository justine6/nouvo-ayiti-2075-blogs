import fs from "fs";
import path from "path";
import matter from "gray-matter";

export function getPostBySlug(slug: string) {
  const postsDirectory = path.join(process.cwd(), "posts");
  const realSlug = slug.replace(/\.mdx?$/, "");
  const fullPath = path.join(postsDirectory, `${realSlug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return { slug: realSlug, meta: data, content };
}
