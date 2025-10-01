# 🛠 Workflow Guide

This document explains the CI/CD and validation workflows used in the **Nouvo Ayiti 2075 Blogs** project.

---

## 📊 Workflow Orchestration

Below is the **source (Mermaid)** and the **rendered PNG preview**.

### Mermaid Source (editable)
```mermaid
flowchart TD
    A[All Checks Workflow] --> B[Reset Quiet Job]
    A --> C[CI Check Job]
    B --> D[Verify: Success/Fail Summary]
    C --> D
```

### Rendered Preview
![Workflow Orchestration](./workflow_orchestration.png)

---

## 📊 Local → CI Flow

Below is the **source (Mermaid)** and the **rendered PNG preview**.

### Mermaid Source (editable)
```mermaid
flowchart TD
    A[Local Dev Commands] --> B[check-all]
    A --> C[ci-check]
    A --> D[ci-repair]

    B --> E[Warnings Only]
    C --> F[Strict Validations in CI]
    D --> G[Auto-fixes + PR Suggestions]

    F --> H[CI Workflow]
    H --> I[All Checks Orchestration]
```

### Rendered Preview
![Local to CI Flow](./local_ci_flow.png)

---

## 🔑 Key Notes

- **Mermaid blocks** → Editable, for maintainers.  
- **PNG previews** → Always render on GitHub.  
- Artifacts and retention rules are documented in [README.md](./README.md).

---

✍️ Maintained by **Nouvo Ayiti 2075 Team**
