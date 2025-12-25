// scripts/checks/check-placeholders.mjs
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Fix __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Locales we care about
const locales = ["en", "fr", "ht", "es"];

// From scripts/checks -> repo root -> content/dictionaries
const dictionariesDir = path.resolve(__dirname, "../../content/dictionaries");

// Patterns that indicate "not really translated yet"
const PLACEHOLDER_PATTERNS = [
  /__AUTO_TRANSLATE__/i,
  /__TRANSLATE_ME__/i,
  /__FILL_ME__/i,
  /\bTODO\b/i,
  /\bTBD\b/i,
  /\bFIXME\b/i,
  /\[DRAFT\]/i,
];

function loadJson(filePath) {
  try {
    const raw = fs.readFileSync(filePath, "utf8");
    return JSON.parse(raw);
  } catch (err) {
    console.error(`❌ Failed to parse JSON: ${filePath}`);
    console.error(err.message);
    process.exit(1);
  }
}

function flattenEntries(obj, prefix = "", out = []) {
  if (!obj || typeof obj !== "object") return out;

  for (const [key, value] of Object.entries(obj)) {
    const currentKey = prefix ? `${prefix}.${key}` : key;

    if (value && typeof value === "object") {
      flattenEntries(value, currentKey, out);
    } else {
      out.push({
        keyPath: currentKey,
        value: value === undefined || value === null ? "" : String(value),
      });
    }
  }

  return out;
}

function hasPlaceholder(text) {
  for (const pattern of PLACEHOLDER_PATTERNS) {
    if (pattern.test(text)) return pattern;
  }
  return null;
}

async function runPlaceholderCheck() {
  console.log("🔍 Scanning dictionaries for placeholder text...\n");

  const findings = [];

  for (const locale of locales) {
    const localeDir = path.join(dictionariesDir, locale);

    if (!fs.existsSync(localeDir)) {
      console.warn(`⚠️ Skipping missing locale directory: ${localeDir}`);
      continue;
    }

    const files = fs
      .readdirSync(localeDir)
      .filter((file) => file.endsWith(".json"));

    for (const file of files) {
      const filePath = path.join(localeDir, file);
      const json = loadJson(filePath);
      const entries = flattenEntries(json);

      for (const entry of entries) {
        const match = hasPlaceholder(entry.value);
        if (match) {
          findings.push({
            locale,
            file,
            keyPath: entry.keyPath,
            pattern: match.toString(),
            sample: entry.value.slice(0, 80),
          });
        }
      }
    }
  }

  if (findings.length > 0) {
    console.log("❌ Found translation placeholders:\n");
    for (const f of findings) {
      console.log(`- [${f.locale}] ${f.file} -> ${f.keyPath}`);
      console.log(`  pattern = ${f.pattern}`);
      console.log(`  sample  = "${f.sample}"\n`);
    }

    console.error(
      "❌ Placeholder check failed. Replace placeholders with real translations before committing."
    );
    process.exit(1);
  } else {
    console.log("✅ No placeholder strings found in dictionaries.");
  }
}

runPlaceholderCheck().catch((err) => {
  console.error("❌ Unexpected error in check-placeholders script.");
  console.error(err);
  process.exit(1);
});
