---
applyTo: "docs/**"
---

# Knowledge Base Instructions

- The knowledge base uses YAML registries (`registry.yaml`) as machine-readable indexes and Markdown files for content.
- When creating a new document, copy the appropriate template from `docs/templates/`.
- Always update `docs/registry.yaml` (or `docs/issues/registry.yaml` for issues) when adding a new document.
- Use the ID conventions: STD-NNN (standards), GDE-NNN (guides), ISS-NNN (issues), REQ-NNN (requirements).
- Cross-reference using the `linked` field in YAML and `[ID](path)` links in Markdown.
- Keep documents lean and self-contained — agents should need at most 2 file reads to find information.
