import type { Locale } from "./settings";

export async function getDictionary(locale: Locale) {
  try {
    const home = await import(`@/dictionaries/${locale}/home.json`);
    const blog = await import(`@/dictionaries/${locale}/blog.json`);

    return {
      home: home.default,
      blog: blog.default,
    };
  } catch (err) {
    console.warn(` Missing dictionary for locale: ${locale}, falling back to English`);

    const home = await import(`@/dictionaries/en/home.json`);
    const blog = await import(`@/dictionaries/en/blog.json`);

    return {
      home: home.default,
      blog: blog.default,
    };
  }
}
