// scripts/patch-dicts.cjs
const fs = require("fs");
const path = require("path");

const locales = ["en", "fr", "ht", "es"];
const dictDir = path.join(process.cwd(), "dictionaries");

// Default content for missing sections
const defaults = {
  HeroSection: {
    en: {
      title: "Nouvo Ayiti 2075",
      subtitle: "Restoring Dignity. Rebuilding Hope.",
      readMore: "Read the Vision",
      joinNow: "Join the Movement",
      watchVideos: "Watch Videos",
      goToMain: "Main Website",
    },
    fr: {
      title: "Nouvelle Haïti 2075",
      subtitle: "Restaurer la dignité. Reconstruire l'espoir.",
      readMore: "Lire la Vision",
      joinNow: "Rejoindre le Mouvement",
      watchVideos: "Regarder les vidéos",
      goToMain: "Site Principal",
    },
    ht: {
      title: "Nouvo Ayiti 2075",
      subtitle: "Rete diyite. Rebati espwa.",
      readMore: "Li Vizyond lan",
      joinNow: "Antre nan mouvman an",
      watchVideos: "Gade videyo yo",
      goToMain: "Sit Prensipal",
    },
    es: {
      title: "Nueva Haití 2075",
      subtitle: "Restaurar la dignidad. Reconstruir la esperanza.",
      readMore: "Leer la Visión",
      joinNow: "Únete al Movimiento",
      watchVideos: "Ver Videos",
      goToMain: "Sitio Principal",
    },
  },
  // (You can add BlogSection, Topbar, Footer here later…)
};

// === Dry-run flag ===
const dryRun = process.argv.includes("--dry-run");

// Loop through locales and patch files
for (const locale of locales) {
  const filePath = path.join(dictDir, locale, "home.json");

  if (!fs.existsSync(filePath)) {
    console.warn(`⚠️ File not found: ${filePath}, skipping...`);
    continue;
  }

  let updated = false;
  const data = JSON.parse(fs.readFileSync(filePath, "utf8"));

  // Loop through default sections (HeroSection, etc.)
  for (const section of Object.keys(defaults)) {
    if (!data[section]) {
      // If section missing entirely → add it
      data[section] = defaults[section][locale];
      console.log(`✅ Added missing section '${section}' in ${filePath}`);
      updated = true;
    } else {
      // Section exists → check missing keys
      for (const key of Object.keys(defaults[section][locale])) {
        if (!data[section][key]) {
          data[section][key] = defaults[section][locale][key];
          console.log(`🟡 Added missing key '${key}' in section '${section}' (${locale})`);
          updated = true;
        }
      }
    }
  }

  // Save if updated
  if (updated) {
    if (!dryRun) {
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
      console.log(`💾 Patched ${filePath}`);
    } else {
      console.log(`🟡 [DryRun] Would patch ${filePath}`);
    }
  } else {
    console.log(`✔️ No changes needed in ${filePath}`);
  }
}
