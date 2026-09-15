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
      <div className="border-b border-hairline pb-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="text-xs font-sans text-brass uppercase tracking-widest font-bold mb-1">
              OUR PROCESS
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-ink font-display">
              Architectural Process
            </h1>
            <p className="text-sm text-stone font-sans mt-2 max-w-2xl">
              Our 6-stage structured framework ensures seamless translation from initial spatial briefing to contractor-ready Building Control approved drawings.
            </p>
          </div>

          <button
            onClick={onOpenEstimator}
            className="px-5 py-3 bg-ink text-white text-xs font-sans font-bold hover:bg-ink-soft transition-colors flex items-center space-x-2"
          >
            <Calculator className="w-4 h-4 text-brass-light" />
            <span>REQUEST A TIMELINE</span>
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
              className={`p-4 text-left border transition-all cursor-pointer font-sans relative ${
                isSelected
                  ? 'bg-ink-soft text-white border-ink shadow-lg'
                  : 'bg-white text-ink border-hairline hover:border-stone'
              }`}
            >
              <div className="flex justify-between items-center text-xs font-sans mb-2">
                <span className={`font-bold text-lg ${isSelected ? 'text-brass-light' : 'text-stone'}`}>
                  {stg.stepNumber}
                </span>
                <span className="text-[10px] text-stone">{stg.duration}</span>
              </div>
              <h3 className="font-bold text-xs sm:text-sm font-display leading-snug">
                {stg.title}
              </h3>
            </button>
          );
        })}
      </div>

      {/* Detailed Active Stage Dossier */}
      <div className="bg-white border border-hairline p-6 sm:p-10 shadow-md">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          <div className="lg:col-span-7 space-y-6">
            <div>
              <div className="inline-block px-2.5 py-0.5 bg-ink text-brass-light border border-brass/40 text-[10px] font-sans font-bold mb-2">
                {activeStage.badge}
              </div>
              <h2 className="text-3xl font-extrabold text-ink font-display">
                Stage {activeStage.stepNumber}: {activeStage.title}
              </h2>
              <p className="text-sm font-sans text-stone mt-1 flex items-center space-x-2">
                <Clock className="w-3.5 h-3.5 text-brass" />
                <span>Typical Duration: {activeStage.duration}</span>
                <span>|</span>
                <span>{activeStage.deliverableCode}</span>
              </p>
              <p className="text-sm text-stone font-sans leading-relaxed mt-4">
                {activeStage.summary}
              </p>
            </div>

            {/* Scope Activities */}
            <div className="space-y-3">
              <h4 className="text-xs font-sans font-bold text-ink uppercase tracking-wider border-b border-hairline pb-1">
                STAGE SCOPE &amp; WORKFLOW PROTOCOL:
              </h4>
              <ul className="space-y-2 text-xs font-sans text-stone">
                {activeStage.details.map((item, idx) => (
                  <li key={idx} className="flex items-start space-x-2.5 bg-ivory p-2.5 border border-hairline">
                    <span className="w-5 h-5 rounded-full bg-ink text-white flex items-center justify-center text-[10px] font-sans font-bold shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Key Deliverable Outputs */}
            <div className="p-4 bg-ink/5 border border-hairline font-sans text-xs space-y-2">
              <span className="text-[10px] font-bold text-stone uppercase block">
                KEY DELIVERABLES:
              </span>
              <div className="space-y-1">
                {activeStage.keyOutputs.map((out, idx) => (
                  <div key={idx} className="flex items-center space-x-2 text-ink font-bold">
                    <Check className="w-3.5 h-3.5 text-sage shrink-0" />
                    <span>{out}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2 flex flex-wrap gap-3">
              <button
                onClick={onInitiateProject}
                className="px-6 py-3 bg-ink hover:bg-ink-soft text-white font-sans text-xs font-bold uppercase tracking-wider flex items-center space-x-2 transition-colors cursor-pointer"
              >
                <span>BEGIN AT THIS STAGE</span>
                <ArrowRight className="w-3.5 h-3.5 text-brass-light" />
              </button>
            </div>
          </div>

          {/* Right Column: Blueprint Graphic & Technical Annotation */}
          <div className="lg:col-span-5 space-y-4">
            <div className="border border-white/10 bg-ink-soft p-2 text-white font-sans text-xs">
              <div className="p-2 flex justify-between text-[10px] text-brass-light">
                <span>WORKING DRAWING · {activeStage.deliverableCode}</span>
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

            <div className="p-4 bg-ink-soft border border-white/10 text-white font-sans text-xs space-y-2">
              <span className="text-[10px] text-brass-light font-bold uppercase block">
                QUALITY ASSURANCE
              </span>
              <p className="text-[11px] text-white/70 leading-relaxed">
                All drawing deliverables are audited by a RIBA Chartered Architect prior to submission to council or building control authorities.
              </p>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};
