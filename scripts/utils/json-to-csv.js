// scripts/json-to-csv.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const inputDir = path.resolve(__dirname, '../dictionaries');
const outputFile = path.resolve(__dirname, '../all_translations.csv');

function flattenJson(obj, prefix = '') {
  return Object.entries(obj).flatMap(([key, value]) => {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    return typeof value === 'object' && value !== null
      ? flattenJson(value, fullKey)
      : [[fullKey, value]];
  });
}

function run() {
  console.log('📑 Converting JSON dictionaries to CSV...');

  const rows = [['locale', 'key', 'value']];
  for (const locale of fs.readdirSync(inputDir)) {
    const dir = path.join(inputDir, locale);
    if (!fs.lstatSync(dir).isDirectory()) continue;

    for (const file of fs.readdirSync(dir)) {
      if (!file.endsWith('.json')) continue;
      const filePath = path.join(dir, file);
      const json = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      const flat = flattenJson(json);
      flat.forEach(([key, value]) => {
        rows.push([locale, key, value]);
      });
    }
  }

  const csv = rows
    .map((r) => r.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(','))
    .join('\n');
  fs.writeFileSync(outputFile, csv, 'utf8');

  console.log(`✅ CSV exported to ${outputFile}`);
}

run();
