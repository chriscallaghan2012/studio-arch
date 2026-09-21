import React, { useState, useMemo } from 'react';
import { QuoteCalculationInput, QuoteResult, PageView } from '../types';
import { X, Calculator, ArrowRight, CheckCircle2, FileText, Clock, HelpCircle, ShieldCheck, Download } from 'lucide-react';

interface QuoteEstimatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyToEnquiry: (briefSummary: string) => void;
  setCurrentPage?: (page: PageView) => void;
}

export const QuoteEstimatorModal: React.FC<QuoteEstimatorModalProps> = ({
  isOpen,
  onClose,
  onApplyToEnquiry,
  setCurrentPage
}) => {
  const [params, setParams] = useState<QuoteCalculationInput>({
    projectType: 'residential_extension',
    floorAreaSqm: 45,
    planningZone: 'standard',
    structuralRequired: true,
    buildingRegsRequired: true,
    timelineSpeed: 'standard'
  });

  const [downloaded, setDownloaded] = useState(false);

  // Dynamic fee calculation algorithm
  const result: QuoteResult = useMemo(() => {
    let baseDrawings = 950;
    if (params.projectType === 'residential_extension') baseDrawings = 950 + params.floorAreaSqm * 12;
    if (params.projectType === 'loft_conversion') baseDrawings = 1100 + params.floorAreaSqm * 14;
    if (params.projectType === 'new_build') baseDrawings = 2400 + params.floorAreaSqm * 18;
    if (params.projectType === 'commercial_fitout') baseDrawings = 1800 + params.floorAreaSqm * 15;
    if (params.projectType === 'heritage_restoration') baseDrawings = 2800 + params.floorAreaSqm * 22;

    // Planning adjustments
    let planningFee = 450;
    if (params.planningZone === 'conservation') planningFee = 850;
    if (params.planningZone === 'green_belt') planningFee = 1100;
    if (params.planningZone === 'listed_building') planningFee = 1600;

    // Building regs package
    const buildingRegsFee = params.buildingRegsRequired ? Math.round(baseDrawings * 0.55) : 0;

    // Structural calculations
    const structuralEngFee = params.structuralRequired ? Math.round(550 + params.floorAreaSqm * 6) : 0;

    // Expedited surcharge
    const expeditedFee = params.timelineSpeed === 'expedited' ? 450 : 0;

    const total = baseDrawings + planningFee + buildingRegsFee + structuralEngFee + expeditedFee;

    // Estimated weeks
    let weeks = '3 - 4 Weeks';
    if (params.planningZone === 'conservation' || params.planningZone === 'listed_building') {
      weeks = '8 - 10 Weeks (incl. Council)';
    }
    if (params.timelineSpeed === 'expedited') {
      weeks = '2 - 3 Weeks (Fast-Track CAD)';
    }

    // Deliverable sheet count estimate
    let sheets = 6;
    if (params.buildingRegsRequired) sheets += 6;
    if (params.structuralRequired) sheets += 4;
    if (params.floorAreaSqm > 100) sheets += 3;

    return {
      baseDrawingsFee: Math.round(baseDrawings),
      planningSupportFee: planningFee,
      buildingRegsFee,
      structuralEngFee,
      expeditedFee,
      totalEstimated: Math.round(total),
      estimatedWeeks: weeks,
      deliverablesCount: sheets
    };
  }, [params]);

  if (!isOpen) return null;

  const handleTransferToContact = () => {
    const briefText = `Fee estimate — ${params.projectType.replace(/_/g, ' ')} (${params.floorAreaSqm} m²) · ${params.planningZone} planning zone · est. £${result.totalEstimated.toLocaleString()} · ~${result.deliverablesCount} drawing sheets`;
    onApplyToEnquiry(briefText);
    if (setCurrentPage) {
      setCurrentPage('contact');
    }
    onClose();
  };

  const handleDownloadEstimate = () => {
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 4000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-ink/80 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-ivory border border-white/10 max-w-4xl w-full shadow-2xl overflow-hidden text-ink font-sans relative flex flex-col max-h-[92dvh]">
        
        {/* Engineering Title Block Header */}
        <div className="bg-ink-soft text-white px-4 sm:px-5 py-4 border-b border-white/10 flex flex-wrap items-center justify-between gap-y-2 shrink-0">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-brass/20 border border-brass text-brass-light flex items-center justify-center font-sans font-bold text-xs">
              <Calculator className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-base tracking-wide font-display">
                ARCHITECTURAL FEE & SCOPE CALCULATOR
              </h3>
              <p className="text-[11px] font-sans text-brass-light">
                FEE GUIDE · 2026
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-stone hover:text-white hover:bg-ink-soft transition-colors"
            aria-label="Close Fee Estimator"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 flex-1 overflow-y-auto">
          
          {/* Left Column: Parameter Inputs */}
          <div className="lg:col-span-7 p-6 space-y-6 border-b lg:border-b-0 lg:border-r border-hairline">
            
            {/* 1. Project Type */}
            <div>
              <label className="block text-xs font-sans font-bold text-stone uppercase tracking-wider mb-2">
                01. PROJECT CLASSIFICATION
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {[
                  { id: 'residential_extension', label: 'Home Extension' },
                  { id: 'loft_conversion', label: 'Loft / Dormer' },
                  { id: 'new_build', label: 'New Build House' },
                  { id: 'commercial_fitout', label: 'Commercial Fit-Out' },
                  { id: 'heritage_restoration', label: 'Heritage / Listed' }
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setParams({ ...params, projectType: item.id as any })}
                    className={`p-2.5 text-xs font-sans text-left border transition-all ${
                      params.projectType === item.id
                        ? 'bg-ink text-white border-ink font-bold shadow-xs'
                        : 'bg-white text-stone border-hairline hover:border-stone'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Floor Area Slider */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-sans font-bold text-stone uppercase tracking-wider">
                  02. GROSS INTERNAL FLOOR AREA
                </label>
                <span className="px-2.5 py-0.5 bg-ink text-white font-sans text-xs font-bold">
                  {params.floorAreaSqm} m² ({Math.round(params.floorAreaSqm * 10.764)} sq ft)
                </span>
              </div>
              <input
                type="range"
                min={15}
                max={400}
                step={5}
                value={params.floorAreaSqm}
                onChange={(e) => setParams({ ...params, floorAreaSqm: Number(e.target.value) })}
                className="w-full h-2 bg-slate-300 rounded-lg appearance-none cursor-pointer accent-brass"
              />
              <div className="flex justify-between text-[10px] font-sans text-stone mt-1">
                <span>15 m² (Minor)</span>
                <span>150 m² (Standard)</span>
                <span>400 m² (Substantial)</span>
              </div>
            </div>

            {/* 3. Planning Authority & Zoning */}
            <div>
              <label className="block text-xs font-sans font-bold text-stone uppercase tracking-wider mb-2">
                03. PLANNING ZONE & CONSTRAINTS
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'standard', label: 'Standard Urban / Permitted Dev' },
                  { id: 'conservation', label: 'Conservation Area' },
                  { id: 'green_belt', label: 'Green Belt / AONB' },
                  { id: 'listed_building', label: 'Grade II / II* Listed' }
                ].map((zone) => (
                  <button
                    key={zone.id}
                    type="button"
                    onClick={() => setParams({ ...params, planningZone: zone.id as any })}
                    className={`p-2 text-xs font-sans text-left border transition-all ${
                      params.planningZone === zone.id
                        ? 'bg-ink text-white border-ink font-bold'
                        : 'bg-white text-stone border-hairline hover:border-stone'
                    }`}
                  >
                    {zone.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 4. Optional Packages & Add-ons */}
            <div className="space-y-2.5 pt-2 border-t border-hairline">
              <label className="block text-xs font-sans font-bold text-stone uppercase tracking-wider">
                04. INTEGRATED ENGINEERING
              </label>
              
              <label className="flex items-center justify-between p-2.5 bg-white border border-hairline cursor-pointer hover:bg-ivory">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={params.buildingRegsRequired}
                    onChange={(e) => setParams({ ...params, buildingRegsRequired: e.target.checked })}
                    className="w-4 h-4 text-brass rounded focus:ring-0"
                  />
                  <div>
                    <span className="text-xs font-sans font-bold text-ink block">
                      Building Regulations Package (Part A–S)
                    </span>
                    <span className="text-[10px] text-stone font-sans">
                      Includes thermal Part L calculation & fire safety means of escape
                    </span>
                  </div>
                </div>
                <span className="text-xs font-sans font-bold text-brass">
                  +£{result.buildingRegsFee}
                </span>
              </label>

              <label className="flex items-center justify-between p-2.5 bg-white border border-hairline cursor-pointer hover:bg-ivory">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={params.structuralRequired}
                    onChange={(e) => setParams({ ...params, structuralRequired: e.target.checked })}
                    className="w-4 h-4 text-brass rounded focus:ring-0"
                  />
                  <div>
                    <span className="text-xs font-sans font-bold text-ink block">
                      Structural Engineering (IStructE Stamped)
                    </span>
                    <span className="text-[10px] text-stone font-sans">
                      Steel RSJ beam sizing, pad footings & deflection checks
                    </span>
                  </div>
                </div>
                <span className="text-xs font-sans font-bold text-brass">
                  +£{result.structuralEngFee}
                </span>
              </label>

              <label className="flex items-center justify-between p-2.5 bg-white border border-hairline cursor-pointer hover:bg-ivory">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={params.timelineSpeed === 'expedited'}
                    onChange={(e) =>
                      setParams({
                        ...params,
                        timelineSpeed: e.target.checked ? 'expedited' : 'standard'
                      })
                    }
                    className="w-4 h-4 text-brass rounded focus:ring-0"
                  />
                  <div>
                    <span className="text-xs font-sans font-bold text-ink block">
                      Priority Fast-Track Dispatch (48hr Survey)
                    </span>
                    <span className="text-[10px] text-stone font-sans">
                      Accelerated drafting turnaround
                    </span>
                  </div>
                </div>
                <span className="text-xs font-sans font-bold text-brass">
                  +£{params.timelineSpeed === 'expedited' ? 450 : 0}
                </span>
              </label>
            </div>

          </div>

          {/* Right Column: Calculated Quotation Breakdown */}
          <div className="lg:col-span-5 p-6 bg-ink-soft text-white flex flex-col justify-between space-y-6">
            
            <div>
              <div className="border-b border-white/10 pb-3 mb-4">
                <span className="text-[10px] font-sans text-brass-light uppercase tracking-widest block">
                  SUMMARY OF FEE
                </span>
                <div className="mt-2 flex items-baseline justify-between">
                  <span className="text-xs text-white/60 font-sans">TOTAL ESTIMATED FEE:</span>
                  <span className="text-2xl sm:text-3xl font-bold font-sans text-brass-light">
                    £{result.totalEstimated.toLocaleString()}
                    <span className="text-xs text-white/60 font-normal ml-1">+VAT</span>
                  </span>
                </div>
              </div>

              {/* Itemized Lines */}
              <div className="space-y-2 text-xs font-sans border-b border-white/10 pb-4">
                <div className="flex justify-between text-white/70">
                  <span>Architectural Plans (1:50 / 1:100):</span>
                  <span>£{result.baseDrawingsFee.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-white/70">
                  <span>Planning Submission Support:</span>
                  <span>£{result.planningSupportFee.toLocaleString()}</span>
                </div>
                {params.buildingRegsRequired && (
                  <div className="flex justify-between text-white/70">
                    <span>Building Control Full Package:</span>
                    <span>£{result.buildingRegsFee.toLocaleString()}</span>
                  </div>
                )}
                {params.structuralRequired && (
                  <div className="flex justify-between text-white/70">
                    <span>Structural IStructE Calculations:</span>
                    <span>£{result.structuralEngFee.toLocaleString()}</span>
                  </div>
                )}
                {params.timelineSpeed === 'expedited' && (
                  <div className="flex justify-between text-brass-light">
                    <span>Expedited Turnaround:</span>
                    <span>£{result.expeditedFee.toLocaleString()}</span>
                  </div>
                )}
              </div>

              {/* Deliverable Metrics */}
              <div className="mt-4 grid grid-cols-2 gap-3 text-xs font-sans">
                <div className="p-2.5 bg-ink-soft border border-white/10">
                  <div className="flex items-center text-white/60 text-[10px] mb-1">
                    <Clock className="w-3 h-3 mr-1 text-brass-light" />
                    <span>TIMELINE:</span>
                  </div>
                  <span className="text-white font-bold block">{result.estimatedWeeks}</span>
                </div>

                <div className="p-2.5 bg-ink-soft border border-white/10">
                  <div className="flex items-center text-white/60 text-[10px] mb-1">
                    <FileText className="w-3 h-3 mr-1 text-brass-light" />
                    <span>DRAWING SHEETS:</span>
                  </div>
                  <span className="text-white font-bold block">~{result.deliverablesCount} Drawing Sheets</span>
                </div>
              </div>

              <div className="mt-4 p-3 bg-ink/40 border border-brass/40 text-[11px] font-sans text-brass-light">
                <div className="flex items-start space-x-2">
                  <ShieldCheck className="w-4 h-4 text-brass-light shrink-0 mt-0.5" />
                  <span>
                    Includes 100% Planning Approval Guarantee with free minor revisions if required by council officers.
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2 pt-4">
              <button
                type="button"
                onClick={handleTransferToContact}
                className="w-full py-3 bg-brass hover:bg-brass text-black font-sans text-xs font-bold uppercase tracking-wider flex items-center justify-center space-x-2 shadow-lg transition-colors cursor-pointer"
              >
                <span>BEGIN PROJECT WITH THIS SCOPE</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={handleDownloadEstimate}
                className="w-full py-2 bg-ink-soft hover:bg-[#002454] text-white/70 font-sans text-[11px] border border-white/10 flex items-center justify-center space-x-1.5 transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>
                  {downloaded ? 'ESTIMATE SAVED' : 'SAVE FEE ESTIMATE (PDF)'}
                </span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
