# validate-json.ps1
# Scans all JSON files in ./lib/i18n/locales and reports syntax errors

$basePath = ".\lib\i18n\locales"
$jsonFiles = Get-ChildItem -Path $basePath -Recurse -Filter *.json

Write-Host "`n=== JSON Validation Report ===`n" -ForegroundColor Cyan

foreach ($file in $jsonFiles) {
    try {
        $content = Get-Content $file.FullName -Raw
        if (-not [string]::IsNullOrWhiteSpace($content)) {
            $null = $content | ConvertFrom-Json -ErrorAction Stop
            Write-Host "✅ Valid JSON: $($file.FullName)" -ForegroundColor Green
        }
        else {
            Write-Host "⚠ Empty file: $($file.FullName)" -ForegroundColor Yellow
        }
    }
    catch {
        Write-Host "❌ Invalid JSON: $($file.FullName)" -ForegroundColor Red
        Write-Host "   → $($_.Exception.Message)" -ForegroundColor DarkYellow
    }
}

Write-Host "`n=== Validation Complete ===" -ForegroundColor Cyan
