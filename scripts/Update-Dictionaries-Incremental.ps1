Write-Host "🔄 Starting INCREMENTAL metadata update..." -ForegroundColor Yellow

# Merge only missing fields (incremental update)
npm run patch-dicts

# Validate metadata after patch
npm run check-meta

Write-Host "✅ Incremental metadata update + validation completed!" -ForegroundColor Green
