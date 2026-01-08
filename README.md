# International Hotel School — Landing Page

A React + TypeScript + Tailwind (CDN) landing page for International Hotel School.

## Local development

Install dependencies and start the Vite dev server:

```bash
npm install
# start dev server (default 5173)
npm run dev -- --host 0.0.0.0
```

Open http://localhost:5173 in your browser.

## Build

```bash
npm run build
```

## Docker (optional)

A `start.sh` script is included for Docker-based runs. Make it executable and run:

```bash
chmod +x start.sh
APP_PORT=5174 ./start.sh
```

## Notes

- Type checking: `npx tsc --noEmit`.
- If you hit type errors from unused locals/params, they're relaxed in `tsconfig.json` to ease incremental fixes.
- This repo uses Vite; dev commands are in `package.json`.

## Project layout

- `components/` — React components
- `context/` — React Context providers
- `constants.tsx` — static site data
- `types.ts` — TypeScript types
- `index.tsx` — app entry
