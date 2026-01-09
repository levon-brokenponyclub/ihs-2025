# Hero Section Documentation

## Overview
The Hero section is a full-viewport immersive experience featuring auto-advancing video slides with compelling content and navigation controls.

## Layout Structure
```
┌─────────────────────────────────────────────────────────────┐
│                                                            │
│  ┌─────────────────┐ ┌─────────────────────────────────┐   │
│  │                 │ │  Hero Content                     │   │
│  │   Video/Image   │ │  ┌─────────────────────────────┐ │   │
│  │   Background    │ │  │ ━━━━ Title ━━━━             │ │   │
│  │                 │ │  │ Subtitle                     │ │   │
│  │                 │ │  │ ┌─────┐ ┌─────┐              │ │   │
│  │                 │ │  │ │ CTA │ │ CTA │              │ │   │
│  │                 │ │  └─────────────────────────────┘ │   │
│  └─────────────────┘ └─────────────────────────────────┘   │
│                                                            │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ ◯ ◯ ◯ Navigation Dots with Progress Bars           │   │
│  │ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                            │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ Apply Now CTA                                        │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

## Content Slides

### Slide Data Structure
```typescript
const SLIDES = [
  {
    id: 0,
    preTitle: "Get started",
    title: "Study with us",
    description: "...",
    type: 'video',
    src: "video-url",
    poster: "image-url",
    primaryBtn: { label: "Find a Programme", icon: Search, action: 'finder' },
    secondaryBtn: { label: "Apply Now", icon: ArrowRight, action: 'link' },
    theme: 'navy'
  },
  // ... more slides
];
```

### Slide Content
1. **"Study with us"** - Culinary training video
2. **"Training Solutions"** - Corporate solutions video
3. **"New Programmes"** - Hotel operations video

## Visual Design

### Background System
- **Base**: Dark blue (`bg-brand-primary`)
- **Video**: Auto-play, muted, looped
- **Overlays**: Gradient masks for text readability
- **Fallback**: Poster images during video load

### Typography Hierarchy
```css
.preTitle: text-sm font-bold tracking-widest uppercase text-brand-accent
.title: font-serif text-5xl md:text-6xl lg:text-7xl text-text-inverse
.description: text-lg leading-relaxed text-text-inverse/90
```

### Color Scheme
- **Primary**: Deep space blue background
- **Accent**: Gold for highlights and CTAs
- **Text**: White with 90% opacity for descriptions
- **Buttons**: Gold primary, white secondary

## Interactive Elements

### Navigation Dots
- **Position**: Bottom of hero, centered
- **States**: Active (gold) vs inactive (white/30%)
- **Progress**: Animated gold bars showing time remaining
- **Interaction**: Click to jump to specific slide

### Call-to-Action Buttons
```jsx
<Button variant="primary" icon={<Search />}>
  Find a Programme
</Button>
<Button variant="secondary" icon={<ArrowRight />}>
  Apply Now
</Button>
```

### Bottom CTA Section
- **Background**: Alternating card backgrounds
- **Layout**: 4-column grid on desktop
- **Content**: Slide titles with "Apply Now" CTA
- **Animation**: Hover effects and active states

## Animations & Transitions

### Slide Transitions
```css
transition-all duration-1000 ease-in-out
opacity: active ? 1 : 0
transform: active ? translateX(0) : translateX(-10px)
```

### Auto-Advance System
```javascript
useEffect(() => {
  const timer = setInterval(() => {
    setActiveSlide((prev) => (prev + 1) % SLIDES.length);
  }, 8000);
  return () => clearInterval(timer);
}, []);
```

### Progress Bar Animation
```css
@keyframes progress {
  0% { width: 0%; }
  100% { width: 100%; }
}
.animate-progress-load {
  animation: progress 8s linear infinite;
}
```

### Content Animation
- **Fade-in**: 700ms duration with easing
- **Stagger**: 200ms delays between elements
- **Direction**: Slide from right on inactive slides

## Technical Implementation

### State Management
```typescript
const [activeSlide, setActiveSlide] = useState(0);
const [isVideoLoaded, setIsVideoLoaded] = useState(false);
```

### Video Handling
```jsx
<video
  autoPlay
  muted
  loop
  playsInline
  onLoadedData={() => setIsVideoLoaded(true)}
  className="absolute inset-0 w-full h-full object-cover scale-105"
>
  <source src={slide.src} type="video/mp4" />
</video>
```

### Responsive Design
- **Mobile**: Stacked layout, smaller text
- **Tablet**: Adjusted spacing and typography
- **Desktop**: Full grid layout with mega-menu potential

### Performance Optimizations
- **Video Loading**: Poster images as fallbacks
- **Lazy Loading**: Videos load only when needed
- **Scale**: 105% scale for cinematic effect
- **Optimization**: `playsInline` for mobile performance

## Accessibility Features

### Keyboard Navigation
- **Tab Order**: Logical navigation through interactive elements
- **Focus Indicators**: Visible focus rings
- **ARIA Labels**: Screen reader support

### Motion Preferences
- **Reduced Motion**: Respects user preferences
- **Pause on Focus**: Auto-advance pauses when focused

### Alternative Content
- **Poster Images**: Visual fallback for video content
- **Alt Text**: Descriptive text for screen readers
- **Captions**: Potential for video captioning

## Integration Points

### Route Navigation
- **Programme Finder**: Opens modal or navigates to search
- **Apply Now**: Scrolls to application section or opens modal
- **Corporate Enquiries**: Contact form or dedicated page

### Context Integration
- **Cart Context**: Potential for programme selection
- **Compare Context**: Programme comparison features

### Analytics Tracking
- **Slide Views**: Track which slides are viewed
- **CTA Clicks**: Monitor conversion actions
- **Time Spent**: User engagement metrics

## CSS Classes Reference

### Layout Classes
- **Container**: `relative h-[calc(100vh-40px)] min-h-[600px] flex flex-col`
- **Content Grid**: `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`
- **Video Container**: `absolute inset-0 z-0 bg-brand-primary overflow-hidden`

### Animation Classes
- **Slide Transition**: `transition-all duration-700 ease-out transform`
- **Progress Bar**: `animate-progress-load`
- **Content Fade**: `transition-all duration-700 ease-out`

### Interactive Classes
- **Button Hover**: `hover:scale-105 transition-transform`
- **Navigation Active**: `bg-brand-surface`
- **Progress Active**: `bg-brand-accent`

This hero section creates an immersive first impression with dynamic video content, smooth animations, and clear call-to-action pathways.