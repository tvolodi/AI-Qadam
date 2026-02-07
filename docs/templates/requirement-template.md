<!-- Copy this file as docs/requirements/REQ-NNN.md -->
# REQ-{NNN} — {Feature title}

| Field       | Value            |
|-------------|------------------|
| ID          | REQ-{NNN}        |
| Status      | draft            |
| Priority    | medium           |
| Created     | {YYYY-MM-DD}     |
| Author      | Business Analyst |
| Linked      | —                |
| Tags        |                  |

## User Idea

{Original request from the user, in their own words.}

## Feature Description

{Business Analyst's enriched description. What the feature does, who it's for, why it matters.}

## Acceptance Criteria

1. {Criterion 1}
2. {Criterion 2}
3. {Criterion 3}

## State Change Matrix

Every interactive element and data-modifiable entity, with all possible state transitions:

| Entity | State From | Action/Event | State To | Validation |
|--------|-----------|--------------|----------|------------|
| {entity} | {state} | {action} | {state} | {rule} |

> Every row becomes a test case. 100% coverage required.

## GUI Element Inventory

Every visual element introduced or modified by this feature:

| Element | Type | Page/Route | States | Responsive | i18n |
|---------|------|-----------|--------|------------|------|
| {name} | {Button/Input/Card/...} | {/route} | {default, hover, disabled, ...} | {yes/no} | {yes/no} |

> Every element must be verified visually with Playwright screenshots.

## Affected Areas

- **Pages:** {list of routes}
- **Components:** {new or modified components}
- **DB Models:** {new or modified Prisma models}
- **API Routes:** {new or modified endpoints}
- **i18n:** {new dictionary keys needed}

## Implementation Notes

{Guidance for Developer agent: suggested approach, relevant standards, edge cases.}

### References

- [STD-001 Tech Stack](../standards/tech-stack.md)
- [STD-002 Coding Style](../standards/coding-style.md)
- [GDE-001 Source Code Guide](../guides/source-code.md)

## Test Plan

{Guidance for Tester agent: what to test, key scenarios.}

| Scenario | Input | Expected Output |
|----------|-------|-----------------|
| {name}   | {…}   | {…}             |
