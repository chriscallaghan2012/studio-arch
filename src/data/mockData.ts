import { Project, Service, ProcessStage, FAQItem, Testimonial } from '../types';

export const STUDIO_COORDINATES = '51.5074° N, 0.1278° W';
export const STUDIO_STATUS = 'CAD_DISPATCH: ACTIVE';
export const REVISION_TAG = 'REV_4.2.0 // 2024_STABLE';

export const PROJECTS: Project[] = [
  {
    id: 'glass-pavilion',
    refCode: 'MA-RES-084',
    title: 'The Glass Pavilion',
    category: 'residential',
    categoryLabel: 'Residential Extension',
    location: 'Hampstead, London',
    coordinates: '51.5559° N, 0.1783° W',
    year: '2024',
    areaSqm: 142,
    scale: '1:50',
    status: 'COMPLETED',
    heroImage: '/images/hero-02.jpg',
    blueprintImage: 'https://lh3.googleusercontent.com/aida/AEtjO1V3viWW6MAR6F-Y0qtWlwk01uV2UsRbdj7xPRw-IKVh_4V6t4zVXKg6Y15hyYbsPuifAXmokMgbXBQ5nEj5NOeMADqIk8lR5RPLm2AY-wCFqi6ZT78JVahSWurHJ2mYtDKm7q7iz5FGazGlKpfxUs2PzdTjj6JfcQhprw3p3ISvsR2kJeeUnC2Z43BRGo_Eii7MHVUmXS9PESec4FGOppGnwGT1kgTc483N-_3Gy7QZddKJ1Ps1I9QiVy0',
    galleryImages: [
      'https://lh3.googleusercontent.com/aida/AEtjO1UOCdC4Sf192g-ZXFwfxKsWun0bw8NI0v-FA-kS1IUiG20TH9Awy8Dqet1mUk59tdaqIjDOyKcwOjtP63q2hiU9a0bFn9AovVgto2Be2pOysgPyZEgga1U2NYvRA8XMHuC0KbP4fxj1prYhCjswFjX54WEhX3pEBT0YiPZ4_T6cb3gp2EBt7-gpIrhgRsIrMgUJ-RsayN37Pprl-WTT0Pw3eETMqFCqP9vwKxIeowx57cdlIEYH98Rwfs6g',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDhDio4PkyPpvJhV6_UmqljhwAl5_hYndo4zyLRh06LdxM4IhWaVkYveWV7lUzlNGvQUsMS9kq712zD0QYlZWsXw5wgXu_Se8Cz008zMRZrOugilyNn5h8_rECGyzdyQzScWPWEeun5l9HNyeilO3Ve4cjCbnLl9inMd8etwWdBHkkzZw9lzkY-fqFaSvSZk4YmbiSSsLr4nuff33JCPlLdmy_HRPi0PeIlBfRQFE3rSCL5OqC5drJ4Zw',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuA93YIwVPr7Fxl14aPn6joKXwaNNh4pVfkS1Ran9H-zjSD-5z6rNPwSOkqhj6fUsdhFZeTLZg8S9g63_nLlP6tHO8bvaSTqFHeerPOCRZBpVNJ11K3ZiUkTv4WdNRO_zeNDdscQ33sazPpCit3zvYhqtQ1blXi6BQCeIR24fXnFJaNv6wwwvAkYhU5-W40yhzCciNSEsGE3Ffg9B3il-74QtZFb7OGdZKezC-4JcD9KPT5EHacQSbJXIA'
    ],
    description: 'A minimalist, thermally unbroken glass extension connected to a Grade II listed Victorian terrace. Designed with ultra-slim sightlines and cantilevered structural steel to dissolve boundaries between internal living and the private landscaped courtyard.',
    challenge: 'Strict conservation area restrictions required full structural independence from the 1880s brickwork masonry while maintaining maximum daylight permeability without solar overheating.',
    solution: 'Engineered a concealed moment-frame steel portal with triple-glazed acoustic low-E panels, integrated perimeter slot drainage, and a passive ventilation thermal chimney system.',
    deliverables: ['Full GA Plans (1:50)', 'Structural Calculations (BS EN 1993)', 'Conservation Area Consent Dossier', 'Part L Compliance Energy Model', 'Detailed Connection Junctions (1:5)'],
    specs: {
      structuralSystem: 'Flitched Mild Steel Portal Frame',
      cladding: 'Structural Low-Iron Glass & Anodised Black Aluminium',
      glazingUValue: '0.85 W/m²K',
      planningAuthority: 'London Borough of Camden',
      approvalTimeWeeks: 8
    },
    clientType: 'Private Residence'
  },
  {
    id: 'urban-infill-study',
    refCode: 'MA-COM-019',
    title: 'Urban Infill Study',
    category: 'commercial',
    categoryLabel: 'Commercial & Mixed-Use',
    location: 'Shoreditch, London',
    coordinates: '51.5245° N, 0.0784° W',
    year: '2023',
    areaSqm: 380,
    scale: '1:100',
    status: 'COMPLETED',
    heroImage: '/images/hero-01.jpg',
    blueprintImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAtnkL1jPaOd0DnvVjLsaBBe_4CUnUcKJ8Uub1_p67zCBFXjXXz5norPLS3Qt69kD87zfs7RmwOX9EXHuNiAAQ4EPtW_SxWUtLzTcf7C4Ovl1cakgukDVmISzjEcsdqP-3eS906mbsVsLoqNElSRhcFLGYOXGRP9D8VEH6EE_u-0J5OwkG6kiF_HwIh1fD7pKDTfr0Kuw5GvzyIOot4H7r0avaGJz-fJQ_v9YzpHemB3U4kN8CRpmfwQA',
    galleryImages: [
      'https://lh3.googleusercontent.com/aida/AEtjO1V3viWW6MAR6F-Y0qtWlwk01uV2UsRbdj7xPRw-IKVh_4V6t4zVXKg6Y15hyYbsPuifAXmokMgbXBQ5nEj5NOeMADqIk8lR5RPLm2AY-wCFqi6ZT78JVahSWurHJ2mYtDKm7q7iz5FGazGlKpfxUs2PzdTjj6JfcQhprw3p3ISvsR2kJeeUnC2Z43BRGo_Eii7MHVUmXS9PESec4FGOppGnwGT1kgTc483N-_3Gy7QZddKJ1Ps1I9QiVy0',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuArWmOaI21BMrxNexi1D_GlByvVdDsNbvChaE3O3d5irKpMFzp1iGCIwdKt1QKjVb_WLFBWMOeCcMM-0GEmp4skMUyCttYH2E-9wz0k3u0DkT6nUqmJ7ZwVpjfavfkNSnY5diMueXqBh16VoFdAYfu_ehSJKaEWqg2SUF_uTC6cqpLNs0kKjM0JXzKATmguFU4warPUxtIt6JFm7hNE-GhTNCbZx0r36zRq8TlWnz6vDAiFdMGdmt9hMw'
    ],
    description: 'High-density five-story mixed commercial office and ground-floor gallery occupying an awkward 4.8-meter-wide post-industrial brownfield gap in East London.',
    challenge: 'Extremely restricted site boundary surrounded on three sides by party wall agreements and tight access for fabrication cranes.',
    solution: 'Designed an offsite modular cross-laminated timber (CLT) superstructure with precision laser-measured anchor interfaces and perforated brass brise-soleil facade.',
    deliverables: ['Full Technical Tender Package', 'Party Wall Schedule of Condition', 'BREEAM Excellent Documentation', '3D BIM Level 2 Model', 'Structural Foundation Piling Specs'],
    specs: {
      structuralSystem: 'Engineered Cross-Laminated Timber (CLT) & Steel Core',
      cladding: 'Patinated Perforated Brass & Recycled Aggregate Masonry',
      glazingUValue: '0.92 W/m²K',
      planningAuthority: 'London Borough of Hackney',
      approvalTimeWeeks: 12
    },
    clientType: 'Commercial Developer'
  },
  {
    id: 'heritage-extension',
    refCode: 'MA-RES-092',
    title: 'Heritage Extension // Modernist Annex',
    category: 'heritage',
    categoryLabel: 'Conservation & Heritage',
    location: 'Cotswolds, Gloucestershire',
    coordinates: '51.8330° N, 1.8433° W',
    year: '2024',
    areaSqm: 210,
    scale: '1:50',
    status: 'COMPLETED',
    heroImage: '/images/studio.jpg',
    blueprintImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB2Eqc94ZSkJTk08OhWKdMI0VvGS55SjeQSTbiP7Qbuf_R2S74PcAK45PvJT-QUqcxmWUQ3Hz0Xkj0nHjzZXN7osHM9GV1jNgcnYJ3KzX1erXJLrGByhifLwDvPNKbQPrRwZQDlhRpv3Vmr0HbEfk6C3NTNrWqo1Jzq_iYS2Omwx81hDi8tQje5O2lPfMdg7V2icJzgkDUZJbsCNY0xl5r7BpEPxwyt8kZD-e3NB7ZRMW4fOPld70GZJw',
    galleryImages: [
      'https://lh3.googleusercontent.com/aida/AEtjO1Vm4CJkv_b4q-h_ywnAxUO5T1EW3-Kipu7LFG6APXrey-nJPVtRa5po_DrekW_WS-WzIjxgyjbSA3HJ7mrtNHNBSdet6ohSbdZ3PWcYhNAzupbBUbaGDd5bEfN3hDQusFLzu5E8TzWlAoVzl-AVzqCiKkTAic9-2ujr3tbkKKZAUvuGy0OoToUcSNKP78AdvAToA-jd-W9N-oqDNPj8FQ92g5eDRMcgZR9vU7We7KBidzbdQS2KfJxO-vU',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAmaXLmC0fxVX9DkyJCzcmC-V_EHPkzFwV33bv0_KluuSJii2CshVbKPUE5bVRDWPGEwCUCD0qMI7CAVncAMP2oFZnIVbbdh99ebW8-ExOEw-gSOU-EQowTILft6UPHRv9AtJanTbzdeRw2JOCXrHiuL66d6HnaSPZGjLzLuP7A_WDLZRMr4OeqZvuK5GloGAgvDghXvgy26Unq514D5HBGnZ5GVf3jbHrbGd1bz6u-8_hi463r9Igqag'
    ],
    description: 'A stark contrast of dry-stacked Cotswold oolitic limestone and razor-thin dark zinc cantilevers, creating a dramatic new kitchen wing and art library overlooking undulating meadowlands.',
    challenge: 'Area of Outstanding Natural Beauty (AONB) requiring zero visual glare and strict height limits while executing a contemporary architectural language.',
    solution: 'Subdued sunken ground-plane architecture with sedum living roof, seamless frameless structural glass clerestories, and locally quarried coursed stone.',
    deliverables: ['Historic Building Impact Assessment', 'Full Architectural Working Drawings', 'Building Regulations Submission', 'Drainage SUDS Strategy', 'Lighting & Lux Spill Modeling'],
    specs: {
      structuralSystem: 'Cast-in-place Board-Marked Concrete & Steel Spine',
      cladding: 'Standing Seam Anthracite Zinc & Cotswold Oolite Stone',
      glazingUValue: '0.79 W/m²K (Passivhaus Spec)',
      planningAuthority: 'Cotswold District Council',
      approvalTimeWeeks: 10
    },
    clientType: 'Private Client'
  },
  {
    id: 'monolithic-residence',
    refCode: 'MA-RES-077',
    title: 'Monolithic Concrete Residence',
    category: 'new-builds',
    categoryLabel: 'New Build Residential',
    location: 'Highgate, London',
    coordinates: '51.5714° N, 0.1472° W',
    year: '2023',
    areaSqm: 450,
    scale: '1:100',
    status: 'COMPLETED',
    heroImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAIP-x2AyuK0c3M3gc_vte5Un3CaQm7y8DO8K-kgmXYvzx1eFOsnVl85j4GTs_4xzJugK_nLZML58RLOqghl48W6LiBHb_VlufKvl2Ge51Enp-VDpqkPM-H1OEsxEqVpDKcxfOju27EkUfD_c6qRQqSQ55XhvhZZGBh-xaMQtt0FrLl6UIPUK00FkWMGq3QF1S86gZa6oVlnRwRkX8RGcG28Lg9WeFlNZ4n3NEOQIERrg7PMKjfgFD_-g',
    blueprintImage: 'https://lh3.googleusercontent.com/aida/AEtjO1V3viWW6MAR6F-Y0qtWlwk01uV2UsRbdj7xPRw-IKVh_4V6t4zVXKg6Y15hyYbsPuifAXmokMgbXBQ5nEj5NOeMADqIk8lR5RPLm2AY-wCFqi6ZT78JVahSWurHJ2mYtDKm7q7iz5FGazGlKpfxUs2PzdTjj6JfcQhprw3p3ISvsR2kJeeUnC2Z43BRGo_Eii7MHVUmXS9PESec4FGOppGnwGT1kgTc483N-_3Gy7QZddKJ1Ps1I9QiVy0',
    galleryImages: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAIP-x2AyuK0c3M3gc_vte5Un3CaQm7y8DO8K-kgmXYvzx1eFOsnVl85j4GTs_4xzJugK_nLZML58RLOqghl48W6LiBHb_VlufKvl2Ge51Enp-VDpqkPM-H1OEsxEqVpDKcxfOju27EkUfD_c6qRQqSQ55XhvhZZGBh-xaMQtt0FrLl6UIPUK00FkWMGq3QF1S86gZa6oVlnRwRkX8RGcG28Lg9WeFlNZ4n3NEOQIERrg7PMKjfgFD_-g',
      'https://lh3.googleusercontent.com/aida/AEtjO1UOCdC4Sf192g-ZXFwfxKsWun0bw8NI0v-FA-kS1IUiG20TH9Awy8Dqet1mUk59tdaqIjDOyKcwOjtP63q2hiU9a0bFn9AovVgto2Be2pOysgPyZEgga1U2NYvRA8XMHuC0KbP4fxj1prYhCjswFjX54WEhX3pEBT0YiPZ4_T6cb3gp2EBt7-gpIrhgRsIrMgUJ-RsayN37Pprl-WTT0Pw3eETMqFCqP9vwKxIeowx57cdlIEYH98Rwfs6g'
    ],
    description: 'A 3-level subterranean and above-ground sculptural residence rendered in board-marked architectural concrete and charred Japanese cedar (Shou Sugi Ban).',
    challenge: 'Steep sloping topography with high water table and protected mature oak tree root protection zones.',
    solution: 'Contiguous piled retaining wall structure forming a sealed waterproof basement tub with structural cantilever lightwells bringing morning sun into the lower levels.',
    deliverables: ['Detailed Basements Method Statement', 'Structural Hydrostatic Pressure Specs', 'Arboricultural Protection Plans', 'Full MEP Schematics', 'Full Interior Architectural Joinery'],
    specs: {
      structuralSystem: 'Waterproof RC Concrete Box & Post-Tensioned Slabs',
      cladding: 'Yakisugi Charred Cedar & Board-Marked C35 Concrete',
      glazingUValue: '0.80 W/m²K',
      planningAuthority: 'London Borough of Haringey',
      approvalTimeWeeks: 14
    },
    clientType: 'Private Family'
  }
];

