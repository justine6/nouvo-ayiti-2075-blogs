// lib/i18n/get-dictionary.ts

import fs from "fs";
import path from "path";
import { locales, defaultLocale, type Locale } from "./settings";

export type DictionarySection =
  | "home"
  | "topbar"
  | "blog"
  | "projects"
  | "about"
  | "vision"
  | "contact"
  | "join";

const DICT_ROOT = path.join(process.cwd(), "dictionaries");

function normalizeLocale(locale: string): Locale {
  return locales.includes(locale as Locale) ? (locale as Locale) : defaultLocale;
}

export async function getDictionary(
  locale: string,
  section: DictionarySection
): Promise<Record<string, unknown>> {
  const safeLocale = normalizeLocale(locale);
  const fileName = `${section}.json`;
  const dictPath = path.join(DICT_ROOT, safeLocale, fileName);

  try {
    const file = await fs.promises.readFile(dictPath, "utf-8");
    return JSON.parse(file);
  } catch (error) {
    console.error(
      `❌ Could not load dictionary "${fileName}" for locale "${safeLocale}"`,
      error
    );
    // Return empty object so callers can safely fallback
    return {};
  }
}

// Convenience helpers
export const getHomeDictionary = (locale: string) =>
  getDictionary(locale, "home");

export const getTopbarDictionary = (locale: string) =>
  getDictionary(locale, "topbar");
