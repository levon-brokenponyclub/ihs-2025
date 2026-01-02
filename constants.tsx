import {
  Award,
  BookOpen,
  Users
} from 'lucide-react';
import { Offering, SuccessStep, NavLink, CourseDetail } from './types';

// Updated Menu Structure for Chelsea Style Header
export const NAV_LINKS: NavLink[] = [
  { label: 'Our Programmes', href: '#offerings' },
  { label: 'Admissions', href: '#' },
  { label: 'Experiences', href: '#' },
];

export const MORE_MENU_LINKS: NavLink[] = [
  { label: 'News', href: '#' },
  { label: 'Contact Us', href: '#' },
  { label: 'Student Portal', href: '#' },
  { label: 'Alumni', href: '#' },
  { label: 'Careers', href: '#' },
];


// Filter Constants

export const FOCUS_AREAS = [
    { label: 'Business', value: 'Business' },
    { label: 'Conference & Events', value: 'Conference & Events' },
    { label: 'Food & Beverage', value: 'Food & Beverage' },
    { label: 'Hospitality Management', value: 'Hospitality' },
    { label: 'Human Resources', value: 'Human Resources' },
    { label: 'Culinary', value: 'Culinary' }
];

export const ACCREDITATION_LOGOS: Record<string, string> = {
    'AHLEI': 'https://www.hotelschool.co.za/wp-content/uploads/2020/08/ahlei-logo.png',
    'CATHSSETA': 'https://placehold.co/120x60/transparent/white?text=CATHSSETA',
    'City & Guilds': 'https://placehold.co/120x60/transparent/white?text=City%20%26%20Guilds',
    'QCTO': 'https://placehold.co/120x60/transparent/white?text=QCTO',
    'École Ducasse': 'https://www.hotelschool.co.za/wp-content/uploads/2020/09/ecole-ducasse-programme-logo-img.png',
    'CTH': 'https://placehold.co/120x60/transparent/white?text=CTH',
    'Sommet Education': 'https://placehold.co/120x60/transparent/white?text=Sommet',
    'IHS': 'https://www.hotelschool.co.za/wp-content/uploads/2020/08/ihs-logo-1.png',
    'CHE': 'https://placehold.co/120x60/transparent/white?text=CHE'
};

export const SUCCESS_STEPS: SuccessStep[] = [
  {
    icon: BookOpen,
    title: "Apply & Register",
    description: "Start your journey by selecting the perfect programme for your career goals."
  },
  {
    icon: Users,
    title: "Practical Training",
    description: "Gain hands-on experience through our industry-integrated learning approach."
  },
  {
    icon: Award,
    title: "Graduate Job-Ready",
    description: "Receive your qualification and join our network of successful alumni."
  }
];

