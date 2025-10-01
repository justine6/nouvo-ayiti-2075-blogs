#!/usr/bin/env node
import { execSync } from 'child_process';
import os from 'os';

const args = process.argv.slice(2).join(' ');

try {
  if (os.platform() === 'win32') {
    // 🟦 Windows → use PowerShell
    let psArgs = '';
    if (args.includes('--patch')) psArgs = '-patch';
    if (args.includes('--restore')) psArgs = '-restore';

    execSync(
      `powershell -ExecutionPolicy Bypass -File ./scripts/check-dictionaries.ps1 ${psArgs}`,
      { stdio: 'inherit' }
    );
  } else {
    // 🟩 macOS/Linux → use Node.js scripts
    if (args.includes('--patch')) {
      execSync('node ./scripts/patches/patch-dicts.js', { stdio: 'inherit' });
    } else if (args.includes('--restore')) {
      execSync('node ./scripts/restore-dicts.js', { stdio: 'inherit' });
    } else {
      execSync(`node ./scripts/checks/check-dicts.js ${args}`, {
        stdio: 'inherit',
      });
    }
  }
} catch (err) {
  process.exit(1);
}
