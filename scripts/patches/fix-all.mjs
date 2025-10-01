// scripts/patches/fix-all.mjs
import { execSync } from 'child_process';

function run(command) {
  console.log(`\n▶ Running: ${command}`);
  try {
    execSync(command, { stdio: 'inherit' });
  } catch (err) {
    console.error(`✖ Failed: ${command}`);
    process.exit(1);
  }
}

// Run patch/fix sequence using npm scripts
run('npm run patch-dicts');
run('npm run patch-missing');
run('npm run fix-footer');

console.log('\n✅ All fixes completed successfully!');
