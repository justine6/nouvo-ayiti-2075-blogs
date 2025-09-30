// scripts/patches/fix-all.js
import { execSync } from "child_process";

export async function run() {
  const commands = [
    "node scripts/patches/patch-dicts.js",
    "node scripts/patches/patch-missing.js",
    "node scripts/patches/fix-footer.js"
  ];

  for (const cmd of commands) {
    console.log(`🔧 Running: ${cmd}`);
    try {
      execSync(cmd, { stdio: "inherit" });
    } catch (err) {
      console.error(`❌ Failed: ${cmd}`);
      process.exit(1);
    }
  }

  console.log("✅ All patchers completed successfully.");
}

// Run if executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  run();
}
