# Backend System — Strict Execution Rules

## Core Rule
Backend must prioritize:
1. Reliability
2. Security
3. Performance
4. Consistency

Do NOT trade these for speed of development.

---

## Global Constraints

- Follow agent.md strictly
- All backend code must be production-ready
- No temporary or hacky solutions
- No inconsistent API or data patterns

---

## API Rules

- Use RESTful design only
- Follow consistent naming:
  - /users
  - /orders
  - /auth/login

- HTTP status codes must be correct:
  - 200 OK
  - 201 Created
  - 400 Bad Request
  - 401 Unauthorized
  - 403 Forbidden
  - 404 Not Found
  - 500 Internal Server Error

- All endpoints MUST:
  - Validate input
  - Return consistent JSON format
  - Handle errors properly

---

## Response Format (Mandatory)

All APIs must return:

```json
{
  "success": true,
  "data": {},
  "error": null
}

on error return:

```json
{
  "success": false,
  "data": null,
  "error": {
    "message": "Error description",
    "code": "ERROR_CODE"
  }
}
```