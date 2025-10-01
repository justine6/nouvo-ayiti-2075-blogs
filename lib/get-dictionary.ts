import { Locale } from "./settings";
import fs from "fs";
import path from "path";

export async function getDictionary(locale: Locale) {
  try {
    // Path to the unified home.json
    const filePath = path.join(process.cwd(), "lib/i18n/locales", locale, "home.json");
    const content = await fs.promises.readFile(filePath, "utf8");
    return JSON.parse(content);
  } catch (error) {
    console.warn(`⚠️ Missing or invalid home.json for locale "${locale}". Returning empty object.`);
    return {};
  }
}
