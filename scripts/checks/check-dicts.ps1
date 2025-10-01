# Validates dictionary files, auto-fills missing nested keys with placeholder values,
# scaffolds missing files, and logs summary to both console + log file + CSV.
# Reports per-locale stats with percentage completion, overall progress, and maintains a trend log.

$locales = @("en", "fr", "ht", "es")
$files   = @("home.json", "about.json", "projects.json", "join.json", "vision.json", "videos.json", "blog.json")

$basePath = ".\lib\i18n\locales"
$logDir   = ".\logs"
$timestamp = Get-Date -Format "yyyy-MM-dd_HH-mm-ss"
$logFile  = Join-Path $logDir ("check-dicts-summary_$timestamp.txt")
$csvFile  = Join-Path $logDir ("check-dicts-summary_$timestamp.csv")
$trendFile = Join-Path $logDir "check-dicts-trend.csv"

# Ensure log directory exists
if (-not (Test-Path $logDir)) {
    New-Item -ItemType Directory -Force -Path $logDir | Out-Null
}

# Required nested keys for each file
$requiredKeys = @{
    "home.json"     = @("topbar.home","topbar.about","hero.title","hero.subtitle","mission.heading","projects.title","newsletter.title","contact.heading","footer.text")
    "about.json"    = @("title","intro","team")
    "projects.json" = @("title","intro","items")
    "join.json"     = @("form.name","form.email","form.message","title","intro")
    "vision.json"   = @("title","intro","content")
    "videos.json"   = @("title","intro","items")
    "blog.json"     = @("title","readMore")
}

function New-ScaffoldJson {
    param([string[]]$keys)
    $json = @{} | ConvertTo-Json | ConvertFrom-Json
    foreach ($key in $keys) { Add-NestedKey -json ([ref]$json) -path $key }
    return $json
}

function Test-NestedKey {
    param([object]$json,[string]$path)
    $parts = $path -split '\.'
    $current = $json
    foreach ($part in $parts) {
        if ($null -eq $current -or -not ($current.PSObject.Properties.Name -contains $part)) { return $false }
        $current = $current.$part
    }
    return $true
}

function Add-NestedKey {
    param([ref]$json,[string]$path)
    $parts = $path -split '\.'
    $current = $json.Value
    for ($i=0; $i -lt $parts.Length; $i++) {
        $part = $parts[$i]
        if (-not ($current.PSObject.Properties.Name -contains $part)) {
            if ($i -eq $parts.Length - 1) {
                $current | Add-Member -NotePropertyName $part -NotePropertyValue "TODO: translate"
            } else {
                $obj = @{} | ConvertTo-Json | ConvertFrom-Json
                $current | Add-Member -NotePropertyName $part -NotePropertyValue $obj
            }
        }
        $current = $current.$part
    }
}

# --- Counters ---
$createdCount = 0
$updatedCount = 0
$okCount      = 0
$localeStats  = @{}
$totalKeysAll = 0
$foundKeysAll = 0
$csvData      = @()

# Collect messages for logging
$logMessages = @()
function Log-Result { param([string]$message,[string]$color)
    Write-Host $message -ForegroundColor $color
    $logMessages += $message
}

Log-Result "🌍 Checking dictionaries and scaffolding missing files..." "Cyan"

foreach ($locale in $locales) {
    Log-Result "`n🔎 Locale: $locale" "Yellow"
    $localeCreated = 0; $localeUpdated = 0; $localeOK = 0
    $localeTotalKeys = 0; $localeFoundKeys = 0

    foreach ($file in $files) {
        $path = Join-Path (Join-Path $basePath $locale) $file
        $fileChanged = $false
        $expectedKeys = $requiredKeys[$file]
        $localeTotalKeys += $expectedKeys.Count
        $totalKeysAll   += $expectedKeys.Count

        if (-not (Test-Path $path)) {
            Log-Result "📄 Missing file: $file → creating scaffold..." "Red"
            $json = New-ScaffoldJson -keys $expectedKeys
            $json | ConvertTo-Json -Depth 10 | Set-Content $path -Encoding UTF8
            $createdCount++; $localeCreated++
            continue
        }

        $content = Get-Content $path -Raw
        if ([string]::IsNullOrWhiteSpace($content)) {
            Log-Result "⚠️ Empty file: $file → initializing scaffold..." "DarkYellow"
            $json = New-ScaffoldJson -keys $expectedKeys
            $fileChanged = $true
        } else {
            try { $json = $content | ConvertFrom-Json -ErrorAction Stop }
            catch {
                Log-Result "❌ Invalid JSON in $file — replacing with scaffold" "Red"
                $json = New-ScaffoldJson -keys $expectedKeys
                $fileChanged = $true
            }
        }

        $missingKeys = @()
        foreach ($key in $expectedKeys) {
            if (Test-NestedKey -json $json -path $key) {
                $localeFoundKeys++; $foundKeysAll++
            } else {
                $missingKeys += $key
                Add-NestedKey -json ([ref]$json) -path $key
                $fileChanged = $true
            }
        }

        if ($fileChanged) {
            if ($missingKeys.Count -gt 0) {
                Log-Result "⚠️ $file added missing keys: $($missingKeys -join ', ')" "DarkYellow"
            }
            $json | ConvertTo-Json -Depth 10 | Set-Content $path -Encoding UTF8
            $updatedCount++; $localeUpdated++
        } else {
            Log-Result "✅ $file OK (all keys present)" "Green"
            $okCount++; $localeOK++
        }
    }

$completion = if ($localeTotalKeys -gt 0) { 
    [math]::Round(($localeFoundKeys / $localeTotalKeys) * 100, 2) 
} else { 0 }

$localeStats[$locale] = @{
    Created    = $localeCreated
    Updated    = $localeUpdated
    OK         = $localeOK
    TotalKeys  = $localeTotalKeys
    FoundKeys  = $localeFoundKeys
    Completion = $completion
}

    # Add to CSV data
    $csvData += [PSCustomObject]@{
        Locale     = $locale
        Created    = $localeCreated
        Updated    = $localeUpdated
        OK         = $localeOK
        TotalKeys  = $localeTotalKeys
        FoundKeys  = $localeFoundKeys
        Completion = "$completion%"
    }
}

