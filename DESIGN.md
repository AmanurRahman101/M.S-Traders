# M.S TRADERS — DESIGN SYSTEM & ARCHITECTURE SPECIFICATION
**Version:** 2.0 (Ultra-Craft Financial & Operations App)  
**Inspiration:** Linear, Stripe Dashboard, Raycast  
**Target:** Old Dhaka Rexin Wholesale & Retail Market (Suritola, Dhaka)  

---

## 1. Color Palette & Surface Tokens (Zinc / Obsidian)

The design system enforces a disciplined monochromatic foundation with precise semantic financial accents.

### Light Mode (`:root`, `.theme-light`)
- `--bg-canvas`: `#FAFAFA` — Page background
- `--bg-surface`: `#FFFFFF` — Primary content surface
- `--bg-elevated`: `#F4F4F5` — Interactive hover states, subtle pills
- `--bg-glass`: `rgba(255, 255, 255, 0.82)` with `backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px);`
- `--border-subtle`: `#E4E4E7` — Standard component borders
- `--border-focus`: `#18181B` — High-contrast active/focus border
- `--text-primary`: `#09090B` — Main text
- `--text-secondary`: `#52525B` — Secondary labels and descriptions
- `--text-muted`: `#71717A` — Micro-labels and placeholders
- `--accent-primary`: `#18181B` — Primary button background
- `--accent-contrast`: `#FFFFFF` — Text on primary buttons

### Dark Mode (`body.theme-dark`)
- `--bg-canvas`: `#09090B` — Page background
- `--bg-surface`: `#121215` — Primary card and modal surface
- `--bg-elevated`: `#18181B` — Hover states and inset fields
- `--bg-glass`: `rgba(18, 18, 21, 0.82)` with `backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px);`
- `--border-subtle`: `#27272A` — Standard border
- `--border-focus`: `#FAFAFA` — Focus ring border
- `--text-primary`: `#FAFAFA` — Main text
- `--text-secondary`: `#A1A1AA` — Secondary labels
- `--text-muted`: `#71717A` — Micro-labels
- `--accent-primary`: `#FAFAFA` — Primary button background
- `--accent-contrast`: `#09090B` — Text on primary buttons

### Financial & Status Accents
- **Success / Net Cash / Paid**:
  - `--status-success`: `#10B981`
  - `--status-success-bg`: `rgba(16, 185, 129, 0.12)`
  - `--status-success-border`: `rgba(16, 185, 129, 0.25)`
- **Warning / Dena (Supplier Liabilities)**:
  - `--status-warning`: `#F59E0B`
  - `--status-warning-bg`: `rgba(245, 158, 11, 0.12)`
  - `--status-warning-border`: `rgba(245, 158, 11, 0.25)`
- **Danger / Pawna (Customer Dues) / Owed**:
  - `--status-danger`: `#F43F5E`
  - `--status-danger-bg`: `rgba(244, 63, 94, 0.12)`
  - `--status-danger-border`: `rgba(244, 63, 94, 0.25)`

### Radii & Elevation
- `--radius-sm`: `8px`
- `--radius-md`: `12px`
- `--radius-lg`: `16px`
- `--radius-xl`: `20px`
- `--radius-pill`: `9999px`
- `--shadow-subtle`: `0 1px 2px 0 rgba(0, 0, 0, 0.04)`

---

## 2. Typography Hierarchy

- **UI Font**: `'Plus Jakarta Sans'`, `'Hind Siliguri'`, -apple-system, sans-serif
- **Financial & Data Font**: `'JetBrains Mono'`, monospace
  - Applied to all currency amounts (`৳`), quantities (Gauze & Ghira), dates, phone numbers, and invoice IDs.
  - Required CSS: `font-variant-numeric: tabular-nums; letter-spacing: -0.02em;`
- **Headings**: `letter-spacing: -0.025em; font-weight: 600;`
- **Micro-labels**: `font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.06em; font-weight: 600; color: var(--text-muted);`

---

## 3. Responsive Navigation Shell

### Desktop (`>= 768px`)
- **Fixed Left Navigation Rail**: `240px` fixed width with brand logo, cloud sync badge, tab links (Pawna, Dena, Expenses), theme toggle, and settings.
- **Main Content**: `calc(100% - 240px)` margin-left, `max-width: 1280px`, generous padding (`32px`).

### Mobile (`< 768px`)
- **Desktop sidebar hidden**.
- **Compact Top Bar**: `height: 56px`, sticky glass header showing brand title, cloud sync badge, and quick action icons.
- **Fixed Bottom Navigation Bar**:
  - `height: calc(64px + env(safe-area-inset-bottom))`
  - Anchored to bottom with thumb-friendly buttons for Pawna, Dena, Expenses, and a prominent Quick Action (`+`) trigger.
  - Content `<main>` has `padding-bottom: 88px` to guarantee no overlap.

---

## 4. Mobile Bottom-Sheet Modals & Smart Cards

- Centered desktop modals seamlessly morph into slide-up bottom sheets on screens `< 768px`:
  - `position: fixed; inset: auto 0 0 0;`
  - `border-radius: 20px 20px 0 0;`
  - `max-height: 88dvh;`
  - Drag handle pill: `36px × 4px`, centered at top.
  - Minimum touch target: `48px × 48px`.
  - Input field font size: `16px` (`1rem`) to prevent iOS/Android zoom on focus.
- 2-Line Smart Cards for Customer and Supplier listings:
  - Top line: Name + Tabular Balance Amount
  - Bottom line: Phone/Address + Status Pill + Quick Action Buttons (Sale, Pay, WhatsApp)
