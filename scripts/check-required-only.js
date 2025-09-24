// scripts/check-required-only.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const locales = ['en', 'fr', 'ht', 'es'];
const dictionariesDir = path.resolve(__dirname, '../dictionaries');

// Example required keys (adjust as needed)
const required = ['title', 'metaTitle', 'metaDescription'];

function loadJson(filePath) {
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch (err) {
    console.error(`❌ Failed to parse JSON: ${filePath}`);
    process.exit(1);
  }
}

async function runValidation() {
  console.log('🔍 Running required-only validation...\n');

  let allValid = true;

  for (const locale of locales) {
    const files = fs.readdirSync(path.join(dictionariesDir, locale));
    for (const file of files) {
      if (!file.endsWith('.json')) continue;
      const json = loadJson(path.join(dictionariesDir, locale, file));

      const missing = required.filter((k) => !(k in json));
      if (missing.length > 0) {
        console.log(`❌ ${locale}/${file} missing: ${missing.join(', ')}`);
        allValid = false;
      } else {
        console.log(`✅ ${locale}/${file} has all required keys`);
      }
    }
  }

  console.log('\n📦 Required-only validation finished!');
  if (!allValid) {
    console.error('❌ Validation failed.');
    process.exit(1);
  } else {
    console.log('✅ All dictionaries have required keys');
  }
}

runValidation();
