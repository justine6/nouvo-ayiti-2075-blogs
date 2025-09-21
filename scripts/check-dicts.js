// scripts/check-dicts.js
import fs from "fs";
import path from "path";

const locales = ["en", "fr", "ht", "es"];
const dictionaries = ["home.json", "blog.json", "contact.json", "newsletter.json", "vision.json"];

// Flatten nested keys for comparison
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

// Deep set helper for filling missing keys
function setDeep(obj, path, value) {
  const parts = path.split(".");
  let current = obj;
  for (let i = 0; i < parts.length - 1; i++) {
    if (!current[parts[i]]) current[parts[i]] = {};
    current = current[parts[i]];
  }
  current[parts[parts.length - 1]] = value;
}

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
    const missing = referenceKeys.filter((k) => !keys.includes(k));
    const extra = keys.filter((k) => !referenceKeys.includes(k));

    if (missing.length === 0 && extra.length === 0) {
      console.log(`✅ ${locale}/${dict} keys match!`);
    } else {
      if (missing.length > 0) {
        console.warn(`⚠️ ${locale}/${dict} is missing keys: ${missing.join(", ")}`);

        // Auto-fix: copy from English with empty string placeholder
        for (const key of missing) {
          const refParts = key.split(".");
          let refValue = reference;
          for (const part of refParts) {
            refValue = refValue?.[part];
          }
          setDeep(data, key, refValue || ""); // fallback: ""
        }

        fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");
        console.log(`🛠️  Auto-fixed ${locale}/${dict} (filled missing keys).`);
      }
      if (extra.length > 0) {
        console.warn(`ℹ️ ${locale}/${dict} has extra keys: ${extra.join(", ")}`);
      }
    }
  }
}

console.log("\n🎉 Dictionary validation + auto-fix finished!");