export const OFFERINGS: Offering[] = [
  {
    id: '7',
    category: 'Hospitality',
    title: 'Bachelor of Business Administration in Hospitality Operations Management',
    duration: '3 Years',
    qualification: 'Degree',
    description: 'A prestigious NQF Level 7 qualification designed for future executives. Master the strategic, financial, and operational aspects of the global hospitality industry.',
    video: 'https://www.shutterstock.com/shutterstock/videos/3541615587/preview/stock-footage-hotel-employees-and-guest-at-reception-for-check-in-hospitality-and-accommodation-with-tourism.webm',
    programmeTypes: ['Full Time Learning', 'Degrees'],
    accreditations: ['IHS'],
    price: 123000, 
    startDate: 'March 2025',
    intake: 'March and July',
    highlights: [
        'NQF Level 7 Qualification',
        'Strategic Management Focus',
        'Financial & Revenue Management',
        'Research Methodology'
    ]
  },
  {
    id: '1',
    category: 'Hospitality',
    title: 'Diploma in Hospitality Management',
    duration: '3 Years',
    qualification: 'Diploma',
    description: 'Comprehensive hospitality management programme with AHLEI certification. Graduate job-ready with global skills.',
    video: 'https://www.shutterstock.com/shutterstock/videos/3541615587/preview/stock-footage-hotel-employees-and-guest-at-reception-for-check-in-hospitality-and-accommodation-with-tourism.webm',
    programmeTypes: ['Full Time Learning', 'Blended Learning', 'Diplomas'],
    accreditations: ['AHLEI', 'CATHSSETA', 'CTH'],
    price: 95000,
    startDate: '12 Feb 2025',
    intake: 'March & July',
    highlights: [
        'AHLEI & CTH International Accreditation',
        '6-Month Industry Internship included',
        'Management & Leadership focus',
        'Global alumni network access'
    ]
  },
  {
    id: '2',
    category: 'Culinary',
    title: 'Diploma in Culinary Arts',
    duration: '2 Years',
    qualification: 'Diploma',
    description: 'Professional culinary training with École Ducasse certification. Learn from industry experts and gain practical skills.',
    video: 'https://media.istockphoto.com/id/472897860/video/culinary-school-intructor-teaching-students-in-commercial-kitchen.mp4?s=mp4-640x640-is&k=20&c=hsucGTdCRxP4qSN4fHeX9YW7_qNeeNno0dfHRiaB5_k=',
    programmeTypes: ['Full Time Learning', 'Diplomas'],
    accreditations: ['QCTO', 'CATHSSETA', 'City & Guilds', 'École Ducasse'],
    price: 110000,
    startDate: '14 Feb 2025',
    intake: 'February & July',
    highlights: [
        'École Ducasse Certification',
        'Advanced French Culinary Techniques',
        'State-of-the-art kitchen facilities',
        'Fast-track to Executive Chef'
    ]
  },
  {
    id: '3',
    category: 'Culinary',
    title: 'Professional Cookery Certificate',
    duration: '1 Year',
    qualification: 'Certificate',
    description: 'Intensive culinary certificate programme for aspiring chefs. Master fundamental techniques and build your portfolio.',
    video: 'https://www.shutterstock.com/shutterstock/videos/1087550930/preview/stock-footage-chef-teaching-how-to-cook-cutting-vegetables-indoors-in-commercial-kitchen.webm',
    programmeTypes: ['Full Time Learning', 'In-Service Traineeship', 'Certificates'],
    accreditations: ['CATHSSETA', 'City & Guilds'],
    price: 65000,
    startDate: '01 Mar 2025',
    intake: 'March & August',
    highlights: [
        'Intensive practical training',
        'Foundation culinary techniques',
        'Industry exposure',
        'Fast-track to employment'
    ]
  },
  {
    id: '4',
    category: 'Culinary',
    title: 'Professional Patisserie',
    duration: '1 Year',
    qualification: 'Certificate',
    description: 'Specialised pastry and baking programme. Master the art of French patisserie with internationally recognized methods.',
    video: 'https://media.istockphoto.com/id/472897860/video/culinary-school-intructor-teaching-students-in-commercial-kitchen.mp4?s=mp4-640x640-is&k=20&c=hsucGTdCRxP4qSN4fHeX9YW7_qNeeNno0dfHRiaB5_k=',
    programmeTypes: ['Full Time Learning', 'Part Time Learning', 'Certificates'],
    accreditations: ['CATHSSETA', 'City & Guilds', 'École Ducasse'],
    price: 72000,
    startDate: '01 Mar 2025',
    intake: 'March & August',
    highlights: [
        'Specialised Pastry Techniques',
        'Chocolate & Sugar Arts',
        'Artisan Bread Baking',
        'Wedding Cake Design'
    ]
  },
  {
    id: '5',
    category: 'Hospitality',
    title: 'Certificate in Hotel Operations',
    duration: '1 Year',
    qualification: 'Certificate',
    description: 'Foundational hotel operations programme covering front office, housekeeping, and guest services.',
    video: 'https://www.shutterstock.com/shutterstock/videos/3541615587/preview/stock-footage-hotel-employees-and-guest-at-reception-for-check-in-hospitality-and-accommodation-with-tourism.webm',
    programmeTypes: ['Part Time Learning', 'Online Learning', 'Certificates', 'Credit Bearing Short Courses'],
    accreditations: ['CATHSSETA', 'AHLEI'],
    price: 55000,
    startDate: 'Anytime',
    intake: 'Anytime',
    highlights: [
        'Front Office Operations',
        'Housekeeping Management',
        'Guest Service Excellence',
        'Property Management Systems'
    ]
  },
  {
    id: '6',
    category: 'Hospitality',
    title: 'Food & Beverage Management',
    duration: '1 Year',
    qualification: 'Certificate',
    description: 'Specialised programme in restaurant and bar management. Learn service excellence, menu planning, and cost control.',
    video: 'https://www.shutterstock.com/shutterstock/videos/1087550930/preview/stock-footage-chef-teaching-how-to-cook-cutting-vegetables-indoors-in-commercial-kitchen.webm',
    programmeTypes: ['Online Learning', 'In-Service Traineeship', 'Certificates', 'AHLEI Professional Certification'],
    accreditations: ['CATHSSETA', 'AHLEI'],
    price: 58000,
    startDate: 'Anytime',
    intake: 'Anytime',
    highlights: [
        'Restaurant Operations',
        'Bar & Beverage Management',
        'Menu Planning & Costing',
        'Service Standards'
    ]
  },
  {
    id: '8',
    category: 'Hospitality',
    title: 'Front Office Operations & Guest Relations',
    duration: '6 Months',
    qualification: 'Certificate',
    description: 'Master the fundamentals of front office management, check-in procedures, guest relations, and property management systems. Essential skills for hotel reception and guest services roles.',
    video: 'https://www.shutterstock.com/shutterstock/videos/3541615587/preview/stock-footage-hotel-employees-and-guest-at-reception-for-check-in-hospitality-and-accommodation-with-tourism.webm',
    programmeTypes: ['Online Learning', 'Certificates', 'Credit Bearing Short Courses'],
    accreditations: ['CATHSSETA', 'AHLEI'],
    price: 8500,
    startDate: 'Anytime',
    intake: 'Anytime',
    highlights: [
        'PMS (Property Management Systems)',
        'Check-in & Check-out Procedures',
        'Guest Communication Skills',
        'Upselling & Revenue Management'
    ]
  },
  {
    id: '9',
    category: 'Culinary',
    title: 'International Cuisine & Cooking Techniques',
    duration: '6 Months',
    qualification: 'Certificate',
    description: 'Explore diverse international cuisines and cooking techniques. Learn plating, presentation, and food safety standards while mastering classic and contemporary recipes from around the world.',
    video: 'https://www.shutterstock.com/shutterstock/videos/1087550930/preview/stock-footage-chef-teaching-how-to-cook-cutting-vegetables-indoors-in-commercial-kitchen.webm',
    programmeTypes: ['Online Learning', 'Certificates'],
    accreditations: ['CATHSSETA', 'City & Guilds'],
    price: 9800,
    startDate: 'Anytime',
    intake: 'Anytime',
    highlights: [
        'World Cuisines & Techniques',
        'Advanced Plating Skills',
        'Nutrition & Food Safety',
        'Recipe Development & Costing'
    ]
  },
  {
    id: '10',
    category: 'Hospitality',
    title: 'Customer Service Excellence in Hospitality',
    duration: '3 Months',
    qualification: 'Certificate',
    description: 'Develop exceptional customer service skills critical to the hospitality industry. Learn complaint resolution, communication, and creating memorable guest experiences in any hospitality setting.',
    video: 'https://www.shutterstock.com/shutterstock/videos/3541615587/preview/stock-footage-hotel-employees-and-guest-at-reception-for-check-in-hospitality-and-accommodation-with-tourism.webm',
    programmeTypes: ['Online Learning', 'Certificates', 'Credit Bearing Short Courses'],
    accreditations: ['CATHSSETA', 'AHLEI'],
    price: 5200,
    startDate: 'Anytime',
    intake: 'Anytime',
    highlights: [
        'Communication Skills',
        'Complaint Handling & Resolution',
        'Cultural Sensitivity Training',
        'Guest Experience Management'
    ]
  },
  {
    id: '11',
    category: 'Hospitality',
    title: 'Housekeeping Management & Operations',
    duration: '6 Months',
    qualification: 'Certificate',
    description: 'Comprehensive housekeeping management programme covering room inspections, cleaning standards, staff supervision, and inventory management. Ideal for housekeeping supervisors and managers.',
    video: 'https://www.shutterstock.com/shutterstock/videos/3541615587/preview/stock-footage-hotel-employees-and-guest-at-reception-for-check-in-hospitality-and-accommodation-with-tourism.webm',
    programmeTypes: ['Online Learning', 'Certificates', 'Credit Bearing Short Courses'],
    accreditations: ['CATHSSETA', 'AHLEI'],
    price: 7800,
    startDate: 'Anytime',
    intake: 'Anytime',
    highlights: [
        'Room Inspection Standards',
        'Staff Supervision & Training',
        'Sustainability Practices',
        'Cost Control & Inventory Management'
    ]
  },
  {
    id: '12',
    category: 'Hospitality',
    title: 'Event Planning & Coordination',
    duration: '4 Months',
    qualification: 'Certificate',
    description: 'Learn the essentials of event planning, coordination, and execution. From conferences to weddings, develop skills in budgeting, logistics, vendor management, and guest coordination.',
    video: 'https://www.shutterstock.com/shutterstock/videos/1087550930/preview/stock-footage-chef-teaching-how-to-cook-cutting-vegetables-indoors-in-commercial-kitchen.webm',
    programmeTypes: ['Online Learning', 'Certificates', 'Credit Bearing Short Courses'],
    accreditations: ['CATHSSETA'],
    price: 6500,
    startDate: 'Anytime',
    intake: 'Anytime',
    highlights: [
        'Event Planning & Logistics',
        'Budgeting & Cost Management',
        'Vendor & Supplier Relations',
        'Risk Management & Contingency Planning'
    ]
  },
  {
    id: '13',
    category: 'Hospitality',
    title: 'Hospitality Sales & Marketing Fundamentals',
    duration: '4 Months',
    qualification: 'Certificate',
    description: 'Essential sales and marketing skills for hospitality professionals. Master revenue management, promotional strategies, digital marketing, and client relationship management.',
    video: 'https://www.shutterstock.com/shutterstock/videos/1087550930/preview/stock-footage-chef-teaching-how-to-cook-cutting-vegetables-indoors-in-commercial-kitchen.webm',
    programmeTypes: ['Online Learning', 'Certificates', 'Credit Bearing Short Courses'],
    accreditations: ['CATHSSETA', 'AHLEI'],
    price: 6800,
    startDate: 'Anytime',
    intake: 'Anytime',
    highlights: [
        'Sales Techniques & CRM',
        'Revenue Management Strategies',
        'Digital & Social Media Marketing',
        'Brand Positioning & Promotion'
    ]
  }
];

