# MultiSelectComponent: ProgrammeMultiGroup Complete Documentation

## Component Overview

The `ProgrammeMultiGroup` component is a professional, modern filter interface for exploring hospitality and culinary programmes. It features an autocomplete search with multi-select dropdowns, a collapsible "Advanced Filters" section, and layout/sort controls, all styled using the CodyHouse reference design pattern.

## Layout Structure

### Row 1: Focus Area + Autocomplete Search
- **Left Column (1 col)**: Focus Area multi-select dropdown
  - Shows "All Areas" as placeholder when nothing selected
  - Displays "{n} selected" when items are selected
  - Multi-select with checkboxes
  - Reference styling (trigger button, dropdown header, options list, Reset/Apply buttons)

- **Right Column (3 cols on desktop, full width on mobile)**: Autocomplete search input
  - User input-based filtering (no datalist)
  - Shows matching programmes, careers, and focus areas
  - Click suggestions to add to search query
  - Clear (X) button for instant reset
  - Click-outside handling to close dropdown

- **Responsive Grid**: `grid-cols-1 md:grid-cols-4 gap-3`
  - Mobile: Single column stacked
  - Desktop: Focus Area (1 col) + Search (3 cols)

### Row 2: Advanced Filters (Collapsible)
- Three multi-select dropdowns in a collapsible container
- `grid-cols-1 md:grid-cols-3 gap-6`
- **Toggle Button**: "Advanced Filters" button with `SlidersHorizontal` icon and rotating chevron
- **State**: Collapsed by default, expands to reveal Study Level, Programme Type, and Start Date filters
- **Transition**: Smooth transition using `max-h` and `opacity`

### Row 3: Results & Layout Controls
- **Results Count**: Dynamic display of matching programmes
- **View Toggle**: Switch between 'Slider' and 'Grid' views
- **Sort Dropdown**: Options for Relevance, Start Date, Tuition, and Duration

## Key Features

### ✅ Advanced Filters Toggle
- **Clean UI**: Keeps the initial view uncluttered by hiding secondary filters
- **Visual Feedback**: Rotating chevron and hover effects on the toggle button
- **Responsive**: Mobile filters are managed in a dedicated drawer for better UX

### ✅ Dynamic Start Date Filter
- **Dynamic Extraction**: Months are extracted from the `startDate` field in `constants.tsx`
- **Intelligent Parsing**: Handles combined date strings (e.g., "March, May, August & October")
- **Consolidated Format**: All dates are normalized to single month names (e.g., "March")
- **Monthly Support**: Specifically includes "Monthly" for relevant workshops
- **2026 Header**: Includes a "2026" header in the dropdown for context
- **Chronological Sorting**: Months are sorted January through December, with "Monthly" at the top

### ✅ Autocomplete Search Component
- **Input-Based Suggestions**: Filters only when user types characters
- **No Datalist**: Custom dropdown component with button-based suggestions
- **Real-Time Filtering**: Shows matching careers, programme categories, and titles
- **Click to Add**: Click any suggestion to filter programmes instantly
- **Clear Button**: X icon to reset search immediately
- **Click-Outside Handling**: Dropdown closes when clicking outside container
- **Keyboard Support**: Tab navigation and Enter key support

### ✅ Multi-Select Dropdowns (All 4 Filters)
- **Focus Area**: Dynamic list extracted from programme categories
- **Study Level**: 7 qualification types (Degrees, Diplomas, etc.)
- **Programme Type**: 5 delivery methods (Full Time, Blended, etc.)
- **Start Date**: Dynamically populated list of months + "Monthly"
- **OR Logic Filtering**: Programme matches if ANY selected option matches
- **Selected Tags**: Display below with individual remove buttons

### ✅ CodyHouse Reference Design Styling

#### Trigger Button (`.filter-item.facet-dropdown`)
- Light gray background: `bg-gray-50`
- Border styling: `border-gray-300`, `rounded-lg`
- Hover state: `hover:bg-gray-100`
- Flex layout: `flex items-center justify-between`
- Display text: Shows placeholder or "{n} selected"
- Chevron icon: SVG with rotation animation when open

