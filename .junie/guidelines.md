# Project Guidelines - International Hotel School

This document provides project-specific information for advanced developers working on the IHS landing page.

## 1. Build & Configuration

### Prerequisites
- **Node.js**: v18+ (if running locally)
- **Docker & Docker Compose**: Recommended for consistent environments.
- **ngrok CLI**: Optional, for public tunneling.

### Environment Setup
1.  **Local Development**:
    ```bash
    npm install
    npm run dev
    ```
    Access at `http://localhost:5173`.

2.  **Docker Setup**:
    ```bash
    chmod +x start.sh
    ./start.sh
    ```
    This script builds the Docker container and optionally sets up an ngrok tunnel.

### Production Build
```bash
npm run build
```
Generates a `dist/` folder with optimized assets.

---

## 2. Testing Information

The project uses **Vitest** for unit and integration testing.

### Running Tests
To run tests once:
```bash
npx vitest run
```

To run tests in watch mode:
```bash
npx vitest
```

### Adding New Tests
1.  Create a file ending in `.test.ts` or `.test.tsx`.
2.  Import `describe`, `it`, and `expect` from `vitest`.
3.  Example Test (`utils/overlayAnimations.test.ts`):
    ```typescript
    import { describe, it, expect } from 'vitest';
    import { staggerItem } from './overlayAnimations';

    describe('overlayAnimations', () => {
      it('should calculate correct delay', () => {
        const config = staggerItem(250);
        expect(config.style?.transitionDelay).toBe('250ms');
      });
    });
    ```

### Component Testing
For component testing, consider adding `@testing-library/react` and `jsdom`.

---

## 3. Additional Development Information

### Styling & UI
- **Tailwind CSS**: Currently loaded via **CDN** in `index.html`. While `tailwind.config` is present in `index.html`, ensure any new utility classes are supported by the CDN version or added to the `extend` section of the inline config.
- **Fonts**: Inter, Playfair Display, and Merriweather are loaded via Google Fonts.
- **Icons**: Use `lucide-react`.

### Animations
- **GSAP**: Used for complex animations and scroll effects.
- **CSS Transitions**: Used for simple hover and entry states, often defined in `utils/overlayAnimations.ts`.

### Data Management
- **Centralized Constants**: Most content (courses, navigation, testimonials) is stored in `constants.tsx`. Avoid hardcoding text directly in components; update `constants.tsx` instead to maintain consistency.
- **Types**: All shared interfaces are located in `types.ts`.

### Project Patterns
- **Functional Components**: Use React functional components with Hooks.
- **Modals & Overlays**: Centralized in the `components/` directory (e.g., `CompareModal.tsx`, `WhatsAppPopup.tsx`).
- **Responsive Design**: Mobile-first approach is followed using Tailwind's responsive prefixes (`sm:`, `md:`, `lg:`).

### Debugging
- **Docker Logs**: Use `docker-compose logs -f app` to monitor the development server inside the container.
- **Vite HMR**: Hot Module Replacement is enabled; if it fails in Docker, ensure `usePolling: true` is set in `vite.config.ts`.
