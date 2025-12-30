# Animation Specifications - Technical Details

## 🎬 Animation 1: Card Expansion (CoreOfferings.tsx)

### File Location
**Component:** `components/CoreOfferings.tsx`  
**Function:** `handleCardExpand()` (lines 352-409)  
**Trigger:** User clicks course card

### Timeline Structure

```
Total Duration: 800ms
├─ Phase 1: Horizontal Expansion (0-400ms)
│  ├─ Property: left
│  │  └─ From: rect.left → To: 0px
│  ├─ Property: width
│  │  └─ From: rect.width → To: 100vw
│  ├─ Property: borderRadius
│  │  └─ From: 2px → To: 0px
│  ├─ Duration: 400ms
│  └─ Easing: power2.inOut
│
└─ Phase 2: Vertical Expansion + Overlay (300-800ms)
   ├─ Clone Element:
   │  ├─ Property: top
   │  │  └─ From: rect.top → To: 0px
   │  ├─ Property: height
   │  │  └─ From: rect.height → To: 100vh
   │  ├─ Duration: 400ms
   │  └─ Easing: power2.inOut
   │
   └─ Overlay Element:
      ├─ Property: opacity
      │  └─ From: 0 → To: 1
      ├─ Duration: 400ms
      └─ Easing: power1.inOut

Overlap: 100ms (starts at 300ms mark)
Callback: Navigate to course detail page
```

### Initial State Setup
```javascript
gsap.set(clone, {
    position: 'fixed',
    top: rect.top,        // Card's current position
    left: rect.left,
    width: rect.width,
    height: rect.height,
    zIndex: 40,           // Below header (50), above content
    borderRadius: '2px'   // Match card radius
});

gsap.set(overlay, { 
    opacity: 0 
});
```

### Animation Code
```javascript
const tl = gsap.timeline({
    onComplete: () => {
        navigate(`/course/${offering.id}`, { state: { fromTransition: true } });
        setTimeout(() => setExpandingOffering(null), 100);
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

// Phase 2: Vertical + Overlay (with 100ms overlap)
tl.to(clone, {
    top: 0,
    height: '100vh',
    duration: 0.4,
    ease: "power2.inOut"
}, "-=0.1");  // Starts 100ms before phase 1 completes

tl.to(overlay, {
    opacity: 1,
    duration: 0.4,
    ease: "power1.inOut"
}, "<");  // Starts at same time as vertical expansion
```

### Visual Flow
```
[Card at position X,Y]
         ↓ (0-400ms)
[Card expands horizontally to full width]
         ↓ (300-700ms - starts 100ms early)
[Card expands vertically to full height]
[Overlay fades in simultaneously]
         ↓ (800ms)
[Navigation fires]
```

---

## 🎬 Animation 2: Entrance (CourseDetail.tsx)

### File Location
**Component:** `components/CourseDetail.tsx`  
**Effect:** `useEffect()` (lines 375-408)  
**Trigger:** Component mount / ID change

### Timeline Structure

```
Condition: From Transition
├─ Delay: 50ms
├─ Hero Content Animation (50-850ms)
│  ├─ Property: y (translateY)
│  │  └─ From: 30px → To: 0px
│  ├─ Property: opacity
│  │  └─ From: 0 → To: 1
│  ├─ Duration: 800ms
│  └─ Easing: power2.out
│
└─ Main Content Animation (250-1050ms)
   ├─ Property: y (translateY)
   │  └─ From: 50px → To: 0px
   ├─ Property: opacity
   │  └─ From: 0 → To: 1
   ├─ Duration: 800ms
   ├─ Easing: power2.out
   └─ Overlap: 600ms (starts 200ms after hero begins)

Total Duration: 1050ms
Overlap Strategy: Main content starts while hero is still animating
```

### Initial State Setup
```javascript
if (isFromTransition) {
    // Coming from card expansion
    gsap.set(heroContentRef.current, { 
        y: 30,      // Slightly down
        opacity: 0  // Invisible
    });
    
    gsap.set(contentRef.current, { 
        y: 50,      // More down than hero
        opacity: 0  // Invisible
    });
}
```

### Animation Code (From Transition)
```javascript
const tl = gsap.timeline({ 
    defaults: { ease: "power2.out" } 
});

const startDelay = 0.05;  // 50ms to sync with expansion

tl.to(heroContentRef.current, { 
    y: 0,              // Slide up to normal position
    opacity: 1,        // Fade in
    duration: 0.8      // Over 800ms
}, startDelay)         // Start after 50ms delay

.to(contentRef.current, { 
    y: 0,              // Slide up to normal position
    opacity: 1,        // Fade in
    duration: 0.8      // Over 800ms
}, "-=0.6");          // Start 600ms before hero completes
```

### Animation Code (Direct Load)
```javascript
// Same animations, no delay
tl.to(heroContentRef.current, { 
    y: 0, 
    opacity: 1, 
    duration: 0.8 
})
.to(contentRef.current, { 
    y: 0, 
    opacity: 1, 
    duration: 0.8 
}, "-=0.6");
```

