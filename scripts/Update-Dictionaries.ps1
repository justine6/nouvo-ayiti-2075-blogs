# ================================================
# Update-Dictionaries.ps1
# Launcher for Full / Incremental updates
# ================================================

Write-Host "===============================================" -ForegroundColor Cyan
Write-Host " Nouvo Ayiti 2075 – Dictionary Update " -ForegroundColor Cyan
Write-Host "===============================================" -ForegroundColor Cyan
Write-Host "1. Full Update (overwrite all metadata)"
Write-Host "2. Incremental Update (fill only missing metadata)"
Write-Host ""

$choice = Read-Host "Enter your choice (1 or 2)"

switch ($choice) {
    "1" {
        Write-Host "📝 Running FULL metadata update..." -ForegroundColor Yellow
        & "$PSScriptRoot\Update-Dictionaries-Full.ps1"
    }
    "2" {
        Write-Host "📝 Running INCREMENTAL metadata update..." -ForegroundColor Yellow
        & "$PSScriptRoot\Update-Dictionaries-Incremental.ps1"
    }
    default {
        Write-Host "❌ Invalid choice. Please run again and enter 1 or 2." -ForegroundColor Red
        exit 1
    }
}

# --- AUTO VALIDATION ---
Write-Host "===============================================" -ForegroundColor Cyan
Write-Host " 🔍 Running metadata validation..." -ForegroundColor Cyan

npm run merge-dicts
npm run check-meta

Write-Host "✅ Update + validation completed!" -ForegroundColor Green
