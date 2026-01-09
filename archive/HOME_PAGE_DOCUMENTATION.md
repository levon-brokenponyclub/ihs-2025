# International Hotel School - Home Page Documentation

## Overview
This document provides a comprehensive description of the International Hotel School (IHS) home page, detailing each section's layout, styling, animations, interactions, and functionality.

## Page Structure & Flow

### 1. Header Component (`components/Header.tsx`)
**Position**: Fixed at top of page
**Layout**: Full-width horizontal bar
**Background**: Transparent on load, transitions to white on scroll
**Z-index**: 40 (high priority)

#### Sections:
- **Utility Bar** (hidden on mobile):
  - Background: White
  - Links: Student Portal, Alumni, Careers
  - Contact info: Phone +27 12 345 6789, Email info@hotelschool.co.za
  - Text color: Dark blue (`text-brand-primary`)

- **Main Header**:
  - Logo: IHS text logo with circular "I" mark
  - Navigation: Our Programmes (with dropdown), Admissions, Experiences, News, Contact Us
  - Actions: Search button, Shopping cart with badge, "Apply Now" CTA button
  - Mobile: Hamburger menu with sliding drawer navigation

#### Interactions:
- Scroll detection: Header becomes opaque white with shadow when scrolled >50px
- Logo hover: Scale animation on circular mark
- Navigation hover: Underline animation
- Mobile menu: Slide-in drawer with nested navigation levels
- Cart badge: Shows item count with red accent background

#### Animations:
- Smooth transitions (300ms) for background and text color changes
- Scale hover effects on interactive elements
- Slide animations for mobile menu

---

### 2. Hero Section (`components/Hero.tsx`)
**Position**: Full viewport height (calc(100vh-40px))
**Layout**: Two-column grid (image left, content right)
**Background**: Dark blue (`bg-brand-primary`) with video/image overlays

#### Content Structure:
- **Left Side**: Video background with overlay gradients
- **Right Side**: Content with navigation dots at bottom

#### Key Features:
- **Video Background**: Auto-playing, muted, looped culinary training video
- **Content Slides**: 3 slides that auto-advance every 8 seconds
- **Navigation**: Bottom dots for manual slide control with progress bars
- **CTAs**: Primary "Find a Programme" and secondary "Apply Now" buttons

#### Styling:
- **Typography**: Large serif headings (up to 7xl), white text with shadows
- **Buttons**: Gold primary buttons, white secondary with borders
- **Overlays**: Gradient overlays for text readability
- **Progress Bars**: Animated gold bars showing slide timing

#### Interactions:
- Auto-advance with pause on hover
- Manual navigation via bottom dots
- Button hover effects with scale transforms
- Video loads with poster image fallback

#### Animations:
- Slide transitions with opacity and transform changes (700ms)
- Progress bar animations (8s linear)
- Button hover scale effects
- Fade-in animations for content

---

### 3. Value Pillars (`components/ValuePillars.tsx`)
**Position**: Below hero
**Layout**: Light background section with 3-column grid
**Background**: Light gray (`bg-brand-surface`)

#### Content:
- **Three Cards**: Global Experience, World-class Qualification, Graduate Employed
- **Icons**: Globe, Award, TrendingUp from Lucide React
- **Hover Effects**: Lift animation and icon color change

#### Styling:
- **Cards**: White backgrounds with subtle shadows and borders
- **Icons**: Circular backgrounds that change from light to gold on hover
- **Typography**: Dark headings, muted secondary text
- **Spacing**: Generous padding and margins

#### Interactions:
- Hover lift effect (`-translate-y-2`)
- Icon background and color transitions
- Smooth opacity changes

#### Animations:
- Staggered fade-in on scroll (150ms delays)
- Transform animations for hover effects
- Intersection Observer triggers animations when 20% visible

---

### 4. Problem Awareness (`components/ProblemAwareness.tsx`)
**Position**: After value pillars
**Layout**: Dark section with centered content
**Background**: Dark blue (`bg-brand-primary`)

