// scripts/check-dicts.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Fix __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// === CONFIG ===
const locales = ['en', 'fr', 'ht', 'es'];
const dictionariesDir = path.resolve(__dirname, '../dictionaries');

// Required keys for each dictionary file
const requiredKeys = {
  contact: ['title', 'address', 'email', 'phone'],
  footer: [
    'copyright',
    'links',
    'address',
    'email',
    'phone',
    'metaTitle',
    'metaDescription',
  ],
  newsletter: ['title', 'description', 'metaTitle', 'metaDescription'],
  vision: ['title', 'content', 'metaTitle', 'metaDescription'],
};

// === HELPERS ===
function loadJson(filePath) {
  try {
    const raw = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(raw);
  } catch (err) {
    console.error(`❌ Failed to load JSON: ${filePath}`);
    console.error(err.message);
    process.exit(1);
  }
}

function validateFile(locale, file, json, keys) {
  const missing = keys.filter((k) => !(k in json));
  if (missing.length > 0) {
    console.log(
      `❌ ${locale}/${file}.json is missing keys: ${missing.join(', ')}`
    );
    return false;
  }
  console.log(`✅ ${locale}/${file}.json has all required keys!`);
  return true;
}

// === MAIN ===
async function runValidation() {
  console.log('🔍 Running dictionary validation in LIGHT mode...\n');

  let allValid = true;

  for (const locale of locales) {
    for (const [file, keys] of Object.entries(requiredKeys)) {
      const filePath = path.join(dictionariesDir, locale, `${file}.json`);
      if (!fs.existsSync(filePath)) {
        console.log(`❌ Missing file: ${locale}/${file}.json`);
        allValid = false;
        continue;
      }

      const json = loadJson(filePath);
      const valid = validateFile(locale, file, json, keys);
      if (!valid) allValid = false;
    }
  }

  console.log('\n📦 Dictionary validation finished!');
  if (!allValid) {
    console.error(
      '❌ Validation failed. Fix the above issues before committing.'
    );
    process.exit(1);
  } else {
    console.log('✅ All dictionaries are valid!');
  }
}

runValidation();
