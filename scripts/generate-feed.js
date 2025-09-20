import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDir = path.join(process.cwd(), "src/content/posts");
const locales = ["en", "fr", "ht", "es"]; // ✅ add/remove locales as needed

function getPosts(locale) {
  const localeDir = path.join(postsDir, locale);
  if (!fs.existsSync(localeDir)) return [];

  return fs.readdirSync(localeDir)
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
        content,
      };
    });
}

function generateFeeds() {
  // English is the fallback
  const enPosts = getPosts("en");

  locales.forEach((locale) => {
    let posts = getPosts(locale);

    // Fill missing posts with English fallback
    const completePosts = enPosts.map((enPost) => {
      const translated = posts.find((p) => p.slug === enPost.slug);
      return translated || { ...enPost, locale: "en", fallback: true };
    });

    // Sort by date (newest first)
    completePosts.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    // Ensure public folder exists
    const publicDir = path.join(process.cwd(), "public");
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir);
    }

    // Save feed
    const feedFile = path.join(publicDir, `${locale}-feed.json`);
    fs.writeFileSync(feedFile, JSON.stringify(completePosts, null, 2));

    console.log(`✅ ${locale}-feed.json generated (${completePosts.length} posts)`);
  });

  console.log("🎉 All feeds generated successfully!");
}

generateFeeds();
