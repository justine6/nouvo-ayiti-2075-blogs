// scripts/check-translation-sync.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Fix __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dictionariesDir = path.join(__dirname, '..', 'dictionaries');

const locales = fs
  .readdirSync(dictionariesDir)
  .filter((f) => /^[a-z]{2}$/.test(f));

function loadJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

// Compare structure between English (base) and others
const baseLocale = 'en';
const baseDir = path.join(dictionariesDir, baseLocale);
const baseFiles = fs.readdirSync(baseDir).filter((f) => f.endsWith('.json'));

for (const file of baseFiles) {
  const basePath = path.join(baseDir, file);
  const baseData = loadJson(basePath);

  for (const locale of locales) {
    if (locale === baseLocale) continue;

    const localePath = path.join(dictionariesDir, locale, file);
    if (!fs.existsSync(localePath)) {
      console.error(`❌ Missing file: ${locale}/${file}`);
      process.exitCode = 1;
      continue;
    }

    const localeData = loadJson(localePath);
    const missingKeys = Object.keys(baseData).filter(
      (key) => !(key in localeData)
    );

    if (missingKeys.length > 0) {
      console.error(
        `❌ ${locale}/${file} missing keys: ${missingKeys.join(', ')}`
      );
      process.exitCode = 1;
    } else {
      console.log(`✅ ${locale}/${file} is in sync with en/${file}`);
    }
  }
}

console.log('📦 Translation sync validation finished!');