const SPECIFIC_COURSE_DATA: Record<string, Partial<CourseDetail>> = {
    '7': {
        fullDescription: "This programme focuses on the strategic and financial management aspects of a hospitality establishment and its operations. Strong leadership capabilities, the ability to apply strategic thinking and strong numerical application is learned. This programme will provide the learner with the knowledge and competence to perform a variety of management functions across the different departments in the hospitality environment through applied theory and Work Integrated Learning.",
        workIntegratedLearning: "Applied theory and practical experience in hospitality environments.",
        certification: "Bachelor of Business Administration in Hospitality Operations Management\n(SAQA ID: 110624, HEQF Level 7)",
        level: 'NQF Level 7',
        extendedFocusAreas: [
            {
                title: "Brand and Marketing Management",
                description: "Building a brand, creating market awareness, and achieving sales is the lifeblood of any business and hospitality establishment. Therefore, Brand and Marketing Management looks at the different types of marketing strategies that can be implemented to promote a company’s products or services. In addition, you will learn how to master the basics of digital marketing."
            },
            {
                title: "Entrepreneurship and Strategy",
                description: "Do you have an entrepreneurial spirit? Being a successful entrepreneur is not only about having a good idea, it’s about being able to take the idea, creating concept, developing a business plan, building a strategy around it, and implementing the operational execution, that turns the entrepreneurial idea into a successful venture. In this focus area, you will learn how to seek new business opportunities, be able to implement project management tools and strategic problem-solving."
            },
            {
                title: "Financial Management",
                description: "Do you have a flair for figures? In this focus area, you will learn how to analyse financial statements for a hospitality establishment. You will learn how to examine and interpret data and learn about basic accounting terms such as income and expenditure, assets, liabilities, and balance sheets."
            },
            {
                title: "Luxury Guest Service and Experience",
                description: "An exceptional guest experience is the most important aspect to a successful hospitality business. Luxury guest service and experience starts with understanding the ‘touch-points’ of a customer journey and creating moments of magic throughout the journey, to ensure a memorable guest experience. Once graduated, you will be able to identify and understand the basic needs of a guest finding new ways to meet and exceed guests expectations."
            },
            {
                title: "Operations Management",
                description: "Aspiring to be a manager or owner of a world-class Hospitality establishment? The ability to develop and sustain a hospitality establishment requires integrated knowledge of the hospitality functions and managerial aspects of the operational areas of Food & Beverage, Front Office, and Housekeeping. Revenue and Financial Management form integral parts of any hospitality establishment and are essential financial competencies for Hospitality Managers."
            },
            {
                title: "Organisational Behaviour and Human Resource Management",
                description: "Aspiring to be a Human Resources Professional? Organisational Behaviour and Human Resources requires an individual to have a good understanding of the relevant labour, employment acts and regulations. Most importantly it’s about understanding and examining the impact of staff management practices, recruitment, employee motivation and productivity, amongst others."
            }
        ],
        programContentIncludes: [
            "Financial Management",
            "Accounting Principles",
            "Statistics for Business",
            "Marketing",
            "Human Resources",
            "Management Information Systems",
            "Project Management",
            "Corporate Governance"
        ],
        curriculum: [
             // Empty or hidden for this course per requirements to remove Year 1/2/3
        ],
        requirements: [
            "National Senior Certificate with a Bachelor entry, or equivalent."
        ],
        careerOutcomes: [
            "General Manager",
            "Operations Director",
            "Revenue Manager",
            "Regional Manager",
            "Hospitality Consultant"
        ]
    },
    '8': {
        fullDescription: "Master the essentials of front office operations with practical knowledge applicable immediately in hotel environments. This online course covers modern PMS systems, check-in and check-out procedures, guest communication, and revenue management techniques.",
        workIntegratedLearning: "Practical application of learned concepts in real hotel settings.",
        certification: "Certificate in Front Office Operations & Guest Relations (CATHSSETA & AHLEI Accredited)",
        level: 'NQF Level 4',
        careerOutcomes: [
            "Front Office Receptionist",
            "Guest Services Agent",
            "Front Office Supervisor",
            "Reservations Manager"
        ]
    },
    '9': {
        fullDescription: "Develop comprehensive culinary skills through online instruction in international cuisines and advanced cooking techniques. Explore flavor profiles, ingredient sourcing, and presentation methods from cuisines around the world while mastering food safety and nutrition principles.",
        workIntegratedLearning: "Home kitchen practice with instructor feedback on submitted videos and recipes.",
        certification: "Certificate in International Cuisine & Cooking Techniques (CATHSSETA & City & Guilds)",
        level: 'NQF Level 4',
        careerOutcomes: [
            "Culinary Chef",
            "Recipe Developer",
            "Food Consultant",
            "Culinary Instructor"
        ]
    },
    '10': {
        fullDescription: "Enhance customer service excellence specifically for hospitality environments. Learn to anticipate guest needs, resolve complaints effectively, understand cultural differences, and create memorable experiences that foster loyalty and positive reviews.",
        workIntegratedLearning: "Real-world application in current hospitality role.",
        certification: "Certificate in Customer Service Excellence in Hospitality (CATHSSETA & AHLEI)",
        level: 'NQF Level 3',
        careerOutcomes: [
            "Guest Services Agent",
            "Customer Service Supervisor",
            "Training Coordinator",
            "Quality Assurance Officer"
        ]
    },
    '11': {
        fullDescription: "Comprehensive housekeeping management programme ideal for supervisors and department heads. Learn standards of cleanliness, staff scheduling and supervision, inventory management, sustainability practices, and cost control in housekeeping operations.",
        workIntegratedLearning: "Practical application in housekeeping department.",
        certification: "Certificate in Housekeeping Management & Operations (CATHSSETA & AHLEI)",
        level: 'NQF Level 4',
        careerOutcomes: [
            "Housekeeping Supervisor",
            "Executive Housekeeper",
            "Room Attendant Trainer",
            "Housekeeping Manager"
        ]
    },
    '12': {
        fullDescription: "Comprehensive event planning course covering all aspects of event management from concept to execution. Learn budgeting, vendor management, logistics, guest coordination, and risk management for various event types including conferences, banquets, and weddings.",
        workIntegratedLearning: "Planning and executing practice events with instructor guidance.",
        certification: "Certificate in Event Planning & Coordination (CATHSSETA Accredited)",
        level: 'NQF Level 4',
        careerOutcomes: [
            "Event Coordinator",
            "Event Manager",
            "Wedding Planner",
            "Conference Manager"
        ]
    },
    '13': {
        fullDescription: "Essential sales and marketing skills tailored for hospitality professionals. Learn revenue management strategies, promotional techniques, digital marketing for hospitality, customer relationship management, and brand positioning to drive business growth.",
        workIntegratedLearning: "Apply learned strategies in current hospitality marketing role.",
        certification: "Certificate in Hospitality Sales & Marketing Fundamentals (CATHSSETA & AHLEI)",
        level: 'NQF Level 4',
        careerOutcomes: [
            "Sales Manager",
            "Marketing Coordinator",
            "Revenue Manager",
            "Business Development Officer"
        ]
    }
};