#### Dropdown Menu (`.filter_dropdown`)
- Absolutely positioned below trigger
- White background with shadow: `shadow-lg`
- Border and rounded corners: `border-gray-300 rounded-lg`
- Z-index stacking: `z-50`
- Full width relative to parent: `left-0 right-0`
- Top offset: `top-full left-0 right-0 mt-2`

#### Dropdown Header (`.filter_dropdown-header`)
- Label text in gray: `text-gray-700 font-medium`
- Border-bottom separator: `border-b border-gray-200`
- Flex layout for close icon alignment
- Hover state: `hover:bg-gray-50`
- SVG icon (up arrow) to close dropdown

#### Checkbox Options (`.filter_dropdown-option`)
- Individual container per option with `border-b border-gray-100`
- Last item has no bottom border: `last:border-b-0`

#### Checkbox Control (`.filter_dropdown-checkbox_control`)
- Size: `w-5 h-5`
- Border: `border-2 border-gray-300`
- Rounded: `rounded`
- Flex centered: `flex items-center justify-center`
- Color when selected: `#1289fe` (brand accent)
- White checkmark SVG (stroke-width: 3)
- Smooth transition: `transition-all`

#### Dropdown Actions (`.filter_dropdown-actions`)
- Border-top separator: `border-t border-gray-200`
- Padding and gap: `p-3 flex gap-2`
- Two buttons: Reset and Apply

#### Reset Button (`.filter_dropdown-button--reset`)
- Light gray: `bg-gray-100 hover:bg-gray-200`
- Text color: `text-gray-700 font-medium`
- Flex layout: `flex items-center justify-center gap-2`
- Responsive: `flex-1` to split space with Apply button
- Icon: Refresh/reset SVG
- Rounded: `rounded transition-colors`

#### Apply Button (`.filter_dropdown-button--apply`)
- Brand accent: `bg-brand-accent hover:bg-brand-accent/90`
- Text: `text-brand-primary font-bold`
- Flex layout: `flex-1`
- Rounded: `rounded transition-colors`

#### Selected Tags
- Background: `bg-brand-accent` (blue)
- Text: `text-brand-primary` (dark blue)
- Spacing: `px-3 py-1 gap-2`
- Shape: `rounded-full` (pill shape)
- Typography: `text-xs font-bold uppercase tracking-wider`
- Flex layout: `inline-flex items-center`
- Remove button: `<X>` icon with `hover:opacity-70`

## Filtering Logic

The component applies **sequential AND/OR filtering** to `OFFERINGS` data:

### 1. Focus Area Filter (Multi-Select)
```
IF selectedFocusAreas.length > 0:
    FILTER programmes WHERE category = ANY selectedFocusAreas
```
- Uses `.some()` for OR logic
- Matches `offering.category` field

### 2. Search Query Filter
```
IF searchQuery is not empty:
    FILTER programmes WHERE:
        category.toLowerCase().includes(query) OR
        title.toLowerCase().includes(query) OR
        description.toLowerCase().includes(query)
```
- Case-insensitive matching
- Searches 3 fields: category, title, description

### 3. Study Level Filter (Multi-Select)
```
IF selectedStudyLevels.length > 0:
    FILTER programmes WHERE qualification = ANY selectedStudyLevels
    WITH plural/singular mapping:
        'Degrees' → 'Degree'
        'Higher Certificates' → 'Higher Certificate'
        etc.
```
- Uses `.some()` for OR logic
- Handles qualification name variations

### 4. Programme Type Filter (Multi-Select)
```
IF selectedProgrammeTypes.length > 0:
    FILTER programmes WHERE ANY programmeType = ANY selectedProgrammeTypes
```
- Direct array matching
- Matches `offering.programmeTypes` array

### 5. Start Date Filter (Multi-Select)
```
IF selectedStartDates.length > 0:
    FILTER programmes WHERE any startDate includes ANY selectedStartDates
```
- Chronological sorting (Jan-Dec)
- "Monthly" option support
- Dynamic extraction from `OFFERINGS`

