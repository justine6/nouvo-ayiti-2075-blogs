// scripts/patches/patch-dicts.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// dictionaries is two levels up from /scripts/patches
const dictionariesDir = path.join(__dirname, '..', '..', 'dictionaries');

export async function run() {
  const locales = fs
    .readdirSync(dictionariesDir)
    .filter((f) => /^[a-z]{2}$/.test(f));

  for (const locale of locales) {
    const dir = path.join(dictionariesDir, locale);
    console.log(`📂 Checking dictionaries in: ${dir}`);

    const files = fs.readdirSync(dir).filter((f) => f.endsWith('.json'));
    for (const file of files) {
      const filePath = path.join(dir, file);
      console.log(`   ✔ Found: ${filePath}`);
      // Add any patch/validation logic here if needed
    }
  }

  console.log('✅ patch-dicts finished.');
}

// Run directly if called via node
if (import.meta.url === `file://${process.argv[1]}`) {
  run();
}
