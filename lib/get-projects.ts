// app/lib/get-projects.ts

// We keep this file as simple JS so Webpack/SWC is happy.
// No `interface`, no type annotations.

const projectsByLocale = {
  en: [
    {
      slug: "clean-water-at-the-first-mile",
      title: "Clean Water at the First Mile",
      summary:
        "Pilots, constraints, and lessons from bringing safe drinking water closer to communities.",
    },
    {
      slug: "infrastructure-and-dignity",
      title: "Infrastructure and Dignity",
      summary:
        "Why roads, bridges, public spaces, and digital access are treated as dignity projects, not just construction work.",
    },
    {
      slug: "healthcare-and-trust",
      title: "Healthcare and Trust",
      summary:
        "What it means to rebuild clinics, hospitals, and care systems that people actually trust.",
    },
  ],

  fr: [
    {
      slug: "clean-water-at-the-first-mile",
      title: "Clean Water at the First Mile",
      summary:
        "Pilotes, contraintes et leçons tirées de l’apport d’eau potable plus proche des communautés.",
    },
    {
      slug: "infrastructure-and-dignity",
      title: "Infrastructure and Dignity",
      summary:
        "Pourquoi les routes, ponts, espaces publics et l’accès numérique sont traités comme des projets de dignité, pas seulement des travaux.",
    },
    {
      slug: "healthcare-and-trust",
      title: "Healthcare and Trust",
      summary:
        "Ce que signifie reconstruire des cliniques, hôpitaux et systèmes de soins en lesquels les gens peuvent vraiment avoir confiance.",
    },
  ],

  ht: [
    {
      slug: "clean-water-at-the-first-mile",
      title: "Clean Water at the First Mile",
      summary:
        "Pilòt, defi ak leson nou aprann pandan n ap pote dlo pwòp pi pre kominote yo.",
    },
    {
      slug: "infrastructure-and-dignity",
      title: "Infrastructure and Dignity",
      summary:
        "Poukisa wout, pon, espas piblik ak aksè dijital se pwojè diyite, pa sèlman konstriksyon.",
    },
    {
      slug: "healthcare-and-trust",
      title: "Healthcare and Trust",
      summary:
        "Sa li vle di pou rebati klinik, lopital ak sistèm swen moun ka fè konfyans.",
    },
  ],

  es: [
    {
      slug: "clean-water-at-the-first-mile",
      title: "Clean Water at the First Mile",
      summary:
        "Pilotos, limitaciones y lecciones de llevar agua potable más cerca de las comunidades.",
    },
    {
      slug: "infrastructure-and-dignity",
      title: "Infrastructure and Dignity",
      summary:
        "Por qué las carreteras, puentes, espacios públicos y el acceso digital se tratan como proyectos de dignidad.",
    },
    {
      slug: "healthcare-and-trust",
      title: "Healthcare and Trust",
      summary:
        "Lo que significa reconstruir clínicas, hospitales y sistemas de salud en los que la gente realmente confíe.",
    },
  ],
};

// Main function used by homepage + /projects page
export function getProjects(locale) {
  // If we don’t know this locale, fall back to English
  if (projectsByLocale[locale]) {
    return projectsByLocale[locale];
  }
  return projectsByLocale.en;
}
