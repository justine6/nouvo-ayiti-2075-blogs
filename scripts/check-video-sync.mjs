import fs from "fs";
import path from "path";

const LOCALES = ["en", "fr", "ht", "es"];
const ROOT = process.cwd();

const catalogPath = path.join(ROOT, "lib", "videos", "catalog.ts");
const dictRoot = path.join(ROOT, "content", "dictionaries");

function getCatalogIds() {
  const text = fs.readFileSync(catalogPath, "utf8");

  const matches = [...text.matchAll(/id:\s*"(.*?)"/g)];
  return matches.map((m) => m[1]);
}

function getDictItems(locale) {
  const file = path.join(dictRoot, locale, "videos.json");
  const json = JSON.parse(fs.readFileSync(file, "utf8"));

  return Object.keys(json.items ?? {});
}

const catalogIds = getCatalogIds();

console.log('📺 VIDEO CATALOG IDS');
console.log('-------------------');
catalogIds.forEach((id) => console.log("•", id));
console.log("");

let ok = true;

for (const locale of LOCALES) {
  console.log(`🌍 Checking locale: ${locale}`);
  console.log('--------------------');

  const dictIds = getDictItems(locale);

  for (const id of catalogIds) {
    if (!dictIds.includes(id)) {
      console.log(`❌ Missing in ${locale}/videos.json → ${id}`);
      ok = false;
    } else {
      console.log(`✅ ${id}`);
    }
  }

  console.log("");
}

if (ok) {
  console.log("🎉 All catalog videos exist in all locale dictionaries!");
} else {
  console.log("⚠ Some videos are missing. No files were changed.");
  process.exit(1);
}
