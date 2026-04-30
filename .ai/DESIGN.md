# Frontend System — Apple Style (Strict)

## Core Philosophy
- UI must disappear; product/content is focus
- No decorative elements (no gradients, no unnecessary shadows)
- Max simplicity, max clarity

---

## Color Rules
- Use ONLY one accent color: #0066cc
- No secondary brand colors allowed
- Light surfaces: #ffffff or #f5f5f7
- Dark surfaces: #000000 / #272729 / #2a2a2c / #252527
- Text:
  - Light mode: #1d1d1f
  - Dark mode: #ffffff
- Links:
  - Light: #0066cc
  - Dark: #2997ff

❌ Forbidden:
- Random colors
- Gradients
- Colorful UI elements

---

## Typography Rules
- Font: system-ui, -apple-system, sans-serif
- Headings:
  - Weight: 600
  - Tight letter-spacing (slightly negative)
- Body:
  - Size: 17px (NOT 16px)
  - Line-height: ~1.45
- Small text: 12–14px
- Avoid weight 500

---

## Layout Rules
- Use 8px spacing system
- Section padding: ~80px
- Card padding: ~24px
- Max width:
  - Content: ~1000px
  - Full sections: full-width

---

## Component Rules

### Buttons
- Primary:
  - Background: #0066cc
  - Color: white
  - Border-radius: full (pill)
- Secondary:
  - White background + blue text
- No shadows

---

### Cards
- Background: white or light gray
- Radius: 12–18px
- Border: subtle (light gray)
- No heavy shadows

---

### Navigation
- Height: ~44px
- Minimal
- No borders
- Dark or transparent

---

## Visual Rules
- No gradients
- No UI shadows
- ONLY allow shadow under main product image
- Use whitespace aggressively

---

## Layout Pattern
Each section must follow:
1. Headline
2. Subtext (1 line max)
3. 1–2 CTA buttons
4. Main visual

---

## UX Rules
- First meaningful view < 2s
- User understands page in < 5s
- Each screen = ONE primary action
- No clutter

---

## Performance Rules
- Optimize images heavily
- Lazy load below fold
- Avoid heavy JS
- Keep UI responsive

---

## Strict Constraints
- No over-design
- No unnecessary animations
- No deep component nesting (>3 levels)
- No inconsistent spacing