// lib/i18n/settings.ts

// Supported locales
export const locales = ["en", "fr", "ht", "es"] as const;

// Locale type based on locales
export type Locale = (typeof locales)[number];
