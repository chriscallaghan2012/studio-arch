/**
 * Masonry Architecture — fixed-fee plan packages.
 *
 * Prices are the opening prices advertised across the site (see the
 * Quote Estimator for how they are derived). The same price table is
 * re-verified server-side in /api/lib/orders.ts before a PayPal order
 * is created, so client-supplied prices are never trusted.
 */
export interface CatalogProduct {
  id: string;
  sku: string;
  name: string;
  category: string;
  shortDesc: string;
  priceGBP: number;
  leadTime: string;
  deliverables: string[];
}

export const CURRENCY = 'GBP';
export const SHIPPING_GBP = 0;

export const PRODUCTS: CatalogProduct[] = [
  {
    id: 'architectural-drawings',
    sku: 'MA-DWG-01',
    name: 'Architectural Drawings Package',
    category: 'Drawings & Survey',
    shortDesc:
      'Existing & proposed floor plans, four-sided elevations, cross-sections and 1:5 construction junction details, generated to ISO 128 metric standards.',
    priceGBP: 1490,
    leadTime: '10 – 15 Working Days',
    deliverables: [
      'Existing & Proposed Floor Plans (1:50 / 1:100)',
      'Four-Sided Elevation Drawings with Materials Callouts',
      'Cross-Sections & Long-Sections with Finished Floor Levels',
      'Roof Drainage & Parapet Detail Sheets (1:10 / 1:5)',
      'Door & Window Schedules with Thermal Specifications',
      'Full Vector PDF, DWG and IFC BIM exports',
    ],
  },
  {
    id: 'planning-permissions',
    sku: 'MA-PLN-01',
    name: 'Planning Application Package',
    category: 'Statutory Approvals',
    shortDesc:
      'End-to-end council submission: OS location plans, Design & Access Statement, heritage appraisals and officer negotiation to a 99.4% first-time approval record.',
    priceGBP: 450,
    leadTime: '8 Weeks (Council Statutory Window)',
    deliverables: [
      'Ordnance Survey Location & Block Site Plans (1:1250 / 1:500)',
      'Design & Access Statement (DAS)',
      'Heritage & Conservation Impact Statements',
      'Permitted Development Feasibility Certificate',
      'Council Liaison, Officer Negotiation & Condition Discharge',
    ],
  },
  {
    id: 'building-regulations',
    sku: 'MA-BR-01',
    name: 'Building Regulations Package',
    category: 'Statutory Approvals',
    shortDesc:
      'Full technical compliance package satisfying Approved Documents Parts A–S, including Part L SAP energy models and Part B fire safety details.',
    priceGBP: 820,
    leadTime: '15 – 20 Working Days',
    deliverables: [
      'Part A (Structural Stability) Coordination Plans',
      'Part B (Fire Safety) Means of Escape & Fire Wall Details',
      'Part E (Acoustics) & Part F (Ventilation) Specifications',
      'Part L (Fuel & Power) SAP Energy Compliance',
      'Part M (Access) & Part P (Electrical Safety) Details',
    ],
  },
  {
    id: 'structural-engineering',
    sku: 'MA-STR-01',
    name: 'Structural Engineering Package',
    category: 'Engineering',
    shortDesc:
      'Chartered IStructE calculations — beam & column sizing, foundation pads, retaining walls and stamped sign-off building control accepts first time.',
    priceGBP: 820,
    leadTime: '7 – 12 Working Days',
    deliverables: [
      'Universal Beam (UB) & Universal Column (UC) Sizing',
      'Flitch Beam & Engineered Timber Load Calcs',
      'Reinforced Concrete Pad Foundation & Strip Footing Specs',
      'Retaining Wall & Underpinning Method Statements',
      'Chartered Engineer Stamped Sign-Off Document',
    ],
  },
];

export function findProduct(productId: string): CatalogProduct | undefined {
  return PRODUCTS.find((p) => p.id === productId);
}