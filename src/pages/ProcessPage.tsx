import React, { useState } from 'react';
import { PROCESS_STAGES } from '../data/mockData';
import { ProcessStage } from '../types';
import { ArrowRight, CheckCircle2, Clock, FileText, Check, Compass, Calculator } from 'lucide-react';

interface ProcessPageProps {
  onOpenEstimator: () => void;
  onInitiateProject: () => void;
}

export const ProcessPage: React.FC<ProcessPageProps> = ({
  onOpenEstimator,
  onInitiateProject
}) => {
  const [activeStageNumber, setActiveStageNumber] = useState(PROCESS_STAGES[0].stepNumber);

  const activeStage = PROCESS_STAGES.find((s) => s.stepNumber === activeStageNumber) || PROCESS_STAGES[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      
      {/* Title block */}
      <div className="border-b-2 border-slate-300 pb-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="text-xs font-mono text-sky-800 uppercase tracking-widest font-bold mb-1">
              S_A WORKFLOW // METHODOLOGY
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 font-display">
              Architectural Process
            </h1>
            <p className="text-sm text-slate-600 font-sans mt-2 max-w-2xl">
              Our 6-stage structured framework ensures seamless translation from initial spatial briefing to contractor-ready Building Control approved drawings.
            </p>
          </div>

          <button
            onClick={onOpenEstimator}
            className="px-5 py-3 bg-[#001f3f] text-white text-xs font-mono font-bold hover:bg-[#002b49] transition-colors flex items-center space-x-2"
          >
            <Calculator className="w-4 h-4 text-sky-400" />
            <span>ESTIMATE PROJECT TIMELINE</span>
          </button>
        </div>
      </div>

      {/* Horizontal Stage Timeline Selector */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {PROCESS_STAGES.map((stg) => {
          const isSelected = stg.stepNumber === activeStageNumber;
          return (
            <button
              key={stg.stepNumber}
              onClick={() => setActiveStageNumber(stg.stepNumber)}
              className={`p-4 text-left border-2 transition-all cursor-pointer font-sans relative ${
                isSelected
                  ? 'bg-[#001733] text-white border-[#001733] shadow-lg'
                  : 'bg-white text-slate-800 border-slate-300 hover:border-slate-400'
              }`}
            >
              <div className="flex justify-between items-center text-xs font-mono mb-2">
                <span className={`font-bold text-lg ${isSelected ? 'text-sky-400' : 'text-slate-400'}`}>
                  {stg.stepNumber}
                </span>
                <span className="text-[10px] text-slate-400">{stg.duration}</span>
              </div>
              <h3 className="font-bold text-xs sm:text-sm font-display leading-snug">
                {stg.title}
              </h3>
            </button>
          );
        })}
      </div>

      {/* Detailed Active Stage Dossier */}
      <div className="bg-white border-2 border-slate-300 p-6 sm:p-10 shadow-md">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          <div className="lg:col-span-7 space-y-6">
            <div>
              <div className="inline-block px-2.5 py-0.5 bg-sky-950 text-sky-300 border border-sky-800 text-[10px] font-mono font-bold mb-2">
                {activeStage.badge}
              </div>
              <h2 className="text-3xl font-extrabold text-slate-900 font-display">
                Stage {activeStage.stepNumber}: {activeStage.title}
              </h2>
              <p className="text-sm font-mono text-slate-500 mt-1 flex items-center space-x-2">
                <Clock className="w-3.5 h-3.5 text-sky-700" />
                <span>Typical Duration: {activeStage.duration}</span>
                <span>|</span>
                <span>{activeStage.deliverableCode}</span>
              </p>
              <p className="text-sm text-slate-700 font-sans leading-relaxed mt-4">
                {activeStage.summary}
              </p>
            </div>

            {/* Scope Activities */}
            <div className="space-y-3">
              <h4 className="text-xs font-mono font-bold text-slate-900 uppercase tracking-wider border-b border-slate-200 pb-1">
                STAGE SCOPE &amp; WORKFLOW PROTOCOL:
              </h4>
              <ul className="space-y-2 text-xs font-sans text-slate-700">
                {activeStage.details.map((item, idx) => (
                  <li key={idx} className="flex items-start space-x-2.5 bg-slate-50 p-2.5 border border-slate-200">
                    <span className="w-5 h-5 rounded-full bg-[#001f3f] text-white flex items-center justify-center text-[10px] font-mono font-bold shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Key Deliverable Outputs */}
            <div className="p-4 bg-[#ebe7df] border border-slate-300 font-mono text-xs space-y-2">
              <span className="text-[10px] font-bold text-slate-700 uppercase block">
                STAMPED OUTPUTS DELIVERED TO CLIENT:
              </span>
              <div className="space-y-1">
                {activeStage.keyOutputs.map((out, idx) => (
                  <div key={idx} className="flex items-center space-x-2 text-slate-900 font-bold">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>{out}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2 flex flex-wrap gap-3">
              <button
                onClick={onInitiateProject}
                className="px-6 py-3 bg-[#001f3f] hover:bg-[#002b49] text-white font-mono text-xs font-bold uppercase tracking-wider flex items-center space-x-2 transition-colors cursor-pointer"
              >
                <span>INITIATE AT THIS STAGE</span>
                <ArrowRight className="w-3.5 h-3.5 text-sky-400" />
              </button>
            </div>
          </div>

          {/* Right Column: Blueprint Graphic & Technical Annotation */}
          <div className="lg:col-span-5 space-y-4">
            <div className="border border-slate-700 bg-[#001026] p-2 text-white font-mono text-xs">
              <div className="p-2 flex justify-between text-[10px] text-sky-400">
                <span>CAD_OUTPUT // {activeStage.deliverableCode}</span>
                <span>METRIC 1:50</span>
              </div>
              <div className="relative h-64 w-full overflow-hidden bg-black">
                <img
                  src="https://lh3.googleusercontent.com/aida/AEtjO1V3viWW6MAR6F-Y0qtWlwk01uV2UsRbdj7xPRw-IKVh_4V6t4zVXKg6Y15hyYbsPuifAXmokMgbXBQ5nEj5NOeMADqIk8lR5RPLm2AY-wCFqi6ZT78JVahSWurHJ2mYtDKm7q7iz5FGazGlKpfxUs2PzdTjj6JfcQhprw3p3ISvsR2kJeeUnC2Z43BRGo_Eii7MHVUmXS9PESec4FGOppGnwGT1kgTc483N-_3Gy7QZddKJ1Ps1I9QiVy0"
                  alt="Process Schematic CAD"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover filter contrast-125"
                />
                <div className="absolute inset-0 bg-blueprint-grid-dense opacity-40 pointer-events-none"></div>
              </div>
            </div>

            <div className="p-4 bg-[#001838] border border-slate-800 text-white font-mono text-xs space-y-2">
              <span className="text-[10px] text-sky-400 font-bold uppercase block">
                QUALITY ASSURANCE GUARANTEE:
              </span>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                All drawing deliverables are audited by a RIBA Chartered Architect prior to submission to council or building control authorities.
              </p>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};
