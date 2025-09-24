import fs from "fs";
import path from "path";

export async function getDictionary(locale: string) {
  // ✅ Skip invalid locales (like favicon.ico)
  if (!["en", "fr", "ht", "es"].includes(locale)) {
    return {}; // return empty object so it won’t crash
  }

  try {
    const dictPath = path.join(
      process.cwd(),
      "dictionaries",
      locale,
      "blog.json",
    );
    const file = await fs.promises.readFile(dictPath, "utf-8");
    return JSON.parse(file);
  } catch (error) {
    console.error(`❌ Could not load dictionary for locale "${locale}"`, error);
    return {};
  }
}
