// scripts/patches/fix-footer.js
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Fix __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dictionariesDir = path.join(__dirname, "..", "dictionaries");
const locales = ["en", "fr", "ht", "es"];

// Default footer schema per locale
const footerDefaults = {
  en: {
    rights: "All rights reserved.",
    poweredBy: "Powered by Nouvo Ayiti 2075",
    privacy: "Privacy Policy",
    terms: "Terms of Service",
  },
  fr: {
    rights: "Tous droits réservés.",
    poweredBy: "Propulsé par Nouvo Ayiti 2075",
    privacy: "Politique de confidentialité",
    terms: "Conditions d'utilisation",
  },
  ht: {
    rights: "Tout dwa rezève.",
    poweredBy: "Pouse pa Nouvo Ayiti 2075",
    privacy: "Règle sou vi prive",
    terms: "Tèm sèvis",
  },
  es: {
    rights: "Todos los derechos reservados.",
    poweredBy: "Impulsado por Nouvo Ayiti 2075",
    privacy: "Política de Privacidad",
    terms: "Términos de Servicio",
  },
};

export function run() {
  for (const locale of locales) {
    const filePath = path.join(dictionariesDir, locale, "footer.json");

    try {
      if (!fs.existsSync(filePath)) {
        console.warn(`⚠️ Skipping missing file: ${filePath}`);
        continue;
      }

      const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
      if (!data.footer) data.footer = {};

      const defaults = footerDefaults[locale];
      let updated = false;

      for (const key of Object.keys(defaults)) {
        if (!data.footer[key]) {
          data.footer[key] = defaults[key];
          updated = true;
          console.log(`⚡ Added missing "${key}" in ${locale}/footer.json`);
        }
      }

      if (updated) {
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");
        console.log(`✅ Patched ${locale}/footer.json`);
      } else {
        console.log(`✔ No changes needed in ${locale}/footer.json`);
      }
    } catch (err) {
      console.error(`❌ Failed to process ${locale}/footer.json:`, err.message);
    }
  }
}

// Run if executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  run();
}
