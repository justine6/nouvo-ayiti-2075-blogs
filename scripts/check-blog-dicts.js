// scripts/check-dicts.js
import fs from "fs";
import path from "path";

const locales = ["en", "fr", "ht", "es"];
const dictionaries = ["home.json", "blog.json", "contact.json", "newsletter.json", "vision.json"];

// Recursive key flattener (so nested keys can be compared easily)
function flattenKeys(obj, prefix = "") {
  return Object.keys(obj).reduce((keys, k) => {
    const value = obj[k];
    const fullKey = prefix ? `${prefix}.${k}` : k;
    if (value && typeof value === "object" && !Array.isArray(value)) {
      keys.push(...flattenKeys(value, fullKey));
    } else {
      keys.push(fullKey);
    }
    return keys;
  }, []);
}

// Validate JSON syntax + return parsed content
function loadJSON(filePath) {
  try {
    const raw = fs.readFileSync(filePath, "utf8");
    return JSON.parse(raw);
  } catch (err) {
    console.error(`❌ Error in ${filePath}: ${err.message}`);
    process.exitCode = 1;
    return null;
  }
}

for (const dict of dictionaries) {
  console.log(`\n📖 Checking dictionary: ${dict}`);

  const referenceFile = path.join("dictionaries", "en", dict);
  if (!fs.existsSync(referenceFile)) {
    console.warn(`⚠️ Missing reference file: ${referenceFile}`);
    continue;
  }

  const reference = loadJSON(referenceFile);
  const referenceKeys = flattenKeys(reference);

  for (const locale of locales) {
    const filePath = path.join("dictionaries", locale, dict);
    if (!fs.existsSync(filePath)) {
      console.warn(`⚠️ Missing: ${filePath}`);
      continue;
    }

    const data = loadJSON(filePath);
    if (!data) continue;

    const keys = flattenKeys(data);

    // Compare keys
    const missing = referenceKeys.filter((k) => !keys.includes(k));
    const extra = keys.filter((k) => !referenceKeys.includes(k));

    if (missing.length === 0 && extra.length === 0) {
      console.log(`✅ ${locale}/${dict} keys match!`);
    } else {
      if (missing.length > 0) {
        console.warn(`⚠️ ${locale}/${dict} is missing keys: ${missing.join(", ")}`);
      }
      if (extra.length > 0) {
        console.warn(`ℹ️ ${locale}/${dict} has extra keys: ${extra.join(", ")}`);
      }
    }
  }
}

console.log("\n🎉 Dictionary validation finished!");
