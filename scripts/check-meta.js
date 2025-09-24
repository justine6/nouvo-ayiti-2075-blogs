// scripts/check-meta.js
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
    console.error(err.message);
    process.exit(1);
  }
}

function validateMeta(locale, file, json) {
  const missing = [];
  if (!('metaTitle' in json)) missing.push('metaTitle');
  if (!('metaDescription' in json)) missing.push('metaDescription');

  if (missing.length > 0) {
    console.log(`❌ ${locale}/${file}.json is missing: ${missing.join(', ')}`);
    return false;
  }
  console.log(`✅ ${locale}/${file}.json has metaTitle and metaDescription`);
  return true;
}

async function runValidation() {
  console.log('🔍 Running metadata validation...\n');

  let allValid = true;

  for (const locale of locales) {
    const files = fs.readdirSync(path.join(dictionariesDir, locale));
    for (const file of files) {
      if (!file.endsWith('.json')) continue;
      const filePath = path.join(dictionariesDir, locale, file);
      const json = loadJson(filePath);

      const valid = validateMeta(locale, file.replace('.json', ''), json);
      if (!valid) allValid = false;
    }
  }

  console.log('\n📦 Metadata validation finished!');
  if (!allValid) {
    console.error('❌ Validation failed. Fix issues before committing.');
    process.exit(1);
  } else {
    console.log('✅ All dictionaries have metaTitle and metaDescription');
  }
}

runValidation();
