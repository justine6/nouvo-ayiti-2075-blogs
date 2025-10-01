// scripts/check-translation-sync.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Fix __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Point to the root-level dictionaries folder
const dictionariesDir = path.join(process.cwd(), 'dictionaries');

// Locales
const locales = ['fr', 'ht', 'es'];
const baseLocale = 'en';

// Helper: load JSON
function loadJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

// Base file (English)
const basePath = path.join(dictionariesDir, `${baseLocale}.json`);
if (!fs.existsSync(basePath)) {
  console.error(`❌ Missing base dictionary: ${baseLocale}.json`);
  process.exit(1);
}

const baseData = loadJson(basePath);
const baseKeys = Object.keys(baseData);

// Compare with each locale
let hasIssues = false;

for (const locale of locales) {
  const localePath = path.join(dictionariesDir, `${locale}.json`);

  if (!fs.existsSync(localePath)) {
    console.error(`❌ Missing dictionary file: ${locale}.json`);
    hasIssues = true;
    continue;
  }

  const localeData = loadJson(localePath);
  const localeKeys = Object.keys(localeData);

  const missing = baseKeys.filter((k) => !localeKeys.includes(k));
  const extra = localeKeys.filter((k) => !baseKeys.includes(k));

  if (missing.length === 0 && extra.length === 0) {
    console.log(`✅ ${locale}.json is in sync with en.json`);
  } else {
    hasIssues = true;
    if (missing.length > 0) {
      console.error(`❌ ${locale}.json is missing keys: ${missing.join(', ')}`);
    }
    if (extra.length > 0) {
      console.warn(`⚠️ ${locale}.json has extra keys: ${extra.join(', ')}`);
    }
  }
}

if (hasIssues) {
  console.error('\n❌ Translation sync check failed.');
  process.exit(1);
} else {
  console.log('\n✅ All dictionaries are in sync!');
}
