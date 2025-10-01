// scripts/checks/check-topbar-footer.js
// Ensures topbar.json and footer.json exist and contain required keys.

import fs from 'fs';
import path from 'path';

const dictionariesDir = path.join(process.cwd(), 'dictionaries');

// Required keys for topbar and footer
const requiredTopbarKeys = [
  'home',
  'about',
  'projects',
  'blog',
  'contact',
  'vision',
  'language',
];
const requiredFooterKeys = ['title', 'description', 'contact', 'rights'];

function loadJson(filePath) {
  if (!fs.existsSync(filePath)) {
    console.error(`❌ Missing file: ${filePath}`);
    process.exitCode = 1;
    return null;
  }
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function checkFile(locale, fileName, requiredKeys) {
  const filePath = path.join(dictionariesDir, `${locale}.json`);
  const dict = loadJson(filePath);
  if (!dict) return;

  if (!(fileName in dict)) {
    console.error(`❌ ${locale}.json missing section: ${fileName}`);
    process.exitCode = 1;
    return;
  }

  const section = dict[fileName];
  const missing = requiredKeys.filter((k) => !(k in section));

  if (missing.length > 0) {
    console.error(
      `❌ ${locale}.json → ${fileName} missing keys: ${missing.join(', ')}`
    );
    process.exitCode = 1;
  } else {
    console.log(`✅ ${locale}.json → ${fileName} is valid`);
  }
}

const locales = ['en', 'fr', 'ht', 'es'];

for (const locale of locales) {
  checkFile(locale, 'topbar', requiredTopbarKeys);
  checkFile(locale, 'footer', requiredFooterKeys);
}

console.log('\n📦 Topbar/Footer validation finished!');
