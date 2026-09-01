import React, { useState, useMemo } from 'react';
import { QuoteCalculationInput, QuoteResult, PageView } from '../types';
import { X, Calculator, ArrowRight, CheckCircle2, FileText, Clock, HelpCircle, ShieldCheck, Download } from 'lucide-react';
import confetti from 'canvas-confetti';

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
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 }
    });

    const briefText = `PROJECT SCOPE ESTIMATE: ${params.projectType.replace('_', ' ').toUpperCase()} (${params.floorAreaSqm} m²) | Zone: ${params.planningZone.toUpperCase()} | Estimated Fee: £${result.totalEstimated.toLocaleString()} | Deliverables: ~${result.deliverablesCount} Sheets`;
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
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-[#F4F2ED] border-2 border-slate-700 max-w-4xl w-full shadow-2xl overflow-hidden text-slate-900 font-sans relative flex flex-col max-h-[92dvh]">
        
        {/* Engineering Title Block Header */}
        <div className="bg-[#001733] text-white px-4 sm:px-5 py-4 border-b border-slate-700 flex flex-wrap items-center justify-between gap-y-2 shrink-0">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-sky-500/20 border border-sky-400 text-sky-300 flex items-center justify-center font-mono font-bold text-xs">
              <Calculator className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-base tracking-wide font-display">
                ARCHITECTURAL FEE & SCOPE CALCULATOR
              </h3>
              <p className="text-[11px] font-mono text-sky-400">
                DOC_REF: CALC-2024 // INSTANT ACCREDITED ESTIMATION
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            aria-label="Close Fee Estimator"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 flex-1 overflow-y-auto">
          
          {/* Left Column: Parameter Inputs */}
          <div className="lg:col-span-7 p-6 space-y-6 border-b lg:border-b-0 lg:border-r border-slate-300">
            
            {/* 1. Project Type */}
            <div>
              <label className="block text-xs font-mono font-bold text-slate-700 uppercase tracking-wider mb-2">
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
                    className={`p-2.5 text-xs font-mono text-left border transition-all ${
                      params.projectType === item.id
                        ? 'bg-[#001f3f] text-white border-[#001f3f] font-bold shadow-xs'
                        : 'bg-white text-slate-700 border-slate-300 hover:border-slate-400'
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
                <label className="text-xs font-mono font-bold text-slate-700 uppercase tracking-wider">
                  02. GROSS INTERNAL FLOOR AREA
                </label>
                <span className="px-2.5 py-0.5 bg-[#001f3f] text-white font-mono text-xs font-bold">
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
                className="w-full h-2 bg-slate-300 rounded-lg appearance-none cursor-pointer accent-[#001f3f]"
              />
              <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-1">
                <span>15 m² (Minor)</span>
                <span>150 m² (Standard)</span>
                <span>400 m² (Substantial)</span>
              </div>
            </div>

            {/* 3. Planning Authority & Zoning */}
            <div>
              <label className="block text-xs font-mono font-bold text-slate-700 uppercase tracking-wider mb-2">
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
                    className={`p-2 text-xs font-mono text-left border transition-all ${
                      params.planningZone === zone.id
                        ? 'bg-[#001f3f] text-white border-[#001f3f] font-bold'
                        : 'bg-white text-slate-700 border-slate-300 hover:border-slate-400'
                    }`}
                  >
                    {zone.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 4. Optional Packages & Add-ons */}
            <div className="space-y-2.5 pt-2 border-t border-slate-200">
              <label className="block text-xs font-mono font-bold text-slate-700 uppercase tracking-wider">
                04. INTEGRATED ENGINEERING TIERS
              </label>
              
              <label className="flex items-center justify-between p-2.5 bg-white border border-slate-300 cursor-pointer hover:bg-slate-50">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={params.buildingRegsRequired}
                    onChange={(e) => setParams({ ...params, buildingRegsRequired: e.target.checked })}
                    className="w-4 h-4 text-[#001f3f] rounded focus:ring-0"
                  />
                  <div>
                    <span className="text-xs font-mono font-bold text-slate-800 block">
                      Building Regulations Package (Part A–S)
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono">
                      Includes thermal Part L calculation & fire safety means of escape
                    </span>
                  </div>
                </div>
                <span className="text-xs font-mono font-bold text-[#002b49]">
                  +£{result.buildingRegsFee}
                </span>
              </label>

              <label className="flex items-center justify-between p-2.5 bg-white border border-slate-300 cursor-pointer hover:bg-slate-50">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={params.structuralRequired}
                    onChange={(e) => setParams({ ...params, structuralRequired: e.target.checked })}
                    className="w-4 h-4 text-[#001f3f] rounded focus:ring-0"
                  />
                  <div>
                    <span className="text-xs font-mono font-bold text-slate-800 block">
                      Structural Engineering (IStructE Stamped)
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono">
                      Steel RSJ beam sizing, pad footings & deflection checks
                    </span>
                  </div>
                </div>
                <span className="text-xs font-mono font-bold text-[#002b49]">
                  +£{result.structuralEngFee}
                </span>
              </label>

              <label className="flex items-center justify-between p-2.5 bg-white border border-slate-300 cursor-pointer hover:bg-slate-50">
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
                    className="w-4 h-4 text-[#001f3f] rounded focus:ring-0"
                  />
                  <div>
                    <span className="text-xs font-mono font-bold text-slate-800 block">
                      Priority Fast-Track Dispatch (48hr Survey)
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono">
                      Accelerated CAD drafting turnaround queue
                    </span>
                  </div>
                </div>
                <span className="text-xs font-mono font-bold text-[#002b49]">
                  +£{params.timelineSpeed === 'expedited' ? 450 : 0}
                </span>
              </label>
            </div>

          </div>

          {/* Right Column: Calculated Quotation Breakdown */}
          <div className="lg:col-span-5 p-6 bg-[#001026] text-white flex flex-col justify-between space-y-6">
            
            <div>
              <div className="border-b border-slate-800 pb-3 mb-4">
                <span className="text-[10px] font-mono text-sky-400 uppercase tracking-widest block">
                  SUMMARY BREAKDOWN // METRIC_ESTIMATE
                </span>
                <div className="mt-2 flex items-baseline justify-between">
                  <span className="text-xs text-slate-400 font-mono">TOTAL ESTIMATED FEE:</span>
                  <span className="text-2xl sm:text-3xl font-bold font-mono text-sky-300">
                    £{result.totalEstimated.toLocaleString()}
                    <span className="text-xs text-slate-400 font-normal ml-1">+VAT</span>
                  </span>
                </div>
              </div>

              {/* Itemized Lines */}
              <div className="space-y-2 text-xs font-mono border-b border-slate-800 pb-4">
                <div className="flex justify-between text-slate-300">
                  <span>Architectural Plans (1:50 / 1:100):</span>
                  <span>£{result.baseDrawingsFee.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Planning Submission Support:</span>
                  <span>£{result.planningSupportFee.toLocaleString()}</span>
                </div>
                {params.buildingRegsRequired && (
                  <div className="flex justify-between text-slate-300">
                    <span>Building Control Full Package:</span>
                    <span>£{result.buildingRegsFee.toLocaleString()}</span>
                  </div>
                )}
                {params.structuralRequired && (
                  <div className="flex justify-between text-slate-300">
                    <span>Structural IStructE Calculations:</span>
                    <span>£{result.structuralEngFee.toLocaleString()}</span>
                  </div>
                )}
                {params.timelineSpeed === 'expedited' && (
                  <div className="flex justify-between text-sky-400">
                    <span>Expedited Fast-Track Dispatch:</span>
                    <span>£{result.expeditedFee.toLocaleString()}</span>
                  </div>
                )}
              </div>

              {/* Deliverable Metrics */}
              <div className="mt-4 grid grid-cols-2 gap-3 text-xs font-mono">
                <div className="p-2.5 bg-[#001736] border border-slate-800">
                  <div className="flex items-center text-slate-400 text-[10px] mb-1">
                    <Clock className="w-3 h-3 mr-1 text-sky-400" />
                    <span>TIMELINE:</span>
                  </div>
                  <span className="text-white font-bold block">{result.estimatedWeeks}</span>
                </div>

                <div className="p-2.5 bg-[#001736] border border-slate-800">
                  <div className="flex items-center text-slate-400 text-[10px] mb-1">
                    <FileText className="w-3 h-3 mr-1 text-emerald-400" />
                    <span>DRAWING SHEETS:</span>
                  </div>
                  <span className="text-white font-bold block">~{result.deliverablesCount} CAD Sets</span>
                </div>
              </div>

              <div className="mt-4 p-3 bg-sky-950/40 border border-sky-800/60 text-[11px] font-mono text-sky-200">
                <div className="flex items-start space-x-2">
                  <ShieldCheck className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
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
                className="w-full py-3 bg-sky-500 hover:bg-sky-400 text-black font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center space-x-2 shadow-lg transition-colors cursor-pointer"
              >
                <span>INITIATE PROJECT WITH THIS SCOPE</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={handleDownloadEstimate}
                className="w-full py-2 bg-[#001a3d] hover:bg-[#002454] text-slate-300 font-mono text-[11px] border border-slate-700 flex items-center justify-center space-x-1.5 transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>
                  {downloaded ? 'ESTIMATE SPECIFICATION SAVED' : 'SAVE ITEMIZED ESTIMATE (PDF)'}
                </span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
