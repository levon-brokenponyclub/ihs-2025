## Plan: Migrate Programmes from Hotel School Online Learning

This plan outlines the migration of programme data from the Hotel School's online learning page to the project. The migration will be structured into sections to ensure a smooth and organized process.

### ✅ COMPLETED: Phase 1 - Initial 6 Online Learning Programmes

Successfully migrated the first 6 online learning programmes to the `OFFERINGS` array in `constants.tsx`:

#### Migrated Programmes (IDs 8-13)

1. **ID 8 - Front Office Operations & Guest Relations** (Hospitality)
   - Duration: 6 Months
   - Price: R 8,500
   - Focus: PMS systems, check-in procedures, guest relations, revenue management
   - Accreditations: CATHSSETA, AHLEI

2. **ID 9 - International Cuisine & Cooking Techniques** (Culinary)
   - Duration: 6 Months
   - Price: R 9,800
   - Focus: World cuisines, advanced plating, food safety, recipe development
   - Accreditations: CATHSSETA, City & Guilds

3. **ID 10 - Customer Service Excellence in Hospitality** (Hospitality)
   - Duration: 3 Months
   - Price: R 5,200
   - Focus: Communication, complaint resolution, cultural sensitivity, guest experience
   - Accreditations: CATHSSETA, AHLEI

4. **ID 11 - Housekeeping Management & Operations** (Hospitality)
   - Duration: 6 Months
   - Price: R 7,800
   - Focus: Room standards, staff supervision, sustainability, cost control
   - Accreditations: CATHSSETA, AHLEI

5. **ID 12 - Event Planning & Coordination** (Hospitality)
   - Duration: 4 Months
   - Price: R 6,500
   - Focus: Planning logistics, budgeting, vendor management, risk management
   - Accreditations: CATHSSETA

6. **ID 13 - Hospitality Sales & Marketing Fundamentals** (Hospitality)
   - Duration: 4 Months
   - Price: R 6,800
   - Focus: Revenue management, digital marketing, CRM, brand positioning
   - Accreditations: CATHSSETA, AHLEI

### Implementation Details

- **Location**: `/constants.tsx` - OFFERINGS array & SPECIFIC_COURSE_DATA object
- **Programme Type**: All marked with `'Online Learning'` programme type
- **Delivery**: Flexible online delivery with start date "Anytime" and intake "Anytime"
- **Level**: NQF Level 3-4 (appropriate for certificate programmes)
- **Career Outcomes**: Each programme includes 4 relevant career outcome paths

### Next Steps (Future Phases)
1. Continue migration of additional online programmes if needed
2. Implement additional course-specific features or sections
3. Add more detailed curriculum modules for advanced courses
4. Create promotional content and course preview materials
5. Test and validate all programmes on the archive page
