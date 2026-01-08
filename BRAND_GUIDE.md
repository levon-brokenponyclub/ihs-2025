# Brand Guide - International Hotel School

This guide documents the visual identity, styling rules, and UI components used in the IHS landing page to ensure consistency across all elements.

---

## 🎨 Color Palette

The project uses a sophisticated, premium palette designed to convey authority and excellence in hospitality.

### Brand Colors

| Color | Hex | Usage | Variations (TS) |
| :--- | :--- | :--- | :--- |
| **Brand Primary / Dark** | `#002B4E` | Main backgrounds, headers, primary text, footers. | `text-brand-primary`, `bg-brand-primary`, `text-brand-primary/50` |
| **Brand Gold / Accent** | `#C2B067` | Accents, buttons, icons, highlights, borders. | `text-brand-accent`, `bg-brand-gold`, `border-brand-gold` |
| **Brand Gold Hover** | `#B09F58` | Interactive states for gold elements. | `hover:bg-brand-goldHover`, `hover:text-brand-goldHover` |
| **Brand Soft** | `#1E3A8A` | Secondary brand applications. | `text-brand-soft`, `bg-brand-soft` |
| **Highlight** | `#002B4E` | Selection background and focus states. | `selection:bg-brand-gold` |

### Surface & Neutral

| Color | Hex | Usage | Variations (TS) |
| :--- | :--- | :--- | :--- |
| **Surface Main** | `#F8FAFC` | Light mode backgrounds, secondary sections. | `bg-surface-main`, `text-gray-900` |
| **Surface Subtle** | `#FFFFFF` | Card backgrounds, input fields. | `bg-surface-subtle`, `text-white` |
| **Border Subtle** | `#E2E8F0` | Dividers, subtle framing. | `border-border-subtle`, `border-gray-200` |
| **Text Primary** | `#002B4E` | Default body and heading text. | `text-text-primary`, `text-brand-primary` |
| **Text Secondary** | `#475569` | Muted descriptions and metadata. | `text-text-secondary`, `text-gray-400`, `text-gray-600` |

---

## typography

The app uses a two-font system to balance modern readability with classical elegance.

### 1. Inter (Sans-serif)
- **Weights**: 300, 400, 500, 600, 700
- **Usage**: Body text, navigation links, UI buttons, metadata, and form inputs.
- **Tailwind Class**: `font-sans`
- **Variations**: `text-xs`, `text-sm`, `text-base`, `text-lg`, `text-xl`, `font-light`, `font-normal`, `font-medium`, `font-semibold`, `font-bold`

### 2. Playfair Display (Serif)
- **Weights**: 400 (Regular & Italic), 600, 700
- **Usage**: Main headings (H1, H2), editorial quotes, premium section titles, and emphasized labels.
- **Tailwind Class**: `font-serif`
- **Variations**: `text-2xl`, `text-3xl`, `text-4xl`, `text-5xl`, `italic`, `font-bold`

---

## ✨ Animations & Transitions

Animations are a core part of the "cinematic" brand identity.

### Motion Principles
- **Timing Function**: `cubic-bezier(0.76, 0, 0.24, 1)` (Custom ease for smooth, premium motion).
- **FLIP Technique**: Shared elements (like course images) animate smoothly between the archive and detail views.
- **Staggering**: Items in lists or menus enter with sequential delays (`150ms`, `250ms`, `350ms`).

### Specific Animations
- **Marquee**: Used for accreditation logos.
  - `marquee-left`: 60s (Mobile) / 40s (Desktop).
- **Entrance**:
  - `fadeIn`: 0.5s ease-out.
  - `slideUp`: 0.8s ease-out with a 20px Y-offset.
- **Hover Transitions**: 300ms duration for color and transform shifts.

---

## 🍱 UI Components & Patterns

### Buttons
- **Primary**: Brand Gold background (`#C2B067`) with Navy text.
- **Secondary/Outline**: Transparent background with Gold border and text.
- **Action**: Hover state usually involves a slight lift (Y-translation) or background darkening.

### Cards
- **Course Cards**: feature a video loop on hover, transition-ready images, and category badges.
- **Corner Radius**: `rounded-sm` (Standard), `rounded` (UI elements), `rounded-lg` (Cards), `rounded-full` (Pills/Icons).
- **Shadows**: Subtle shadows (`shadow-sm` or custom `shadow-2xl` during transitions) to separate layers.

### Modals & Trays
- **Overlay Tray**: Dominant animation using `scale-x-100` and `transform-origin-right` for a "drawer" feel.
- **Comparison Bar**: Fixed at the bottom of the viewport, providing quick access to selected programmes.

---

## 🛠️ Implementation Details

### Tailwind Extension
The colors and fonts are extended in the Tailwind configuration found in `index.html`:

```javascript
tailwind.config = {
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#002B4E',
          gold: '#C2B067',
          // ... other brand colors
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      }
    }
  }
}
```

### CSS Utilities
- **Scrollbars**: Styled to match the brand (`#002B4E` track with `#C2B067` thumb).
- **Selection**: `selection:bg-brand-gold selection:text-brand-dark`.