export const SERVICES: Service[] = [
  {
    id: 'architectural-drawings',
    indexNumber: '01',
    title: 'Architectural Drawings',
    subtitle: 'Precision 2D CAD & 3D BIM Technical Packages',
    shortDesc: 'Complete measured surveys, GA floor plans, elevations, building sections, and detailed assembly drawings generated to ISO 128 standards.',
    fullDesc: 'We draft rigorously detailed architectural drawing packages engineered to eliminate builder ambiguity and accelerate council approval. From initial millimetre-accurate laser surveys through to 1:5 construction connection details, every line is dimensioned with statutory precision.',
    iconName: 'Compass',
    deliverables: [
      'Existing & Proposed Floor Plans (1:50 / 1:100)',
      'Four-Sided Elevation Drawings with Materials Callouts',
      'Cross-Sections & Long-Sections Showing Finished Floor Levels',
      'Roof Drainage & Parapet Detail Sheets (1:10 / 1:5)',
      'Door & Window Schedules with Thermal Specifications',
      'Full Vector PDF, DWG, and IFC BIM exports'
    ],
    regulationsCovered: ['BS 1192 / ISO 19650', 'RIBA Plan of Work Stage 3/4', 'Standard Metric Dimensioning'],
    cadPreviewImage: 'https://lh3.googleusercontent.com/aida/AEtjO1V3viWW6MAR6F-Y0qtWlwk01uV2UsRbdj7xPRw-IKVh_4V6t4zVXKg6Y15hyYbsPuifAXmokMgbXBQ5nEj5NOeMADqIk8lR5RPLm2AY-wCFqi6ZT78JVahSWurHJ2mYtDKm7q7iz5FGazGlKpfxUs2PzdTjj6JfcQhprw3p3ISvsR2kJeeUnC2Z43BRGo_Eii7MHVUmXS9PESec4FGOppGnwGT1kgTc483N-_3Gy7QZddKJ1Ps1I9QiVy0',
    leadTime: '10 - 15 Working Days',
    scaleStandard: '1:50 @ A1 // 1:100 @ A2'
  },
  {
    id: 'planning-permissions',
    indexNumber: '02',
    title: 'Planning Permissions',
    subtitle: 'Full Planning, Prior Approval & Permitted Development',
    shortDesc: 'Comprehensive council submissions, Design & Access Statements, heritage impact appraisals, and complete liaison with Local Planning Authorities.',
    fullDesc: 'Navigating the planning bureaucracy requires technical precision and policy mastery. We manage the end-to-end process: identifying permitted development rights, preparing robust policy justifications, liaising with planning officers, and achieving a 99.4% first-time approval rate.',
    iconName: 'FileCheck',
    deliverables: [
      'Ordnance Survey Location & Block Site Plans (1:1250 / 1:500)',
      'Design and Access Statements (DAS)',
      'Heritage & Conservation Impact Statements',
      'Permitted Development Feasibility Certificates (Lawful Development Certificates)',
      'Council Liaison, Officer Negotiation & Condition Discharge'
    ],
    regulationsCovered: ['Town and Country Planning Act 1990', 'National Planning Policy Framework (NPPF)', 'Local Area Planning Policies'],
    cadPreviewImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDhDio4PkyPpvJhV6_UmqljhwAl5_hYndo4zyLRh06LdxM4IhWaVkYveWV7lUzlNGvQUsMS9kq712zD0QYlZWsXw5wgXu_Se8Cz008zMRZrOugilyNn5h8_rECGyzdyQzScWPWEeun5l9HNyeilO3Ve4cjCbnLl9inMd8etwWdBHkkzZw9lzkY-fqFaSvSZk4YmbiSSsLr4nuff33JCPlLdmy_HRPi0PeIlBfRQFE3rSCL5OqC5drJ4Zw',
    leadTime: '8 Weeks (Council Statutory Window)',
    scaleStandard: '1:500 / 1:1250 Ordnance Datum'
  },
  {
    id: 'building-regulations',
    indexNumber: '03',
    title: 'Building Regulations',
    subtitle: 'Statutory Technical Compliance & Building Control',
    shortDesc: 'Full technical blueprints satisfying all Parts of Building Regulations (Parts A through S), preventing costly site delays and enforcement notices.',
    fullDesc: 'Building Control approval is mandatory before breaking ground. We generate detailed technical packages addressing structural safety, fire separation, thermal insulation, acoustic performance, ventilation rates, and drainage protocols for both Local Authority and Approved Inspectors.',
    iconName: 'ShieldCheck',
    deliverables: [
      'Part A (Structural Stability) Coordination Plans',
      'Part B (Fire Safety) Means of Escape & Fire Wall Details',
      'Part E (Acoustics) & Part F (Ventilation) Specifications',
      'Part L (Conservation of Fuel & Power) SAP Energy Compliance',
      'Part M (Access & Disabled Use) Step-free Details',
      'Part P (Electrical Safety) & Part S (EV Infrastructure)'
    ],
    regulationsCovered: ['Building Regulations 2010 (UK)', 'Approved Documents Parts A–S', 'LABC & NHBC Standards'],
    cadPreviewImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB2Eqc94ZSkJTk08OhWKdMI0VvGS55SjeQSTbiP7Qbuf_R2S74PcAK45PvJT-QUqcxmWUQ3Hz0Xkj0nHjzZXN7osHM9GV1jNgcnYJ3KzX1erXJLrGByhifLwDvPNKbQPrRwZQDlhRpv3Vmr0HbEfk6C3NTNrWqo1Jzq_iYS2Omwx81hDi8tQje5O2lPfMdg7V2icJzgkDUZJbsCNY0xl5r7BpEPxwyt8kZD-e3NB7ZRMW4fOPld70GZJw',
    leadTime: '15 - 20 Working Days',
    scaleStandard: '1:20 / 1:10 Construction Assemblies'
  },
  {
    id: 'structural-engineering',
    indexNumber: '04',
    title: 'Structural Engineering',
    subtitle: 'Calculations, Steelwork Design & Foundation Engineering',
    shortDesc: 'Chartered structural calculations (IStructE), beam sizing, foundation pads, retaining walls, and steel portal moment-frames.',
    fullDesc: 'Seamlessly integrated with our architectural drawing sets, our structural engineering team calculates load distribution, moments of inertia, and deflection margins to produce stamped calculations that building control officers and fabricators approve immediately.',
    iconName: 'Layers',
    deliverables: [
      'Universal Beam (UB) & Universal Column (UC) Sizing',
      'Flitch Beam & Engineered Timber Load Calcs',
      'Reinforced Concrete Pad Foundation & Strip Footing Specs',
      'Retaining Wall & Underpinning Method Statements',
      'Wind Load & Deflection Assessment Reports',
      'Chartered Engineer Stamped Sign-Off Document'
    ],
    regulationsCovered: ['Eurocode 3 (BS EN 1993 Steel)', 'Eurocode 2 (BS EN 1992 Concrete)', 'Eurocode 5 (BS EN 1995 Timber)'],
    cadPreviewImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAtnkL1jPaOd0DnvVjLsaBBe_4CUnUcKJ8Uub1_p67zCBFXjXXz5norPLS3Qt69kD87zfs7RmwOX9EXHuNiAAQ4EPtW_SxWUtLzTcf7C4Ovl1cakgukDVmISzjEcsdqP-3eS906mbsVsLoqNElSRhcFLGYOXGRP9D8VEH6EE_u-0J5OwkG6kiF_HwIh1fD7pKDTfr0Kuw5GvzyIOot4H7r0avaGJz-fJQ_v9YzpHemB3U4kN8CRpmfwQA',
    leadTime: '7 - 12 Working Days',
    scaleStandard: '1:20 Connection Nodes'
  }
];

