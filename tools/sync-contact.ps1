Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

# 1. Configure
$section   = "contact.json"                 # which file to sync
$locales   = @("en", "fr", "ht", "es")      # which locale folders exist
$sourceLoc = "fr"                           # canonical source locale

# 2. Resolve paths
$root   = Join-Path (Get-Location) "dictionaries"
$source = Join-Path $root "$sourceLoc\$section"

if (-not (Test-Path -LiteralPath $source)) {
  throw "Source file not found: $source"
}

# 3. Read source JSON
$content = Get-Content -LiteralPath $source -Raw

# 4. Write it to all locales
foreach ($loc in $locales) {
  $target = Join-Path $root "$loc\$section"

  # backup existing
  if (Test-Path -LiteralPath $target) {
    $stamp  = Get-Date -Format "yyyyMMdd-HHmmss"
    $backup = "$target.bak.$stamp"
    Copy-Item -LiteralPath $target -Destination $backup -Force
    Write-Host "Backup -> $backup"
  }

  Set-Content -LiteralPath $target -Value $content -Encoding UTF8
  Write-Host "Synced $section from '$sourceLoc' to '$loc'"
}