## Component State Management

```typescript
// Search query (string)
const [searchQuery, setSearchQuery] = useState('');

// Filter selections (arrays of strings)
const [selectedFocusAreas, setSelectedFocusAreas] = useState<string[]>([]);
const [selectedStudyLevels, setSelectedStudyLevels] = useState<string[]>([]);
const [selectedProgrammeTypes, setSelectedProgrammeTypes] = useState<string[]>([]);
const [selectedStartDates, setSelectedStartDates] = useState<string[]>([]);

// Advanced Filters visibility
const [isAdvancedFiltersExpanded, setIsAdvancedFiltersExpanded] = useState(false);

// Results (array of Offering objects)
const [displayedOfferings, setDisplayedOfferings] = useState<Offering[]>(OFFERINGS);
```

## Performance Optimizations

1. **useMemo for Focus Areas**: Extracts unique categories once, never recalculates
2. **useMemo for uniqueStartDates**: Dynamically extracts and sorts intake months with "Monthly" support
3. **useMemo for Career Suggestions**: Combines static list + dynamic data once
4. **GSAP Context**: Smooth card entrance animations with proper cleanup
5. **Click-Outside Handlers**: Proper event listener management with cleanup
6. **No Unnecessary Re-renders**: Controlled component state with proper dependencies

## Accessibility Features

- Semantic HTML: `<label>`, `<input type="checkbox">`, `<button>`
- Hidden checkboxes with visible custom styling
- ARIA attributes on trigger buttons: `data-filter-trigger`
- Keyboard navigation: Tab, Enter support
- Visible focus states on all interactive elements
- Clear visual feedback for selected/unselected states

## Responsive Design

- **Mobile (< 768px)**:
  - Single column layout
  - Filters stack vertically
  - Full-width inputs
  - Dedicated mobile filter drawer with its own state
  - "Show results" button with dynamic count

- **Desktop (≥ 768px)**:
  - Row 1: Focus Area (1 col) + Search (3 cols)
  - Row 2: Advanced Filters toggle button
  - Row 3 (Collapsible): Study Level + Type + Start Date (3 equal cols)
  - Dropdowns positioned absolutely with `overflow-visible` on parent when expanded

## Usage Example

```tsx
<ProgrammeMultiGroup />
```

The component manages all its own state internally and filters the `OFFERINGS` data from constants automatically.

## Related Components

- **AutocompleteInput**: Custom autocomplete dropdown for career search
- **MultiSelect**: Reusable multi-select component with reference styling
- **CourseCard**: Individual programme card displayed in results
- **Button**: Action buttons throughout interface

## Data Requirements

The component requires:
- `OFFERINGS` array in constants with structure:
  ```typescript
  {
    id: string;
    category: string;
    title: string;
    description: string;
    qualification: string;
    programmeTypes: string[];
    startDate: string;          // For start date filter
    accreditations: string[];
    // ... other fields
  }
  ```

## Styling Classes Reference

| Element | Classes |
|---------|---------|
| Trigger Button | `.filter-item.facet-dropdown.facet-dropdown--default.facet-dropdown--light` |
| Button Content | `.filter-item-content.facet-dropdown-content` |
| Chevron Icon | `.facet-dropdown-icon` |
| Dropdown Menu | `.filter_dropdown.filter_dropdown--default.filter_dropdown--light` |
| Dropdown Header | `.filter_dropdown-header` |
| Options List | `.filter_dropdown-options` |
| Option Item | `.filter_dropdown-option` |
| Checkbox Label | `.filter_dropdown-checkbox.filter_dropdown-checkbox--light` |
| Checkbox Container | `.filter_dropdown-input_container` |
| Checkbox Control | `.filter_dropdown-checkbox_control` |
| Option Label | `.filter_dropdown-input_label` |
| Actions Section | `.filter_dropdown-actions` |
| Reset Button | `.filter_dropdown-button.filter_dropdown-button--reset` |
| Apply Button | `.filter_dropdown-button.filter_dropdown-button--apply` |


