Write-Host " Post-reset reporting..." -ForegroundColor Cyan

# Ensure logs folder exists
if (-not (Test-Path ".\logs")) {
    New-Item -ItemType Directory -Path ".\logs" | Out-Null
}

$timestamp = Get-Date -Format "yyyy-MM-dd_HH-mm-ss"
$logFile = ".\logs\postreset-$timestamp.txt"

# Placeholder for reporting logic
"Postreset completed at $timestamp" | Out-File $logFile -Encoding UTF8

Write-Host " Results logged to $logFile" -ForegroundColor Green
Write-Host "`n--- Last log output ---" -ForegroundColor Yellow
Get-Content $logFile | Select-Object -Last 5
