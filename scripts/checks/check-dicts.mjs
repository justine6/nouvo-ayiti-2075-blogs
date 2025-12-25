// scripts/checks/check-dicts.mjs
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Fix __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// === CONFIG ===
const locales = ['en', 'fr', 'ht', 'es'];
const baseLocale = 'en';

// From scripts/checks -> repo root -> content/dictionaries
const dictionariesDir = path.resolve(__dirname, '../../content/dictionaries');

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

function listBaseFiles() {
  const baseDir = path.join(dictionariesDir, baseLocale);
  if (!fs.existsSync(baseDir)) {
    console.error(`❌ Base locale directory not found: ${baseDir}`);
    process.exit(1);
  }

  return fs
    .readdirSync(baseDir)
    .filter((name) => name.toLowerCase().endsWith('.json'));
}

// === MAIN ===
async function runValidation() {
  console.log('🔍 Running dictionary validation in LIGHT mode...\n');

  let allValid = true;

  const baseFiles = listBaseFiles();

  for (const fileName of baseFiles) {
    const basePath = path.join(dictionariesDir, baseLocale, fileName);
    const baseJson = loadJson(basePath);
    const requiredKeys = Object.keys(baseJson);

    console.log(`\n📁 Checking file: ${fileName}`);
    console.log(`   Required keys (from ${baseLocale}): ${requiredKeys.join(', ')}`);

    for (const locale of locales) {
      const localePath = path.join(dictionariesDir, locale, fileName);

      if (!fs.existsSync(localePath)) {
        console.log(`❌ Missing file: ${locale}/${fileName}`);
        allValid = false;
        continue;
      }

      const json = loadJson(localePath);
      const missing = requiredKeys.filter((k) => !(k in json));

      if (missing.length > 0) {
        console.log(
          `❌ ${locale}/${fileName} is missing keys: ${missing.join(', ')}`,
        );
        allValid = false;
      } else {
        console.log(`✅ ${locale}/${fileName} has all required keys`);
      }
    }
  }

  console.log('\n📦 Dictionary validation finished!');
  if (!allValid) {
    console.error(
      '❌ Validation failed. Fix the above issues before committing.',
    );
    process.exit(1);
  } else {
    console.log('✅ All dictionaries are valid!');
  }
}

runValidation();
