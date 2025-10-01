Write-Host "Running fix-footer..." -ForegroundColor Cyan

$locales = @("en","fr","ht","es")
$requiredKeys = @("title","description","contact","rights")

foreach ($locale in $locales) {
    $file = "dictionaries/$locale.json"

    if (-Not (Test-Path $file)) {
        Write-Host "Missing file: $file" -ForegroundColor Yellow
        continue
    }

    $json = Get-Content $file -Raw | ConvertFrom-Json
    $footer = $json.footer
    $patched = $false

    foreach ($key in $requiredKeys) {
        if (-not $footer.PSObject.Properties[$key]) {
            Write-Host "[$locale] Adding missing footer key: $key"
            $footer | Add-Member -NotePropertyName $key -NotePropertyValue "TODO: translate" -Force
            $patched = $true
        }
    }

    if ($patched) {
        $json | ConvertTo-Json -Depth 10 | Set-Content $file -Encoding UTF8
        Write-Host "$locale.json footer patched." -ForegroundColor Green
    }
    else {
        Write-Host "$locale.json footer already in sync." -ForegroundColor Green
    }
}

Write-Host "fix-footer completed." -ForegroundColor Cyan
