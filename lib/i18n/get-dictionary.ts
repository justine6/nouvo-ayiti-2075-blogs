// lib/i18n/get-dictionary.ts
import path from "path";
import { promises as fs } from "fs";
import { locales, defaultLocale, type Locale } from "./settings";

export type DictionarySection =
  | "home"
  | "blog"
  | "about"
  | "contact"
  | "vision"
  | "footer"
  | "newsletter"
  | "topbar"
  | "projects";

function normalizeLocale(rawLocale: string): Locale {
  return locales.includes(rawLocale as Locale)
    ? (rawLocale as Locale)
    : defaultLocale;
}

export async function getDictionary(
  rawLocale: string,
  section: DictionarySection = "home",
) {
  const locale = normalizeLocale(rawLocale);

  // 🔑 We just build a filesystem path; no import of the folder
  const filePath = path.join(
    process.cwd(),
    "content",
    "dictionaries",
    locale,
    `${section}.json`,
  );

  const file = await fs.readFile(filePath, "utf8");
  return JSON.parse(file);
}
