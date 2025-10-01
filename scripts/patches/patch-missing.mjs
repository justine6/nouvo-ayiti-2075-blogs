// scripts/patches/patch-missing.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dictionariesDir = path.join(__dirname, '..', '..', 'dictionaries');

export async function run() {
  const locales = fs
    .readdirSync(dictionariesDir)
    .filter((f) => /^[a-z]{2}$/.test(f));

  for (const locale of locales) {
    const filePath = path.join(dictionariesDir, locale, 'join.json');

    if (!fs.existsSync(filePath)) {
      console.log(`⚠️ Missing file detected: ${filePath}`);

      // Example: create an empty object if missing
      fs.writeFileSync(filePath, JSON.stringify({}, null, 2), 'utf-8');
      console.log(`   ➕ Created new file: ${filePath}`);
    }
  }

  console.log('✅ patch-missing finished.');
}

// Run directly if called via node
if (import.meta.url === `file://${process.argv[1]}`) {
  run();
}
