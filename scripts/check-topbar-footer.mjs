// scripts/checks/check-topbar-footer.mjs
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Fix __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// --- CONFIG ----------------------------------------------------
const locales = ['en', 'fr', 'ht', 'es'];
// dictionaries live in: repoRoot/content/dictionaries
const dictionariesDir = path.resolve(__dirname, '../../content/dictionaries');

// --- HELPERS ---------------------------------------------------
function safeLoadJson(filePath) {
  try {
    const raw = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(raw);
  } catch (err) {
    console.error(`❌ Failed to parse JSON: ${filePath}`);
    console.error(err.message);
    return null;
  }
}

function checkFooter(locale) {
  const footerPath = path.join(dictionariesDir, locale, 'footer.json');

  if (!fs.existsSync(footerPath)) {
    console.log(
      `⚠️  [${locale}] footer.json not found (non-blocking, but recommended).`
    );
    return;
  }

  const json = safeLoadJson(footerPath);
  if (!json || typeof json !== 'object') {
    console.log(`⚠️  [${locale}] footer.json is not a plain object.`);
    return;
  }

  const requiredKeys = ['copyright', 'address', 'email', 'phone'];
  const missing = requiredKeys.filter((k) => !(k in json));

  if (missing.length) {
    console.log(
      `⚠️  [${locale}] footer.json is missing recommended keys: ${missing.join(
        ', '
      )}`
    );
  } else {
    console.log(`✅ [${locale}] footer.json includes basic contact fields.`);
  }
}

// Optional soft check for topbar / nav labels in home.json
function checkTopbar(locale) {
  const homePath = path.join(dictionariesDir, locale, 'home.json');

  if (!fs.existsSync(homePath)) {
    console.log(
      `⚠️  [${locale}] home.json not found while checking topbar labels.`
    );
    return;
  }

  const json = safeLoadJson(homePath);
  if (!json || typeof json !== 'object') return;

  const topbar = json.topbar || json.nav || null;
  if (!topbar || typeof topbar !== 'object') {
    console.log(
      `ℹ️  [${locale}] no explicit topbar/nav block found in home.json (skipping).`
    );
    return;
  }

  const keys = Object.keys(topbar);
  if (!keys.length) {
    console.log(
      `⚠️  [${locale}] topbar/nav block exists but has no keys in home.json.`
    );
  } else {
    console.log(
      `✅ [${locale}] topbar/nav block found with keys: ${keys.join(', ')}`
    );
  }
}

// --- MAIN ------------------------------------------------------
async function run() {
  console.log('🔍 Running topbar/footer sanity checks…\n');

  for (const locale of locales) {
    console.log(`\n🌐 Locale: ${locale}`);
    checkFooter(locale);
    checkTopbar(locale);
  }

  console.log('\n📦 Topbar/footer check finished (no blocking errors).\n');
}

run();
