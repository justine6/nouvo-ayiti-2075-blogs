import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "content/posts");

// Required fields for every post
const REQUIRED_FIELDS = ["title", "date", "excerpt"];

function validatePost(filePath: string) {
  const source = fs.readFileSync(filePath, "utf8");
  const { data } = matter(source);

  const errors: string[] = [];

  REQUIRED_FIELDS.forEach((field) => {
    if (!data[field]) {
      errors.push(`❌ Missing required field: "${field}"`);
    }
  });

  if (!data.coverImage) {
    errors.push("⚠️ Missing coverImage (will fallback to default)");
  }

  if (!data.metaTitle) {
    errors.push("⚠️ Missing metaTitle (will fallback to title)");
  }

  if (!data.metaDescription) {
    errors.push("⚠️ Missing metaDescription (will fallback to excerpt)");
  }

  return errors;
}

function runCheck() {
  const slugs = fs.readdirSync(postsDirectory).filter((f) => f.endsWith(".mdx"));

  let hasErrors = false;

  slugs.forEach((slug) => {
    const fullPath = path.join(postsDirectory, slug);
    const errors = validatePost(fullPath);

    if (errors.length > 0) {
      console.log(`\n🔎 Checking ${slug}`);
      errors.forEach((e) => console.log("   " + e));
      if (errors.some((e) => e.startsWith("❌"))) {
        hasErrors = true;
      }
    }
  });

  if (hasErrors) {
    console.error("\n🚨 Blog post validation failed. Fix the ❌ errors above.");
    process.exit(1); // fail CI
  } else {
    console.log("\n✅ All blog posts passed validation.");
  }
}

runCheck();
