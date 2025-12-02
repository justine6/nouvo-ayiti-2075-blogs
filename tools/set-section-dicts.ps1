Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

# Root dictionaries folder
$root     = (Get-Location).Path
$dictRoot = Join-Path $root "dictionaries"

# Locales we support
$locales = @("en","fr","ht","es")

function Ensure-LocaleDir {
    param(
        [string] $locale
    )

    $dir = Join-Path $dictRoot $locale

    if (-not (Test-Path -LiteralPath $dir)) {
        New-Item -ItemType Directory -Path $dir | Out-Null
        Write-Host "Created -> $dir"
    }

    return $dir
}

function Write-JsonWithBackup {
    param(
        [Parameter(Mandatory = $true)] [string] $path,
        [Parameter(Mandatory = $true)] [string] $content
    )

    if (Test-Path -LiteralPath $path) {
        $stamp = Get-Date -Format "yyyyMMdd-HHmmss"
        $backup = "$path.bak.$stamp"
        Copy-Item -LiteralPath $path -Destination $backup -Force
        Write-Host "Backup -> $backup"
    }

    $content | Set-Content -LiteralPath $path -Encoding UTF8
    Write-Host "Wrote  -> $path"
}

# ---------------------------
# ABOUT
# ---------------------------

$about = @{
  en = @'
{
  "title": "About Nouvo Ayiti 2075",
  "intro": "Nouvo Ayiti 2075 is a people-first movement to restore dignity, rebuild hope, and renew long-term vision for Haiti.",
  "metaTitle": "About - Nouvo Ayiti 2075",
  "metaDescription": "Learn more about the Nouvo Ayiti 2075 movement, our mission and our long-term vision for Haiti."
}
'@

  fr = @'
{
  "title": "À propos de Nouvo Ayiti 2075",
  "intro": "Nouvo Ayiti 2075 est un mouvement centré sur les personnes, dédié à restaurer la dignité, reconstruire l’espoir et renouveler la vision à long terme pour Haïti.",
  "metaTitle": "À propos - Nouvo Ayiti 2075",
  "metaDescription": "Découvrez le mouvement Nouvo Ayiti 2075, notre mission et notre vision à long terme pour Haïti."
}
'@

  ht = @'
{
  "title": "Sou nou",
  "intro": "Nouvo Ayiti 2075 se yon mouvman ki mete moun an premye, ki vize retabli diyite, rebati espwa epi renouvle vizyon Ayiti a pou long tèm.",
  "metaTitle": "Sou nou - Nouvo Ayiti 2075",
  "metaDescription": "Aprann plis sou mouvman Nouvo Ayiti 2075, misyon nou ak vizyon nou pou retabli diyite ak espwa nan Ayiti."
}
'@

  es = @'
{
  "title": "Sobre Nouvo Ayiti 2075",
  "intro": "Nouvo Ayiti 2075 es un movimiento centrado en las personas para restaurar la dignidad, reconstruir la esperanza y renovar la visión a largo plazo para Haití.",
  "metaTitle": "Sobre nosotros - Nouvo Ayiti 2075",
  "metaDescription": "Conozca el movimiento Nouvo Ayiti 2075, nuestra misión y nuestra visión para el futuro de Haití."
}
'@
}

# ---------------------------
# PROJECTS
# ---------------------------

$projects = @{
  en = @'
{
  "title": "Our Projects",
  "subtitle": "Each project is a promise to the future of Haiti.",
  "metaTitle": "Projects - Nouvo Ayiti 2075",
  "metaDescription": "Explore Nouvo Ayiti 2075 projects focused on dignity, hope, and long-term restoration in Haiti."
}
'@
  fr = @'
{
  "title": "Nos Projets",
  "subtitle": "Chaque projet est une promesse pour l’avenir d’Haïti.",
  "metaTitle": "Projets - Nouvo Ayiti 2075",
  "metaDescription": "Découvrez les projets de Nouvo Ayiti 2075 dédiés à la dignité, à l’espérance et à la reconstruction durable en Haïti."
}
'@
  ht = @'
{
  "title": "Pwojè nou yo",
  "subtitle": "Chak pwojè se yon pwomès pou lavni Ayiti.",
  "metaTitle": "Pwojè - Nouvo Ayiti 2075",
  "metaDescription": "Dekouvri pwojè Nouvo Ayiti 2075 ki konsantre sou diyite, espwa ak rekonstriksyon dirab nan Ayiti."
}
'@
  es = @'
{
  "title": "Nuestros proyectos",
  "subtitle": "Cada proyecto es una promesa para el futuro de Haití.",
  "metaTitle": "Proyectos - Nouvo Ayiti 2075",
  "metaDescription": "Explore los proyectos de Nouvo Ayiti 2075 dedicados a la dignidad, la esperanza y la reconstrucción a largo plazo en Haití."
}
'@
}

