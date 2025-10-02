import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { compileMDX } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import { mdxComponents } from "./mdx-components";
import React from "react";

const postsDirectory = path.join(process.cwd(), "content/posts");

// ✅ Toggle excerpt behavior here
const AUTO_GENERATE_EXCERPTS = true;

export type Post = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  metaTitle?: string;
  metaDescription?: string;
  coverImage?: string;
  content?: React.ReactNode; // compiled MDX React component
};

// Helper to generate excerpt
function generateExcerpt(content: string, maxLength = 200): string {
  const plainText = content
    .replace(/[#_*>\-\n]/g, " ") // strip markdown symbols
    .replace(/\s+/g, " ") // collapse spaces
    .trim();

  return plainText.length > maxLength
    ? plainText.slice(0, maxLength).trim() + "..."
    : plainText;
}

// Helper to parse/normalize date
function parseDate(date: string | undefined, slug: string): string {
  if (!date) {
    console.warn(`⚠️ No date for "${slug}". Using today’s date.`);
    return new Date().toISOString().split("T")[0]; // YYYY-MM-DD
  }
  return new Date(date).toISOString().split("T")[0];
}

// ✅ Get all posts (metadata only, sorted by date, with summary report)
export function getAllPosts(): Post[] {
  const slugs = fs.readdirSync(postsDirectory);
  const missingExcerpts: string[] = [];

  const posts = slugs
    .filter((file) => file.endsWith(".mdx"))
    .map((slug) => {
      const realSlug = slug.replace(/\.mdx?$/, "");
      const fullPath = path.join(postsDirectory, slug);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);

      // Excerpt logic
      let excerpt: string;
      if (data.excerpt) {
        excerpt = data.excerpt;
      } else if (AUTO_GENERATE_EXCERPTS) {
        excerpt = generateExcerpt(content);
        missingExcerpts.push(`${data.title || realSlug} (auto-generated)`);
      } else {
        excerpt = "No description available.";
        missingExcerpts.push(`${data.title || realSlug} (missing)`);
      }

      return {
        slug: data.slug || realSlug,
        title: data.title || "Untitled Post",
        date: parseDate(data.date, realSlug),
        excerpt,
        metaTitle:
          data.metaTitle ||
          `${data.title || "Untitled"} | Nouvo Ayiti 2075 Blog`,
        metaDescription: data.metaDescription || excerpt.slice(0, 160),
        coverImage: data.coverImage || "/images/default-cover.jpg",
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  // ⚠️ Print summary report once
  if (missingExcerpts.length > 0) {
    console.warn("\n⚠️ Excerpt Report:");
    missingExcerpts.forEach((post) => console.warn(` - ${post}`));
    console.warn("⚠️ Consider adding manual excerpts in frontmatter.\n");
  }

  return posts;
}

// ✅ Get single post by slug (with compiled MDX)
export async function getPostBySlug(slug: string): Promise<Post | null> {
  const fullPath = path.join(postsDirectory, `${slug}.mdx`);
  if (!fs.existsSync(fullPath)) return null;

  const source = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(source);

  // Excerpt logic
  let excerpt: string;
  if (data.excerpt) {
    excerpt = data.excerpt;
  } else if (AUTO_GENERATE_EXCERPTS) {
    excerpt = generateExcerpt(content);
    console.warn(
      `⚠️ No manual excerpt found for "${data.title || slug}". Auto-generated one instead.`
    );
  } else {
    excerpt = "No description available.";
    console.warn(
      `⚠️ No excerpt provided for "${data.title || slug}". Defaulted to fallback text.`
    );
  }

  const mdxSource = await compileMDX({
    source: content,
    components: mdxComponents,
    options: {
      parseFrontmatter: false,
      mdxOptions: {
        rehypePlugins: [
          [
            rehypePrettyCode,
            {
              theme: "github-dark",
              keepBackground: false,
              onVisitLine(node) {
                if (node.children.length === 0) {
                  node.children = [{ type: "text", value: " " }];
                }
                node.properties.className = ["line"];
              },
              onVisitHighlightedLine(node) {
                node.properties.className = (node.properties.className || []).concat("highlighted");
              },
              onVisitHighlightedWord(node) {
                node.properties.className = ["highlighted-word"];
              },
            },
          ],
        ],
      },
    },
  });

  return {
    slug: data.slug || slug,
    title: data.title || "Untitled Post",
    date: parseDate(data.date, slug),
    excerpt,
    metaTitle:
      data.metaTitle || `${data.title || "Untitled"} | Nouvo Ayiti 2075 Blog`,
    metaDescription: data.metaDescription || excerpt.slice(0, 160),
    coverImage: data.coverImage || "/images/default-cover.jpg",
    content: mdxSource,
  };
}
