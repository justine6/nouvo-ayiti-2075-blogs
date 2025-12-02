Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

$root = (Get-Location).Path

# All images under public/images
$publicImages = Get-ChildItem -Recurse -File "public/images" |
  ForEach-Object {
    $_.FullName.Replace($root, "").Replace("\", "/")
  }

Write-Host "Found $($publicImages.Count) images under /public/images`n"

# Adjust this path to your posts folder if needed
$postsDir = "content/posts"

Get-ChildItem -Recurse -File $postsDir -Include *.md,*.mdx |
  ForEach-Object {
    $file = $_.FullName
    $content = Get-Content -Raw $file

    # Very simple grep for /images/... strings
    $matches = [regex]::Matches($content, "/images/[^')\"" ]+")
    if ($matches.Count -gt 0) {
      foreach ($m in $matches) {
        $path = $m.Value
        $full = (Join-Path $root ("public" + $path)) -replace "\\", "/"
        if (-not (Test-Path -LiteralPath $full)) {
          Write-Warning "$file -> Missing image: $path"
        }
      }
    }
  }
