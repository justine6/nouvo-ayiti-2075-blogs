// scripts/check-topbar-footer.js
import fs from "fs";
import path from "path";

const locales = ["en", "fr", "ht", "es"];
const basePath = path.join(process.cwd(), "dictionaries");

// ✅ Expected schemas
const expectedTopbarKeys = [
  "home",
  "about",
  "projects",
  "blog",
  "contact",
  "vision",
  "language",
];

// ⚡ Expanded schema for footer
const expectedFooterKeys = ["rights", "poweredBy", "privacy", "terms"];

function validateFile(filePath, expectedKeys, wrapperKey) {
  if (!fs.existsSync(filePath)) {
    console.error(`❌ Missing file: ${filePath}`);
    return;
  }

  const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));

  // ✅ Look inside wrapper object
  const target = wrapperKey ? data[wrapperKey] : data;

  if (!target) {
    console.error(`❌ Missing wrapper key "${wrapperKey}" in ${filePath}`);
    return;
  }

  const missing = expectedKeys.filter((key) => !(key in target));
  const extra = Object.keys(target).filter((key) => !expectedKeys.includes(key));

  if (missing.length === 0 && extra.length === 0) {
    console.log(`✅ ${filePath} is valid`);
  } else {
    if (missing.length > 0) {
      console.warn(`⚠️ Missing keys in ${filePath}: ${missing.join(", ")}`);
    }
    if (extra.length > 0) {
      console.warn(`⚠️ Extra keys in ${filePath}: ${extra.join(", ")}`);
    }
  }
}

locales.forEach((locale) => {
  const topbarPath = path.join(basePath, locale, "topbar.json");
  const footerPath = path.join(basePath, locale, "footer.json");

  validateFile(topbarPath, expectedTopbarKeys, "topbar");
  validateFile(footerPath, expectedFooterKeys, "footer");
});
