## Copilot Working Agreement for ihs-2025

Use this as your playbook when coding in this repo. Keep changes surgical, follow existing patterns, and prefer small, reviewable PRs.

**Architecture**
- **Stack:** React 18 + TypeScript + Vite. SPA routing via `HashRouter` (see [index.tsx](index.tsx)) to keep deploys static.
- **Entry/Layout:** Providers and global layout mount in [App.tsx](App.tsx): `CartProvider`, `CompareProvider`, `TransitionProvider`, `LayoutProvider`.
- **Routes:** Home `/`, Programmes archive `/programmes/:type`, Course detail `/course/:id`, Admissions pages under `/admissions/*`. See route map in [App.tsx](App.tsx#L45-L60).
- **State:** Shared state lives in React Contexts under [context/](context/). Use hooks: `useCart()`, `useCompare()`, `useLayout()`, `useTransition()`.
- **Domain model:** Types defined in [types.ts](types.ts). Data sources are static fixtures in [constants.tsx](constants.tsx) (`OFFERINGS`, `COURSE_DETAILS`).

**Developer Workflows**
- **Dev (Native):** `npm install` then `npm run dev` (Vite on port 5173).
- **Dev (Docker):** `./start.sh` (wraps `docker-compose up -d`, waits for Vite).
- **Preview (static):** `npm run build` then `npm run preview`. SPA redirect configured in [netlify.toml](netlify.toml).
- **Public Tunnel:** Use `ngrok http 5173`. `allowedHosts` includes specific ngrok hostnames in [vite.config.ts](vite.config.ts).

**Navigation & Transitions**
- **Header:** Desktop has hover `MegaMenu`. Mobile uses `MobileMenu`. See [components/Header.tsx](components/Header.tsx).
- **Programme Filtering:** `MegaMenu` filters `OFFERINGS` by `programmeTypes`, category, and study level using memoized selectors.
- **Animated Page Transition:** `useTransition().startTransition(offering, ...)` triggers GSAP FLIP-style animation before navigating to `/course/:id`. Overlays use z-30 to z-35; header is z-40. See [context/TransitionContext.tsx](context/TransitionContext.tsx).
- **Transition Debugging:** `TransitionProvider` exposes `debugMode` and `toggleDebug()` to visualize bounding boxes and phases.

**Data & Content**
- **Offerings:** Add/edit entries in `OFFERINGS` with stable `id`, `category`, `qualification`, `programmeTypes`. Full details extend via `COURSE_DETAILS` keyed by `id` in [constants.tsx](constants.tsx).
- **E-commerce:** `checkIsEcommerce(course)` in [components/MegaMenu.tsx](components/MegaMenu.tsx#L25-L30) toggles "Apply Now" (Admission) vs "Buy Now" (Cart). Update this for new purchasable items.
- **Nav Links:** `NAV_LINKS`, `ADMISSIONS_LINKS`, `EXPERIENCES_LINKS` are exported from [constants.tsx](constants.tsx).

**UI & Styling**
- **Tailwind:** Use utility classes like `bg-brand-primary`, `text-brand-accent`. Global utilities in [index.css](index.css) (e.g., `hero-enter`, `animate-progress-load`).
- **Buttons:** Use [components/ui/Button.tsx](components/ui/Button.tsx) with variants: `primary`, `secondary`, `gold`, `outline-gold`. Convention: font-bold, uppercase, tracking-[1px].
- **Icons:** Use `lucide-react`.

**Page Composition**
- **Home:** Built with sections in [App.tsx](App.tsx). `useLayout().programmeDisplay` toggles between `CoreOfferings` and `ProgrammeMultiGroup`.
- **Course Detail:** Prefer the transition flow (via `useTransition`) over direct `Link` for visual cards to ensure hero/video alignment.
- **State UI:** `CompareBar` ([components/CompareBar.tsx](components/CompareBar.tsx)) and `MiniCart` ([components/MiniCart.tsx](components/MiniCart.tsx)) are persistent components reacting to context changes.

**Gotchas**
- `HashRouter` is mandatory for static hosting parity.
- Transition overlays assume header height 80px. Maintain z-index ordering: Overlays (z-30-35) < Header (z-40).
- Use `video` over `image` in `OFFERINGS` for consistent hover/transition behavior.
- Ensure any `id` added to `OFFERINGS` also exists in `COURSE_DETAILS` if a detail page is required.

If any of the above is unclear (especially styling tokens like `bg-brand-*` or the transition entry points), ask to confirm the source of brand CSS and the intended transition trigger APIs before proceeding.
