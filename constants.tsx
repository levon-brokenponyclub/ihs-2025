import {
  Award,
  BookOpen,
  Users
} from 'lucide-react';
import { Offering, SuccessStep, NavLink, CourseDetail } from './types';

/* =========================
   Navigation
========================= */

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

/* =========================
   Filters
========================= */

export const FOCUS_AREAS = [
  { label: 'Business', value: 'Business' },
  { label: 'Conference & Events', value: 'Conference & Events' },
  { label: 'Food & Beverage', value: 'Food & Beverage' },
  { label: 'Hospitality Management', value: 'Hospitality Management' },
  { label: 'Human Resources', value: 'Human Resources' }
];

/* =========================
   Accreditation Logos
========================= */

export const ACCREDITATION_LOGOS: Record<string, string> = {
  AHLEI: 'https://www.hotelschool.co.za/wp-content/uploads/2020/08/ahlei-logo.png',
  CATHSSETA: 'https://placehold.co/120x60/transparent/white?text=CATHSSETA',
  'City & Guilds': 'https://placehold.co/120x60/transparent/white?text=City%20%26%20Guilds',
  QCTO: 'https://placehold.co/120x60/transparent/white?text=QCTO',
  'École Ducasse': 'https://www.hotelschool.co.za/wp-content/uploads/2020/09/ecole-ducasse-programme-logo-img.png',
  CTH: 'https://placehold.co/120x60/transparent/white?text=CTH',
  'Sommet Education': 'https://placehold.co/120x60/transparent/white?text=Sommet',
  IHS: 'https://www.hotelschool.co.za/wp-content/uploads/2020/08/ihs-logo-1.png',
  CHE: 'https://placehold.co/120x60/transparent/white?text=CHE'
};

/* =========================
   Success Steps
========================= */

export const SUCCESS_STEPS: SuccessStep[] = [
  {
    icon: BookOpen,
    title: 'Apply & Register',
    description: 'Start your journey by selecting the perfect programme for your career goals.'
  },
  {
    icon: Users,
    title: 'Practical Training',
    description: 'Gain hands-on experience through our industry-integrated learning approach.'
  },
  {
    icon: Award,
    title: 'Graduate Job-Ready',
    description: 'Receive your qualification and join our network of successful alumni.'
  }
];

/* =========================
   Offerings (UPDATED)
========================= */

