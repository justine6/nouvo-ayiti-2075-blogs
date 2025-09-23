// scripts/check-translation-sync.js
import fs from "fs";
import path from "path";
import csv from "csv-parser";

const locales = {
  "en (English)": "en",
  "fr (Français)": "fr",
  "ht (Kreyòl)": "ht",
  "es (Español)": "es",
};

const requiredKeys = {
  "home": ["hero.title", "hero.subtitle", "hero.goToMain", "hero.readMore", "hero.joinNow", "hero.watchVideos"],
  "topbar": ["home", "about", "projects", "blog", "contact"],
  "footer": ["copyright", "links.privacy", "links.terms", "address", "email", "phone"],
  "vision": ["title", "intro"],
  "newsletter": ["title", "description"],
  "contact": ["title", "subtitle", "form", "address", "email", "phone"]
};

const inputFile = path.join(process.cwd(), "all_translations.csv");
const dictDir = path.join(process.cwd(), "dictionaries");

// --- Helpers ---
function getNestedValue(obj, dottedKey) {
  return dottedKey.split(".").reduce((acc, part) => acc && acc[part] !== undefined ? acc[part] : "", obj);
}

function loadJSONs() {
  const result = {};
  const enFiles = fs.readdirSync(path.join(dictDir, "en")).filter(f => f.endsWith(".json"));
  enFiles.forEach(file => {
    const base = file.replace(".json", "");
    result[base] = {};
    for (const locale of Object.values(locales)) {
      const filePath = path.join(dictDir, locale, file);
      if (fs.existsSync(filePath)) {
        result[base][locale] = JSON.parse(fs.readFileSync(filePath, "utf-8"));
      } else {
        result[base][locale] = {};
      }
    }
  });
  return result;
}

function loadCSV() {
  return new Promise((resolve, reject) => {
    const rows = [];
    fs.createReadStream(inputFile)
      .pipe(csv())
      .on("data", (row) => rows.push(row))
      .on("end", () => resolve(rows))
      .on("error", reject);
  });
}

function checkKeys(obj, keys, locale, file, errors) {
  keys.forEach(key => {
    const jsonVal = getNestedValue(obj, key);
    if (jsonVal === "") {
      errors.push(`Missing '${key}' in ${locale}/${file}.json`);
    }
  });
}

function compare(jsons, csvRows) {
  let errors = [];
  csvRows.forEach((row) => {
    const file = row["File"];
    const key = row["Key"];
    for (const [column, locale] of Object.entries(locales)) {
      const csvVal = row[column] || "";
      const jsonVal = getNestedValue(jsons[file]?.[locale], key);
      if (csvVal !== jsonVal) {
        errors.push(`[Mismatch] File: ${file}, Key: ${key}, Locale: ${locale}, CSV: "${csvVal}", JSON: "${jsonVal}"`);
      }
    }
  });
  return errors;
}

// --- Main ---
(async () => {
  if (!fs.existsSync(inputFile)) {
    console.error("❌ No all_translations.csv found. Run `npm run export-dicts` first.");
    process.exit(1);
  }

  const jsons = loadJSONs();
  let errors = [];

  for (const [file, localesData] of Object.entries(jsons)) {
    if (requiredKeys[file]) {
      for (const [locale, jsonObj] of Object.entries(localesData)) {
        checkKeys(jsonObj, requiredKeys[file], locale, file, errors);
      }
    }
  }

  const csvRows = await loadCSV();
  const mismatches = compare(jsons, csvRows);
  errors = errors.concat(mismatches);

  if (errors.length > 0) {
    console.error("❌ Translation sync check failed!");
    errors.forEach((err) => console.error("   " + err));
    process.exit(1);
  } else {
    console.log("✅ Translations are in sync and all required keys are present");
  }
})();

