import React, { useState } from 'react';
import { SERVICES } from '../data/mockData';
import { StructuralSchematicExplorer } from '../components/StructuralSchematicExplorer';
import { Compass, FileCheck, ShieldCheck, Layers, Check, Calculator, ArrowRight, BookOpen, AlertCircle } from 'lucide-react';

interface ServicesPageProps {
  onOpenEstimator: () => void;
  onInitiateWithService: (serviceName: string) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({
  onOpenEstimator,
  onInitiateWithService
}) => {
  const [activeServiceId, setActiveServiceId] = useState(SERVICES[0].id);

  const selectedService = SERVICES.find((s) => s.id === activeServiceId) || SERVICES[0];

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
      <div className="border-b-2 border-slate-300 pb-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="text-xs font-mono text-sky-800 uppercase tracking-widest font-bold mb-1">
              DISCIPLINES // STATUTORY CAPABILITIES
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 font-display">
              Services &amp; Capabilities
            </h1>
            <p className="text-sm text-slate-600 font-sans mt-2 max-w-2xl">
              From measured 3D laser surveys and spatial planning to full council submission management and stamped structural steel packages.
            </p>
          </div>

          <button
            onClick={onOpenEstimator}
            className="px-5 py-3 bg-[#001f3f] text-white text-xs font-mono font-bold hover:bg-[#002b49] transition-colors flex items-center space-x-2"
          >
            <Calculator className="w-4 h-4 text-sky-400" />
            <span>CALCULATE SERVICE PACKAGE FEE</span>
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
                className={`p-4 text-left border-2 transition-all cursor-pointer font-sans ${
                  isActive
                    ? 'bg-[#001733] text-white border-[#001733] shadow-lg'
                    : 'bg-white text-slate-800 border-slate-300 hover:border-slate-400'
                }`}
              >
                <span className={`text-xs font-mono font-bold block mb-1 ${isActive ? 'text-sky-400' : 'text-slate-400'}`}>
                  DISCIPLINE {srv.indexNumber}
                </span>
                <h3 className="font-bold text-sm sm:text-base font-display">
                  {srv.title}
                </h3>
              </button>
            );
          })}
        </div>

        {/* Selected Service Detailed Dossier */}
        <div className="bg-white border-2 border-slate-300 p-6 sm:p-8 shadow-md">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left: Detailed Narrative & Deliverables */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <div className="inline-block px-2 py-0.5 bg-sky-100 text-sky-900 border border-sky-300 text-[10px] font-mono font-bold mb-2">
                  STANDARD: {selectedService.scaleStandard}
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
                  {selectedService.title}
                </h2>
                <p className="text-sm font-mono text-sky-800 font-semibold mt-1">
                  {selectedService.subtitle}
                </p>
                <p className="text-sm text-slate-700 font-sans leading-relaxed mt-3">
                  {selectedService.fullDesc}
                </p>
              </div>

              {/* Deliverable Sheet Checklist */}
              <div className="p-5 bg-slate-50 border border-slate-300 space-y-3 font-mono text-xs">
                <span className="text-xs font-bold text-slate-900 uppercase tracking-wider block border-b border-slate-200 pb-1">
                  INCLUDED DELIVERABLE SHEETS:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-700">
                  {selectedService.deliverables.map((item, idx) => (
                    <div key={idx} className="flex items-start space-x-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => onInitiateWithService(selectedService.title)}
                  className="px-6 py-3 bg-[#001f3f] hover:bg-[#002b49] text-white font-mono text-xs font-bold uppercase tracking-wider flex items-center space-x-2 transition-colors cursor-pointer"
                >
                  <span>REQUEST PROPOSAL FOR {selectedService.title.toUpperCase()}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Right: Technical CAD Preview & Regulations */}
            <div className="lg:col-span-5 space-y-4">
              <div className="border border-slate-700 bg-[#001026] p-2 text-white font-mono text-xs">
                <div className="text-[10px] text-sky-400 p-2 flex justify-between">
                  <span>CAD_SAMPLE // PREVIEW</span>
                  <span>LEAD TIME: {selectedService.leadTime}</span>
                </div>
                <div className="relative h-60 w-full overflow-hidden bg-black">
                  <img
                    src={selectedService.cadPreviewImage}
                    alt={selectedService.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover filter contrast-125"
                  />
                  <div className="absolute inset-0 bg-blueprint-grid-dense opacity-40 pointer-events-none"></div>
                </div>
              </div>

              <div className="p-4 bg-[#ebe7df] border border-slate-300 font-mono text-xs space-y-2">
                <span className="text-[10px] font-bold text-slate-600 uppercase block">
                  STATUTORY FRAMEWORK &amp; CODES:
                </span>
                <ul className="space-y-1 text-slate-800">
                  {selectedService.regulationsCovered.map((reg, idx) => (
                    <li key={idx} className="flex items-center space-x-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-500"></span>
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
        <div className="flex justify-between items-end border-b border-slate-300 pb-2">
          <div>
            <div className="text-xs font-mono text-sky-800 uppercase tracking-widest font-bold">
              DISCIPLINE 04 // STRUCTURAL SIMULATION
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
              Integrated Structural Calculations
            </h2>
          </div>
        </div>
        <StructuralSchematicExplorer />
      </div>

      {/* Building Regulations Approved Documents (Parts A - P) Checklist */}
      <div className="space-y-6">
        <div className="border-b border-slate-300 pb-2">
          <div className="text-xs font-mono text-sky-800 uppercase tracking-widest font-bold">
            STATUTORY COMPLIANCE // BUILDING CONTROL
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
            Approved Documents (Parts A through P)
          </h2>
          <p className="text-sm text-slate-600 font-sans mt-1">
            Every technical package we issue is guaranteed to satisfy all relevant Approved Documents under the Building Act 1984.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono text-xs">
          {approvedParts.map((part) => (
            <div key={part.code} className="p-4 bg-white border-2 border-slate-300 space-y-1.5">
              <div className="flex justify-between items-center text-sky-900 font-bold">
                <span>{part.code}</span>
                <span className="text-[10px] text-emerald-700 bg-emerald-100 px-1.5 py-0.5 border border-emerald-300">
                  COMPLIANT
                </span>
              </div>
              <h4 className="font-bold text-slate-900 font-sans text-sm">{part.title}</h4>
              <p className="text-slate-600 text-[11px] font-sans leading-relaxed">{part.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Metric Scale Guide */}
      <div className="bg-[#001026] text-white p-6 sm:p-8 border-2 border-slate-800 font-mono text-xs space-y-4">
        <div className="flex justify-between items-center border-b border-slate-800 pb-3">
          <span className="text-sky-400 font-bold uppercase tracking-widest">
            METRIC DRAWING SCALE STANDARDS // BS 1192
          </span>
          <span className="text-slate-400 text-[11px]">ALL CAD OUTPUTS PRODUCED TO ORTHOGRAPHIC STANDARD</span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-slate-300">
          <div className="p-3 bg-[#001736] border border-slate-800">
            <span className="text-white font-bold block text-sm">1:1250 &amp; 1:500</span>
            <span className="text-slate-400 text-[10px]">OS Site Location &amp; Block Plans</span>
          </div>
          <div className="p-3 bg-[#001736] border border-slate-800">
            <span className="text-white font-bold block text-sm">1:100 &amp; 1:50</span>
            <span className="text-slate-400 text-[10px]">General Arrangement Floor Plans</span>
          </div>
          <div className="p-3 bg-[#001736] border border-slate-800">
            <span className="text-white font-bold block text-sm">1:50 &amp; 1:20</span>
            <span className="text-slate-400 text-[10px]">Building Elevations &amp; Cross Sections</span>
          </div>
          <div className="p-3 bg-[#001736] border border-slate-800">
            <span className="text-white font-bold block text-sm">1:10 &amp; 1:5</span>
            <span className="text-slate-400 text-[10px]">Thermal Eaves, Parapets &amp; Foundation Details</span>
          </div>
        </div>
      </div>

    </div>
  );
};
