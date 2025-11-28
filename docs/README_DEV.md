# 👨‍💻 Nouvo Ayiti 2075 Blogs — Developer Guide

Welcome to the developer-focused guide for the **Nouvo Ayiti 2075 Blog Platform**.

This document is optimized for:

- Contributors
- Collaborators
- Engineers extending the system
- CI/CD maintainers

---

## 🛠️ Installation

```bash
git clone https://github.com/justine6/nouvo-ayiti-2075-blogs.git
cd nouvo-ayiti-2075-blogs
npm install
```

---

## ▶️ Running the Dev Server

```bash
npm run dev
```

Default: http://localhost:3000

---

## 🧭 Core Developer Commands

### **Validation Pipeline**

| Action             | Command                    |
| ------------------ | -------------------------- |
| Soft check         | `npm run check-all`        |
| Strict CI pipeline | `npm run ci-check:dry-run` |
| Full CI workflow   | `npm run ci-check`         |
| Repair             | `npm run ci-repair`        |

### **Dictionary Management**

| Action             | Command                 |
| ------------------ | ----------------------- |
| Sync dictionaries  | `npm run sync`          |
| Patch missing keys | `npm run patch-missing` |
| Update all         | `npm run update-dicts`  |
| Export CSV         | `npm run json-to-csv`   |

---

## 🧩 File Structure (Developer View)

```
app/
  └── [locale]/
        ├── page.tsx
        ├── blog/
        ├── projects/
        └── contact/
components/
scripts/
content/
public/
```

---

## 🛡 Git Hooks (Husky)

### **pre-commit**

- Lint staged
- Run dictionary validation

### **pre-push**

Blocks push if:

- Lint fails
- Dictionary mismatch
- Tests fail

---

## 🧪 Testing

CI uses:

- ESLint
- TypeScript correctness
- Script-level dictionary checks

Add tests inside `/tests` if you expand the system.

---

## 🌐 Localization Rules

Locales supported:

- `en`
- `fr`
- `ht`

Rules:

- Every key must exist in every locale
- Dictionary filenames must match locale ISO codes
- Patch scripts automatically fix inconsistencies

---

## 🚀 Deployment (Vercel)

Two environments:

- **Preview** → PR deployments
- **Production** → triggered on main merge

Uses:

- Server components
- App Router caching
- ISR for posts

---

## 🤝 Contribution

1. Create a feature branch
2. Run:
   ```bash
   npm run check-all
   ```
3. Commit and push
4. PR → Validated by CI
5. Merge only when **All Checks = green**

---

✍️ Maintained by **JustineLonglaT & Contributors**
