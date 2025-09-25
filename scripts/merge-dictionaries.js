#!/usr/bin/env node
import fs from "fs";
import path from "path";

// Deep merge function
function deepMerge(target, source) {
  for (const key of Object.keys(source)) {
    if (
      source[key] &&
      typeof source[key] === "object" &&
      !Array.isArray(source[key])
    ) {
      if (!target[key]) target[key] = {};
      deepMerge(target[key], source[key]);
    } else {
      target[key] = source[key];
    }
  }
  return target;
}

// Collect args
const args = process.argv.slice(2);
const outFlagIndex = args.indexOf("-o");
let outPath = null;

if (outFlagIndex !== -1) {
  outPath = args[outFlagIndex + 1];
  args.splice(outFlagIndex, 2);
}

let merged = {};
for (const file of args) {
  const data = JSON.parse(fs.readFileSync(file, "utf-8"));
  merged = deepMerge(merged, data);
}

if (outPath) {
  const absOut = path.resolve(outPath);
  fs.mkdirSync(path.dirname(absOut), { recursive: true });
  fs.writeFileSync(absOut, JSON.stringify(merged, null, 2));
  console.log(`Wrote merged output to ${absOut}`);
  process.exit(0);
}

// Default multilingual output
const locales = ["en", "fr", "ht", "es"];
for (const locale of locales) {
  const outFile = path.resolve(`dictionaries/${locale}/all.json`);
  fs.mkdirSync(path.dirname(outFile), { recursive: true });
  fs.writeFileSync(outFile, JSON.stringify(merged, null, 2));
  console.log(
    `Generated ${locale}/all.json with ${Object.keys(merged).length} sections`
  );
}