export const PROCESS_STAGES: ProcessStage[] = [
  {
    stepNumber: '01',
    title: 'Consultation & Briefing',
    duration: 'Week 1',
    deliverableCode: 'DOC_REF: MA-PRC-001',
    summary: 'Initial site assessment, spatial objective scoping, and regulatory feasibility analysis.',
    details: [
      'Comprehensive in-person or digital site review',
      'Permitted development rights & local planning restriction triage',
      'Budgetary alignment and structural complexity audit',
      'Formal project scope agreement and client brief dossier'
    ],
    keyOutputs: ['Project Inception Brief', 'Permitted Development Feasibility Score', 'Fixed Fee Architectural Proposal'],
    badge: 'STAGE_01 // DISCOVERY',
    schematicType: 'consultation'
  },
  {
    stepNumber: '02',
    title: 'Site Analysis & Laser Survey',
    duration: 'Week 1 - 2',
    deliverableCode: 'DOC_REF: MA-PRC-002',
    summary: 'High-precision 3D point-cloud and laser measured survey of existing structures and boundary levels.',
    details: [
      'Millimetre-accurate 3D Leica laser scan of interior and exterior envelope',
      'Drainage manhole invert levels & sewer direction tracing',
      'Boundary wall alignment, party wall inspection & datum benchmarks',
      'Digital CAD CAD-drawing generation of existing state'
    ],
    keyOutputs: ['Existing Floor Plans (1:50)', 'Existing Elevation Sets', 'Topographic Site Map'],
    badge: 'STAGE_02 // MEASUREMENT',
    schematicType: 'site_analysis'
  },
  {
    stepNumber: '03',
    title: 'Concept Architectural Design',
    duration: 'Week 3 - 4',
    deliverableCode: 'DOC_REF: MA-PRC-003',
    summary: 'Spatial layout exploration, 3D volumetric modeling, and material formulation.',
    details: [
      'Development of 2-3 spatial layout design options',
      '3D daylight and sun-path volumetric studies',
      'Material palette formulation and structural logic integration',
      'Interactive design review workshop with client'
    ],
    keyOutputs: ['Concept Design Presentation Deck', '3D Visualisations', 'Preferred Scheme Sign-off'],
    badge: 'STAGE_03 // ITERATION',
    schematicType: 'concept'
  },
  {
    stepNumber: '04',
    title: 'Technical Drawings & Spec',
    duration: 'Week 5 - 6',
    deliverableCode: 'DOC_REF: MA-PRC-004',
    summary: 'Execution of complete statutory 2D working drawings, building sections, and engineering.',
    details: [
      'Comprehensive general arrangement drawings at 1:50 and 1:100',
      'Integration of structural steelwork and load-bearing schedules',
      'Full thermal envelope and insulation build-up details at 1:5',
      'Door, window, and rooflight technical schedules'
    ],
    keyOutputs: ['Full Working Drawing Pack', 'Structural Calculation Package', 'Tender Specification Schedule'],
    badge: 'STAGE_04 // ENGINEERING',
    schematicType: 'technical'
  },
  {
    stepNumber: '05',
    title: 'Planning Submission Support',
    duration: 'Week 7 - 8',
    deliverableCode: 'DOC_REF: MA-PRC-005',
    summary: 'Preparation of formal council portal submission, Design & Access statements, and officer management.',
    details: [
      'Ordnance survey licensing and site location boundary mapping',
      'Drafting of Design & Access Statement and Heritage Appraisals',
      'Electronic submission to the Local Planning Authority via Planning Portal',
      'Direct liaison with assigned Planning Case Officer'
    ],
    keyOutputs: ['Validated Planning Application', 'Officer Negotiation Logs', 'Notice of Decision Certificate'],
    badge: 'STAGE_05 // STATUTORY',
    schematicType: 'planning'
  },
  {
    stepNumber: '06',
    title: 'Project Handover & Building Control',
    duration: 'Week 9+',
    deliverableCode: 'DOC_REF: MA-PRC-006',
    summary: 'Final contractor-ready construction package issue, Building Control sign-off, and site support.',
    details: [
      'Issuing stamped Building Control Approved Plans',
      'Builder tender packs and schedule of works coordination',
      'Party Wall Surveyor coordination information',
      'On-site technical support during critical structural phases'
    ],
    keyOutputs: ['Full Construction Dossier (PDF/DWG)', 'Building Control Approval Certificate', 'Contractor Tender Pack'],
    badge: 'STAGE_06 // REALIZATION',
    schematicType: 'handover'
  }
];

