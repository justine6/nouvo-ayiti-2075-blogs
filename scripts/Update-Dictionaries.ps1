param(
    [switch]$All,
    [string]$FileName,
    [string[]]$RequiredKeys,
    [switch]$DryRun,
    [switch]$Verbose   # ✅ New flag
)

# Ensure script can run even if ExecutionPolicy is restricted
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass -Force

# ===============================
# 1. Locate CSV (root first, then scripts/)
# ===============================
$csvPathRoot   = "dictionary_keys.csv"
$csvPathScript = "scripts\dictionary_keys.csv"

if (Test-Path $csvPathRoot) {
    $csvPath = $csvPathRoot
    if ($Verbose) { Write-Host "📄 Using CSV from root: $csvPath" -ForegroundColor Cyan }
} elseif (Test-Path $csvPathScript) {
    $csvPath = $csvPathScript
    if ($Verbose) { Write-Host "📄 Using CSV from scripts/: $csvPath" -ForegroundColor Cyan }
} else {
    Write-Host "⚠️ No CSV file found in root or scripts/. Exiting..." -ForegroundColor Red
    exit 1
}

# ===============================
# 2. Load CSV
# ===============================
$csv = Import-Csv $csvPath

# ===============================
# 3. Stats counters
# ===============================
$Patched = 0
$Created = 0
$Skipped = 0
$Errors  = 0

# ===============================
# 4. Decide which files to process
# ===============================
$filesToProcess = @()

if ($All) {
    $filesToProcess = $csv
} elseif ($FileName -and $RequiredKeys) {
    $filesToProcess = @(@{ file = $FileName; keys = ($RequiredKeys -join "|") })
} else {
    Write-Host "⚠️ Must specify -All OR -FileName with -RequiredKeys" -ForegroundColor Yellow
    exit 1
}

# ===============================
# 5. Process each dictionary file
# ===============================
$localeRoot = "dictionaries"
$locales = Get-ChildItem -Path $localeRoot -Directory | Select-Object -ExpandProperty Name

foreach ($row in $filesToProcess) {
    $fileName = $row.file
    $requiredKeys = $row.keys -split "\|"

    if ([string]::IsNullOrWhiteSpace($fileName)) {
        if ($Verbose) { Write-Host "⚠️ Skipping row because fileName is empty." -ForegroundColor Yellow }
        continue
    }

    foreach ($locale in $locales) {
        $path = Join-Path $localeRoot -ChildPath "$locale\$fileName"

        if ([string]::IsNullOrWhiteSpace($path)) {
            if ($Verbose) { Write-Host "⚠️ Skipping row because path is empty (file=$fileName, locale=$locale)" -ForegroundColor Yellow }
            continue
        }

        try {
            if (-not (Test-Path $path)) {
                Write-Host "⚠️ $path does not exist, creating..." -ForegroundColor Yellow
                $json = @{}
                $Created++
            } else {
                if ($Verbose) { Write-Host "📂 Loading existing file: $path" -ForegroundColor DarkGray }
                $json = Get-Content $path -Raw | ConvertFrom-Json
                if (-not $json) { $json = @{} }
            }

            $updated = $false

            foreach ($key in $requiredKeys) {
                if (-not ($json.PSObject.Properties.Name -contains $key)) {
                    if ($DryRun) {
                        Write-Host "[DryRun] Would add key '$key' to $path" -ForegroundColor Cyan
                    } else {
                        $json | Add-Member -NotePropertyName $key -NotePropertyValue "" -Force
                    }
                    $updated = $true
                } elseif ($Verbose) {
                    Write-Host "ℹ️ Key '$key' already exists in $path" -ForegroundColor DarkGray
                }
            }

            if ($updated -and -not $DryRun) {
                $json | ConvertTo-Json -Depth 10 | Set-Content $path -Encoding UTF8
                Write-Host "✅ Patched $path with required keys." -ForegroundColor Green
                $Patched++
            } elseif (-not $updated) {
                if ($Verbose) { Write-Host "➖ No changes needed for $path." -ForegroundColor DarkGray }
                $Skipped++
            }

        } catch {
            Write-Host ("❌ Error processing {0}: {1}" -f $path, $_.Exception.Message) -ForegroundColor Red
            $Errors++
        }
    }
}

# ===============================
# 6. Summary
# ===============================
Write-Host ""
Write-Host "===== Summary =====" -ForegroundColor Cyan
Write-Host " Patched : $Patched" -ForegroundColor Green
Write-Host " Created : $Created" -ForegroundColor Yellow
Write-Host " Skipped : $Skipped" -ForegroundColor DarkGray
if ($Errors -gt 0) {
    Write-Host " Errors  : $Errors" -ForegroundColor Red
} else {
    Write-Host " Errors  : $Errors" -ForegroundColor Green
}
Write-Host "===================" -ForegroundColor Cyan
