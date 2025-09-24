// scripts/check-translation-sync.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const locales = ['en', 'fr', 'ht', 'es'];
const dictionariesDir = path.resolve(__dirname, '../dictionaries');

function loadJson(filePath) {
  try {
    const raw = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(raw);
  } catch (err) {
    console.error(`❌ Failed to parse JSON: ${filePath}`);
    process.exit(1);
  }
}

function getAllKeys(obj, prefix = '') {
  return Object.keys(obj).flatMap((key) => {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    return typeof obj[key] === 'object' && obj[key] !== null
      ? getAllKeys(obj[key], fullKey)
      : fullKey;
  });
}

async function runValidation() {
  console.log('🔍 Running translation key sync validation...\n');

  const baseLocale = 'en';
  const baseDir = path.join(dictionariesDir, baseLocale);

  let allValid = true;

  for (const file of fs.readdirSync(baseDir)) {
    if (!file.endsWith('.json')) continue;
    const baseJson = loadJson(path.join(baseDir, file));
    const baseKeys = getAllKeys(baseJson);

    for (const locale of locales.filter((l) => l !== baseLocale)) {
      const targetPath = path.join(dictionariesDir, locale, file);
      if (!fs.existsSync(targetPath)) {
        console.log(`❌ Missing ${locale}/${file}`);
        allValid = false;
        continue;
      }
      const targetJson = loadJson(targetPath);
      const targetKeys = getAllKeys(targetJson);

      const missing = baseKeys.filter((k) => !targetKeys.includes(k));
      if (missing.length > 0) {
        console.log(
          `❌ ${locale}/${file} is missing keys: ${missing.join(', ')}`
        );
        allValid = false;
      } else {
        console.log(`✅ ${locale}/${file} is in sync`);
      }
    }
  }

  console.log('\n📦 Translation sync validation finished!');
  if (!allValid) {
    console.error('❌ Validation failed. Fix issues before committing.');
    process.exit(1);
  } else {
    console.log('✅ All locales are in sync with EN');
  }
}

runValidation();
