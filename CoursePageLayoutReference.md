# Course Page Layout Reference & Migration Guide

This document serves as a reference for the layout, component structure, and data mapping of the Course Details page (`CourseDetail.tsx`). Use this guide when migrating content or creating new course entries to ensure consistency.

## 1. Page Structure Overview
The page is divided into the following main areas:
-   **Hero Section**: Full-screen width with video/image background.
-   **Navigation Bar**: Breadcrumbs and Sticky Section Tabs.
-   **Main Content Area (Left Column)**: Detailed course information (approx 2/3 width).
-   **Sidebar (Right Column)**: Quick facts, fees, and CTAs (approx 1/3 width, sticky).

---

## 2. Section Details & Data Mapping

All content is sourced from `constants.tsx` via the `COURSE_DETAILS` and `OFFERINGS` objects.

### A. Hero Section
**Visuals:** Full-bg video (with image fallback).
**Data Mapping:**
-   **Title**: `course.title`
-   **Background Media**: `course.video` (primary) / `course.image` (fallback)
-   **Meta Items**:
    -   Duration: `course.duration`
    -   Focus Area: `course.category`
    -   Level of Study: `course.qualification`
    -   Start Date: `course.startDate` or `course.intake` (parsed for "Next" vs "Upcoming")

### B. Overview (`#overview`)
**Style:** White card with shadow.
**Typography:** `text-base` (Unique exception, slightly larger than other sections) `text-gray-600`.
**Data Mapping:**
-   **Content**: `course.fullDescription` (Supports `\n` for paragraphs).
-   **Social Proof**: Injected component (`SocialProofBlock`).

### C. Programme Curriculum (`#content`)
**Style:** White card with shadow.
**Typography:** `text-sm text-gray-600`.
**Data Mapping:**
-   **List Items**: `course.programContentIncludes` (Array of strings).
-   **Icon**: CheckCircle (Gold).

### D. Successful Graduates (`#graduates`)
**Condition**: Renders only if `course.successfulGraduates` exists.
**Style:** Clean/bordered (no shadow).
**Typography:** `text-sm text-gray-600`.
**Data Mapping:**
-   **Content**: `course.successfulGraduates`.

### E. Work Integrated Learning (`#wil`)
**Condition**: Renders only if `course.workIntegratedLearning` exists.
**Style:** White card with shadow.
**Typography:** `text-sm text-gray-600`.
**Data Mapping:**
-   **Content**: `course.workIntegratedLearning`.
    -   **Formatting**: Supports sub-headers denoted by `#### `. Everything else is body text.

### F. FAQs (`#faq`)
**Style:** White card with shadow.
**Content**: Currently hardcoded in component (Common FAQs).

---

## 3. Sidebar Components

### A. Programme Overview Card
**Style:** Dark Blue Background (`bg-brand-primary`).
**Data Mapping:**
-   **Duration**: `course.duration`
-   **Effort**: `course.effort`
-   **Focus Area**: `course.category`
-   **Start Date**: `course.startDate`
-   **Accreditations**: `course.accreditations` (Array of strings, mapped to logos).
-   **Qualification**: `course.certification` (Primary, supports `\n` for multi-line) or `course.qualification` (Fallback).

### B. Fees Card
**Style:** White card with gold/brand accents.
**Data Mapping:**
-   **Tuition**: `course.fees.tuition`
-   **Registration**: `course.fees.registration`
-   **Note**: `course.fees.note`
-   **Payment Terms**: Hardcoded ("Monthly / Annually").

---

## 4. Typography Standards

To maintain consistency across all sections (excluding Overview which is `text-base`), use the following classes:

| Element | Tailwind Classes | Visual Style |
| :--- | :--- | :--- |
| **Section Heading** | `text-2xl font-serif text-brand-primary font-bold` | Serif, Large, Dark Blue |
| **Sub-Heading** | `text-sm uppercase tracking-[1px] font-bold text-gray-800` | Sans, Small Caps, Dark Grey |
| **Body Text** | `text-sm text-gray-600 leading-relaxed` | Sans, Small, Light Grey |
| **List Text** | `text-sm text-gray-600 leading-relaxed font-medium` | Sans, Small, Light Grey |

**Note:** The "Overview" section uses `text-base` for emphasis but shares the same color palette. "Successful Graduates", "Curriculum", and "WIL" MUST use `text-sm`.

---

## 5. Ecommerce vs Application Logic ("Apply Now" vs "Buy Now")
The logic for the primary CTA button ("Apply Now" / "Buy Now") and its behavior (Add to Cart vs Lead Form) is determined automatically based on the `programmeTypes`.

-   **Logic**: If `programmeTypes` includes `'Online Learning'` or `'Part Time Learning'`, it is treated as **Ecommerce**.
-   **Ecommerce Behavior**:
    -   Clicking CTA adds the course to the cart.
    -   Opens the Checkout Modal.
-   **Application Behavior (Non-Ecommerce)**:
    -   Clicking CTA scrolls to/opens the Application Form Modal.

**Note**: Even if the button text says "Apply Now", if the course type is Online, it will function as an "Add to Cart" action in the current codebase logic.

---

## 6. Detailed Migration Example

Use the following breakdown as a guide when migrating raw content into the `constants.tsx` structure.

**Source Content:**
> **Qualification**: Diploma in Hospitality Management (SAQA ID No: 57447, HEQF Level 6)
> AHLEI Diploma in Hospitality Management
> AHLEI award for each module completed

**Mapped to `constants.tsx`:**
```typescript
certification: 'Diploma in Hospitality Management (SAQA ID No: 57447, HEQF Level 6)\nAHLEI Diploma in Hospitality Management\nAHLEI award for each module completed',
level: 'Diploma', // Simplified for Hero meta
```

**Source Content:**
> **What will I learn?**
> * Communication skills in the workplace.
> * Life skills...

**Mapped to `constants.tsx`:**
```typescript
programContentIncludes: [
  'Communication skills in the workplace.',
  'Life skills for personal and professional development.',
  // ...
]
```

**Source Content:**
> **Work Integrated Learning (WIL)**
> 12 to 20 weeks per year...

**Mapped to `constants.tsx`:**
```typescript
workIntegratedLearning: '12 to 20 weeks per year...\n\nWhilst in work integrated learning...', // Use \n\n for paragraph breaks
```

---

## 7. Migration Checklist

When migrating a new course, ensure the following fields are populated in `constants.tsx`:

- [ ] `id` (Unique string)
- [ ] `title`
- [ ] `video` (URL) and `image` (Fallback URL)
- [ ] `fullDescription` (Overview text)
- [ ] `programContentIncludes` (Bullet points for curriculum)
- [ ] `successfulGraduates` (Text, optional)
- [ ] `workIntegratedLearning` (Text, optional, supporting `####` headers)
- [ ] `fees` object (tuition, registration, note)
- [ ] `startDate` (e.g., "March, May, July")
- [ ] `accreditations` (List of keys matching logo map)
- [ ] `certification` (Multi-line detailed qualification string)

