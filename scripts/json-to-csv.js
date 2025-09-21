// scripts/combined-csv-to-jsons.js
import fs from "fs";
import path from "path";
import csv from "csv-parser"; // npm install csv-parser

// Define locales
const locales = {
  "en (English)": "en",
  "fr (Français)": "fr",
  "ht (Kreyòl)": "ht",
  "es (Español)": "es",
};

const inputFile = path.join(process.cwd(), "all_translations.csv");
const outputDir = path.join(process.cwd(), "dictionaries");

// Store dictionaries per file + locale
const dictionaries = {};

// Parse CSV
fs.createReadStream(inputFile)
  .pipe(csv())
  .on("data", (row) => {
    const file = row["File"];
    const key = row["Key"];
    if (!file || !key) return;

    if (!dictionaries[file]) dictionaries[file] = {};
    for (const [column, locale] of Object.entries(locales)) {
      if (!dictionaries[file][locale]) dictionaries[file][locale] = {};
      if (row[column] && row[column].trim() !== "") {
        dictionaries[file][locale][key] = row[column];
      }
    }
  })
  .on("end", () => {
    // Write JSON files per locale
    for (const [file, localeData] of Object.entries(dictionaries)) {
      for (const [locale, dict] of Object.entries(localeData)) {
        const localeDir = path.join(outputDir, locale);
        if (!fs.existsSync(localeDir)) {
          fs.mkdirSync(localeDir, { recursive: true });
        }
        const filePath = path.join(localeDir, `${file}.json`);
        fs.writeFileSync(filePath, JSON.stringify(dict, null, 2), "utf-8");
        console.log(`✅ Exported: ${filePath}`);
      }
    }
    console.log("🎉 Dictionaries regenerated successfully from combined CSV!");
  });
