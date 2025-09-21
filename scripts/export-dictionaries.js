// scripts/export-dictionaries.js
import fs from "fs";
import path from "path";
import csv from "csv-parser"; // npm install csv-parser

// Define supported locales
const locales = {
  "en (English)": "en",
  "fr (Français)": "fr",
  "ht (Kreyòl)": "ht",
  "es (Español)": "es",
};

const inputDir = process.cwd();
const outputDir = path.join(process.cwd(), "dictionaries");

// Find all *_translations.csv files
const csvFiles = fs
  .readdirSync(inputDir)
  .filter((f) => f.endsWith("_translations.csv"));

if (csvFiles.length === 0) {
  console.error("❌ No *_translations.csv files found.");
  process.exit(1);
}

csvFiles.forEach((csvFile) => {
  const baseName = csvFile.replace("_translations.csv", "");
  const dictionaries = {};
  Object.values(locales).forEach((locale) => (dictionaries[locale] = {}));

  fs.createReadStream(path.join(inputDir, csvFile))
    .pipe(csv())
    .on("data", (row) => {
      const key = row["Key"];
      for (const [column, locale] of Object.entries(locales)) {
        if (row[column] && row[column].trim() !== "") {
          dictionaries[locale][key] = row[column];
        }
      }
    })
    .on("end", () => {
      for (const [column, locale] of Object.entries(locales)) {
        const localeDir = path.join(outputDir, locale);
        if (!fs.existsSync(localeDir)) {
          fs.mkdirSync(localeDir, { recursive: true });
        }
        const filePath = path.join(localeDir, `${baseName}.json`);
        fs.writeFileSync(
          filePath,
          JSON.stringify(dictionaries[locale], null, 2),
          "utf-8"
        );
        console.log(`✅ Exported: ${filePath}`);
      }
    });
});
