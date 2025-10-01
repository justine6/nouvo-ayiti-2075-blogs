Write-Host " Syncing dictionaries across locales..." -ForegroundColor Cyan

# Ensure logs folder exists
if (-not (Test-Path ".\logs")) {
    New-Item -ItemType Directory -Path ".\logs" | Out-Null
}

$timestamp = Get-Date -Format "yyyy-MM-dd_HH-mm-ss"
$logFile = ".\logs\sync-$timestamp.txt"

# Placeholder for sync logic
"Sync run at $timestamp" | Out-File $logFile -Encoding UTF8

Write-Host " Results logged to $logFile" -ForegroundColor Green
Write-Host "`n--- Last log output ---" -ForegroundColor Yellow
Get-Content $logFile | Select-Object -Last 5
