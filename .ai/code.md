# Code System — Strict Quality Rules

## Core Rule
Code must be:
- Readable
- Maintainable
- Consistent
- Predictable

---

## File Rules

- Use TypeScript only (.ts / .tsx)
- One responsibility per file
- File size limit: ~300 lines max

---

## Function Rules

- Max length: 40 lines
- Single responsibility only
- Clear naming (no abbreviations)

---

## Naming Rules

- Variables: camelCase
- Functions: camelCase (action-based)
- Components: PascalCase
- Constants: UPPER_CASE

Examples:
- getUserData
- createOrder
- calculateTotalPrice

---

## Structure Rules

Backend:
- controller → service → data layer

Frontend:
- UI → logic → state separated

---

## Reusability Rules

- No duplicate logic
- Extract reusable functions
- Use utilities for repeated patterns

---

## Readability Rules

- Avoid nested logic (>3 levels)
- Use early returns
- Keep code flat and simple

---

## Error Handling Rules

- Always handle errors
- Never leave try/catch empty
- Return meaningful error messages

---

## Validation Rules

- Validate ALL inputs
- Never trust external data

---

## Comments Rules

- Explain WHY, not WHAT
- Avoid obvious comments

---

## Formatting Rules

- Consistent indentation
- Clear spacing between sections
- Group related logic

---

## Anti-Patterns (Forbidden)

- ❌ Long functions (>40 lines)
- ❌ Deep nesting
- ❌ Duplicate logic
- ❌ Hardcoded values
- ❌ Unused variables
- ❌ Console logs in production

---

## Performance Rules

- Avoid unnecessary loops
- Avoid redundant computations
- Optimize only when needed

---

## Final Rule

Code should be understandable in <30 seconds by another developer