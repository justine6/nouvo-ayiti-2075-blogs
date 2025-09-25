# Nouvo Ayiti 2075 Blogs

![CI](https://github.com/justine6/nouvo-ayiti-2075-blogs/actions/workflows/ci.yml/badge.svg)
[![codecov](https://codecov.io/gh/justine6/nouvo-ayiti-2075-blogs/branch/main/graph/badge.svg)](https://codecov.io/gh/justine6/nouvo-ayiti-2075-blogs)
![Coverage Phase](https://img.shields.io/endpoint?url=https://raw.githubusercontent.com/justine6/nouvo-ayiti-2075-blogs/main/coverage-phase.json)
[![Vercel Deployment](https://vercel.com/button)](https://vercel.com/justine6/nouvo-ayiti-2075-blogs/deployments)

🌍 **Live Site:** [https://nouvoayiti2075.com](https://nouvoayiti2075.com)

---

## 🚀 Development Setup

Follow these steps to run the project locally:

### 1. Clone the repository

````bash
git clone https://github.com/justine6/nouvo-ayiti-2075-blogs.git
cd nouvo-ayiti-2075-blogs



<!-- Coverage Phase Badge -->
![Coverage Phase](https://img.shields.io/badge/coverage--phase-1%20(baseline)-blue)


<!-- Uncomment when ready
![CSV Sync](https://github.com/justine6/nouvo-ayiti-2075-blogs/actions/workflows/validate-csv.yml/badge.svg)
-->

---

## 📌 Project Overview
Nouvo Ayiti 2075 Blogs is part of the **Nouvo Ayiti 2075 initiative**, designed to share articles, insights, and updates that align with the vision of restoring dignity, rebuilding hope, and renewing vision for Haiti.

This repository powers the blog site, built with **Next.js**, **TailwindCSS**, and multilingual support across **English, French, Haitian Creole, and Spanish**.

---

## 🚦 CI/CD Status

### ✅ CI (Build, Test & Validate)
- Runs automatically on every **push** and **pull request** to `main`.
- Ensures:
  - Dictionaries are merged (`merge-dicts`)
  - Translations are strictly validated (`check-dicts:strict`)
  - Metadata and required keys are checked
  - Linting passes
  - Unit tests pass
  - Next.js builds successfully

Badge:
![CI](https://github.com/justine6/nouvo-ayiti-2075-blogs/actions/workflows/ci.yml/badge.svg)

---

### 🌐 Vercel Deployment
- Tracks the live deployment status of this project on Vercel.
- Clicking the badge will take you to the deployment dashboard.

Badge:
[![Vercel Deployment](https://vercel.com/button)](https://vercel.com/justine6/nouvo-ayiti-2075-blogs/deployments)

🌍 **Live Site:** [https://nouvoayiti2075.com](https://nouvoayiti2075.com)

---

### 🔄 CSV Sync (Manual for now)
- Runs **on-demand** via GitHub Actions (`workflow_dispatch`).
- Validates dictionary files.
- Exports a combined CSV of translations.
- Checks JSON ↔ CSV sync and auto-commits updates if needed.

Badge (commented out until ready):
![CSV Sync](https://github.com/justine6/nouvo-ayiti-2075-blogs/actions/workflows/validate-csv.yml/badge.svg)

---

## 🛠️ Tech Stack
- [Next.js](https://nextjs.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [Vitest](https://vitest.dev/) for testing
- [Zod](https://zod.dev/) for runtime schema validation
- GitHub Actions for CI/CD
- Husky for local pre-commit & pre-push checks
- Vercel for deployment

---

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Validate translations
npm run validated

# Run full CI pipeline locally
npm run ci-check

---

## 🤝 Contributing

We welcome contributions to improve **Nouvo Ayiti 2075 Blogs**!
Please follow these guidelines:

### 1. Branching
- Create feature branches from `develop` (e.g. `feature/add-footer`).
- Open a pull request into `develop` for review.
- Merges into `main` are reserved for production-ready code.

### 2. Commit Style
We follow [Conventional Commits](https://www.conventionalcommits.org/):
- `feat:` for new features
- `fix:` for bug fixes
- `docs:` for documentation updates
- `test:` for tests only
- `chore:` for build, tooling, or CI changes

Examples:
```bash
git commit -m "feat: add French translations for newsletter section"
git commit -m "fix: correct missing key in ht/join.json"
````
