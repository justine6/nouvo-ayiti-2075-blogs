import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "content/posts");

export function getAllPosts() {
  const slugs = fs.readdirSync(postsDirectory);

  return slugs.map((slug) => {
    const realSlug = slug.replace(/\.mdx?$/, "");
    const fullPath = path.join(postsDirectory, slug);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data } = matter(fileContents);

    return {
      slug: realSlug,
      frontmatter: data,
    };
  });
}
