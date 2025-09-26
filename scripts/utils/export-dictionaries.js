// scripts/export-dictionaries.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const locales = ['en', 'fr', 'ht', 'es'];
const dictionariesDir = path.resolve(__dirname, '../dictionaries');
const outputFile = path.resolve(__dirname, '../all_dictionaries.json');

function loadJson(filePath) {
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch (err) {
    console.error(`❌ Failed to parse JSON: ${filePath}`);
    process.exit(1);
  }
}

function exportDictionaries() {
  console.log('📦 Exporting all dictionaries into one JSON...');

  const result = {};
  for (const locale of locales) {
    result[locale] = {};
    const dir = path.join(dictionariesDir, locale);
    if (!fs.existsSync(dir)) {
      console.warn(`⚠️ Skipping missing locale: ${locale}`);
      continue;
    }
    for (const file of fs.readdirSync(dir)) {
      if (!file.endsWith('.json')) continue;
      const key = file.replace('.json', '');
      result[locale][key] = loadJson(path.join(dir, file));
    }
  }

  fs.writeFileSync(outputFile, JSON.stringify(result, null, 2), 'utf8');
  console.log(`✅ Export complete! Saved to ${outputFile}`);
}

exportDictionaries();

// --- AUTO-MERGE AFTER EXPORT --- //
import { spawnSync } from 'child_process';
import path from 'path';

const mergeScript = path.resolve(__dirname, 'merge-dictionaries.js');
console.log('\n🔄 Running merge-dictionaries.js after export...');

const result = spawnSync('node', [mergeScript], { stdio: 'inherit' });

if (result.error) {
  console.error('❌ Failed to run merge-dictionaries.js:', result.error);
  process.exit(1);
}