# --- Summary Report ---
$summary = @()
$summary += "`n📊 Summary Report:"
$summary += "   ✅ OK files     : $okCount"
$summary += "   ⚠️ Updated files: $updatedCount"
$summary += "   📄 Created files: $createdCount"
$summary += ""
$summary += "📍 Per-locale breakdown:"
foreach ($locale in $localeStats.Keys) {
    $s = $localeStats[$locale]
    $summary += "   $locale → OK: $($s.OK), Updated: $($s.Updated), Created: $($s.Created), Completion: $($s.Completion)%"
}

$worst = $localeStats.GetEnumerator() | Sort-Object { $_.Value.Completion } | Select-Object -First 1
if ($worst.Value.Completion -lt 100) {
    $summary += ""
    $summary += "⚠️ Locale lagging most: $($worst.Key) (Completion: $($worst.Value.Completion)%)"
}

# --- Summary Report ---
$summary = @()
$summary += "`n📊 Summary Report:"
$summary += "   ✅ OK files     : $okCount"
$summary += "   ⚠️ Updated files: $updatedCount"
$summary += "   📄 Created files: $createdCount"
$summary += ""
$summary += "📍 Per-locale breakdown:"
foreach ($locale in $localeStats.Keys) {
    $s = $localeStats[$locale]
    $summary += "   $locale → OK: $($s.OK), Updated: $($s.Updated), Created: $($s.Created), Completion: $($s.Completion)%"
}

$worst = $localeStats.GetEnumerator() | Sort-Object { $_.Value.Completion } | Select-Object -First 1
if ($worst.Value.Completion -lt 100) {
    $summary += ""
    $summary += "⚠️ Locale lagging most: $($worst.Key) (Completion: $($worst.Value.Completion)%)"
}

# Calculate overall completion ONCE here
$overallCompletion = if ($totalKeysAll -gt 0) {
    [math]::Round(($foundKeysAll / $totalKeysAll) * 100, 2)
} else { 0 }

$summary += ""
$summary += "🌐 Overall project completion: $overallCompletion%"

# Print summary to console
Log-Result ("`n" + ($summary -join "`n")) "Cyan"

# Save log + CSV (per-run summary)
$logMessages | Out-File -FilePath $logFile -Encoding UTF8
$csvData | Export-Csv -Path $csvFile -NoTypeInformation -Encoding UTF8

# --- Trend Log (append overall completion per run) ---
$trendEntry = [PSCustomObject]@{
    DateTime          = (Get-Date -Format "yyyy-MM-dd HH:mm:ss")
    OverallCompletion = "$overallCompletion%"
}

if (-not (Test-Path $trendFile)) {
    $trendEntry | Export-Csv -Path $trendFile -NoTypeInformation -Encoding UTF8
} else {
    $trendEntry | Export-Csv -Path $trendFile -NoTypeInformation -Append -Encoding UTF8
}

# Resolve absolute path for clickable logs
$logFileFull = (Resolve-Path $logFile).Path

# === Export stats for npm summary (with log path) ===
$stats = @{
    Created      = $created
    Updated      = $updated
    Skipped      = $skipped
    CreatedFiles = $createdFiles
    UpdatedFiles = $updatedFiles
    SkippedFiles = $skippedFiles
    Locales      = $localeStats
    LogFile      = $logFileFull
}
$stats | ConvertTo-Json -Depth 10 | Set-Content "./scripts/sync-stats.json" -Encoding UTF8
