Write-Host "Running patch-missing..." -ForegroundColor Cyan

try {
    # Reuse dictionary checker in patch mode
    powershell -ExecutionPolicy Bypass -File ./scripts/check-dictionaries.ps1 -patch
    Write-Host "patch-missing completed successfully." -ForegroundColor Green
}
catch {
    Write-Host "patch-missing failed: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}
