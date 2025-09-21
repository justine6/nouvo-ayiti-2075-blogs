import "server-only"; // ensures this only runs on the server
import fs from "fs";
import path from "path";

// Define supported locales
export type Locale = "en" | "fr" | "ht" | "es";

export async function getDictionary(locale: Locale) {
  try {
    // Path to dictionary folder
    const dictPath = path.join(process.cwd(), "dictionaries", locale, "blog.json");

    // Read and parse JSON
    const file = await fs.promises.readFile(dictPath, "utf-8");
    return JSON.parse(file);
  } catch (error) {
    console.error(`❌ Could not load dictionary for locale "${locale}"`, error);
    return {};
  }
}
