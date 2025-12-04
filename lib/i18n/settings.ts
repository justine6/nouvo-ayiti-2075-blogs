import type { Locale } from "./types";

export const DEFAULT_LOCALE: Locale = "en";

export const SUPPORTED_LOCALES: Locale[] = ["en", "fr", "ht", "es"];

// Aliases used by the rest of the app
export const locales: Locale[] = SUPPORTED_LOCALES;
export const defaultLocale: Locale = DEFAULT_LOCALE;

/**
 * Guard: normalize any incoming locale string to a supported one.
 */
export function normalizeLocale(locale: string | undefined | null): Locale {
  if (!locale) return DEFAULT_LOCALE;
  const lower = locale.toLowerCase();
  if (SUPPORTED_LOCALES.includes(lower as Locale)) {
    return lower as Locale;
  }
  return DEFAULT_LOCALE;
}

export type { Locale };
