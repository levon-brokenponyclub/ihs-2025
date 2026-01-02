import React from 'react';

export interface Offering {
  id: string;
  category: string;
  title: string;
  duration: string;
  qualification: string;
  description: string;
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
  extendedFocusAreas?: { title: string; description: string }[]; // Added for detailed BBA focus areas
  programContentIncludes?: string[]; // Added for highlight grid
  fees: {
    tuition: string;
    registration: string;
    note: string;
  };
  workIntegratedLearning?: string; // Added optional property
}