export const OFFERINGS: Offering[] = [
  {
    id: '7',
    category: 'Business',
    title: 'Bachelor of Business Administration in Hospitality Operations Management',
    duration: '3.5 Years',
    qualification: 'Degree',
    description:
      'A prestigious NQF Level 7 qualification for future executives. Master the strategic, financial, and operational aspects of the global hospitality industry.',
    shortDescription:
      'Degree-level programme focused on hospitality operations, leadership, and strategic management.',
    video:
      'https://www.shutterstock.com/shutterstock/videos/3541615587/preview/stock-footage-hotel-employees-and-guest-at-reception-for-check-in-hospitality-and-accommodation-with-tourism.webm',
    programmeTypes: ['Online Learning', 'Degrees'],
    accreditations: ['IHS'],
    price: 45400,
    startDate: 'March, May, July, September',
    intake: 'March, May, July, September',
    highlights: [
      'Strategic Operations Management',
      'Financial & Accounting Principles',
      'Project Management Excellence',
      'Research & Sustainability',
      'NQF Level 7 Degree'
    ]
  },
  {
    id: '1',
    category: 'Hospitality Management',
    title: 'Diploma in Hospitality Management (with AHLEI Recognition)',
    duration: '3.5 Years',
    qualification: 'Diploma',
    description:
      'Comprehensive hospitality management programme with global AHLEI certification. Equip yourself with leadership skills for the modern workforce.',
    shortDescription:
      'Globally recognised hospitality diploma with leadership and operational management focus.',
    video:
      'https://www.shutterstock.com/shutterstock/videos/3541615587/preview/stock-footage-hotel-employees-and-guest-at-reception-for-check-in-hospitality-and-accommodation-with-tourism.webm',
    programmeTypes: ['Online Learning', 'Diplomas'],
    accreditations: ['AHLEI', 'CATHSSETA', 'IHS'],
    price: 38600,
    startDate: 'March (Upcoming)',
    intake: 'March (Upcoming)',
    highlights: [
      'AHLEI Global Diploma',
      'Work Integrated Learning (WIL)',
      'Food & Beverage Management',
      'Business & Rooms Division',
      'Professional Leadership'
    ]
  },
  {
    id: '15',
    category: 'Hospitality Management',
    title: 'Diploma in Hospitality Management',
    duration: '3.5 Years',
    qualification: 'Diploma',
    description:
      'Foundational hospitality management programme developing core operational and theoretical skills.',
    shortDescription:
      'Foundational hospitality management diploma covering core operational disciplines.',
    video:
      'https://www.shutterstock.com/shutterstock/videos/3541615587/preview/stock-footage-hotel-employees-and-guest-at-reception-for-check-in-hospitality-and-accommodation-with-tourism.webm',
    programmeTypes: ['Online Learning', 'Diplomas'],
    accreditations: ['CATHSSETA', 'IHS'],
    price: 30850,
    startDate: 'March, May, July, September',
    intake: 'March, May, July, September',
    highlights: [
      'Core Management Principles',
      'Work Integrated Learning (WIL)',
      'Food & Beverage Operations',
      'Rooms Division Practices',
      'Workplace Communication'
    ]
  },
  {
    id: '16',
    category: 'Food & Beverage',
    title: 'Diploma in Food & Beverage Operations Management (with AHLEI Recognition)',
    duration: '3.5 Years',
    qualification: 'Diploma',
    description: 'Master the entire Food & Beverage operation. Learn to forecast, plan, and control F&B departments with global AHLEI recognition.',
    shortDescription: 'Comprehensive F&B management diploma with global AHLEI certification.',
    video: 'https://www.shutterstock.com/shutterstock/videos/3541615587/preview/stock-footage-hotel-employees-and-guest-at-reception-for-check-in-hospitality-and-accommodation-with-tourism.webm',
    programmeTypes: ['Online Learning', 'Diplomas'],
    accreditations: ['AHLEI', 'CATHSSETA', 'IHS'],
    price: 38600,
    startDate: 'March, May, July, September',
    intake: 'March, May, July, September',
    highlights: ['F&B Operations Management', 'Financial Controls', 'Procurement & Safety', 'AHLEI Recognition']
  },
  {
    id: '17',
    category: 'Food & Beverage',
    title: 'Diploma in Food & Beverage Operations Management',
    duration: '3.5 Years',
    qualification: 'Diploma',
    description: 'Master the entire Food & Beverage operation. Learn to forecast, plan, and control F&B departments.',
    shortDescription: 'Comprehensive F&B management diploma focusing on operations and financial control.',
    video: 'https://www.shutterstock.com/shutterstock/videos/3541615587/preview/stock-footage-hotel-employees-and-guest-at-reception-for-check-in-hospitality-and-accommodation-with-tourism.webm',
    programmeTypes: ['Online Learning', 'Diplomas'],
    accreditations: ['CATHSSETA', 'IHS'],
    price: 30850,
    startDate: 'March, May, July, September',
    intake: 'March, May, July, September',
    highlights: ['F&B Operations Management', 'Financial Controls', 'Procurement & Safety', 'Operational Excellence']
  },
  {
    id: '18',
    category: 'Conference & Events',
    title: 'Higher Certificate in Events Management',
    duration: '1.5 Years',
    qualification: 'Certificate',
    description:
      'The Events and Conferencing industries are dynamic industries which are continually evolving, thereby contributing to new venture creation and employment opportunities.',
    shortDescription:
      'Foundation for entering the events industry with applicable skills and relevant knowledge.',
    video:
      'https://www.shutterstock.com/shutterstock/videos/3541615587/preview/stock-footage-hotel-employees-and-guest-at-reception-for-check-in-hospitality-and-accommodation-with-tourism.webm',
    programmeTypes: ['Online Learning', 'Certificates'],
    accreditations: ['CATHSSETA', 'IHS'],
    price: 48000,
    startDate: 'March, May, July, September',
    intake: 'March, May, July, September',
    highlights: [
      'Event Marketing Strategies',
      'Event Operations & Logistics',
      'Business Systems & Budgeting',
      'Public Relations & Media',
      'Event Communication'
    ]
  },
  {
    id: 'hrm-spec',
    category: 'Human Resources',
    title: 'Human Resources Management Specialisation Package',
    duration: '12 – 15 Months',
    qualification: 'Specialisation',
    description: 'This course presents a systematic approach to human resources management in the hospitality industry. Students will analyse contemporary issues and practices in the field of human resources management.',
    shortDescription: 'Systematic approach to human resources management, leadership, training and technology in hospitality.',
    video: 'https://www.shutterstock.com/shutterstock/videos/1055260340/preview/stock-footage-multi-ethnic-team-meeting-in-modern-office-business-people-brainstorming-and-discussing-project.webm',
    image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=2940',
    programmeTypes: ['Online Learning', 'Specialisations'],
    accreditations: ['AHLEI', 'IHS'],
    price: 45850,
    startDate: 'Mar, Apr, May, Jun, Jul, Aug, Oct, Nov',
    intake: 'Mar, Apr, May, Jun, Jul, Aug, Oct, Nov',
    highlights: [
      'AHLEI HR Specialisation Certificate',
      'Employee Supervision & Leadership',
      'Training & Instructional Design',
      'Hospitality Technology Management',
      'Strategic Career Planning'
    ]
  },
  {
    id: '19',
    category: 'Food & Beverage',
    title: 'Purchasing for Food Service Operations',
    duration: '10 Weeks',
    qualification: 'Short Course',
    description:
      'This course will give students a basic understanding of the purchasing function in the food service sectors. Students will learn about the ways in which value can be added by members of the food service distribution channel.',
    shortDescription:
      'Basic understanding of the purchasing function in the food service sectors, covering distribution channels, specifications, and distributor partners.',
    video:
      'https://www.shutterstock.com/shutterstock/videos/1087550930/preview/stock-footage-chef-teaching-how-to-cook-cutting-vegetables-indoors-in-commercial-kitchen.webm',
    image:
      'https://images.unsplash.com/photo-1556910103-1c02745a30bf?q=80&w=2070',
    programmeTypes: ['Online Learning', 'Short Courses'],
    accreditations: ['AHLEI'],
    price: 9500,
    startDate: 'Mar, Apr, May, Jun, Jul, Aug, Oct, Nov',
    intake: 'Mar, Apr, May, Jun, Jul, Aug, Oct, Nov',
    highlights: [
      'Purchasing Function & Channels',
      'Purchase Specifications',
      'Distributor Selection & Ethics',
      'Inventory Controls & Security',
      'AHLEI Short Course Certificate'
    ]
  }
];

