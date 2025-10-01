# scaffold-dicts.ps1

# Locales to scaffold
$locales = @("en", "fr", "ht", "es")

# Base path for dictionaries
$basePath = ".\lib\i18n\locales"

# Ensure base directories exist
foreach ($locale in $locales) {
    $localePath = Join-Path $basePath $locale
    if (-not (Test-Path $localePath)) {
        New-Item -ItemType Directory -Path $localePath | Out-Null
    }

    #  home.json (with topbar included)
    $homeDict = @{
        topbar = @{
            home     = "Home [$locale]"
            about    = "About [$locale]"
            projects = "Projects [$locale]"
            blog     = "Blog [$locale]"
            contact  = "Contact [$locale]"
            vision   = "Vision [$locale]"
            videos   = "Videos [$locale]"
            language = "Language [$locale]"
        }
        hero = @{
            title       = "Hero Title [$locale]"
            subtitle    = "Hero Subtitle [$locale]"
            readMore    = "Read More [$locale]"
            joinNow     = "Join Now [$locale]"
            watchVideos = "Watch Videos [$locale]"
            goToMain    = "Main Website [$locale]"
        }
        mission = @{
            heading   = "Our Mission [$locale]"
            paragraph = "Mission text placeholder [$locale]"
        }
        projects = @{
            title = "Our Projects [$locale]"
            intro = "Projects intro [$locale]"
            motto = "Projects motto [$locale]"
            items = @(@{ title = "Sample Project"; description = "Description"; category = "general" })
        }
        newsletter = @{
            title       = "Stay Connected [$locale]"
            description = "Subscribe for updates [$locale]"
        }
        contact = @{
            heading     = "Contact Us [$locale]"
            description = "Reach us anytime [$locale]"
            placeholder = "Type your message [$locale]"
            cta         = "Send [$locale]"
            success     = "Message sent! [$locale]"
        }
        footer = @{
            copyright = " 2025 Nouvo Ayiti [$locale]"
            poweredBy = "Powered by Team 2075 [$locale]"
        }
        blogPreview = @{
            title    = "More Stories [$locale]"
            subtitle = "Latest blog previews [$locale]"
            readMore = "Read More [$locale]"
        }
        blogSection = @{
            title           = "Our Blog [$locale]"
            paragraph       = "Stories and updates [$locale]"
            cta             = "Explore Blog [$locale]"
            readMore        = "Read More [$locale]"
            fallbackNotice  = "No blogs available [$locale]"
            blogUnavailable = "Blog currently unavailable [$locale]"
        }
    }

    # Write home.json
    $homeDict | ConvertTo-Json -Depth 10 | Out-File -Encoding utf8 (Join-Path $localePath "home.json")
}
