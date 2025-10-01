$created = 0
$updated = 0
$skipped = 0

foreach ($file in $files) {
    $sourcePath = Join-Path (Join-Path $basePath "en") $file

    if (Test-Path $sourcePath) {
        $sourceJson = Get-Content $sourcePath -Raw | ConvertFrom-Json
    }
    else {
        Write-Host "⚠️ Source $file missing, creating empty {}"
        "{}" | Set-Content $sourcePath -Encoding UTF8
        $sourceJson = @{} | ConvertFrom-Json
        $created++
    }

    foreach ($locale in $locales) {
        $targetPath = Join-Path (Join-Path $basePath $locale) $file

        if (Test-Path $targetPath) {
            $targetJson = Get-Content $targetPath -Raw | ConvertFrom-Json
            $before = ($targetJson | ConvertTo-Json -Depth 10)

            # Merge recursively
            Merge-Json -target $targetJson -source $sourceJson

            $after = ($targetJson | ConvertTo-Json -Depth 10)
            if ($before -ne $after) {
                $targetJson | ConvertTo-Json -Depth 10 | Set-Content $targetPath -Encoding UTF8
                Write-Host "💾 Updated $locale/$file with missing keys (nested too)"
                $updated++
            }
            else {
                Write-Host "⚠️ $locale/$file already has all keys (including nested)"
                $skipped++
            }
        }
        else {
            $sourceJson | ConvertTo-Json -Depth 10 | Set-Content $targetPath -Encoding UTF8
            Write-Host "🆕 Created $locale/$file from source (en)"
            $created++
        }
    }
}

Write-Host "`n=== Sync Summary ==="
Write-Host "🆕 Created: $created"
Write-Host "💾 Updated: $updated"
Write-Host "⚠️ Skipped: $skipped"
