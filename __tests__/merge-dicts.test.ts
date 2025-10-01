import fs from "fs";
import path from "path";
import { execSync } from "child_process";

describe("merge-dicts.mjs", () => {
  const scriptPath = path.resolve("scripts/merge-dictionaries.mjs");
  const dictA = path.resolve("dictionaries/test-a.mjson");
  const dictB = path.resolve("dictionaries/test-b.mjson");
  const tempOut = path.resolve("dictionaries/temp.mjson");
  const localeDir = path.resolve("dictionaries");

  beforeEach(() => {
    // Clean up old outputs
    if (fs.existsSync(tempOut)) fs.unlinkSync(tempOut);
    for (const locale of ["en", "fr", "ht", "es"]) {
      const localeFile = path.join(localeDir, locale, "all.mjson");
      if (fs.existsSync(localeFile)) fs.unlinkSync(localeFile);
    }
  });

  it("merges into a single JSON file with -o temp.mjson", () => {
    execSync(`node ${scriptPath} ${dictA} ${dictB} -o ${tempOut}`);
    const merged = JSON.parse(fs.readFileSync(tempOut, "utf-8"));
    expect(merged.hero.title).toBe("Hello");
    expect(merged.hero.subtitle).toBe("World");
  });

  it("merges into per-locale all.mjson files when no -o flag", () => {
    execSync(`node ${scriptPath} ${dictA} ${dictB}`);
    for (const locale of ["en", "fr", "ht", "es"]) {
      const localeFile = path.join(localeDir, locale, "all.mjson");
      expect(fs.existsSync(localeFile)).toBe(true);

      const merged = JSON.parse(fs.readFileSync(localeFile, "utf-8"));
      expect(merged.hero.title).toBe("Hello");
      expect(merged.hero.subtitle).toBe("World");
    }
  });
});
