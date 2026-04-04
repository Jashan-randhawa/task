# Stitch — UI/UX Improvement Notes

## What Changed & Why

### 1. Design System — Full Overhaul (`globals.css`)

**Before:** Mixed Manrope + Inter with hardcoded hex colors scattered across JSX inline styles. Purple-on-white palette was generic and forgettable.

**After:**
- **Fraunces** (editorial serif) for headings and numeric displays — gives the brand warmth and distinction
- **DM Sans** for body text — clean, humanist, highly legible
- Warm stone palette (`#f5f4f0` base) instead of cold blue-grey, creating a premium, editorial feel
- All colors, spacing, shadows, transitions defined as CSS variables — single source of truth
- Consistent `--r-*` radius tokens, `--shadow-*` tokens, `--t` transition timing
- Added `@keyframes fade-up` and staggered `animation-delay` classes for smooth page entry

---

### 2. Navigation — Unified & Consistent

**Before:** Two separate navbar components (`Navbar.tsx` + `DashboardNavbar.tsx`) with different logic, different active state handling, dead links (`#` for Events, Reports), and no shared structure.

**After:**
- Both navbars now use the same nav links array and same CSS classes
- Active state uses router-aware `.active` class consistently
- Dead "Events" link removed; nav pruned to working routes only
- Logo uses a consistent `Fraunces` wordmark + orange dot mark
- Icon buttons use shared `.nav-icon-btn` CSS class

---

### 3. Dashboard Sidebar — Router-Aware & Clean

**Before:** Hardcoded hover handlers using `onMouseEnter/Leave` in JSX, hard-coded hex colors, no CSS variable usage.

**After:**
- Active states driven by `usePathname()` hook
- Colors use `var(--ink)`, `var(--surface-low)` etc. — consistent with design system
- Hover effects still use JS handlers (required for dynamic styles), but reference CSS variables
- "Post Requirement" CTA button simplified and uses the dark `var(--ink)` instead of purple gradient

---

### 4. Form — UX Fixes (`MultiStepRequirementForm.tsx`)

**Before:**
- Step tabs were purely decorative — clicking them did nothing
- `useEffect` + `document.getElementById` DOM manipulation to sync the left aside (anti-pattern in React)
- No keyboard accessibility on category cards

**After:**
- **Step tabs are now clickable** — users can navigate back to any previously completed step
- Aside sync moved into a `syncAside()` helper function called directly on step change (avoids useEffect dependency array issues)
- Category cards have `tabIndex={0}` and `onKeyDown` for Enter key support
- Submit button shows spinner icon when loading
- `goToStep()` function ensures you can only navigate to visited steps (forward progression still enforced)

---

### 5. Analytics & Dashboard Pages — Design Token Adoption

**Before:** Hardcoded hex colors like `#4d44e3`, `#0b1c30`, `#515f74`, `#c6c6cd` everywhere in JSX styles.

**After:**
- All colors replaced with `var(--ink)`, `var(--ink-soft)`, `var(--surface-card)` etc.
- Metric cards have hover lift animation (`translateY(-2px)` + shadow)
- Charts use the new `var(--accent)` dark navy for primary lines
- Staggered `animate-fade-up` with `animation-delay` for smooth page entry
- Table rows use CSS variable colors and transition on hover

---

### 6. SuccessPage — Proper Routing

**Before:** Sidebar nav links all pointed to `#`, "View Dashboard" was `<a href="#">`.

**After:**
- Sidebar nav uses Next.js `<Link>` with proper `href` values
- "View Dashboard" CTA links to `/dashboard`
- Active state correctly highlights "My Postings"

---

### 7. GuideSidebar — Restructured

**Before:** Mixed SVG icons + text in a flat list with no clear visual hierarchy.

**After:**
- Uses `.guide-item`, `.guide-item-top`, `.guide-icon`, `.guide-item-title`, `.guide-item-desc` CSS classes
- Step 4 guide content added (was missing in original)
- Cards have hover lift animation matching the rest of the design system

---

### 8. Tailwind Config Updated

Added custom tokens matching the design system:
- Font families: `font-display` (Fraunces), `font-body` (DM Sans)
- Color scales: `surface.*`, `ink.*`, `accent.*`
- Border radii, shadows, and fade-up animation registered as Tailwind utilities

---

## Additional Recommendations

1. **Extract reusable components** — `<MetricCard />`, `<ActivityItem />`, `<ProgressBar />` to reduce duplication between Dashboard and Analytics pages

2. **Add loading skeletons** — Dashboard cards should show shimmer placeholders while fetching real data

3. **Mobile nav** — Add a hamburger menu / drawer for the sidebar on mobile (currently hidden below `md:` breakpoint)

4. **Form validation** — Add client-side field validation with inline error messages before allowing step progression

5. **Route protection** — Add auth middleware so `/dashboard` and `/analytics` redirect to login if unauthenticated

6. **Dark mode** — The CSS variable system is already set up for it — just add `@media (prefers-color-scheme: dark)` overrides to `:root`
