param (
    [switch]$strict
)

Write-Host "🚀 Starting CI Validation..." -ForegroundColor Cyan

# Step 1: Run patch-missing
Write-Host "`n▶ Running patch-missing..." -ForegroundColor Yellow
powershell -ExecutionPolicy Bypass -File scripts\patch-missing.ps1
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }

# Step 2: Run fix-footer
Write-Host "`n▶ Running fix-footer..." -ForegroundColor Yellow
powershell -ExecutionPolicy Bypass -File scripts\fix-footer.ps1
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }

# Step 3: Run check-all (strict if requested)
if ($strict) {
    Write-Host "`n▶ Running check-all:strict..." -ForegroundColor Yellow
    npm run check-all:strict
} else {
    Write-Host "`n▶ Running check-all..." -ForegroundColor Yellow
    npm run check-all
}
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }

# Step 4: Run lint
Write-Host "`n▶ Running lint..." -ForegroundColor Yellow
npm run lint
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }

# Step 5: Run tests with coverage
Write-Host "`n▶ Running tests with coverage..." -ForegroundColor Yellow
npm run coverage:strict
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }

Write-Host "`n✅ CI Validation Completed Successfully!" -ForegroundColor Green
