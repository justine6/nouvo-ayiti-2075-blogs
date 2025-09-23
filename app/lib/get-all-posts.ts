import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDir = path.join(process.cwd(), "content/posts");

export function getAllPosts() {
  const files = fs.readdirSync(postsDir);

  return files
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const fullPath = path.join(postsDir, file);
      const source = fs.readFileSync(fullPath, "utf-8");
      const { data, content } = matter(source);

      return {
        slug: file.replace(/\.mdx$/, ""),
        ...data,
        content,
      };
    });
}
