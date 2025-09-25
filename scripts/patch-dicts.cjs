// scripts/patch-dicts.js
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Fix __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dictionariesDir = path.join(__dirname, "..", "dictionaries");
const locales = fs.readdirSync(dictionariesDir).filter((f) => /^[a-z]{2}$/.test(f));

for (const locale of locales) {
  const localeDir = path.join(dictionariesDir, locale);
  const files = fs.readdirSync(localeDir).filter((f) => f.endsWith(".json"));

  for (const file of files) {
    const filePath = path.join(localeDir, file);
    let updated = false;
    const data = JSON.parse(fs.readFileSync(filePath, "utf8"));

    if (!data.metaTitle) {
      data.metaTitle = `Placeholder metaTitle for ${locale}/${file}`;
      console.log(`⚡ Added missing metaTitle in ${locale}/${file}`);
      updated = true;
    }

    if (!data.metaDescription) {
      data.metaDescription = `Placeholder metaDescription for ${locale}/${file}`;
      console.log(`⚡ Added missing metaDescription in ${locale}/${file}`);
      updated = true;
    }

    if (updated) {
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
      console.log(`✅ Patched ${locale}/${file}`);
    } else {
      console.log(`✔ No changes needed in ${locale}/${file}`);
    }
  }
}
