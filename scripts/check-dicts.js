const fs = require("fs");
const path = require("path");

// ✅ Define required keys for each dictionary file
const requiredKeys = {
  "contact.json": [
    "title",
    "subtitle",
    "address",
    "email",
    "phone",
    "form",
    "metaTitle",
    "metaDescription"
  ],
  "newsletter.json": [
    "title",
    "description",
    "placeholder",
    "subscribe",
    "metaTitle",
    "metaDescription"
  ],
  "vision.json": [
    "intro",
    "title",
    "readMore",
    "metaTitle",
    "metaDescription"
  ],
  "footer.json": [
    "copyright",
    "links",
    "address",
    "email",
    "phone",
    "metaTitle",
    "metaDescription"
  ]
};

// 📂 Dictionary folder path
const dictDir = path.join(__dirname, "..", "dictionaries");

// ✅ Check if `--strict` flag was passed
const isStrict = process.argv.includes("--strict");

// 🔹 Helper: load JSON file safely
function loadJSON(filePath) {
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf-8"));
  } catch (err) {
    console.error(`❌ Failed to parse ${filePath}:`, err.message);
    return null;
  }
}

// 🔹 Helper: validate keys
function validateKeys(dictName, dict, requiredKeys) {
  const keys = Object.keys(dict);
  let valid = true;

  // ✅ Check missing keys
  requiredKeys.forEach((key) => {
    if (!keys.includes(key)) {
      console.error(`❌ ${dictName} is missing required key: "${key}"`);
      valid = false;
    }
  });

  // ✅ Strict mode → also check for extra keys
  if (isStrict) {
    keys.forEach((key) => {
      if (!requiredKeys.includes(key)) {
        console.error(`❌ ${dictName} has extra key: "${key}"`);
        valid = false;
      }
    });
  }

  if (valid) {
    if (isStrict) {
      console.log(`✅ ${dictName} keys match perfectly!`);
    } else {
      console.log(`✅ ${dictName} has all required keys!`);
    }
  }

  return valid;
}

// 🔹 Run validations
function runValidation() {
  console.log(
    `🔍 Running dictionary validation in ${
      isStrict ? "STRICT" : "LIGHT"
    } mode...\n`
  );

  const locales = ["en", "fr", "ht", "es"];
  const dictFiles = Object.keys(requiredKeys);

  let allValid = true;

  locales.forEach((locale) => {
    dictFiles.forEach((file) => {
      const filePath = path.join(dictDir, locale, file);

      if (!fs.existsSync(filePath)) {
        console.error(`❌ Missing file: ${filePath}`);
        allValid = false;
        return;
      }

      const dict = loadJSON(filePath);
      if (!dict) {
        allValid = false;
        return;
      }

      if (!validateKeys(`${locale}/${file}`, dict, requiredKeys[file])) {
        allValid = false;
      }
    });
  });

  console.log("\n✨ Dictionary validation finished!");

  if (!allValid) {
    console.error("❌ Validation failed. Fix the above issues before proceeding.");
    process.exit(1);
  } else {
    console.log("✅ All dictionaries are valid!");
  }
}

runValidation();
