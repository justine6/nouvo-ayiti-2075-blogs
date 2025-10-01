param(
    [string]$Environment = "dev",
    [switch]$Quiet
)

$ErrorActionPreference = "Stop"
$errors = @()
$durations = @{}

function Run-Step {
    param(
        [string]$Label,
        [string]$Script,
        [string[]]$Args
    )

    $path = Join-Path -Path $PSScriptRoot -ChildPath $Script

    if (-Not (Test-Path $path)) {
        Write-Host "⚠️ Script not found: $path" -ForegroundColor Yellow
        $global:errors += "Missing: $Label ($Script)"
        return
    }

    $start = Get-Date
    try {
        Write-Host "➡️ [$Label] Starting at $start"
        pwsh -ExecutionPolicy Bypass -File $path @Args
        $end = Get-Date
        $duration = ($end - $start).TotalSeconds
        $durations[$Label] = $duration
        Write-Host "✅ [$Label] finished at $end (took $duration seconds)."
    }
    catch {
        $end = Get-Date
        $duration = ($end - $start).TotalSeconds
        $durations[$Label] = $duration
        Write-Host ("❌ Error in {0}: {1}" -f $Label, $_.Exception.Message) -ForegroundColor Red
        $global:errors += "$Label failed: $($_.Exception.Message)"
    }
}

Write-Host "🔄 Starting reset:quiet for environment: $Environment..."
$overallStart = Get-Date

Run-Step -Label "Reset Phase"    -Script "postreset.ps1"                -Args @("-Environment", $Environment, "-Quiet")
Run-Step -Label "Sync Phase"     -Script "sync-dicts.ps1"               -Args @("-Environment", $Environment, "-Quiet")
Run-Step -Label "Validate Phase" -Script "validate-and-repair-json.ps1" -Args @("-Environment", $Environment, "-Quiet")

$overallEnd = Get-Date
$totalDuration = ($overallEnd - $overallStart).TotalSeconds

if ($errors.Count -gt 0) {
    Write-Host "⚠️ Completed with errors:" -ForegroundColor Yellow
    $errors | ForEach-Object { Write-Host "   - $_" -ForegroundColor Red }
    $exitCode = 1
}
else {
    Write-Host "🎉 reset:quiet completed successfully." -ForegroundColor Green
    $exitCode = 0
}

# --- Final Summary ---
Write-Host "`n--- Phase Durations ---" -ForegroundColor Cyan
$summary = @()
$summary += "--- Reset Quiet Run Summary ---"
$summary += "Date/Time       : $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"
$summary += "Environment     : $Environment"
foreach ($key in $durations.Keys) {
    $line = "{0,-15} : {1:N2}s" -f $key, $durations[$key]
    $summary += $line
    Write-Host $line
}
$summary += "------------------------"
$summary += ("{0,-15} : {1:N2}s" -f "Total", $totalDuration)
Write-Host ("{0,-15} : {1:N2}s" -f "Total", $totalDuration)
$summary += ""

# --- Logging ---
$logDir = Join-Path -Path $PSScriptRoot -ChildPath "..\logs"
if (-not (Test-Path $logDir)) { New-Item -Path $logDir -ItemType Directory | Out-Null }

# Append to cumulative log
$logFile = Join-Path -Path $logDir -ChildPath "reset-summary.log"
$summary | Out-File -FilePath $logFile -Encoding utf8 -Append

# Create per-run log
$timestamp = Get-Date -Format "yyyyMMdd-HHmmss"
$runNumber = $env:GITHUB_RUN_NUMBER
if ([string]::IsNullOrWhiteSpace($runNumber)) {
    $runLogFile = Join-Path -Path $logDir -ChildPath "reset-summary-$timestamp.log"
    $artifactName = "reset-summary-logs-$Environment-local"
} else {
    $runLogFile = Join-Path -Path $logDir -ChildPath "reset-summary-run$runNumber-$timestamp.log"
    $artifactName = "reset-summary-logs-$Environment-run$runNumber"
}
$summary | Out-File -FilePath $runLogFile -Encoding utf8

Write-Host "`n📦 Artifact name for this run: $artifactName"
Write-Host "📝 Logs saved to: $runLogFile"

# Export for GitHub Actions
if ($env:GITHUB_OUTPUT) {
    "artifact_name=$artifactName" | Out-File -FilePath $env:GITHUB_OUTPUT -Encoding utf8 -Append
}
if ($env:GITHUB_ENV) {
    "ARTIFACT_NAME=$artifactName" | Out-File -FilePath $env:GITHUB_ENV -Encoding utf8 -Append
}

# --- Cleanup old logs (>30 days) ---
$daysToKeep = 30
$oldLogs = Get-ChildItem -Path $logDir -Filter "reset-summary-*.log" -File |
           Where-Object { $_.LastWriteTime -lt (Get-Date).AddDays(-$daysToKeep) }

$removedCount = 0
foreach ($log in $oldLogs) {
    try {
        Remove-Item $log.FullName -Force
        $removedCount++
        Write-Host "🧹 Removed old log: $($log.Name)"
    }
    catch {
        Write-Host "⚠️ Could not remove old log: $($log.Name) ($($_.Exception.Message))" -ForegroundColor Yellow
    }
}
Write-Host "🧹 Cleanup complete. Removed $removedCount old logs (>30 days)."

# Pause if running interactively
if ($Host.Name -eq "ConsoleHost") {
    Write-Host "`nPress ENTER to exit..."
    [void][System.Console]::ReadLine()
}

exit $exitCode
