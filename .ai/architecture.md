# Architecture System — Structure Rules

## Core Rule
System must be:
- Modular
- Scalable
- Predictable

---

## Separation of Concerns

Strict separation:

- UI layer → display only
- Logic layer → business rules
- Data layer → database/API

❌ No mixing layers

---

## Backend Architecture

Structure:
- Controller → handles request
- Service → business logic
- Data layer → DB access

Rules:
- Controllers do NOT contain logic
- Services do NOT access UI
- Data layer only handles DB

---

## Frontend Architecture

Structure:
- Components → UI
- Hooks / logic → behavior
- State → data

Rules:
- No business logic inside UI components
- Keep components small and reusable

---

## API Architecture

- REST only
- Consistent endpoints
- Standard response format (from backend.md)

---

## State Management

- Keep state minimal
- Avoid unnecessary global state
- Derive data when possible

---

## Scalability Rules

- Design for modular expansion
- Avoid tight coupling
- Use clear boundaries between modules

---

## Dependency Rules

- Avoid circular dependencies
- Keep dependencies minimal
- Use abstraction only when needed

---

## Data Flow

- One direction:
  - Input → processing → output

---

## Feature Development Rule

Each feature must:
1. Define data
2. Define logic
3. Define UI
4. Integrate cleanly

---

## Anti-Patterns (Forbidden)

- ❌ Mixing UI + logic + DB
- ❌ Monolithic files
- ❌ Tight coupling between modules
- ❌ Unclear data flow

---

## Final Rule

System should be easy to extend without rewriting existing code