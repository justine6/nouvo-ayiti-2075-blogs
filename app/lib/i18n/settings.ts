// app/lib/i18n/settings.ts

export const locales = ["en", "fr", "ht", "es"] as const;

// Default locale
export const defaultLocale = "en";

export type Locale = (typeof locales)[number];







