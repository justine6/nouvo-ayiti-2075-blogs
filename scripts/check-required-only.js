// scripts/check-required-only.js
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Fix __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dictionariesDir = path.join(__dirname, "..", "dictionaries");

// Required keys for all dictionaries
const requiredKeys = ["metaTitle", "metaDescription"];

function validateRequired(filePath, locale, file) {
  const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
  const missing = requiredKeys.filter((key) => !data[key]);

  if (missing.length > 0) {
    console.error(`❌ ${locale}/${file} is missing required keys: ${missing.join(", ")}`);
    process.exitCode = 1;
  } else {
    console.log(`✅ ${locale}/${file} has all required keys`);
  }
}

const locales = fs.readdirSync(dictionariesDir).filter((f) => /^[a-z]{2}$/.test(f));

for (const locale of locales) {
  const localeDir = path.join(dictionariesDir, locale);
  const files = fs.readdirSync(localeDir).filter((f) => f.endsWith(".json"));

  for (const file of files) {
    validateRequired(path.join(localeDir, file), locale, file);
  }
}

console.log("📦 Required keys validation finished!");
