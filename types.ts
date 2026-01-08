import React from 'react';

export interface Offering {
  id: string;
  category: string;
  title: string;
  duration: string;
  qualification: string;

  description: string;          // Long / marketing description
  shortDescription?: string;     // 👈 Compare, cards, summaries (made optional)

  image?: string; // Legacy: optional, use video instead
  video?: string; // Added for hover video loops
  programmeTypes: string[];
  accreditations: string[];
  price?: number; // Added for eCommerce
  startDate?: string; // Added for display
  intake?: string; // Added for Quick View
  highlights?: string[]; // Added for Quick View display
}

export interface SuccessStep {
  icon: React.ElementType;
  title: string;
  description: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface Metric {
  value: string;
  label: string;
}

export interface CourseModule {
  title: string;
  topics: string[];
}

export interface CurriculumYear {
  year: string;
  modules: CourseModule[];
}

/**
 * CourseDetail extends Offering
 * shortDescription is inherited automatically
 */
export interface CourseDetail extends Offering {
  fullDescription: string;
  level: string;
  deliveryMode: string;
  accreditations: string[];
  curriculum: CurriculumYear[];
  requirements: string[];
  careerOutcomes: string[];
  certification?: string;
  focusAreas?: string[];
  extendedFocusAreas?: { title: string; description: string }[];
  programContentIncludes?: string[];
  fees: {
    tuition: string;
    registration?: string; // made optional to allow partial overrides
    note: string;
  };
  workIntegratedLearning?: string;
  effort?: string;
  faq?: { question: string; answer: string }[];
  successfulGraduates?: string;
  wilDuration?: string;
}
