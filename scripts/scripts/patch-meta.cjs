// scripts/patch-meta.cjs
const fs = require("fs");
const path = require("path");

const locales = ["en", "fr", "ht", "es"];
const dictDir = path.join(process.cwd(), "dictionaries");

// === Dry-run flag ===
const dryRun = process.argv.includes("--dry-run");

// Loop through all locale folders
for (const locale of locales) {
  const localeDir = path.join(dictDir, locale);
  if (!fs.existsSync(localeDir)) {
    console.warn(`⚠️ Locale folder not found: ${localeDir}, skipping...`);
    continue;
  }

  // Process all JSON files inside this locale folder
  const files = fs.readdirSync(localeDir).filter((f) => f.endsWith(".json"));

  for (const file of files) {
    const filePath = path.join(localeDir, file);
    let updated = false;

    const data = JSON.parse(fs.readFileSync(filePath, "utf8"));

    if (!data.metaTitle) {
      data.metaTitle = `Placeholder metaTitle for ${locale}/${file}`;
      console.log(`🟡 Added missing metaTitle in ${locale}/${file}`);
      updated = true;
    }

    if (!data.metaDescription) {
      data.metaDescription = `Placeholder metaDescription for ${locale}/${file}`;
      console.log(`🟡 Added missing metaDescription in ${locale}/${file}`);
      updated = true;
    }

    if (updated) {
      if (!dryRun) {
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
        console.log(`💾 Patched ${locale}/${file}`);
      } else {
        console.log(`🟡 [DryRun] Would patch ${locale}/${file}`);
      }
    } else {
      console.log(`✔️ No changes needed in ${locale}/${file}`);
    }
  }
}
