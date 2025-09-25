#!/usr/bin/env node
import fs from "fs";
import path from "path";

const baseDir = path.resolve("dictionaries");

// Clean temp.json
const tempFile = path.join(baseDir, "temp.json");
if (fs.existsSync(tempFile)) {
  fs.unlinkSync(tempFile);
  console.log(` Deleted ${tempFile}`);
}

// Clean per-locale all.json
for (const locale of ["en", "fr", "ht", "es"]) {
  const filePath = path.join(baseDir, locale, "all.json");
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
    console.log(` Deleted ${filePath}`);
  }
}

console.log(" Cleanup complete.");