# ---------------------------
# VISION
# ---------------------------

$vision = @{
  en = @'
{
  "title": "Our Vision",
  "intro": "A Haiti where every person can live with dignity, peace, and real opportunity.",
  "points": [
    "Restore dignity through justice, infrastructure, and basic services.",
    "Rebuild hope through education, work, and community leadership.",
    "Renew long-term vision by empowering Haitians to design and own their future."
  ],
  "metaTitle": "Vision - Nouvo Ayiti 2075",
  "metaDescription": "The long-term vision of Nouvo Ayiti 2075 for a dignified, peaceful, and flourishing Haiti."
}
'@
  fr = @'
{
  "title": "Notre Vision",
  "intro": "Une Haïti où chaque personne peut vivre avec dignité, paix et de vraies opportunités.",
  "points": [
    "Restaurer la dignité par la justice, l’infrastructure et les services de base.",
    "Reconstruire l’espérance par l’éducation, le travail et le leadership communautaire.",
    "Renouveler la vision à long terme en donnant aux Haïtiens les moyens de concevoir et de porter leur propre avenir."
  ],
  "metaTitle": "Vision - Nouvo Ayiti 2075",
  "metaDescription": "La vision à long terme de Nouvo Ayiti 2075 pour une Haïti digne, paisible et florissante."
}
'@
  ht = @'
{
  "title": "Vizyon nou",
  "intro": "Yon Ayiti kote chak moun ka viv ak diyite, lapè ak vrè opòtinite.",
  "points": [
    "Retabli diyite atravè jistis, enfrastrikti ak sèvis esansyèl yo.",
    "Rebati espwa atravè edikasyon, travay ak lidèchip kominotè.",
    "Renouvle vizyon alontèm lè nou bay Ayisyen pouvwa pou yo desine epi pote pwòp lavni yo."
  ],
  "metaTitle": "Vizyon - Nouvo Ayiti 2075",
  "metaDescription": "Vizyon alontèm Nouvo Ayiti 2075 pou yon Ayiti ki gen diyite, ki anpè ak ki pwospere."
}
'@
  es = @'
{
  "title": "Nuestra visión",
  "intro": "Una Haití donde cada persona pueda vivir con dignidad, paz y oportunidades reales.",
  "points": [
    "Restaurar la dignidad mediante la justicia, la infraestructura y los servicios básicos.",
    "Reconstruir la esperanza con educación, empleo y liderazgo comunitario.",
    "Renovar la visión a largo plazo empoderando a los haitianos para que diseñen y posean su propio futuro."
  ],
  "metaTitle": "Visión - Nouvo Ayiti 2075",
  "metaDescription": "La visión a largo plazo de Nouvo Ayiti 2075 para una Haití digna, pacífica y próspera."
}
'@
}

# ---------------------------
# CONTACT
# ---------------------------

