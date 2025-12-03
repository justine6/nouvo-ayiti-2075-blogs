Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

Write-Host "☑ Sync from EN..." -ForegroundColor Cyan

$root     = (Get-Location).Path
$dictRoot = Join-Path $root "dictionaries"

# ✅ real filenames under dictionaries/en
$baseFiles = @(
  "home.json",
  "blog.json",
  "projects.json",
  "contact.json",
  "vision.json"
)

# Locales that should follow EN
$locales = @("fr", "ht", "es")

foreach ($fileName in $baseFiles) {
    $enPath = Join-Path (Join-Path $dictRoot "en") $fileName

    if (!(Test-Path -LiteralPath $enPath)) {
        Write-Warning "Skipping $fileName – source EN file not found at $enPath"
        continue
    }

    $enJson = Get-Content -LiteralPath $enPath -Raw | ConvertFrom-Json

    foreach ($loc in $locales) {
        $locPath = Join-Path (Join-Path $dictRoot $loc) $fileName

        if (!(Test-Path -LiteralPath $locPath)) {
            Write-Warning "Creating shell for $locPath (based on EN shape)"
            $enJson | ConvertTo-Json -Depth 10 | Set-Content -LiteralPath $locPath -Encoding UTF8
            continue
        }

        $target = Get-Content -LiteralPath $locPath -Raw | ConvertFrom-Json

        # Add any missing keys from EN into the target locale
        foreach ($prop in $enJson.PSObject.Properties.Name) {
            if (-not ($target.PSObject.Properties.Name -contains $prop)) {
                $target | Add-Member -NotePropertyName $prop -NotePropertyValue $enJson.$prop
            }
        }

        $target | ConvertTo-Json -Depth 10 | Set-Content -LiteralPath $locPath -Encoding UTF8
        Write-Host "  ✓ synced $fileName for $loc"
    }
}

Write-Host "✅ Sync from EN complete." -ForegroundColor Green
