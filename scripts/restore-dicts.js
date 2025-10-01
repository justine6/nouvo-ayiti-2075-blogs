#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import readline from 'readline';

const dictDir = path.resolve('dictionaries');

// Ensure dictionaries folder exists
if (!fs.existsSync(dictDir)) {
  console.error('❌ Dictionaries folder not found:', dictDir);
  process.exit(1);
}

// Find .bak files
const backups = fs.readdirSync(dictDir).filter((f) => f.endsWith('.bak'));

if (backups.length === 0) {
  console.log('⚠️ No backup files found (*.bak)');
  process.exit(0);
}

// Check for --force flag
const force = process.argv.includes('--force');

// List files that would be restored
console.log('♻️ The following files will be restored:');
for (const bak of backups) {
  console.log(`   - ${bak.replace(/\.bak$/, '.json')} (from ${bak})`);
}
console.log('');

function restore() {
  console.log('\n♻️ Restoring dictionaries from backups...\n');

  for (const bak of backups) {
    const bakPath = path.join(dictDir, bak);
    const originalPath = bakPath.replace(/\.bak$/, '');

    try {
      fs.copyFileSync(bakPath, originalPath);
      console.log(`✅ Restored ${originalPath} from ${bak}`);
    } catch (err) {
      console.error(`❌ Failed to restore ${originalPath}:`, err.message);
    }
  }

  console.log('\n✅ Restore complete.');
}

if (force) {
  restore();
} else {
  // Ask for confirmation
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question(
    '⚠️ Are you sure you want to overwrite these files? [y/N] ',
    (answer) => {
      rl.close();

      if (answer.toLowerCase() !== 'y' && answer.toLowerCase() !== 'yes') {
        console.log('❌ Restore cancelled.');
        process.exit(0);
      }

      restore();
    }
  );
}
