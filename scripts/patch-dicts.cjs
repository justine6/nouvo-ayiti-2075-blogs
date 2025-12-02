// scripts/patch-dicts.cjs
const fs = require("fs");
const path = require("path");

const locales = ["en", "fr", "ht", "es"];
const dictDir = path.join(process.cwd(), "dictionaries");

const defaults = {
  HeroSection: {
    en: {
      title: "Nouvo Ayiti 2075",
      subtitle: "Restoring Dignity. Rebuilding Hope.",
      readMore: "Read the Vision",
      joinNow: "Join the Movement",
      watchVideos: "Watch Videos",
      goToMain: "Main Website"
    },
    fr: {
      title: "Nouvelle Haïti 2075",
      subtitle: "Restaurer la dignité. Reconstruire l'espoir.",
      readMore: "Lire la Vision",
      joinNow: "Rejoindre le Mouvement",
      watchVideos: "Regarder les vidéos",
      goToMain: "Site Principal"
    },
    ht: {
      title: "Nouvo Ayiti 2075",
      subtitle: "Rete diyite. Rebati espwa.",
      readMore: "Li Vizyond lan",
      joinNow: "Antre nan mouvman an",
      watchVideos: "Gade videyo yo",
      goToMain: "Sit Prensipal"
    },
    es: {
      title: "Nueva Haití 2075",
      subtitle: "Restaurar la dignidad. Reconstruir la esperanza.",
      readMore: "Leer la Visión",
      joinNow: "Únete al Movimiento",
      watchVideos: "Ver Videos",
      goToMain: "Sitio Principal"
    }
  },
  BlogSection: {
    en: {
      title: "Our Blog",
      subtitle: "Stories, updates, and visions for the future.",
      viewAll: "View All Posts"
    },
    fr: {
      title: "Notre Blog",
      subtitle: "Histoires, mises à jour et visions pour l'avenir.",
      viewAll: "Voir tous les articles"
    },
    ht: {
      title: "Blog Nou",
      subtitle: "Istwa, mizajou, ak vizyon pou lavni.",
      viewAll: "Gade tout atik yo"
    },
    es: {
      title: "Nuestro Blog",
      subtitle: "Historias, actualizaciones y visiones para el futuro.",
      viewAll: "Ver todas las publicaciones"
    }
  }
};

const dryRun = process.argv.includes("--dry-run");

for (const locale of locales) {
  const filePath = path.join(dictDir, locale, "home.json");

  if (!fs.existsSync(filePath)) {
    console.warn(`⚠️ File not found: ${filePath}, skipping...`);
    continue;
  }

  let updated = false;
  const data = JSON.parse(fs.readFileSync(filePath, "utf8"));

  for (const section of Object.keys(defaults)) {
    if (!data[section]) {
      data[section] = defaults[section][locale];
      console.log(`✅ Added missing section '${section}' in ${filePath}`);
      updated = true;
    } else {
      for (const key of Object.keys(defaults[section][locale])) {
        if (!data[section][key]) {
          data[section][key] = defaults[section][locale][key];
          console.log(
            `🟡 Added missing key '${key}' in section '${section}' (${locale})`
          );
          updated = true;
        }
      }
    }
  }

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