export const FAQS: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'Planning',
    question: 'What is the difference between Permitted Development and Full Planning Permission?',
    answer: 'Permitted Development (PD) rights allow homeowners to perform certain types of building work and extensions without applying for planning permission, provided specific limits (e.g., maximum height, depth from rear wall, volume limits) are met. Full Planning Permission is required when work falls outside these parameters, or if your property is a flat, in a Conservation Area, or a Listed Building. We always advise obtaining a Lawful Development Certificate even under PD to guarantee legal compliance for future property sales.',
    docRef: 'REG_DOC: GPDO 2015 / SCHEDULE 2'
  },
  {
    id: 'faq-2',
    category: 'Building Regs',
    question: 'Why do I need Building Regulations approval if I already have Planning Permission?',
    answer: 'Planning Permission deals with the external appearance, size, boundary impact, and usage of your property in relation to neighbors and the local environment. Building Regulations approval ensures the structure is physically safe, energy-efficient, structurally sound, and compliant with fire safety, ventilation, and drainage laws. You cannot legally commence construction with only planning permission.',
    docRef: 'REG_DOC: BUILDING ACT 1984 / PT-A-S'
  },
  {
    id: 'faq-3',
    category: 'Structural',
    question: 'When do I need a Chartered Structural Engineer for my project?',
    answer: 'A structural engineer is required whenever you remove or alter load-bearing walls, install steel beams (RSJs/UBs), create open-plan living areas, build loft conversions with new floor joists, or excavate foundations near tree roots or poor soil. We include complete chartered structural calculations (stamped for Building Control) directly inside our technical drawing packages.',
    docRef: 'CALC_REF: ISTRUCTE / EUROCODE 3'
  },
  {
    id: 'faq-4',
    category: 'Pricing & Process',
    question: 'How long does it take from initial survey to having builder-ready plans?',
    answer: 'A typical residential project takes between 3 to 4 weeks for survey and architectural drawing preparation. If planning permission is required, local councils operate on a statutory 8-week decision timetable. Technical building regulations and structural calculations take an additional 2 to 3 weeks and can often run in parallel.',
    docRef: 'SCHED_REF: RIBA STAGES 1-4'
  },
  {
    id: 'faq-5',
    category: 'Planning',
    question: 'What is the Party Wall Act, and when does it apply to my project?',
    answer: 'The Party Wall etc. Act 1996 applies if you are excavating within 3 meters (or 6 meters for deep foundations) of a neighboring building, cutting into or building directly on a boundary wall, or inserting structural steel into a shared party wall. Notices must be served at least 1-2 months before construction starts. Our plans provide all required cross-sections for your Party Wall Surveyor.',
    docRef: 'ACT_REF: PARTY WALL ETC ACT 1996'
  },
  {
    id: 'faq-6',
    category: 'Building Regs',
    question: 'What are the updated Part L (Energy & Carbon) requirements for home extensions?',
    answer: 'The updated Approved Document Part L requires significantly improved thermal U-values for all new building elements (e.g., walls <= 0.18 W/m²K, flat roofs <= 0.15 W/m²K, and glazing <= 1.2 W/m²K). Furthermore, glazing area is restricted to a maximum of 25% of the total new floor area unless an overarching SAP carbon-offset calculation is proved. Masonry Architecture calculates complete Part L energy models to ensure compliance.',
    docRef: 'ENERGY_REF: APPROVED DOC L 2022'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't-1',
    clientName: 'Alexander Vance',
    clientRole: 'Managing Director, Horizon Developments',
    projectRef: 'MA-COM-019',
    projectTitle: 'Shoreditch Urban Infill',
    rating: 5,
    quote: 'The level of technical precision Masonry Architecture brought to our complex five-storey CLT infill was exceptional. Their drawings passed Hackney Planning with zero objections on first submission, and our structural contractor commended the clarity of the junction specs.',
    year: '2023',
    location: 'Shoreditch, London'
  },
  {
    id: 't-2',
    clientName: 'Eleanor & Marcus Davies',
    clientRole: 'Private Homeowners',
    projectRef: 'MA-RES-084',
    projectTitle: 'The Glass Pavilion',
    rating: 5,
    quote: 'Navigating Camden planning in a conservation zone felt daunting until we hired Masonry Architecture. Their 3D daylight study and elegant structural glass cantilever drawings sailed through council in 8 weeks flat. Truly architectural craftsmanship.',
    year: '2024',
    location: 'Hampstead, London'
  },
  {
    id: 't-3',
    clientName: 'Jonathan Croft',
    clientRole: 'Heritage Property Restorer',
    projectRef: 'MA-RES-092',
    projectTitle: 'Cotswolds Modernist Annex',
    rating: 5,
    quote: 'Their ability to balance historic oolitic stone textures with razor-thin zinc details is unmatched. The building control package was airtight—every Part A, B, and L requirement was documented down to the millimeter.',
    year: '2024',
    location: 'Cotswolds, UK'
  }
];

export const STATS = [
  { label: 'Years of Technical Practice', value: '10+', sub: 'Est. 2014' },
  { label: 'Executed Plan Packages', value: '140+', sub: 'Residential & Commercial' },
  { label: 'First-Time Planning Approval', value: '99.4%', sub: 'Across 28 London & UK Boroughs' },
  { label: 'Statutory Compliance Rating', value: '100%', sub: 'Part A to S Building Control' }
];