/* =========================
   Course Details (Full Page Data)
   ========================= */

export const COURSE_DETAILS: Record<string, CourseDetail> = {
  '1': {
    ...OFFERINGS.find(o => o.id === '1')!,
    fullDescription: 'Learners who complete this programme will be equipped with the knowledge, skills, core abilities and the underlying theory that would be required of them in the field of modern Hospitality Management. This programme aims to emphasize professionalism, leadership and strong management discipline, and to lay a foundation for future career advancement in the hospitality industry.\n\nThis programme will allow students to reach their full potential, develop their knowledge and skills and enter a competitive and challenging workplace environment with confidence based on the required competence and knowledge.',
    level: 'Diploma',
    certification: 'Diploma in Hospitality Management (SAQA ID No: 57447, HEQF Level 6)\nAHLEI Diploma in Hospitality Management\nAHLEI award for each module completed',
    deliveryMode: 'Online Learning',
    accreditations: ['AHLEI', 'CATHSSETA', 'IHS'],
    curriculum: [
      {
        year: 'Core Modules',
        modules: [
          { title: 'Management Principles', topics: ['General Business Management', 'Hospitality Application'] },
          { title: 'Food & Beverage', topics: ['Management Principles', 'Operational Practices'] },
          { title: 'Rooms Division', topics: ['Front Office', 'Housekeeping', 'Facilities Management'] }
        ]
      }
    ],
    requirements: ['National Senior Certificate with a Diploma entry, or equivalent.'],
    careerOutcomes: ['Hotel Manager', 'Department Head', 'Operations Manager'],
    fees: {
      tuition: 'R 38,600',
      registration: 'R 2,500',
      note: 'Price per academic year. Includes AHLEI Award per module and AHLEI Diploma recognition.'
    },
    wilDuration: '12 – 20 Weeks',
    workIntegratedLearning: 'Work Integrated Learning (WIL) is part of the modules a student will complete during their studies. These modules will require a student to spend a requisite number of practical hours in various departments within a hospitality establishment. These departments may include, but are not limited to, Food and Beverage, Kitchens, Front Office, House Keeping, Events and Banqueting.\n\nWhilst in work integrated learning, a student will need to submit a Portfolio of Evidence (POE) which is evidence of their practical hours completed. In accordance with the number of hours for the specific programme, a student will need to submit shift schedules, manager evaluations, self-evaluations, and activities or assignments.\n\nIt is important to note that your practical learning must be completed at an establishment that forms part of the hospitality industry. Online students are required to find their own WIL placements for each WIL module.\n\nShould a student currently be working in the hospitality industry and have the required work experience, a student can apply for Recognition of Prior Learning (RPL) for up to 50% of the Work Integrated Learning (WIL) modules. If a student is not working in the hospitality industry, we will advise on the number of hours to be completed for the required WIL modules.',
    effort: '5 - 10 hours per week',
    successfulGraduates: 'In recognition of the quality of the International Hotel School Diploma in Hospitality Management, the American Hotel & Lodging Educational Institute (AHLEI) will award their Diploma in Hospitality Management to those who have registered with them and passed all examinable subjects with a minimum of 70%.',
    programContentIncludes: [
      'Communication skills in the workplace.',
      'Life skills for personal and professional development.',
      'Health and safety measures in the workplace.',
      'Understand and apply general business management principles and disciplines within the hospitality environment.',
      'Apply food and beverage management principles and practices within a hospitality environment.',
      'Understand and apply practices and management of rooms division within hospitality environments.'
    ]
  },
  '7': {
    ...OFFERINGS.find(o => o.id === '7')!,
    fullDescription: 'The ability to successfully manage the operations in a hospitality business requires knowledge of hospitality functions, operations and the managerial aspects associated with a hospitality business.\n\nOperational areas include food service, accommodation, housekeeping, events, facilities and finance. Learning in the operational areas are supported by modules focussing on business management, human resource management, project management, marketing and guest relations. This would ensure graduates are developed with the competence to manage all operations in the hospitality industry.',
    level: 'Degree',
    certification: 'Bachelor of Business Administration Degree in Hospitality Operations Management (SAQA ID: 110624, HEQF Level 7)',
    deliveryMode: 'Online Learning',
    accreditations: ['IHS'],
    curriculum: [],
    requirements: ['National Senior Certificate with a Bachelor entry, or equivalent.'],
    careerOutcomes: ['Executive Management', 'Strategic Operations', 'Consultancy'],
    fees: {
      tuition: 'R 45,400',
      registration: 'R 2,500',
      note: 'Price per academic year. Excludes textbook delivery outside the country'
    },
    wilDuration: '4 Weeks / 1 Month',
    workIntegratedLearning: 'Work Integrated Learning (WIL) is part of the modules a student will complete during their studies. These modules will require a student to spend a requisite number of practical hours in various departments within a hospitality establishment. These departments may include, but are not limited to, Food and Beverage, Kitchens, Front Office, House Keeping, Events and Banqueting.\n\nWhilst in work integrated learning, a student will need to submit a Portfolio of Evidence (POE) which is evidence of their practical hours completed. In accordance with the number of hours for the specific programme, a student will need to submit shift schedules, manager evaluations, self-evaluations, and activities or assignments.\n\nIt is important to note that your practical learning must be completed at an establishment that forms part of the hospitality industry. Online students are required to find their own WIL placements for each WIL module.\n\nShould a student currently be working in the hospitality industry and have the required work experience, a student can apply for Recognition of Prior Learning (RPL) for up to 50% of the Work Integrated Learning (WIL) modules. If a student is not working in the hospitality industry, we will advise on the number of hours to be completed for the required WIL modules.',
    effort: '5 - 10 hours per week',
    programContentIncludes: [
      'Knowledge of Financial Management, Accounting Principles and Statistics for Business',
      'Knowledge of the hospitality industry and its services, operations, and practices, with the use of technology',
      'The ability to apply management principles and practices to plan and manage operations effectively in a hospitality business.',
      'To apply strategic management principles to support growth and sustainability in a hospitality business.',
      'The ability to apply project management principles to achieve objectives within a hospitality operational environment.',
      'An understanding of research principles and conduct basic research.'
    ]
  },
  '15': {
    ...OFFERINGS.find(o => o.id === '15')!,
    fullDescription: 'Learners who complete this programme will be equipped with the knowledge, skills, core abilities and the underlying theory that would be required of them in the field of modern Hospitality Management. This programme aims to emphasize professionalism, leadership and strong management discipline, and to lay a foundation for future career advancement in the hospitality industry.\n\nThis programme will allow students to reach their full potential, develop their knowledge and skills and enter a competitive and challenging workplace environment with confidence based on the required competence and knowledge.',
    level: 'Diploma',
    certification: 'Diploma in Hospitality Management (SAQA ID No: 57447, HEQF Level 6)',
    deliveryMode: 'Online Learning',
    accreditations: ['CATHSSETA', 'IHS'],
    curriculum: [],
    requirements: ['National Senior Certificate with a Diploma entry, or equivalent.'],
    careerOutcomes: ['Hospitality Management', 'Operational Leadership'],
    fees: {
      tuition: 'R 30,850',
      registration: 'R 2,500',
      note: 'Price per academic year.'
    },
    wilDuration: '12 – 20 Weeks',
    workIntegratedLearning: 'Work Integrated Learning (WIL) is part of the modules a student will complete during their studies. These modules will require a student to spend a requisite number of practical hours in various departments within a hospitality establishment. These departments may include, but are not limited to, Food and Beverage, Kitchens, Front Office, House Keeping, Events and Banqueting.\n\nWhilst in work integrated learning, a student will need to submit a Portfolio of Evidence (POE) which is evidence of their practical hours completed. In accordance with the number of hours for the specific programme, a student will need to submit shift schedules, manager evaluations, self-evaluations, and activities or assignments.\n\nIt is important to note that your practical learning must be completed at an establishment that forms part of the hospitality industry. Online students are required to find their own WIL placements for each WIL module.\n\nShould a student currently be working in the hospitality industry and have the required work experience, a student can apply for Recognition of Prior Learning (RPL) for up to 50% of the Work Integrated Learning (WIL) modules. If a student is not working in the hospitality industry, we will advise on the number of hours to be completed for the required WIL modules.',
    effort: '5 - 10 hours per week',
    programContentIncludes: [
      'Communication skills in the workplace.',
      'Life skills for personal and professional development.',
      'Health and safety measures in the workplace.',
      'Understand and apply general business management principles and disciplines within the hospitality environment.',
      'Apply food and beverage management principles and practices within a hospitality environment.',
      'Understand and apply practices and management of rooms division within hospitality environments.'
    ]
  },
  '16': {
    ...OFFERINGS.find(o => o.id === '16')!,
    fullDescription: 'A Food & Beverage Manager is responsible for the entire Food & Beverage Operation of a Hospitality establishment. They forecast, plan and control the ordering of food and beverages, as well as oversee the overall running of the restaurants, bars, stores, kitchens and all staff in the Food & Beverage areas. They are responsible for implementing financial controls and managing Budgets in this area.\n\nWorking at a food and beverage establishment requires innovation, dedication and discipline. Competent managerial staff who have operational experience, skill and the knowledge to manage food and beverage establishments, are in-demand globally.',
    level: 'Diploma',
    certification: 'Diploma in Food and Beverage Operations Management (SAQA ID No: 94805, HEQF Level 6)\nAHLEI Diploma in Food & Beverage Management\nAHLEI award for each module completed',
    deliveryMode: 'Online Learning',
    accreditations: ['AHLEI', 'CATHSSETA', 'IHS'],
    curriculum: [],
    requirements: ['National Senior Certificate with a Diploma entry, or equivalent.'],
    careerOutcomes: ['F&B Manager', 'Restaurant Manager', 'Bar Manager'],
    fees: {
      tuition: 'R 38,600',
      registration: 'R 2,500',
      note: 'Price per academic year. Includes AHLEI Award per module and AHLEI Diploma recognition.'
    },
    wilDuration: '12 – 20 Weeks',
    workIntegratedLearning: 'Work Integrated Learning (WIL) is part of the modules a student will complete during their studies. These modules will require a student to spend a requisite number of practical hours in various departments within a hospitality establishment. These departments may include, but are not limited to, Food and Beverage, Kitchens, Front Office, House Keeping, Events and Banqueting.\n\nWhilst in work integrated learning, a student will need to submit a Portfolio of Evidence (POE) which is evidence of their practical hours completed. In accordance with the number of hours for the specific programme, a student will need to submit shift schedules, manager evaluations, self-evaluations, and activities or assignments.\n\nIt is important to note that your practical learning must be completed at an establishment that forms part of the hospitality industry. Online students are required to find their own WIL placements for each WIL module.\n\nShould a student currently be working in the hospitality industry and have the required work experience, a student can apply for Recognition of Prior Learning (RPL) for up to 50% of the Work Integrated Learning (WIL) modules. If a student is not working in the hospitality industry, we will advise on the number of hours to be completed for the required WIL modules.',
    effort: '5 - 10 hours per week',
    successfulGraduates: 'In recognition of the quality of the International Hotel School Diploma in Food and Beverage Operations Management, the American Hotel & Lodging Educational Institute will award their Diploma in Food & Beverage Management to those who have registered with them and passed all examinable subjects with a minimum of 70%.',
    programContentIncludes: [
      'Detailed knowledge and understanding of the hospitality industry and its contribution to the national and global economy.',
      'Plan, implement and evaluate the operational, administrative and technological aspects relating to the provision of food and beverage in the context of commercial food service operations in the hospitality industry.',
      'Plan and implement procurement processes in commercial food service operations in the hospitality industry.',
      'Develop and maintain food safety practices and processes in commercial food service operations in the hospitality industry.',
      'Evaluate systems and processes employed in the management and upkeep of the physical establishment.',
      'Apply human resource management strategies aimed at meeting the needs of the hospitality business.',
      'Evaluate financial statements, processes and controls aimed at improving the overall performance of the hospitality business.',
      'Function effectively and ethically as a responsible business manager who contributes to the economic welfare of the hospitality business and the economy.'
    ]
  },
  '17': {
    ...OFFERINGS.find(o => o.id === '17')!,
    fullDescription: 'A Food & Beverage Manager is responsible for the entire Food & Beverage Operation of a Hospitality establishment. They forecast, plan and control the ordering of food and beverages, as well as oversee the overall running of the restaurants, bars, stores, kitchens and all staff in the Food & Beverage areas. They are responsible for implementing financial controls and managing Budgets in this area.\n\nWorking at a food and beverage establishment requires innovation, dedication, and discipline. Competent managerial staff who have operational experience, skill and the knowledge to manage food and beverage establishments, are in-demand globally.',
    level: 'Diploma',
    certification: 'Diploma in Food and Beverage Operations Management (SAQA ID No: 94805, HEQF Level 6)',
    deliveryMode: 'Online Learning',
    accreditations: ['CATHSSETA', 'IHS'],
    curriculum: [],
    requirements: ['National Senior Certificate with a Diploma entry, or equivalent.'],
    careerOutcomes: ['F&B Manager', 'Restaurant Manager', 'Bar Manager'],
    fees: {
      tuition: 'R 30,850',
      registration: 'R 2,500',
      note: 'Price per academic year.'
    },
    wilDuration: '12 – 20 Weeks',
    workIntegratedLearning: 'Work Integrated Learning (WIL) is part of the modules a student will complete during their studies. These modules will require a student to spend a requisite number of practical hours in various departments within a hospitality establishment. These departments may include, but are not limited to, Food and Beverage, Kitchens, Front Office, House Keeping, Events and Banqueting.\n\nWhilst in work integrated learning, a student will need to submit a Portfolio of Evidence (POE) which is evidence of their practical hours completed. In accordance with the number of hours for the specific programme, a student will need to submit shift schedules, manager evaluations, self-evaluations, and activities or assignments.\n\nIt is important to note that your practical learning must be completed at an establishment that forms part of the hospitality industry. Online students are required to find their own WIL placements for each WIL module.\n\nShould a student currently be working in the hospitality industry and have the required work experience, a student can apply for Recognition of Prior Learning (RPL) for up to 50% of the Work Integrated Learning (WIL) modules. If a student is not working in the hospitality industry, we will advise on the number of hours to be completed for the required WIL modules.',
    effort: '5 - 10 hours per week',
    programContentIncludes: [
      'Detailed knowledge and understanding of the hospitality industry and its contribution to the national and global economy.',
      'Plan, implement and evaluate the operational, administrative and technological aspects relating to the provision of food and beverage in the context of commercial food service operations in the hospitality industry.',
      'Plan and implement procurement processes in commercial food service operations in the hospitality industry.',
      'Develop and maintain food safety practices and processes in commercial food service operations in the hospitality industry.',
      'Evaluate systems and processes employed in the management and upkeep of the physical establishment.',
      'Apply human resource management strategies aimed at meeting the needs of the hospitality business.',
      'Evaluate financial statements, processes and controls aimed at improving the overall performance of the hospitality business.',
      'Function effectively and ethically as a responsible business manager who contributes to the economic welfare of the hospitality business and the economy.'
    ]
  },
  '18': {
    ...OFFERINGS.find(o => o.id === '18')!,
    fullDescription: 'The Events and Conferencing industries are dynamic industries which are continually evolving, thereby contributing to new venture creation and employment opportunities. The Events and Conferencing industries are multi-faceted, service driven, requiring highly skilled and knowledgeable employees.\n\nThe qualification, through the provision of academic and work-integrated learning opportunities provides learners with a competitive edge. These opportunities expose learners to the creative and business aspects of Events Management providing a foundation for learners to enter employment with applicable skills and relevant knowledge.',
    level: 'Certificate',
    certification: 'Higher Certificate in Events Management (SAQA ID No: 99626, NQF Level 5)',
    deliveryMode: 'Online Learning',
    accreditations: ['CATHSSETA', 'IHS'],
    curriculum: [],
    requirements: ['National Senior Certificate with Higher Certificate entry or equivalent.'],
    careerOutcomes: ['Event Coordinator', 'Conference Planner', 'Events Manager'],
    fees: {
      tuition: 'R 48,000',
      registration: 'R 2,500',
      note: 'Price per academic year.'
    },
    wilDuration: '16 – 20 Weeks',
    workIntegratedLearning: 'Work Integrated Learning (WIL) is part of the modules a student will complete during their studies. These modules will require a student to spend a requisite number of practical hours in various departments within a hospitality establishment. These departments may include, but are not limited to, Food and Beverage, Kitchens, Front Office, House Keeping, Events and Banqueting.\n\nWhilst in work integrated learning, a student will need to submit a Portfolio of Evidence (POE) which is evidence of their practical hours completed. In accordance with the number of hours for the specific programme, a student will need to submit shift schedules, manager evaluations, self-evaluations, and activities or assignments.\n\nIt is important to note that your practical learning must be completed at an establishment that forms part of the hospitality industry. Online students are required to find their own WIL placements for each WIL module.\n\nShould a student currently be working in the hospitality industry and have the required work experience, a student can apply for Recognition of Prior Learning (RPL) for up to 50% of the Work Integrated Learning (WIL) modules. If a student is not working in the hospitality industry, we will advise on the number of hours to be completed for the required WIL modules.',
    effort: '5 - 10 hours per week',
    programContentIncludes: [
      'How to analyse and apply event marketing strategies.',
      'To plan, coordinate and manage event operations and logistics for various types of events.',
      'Prepare, control, manage and evaluate business systems including cash handling, budgeting, cost control mechanisms, pricing of products and inventory control.',
      'Design, organise and coordinate Public Relations and Media activities.',
      'Produce and communicate information using a variety of formats and technologies appropriate for the events industry.'
    ]
  },
  'hrm-spec': {
    ...OFFERINGS.find(o => o.id === 'hrm-spec')!,
    fullDescription: 'This course presents a systematic approach to human resources management in the hospitality industry. Students will analyse contemporary issues and practices in the field of human resources management. Areas covered include employee supervision, leadership and management, training and development of employees as well as managing technology in the hospitality industry.',
    level: 'Specialisation',
    certification: 'AHLEI Human Resources Management specialisation certificate and an AHLEI award per module',
    deliveryMode: 'Online Learning',
    accreditations: ['AHLEI', 'IHS'],
    curriculum: [
      {
        year: 'Modules',
        modules: [
          { title: 'Supervision in the Hospitality Industry', topics: ['Effective Communication', 'Time Management', 'Conflict Resolution'] },
          { title: 'Leadership and Management', topics: ['High Performance Teams', 'Diversity', 'Strategic Career Planning'] },
          { title: 'Training and Development', topics: ['Instructional Design', 'Group Training', 'Evaluation'] },
          { title: 'Hospitality Technology', topics: ['System Selection', 'Implementation', 'Maintenance'] }
        ]
      }
    ],
    requirements: ['Grade 12 or equivalent', 'English Proficiency'],
    careerOutcomes: ['HR Manager', 'Training Manager', 'Department Supervisor'],
    fees: {
      tuition: 'R 45,850',
      registration: 'Included',
      note: 'Total package price.'
    },
    wilDuration: 'N/A',
    workIntegratedLearning: 'This specialisation focuses on theoretical management principles and case studies. While no formal WIL placement is required, students are encouraged to apply learnings in their current work environment.',
    effort: '5 - 10 hours per week',
    programContentIncludes: [
      'Developing effective managerial skills, staff employment and training.',
      'Effective communication, time management techniques, manage conflict and change.',
      'Leadership and Management in the hospitality industry, including communication, high performance teams, diversity, managing organisational change, and strategic career planning.',
      'Learn how to develop, conduct, and evaluate one-on-one and group training, and how to implement effective instructional design techniques and processes.',
      'Basics of purchasing, implementing, maintaining, and managing a variety of technology systems used in hospitality.',
      'Systematic approach to human resources management in the hospitality industry.'
    ]
  },
  '19': {
    ...OFFERINGS.find(o => o.id === '19')!,
    fullDescription: 'This course will give students a basic understanding of the purchasing function in the food service sectors. Students will learn about the ways in which value can be added by members of the food service distribution channel, the necessary elements of purchase specifications, and how to select and evaluate distributor partners. The module also covers ethics, group purchasing, and electronic purchasing methods, and food safety and defence issues.',
    level: 'Short Course',
    certification: 'AHLEI short course certificate',
    deliveryMode: 'Online Learning',
    accreditations: ['AHLEI'],
    curriculum: [],
    requirements: ['English proficiency'],
    careerOutcomes: ['Purchasing Assistant', 'Stock Controller', 'F&B Administrator'],
    fees: {
      tuition: 'R 9,500',
      registration: 'Included',
      note: 'No refund is given once the short learning programme has been purchased.'
    },
    wilDuration: 'N/A',
    workIntegratedLearning: 'This short course focuses on theoretical principles. No formal WIL placement is required.',
    effort: '5 - 10 hours per week',
    programContentIncludes: [
      'The importance of the purchasing function and the primary and secondary members of the food service distribution channel.',
      'Food service segments, food service process flow.',
      'The purchasing control point, and the role of internal customers in purchasing.',
      'Steps in the purchasing process, the skills, knowledge, and behaviour required in purchasing personnel, and the role of food service operator ethics in purchasing.',
      'Purchase specifications and the purchase order system, pricing and cost controls, and the ordering process.',
      'Food defence and security considerations for food service operations.',
      'Distributor partners describe the process to select distributor partners, and explain the essentials of ethics from a distributor’s perspective.',
      'Safety, food defence, and security considerations for distributors.',
      'Buyer-distributor relationships.',
      'The audit trail and procedures necessary for effective inventory controls.',
      'Distribution systems through which various food and beverage products are purchased.',
      'Purchase specifications for various food and beverage products.',
      'Inspection and grading processes.'
    ]
  }
};