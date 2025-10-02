// scripts/fix-posts.ts
import fs from "fs";
import path from "path";
import matter from "gray-matter";

// All locales you support
const locales = ["en", "fr", "ht", "es"];

// Helper to generate excerpt
function generateExcerpt(content: string, maxLength = 200): string {
  const plainText = content
    .replace(/[#_*>\-\n]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  return plainText.length > maxLength
    ? plainText.slice(0, maxLength).trim() + "..."
    : plainText;
}

function fixPosts() {
  locales.forEach((loc) => {
    const postsDirectory = path.join(process.cwd(), "app", loc, "posts");

    if (!fs.existsSync(postsDirectory)) {
      console.warn(`⚠️ Skipping missing folder: ${postsDirectory}`);
      return;
    }

    const slugs = fs.readdirSync(postsDirectory).filter((f) => f.endsWith(".mdx"));

    slugs.forEach((slug) => {
      const fullPath = path.join(postsDirectory, slug);
      const source = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(source);

      let updated = false;

      if (!data.slug) {
        data.slug = slug.replace(/\.mdx?$/, "");
        updated = true;
      }
      if (!data.title) {
        data.title = "Untitled Post";
        updated = true;
      }
      if (!data.date) {
        data.date = new Date().toISOString().split("T")[0];
        updated = true;
      }
      if (!data.excerpt) {
        data.excerpt = generateExcerpt(content);
        updated = true;
      }
      if (!data.metaTitle) {
        data.metaTitle = data.title;
        updated = true;
      }
      if (!data.metaDescription) {
        data.metaDescription = data.excerpt;
        updated = true;
      }
      if (!data.coverImage) {
        data.coverImage = "/images/default-cover.jpg";
        updated = true;
      }

      if (updated) {
        const fixed = matter.stringify(content, data);
        fs.writeFileSync(fullPath, fixed);
        console.log(`✅ Fixed: ${loc}/posts/${slug}`);
      } else {
        console.log(`✔ Already valid: ${loc}/posts/${slug}`);
      }
    });
  });
}

fixPosts();
