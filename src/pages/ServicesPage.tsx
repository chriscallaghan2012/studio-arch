import React, { useState } from 'react';
import { SERVICES } from '../data/mockData';
import { PRODUCTS } from '../data/catalog';
import { formatGBP } from '../lib/format';
import { StructuralSchematicExplorer } from '../components/StructuralSchematicExplorer';
import { Compass, FileCheck, ShieldCheck, Layers, Check, Calculator, ArrowRight, BookOpen, AlertCircle, ShoppingCart } from 'lucide-react';
import { SmartImage } from '../components/SmartImage';

interface ServicesPageProps {
  onOpenEstimator: () => void;
  onInitiateWithService: (serviceName: string) => void;
  onAddToCart: (productId: string) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({
  onOpenEstimator,
  onInitiateWithService,
  onAddToCart
}) => {
  const [activeServiceId, setActiveServiceId] = useState(SERVICES[0].id);
  const [addedSku, setAddedSku] = useState<string | null>(null);

  const selectedService = SERVICES.find((s) => s.id === activeServiceId) || SERVICES[0];
  const selectedProduct = PRODUCTS.find((p) => p.id === selectedService.id);

  const handleAddToCart = () => {
    if (!selectedService) return;
    onAddToCart(selectedService.id);
    setAddedSku(selectedService.id);
    window.setTimeout(() => setAddedSku(null), 2000);
  };

  const approvedParts = [
    { code: 'Part A', title: 'Structure', desc: 'Load-bearing capacity, disproportionate collapse & foundations' },
    { code: 'Part B', title: 'Fire Safety', desc: 'Means of escape, fire barriers & external wall spread' },
    { code: 'Part E', title: 'Resistance to Sound', desc: 'Sound insulation between party walls and floors' },
    { code: 'Part F', title: 'Ventilation', desc: 'Background trickle vents & mechanical extract rates' },
    { code: 'Part H', title: 'Drainage & Waste', desc: 'SUDS, soakaways, rainwater attenuation & foul sewer connections' },
    { code: 'Part L', title: 'Conservation of Fuel & Power', desc: 'Thermal U-values, SAP carbon models & solar heat gain' },
    { code: 'Part M', title: 'Access to & Use of Buildings', desc: 'Step-free entrance, door clear openings & WC accessibility' },
    { code: 'Part P', title: 'Electrical Safety', desc: 'Design and installation of electrical circuitry' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      
      {/* Header */}
      <div className="border-b border-hairline pb-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="text-xs font-sans text-brass uppercase tracking-widest font-bold mb-1">
              SERVICES &amp; CAPABILITIES
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-ink font-display">
              Services &amp; Capabilities
            </h1>
            <p className="text-sm text-stone font-sans mt-2 max-w-2xl">
              From measured 3D laser surveys and spatial planning to full council submission management and stamped structural steel packages.
            </p>
          </div>

          <button
            onClick={onOpenEstimator}
            className="px-5 py-3 bg-ink text-white text-xs font-sans font-bold hover:bg-ink-soft transition-colors flex items-center space-x-2"
          >
            <Calculator className="w-4 h-4 text-brass-light" />
            <span>REQUEST A FEE GUIDE</span>
          </button>
        </div>
      </div>

      {/* 4 Core Disciplines Tabs & Deep Dive */}
      <div className="space-y-6">
        {/* Navigation Selector Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {SERVICES.map((srv) => {
            const isActive = srv.id === activeServiceId;
            return (
              <button
                key={srv.id}
                onClick={() => setActiveServiceId(srv.id)}
                className={`p-4 text-left border transition-all cursor-pointer font-sans ${
                  isActive
                    ? 'bg-ink-soft text-white border-ink shadow-lg'
                    : 'bg-white text-ink border-hairline hover:border-stone'
                }`}
              >
                <span className={`text-xs font-sans font-bold block mb-1 ${isActive ? 'text-brass-light' : 'text-stone'}`}>
                  SERVICE {srv.indexNumber}
                </span>
                <h3 className="font-bold text-sm sm:text-base font-display">
                  {srv.title}
                </h3>
              </button>
            );
          })}
        </div>

        {/* Selected Service Detailed Dossier */}
        <div className="bg-white border border-hairline p-6 sm:p-8 shadow-md">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left: Detailed Narrative & Deliverables */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <div className="inline-block px-2 py-0.5 bg-brass/10 text-brass border border-brass/40 text-[10px] font-sans font-bold mb-2">
                  SCALE · {selectedService.scaleStandard}
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-ink font-display">
                  {selectedService.title}
                </h2>
                <p className="text-sm font-sans text-brass font-semibold mt-1">
                  {selectedService.subtitle}
                </p>
                <p className="text-sm text-stone font-sans leading-relaxed mt-3">
                  {selectedService.fullDesc}
                </p>
              </div>

              {/* Deliverable Sheet Checklist */}
              <div className="p-5 bg-ivory border border-hairline space-y-3 font-sans text-xs">
                <span className="text-xs font-bold text-ink uppercase tracking-wider block border-b border-hairline pb-1">
                  INCLUDED DELIVERABLES
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-stone">
                  {selectedService.deliverables.map((item, idx) => (
                    <div key={idx} className="flex items-start space-x-2">
                      <Check className="w-3.5 h-3.5 text-sage shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                {selectedProduct && (
                  <div className="px-3.5 py-2 bg-brass/10 border border-brass/40 text-brass font-sans text-sm font-bold">
                    {formatGBP(selectedProduct.priceGBP)}
                    <span className="text-[10px] text-stone block -mt-0.5">fixed package fee</span>
                  </div>
                )}
                <button
                  onClick={handleAddToCart}
                  className={`px-5 py-3 ${addedSku === selectedService.id ? 'bg-sage hover:bg-sage/80 text-white' : 'bg-brass hover:bg-brass-light text-black'} font-sans text-xs font-bold uppercase tracking-wider flex items-center space-x-2 transition-colors cursor-pointer`}
                >
                  <ShoppingCart className="w-3.5 h-3.5" />
                  <span>
                    {addedSku === selectedService.id ? 'Added to Cart ✓' : 'Add to Cart'}
                  </span>
                </button>
                <button
                  onClick={() => onInitiateWithService(selectedService.title)}
                  className="px-5 py-3 bg-ink hover:bg-ink-soft text-white font-sans text-xs font-bold uppercase tracking-wider flex items-center space-x-2 transition-colors cursor-pointer"
                >
                  <span>Request Proposal</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Right: Technical CAD Preview & Regulations */}
            <div className="lg:col-span-5 space-y-4">
              <div className="border border-white/10 bg-ink-soft p-2 text-white font-sans text-xs">
                <div className="text-[10px] text-brass-light p-2 flex justify-between">
                  <span>WORKING DRAWING · PREVIEW</span>
                  <span>LEAD TIME: {selectedService.leadTime}</span>
                </div>
                <div className="relative h-60 w-full overflow-hidden bg-black">
                  <SmartImage
                    src={selectedService.cadPreviewImage}
                    alt={selectedService.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover filter contrast-125"
                  />
                  <div className="absolute inset-0 bg-blueprint-grid-dense opacity-40 pointer-events-none"></div>
                </div>
              </div>

              <div className="p-4 bg-ink/5 border border-hairline font-sans text-xs space-y-2">
                <span className="text-[10px] font-bold text-stone uppercase block">
                  REGULATIONS &amp; STANDARDS
                </span>
                <ul className="space-y-1 text-ink">
                  {selectedService.regulationsCovered.map((reg, idx) => (
                    <li key={idx} className="flex items-center space-x-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-ivory0"></span>
                      <span className="font-semibold">{reg}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Structural Engineering Simulator */}
      <div className="space-y-4">
        <div className="flex justify-between items-end border-b border-hairline pb-2">
          <div>
            <div className="text-xs font-sans text-brass uppercase tracking-widest font-bold">
              STRUCTURAL ENGINEERING
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-ink font-display">
              Integrated Structural Calculations
            </h2>
          </div>
        </div>
        <StructuralSchematicExplorer />
      </div>

      {/* Building Regulations Approved Documents (Parts A - P) Checklist */}
      <div className="space-y-6">
        <div className="border-b border-hairline pb-2">
          <div className="text-xs font-sans text-brass uppercase tracking-widest font-bold">
            COMPLIANCE &amp; BUILDING CONTROL
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-ink font-display">
            Approved Documents (Parts A through P)
          </h2>
          <p className="text-sm text-stone font-sans mt-1">
            Every technical package we issue is guaranteed to satisfy all relevant Approved Documents under the Building Act 1984.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-sans text-xs">
          {approvedParts.map((part) => (
            <div key={part.code} className="p-4 bg-white border border-hairline space-y-1.5">
              <div className="flex justify-between items-center text-brass font-bold">
                <span>{part.code}</span>
                <span className="text-[10px] text-sage bg-sage/15 px-1.5 py-0.5 border border-sage/40">
                  COMPLIANT
                </span>
              </div>
              <h4 className="font-bold text-ink font-sans text-sm">{part.title}</h4>
              <p className="text-stone text-[11px] font-sans leading-relaxed">{part.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Metric Scale Guide */}
      <div className="bg-ink-soft text-white p-6 sm:p-8 border border-white/10 font-sans text-xs space-y-4">
        <div className="flex justify-between items-center border-b border-white/10 pb-3">
          <span className="text-brass-light font-bold uppercase tracking-widest">
            METRIC DRAWING SCALE STANDARDS
          </span>
          <span className="text-stone text-[11px]">ALL DRAWINGS PRODUCED TO ORTHOGRAPHIC STANDARD</span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-white/70">
          <div className="p-3 bg-ink-soft border border-white/10">
            <span className="text-white font-bold block text-sm">1:1250 &amp; 1:500</span>
            <span className="text-stone text-[10px]">OS Site Location &amp; Block Plans</span>
          </div>
          <div className="p-3 bg-ink-soft border border-white/10">
            <span className="text-white font-bold block text-sm">1:100 &amp; 1:50</span>
            <span className="text-stone text-[10px]">General Arrangement Floor Plans</span>
          </div>
          <div className="p-3 bg-ink-soft border border-white/10">
            <span className="text-white font-bold block text-sm">1:50 &amp; 1:20</span>
            <span className="text-stone text-[10px]">Building Elevations &amp; Cross Sections</span>
          </div>
          <div className="p-3 bg-ink-soft border border-white/10">
            <span className="text-white font-bold block text-sm">1:10 &amp; 1:5</span>
            <span className="text-stone text-[10px]">Thermal Eaves, Parapets &amp; Foundation Details</span>
          </div>
        </div>
      </div>

    </div>
  );
};
