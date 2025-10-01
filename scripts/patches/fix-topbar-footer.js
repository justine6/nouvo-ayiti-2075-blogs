// scripts/patches/fix-topbar-footer.js
// Ensures topbar and footer objects exist in all locale dictionaries.
// Missing keys are auto-filled with "TODO: translate".

import fs from 'fs';
import path from 'path';

const dictionariesDir = path.join(process.cwd(), 'dictionaries');
const locales = ['en', 'fr', 'ht', 'es'];

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
    return null;
  }
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function saveJson(filePath, json) {
  fs.writeFileSync(filePath, JSON.stringify(json, null, 2), 'utf8');
}

function ensureSection(dict, sectionName, requiredKeys) {
  let patched = false;

  if (!(sectionName in dict)) {
    dict[sectionName] = {};
    console.log(`➕ Added missing section: ${sectionName}`);
    patched = true;
  }

  for (const key of requiredKeys) {
    if (!(key in dict[sectionName])) {
      dict[sectionName][key] = 'TODO: translate';
      console.log(`   ➕ Added missing ${sectionName} key: ${key}`);
      patched = true;
    }
  }

  return patched;
}

let globalPatched = false;

for (const locale of locales) {
  const filePath = path.join(dictionariesDir, `${locale}.json`);
  const dict = loadJson(filePath);
  if (!dict) continue;

  console.log(`\n🌍 Checking ${locale}.json...`);
  let patched = false;

  patched |= ensureSection(dict, 'topbar', requiredTopbarKeys);
  patched |= ensureSection(dict, 'footer', requiredFooterKeys);

  if (patched) {
    saveJson(filePath, dict);
    console.log(`✅ Patched ${locale}.json`);
    globalPatched = true;
  } else {
    console.log(`✔ ${locale}.json already in sync`);
  }
}

if (!globalPatched) {
  console.log('\n🎉 All dictionaries already in sync!');
} else {
  console.log('\n✨ Patching completed!');
}