#### Content:
- **Heading**: "The Challenge of Choosing the Right Hospitality Programme"
- **Subtext**: Statistics about wrong choices and career impacts
- **Visual**: Warning-style layout with emphasis on consequences

#### Styling:
- **Typography**: White text with gold accents
- **Layout**: Centered text block with max-width constraints
- **Emphasis**: Bold statistics and warning language

#### Animations:
- Fade-in on scroll with Intersection Observer

---

### 5. Guidance Support (`components/GuidanceSupport.tsx`)
**Position**: After problem awareness
**Layout**: Two-column grid with stacked cards on right
**Background**: Dark with transparency (`bg-brand-card/30`)

#### Content Structure:
- **Left**: Autoplay video (muted, looped, no controls)
- **Right**: Stacked white cards with benefit descriptions

#### Card Stack Features:
- **5 Cards**: Stacked from large to small (top to bottom)
- **Colors**: Each card has unique colored circle (orange, blue, purple, red, orange)
- **Content**: Benefit title and description preview
- **Z-index**: Decreasing stack order (5, 4, 3, 2, 1)

#### Styling:
- **Cards**: White with 2px borders, rounded corners, shadows
- **Transforms**: `translateY()` for stacking, `scale()` for size progression
- **Background**: Black section with white card overlays

#### Animations:
- Permanent stacked state (no expansion)
- Smooth transforms creating depth effect
- Cards positioned with 25% vertical offsets for tight stacking

---

### 6. Logo Slider (`components/LogoSlider.tsx`)
**Position**: After guidance support
**Layout**: Full-width scrolling logo carousel
**Background**: Dark blue (`bg-[#062135]`)

#### Features:
- **11 Logos**: AHLEI, École Ducasse, Fairmont, Gordon Ramsay, Hilton, One&Only, Protea, RHG, Sommet Education, Sun International, IHS
- **Animation**: Continuous horizontal scroll (40s linear)
- **3D Effect**: Perspective container with cylindrical logo scaling
- **Fade Edges**: Gradient overlays on left/right edges

#### Styling:
- **Logos**: White/inverted with 155px width containers
- **Transforms**: `rotateY()` and `scale()` for 3D cylinder effect
- **Filters**: `brightness-0 invert-1` for white logos
- **Spacing**: 100px gaps between logo containers

#### Interactions:
- Pause on hover
- Smooth transitions
- Gradient fade edges for seamless looping

#### Animations:
- Continuous scroll animation
- 3D perspective transforms
- Hover pause functionality
- Fade edge gradients

---

### 7. Core Offerings (`components/CoreOfferings.tsx`)
**Position**: After logo slider
**Layout**: Light section with course/programme cards
**Background**: Light surface

#### Content:
- **Programme Cards**: Various hospitality and culinary programmes
- **Filters**: Study levels, focus areas, accreditations
- **Details**: Duration, qualification, pricing, start dates

#### Interactions:
- Filter dropdowns for programme discovery
- Hover effects on cards
- Modal/overlay for detailed views

#### Styling:
- **Cards**: Clean layouts with images and key information
- **Filters**: Dropdown selects with custom styling
- **Grid**: Responsive card layouts

---

### 8. Success Framework (`components/SuccessFramework.tsx`)
**Position**: After core offerings
**Layout**: Visual framework showing success steps
**Background**: Alternating section backgrounds

#### Content:
- **3 Steps**: Apply & Register, Practical Training, Graduate Job-Ready
- **Icons**: BookOpen, Users, Award
- **Descriptions**: Step-by-step success journey

#### Styling:
- **Icons**: Large, prominent icons
- **Typography**: Clear headings and descriptions
- **Layout**: Horizontal or vertical step layout

#### Animations:
- Scroll-triggered animations
- Icon animations or reveals

---

### 9. Getting Started (`components/GettingStarted.tsx`)
**Position**: After success framework
**Layout**: Call-to-action section for enrolment
**Background**: Brand-colored section

