export type DictionarySection = string;

/**
 * Generic dictionary loader for JSON files in /dictionaries/<locale>/<section>.json
 * Falls back to "en" if the requested locale/section is missing.
 */
export async function getDictionary(
  locale: string,
  section: DictionarySection
): Promise<any> {
  async function load(loc: string, sec: string): Promise<any | null> {
    try {
      const mod = await import(
        /* webpackIgnore: true */ `../../../dictionaries/${loc}/${sec}.json`
      );
      return mod.default || mod;
    } catch {
      return null;
    }
  }

  const primary = await load(locale, section);
  if (primary) return primary;

  if (locale !== "en") {
    const fallback = await load("en", section);
    if (fallback) return fallback;
  }

  return {};
}
