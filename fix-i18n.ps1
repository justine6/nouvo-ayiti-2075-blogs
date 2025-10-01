# --- Fix tsconfig.json (moduleResolution -> bundler) ---
Write-Host "Patching tsconfig.json..." -ForegroundColor Cyan
(Get-Content .\tsconfig.json) -replace '"moduleResolution":\s*"node"', '"moduleResolution": "bundler"' | Set-Content .\tsconfig.json

# --- Ensure lib/i18n folder exists ---
Write-Host "Ensuring lib/i18n folder exists..." -ForegroundColor Cyan
New-Item -ItemType Directory -Force -Path .\lib\i18n | Out-Null

# --- Rewrite get-dictionary.ts with stable version ---
Write-Host "Rewriting lib/i18n/get-dictionary.ts..." -ForegroundColor Cyan
Set-Content -Path .\lib\i18n\get-dictionary.ts -Value @"
import type { Locale } from "./settings";

export async function getDictionary(locale: Locale) {
  try {
    const home = await import(\`@/dictionaries/\${locale}/home.json\`);
    const blog = await import(\`@/dictionaries/\${locale}/blog.json\`);

    return {
      home: home.default,
      blog: blog.default,
    };
  } catch (err) {
    console.warn(\` Missing dictionary for locale: \${locale}, falling back to English\`);

    const home = await import(\`@/dictionaries/en/home.json\`);
    const blog = await import(\`@/dictionaries/en/blog.json\`);

    return {
      home: home.default,
      blog: blog.default,
    };
  }
}
"@

Write-Host " Fix complete! You can now run 'npm run dev'" -ForegroundColor Green
