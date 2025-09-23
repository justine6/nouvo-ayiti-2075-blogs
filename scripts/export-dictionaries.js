// scripts/export-dictionaries.js
import fs from "fs";
import path from "path";
import { parse } from "json2csv"; // npm install json2csv

// Supported locales
const locales = ["en", "fr", "ht", "es"];

const dictDir = path.join(process.cwd(), "dictionaries");
const outputFile = path.join(process.cwd(), "all_translations.csv");

// --- Helper: flatten nested JSON into dotted keys ---
function flatten(obj, prefix = "") {
  let result = {};
  for (const [key, value] of Object.entries(obj)) {
    const newKey = prefix ? `${prefix}.${key}` : key;
    if (value && typeof value === "object" && !Array.isArray(value)) {
      result = { ...result, ...flatten(value, newKey) };
    } else {
      result[newKey] = value;
    }
  }
  return result;
}

// --- Collect all keys across all files/locales ---
function collectKeys() {
  const enFiles = fs
    .readdirSync(path.join(dictDir, "en"))
    .filter((f) => f.endsWith(".json"));
  const allKeys = {};

  enFiles.forEach((file) => {
    const base = file.replace(".json", "");
    allKeys[base] = new Set();

    locales.forEach((locale) => {
      const filePath = path.join(dictDir, locale, file);
      if (fs.existsSync(filePath)) {
        const jsonObj = JSON.parse(fs.readFileSync(filePath, "utf-8"));
        const flat = flatten(jsonObj);
        Object.keys(flat).forEach((k) => allKeys[base].add(k));
      }
    });
  });

  return allKeys;
}

// --- Build rows for CSV ---
function buildRows(allKeys) {
  const rows = [];

  for (const [file, keys] of Object.entries(allKeys)) {
    keys.forEach((key) => {
      const row = { File: file, Key: key };
      locales.forEach((locale) => {
        const filePath = path.join(dictDir, locale, `${file}.json`);
        if (fs.existsSync(filePath)) {
          const jsonObj = JSON.parse(fs.readFileSync(filePath, "utf-8"));
          const flat = flatten(jsonObj);
          row[locale] = flat[key] || "";
        } else {
          row[locale] = "";
        }
      });
      rows.push(row);
    });
  }

  return rows;
}

// --- Main ---
(() => {
  const allKeys = collectKeys();
  const rows = buildRows(allKeys);

  const fields = ["File", "Key", ...locales];
  const csv = parse(rows, { fields });

  fs.writeFileSync(outputFile, csv, "utf-8");
  console.log(`✅ Exported latest translations to ${outputFile}`);
})();
