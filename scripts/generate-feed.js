// scripts/generate-feed.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const locales = ['en', 'fr', 'ht', 'es'];
const outputDir = path.resolve(__dirname, '../public');

function generateFeed(locale) {
  return {
    version: 'https://jsonfeed.org/version/1',
    title: `Nouvo Ayiti 2075 - ${locale.toUpperCase()}`,
    home_page_url: 'https://nouvoayiti2075.com',
    feed_url: `/${locale}-feed.json`,
    description: `Feed for ${locale} locale`,
    items: [], // add posts/articles here in the future
  };
}

function run() {
  console.log('📡 Generating feeds...');

  for (const locale of locales) {
    const filePath = path.join(outputDir, `${locale}-feed.json`);
    const feed = generateFeed(locale);
    fs.writeFileSync(filePath, JSON.stringify(feed, null, 2), 'utf8');
    console.log(`✅ Feed written: ${filePath}`);
  }
}

run();