### Visual Flow
```
[Page loads with hero & content invisible]
         ↓ (50ms wait if from transition)
[Hero content starts sliding up and fading in]
         ↓ (200ms into hero animation)
[Main content starts sliding up and fading in]
         ↓ (600ms - hero completes)
[Hero fully visible]
         ↓ (200ms later - 800ms total)
[Main content fully visible]
         ✓ Animation complete
```

---

## 📐 Easing Curves Explained

### power2.inOut
**Used in:** Card expansion  
**Behavior:** Slow start → Fast middle → Slow end  
**Why:** Creates dramatic, professional expansion feeling  
**Curve:** Quadratic (x²)

### power1.inOut
**Used in:** Overlay fade  
**Behavior:** Gentle acceleration and deceleration  
**Why:** Subtle, doesn't compete with main expansion  
**Curve:** Linear-like but smoother

### power2.out
**Used in:** Entrance animations  
**Behavior:** Fast start → Slow end  
**Why:** Snappy entrance, settling gently  
**Curve:** Quadratic deceleration

---

## 🎯 Timing Breakdown

### Complete User Journey Timeline

```
0ms     User clicks card
        ↓
0ms     GSAP sets initial clone state
        ↓
0-400ms Phase 1: Horizontal expansion
        ↓
300ms   Phase 2 starts (100ms overlap)
        ↓
300-700ms Phase 2: Vertical expansion + overlay fade
        ↓
800ms   Navigation fires
        ↓
800ms   CourseDetail page mounts
        ↓
850ms   Hero content starts animating (50ms delay)
        ↓
1050ms  Main content starts (200ms into hero)
        ↓
1450ms  Hero animation completes
        ↓
1650ms  Main content completes
        ✓
        All animations complete
        Total: ~1650ms (1.65 seconds)
```

---

## 🔧 Key Properties & Values

### Z-Index Layers
```
Header:            z-50
Expansion Clone:   z-40
Hero Overlay:      z-45
Hero Content:      z-50
Main Content:      z-10
```

### Transform Properties
```javascript
// Card Expansion
{
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    borderRadius: 0
}

// Entrance Animation
{
    transform: 'translateY(0px)',  // from 30px or 50px
    opacity: 1                      // from 0
}
```

### Colors
```javascript
// Overlay background
bg-[#0a3355]/80  // Dark blue at 80% opacity
```

---

## 🎨 Customization Parameters

### Speed Adjustments
```javascript
// Make it faster (reduce duration)
duration: 0.3,  // Instead of 0.4

// Make it slower (increase duration)
duration: 0.6,  // Instead of 0.4
```

### Distance Adjustments
```javascript
// Less movement
gsap.set(heroContentRef.current, { y: 15, opacity: 0 });

// More movement  
gsap.set(heroContentRef.current, { y: 60, opacity: 0 });
```

### Overlap Adjustments
```javascript
// More overlap (smoother blend)
}, "-=0.8");  // Instead of -=0.6

// Less overlap (more distinct phases)
}, "-=0.4");  // Instead of -=0.6
```

### Delay Adjustments
```javascript
// Longer delay for sync
const startDelay = 0.1;  // Instead of 0.05

// No delay
const startDelay = 0;
```

---

## 📊 Performance Metrics

### Target Performance
- **Frame Rate:** 60fps
- **Animation Duration:** 800ms (expansion), 800ms (entrance)
- **Total Transition Time:** ~1.65s
- **GPU Acceleration:** Yes (transforms)
- **Memory:** Minimal (refs cleanup)

### Browser Support
- **Chrome/Edge:** Full support
- **Firefox:** Full support  
- **Safari:** Full support
- **Mobile:** Optimized

---

## 🧪 Testing Values

### Card Positions to Test
```javascript
// Top-left card
rect = { top: 100, left: 20, width: 320, height: 400 }

// Center card
rect = { top: 300, left: 640, width: 320, height: 400 }

// Bottom-right card
rect = { top: 600, left: 1260, width: 320, height: 400 }
```

All should expand smoothly to full viewport regardless of starting position.

---

## 💡 Implementation Notes

1. **RequestAnimationFrame:** Used to ensure refs are populated before GSAP runs
2. **Timeline Cleanup:** `tl.kill()` prevents memory leaks on unmount
3. **State Detection:** `location.state?.fromTransition` determines animation path
4. **Ref Strategy:** Direct DOM manipulation via refs (faster than React re-renders)
5. **Navigation Timing:** Callback ensures page change happens after visual completion

---

## 🎯 Success Criteria

Animation is working correctly if:
- ✅ Card expands smoothly in two distinct phases
- ✅ Overlay fades in during vertical expansion
- ✅ Navigation occurs at exact right moment
- ✅ Hero content fades up elegantly
- ✅ Main content follows with visible overlap
- ✅ No visible jump cuts or jarring transitions
- ✅ Runs at 60fps on modern devices
- ✅ Works identically across browsers

---

**Technical specifications complete!** ✨

For implementation details, see:
- `ANIMATION_MERGE_COMPLETE.md` - Full merge report
- `ANIMATION_QUICK_REFERENCE.md` - Quick testing guide
- `ANIMATION_MERGE_SUMMARY.md` - Initial analysis
