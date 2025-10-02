# Contributing to Nouvo Ayiti 2075 Blogs

Thank you for your interest in contributing! 🎉  
This guide explains how to set up your environment, make changes, run tests, and submit them safely.

---

## 🚀 Getting Started

1. **Fork and Clone**

   ```bash
   git clone https://github.com/justine6/nouvo-ayiti-2075-blogs.git
   cd nouvo-ayiti-2075-blogs

   ```

# Contributing Guidelines

Thank you for your interest in contributing! 🎉  
To keep our project consistent and maintainable, please follow these guidelines.

---

## 📝 Before You Start

- Make sure your branch name follows a clear convention, e.g.:
  - `fix/*` for bug fixes
  - `feature/*` for new features
  - `chore/*` for maintenance and non-functional updates

---

## ✅ Pull Requests

All pull requests must use our [Pull Request Template](.github/PULL_REQUEST_TEMPLATE.md).  
When you open a PR, GitHub will automatically populate the description with this template.

### Contributor Checklist (required before opening a PR)

- Run `npm install` if dependencies changed
- Validate translations with `npm run check-all`
- Fix missing keys with `npm run patch-missing` (if needed)
- Fix footer/topbar issues with `npm run fix-topbar-footer` (if needed)
- Verify coding standards with `npm run lint -- --fix`
- Simulate CI with `npm run ci-check:dry-run`
- Ensure build passes with `npm run build`

### Reviewer Checklist

- Confirm the PR has a clear and descriptive title
- Ensure the PR is scoped to a single purpose/change
- Verify all contributor checklist items are completed
- Check that translations load correctly and match structure
- Ensure the code is maintainable, well-structured, and tested

---

## 📌 Additional Notes

- Keep PRs focused: one main feature/fix per PR
- Update documentation or comments where necessary
- If workflows, scripts, or checks change, update the PR template as well

---

Happy contributing! 💙
