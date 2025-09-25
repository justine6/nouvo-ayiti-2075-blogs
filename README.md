# Nouvo Ayiti 2075 Blogs

![CI](https://github.com/justine6/nouvo-ayiti-2075-blogs/actions/workflows/ci.yml/badge.svg)
[![codecov](https://codecov.io/gh/justine6/nouvo-ayiti-2075-blogs/branch/main/graph/badge.svg?token=${{ secrets.CODECOV_TOKEN }})](https://codecov.io/gh/justine6/nouvo-ayiti-2075-blogs)
[![Vercel Deployment](https://vercel.com/button)](https://vercel.com/justine6/nouvo-ayiti-2075-blogs/deployments)

🌍 **Live Site:** [https://nouvoayiti2075.com](https://nouvoayiti2075.com)

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
