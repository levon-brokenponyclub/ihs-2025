# Animation Merge Summary

## Overview
This document outlines the animations found in the old AI Studio files and how they will be integrated into the updated local files.

## Old AI Studio Files vs Updated Local Files

### Key Differences:
1. **Old files** (`/ihs-2025/old-files/`): Have GSAP animations but outdated content/structure
2. **Updated files** (`/ihs-2025/`): Have correct content, layout, and Tailwind but NO animations

---

## Animations Found in Old AI Studio Files

### 1. **CoreOfferings.tsx** - Card Expansion Animation
**Location:** Lines 351-409 in old file  
**Type:** GSAP Timeline Animation  
**Purpose:** Animates card expansion when clicking to view course details

#### Animation Details:
- **Trigger:** Click on course card
- **Elements Animated:**
  - Video/image container (clone element)
  - Overlay element
  
#### Animation Phases:
1. **Phase 1 (0-400ms):** Horizontal expansion
   - Expands to full viewport width
   - Maintains current vertical position
   - Border radius transitions to 0
   - Easing: `power2.inOut`

2. **Phase 2 (400-800ms):** Vertical expansion + overlay
   - Expands to full viewport height
   - Moves to top of viewport
   - Blue overlay fades in
   - Easing: `power2.inOut`

#### GSAP Code Structure:
```javascript
const tl = gsap.timeline({
  onComplete: () => {
    navigate(`/course/${offering.id}`, { state: { fromTransition: true } });
  }
});

// Phase 1: Horizontal
tl.to(clone, {
  left: 0,
  width: '100vw',
  borderRadius: 0,
  duration: 0.4,
  ease: "power2.inOut"
});

// Phase 2: Vertical + Overlay
tl.to(clone, {
  top: 0,
  height: '100vh',
  duration: 0.4,
  ease: "power2.inOut"
}, "-=0.1");

tl.to(overlay, {
  opacity: 1,
  duration: 0.4,
  ease: "power1.inOut"
}, "<");
```

---

### 2. **CourseDetail.tsx** - Entrance Animation
**Location:** Lines 370-402 in old file  
**Type:** GSAP Timeline Animation  
**Purpose:** Animates content fade-in when entering course detail page

#### Animation Details:
- **Trigger:** Page load / component mount
- **Elements Animated:**
  - Hero content area (title, metadata, etc.)
  - Main content area (overview, curriculum, etc.)

#### Animation Behavior:
1. **From Transition:** If coming from card expansion
   - Hero content: `y: 30, opacity: 0` → `y: 0, opacity: 1`
   - Main content: `y: 50, opacity: 0` → `y: 0, opacity: 1`
   - Duration: 800ms each
   - Overlap: 600ms (starts 200ms after hero)

2. **Standard Load:** If navigating directly to page
   - Same animation as above
   - No delay

#### GSAP Code Structure:
```javascript
const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

if (isFromTransition) {
  gsap.set(heroContentRef.current, { y: 30, opacity: 0 });
  gsap.set(contentRef.current, { y: 50, opacity: 0 });
  
  tl.to(heroContentRef.current, { y: 0, opacity: 1, duration: 0.8 }, 0.05)
    .to(contentRef.current, { y: 0, opacity: 1, duration: 0.8 }, "-=0.6");
} else {
  // Same animation without delay
}
```

---

## Current State of Updated Files

### CoreOfferings.tsx (Updated - NO GSAP)
- Uses CSS transitions only
- Has expansion animation using React state + CSS
- Less smooth than GSAP version
- Different ref usage (`cardRef` instead of `mediaRef`)

### CourseDetail.tsx (Updated - NO GSAP)
- Has the same structure and refs
- NO entrance animations
- Content already visible on load

---

## Dependencies Needed

### Package.json Updates:
```json
{
  "dependencies": {
    "gsap": "^3.12.5"
  }
}
```

---

## Migration Strategy

### Step 1: Install GSAP
```bash
npm install gsap@^3.12.5
```

### Step 2: Update CoreOfferings.tsx
1. Import GSAP
2. Add refs for clone and overlay
3. Replace CSS-based transition with GSAP timeline
4. Update `handleCardExpand` function
5. Add comment annotations for tracking

### Step 3: Update CourseDetail.tsx
1. Import GSAP
2. Add entrance animation useEffect
3. Detect transition state from location
4. Add comment annotations for tracking

### Step 4: Test
1. Verify card expansion animation
2. Verify entrance animation
3. Verify navigation flow
4. Test responsive behavior

---

## Files to Merge

1. ✅ **CoreOfferings.tsx** - Card expansion animation
2. ✅ **CourseDetail.tsx** - Entrance animation
3. ✅ **package.json** - Add GSAP dependency

---

## Notes

- All animations use React refs and useEffect hooks
- GSAP syntax is React-compatible
- Animations preserve all updated content and Tailwind styling
- Responsive behavior maintained
- No breaking changes to existing functionality
