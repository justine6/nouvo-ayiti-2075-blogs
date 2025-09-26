// scripts/check-dicts.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { z } from 'zod';

// Fix __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ----------------------
// Define schemas
// ----------------------

// Common metadata required everywhere
const baseSchema = z.object({
  metaTitle: z.string(),
  metaDescription: z.string(),
});

// join.json
const joinSchema = baseSchema.extend({
  join: z.object({
    title: z.string(),
    form: z.object({
      name: z.string(),
      email: z.string(),
      phone: z.string(),
      location: z.string(),
      message: z.string(),
      submit: z.string(),
    }),
  }),
});

// contact.json
const contactSchema = baseSchema.extend({
  contact: z.object({
    form: z.object({
      name: z.string(),
      email: z.string(),
      message: z.string(),
      submit: z.string(),
    }),
  }),
});

// projects.json
const projectsSchema = baseSchema.extend({
  education: z.object({ label: z.string() }),
  healthcare: z.object({ label: z.string() }),
  infrastructure: z.object({ label: z.string() }),
  agriculture: z.object({ label: z.string() }),
  environment: z.object({ label: z.string() }),
  technology: z.object({ label: z.string() }),
});

// all.json (merged dictionaries)
const allSchema = baseSchema.extend({
  join: joinSchema.shape.join.optional(),
  contact: contactSchema.shape.contact.optional(),
});

// ----------------------
// Helper: load JSON
// ----------------------
function loadJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

// ----------------------
// Validation logic
// ----------------------
const dictionariesDir = path.join(__dirname, '..', 'dictionaries');
const locales = fs
  .readdirSync(dictionariesDir)
  .filter((f) => /^[a-z]{2}$/.test(f));

for (const locale of locales) {
  const localeDir = path.join(dictionariesDir, locale);
  const files = fs.readdirSync(localeDir).filter((f) => f.endsWith('.json'));

  for (const file of files) {
    const filePath = path.join(localeDir, file);
    const data = loadJson(filePath);

    try {
      if (file === 'join.json') {
        joinSchema.parse(data);
      } else if (file === 'contact.json') {
        contactSchema.parse(data);
      } else if (file === 'projects.json') {
        projectsSchema.parse(data);
      } else if (file === 'all.json') {
        allSchema.parse(data);
      } else {
        // fallback: require at least metaTitle + metaDescription
        baseSchema.parse(data);
      }

      console.log(`✅ ${locale}/${file} passed strict validation`);
    } catch (err) {
      console.error(`❌ ${locale}/${file} failed strict validation`);
      console.error(err.errors ?? err.message ?? err);
      process.exitCode = 1;
    }
  }
}

console.log('📦 Dictionary validation finished!');
