// scripts/check-all.mjs
import { execSync } from 'child_process';

function run(command, label) {
  console.log(`\n▶️  Running: ${label}...`);
  try {
    execSync(command, { stdio: 'inherit' });
  } catch (err) {
    console.error(`❌ Failed: ${label}`);
    process.exit(1);
  }
}

// Normal pipeline
export function runChecks() {
  run('npm run check-dicts', 'npm run check-dicts');
  run('npm run check-meta', 'npm run check-meta');
  run('npm run check-required-only', 'npm run check-required-only');
  run('npm run check-translation-sync', 'npm run check-translation-sync');
  run('npm run check-topbar-footer', 'npm run check-topbar-footer');
  console.log('\n✅ All checks completed successfully!');
}

// Strict pipeline (extra enforcement)
export function runStrictChecks() {
  run('npm run check-dicts:strict', 'npm run check-dicts:strict');
  run('npm run check-meta', 'npm run check-meta');
  run('npm run check-required-only', 'npm run check-required-only');
  run(
    'npm run check-translation-sync:strict',
    'npm run check-translation-sync:strict'
  );
  run(
    'npm run check-topbar-footer:strict',
    'npm run check-topbar-footer:strict'
  );
  console.log('\n✅ All strict checks completed successfully!');
}

// Decide mode
const mode = process.argv[2] || 'default';
if (mode === 'strict') {
  runStrictChecks();
} else {
  runChecks();
}
