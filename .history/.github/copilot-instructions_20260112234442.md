## Copilot Working Agreement for ihs-2025

Use this as your playbook when coding in this repo. Keep changes surgical, follow existing patterns, and prefer small, reviewable PRs.

**Architecture**
- **Stack:** React 18 + TypeScript + Vite. SPA routing via `HashRouter` to keep deploys static (see [index.tsx](index.tsx)).
- **Entry/Layout:** Providers and global layout mount in [App.tsx](App.tsx): `CartProvider`, `CompareProvider`, `TransitionProvider`, `LayoutProvider`, persistent `Header`/`Footer` plus route `Routes`.
- **Routes:** Home `/`, Programmes archive `/programmes/:type`, Course detail `/course/:id`, Admissions pages under `/admissions/*`. See route map in [App.tsx](App.tsx#L38-L56).
- **State:** Project-wide state lives in React Contexts under [context/](context). Prefer hooks: `useCart()`, `useCompare()`, `useLayout()`, `useTransition()`.
- **Domain model:** Types in [types.ts](types.ts). Data sources are static fixtures in [constants.tsx](constants.tsx) (e.g., `OFFERINGS`, `COURSE_DETAILS`, navigation link sets).

**Developer Workflows**
- **Dev (native):** `npm install` then `npm run dev` (Vite on port 5173; configured in [vite.config.ts](vite.config.ts)).
- **Dev (Docker):** `./start.sh` (wraps `docker-compose up -d`, waits for Vite). Compose file: [docker-compose.yml](docker-compose.yml).
- **Preview (static):** `npm run build` then `npm run preview` or use ngrok helper [scripts/preview-ngrok.js](scripts/preview-ngrok.js) with `PORT=5173` and `NGROK_AUTHTOKEN`.
- **Deploy (Netlify):** Build `npm run build`, publish `dist/`. SPA redirect is configured in [netlify.toml](netlify.toml).
- **Vite server notes:** `server.host = true`, polling enabled for Docker; `allowedHosts` includes a specific ngrok hostname in [vite.config.ts](vite.config.ts#L6-L15).

**Navigation & Transitions**
- **Header menus:** Desktop has hover “MegaMenu” with 3 columns (programme types, filters, results). Mobile uses `MobileMenu`. See [components/Header.tsx](components/Header.tsx) and [components/MegaMenu.tsx](components/MegaMenu.tsx).
- **Programme filtering:** `MegaMenu` filters `OFFERINGS` by `programmeTypes`, category and study level with memoized selectors. Add programme types/categories in [constants.tsx](constants.tsx).
- **Animated page transition:** `useTransition().startTransition(offering, imageRect, textRect, categoryRect)` triggers a GSAP FLIP-style animation then navigates to `/course/:id`. Overlays use z-indices 30–35; header is z-40. See [context/TransitionContext.tsx](context/TransitionContext.tsx).
- **Transition debugging:** `TransitionProvider` exposes `debugMode`/`toggleDebug()` to draw bounding boxes and log key phases.

**Data & Content**
- **Offerings:** Add/edit entries in `OFFERINGS` with stable `id`, `category`, `qualification`, `programmeTypes`, `shortDescription`, and `video` (preferred). Full page details extend via `COURSE_DETAILS` keyed by the same `id` in [constants.tsx](constants.tsx).
- **E‑commerce toggle:** In [components/MegaMenu.tsx](components/MegaMenu.tsx#L23-L30), `checkIsEcommerce()` returns true for specific `id`s to switch “Apply Now” → “Buy Now”. Update this when adding purchasable items.
- **Nav & admissions:** Top-level nav link sets live in `NAV_LINKS`, `ADMISSIONS_LINKS`, `EXPERIENCES_LINKS` within [constants.tsx](constants.tsx).

**UI & Styling**
- **Utilities:** Project uses utility-like classNames (e.g., `bg-brand-primary`, `text-brand-accent`) alongside bespoke animation utilities defined in [index.css](index.css) (e.g., `hero-enter`, `hero-exit`, `animate-progress-load`). Prefer reusing these.
- **Buttons:** Use [components/ui/Button.tsx](components/ui/Button.tsx) with `variant` (`primary`, `secondary`, `gold`, `outline-gold`, etc.) and `size`. Keep uppercase/weight conventions.
- **Animation helpers:** Reusable configs in [utils/overlayAnimations.ts](utils/overlayAnimations.ts) + hook [utils/useAnimation.ts](utils/useAnimation.ts) for open/closed state classes.

**Component Patterns**
- **Home composition:** Home is a composition of sections (`Hero`, `ValuePillars`, `GuidanceSupport`, `LogoSlider`, `CoreOfferings` or `ProgrammeMultiGroup`, `SuccessFramework`, etc.). Toggle programme section via `useLayout().programmeDisplay` in [App.tsx](App.tsx#L12-L32).
- **Course detail navigation:** Prefer transition flow (see above) over direct `Link` when launching from visual cards so the hero/video overlay aligns with destination.
- **Compare bar:** Use `useCompare().addToCompare(offering)` to populate the persistent [components/CompareBar.tsx](components/CompareBar.tsx); modal is [components/CompareModal.tsx](components/CompareModal.tsx).
- **Cart:** Use `useCart()` for add/remove/toggle. Cart opens automatically on add (see [context/CartContext.tsx](context/CartContext.tsx)).

**Gotchas**
- `HashRouter` is required: don’t switch to `BrowserRouter` unless hosting provides SPA rewrites (Netlify is configured, but local/dev tooling assumes hash-based).
- Transition overlays assume header height 80px and specific z-index ordering; keep new overlays ≤ z-39 unless intentionally above header.
- Prefer `video` over `image` media in `OFFERINGS` for hover/transition parity.

If any of the above is unclear (especially styling tokens like `bg-brand-*` or the transition entry points), ask to confirm the source of brand CSS and the intended transition trigger APIs before proceeding.
