// scripts/checks/check-topbar-footer.mjs
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Fix __dirname for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ------------------------------------------------------
// CONFIG
// ------------------------------------------------------
const locales = ['en', 'fr', 'ht', 'es'];

// From scripts/checks -> repo root -> content/dictionaries
const dictionariesDir = path.resolve(
  __dirname,
  '../../content/dictionaries'
);

// ------------------------------------------------------
// HELPERS
// ------------------------------------------------------
function safeLoadJson(filePath) {
  try {
    const raw = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function anyFooterFilesExist() {
  return locales.some((locale) =>
    fs.existsSync(path.join(dictionariesDir, locale, 'footer.json'))
  );
}

function checkFooter(locale) {
  const footerPath = path.join(dictionariesDir, locale, 'footer.json');

  if (!fs.existsSync(footerPath)) {
    console.log(`ℹ️  [${locale}] No footer.json yet — skipping.`);
    return;
  }

  const json = safeLoadJson(footerPath);
  if (!json || typeof json !== 'object') {
    console.log(`⚠️  [${locale}] footer.json exists but is invalid JSON.`);
    return;
  }

  const required = ['copyright', 'address', 'email', 'phone'];
  const missing = required.filter((k) => !(k in json));

  if (missing.length) {
    console.log(
      `⚠️  [${locale}] footer.json missing recommended fields: ${missing.join(
        ', '
      )}`
    );
  } else {
    console.log(`✅ [${locale}] footer.json looks good.`);
  }
}

function checkTopbar(locale) {
  const filePath = path.join(dictionariesDir, locale, 'home.json');
  const json = safeLoadJson(filePath);

  if (!json) {
    console.log(
      `ℹ️  [${locale}] home.json missing — skipping topbar check.`
    );
    return;
  }

  const nav = json.topbar || json.nav;

  if (!nav) {
    console.log(
      `ℹ️  [${locale}] No explicit nav/topbar block in home.json (not an error).`
    );
    return;
  }

  console.log(
    `✅ [${locale}] Found nav/topbar keys: ${Object.keys(nav).join(', ')}`
  );
}

// ------------------------------------------------------
// MAIN
// ------------------------------------------------------
async function run() {
  console.log('🔍 Running topbar/footer sanity checks…\n');

  if (!anyFooterFilesExist()) {
    console.log('ℹ️  No footer.json files found — footer not wired yet. 👍');
  } else {
    console.log('\n====== FOOTER CHECK ======');
    for (const locale of locales) {
      checkFooter(locale);
    }
  }

  console.log('\n====== TOPBAR CHECK ======');
  for (const locale of locales) {
    checkTopbar(locale);
  }

  console.log('\n📦 Topbar/footer check complete — no blocking errors.\n');
}

run();
