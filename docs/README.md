# AI-Qadam Knowledge Base

> Single source of truth for AI agents working on this project.

## Quick Start for Agents

1. **Parse** `docs/registry.yaml` — it lists every document with `id`, `path`, `tags`, `summary`.
2. **Filter** by `id`, `tags`, or `category` to find what you need.
3. **Read** only the target `.md` file — keep context lean.

## Structure

```
docs/
├── registry.yaml           ← Master index (START HERE)
├── README.md               ← This file
├── standards/              ← STD-NNN: tech decisions, conventions
│   ├── tech-stack.md
│   ├── coding-style.md
│   └── project-structure.md
├── guides/                 ← GDE-NNN: how-to instructions
│   ├── source-code.md
│   ├── testing.md
│   └── tooling.md
├── issues/                 ← ISS-NNN: bug reports & solutions
│   └── registry.yaml      ← Issue-specific index (status, severity, links)
├── requirements/           ← REQ-NNN: feature specifications
└── templates/              ← Templates for creating new documents
    ├── issue-template.md
    ├── requirement-template.md
    └── release-template.md
```

## ID Conventions

| Prefix | Category      | Example    |
|--------|---------------|------------|
| STD    | Standard      | STD-001    |
| GDE    | Guide         | GDE-001    |
| ISS    | Issue         | ISS-001    |
| REQ    | Requirement   | REQ-001    |
| TPL    | Template      | TPL-ISSUE  |

## Agent → Document Mapping

| Agent              | Reads                           | Writes                          |
|--------------------|----------------------------------|----------------------------------|
| Business Analyst   | STD-*, GDE-*                    | REQ-NNN.md, registry.yaml       |
| Developer          | REQ-NNN, STD-*, GDE-001        | Source code                      |
| Issue Resolver     | ISS registry, ISS-NNN, STD-*   | ISS-NNN.md, issues/registry.yaml|
| Bug Fixer          | ISS-NNN (solution design)       | Source code                      |
| Tester             | REQ-NNN, ISS-NNN, GDE-002      | Test reports                     |
| Tech Writer        | All                             | All docs (updates)               |
| Release Controller | All registries, REQ-*, ISS-*    | Release notes                   |

## How to Create a New Document

### New Issue
1. Copy `docs/templates/issue-template.md` → `docs/issues/ISS-NNN.md`.
2. Replace `{NNN}` with the next number from `docs/issues/registry.yaml` → `next_id`.
3. Fill in the fields.
4. Add an entry to `docs/issues/registry.yaml`.
5. Increment `next_id` in the issue registry.

### New Requirement
1. Copy `docs/templates/requirement-template.md` → `docs/requirements/REQ-NNN.md`.
2. Use the next sequential number.
3. Fill in the fields.
4. Add an entry to the `requirements` category in `docs/registry.yaml`.

### New Release
1. Copy `docs/templates/release-template.md` → `docs/requirements/RELEASE-vX.Y.Z.md`.
2. Fill in features, fixes, and checklist.

## Cross-Referencing

Use the `linked` field in YAML registries and mention IDs in Markdown:
- In YAML: `linked: [REQ-003, ISS-001]`
- In Markdown: `See [ISS-001](issues/ISS-001.md) for the related bug.`

## Principles

- **Lean:** Each document is self-contained. Agents read 1-2 files per task, not the whole KB.
- **Machine-first:** YAML for structured data, Markdown for prose. No complex tooling.
- **Git-native:** All files are text, diffable, and version-controlled.
- **Maintained by agents:** Tech Writer agent keeps docs in sync after each implementation.