export const COURSE_DETAILS: Record<string, CourseDetail> = OFFERINGS.reduce((acc, offering) => {
    const specificData = SPECIFIC_COURSE_DATA[offering.id] || {};

    acc[offering.id] = {
      ...offering,
      fullDescription: offering.description + " This comprehensive programme provides in-depth knowledge and practical skills required for the industry. Designed in consultation with industry leaders, it ensures graduates are ready for the challenges of the modern workplace.",
      level: offering.qualification === 'Diploma' ? 'NQF Level 6' : (offering.qualification === 'Degree' ? 'NQF Level 7' : 'NQF Level 5'),
      deliveryMode: offering.programmeTypes.join(', '),
      curriculum: [
        {
          year: "Year 1",
          modules: [
             { title: "Fundamentals of Hospitality", topics: ["Introduction to Industry", "Basic Operations", "Health & Safety"] },
             { title: "Service Excellence", topics: ["Customer Care", "Communication", "Grooming"] }
          ]
        },
        {
          year: "Year 2",
          modules: [
             { title: "Advanced Management", topics: ["Financial Management", "Leadership", "Marketing"] },
             { title: "Specialisation Modules", topics: ["Advanced Techniques", "Industry Placement", "Project Management"] }
          ]
        }
      ],
      requirements: [
        "National Senior Certificate (NSC) or equivalent",
        "English Proficiency",
        "Passion for the service industry"
      ],
      careerOutcomes: [
        "Junior Manager",
        "Department Supervisor",
        "Entrepreneur",
        "Consultant"
      ],
      ...specificData,
      fees: {
          tuition: `R ${offering.price ? offering.price.toLocaleString() : 'TBA'}`,
          registration: "R 2,500",
          note: "Fees include all learning materials, uniforms and practical ingredients where applicable.",
          ...(specificData.fees || {})
      }
    };
    return acc;
  }, {} as Record<string, CourseDetail>);
