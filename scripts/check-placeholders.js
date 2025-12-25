// scripts/checks/check-placeholders.js
/* eslint-disable no-console */

const fs = require("fs");
const path = require("path");

const LOCALES = ["en", "fr", "ht", "es"];
const SOURCE_LOCALE = "en";
const DICT_ROOT = path.join(process.cwd(), "content", "dictionaries");

// Strings that are allowed to be identical across locales
const ALLOW_SAME_VALUE = [
  /^YouTube$/i,
  /^Facebook$/i,
  /^Haiti 2075$/i,
  /^Ayiti 2075$/i,
  /^Nouvo Ayiti 2075$/i,
  /^2075$/i,
  /^\d+$/, // pure numbers
];

// Patterns that mean "this is not yet translated"
const PLACEHOLDER_PATTERNS = [
  /^\s*$/, // empty
  /^\s*-\s*$/, // just a dash
  /\bTODO\b/i,
  /\bTBD\b/i,
  /\bTRANSLATE\b/i,
  /\bTO TRANSLATE\b/i,
];

function isAllowedSameValue(value) {
  return ALLOW_SAME_VALUE.some((re) => re.test(value));
}

function isPlaceholder(value) {
  return PLACEHOLDER_PATTERNS.some((re) => re.test(value));
}

function loadJson(filePath) {
  const raw = fs.readFileSync(filePath, "utf8");
  try {
    return JSON.parse(raw);
  } catch (err) {
    console.error(`❌ Failed to parse JSON: ${filePath}`);
    console.error(err.message);
    process.exitCode = 1;
    return {};
  }
}

// Recursively flatten nested objects into "path.to.key" -> value
function collectStrings(obj, prefix = "") {
  const result = {};

  if (!obj || typeof obj !== "object") return result;

  for (const [key, value] of Object.entries(obj)) {
    const nextPath = prefix ? `${prefix}.${key}` : key;

    if (value == null) {
      continue;
    }

    if (typeof value === "string") {
      result[nextPath] = value;
    } else if (typeof value === "object") {
      Object.assign(result, collectStrings(value, nextPath));
    }
  }

  return result;
}

function main() {
  console.log("🔎 Checking for placeholder translations…");

  const sourceDir = path.join(DICT_ROOT, SOURCE_LOCALE);
  if (!fs.existsSync(sourceDir)) {
    console.error(`❌ Source locale directory not found: ${sourceDir}`);
    process.exit(1);
  }

  const files = fs
    .readdirSync(sourceDir)
    .filter((f) => f.endsWith(".json"))
    .sort();

  const issues = [];

  // Load all source (English) strings file-by-file
  const sourceMaps = {};
  for (const file of files) {
    const sourcePath = path.join(sourceDir, file);
    const json = loadJson(sourcePath);
    sourceMaps[file] = collectStrings(json);
  }

  // Compare each non-source locale to English
  for (const locale of LOCALES) {
    if (locale === SOURCE_LOCALE) continue;

    const localeDir = path.join(DICT_ROOT, locale);
    if (!fs.existsSync(localeDir)) {
      console.warn(`⚠️ Locale directory missing, skipping: ${localeDir}`);
      continue;
    }

    for (const file of files) {
      const localePath = path.join(localeDir, file);
      if (!fs.existsSync(localePath)) {
        // Structural issues are handled in other checks
        continue;
      }

      const localeJson = loadJson(localePath);
      const localeStrings = collectStrings(localeJson);
      const sourceStrings = sourceMaps[file];

      for (const [keyPath, sourceVal] of Object.entries(sourceStrings)) {
        const targetVal = localeStrings[keyPath];

        if (typeof targetVal !== "string") {
          // Missing or non-string is already caught elsewhere
          continue;
        }

        // 1) Explicit placeholder patterns (empty, TODO, etc.)
        if (isPlaceholder(targetVal)) {
          issues.push({
            locale,
            file,
            keyPath,
            kind: "placeholder",
            value: targetVal,
          });
          continue;
        }

        // 2) Value identical to English, but not whitelisted
        if (
          locale !== SOURCE_LOCALE &&
          targetVal.trim() === sourceVal.trim() &&
          !isAllowedSameValue(targetVal.trim())
        ) {
          issues.push({
            locale,
            file,
            keyPath,
            kind: "same-as-en",
            value: targetVal,
          });
        }
      }
    }
  }

  if (issues.length === 0) {
    console.log("✅ No placeholder translations detected.");
    return;
  }

  console.log("\n❌ Found possible placeholder translations:\n");

  for (const issue of issues) {
    const label =
      issue.kind === "placeholder"
        ? "Placeholder value"
        : "Same as English (suspicious)";

    console.log(
      `- [${issue.locale}] ${issue.file} :: ${issue.keyPath}\n` +
        `    → ${label}: "${issue.value}"`
    );
  }

  console.log(
    "\n📝 If some of these are legitimate (brand names, etc.), add them to ALLOW_SAME_VALUE in scripts/checks/check-placeholders.js."
  );

  process.exitCode = 1;
}

main();
