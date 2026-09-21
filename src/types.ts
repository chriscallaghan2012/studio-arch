export type PageView = 'home' | 'projects' | 'services' | 'process' | 'about' | 'faqs' | 'contact' | 'checkout';

export type ProjectCategory = 'all' | 'residential' | 'commercial' | 'heritage' | 'new-builds';

export interface Project {
  id: string;
  refCode: string;
  title: string;
  category: 'residential' | 'commercial' | 'heritage' | 'new-builds';
  categoryLabel: string;
  location: string;
  coordinates: string;
  year: string;
  areaSqm: number;
  scale: string;
  status: 'COMPLETED' | 'IN_CONSTRUCTION' | 'PLANNING_APPROVED';
  heroImage: string;
  blueprintImage: string;
  galleryImages: string[];
  description: string;
  challenge: string;
  solution: string;
  deliverables: string[];
  specs: {
    structuralSystem: string;
    cladding: string;
    glazingUValue: string;
    planningAuthority: string;
    approvalTimeWeeks: number;
  };
  clientType: string;
}

export interface Service {
  id: string;
  indexNumber: string;
  title: string;
  subtitle: string;
  shortDesc: string;
  fullDesc: string;
  iconName: string;
  deliverables: string[];
  regulationsCovered: string[];
  cadPreviewImage: string;
  leadTime: string;
  scaleStandard: string;
}

export interface ProcessStage {
  stepNumber: string;
  title: string;
  duration: string;
  deliverableCode: string;
  summary: string;
  details: string[];
  keyOutputs: string[];
  badge: string;
  schematicType: 'consultation' | 'site_analysis' | 'concept' | 'technical' | 'planning' | 'handover';
}

export interface FAQItem {
  id: string;
  category: 'Planning' | 'Building Regs' | 'Pricing & Process' | 'Structural';
  question: string;
  answer: string;
  docRef?: string;
}

export interface Testimonial {
  id: string;
  clientName: string;
  clientRole: string;
  projectRef: string;
  projectTitle: string;
  rating: number;
  quote: string;
  year: string;
  location: string;
}

export interface QuoteCalculationInput {
  projectType: 'residential_extension' | 'loft_conversion' | 'new_build' | 'commercial_fitout' | 'heritage_restoration';
  floorAreaSqm: number;
  planningZone: 'standard' | 'conservation' | 'green_belt' | 'listed_building';
  structuralRequired: boolean;
  buildingRegsRequired: boolean;
  timelineSpeed: 'standard' | 'expedited';
}

export interface QuoteResult {
  baseDrawingsFee: number;
  planningSupportFee: number;
  buildingRegsFee: number;
  structuralEngFee: number;
  expeditedFee: number;
  totalEstimated: number;
  estimatedWeeks: string;
  deliverablesCount: number;
}
