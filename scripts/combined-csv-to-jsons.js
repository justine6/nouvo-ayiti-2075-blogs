// scripts/jsons-to-combined-csv.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const locales = ['en', 'fr', 'ht', 'es'];
const dictionariesDir = path.resolve(__dirname, '../dictionaries');
const outputFile = path.resolve(__dirname, '../blog_translations.csv');

function flattenJson(obj, prefix = '') {
  return Object.entries(obj).flatMap(([key, value]) => {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    return typeof value === 'object' && value !== null
      ? flattenJson(value, fullKey)
      : [[fullKey, value]];
  });
}

function run() {
  console.log('📑 Combining all JSONs into a single CSV...');

  const rows = [['locale', 'file', 'key', 'value']];

  for (const locale of locales) {
    const dir = path.join(dictionariesDir, locale);
    if (!fs.existsSync(dir)) continue;

    for (const file of fs.readdirSync(dir)) {
      if (!file.endsWith('.json')) continue;
      const filePath = path.join(dir, file);
      const json = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      const flat = flattenJson(json);
      flat.forEach(([key, value]) => {
        rows.push([locale, file.replace('.json', ''), key, value]);
      });
    }
  }

  const csv = rows
    .map((r) => r.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(','))
    .join('\n');
  fs.writeFileSync(outputFile, csv, 'utf8');

  console.log(`✅ Combined CSV written to ${outputFile}`);
}

run();
