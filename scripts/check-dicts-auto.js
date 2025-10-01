#!/usr/bin/env node
import { execSync } from 'child_process';
import os from 'os';

// Collect all CLI flags passed after `npm run`
const args = process.argv.slice(2).join(' ');

try {
  if (os.platform() === 'win32') {
    // Windows → PowerShell
    let psArgs = '';
    if (args.includes('--patch')) psArgs = '-patch';
    if (args.includes('--restore')) psArgs = '-restore';

    execSync(
      `powershell -ExecutionPolicy Bypass -File ./scripts/check-dictionaries.ps1 ${psArgs}`,
      { stdio: 'inherit' }
    );
  } else {
    // macOS/Linux → Node.js checker/patcher
    if (args.includes('--patch')) {
      execSync('node ./scripts/patches/patch-dicts.js', { stdio: 'inherit' });
    } else if (args.includes('--restore')) {
      // Placeholder: restore logic for non-Windows
      console.error('⚠️ Restore mode is only supported on Windows for now.');
      process.exit(1);
    } else {
      execSync(`node ./scripts/checks/check-dicts.js ${args}`, {
        stdio: 'inherit',
      });
    }
  }
} catch (err) {
  process.exit(1);
}
