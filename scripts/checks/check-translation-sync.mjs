// scripts/checks/check-translation-sync.mjs
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Fix __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// --- CONFIG ----------------------------------------------------
const locales = ['en', 'fr', 'ht', 'es'];
const baseLocale = 'en';

// From scripts/checks -> repo root -> content/dictionaries
const dictionariesDir = path.resolve(__dirname, '../../content/dictionaries');

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

/**
 * Recursively collect dotted keys, e.g. hero.title, hero.subtitle
 */
function getAllKeys(obj, prefix = '') {
  return Object.keys(obj).flatMap((key) => {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    const value = obj[key];

    if (value && typeof value === 'object' && !Array.isArray(value)) {
      return getAllKeys(value, fullKey);
    }

    return fullKey;
  });
}

async function runValidation() {
  console.log('🔍 Running translation key sync validation...\n');

  const baseDir = path.join(dictionariesDir, baseLocale);

  if (!fs.existsSync(baseDir)) {
    console.error(`❌ Base locale directory not found: ${baseDir}`);
    process.exit(1);
  }

  const baseFiles = fs
    .readdirSync(baseDir)
    .filter((file) => file.endsWith('.json'));

  let allValid = true;

  for (const file of baseFiles) {
    const basePath = path.join(baseDir, file);
    const baseJson = loadJson(basePath);
    const baseKeys = getAllKeys(baseJson);

    console.log(`\n📁 Checking file (base=${baseLocale}): ${file}`);
    // For each non-base locale
    for (const locale of locales) {
      if (locale === baseLocale) continue;

      const targetPath = path.join(dictionariesDir, locale, file);

      if (!fs.existsSync(targetPath)) {
        console.log(`  ❌ Missing ${locale}/${file}`);
        allValid = false;
        continue;
      }

      const targetJson = loadJson(targetPath);
      const targetKeys = getAllKeys(targetJson);

      const missing = baseKeys.filter((k) => !targetKeys.includes(k));
      const extra = targetKeys.filter((k) => !baseKeys.includes(k));

      if (!missing.length && !extra.length) {
        console.log(`  ✅ ${locale}/${file} is in sync`);
      } else {
        if (missing.length) {
          console.log(
            `  ❌ ${locale}/${file} is missing keys: ${missing.join(', ')}`,
          );
          allValid = false;
        }
        if (extra.length) {
          console.log(
            `  ⚠️ ${locale}/${file} has extra keys: ${extra.join(', ')}`,
          );
        }
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
