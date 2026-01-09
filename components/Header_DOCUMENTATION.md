# Header Component Documentation

## Overview
The Header component is a fixed navigation bar at the top of the page with transparent-to-opaque transition on scroll.

## Layout Structure
```
┌─────────────────────────────────────────────────────────────┐
│ Utility Bar (hidden on mobile)                              │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ Student Portal │ Alumni │ Careers │ Phone │ Email      │ │
│ └─────────────────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────────────────┤
│ Main Header                                                  │
│ ┌───┐ ┌─────────────────────────────────────┐ ┌─────────┐ │
│ │Logo│ │ Navigation Links                   │ │Actions   │ │
│ └───┘ └─────────────────────────────────────┘ └─────────┘ │
└─────────────────────────────────────────────────────────────┘
```

## Sections

### Utility Bar
- **Visibility**: Hidden on screens smaller than `lg` (1024px)
- **Background**: White (`bg-white`)
- **Border**: Subtle border bottom (`border-border-subtle`)
- **Padding**: 8px top/bottom (`py-2`)
- **Text Color**: Dark blue (`text-brand-primary`)

**Links:**
- Student Portal, Alumni, Careers
- Hover effect: Gold accent color

**Contact Info:**
- Phone: +27 12 345 6789 with phone icon
- Email: info@hotelschool.co.za with mail icon
- Icons: Gold accent color

### Main Header
- **Height**: 64px (`h-16`)
- **Background**: Transparent → White on scroll
- **Transition**: 300ms duration

#### Logo Section
```
┌─────────────┐
│  ●         │
│ International │
│  Hotel School │
└─────────────┘
```
- Circular "I" mark with gold background
- "International" and "Hotel School" text
- Hover: Scale effect on circular mark

#### Navigation
- Links: Our Programmes, Admissions, Experiences, News, Contact Us
- Font: Bold, uppercase, tracking-wide
- Color: Dark blue (`text-brand-primary`)
- Hover: Gold accent with underline animation

**Our Programmes Special Features:**
- Chevron down icon
- Mega menu on hover (desktop only)

#### Action Buttons
- Search: Circular button with search icon
- Cart: Circular button with shopping bag icon + badge
- Apply Now: Primary gold button (hidden on mobile)

## Mobile Menu
- **Trigger**: Hamburger icon (28px, 1.5 stroke width)
- **Drawer**: 300px width, 85% max width
- **Background**: Brand primary dark
- **Animation**: Slide from left (300ms)

### Mobile Menu Structure
```
┌─────────────────────────────────┐
│ Menu                            │
│ ┌─────────────────────────────┐ │
│ │ ×                           │ │
│ └─────────────────────────────┘ │
├─────────────────────────────────┤
│ Navigation Links                │
│ ├─────────────────────────────┤ │
│ │ Secondary Links              │ │
│ ├─────────────────────────────┤ │
│ │ Contact & CTA                │ │
└─────────────────────────────────┘
```

**Navigation Levels:**
- Root level with main links
- Programmes submenu (slide animation)
- Full Time Learning sub-submenu

## Interactions

### Scroll Behavior
```javascript
const scrolled = window.scrollY > 50;
```
- Triggers background change from transparent to white
- Adds shadow and border
- Adjusts positioning for utility bar

### Hover Effects
- **Logo**: Circular mark scales 110%
- **Links**: Color change + underline animation
- **Buttons**: Scale and color transitions

### Mobile Interactions
- **Menu Button**: Toggles drawer visibility
- **Navigation**: Touch-friendly 48px touch targets
- **Links**: Smooth scroll for anchor links
- **Close**: X button or overlay click

## Animations

### Transition Classes
```css
transition-all duration-300 ease-out
```

### Underline Animation
```css
.absolute.bottom-0.left-0.w-full.h-0.5.bg-brand-accent
.transform.scale-x-0.transition-transform.duration-300
.group-hover:scale-x-100.origin-left
```

### Mobile Menu Animation
- **Slide**: `translateX(-100%)` to `translateX(0)`
- **Fade**: Overlay backdrop blur
- **Stagger**: 300ms delay for cleanup

## Responsive Design

### Breakpoints
- **Mobile** (`< 640px`): Hamburger menu, stacked actions
- **Tablet** (`640px - 1024px`): Horizontal actions, no utility bar
- **Desktop** (`> 1024px`): Full utility bar, mega menu

### Touch Targets
- Minimum 44px touch targets
- 8px spacing between interactive elements

## Accessibility

### Focus Management
- Visible focus outlines
- Keyboard navigation support
- ARIA labels for screen readers

### Color Contrast
- WCAG AA compliant ratios
- Clear visual hierarchy
- Sufficient color differentiation

## Technical Details

### Dependencies
- `react-router-dom`: Link components
- `lucide-react`: Icons (Menu, X, ShoppingBag, Search, etc.)
- `@/constants`: Navigation data
- `@/context/CartContext`: Cart state

### State Management
```typescript
const [scrolled, setScrolled] = useState(false);
const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
const [drawerStack, setDrawerStack] = useState<string[]>(['root']);
```

### Event Handlers
- `handleScroll`: Updates scrolled state
- `pushStack/popStack`: Mobile menu navigation
- `handleMouseEnter/Leave`: Mega menu timing

## CSS Classes Reference

### Background States
- **Transparent**: `bg-transparent py-4 border-b border-white/5`
- **Opaque**: `bg-white shadow-xl py-2 border-b border-border-subtle`

### Text Colors
- **Primary**: `text-brand-primary` (dark blue)
- **Inverse**: `text-text-inverse` (white)
- **Accent**: `text-brand-accent` (gold)

### Interactive States
- **Hover**: `hover:text-brand-accent`
- **Active**: `active:scale-95`
- **Focus**: `focus:outline-none focus:ring-2 focus:ring-brand-accent`

This header provides a comprehensive navigation experience with smooth animations, responsive design, and accessibility features.