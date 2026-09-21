import React, { useState } from 'react';
import { Project } from '../types';
import { X, Check, FileCheck, Layers, Compass, Maximize2, Download, ArrowRight, ExternalLink } from 'lucide-react';
import { SmartImage } from './SmartImage';
import { InteractiveBlueprintViewer } from './InteractiveBlueprintViewer';

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
  onInitiateSimilar: (projectTitle: string) => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  onClose,
  onInitiateSimilar
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'blueprint' | 'specs' | 'gallery'>('overview');
  const [selectedGalleryIdx, setSelectedGalleryIdx] = useState(0);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-ink/85 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-ivory border border-white/10 max-w-5xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden font-sans text-ink">
        
        {/* Title Block Header */}
        <div className="bg-ink-soft text-white px-4 sm:px-5 py-3 border-b border-white/10 flex flex-wrap items-center justify-between gap-y-2 shrink-0 font-sans text-xs">
          <div className="flex items-center space-x-3">
            <span className="px-2 py-0.5 bg-brass text-black font-bold">
              {project.refCode}
            </span>
            <span className="font-bold text-white tracking-wide text-sm hidden sm:inline">
              {project.title}
            </span>
          </div>

          {/* Navigation Tabs inside header */}
          <div className="flex items-center space-x-0.5 sm:space-x-1">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-2 sm:px-3 py-1.5 text-[11px] sm:text-xs font-sans transition-colors whitespace-nowrap ${
                activeTab === 'overview'
                  ? 'bg-white text-ink font-bold'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              OVERVIEW
            </button>
            <button
              onClick={() => setActiveTab('blueprint')}
              className={`px-2 sm:px-3 py-1.5 text-[11px] sm:text-xs font-sans transition-colors whitespace-nowrap ${
                activeTab === 'blueprint'
                  ? 'bg-brass text-black font-bold'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              DRAWINGS
            </button>
            <button
              onClick={() => setActiveTab('specs')}
              className={`px-2 sm:px-3 py-1.5 text-[11px] sm:text-xs font-sans transition-colors whitespace-nowrap ${
                activeTab === 'specs'
                  ? 'bg-white text-ink font-bold'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              SPECIFICATIONS
            </button>
            <button
              onClick={onClose}
              className="p-1 text-stone hover:text-white ml-2 sm:ml-3"
              aria-label="Close Project Dossier"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="overflow-y-auto p-6 space-y-6 flex-1">
          
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Hero Image / Banner */}
              <div className="relative h-64 sm:h-96 w-full overflow-hidden border border-hairline bg-ink group">
                <SmartImage
                  src={project.heroImage}
                  alt={project.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4 text-white font-sans flex flex-wrap items-end justify-between gap-2">
                  <div>
                    <span className="text-xs text-brass-light block font-bold">
                      {project.categoryLabel.toUpperCase()}
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-bold font-display text-white">
                      {project.title}
                    </h2>
                    <p className="text-xs text-white/70">
                      {project.location}
                    </p>
                  </div>
                  <div className="bg-ink/80 border border-white/10 px-3 py-1.5 text-xs text-right">
                    <span className="text-stone block text-[10px]">TOTAL INTERNAL AREA:</span>
                    <span className="text-brass-light font-bold">{project.areaSqm} m² ({Math.round(project.areaSqm * 10.764)} sq ft)</span>
                  </div>
                </div>
              </div>

              {/* Key Architectural Data Strip */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-sans text-xs">
                <div className="p-3 bg-white border border-hairline">
                  <span className="text-stone block text-[10px]">STATUS:</span>
                  <span className="font-bold text-ink">{project.status}</span>
                </div>
                <div className="p-3 bg-white border border-hairline">
                  <span className="text-stone block text-[10px]">PLANNING AUTHORITY:</span>
                  <span className="font-bold text-ink">{project.specs.planningAuthority}</span>
                </div>
                <div className="p-3 bg-white border border-hairline">
                  <span className="text-stone block text-[10px]">APPROVAL TIMELINE:</span>
                  <span className="font-bold text-sage">{project.specs.approvalTimeWeeks} Weeks (First Pass)</span>
                </div>
                <div className="p-3 bg-white border border-hairline">
                  <span className="text-stone block text-[10px]">DRAWING SCALE:</span>
                  <span className="font-bold text-ink">{project.scale} @ A1</span>
                </div>
              </div>

              {/* Narrative Breakdown */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-4">
                  <div>
                    <h4 className="text-xs font-sans font-bold text-ink uppercase tracking-wider mb-2 border-b border-hairline pb-1">
                      PROJECT SYNOPSIS
                    </h4>
                    <p className="text-sm text-stone leading-relaxed font-sans">
                      {project.description}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 bg-hairline/60 border border-hairline">
                      <span className="text-xs font-sans font-bold text-rose-700 block mb-1">
                        PLANNING & SITE CHALLENGE:
                      </span>
                      <p className="text-xs text-stone leading-relaxed font-sans">
                        {project.challenge}
                      </p>
                    </div>
                    <div className="p-4 bg-hairline/60 border border-hairline">
                      <span className="text-xs font-sans font-bold text-sage block mb-1">
                        THE SOLUTION:
                      </span>
                      <p className="text-xs text-stone leading-relaxed font-sans">
                        {project.solution}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Deliverables checklist */}
                <div className="p-4 bg-ink-soft text-white font-sans space-y-3">
                  <span className="text-xs text-brass-light font-bold uppercase tracking-wider block border-b border-white/10 pb-1">
                    ISSUED DRAWING SETS
                  </span>
                  <ul className="space-y-2 text-xs">
                    {project.deliverables.map((item, idx) => (
                      <li key={idx} className="flex items-start space-x-2 text-white/70">
                        <Check className="w-3.5 h-3.5 text-brass-light shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: BLUEPRINT // CAD */}
          {activeTab === 'blueprint' && (
            <div className="space-y-4">
              <InteractiveBlueprintViewer
                blueprintImage={project.blueprintImage}
                title={`${project.title} · Working Drawing`}
                refCode={project.refCode}
                scale={project.scale}
              />
            </div>
          )}

          {/* TAB 3: SPECIFICATIONS */}
          {activeTab === 'specs' && (
            <div className="space-y-6 font-sans text-xs">
              <div className="border border-hairline bg-white overflow-hidden">
                <div className="bg-ink-soft text-white p-3 font-bold flex justify-between">
                  <span>PROJECT SPECIFICATIONS</span>
                  <span className="text-brass-light">DOC_VER: 2.1</span>
                </div>
                <table className="w-full text-left border-collapse">
                  <tbody>
                    <tr className="border-b border-hairline">
                      <td className="p-3 bg-ivory font-bold text-stone w-1/3">Structural System</td>
                      <td className="p-3 text-ink">{project.specs.structuralSystem}</td>
                    </tr>
                    <tr className="border-b border-hairline">
                      <td className="p-3 bg-ivory font-bold text-stone">Envelope & Cladding</td>
                      <td className="p-3 text-ink">{project.specs.cladding}</td>
                    </tr>
                    <tr className="border-b border-hairline">
                      <td className="p-3 bg-ivory font-bold text-stone">Glazing Performance</td>
                      <td className="p-3 text-ink font-bold text-sage">{project.specs.glazingUValue}</td>
                    </tr>
                    <tr className="border-b border-hairline">
                      <td className="p-3 bg-ivory font-bold text-stone">Planning Authority</td>
                      <td className="p-3 text-ink">{project.specs.planningAuthority}</td>
                    </tr>
                    <tr className="border-b border-hairline">
                      <td className="p-3 bg-ivory font-bold text-stone">Coordinates</td>
                      <td className="p-3 text-ink">{project.coordinates}</td>
                    </tr>
                    <tr>
                      <td className="p-3 bg-ivory font-bold text-stone">Building Control Stage</td>
                      <td className="p-3 text-sage font-bold">APPROVED</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </div>

        {/* Footer Actions */}
        <div className="bg-ink/5 border-t border-hairline px-6 py-4 flex flex-wrap items-center justify-between gap-3 font-sans text-xs shrink-0">
          <div className="text-stone">
            Would you like a similar scheme considered for your property?
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => onInitiateSimilar(project.title)}
              className="px-5 py-2.5 bg-ink hover:bg-ink-soft text-white font-bold flex items-center space-x-1.5 transition-colors cursor-pointer"
            >
              <span>Discuss a Similar Project</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
