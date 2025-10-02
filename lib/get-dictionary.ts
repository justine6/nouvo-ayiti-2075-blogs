import { Locale } from "./settings";
import fs from "fs";
import path from "path";

export async function getDictionary(locale: Locale) {
  // List of all dictionaries you want available
  const dictionaries = [
    "home",
    "blog",
    "contact",
    "vision",
    "newsletter",
    "projects",
    "about",
    "join",
  ];

  const result: Record<string, any> = {};

  for (const dict of dictionaries) {
    try {
      const filePath = path.join(process.cwd(), "lib/i18n/locales", locale, `${dict}.json`);
      const content = await fs.promises.readFile(filePath, "utf8");
      result[dict] = JSON.parse(content);
    } catch {
      console.warn(`⚠️ Missing or invalid ${dict}.json for locale "${locale}".`);
      result[dict] = {}; // fallback to empty object if file is missing
    }
  }

  return result;
}
