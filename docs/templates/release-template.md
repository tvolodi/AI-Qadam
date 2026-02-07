<!-- Copy this file as docs/requirements/RELEASE-vX.Y.Z.md -->
# Release Notes — v{X.Y.Z}

| Field       | Value            |
|-------------|------------------|
| Version     | v{X.Y.Z}         |
| Date        | {YYYY-MM-DD}     |
| Author      | Release Controller |

## Summary

{One-paragraph overview of this release.}

## New Features

| REQ ID   | Title                  | Status   |
|----------|------------------------|----------|
| REQ-NNN  | {Feature title}        | Done     |

## Bug Fixes

| ISS ID   | Title                  | Severity | Status   |
|----------|------------------------|----------|----------|
| ISS-NNN  | {Issue title}          | high     | Resolved |

## Breaking Changes

- {None / list of breaking changes}

## Documentation Updated

- [ ] Standards updated
- [ ] Guides updated
- [ ] Issue registry updated

## Pre-Release Checklist

- [ ] All REQs implemented and tested
- [ ] All ISS resolved and verified
- [ ] `npm run lint` passes
- [ ] `npx tsc --noEmit` passes
- [ ] `npm run build` succeeds
- [ ] Tests pass with ≥ 80% coverage
- [ ] DB migrations applied
- [ ] Docker image builds successfully
- [ ] Deployment verified on staging
