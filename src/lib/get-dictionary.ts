import path from "path";
import fs from "fs";
import type { Locale } from "./settings";

export async function getDictionary(locale: Locale | string = "en") {
  const safeLocale = locale || "en"; // ✅ fallback

  try {
    const dictPath = path.join(process.cwd(), "dictionaries", `${safeLocale}.json`);
    const data = await fs.promises.readFile(dictPath, "utf-8");
    return JSON.parse(data);
  } catch {
    console.warn(`⚠️ Missing dictionary for "${safeLocale}", falling back to English`);
    const dictPath = path.join(process.cwd(), "dictionaries", "en.json");
    const data = await fs.promises.readFile(dictPath, "utf-8");
    return JSON.parse(data);
  }
}