$contact = @{
  en = @'
{
  "title": "Contact us",
  "intro": "Reach out to the Nouvo Ayiti 2075 movement for collaboration, questions, or support.",
  "addressLabel": "Address",
  "emailLabel": "Email",
  "phoneLabel": "Phone",
  "footerNote": "We look forward to hearing from you."
}
'@
  fr = @'
{
  "title": "Contactez-nous",
  "intro": "Contactez le mouvement Nouvo Ayiti 2075 pour toute collaboration, question ou soutien.",
  "addressLabel": "Adresse",
  "emailLabel": "E-mail",
  "phoneLabel": "Téléphone",
  "footerNote": "Nous serons heureux d’avoir de vos nouvelles."
}
'@
  ht = @'
{
  "title": "Kontakte nou",
  "intro": "Antre an kontak ak mouvman Nouvo Ayiti 2075 pou kolaborasyon, kesyon oswa sipò.",
  "addressLabel": "Adrès",
  "emailLabel": "Imèl",
  "phoneLabel": "Telefòn",
  "footerNote": "N ap kontan tande nouvèl ou."
}
'@
  es = @'
{
  "title": "Contáctanos",
  "intro": "Comunícate con el movimiento Nouvo Ayiti 2075 para colaborar, hacer preguntas o brindar apoyo.",
  "addressLabel": "Dirección",
  "emailLabel": "Correo electrónico",
  "phoneLabel": "Teléfono",
  "footerNote": "Esperamos saber de ti pronto."
}
'@
}

# ---------------------------
# TOPBAR
# ---------------------------

$topbar = @{
  en = @'
{
  "topbar": {
    "brandName": "Nouvo Ayiti 2075",
    "tagline": "Restoring dignity. Rebuilding hope.",
    "links": {
      "home": "Home",
      "about": "About",
      "projects": "Projects",
      "blog": "Blog",
      "vision": "Vision",
      "videos": "Vision Videos",
      "contact": "Contact",
      "join": "Join the Movement"
    },
    "languageLabel": "Language",
    "openMenuLabel": "Open navigation menu",
    "closeMenuLabel": "Close navigation menu"
  }
}
'@
  fr = @'
{
  "topbar": {
    "brandName": "Nouvo Ayiti 2075",
    "tagline": "Restaurer la dignité. Rebâtir l’espérance.",
    "links": {
      "home": "Accueil",
      "about": "À propos",
      "projects": "Projets",
      "blog": "Blog",
      "vision": "Vision",
      "videos": "Vidéos de la vision",
      "contact": "Contact",
      "join": "Rejoindre le mouvement"
    },
    "languageLabel": "Langue",
    "openMenuLabel": "Ouvrir le menu de navigation",
    "closeMenuLabel": "Fermer le menu de navigation"
  }
}
'@
  ht = @'
{
  "topbar": {
    "brandName": "Nouvo Ayiti 2075",
    "tagline": "Retabli diyite. Rebati espwa.",
    "links": {
      "home": "Akèy",
      "about": "Sou nou",
      "projects": "Pwojè",
      "blog": "Blòg",
      "vision": "Vizyon",
      "videos": "Videyo vizyon an",
      "contact": "Kontak",
      "join": "Antre nan mouvman an"
    },
    "languageLabel": "Lang",
    "openMenuLabel": "Louvri meni navigasyon an",
    "closeMenuLabel": "Fèmen meni navigasyon an"
  }
}
'@
  es = @'
{
  "topbar": {
    "brandName": "Nouvo Ayiti 2075",
    "tagline": "Restaurar la dignidad. Reconstruir la esperanza.",
    "links": {
      "home": "Inicio",
      "about": "Acerca de",
      "projects": "Proyectos",
      "blog": "Blog",
      "vision": "Visión",
      "videos": "Videos de la visión",
      "contact": "Contacto",
      "join": "Únete al movimiento"
    },
    "languageLabel": "Idioma",
    "openMenuLabel": "Abrir menú de navegación",
    "closeMenuLabel": "Cerrar menú de navegación"
  }
}
'@
}

# ---------------------------
# WRITE ALL FILES
# ---------------------------

foreach ($locale in $locales) {
    $dir = Ensure-LocaleDir -locale $locale

    Write-JsonWithBackup -path (Join-Path $dir "about.json")   -content $about[$locale]
    Write-JsonWithBackup -path (Join-Path $dir "projects.json") -content $projects[$locale]
    Write-JsonWithBackup -path (Join-Path $dir "vision.json")   -content $vision[$locale]
    Write-JsonWithBackup -path (Join-Path $dir "contact.json")  -content $contact[$locale]
    Write-JsonWithBackup -path (Join-Path $dir "topbar.json")   -content $topbar[$locale]
}

Write-Host "✅ Finished updating about/projects/vision/contact/topbar for en, fr, ht, es." -ForegroundColor Cyan
