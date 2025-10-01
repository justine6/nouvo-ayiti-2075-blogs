// scripts/checks/check-all.js
import { execSync } from 'child_process';

export async function run() {
  const commands = [
    'node scripts/checks/check-dicts.js',
    'node scripts/checks/check-meta.js',
    'node scripts/checks/check-required-only.js',
    'node scripts/checks/check-translation-sync.js',
    'node scripts/checks/check-topbar-footer.js',
  ];

  for (const cmd of commands) {
    console.log(`🔍 Running: ${cmd}`);
    try {
      execSync(cmd, { stdio: 'inherit' });
    } catch (err) {
      console.error(`❌ Failed: ${cmd}`);
      process.exit(1);
    }
  }

  console.log('✅ All checks completed successfully.');
}

// Run if executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  run();
}
