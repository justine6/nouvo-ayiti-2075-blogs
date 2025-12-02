Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

# Sections we want to keep in sync from FR
$sections = @(
  "topbar.json",
  "home.json",
  "blog.json",
  "projects.json",
  "about.json",
  "vision.json",
  "contact.json"
)

# Locales to receive the content
$locales   = @("en", "fr", "ht", "es")
$sourceLoc = "fr"

$root = Join-Path (Get-Location) "dictionaries"

foreach ($section in $sections) {
  $source = Join-Path $root "$sourceLoc\$section"

  if (-not (Test-Path -LiteralPath $source)) {
    Write-Warning "Skipping $section because source file not found: $source"
    continue
  }

  $content = Get-Content -LiteralPath $source -Raw

  foreach ($loc in $locales) {
    $target = Join-Path $root "$loc\$section"

    if (Test-Path -LiteralPath $target) {
      $stamp  = Get-Date -Format "yyyyMMdd-HHmmss"
      $backup = "$target.bak.$stamp"
      Copy-Item -LiteralPath $target -Destination $backup -Force
      Write-Host "Backup -> $backup"
    }

    # Write FR content into each locale's section file
    Set-Content -LiteralPath $target -Value $content -Encoding UTF8
    Write-Host "Synced $section from '$sourceLoc' to '$loc'"
  }
}
