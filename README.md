# Nouvo Ayiti 2075 Blogs

---

## 🛡️ Workflow Status

- [![All Checks](https://github.com/justine6/nouvo-ayiti-2075-blogs/actions/workflows/all-checks.yml/badge.svg)](https://github.com/justine6/nouvo-ayiti-2075-blogs/actions/workflows/all-checks.yml)  
  Runs **Reset Quiet + CI** together. Produces a summary artifact:  
  `all-checks-summary-<env>-<run_number>-<timestamp>`

- [![Reset Quiet](https://github.com/justine6/nouvo-ayiti-2075-blogs/actions/workflows/reset.yml/badge.svg)](https://github.com/justine6/nouvo-ayiti-2075-blogs/actions/workflows/reset.yml)  
  Environment-specific reset workflow. Produces logs + summary artifacts:  
  `reset-summary-<env>-<run_number>-<timestamp>`

- [![CI Check](https://github.com/justine6/nouvo-ayiti-2075-blogs/actions/workflows/ci.yml/badge.svg)](https://github.com/justine6/nouvo-ayiti-2075-blogs/actions/workflows/ci.yml)  
  Runs linting, Prettier checks, and strict validations. Produces:  
  `ci-summary-<run_number>-<timestamp>`

- [![CodeQL](https://github.com/justine6/nouvo-ayiti-2075-blogs/actions/workflows/codeql.yml/badge.svg)](https://github.com/justine6/nouvo-ayiti-2075-blogs/security/code-scanning)  
  Automated security analysis.

---

## 🔧 Maintenance & Dependencies

[![Dependabot Status](https://img.shields.io/badge/Dependabot-enabled-brightgreen?logo=dependabot)](https://github.com/justine6/nouvo-ayiti-2075-blogs/network/updates)  
![Node.js](https://img.shields.io/badge/node-20.x-green)  
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

---

## 📊 Quality & Deployment

[![codecov](https://codecov.io/gh/justine6/nouvo-ayiti-2075-blogs/branch/main/graph/badge.svg)](https://codecov.io/gh/justine6/nouvo-ayiti-2075-blogs)  
![Coverage Phase](https://img.shields.io/endpoint?url=https://raw.githubusercontent.com/justine6/nouvo-ayiti-2075-blogs/main/coverage-phase.json)  
[![Vercel Deployment](https://vercel.com/button)](https://vercel.com/justine6/nouvo-ayiti-2075-blogs/deployments)

---

🌍 **Live Site:** [https://nouvoayiti2075.com](https://nouvoayiti2075.com)

---

## 🚀 Development Setup

Follow these steps to run the project locally:

### 1. Clone the repository

```bash
git clone https://github.com/justine6/nouvo-ayiti-2075-blogs.git
cd nouvo-ayiti-2075-blogs
