import type { Locale } from "./settings";
import type { SiteDictionary } from "./types";

export async function getDictionary(locale: Locale): Promise<SiteDictionary> {
  try {
    const dict = await import(`../dictionaries/${locale}/all.json`);
    return dict.default as SiteDictionary;
  } catch (error) {
    console.error(`Could not load dictionary for locale: ${locale}`, error);
    return {} as SiteDictionary;
  }
}
