export const locales = ["en", "fr", "ht", "es"] as const;
export type Locale = (typeof locales)[number];
