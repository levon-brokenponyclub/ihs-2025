# International Hotel School - Style Guide

## 1. Color Palette

### Brand Colors
- **Primary (Deep Space Blue)**: `#002845`
  - Tailwind Class: `bg-brand-primary`, `text-brand-primary`
- **Accent (Sand/Gold)**: `#c5a059`
  - Tailwind Class: `bg-brand-accent`, `text-brand-accent`
- **Highlight (Blue Bell)**: `#1BA1FF`
- **Surface (Bright Snow)**: `#F8FAFC`
  - Tailwind Class: `bg-brand-surface`

### Text Colors
- **Primary Text**: Dark Blue (`text-brand-primary`)
- **Inverse Text**: White (`text-text-inverse`)
- **Muted Inverse**: White with 90% opacity (`text-text-inverse/90`)
- **Inactive**: White with 30% opacity (e.g., navigation dots)

---

## 2. Typography

### Font Families
- **Headings**: Libre Caslon Condensed (Serif)
- **Body**: Inter (Sans-serif)

### Hierarchy
- **Hero Title**: `font-serif text-5xl md:text-6xl lg:text-7xl text-text-inverse`
- **Hero Pre-Title**: `text-sm font-bold tracking-widest uppercase text-brand-accent`
- **Hero Description**: `text-lg leading-relaxed text-text-inverse/90`
- **Navigation Links**: Bold, uppercase, tracking-wide

---

## 3. Components

### Buttons

#### Primary Button
- **Appearance**: Gold background, often with icon.
- **Usage**: Main CTAs (e.g., "Find a Programme", "Apply Now").
- **Hover**: Scale effect.
- **Example JSX**:
  ```jsx
  <Button variant="primary" icon={<Search />}>
    Find a Programme
  </Button>
  ```

#### Secondary Button
- **Appearance**: White background or border.
- **Usage**: Secondary actions.
- **Example JSX**:
  ```jsx
  <Button variant="secondary" icon={<ArrowRight />}>
    Apply Now
  </Button>
  ```

#### Action Buttons (Header)
- **Search/Cart**: Circular buttons.
- **Hover**: Scale and color transitions.

### Header

- **Height**: 64px (`h-16`)
- **Background States**:
  - **Transparent**: `bg-transparent py-4 border-b border-white/5` (Top of page)
  - **Opaque**: `bg-white shadow-xl py-2 border-b border-border-subtle` (Scrolled > 50px)
- **Utility Bar**:
  - Background: `bg-white`
  - Border: `border-b border-border-subtle`
  - Text: `text-brand-primary`
- **Navigation Links**:
  - Hover: `text-brand-accent` with underline animation.
  - Underline Animation: `transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100 origin-left`

### Hero Section

- **Container**: `relative h-[calc(100vh-40px)] min-h-[600px] flex flex-col`
- **Video Overlay**: Gradient masks for text readability.
- **Navigation Dots**:
  - Active: Gold (`bg-brand-accent`)
  - Inactive: White/30%
  - Progress Bar: Animated gold bars (`animate-progress-load`)

### Cards

#### Value Pillars
- **Background**: White
- **Style**: Subtle shadows and borders.
- **Hover**: Lift effect (`-translate-y-2`), icon color change.

#### Guidance Support (Stacked)
- **Style**: White with 2px borders, rounded corners, shadows.
- **Interaction**: Stacked with `translateY()` and `scale()` transforms.

### Modals
- **Usage**: Programme details, Programme Finder, Application forms.
- **Style**: Clean layouts, typically white backgrounds with high z-index overlays.

---

## 4. Layout & Spacing

- **Container Width**: `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`
- **Grid System**: Responsive grids (CSS Grid & Flexbox).
- **Hero Height**: `calc(100vh-40px)`

---

## 5. Animations

### General
- **Default Duration**: 300ms
- **Major Transitions**: 700ms
- **Easing**: `cubic-bezier(0.4, 0, 0.2, 1)`

### Specific Animations
- **Fade In**: `transition-all duration-700 ease-out`
- **Hover Scale**: `hover:scale-105 transition-transform`
- **Mobile Menu Slide**: `translateX(-100%)` to `0` (300ms)
- **Logo Slider**: Continuous linear scroll (40s)

---

## 6. Icons
- **Library**: Lucide React
- **Common Icons**: `Search`, `ArrowRight`, `Menu`, `X`, `ShoppingBag`, `Globe`, `Award`, `TrendingUp`.
- **Styling**: Often paired with circular backgrounds or gold accents on hover.