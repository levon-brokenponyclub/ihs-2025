import { 
  Globe, 
  Award, 
  TrendingUp, 
  BookOpen, 
  Users, 
  CheckCircle, 
  ShieldCheck,
  Briefcase
} from 'lucide-react';
import { Offering, SuccessStep, NavLink, Metric, CourseDetail } from './types';

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

// Kept for backward compatibility if other components use it, but Header uses MORE_MENU_LINKS now
export const SECONDARY_LINKS: NavLink[] = [
  { label: 'Student Links', href: '#' },
  { label: 'Beyond Grad', href: '#' },
  { label: 'Downloads', href: '#' },
  { label: 'Open Day', href: '#' },
];

// Filter Constants
export const STUDY_LEVELS = [
    { label: 'AHLEI Professional Certification', value: 'AHLEI Professional Certification' },
    { label: 'Credit Bearing Short Courses', value: 'Credit Bearing Short Courses' },
    { label: 'Degrees', value: 'Degrees' },
    { label: 'Diplomas', value: 'Diplomas' },
    { label: 'Higher Certificates', value: 'Higher Certificates' },
    { label: 'Specialisations', value: 'Specialisations' },
    { label: 'Non-credit Bearing Short Courses', value: 'Non-credit Bearing Short Courses' }
];

export const FOCUS_AREAS = [
    { label: 'Business', value: 'Business' },
    { label: 'Conference & Events', value: 'Conference & Events' },
    { label: 'Food & Beverage', value: 'Food & Beverage' },
    { label: 'Hospitality Management', value: 'Hospitality' },
    { label: 'Human Resources', value: 'Human Resources' },
    { label: 'Culinary', value: 'Culinary' }
];

export const ACCREDITATIONS = [
    { label: 'AHLEI', value: 'AHLEI' },
    { label: 'CATHSSETA', value: 'CATHSSETA' },
    { label: 'City & Guilds', value: 'City & Guilds' },
    { label: 'QCTO', value: 'QCTO' },
    { label: 'École Ducasse', value: 'École Ducasse' },
    { label: 'CHE', value: 'CHE' },
    { label: 'International Hotel School', value: 'IHS' }
];

// Online Learning Specific Filters (kept for backward compatibility if needed, though replaced by generic ones above)
export const ONLINE_PROGRAMME_TYPES = STUDY_LEVELS.map(s => s.label);

export const ONLINE_FOCUS_AREAS = [
    { label: 'Any Focus Area', value: '' },
    { label: 'Business', value: 'business' },
    { label: 'Conference & Events', value: 'conference-events' },
    { label: 'Food & Beverage', value: 'food-and-beverage' },
    { label: 'Hospitality Management', value: 'hospitality-management' },
    { label: 'Human Resources', value: 'human-resources' }
];

export const METRICS: Metric[] = [
  { value: '30+', label: 'Years Excellence' },
  { value: '30K+', label: 'Graduates Employed' },
  { value: 'Top 50', label: 'World Ranking' },
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
    image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=2940',
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
    image: 'https://picsum.photos/id/435/600/400',
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
    image: 'https://picsum.photos/id/292/600/400',
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
    image: 'https://picsum.photos/id/225/600/400',
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
    image: 'https://picsum.photos/id/493/600/400',
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
    image: 'https://picsum.photos/id/369/600/400',
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
    image: 'https://picsum.photos/id/431/600/400',
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
  }
];

const SPECIFIC_COURSE_DATA: Record<string, Partial<CourseDetail>> = {
    '7': {
        fullDescription: "This programme focuses on the strategic and financial management aspects of a hospitality establishment and its operations. Strong leadership capabilities, the ability to apply strategic thinking and strong numerical application is learned. This programme will provide the learner with the knowledge and competence to perform a variety of management functions across the different departments in the hospitality environment through applied theory and Work Integrated Learning.",
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