#### Content:
- **CTA**: "Ready to Start Your Journey?"
- **Form**: Contact/enquiry form
- **Benefits**: Quick highlights of getting started

#### Interactions:
- Form submissions
- Button clicks leading to application process

#### Styling:
- **Buttons**: Prominent CTAs with brand colors
- **Forms**: Clean input styling
- **Layout**: Centered content blocks

---

### 10. Testimonial (`components/Testimonial.tsx`)
**Position**: After getting started
**Layout**: Customer testimonial with photo and quote
**Background**: Light or alternating background

#### Content:
- **Photo**: Student/graduate headshot
- **Quote**: Success story and testimonial text
- **Details**: Name, programme, graduation year

#### Styling:
- **Typography**: Large quote text with attribution
- **Layout**: Photo + quote layout
- **Emphasis**: Star ratings or highlights

#### Animations:
- Fade-in on scroll
- Photo zoom or reveal effects

---

### 11. Final CTA (`components/FinalCTA.tsx`)
**Position**: After testimonial
**Layout**: Strong final call-to-action
**Background**: Brand primary color

#### Content:
- **Heading**: Compelling final message
- **Buttons**: Primary application/enquiry actions
- **Urgency**: Limited time offers or deadlines

#### Interactions:
- Multiple CTA buttons
- Form integrations
- Direct application links

#### Styling:
- **Typography**: Large, bold headings
- **Buttons**: Multiple prominent actions
- **Layout**: Centered, high-impact design

---

### 12. Footer (`components/Footer.tsx`)
**Position**: Bottom of page
**Layout**: Multi-column footer with links and information
**Background**: Dark footer background

#### Sections:
- **Company Info**: Logo, description, social links
- **Quick Links**: Navigation shortcuts
- **Programmes**: Programme categories
- **Contact**: Address, phone, email
- **Legal**: Terms, privacy, accreditations

#### Interactions:
- Social media links
- Email and phone links
- Navigation to other pages

#### Styling:
- **Columns**: 4-5 column responsive layout
- **Typography**: Clear hierarchy
- **Links**: Hover effects and proper contrast

---

## Global Styles & Design System

### Color Palette:
- **Primary**: `#002845` (Deep Space Blue)
- **Accent/Gold**: `#c5a059` (Sand)
- **Highlight**: `#1BA1FF` (Blue Bell)
- **Surface**: `#F8FAFC` (Bright Snow)
- **Text**: Various grays and whites

### Typography:
- **Headings**: Libre Caslon Condensed serif
- **Body**: Inter sans-serif
- **Sizes**: Responsive scaling (sm to 7xl)

### Animations:
- **Duration**: 300ms default, 700ms for major transitions
- **Easing**: `cubic-bezier(0.4, 0, 0.2, 1)` standard
- **Triggers**: Scroll-based with Intersection Observer
- **Hover Effects**: Scale, color, and transform changes

### Responsive Design:
- **Breakpoints**: Mobile-first approach
- **Grid**: CSS Grid and Flexbox combinations
- **Images**: Responsive with proper aspect ratios

### Accessibility:
- **Contrast**: WCAG compliant color combinations
- **Focus States**: Visible focus indicators
- **Alt Text**: Descriptive image alternatives
- **Keyboard Navigation**: Full keyboard accessibility

---

## Technical Implementation

### Frameworks & Libraries:
- **React**: Component-based architecture
- **TypeScript**: Type safety
- **Tailwind CSS**: Utility-first styling
- **React Router**: Client-side routing
- **Lucide React**: Icon library

### State Management:
- **Context API**: Cart and comparison functionality
- **Local State**: Component-specific interactions

### Performance:
- **Lazy Loading**: Route-based code splitting
- **Image Optimization**: Proper sizing and formats
- **Animation Optimization**: CSS transforms over layout changes

This documentation provides a complete overview of the International Hotel School home page, covering all visual, interactive, and functional aspects of each section.