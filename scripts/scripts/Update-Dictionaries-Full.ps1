Write-Host "🚀 Starting FULL metadata update..." -ForegroundColor Yellow

# Merge all dictionary files (overwrite all metadata)
npm run merge-dicts

# Validate metadata after merge
npm run check-meta

Write-Host "✅ Full metadata update + validation completed!" -ForegroundColor Green
