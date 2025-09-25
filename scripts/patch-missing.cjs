// scripts/patch-missing.js
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

    // Join section
    if (!data.join) {
      data.join = { title: "Placeholder join title", form: {} };
      updated = true;
    }
    if (!data.join.form) data.join.form = {};
    if (!data.join.form.name) { data.join.form.name = "Placeholder name field"; updated = true; }
    if (!data.join.form.email) { data.join.form.email = "Placeholder email field"; updated = true; }
    if (!data.join.form.submit) { data.join.form.submit = "Placeholder submit button"; updated = true; }

    // Contact section
    if (!data.contact) {
      data.contact = { form: {} };
      updated = true;
    }
    if (!data.contact.form) data.contact.form = {};
    if (!data.contact.form.name) { data.contact.form.name = "Placeholder contact name"; updated = true; }
    if (!data.contact.form.message) { data.contact.form.message = "Placeholder contact message"; updated = true; }
    if (!data.contact.form.submit) { data.contact.form.submit = "Placeholder contact submit"; updated = true; }

    if (updated) {
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
      console.log(`✅ Patched ${locale}/${file}`);
    } else {
      console.log(`✔ No changes needed in ${locale}/${file}`);
    }
  }
}
