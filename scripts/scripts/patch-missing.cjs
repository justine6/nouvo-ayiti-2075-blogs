// scripts/patch-missing.cjs
const fs = require("fs");
const path = require("path");

const locales = ["en", "fr", "ht", "es"];
const baseDir = path.join(__dirname, "..", "dictionaries");

for (const locale of locales) {
  const allPath = path.join(baseDir, locale, "all.json");

  if (!fs.existsSync(allPath)) continue;

  const data = JSON.parse(fs.readFileSync(allPath, "utf-8"));
  let updated = false;

  // Ensure newsletter
  if (!data.newsletter) {
    data.newsletter = {};
    updated = true;
  }
  if (!data.newsletter.description) {
    data.newsletter.description = "Placeholder newsletter description";
    updated = true;
  }

  // Ensure join
  if (!data.join) {
    data.join = {};
    updated = true;
  }
  if (!data.join.title) {
    data.join.title = "Placeholder join title";
    updated = true;
  }
  if (!data.join.form) {
    data.join.form = {};
    updated = true;
  }

  // Ensure footer
  if (!data.footer) {
    data.footer = {};
    updated = true;
  }
  if (!data.footer.contact) {
    data.footer.contact = "Placeholder contact";
    updated = true;
  }
  if (!data.footer.rights) {
    data.footer.rights = "Placeholder rights";
    updated = true;
  }

  if (updated) {
    fs.writeFileSync(allPath, JSON.stringify(data, null, 2));
    console.log(`✅ Patched missing keys in ${locale}/all.json`);
  } else {
    console.log(`✔ No changes needed in ${locale}/all.json`);
  }
}
