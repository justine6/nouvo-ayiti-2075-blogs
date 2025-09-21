// scripts/jsons-to-combined-csv.js
import fs from "fs";
import path from "path";

// Define locales and display names
const locales = {
  en: "en (English)",
  fr: "fr (Français)",
  ht: "ht (Kreyòl)",
  es: "es (Español)",
};

const inputDir = path.join(process.cwd(), "dictionaries");
const outputFile = path.join(process.cwd(), "all_translations.csv");

// Collect base files from the 'en' folder (assuming all locales mirror 'en')
const baseFiles = fs
  .readdirSync(path.join(inputDir, "en"))
  .filter((f) => f.endsWith(".json"));

// Prepare rows
let csv = ["File,Key," + Object.values(locales).join(",")];

baseFiles.forEach((file) => {
  const baseName = file.replace(".json", "");

  // Load dictionaries for each locale
  const dictionaries = {};
  for (const locale of Object.keys(locales)) {
    const filePath = path.join(inputDir, locale, file);
    if (fs.existsSync(filePath)) {
      dictionaries[locale] = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    } else {
      dictionaries[locale] = {};
    }
  }

  // Collect keys
  const keys = new Set();
  Object.values(dictionaries).forEach((dict) =>
    Object.keys(dict).forEach((key) => keys.add(key))
  );

  // Build rows for this file
  for (const key of keys) {
    const row = [baseName, key];
    for (const locale of Object.keys(locales)) {
      row.push(dictionaries[locale][key] || "");
    }
    csv.push(row.join(","));
  }
});

// Save combined CSV
fs.writeFileSync(outputFile, csv.join("\n"), "utf-8");
console.log(`✅ Exported combined CSV: ${outputFile}`);
