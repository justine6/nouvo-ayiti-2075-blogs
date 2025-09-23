// scripts/check-meta.js
import fs from "fs";
import path from "path";

const locales = ["en", "fr", "ht", "es"];
const sections = [
  "home",
  "about",
  "projects",
  "blog",
  "contact",
  "vision",
  "newsletter",
  "footer",
];

const basePath = path.join(process.cwd(), "dictionaries");

let hasErrors = false;

for (const locale of locales) {
  for (const section of sections) {
    const filePath = path.join(basePath, locale, `${section}.json`);

    if (!fs.existsSync(filePath)) {
      console.error(`❌ Missing file: ${filePath}`);
      hasErrors = true;
      continue;
    }

    const content = JSON.parse(fs.readFileSync(filePath, "utf8"));

    if (!content.metaTitle) {
      console.error(`❌ Missing metaTitle in ${locale}/${section}.json`);
      hasErrors = true;
    }

    if (!content.metaDescription) {
      console.error(`❌ Missing metaDescription in ${locale}/${section}.json`);
      hasErrors = true;
    }
  }
}

if (hasErrors) {
  console.error("🚨 Metadata validation failed. Please fix the above issues.");
  process.exit(1);
} else {
  console.log("✅ All dictionaries have metaTitle and metaDescription.");
}
