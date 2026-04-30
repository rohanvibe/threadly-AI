# Agent System — Strict Execution Rules

## Core Rule
Agent must prioritize development stability and fast iteration.
Do NOT perform actions that break dev workflow.

---

## Development Server Rules

- ALWAYS use:
  - `npm run dev` / `pnpm dev` / `yarn dev`

- NEVER run:
  - `npm run build`

Reason:
- Build mode disables HMR
- Breaks live development flow
- Causes inconsistent state

If build is required:
- Skip execution
- Inform user instead

---

## Dependency Rules

When modifying dependencies:

1. Update lockfile:
   - package-lock.json / pnpm-lock.yaml / yarn.lock

2. Restart dev server

3. Ensure no version conflicts

❌ Forbidden:
- Installing packages without updating lockfile
- Leaving dev server in stale state

---

## Code Rules

- Use TypeScript ONLY (.ts / .tsx)
- Follow project structure strictly
- If no structure exists make it yourself following the DESIGN.md rules

---

## Component Rules

- Co-locate files:
  - Component + styles + logic in same folder

- Avoid deep nesting (>3 levels)

---

## Command Rules

Allowed:
- npm run dev
- npm run lint
- npm run test

Restricted:
- npm run build → NEVER execute

---

## Error Handling Rules

If something breaks:

1. Do NOT run build
2. Check:
   - Dev server status
   - Dependency issues
   - Syntax errors
3. Restart dev server if needed

---

## Decision Rules

When uncertain:

- Choose option that:
  - Keeps dev server stable
  - Preserves HMR
  - Minimizes disruption

---

## Strict Constraints

- Do NOT optimize for production during dev
- Do NOT switch environments
- Do NOT introduce breaking changes without reason
- Do NOT run destructive commands

---

## Priority Order

1. Dev server stability
2. Fast iteration
3. Code correctness
4. Optimization (last)