import React, { useState } from 'react';
import { PageView, Project } from '../types';
import { PROJECTS, SERVICES, PROCESS_STAGES, TESTIMONIALS, FAQS, STATS, STUDIO_COORDINATES } from '../data/mockData';
import { BeforeAfterSlider } from '../components/BeforeAfterSlider';
import { StructuralSchematicExplorer } from '../components/StructuralSchematicExplorer';
import { TitleBlockEnquiryForm } from '../components/TitleBlockEnquiryForm';
import { Compass, Calculator, ArrowRight, ArrowUpRight, CheckCircle2, FileText, Layers, ShieldCheck, ChevronDown, Sparkles, Building2, Ruler } from 'lucide-react';

interface HomePageProps {
  setCurrentPage: (page: PageView) => void;
  onOpenEstimator: () => void;
  onSelectProject: (project: Project) => void;
  enquiryBrief: string;
}

export const HomePage: React.FC<HomePageProps> = ({
  setCurrentPage,
  onOpenEstimator,
  onSelectProject,
  enquiryBrief
}) => {
  const [openFaqId, setOpenFaqId] = useState<string | null>(FAQS[0]?.id || null);

  const toggleFaq = (id: string) => {
    setOpenFaqId(openFaqId === id ? null : id);
  };

  return (
    <div className="space-y-20 pb-20">
      
      {/* 1. HERO SECTION: Monolithic Architectural Statement */}
      <section className="relative pt-8 pb-16 lg:pt-16 lg:pb-24 overflow-hidden">
        {/* Subtle architectural grid pattern */}
        <div className="absolute inset-0 bg-blueprint-grid opacity-60 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Engineering Metadata Eyebrow */}
          <div className="inline-flex flex-wrap items-center gap-2 px-3 py-1.5 bg-[#001733] border border-slate-700 text-sky-300 text-xs font-mono mb-6">
            <span className="w-2 h-2 rounded-full bg-sky-400 animate-ping inline-block"></span>
            <span className="font-bold">SYSTEM_01 // RIBA CHARTERED STUDIO</span>
            <span className="text-slate-500">|</span>
            <span className="text-slate-300">LONDON &amp; UK-WIDE CAD DRAFTING</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Col: Main Headline & Actions */}
            <div className="lg:col-span-7 space-y-6">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight font-display leading-[1.08]">
                ARCHITECTURAL PLANS BUILT ON <span className="underline decoration-[#002b49] decoration-4 underline-offset-8">PRECISION</span>
              </h1>

              <p className="text-base sm:text-lg text-slate-700 font-sans leading-relaxed max-w-2xl">
                We engineer builder-ready 2D/3D architectural working drawings, secure council planning permissions, and calculate stamped structural steel packages for high-end residential and commercial developments.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => { setCurrentPage('contact'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  id="hero-start-project-btn"
                  className="px-6 py-3.5 bg-[#001f3f] hover:bg-[#002b49] text-white font-mono text-xs font-bold uppercase tracking-wider flex items-center space-x-2 shadow-lg transition-all cursor-pointer group"
                >
                  <span>SUBMIT PROJECT BRIEF</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-sky-400" />
                </button>

                <button
                  onClick={onOpenEstimator}
                  id="hero-estimator-btn"
                  className="px-6 py-3.5 bg-white hover:bg-slate-100 text-slate-900 border-2 border-slate-700 font-mono text-xs font-bold uppercase tracking-wider flex items-center space-x-2 shadow-sm transition-all cursor-pointer"
                >
                  <Calculator className="w-4 h-4 text-sky-700" />
                  <span>CALCULATE SCOPE / QUOTE</span>
                </button>
              </div>

              {/* Trust Metric Badges */}
              <div className="pt-6 grid grid-cols-3 gap-4 border-t border-slate-300 font-mono text-xs text-slate-600">
                <div>
                  <span className="text-xl font-bold text-slate-900 block font-display">99.4%</span>
                  <span className="text-[11px] text-slate-500">First-Time Planning Approval</span>
                </div>
                <div>
                  <span className="text-xl font-bold text-slate-900 block font-display">1:50</span>
                  <span className="text-[11px] text-slate-500">ISO 128 CAD Metric Scale</span>
                </div>
                <div>
                  <span className="text-xl font-bold text-slate-900 block font-display">10+ Yrs</span>
                  <span className="text-[11px] text-slate-500">Statutory Architecture</span>
                </div>
              </div>
            </div>

            {/* Right Col: Blueprint CAD Elevation Preview Card */}
            <div className="lg:col-span-5 relative">
              <div className="bg-[#001428] border-2 border-slate-700 p-2 shadow-2xl relative overflow-hidden group">
                {/* Crosshairs */}
                <div className="absolute top-2 left-2 text-[9px] font-mono text-sky-400 z-10 bg-black/70 px-1.5 py-0.5">
                  REF: SA-RES-084 // ELEVATION_NORTH
                </div>
                <div className="relative h-80 sm:h-96 w-full overflow-hidden bg-[#000814]">
                  <img
                    src="https://lh3.googleusercontent.com/aida/AEtjO1V3viWW6MAR6F-Y0qtWlwk01uV2UsRbdj7xPRw-IKVh_4V6t4zVXKg6Y15hyYbsPuifAXmokMgbXBQ5nEj5NOeMADqIk8lR5RPLm2AY-wCFqi6ZT78JVahSWurHJ2mYtDKm7q7iz5FGazGlKpfxUs2PzdTjj6JfcQhprw3p3ISvsR2kJeeUnC2Z43BRGo_Eii7MHVUmXS9PESec4FGOppGnwGT1kgTc483N-_3Gy7QZddKJ1Ps1I9QiVy0"
                    alt="Technical Blueprint Cad"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover filter contrast-125 brightness-110 group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-blueprint-grid-dense opacity-40 pointer-events-none"></div>
                </div>

                {/* Card Title Block strip */}
                <div className="bg-[#001a3d] p-3 text-white font-mono text-xs flex justify-between items-center border-t border-slate-700">
                  <div>
                    <span className="font-bold block">The Glass Pavilion</span>
                    <span className="text-[10px] text-sky-300">Hampstead Conservation Area // 142m²</span>
                  </div>
                  <button
                    onClick={() => onSelectProject(PROJECTS[0])}
                    className="px-2.5 py-1 bg-sky-500 hover:bg-sky-400 text-black text-[11px] font-bold flex items-center space-x-1 transition-colors"
                  >
                    <span>INSPECT</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 2. TRUST & STANDARDS BAR */}
      <section className="bg-[#001026] text-white border-y-2 border-slate-800 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center font-mono text-xs">
            <div className="flex flex-col items-center justify-center space-y-1">
              <Building2 className="w-5 h-5 text-sky-400 mb-1" />
              <span className="font-bold text-slate-200">RIBA CHARTERED PRACTICE</span>
              <span className="text-[10px] text-slate-400">Strict Code of Professional Conduct</span>
            </div>
            <div className="flex flex-col items-center justify-center space-y-1">
              <ShieldCheck className="w-5 h-5 text-emerald-400 mb-1" />
              <span className="font-bold text-slate-200">ARB REGISTERED</span>
              <span className="text-[10px] text-slate-400">Statutory Architects Registration</span>
            </div>
            <div className="flex flex-col items-center justify-center space-y-1">
              <Ruler className="w-5 h-5 text-amber-400 mb-1" />
              <span className="font-bold text-slate-200">BS EN ISO 19650</span>
              <span className="text-[10px] text-slate-400">Precision BIM &amp; CAD Compliance</span>
            </div>
            <div className="flex flex-col items-center justify-center space-y-1">
              <Layers className="w-5 h-5 text-purple-400 mb-1" />
              <span className="font-bold text-slate-200">ISTRUCTE STAMPED</span>
              <span className="text-[10px] text-slate-400">Chartered Structural Calculations</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CORE SERVICES & CAPABILITIES BENTO */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-10 pb-4 border-b border-slate-300">
          <div>
            <div className="text-xs font-mono text-sky-800 uppercase tracking-widest font-bold mb-1">
              IDX_00 // CORE COMPETENCIES
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display">
              Services &amp; Capabilities
            </h2>
          </div>
          <button
            onClick={() => { setCurrentPage('services'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="text-xs font-mono font-bold text-[#001f3f] hover:text-sky-700 flex items-center space-x-1.5"
          >
            <span>VIEW COMPLETE REGULATORY MATRIX</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES.map((srv) => (
            <div
              key={srv.id}
              className="bg-white border-2 border-slate-300 p-6 flex flex-col justify-between hover:border-[#001f3f] transition-all hover:shadow-lg group"
            >
              <div>
                <div className="flex justify-between items-start mb-4">
                  <span className="text-2xl font-mono font-bold text-slate-400 group-hover:text-sky-700 transition-colors">
                    {srv.indexNumber}
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 bg-slate-100 text-slate-700 border border-slate-300">
                    {srv.leadTime}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 font-display mb-2">
                  {srv.title}
                </h3>
                <p className="text-xs text-slate-600 font-sans leading-relaxed mb-4">
                  {srv.shortDesc}
                </p>

                <div className="space-y-1.5 pt-3 border-t border-slate-200">
                  <span className="text-[10px] font-mono text-slate-500 uppercase block">
                    KEY DELIVERABLES:
                  </span>
                  <ul className="space-y-1 text-xs font-mono text-slate-700">
                    {srv.deliverables.slice(0, 3).map((deliv, i) => (
                      <li key={i} className="flex items-start space-x-1.5">
                        <span className="text-sky-600 font-bold">&gt;</span>
                        <span className="truncate">{deliv}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-6 mt-4 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => { setCurrentPage('services'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="text-xs font-mono font-bold text-[#001f3f] flex items-center space-x-1 hover:underline"
                >
                  <span>SPECIFICATIONS</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. DETAILS MATTER: Interactive Structural & CAD Explorer */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <div className="text-xs font-mono text-sky-800 uppercase tracking-widest font-bold mb-1">
            PRECISION_ENGINEERING // ZERO TOLERANCE
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display">
            Details Matter
          </h2>
          <p className="text-sm text-slate-600 font-sans mt-1 max-w-2xl">
            Every architectural drawing pack integrates structural steel sizing, moments of inertia, and Part L thermal junctions to eliminate builder assumptions on site.
          </p>
        </div>

        <StructuralSchematicExplorer />
      </section>

      {/* 5. CONCEPT TO REALITY: Interactive Before/After Split Slider */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-6 pb-2 border-b border-slate-300">
          <div>
            <div className="text-xs font-mono text-sky-800 uppercase tracking-widest font-bold mb-1">
              COMPARISON_VIEW // CAD TO BUILT FORM
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display">
              Concept to Reality
            </h2>
          </div>
          <span className="text-xs font-mono text-slate-500">
            DRAG CENTRAL HANDLE TO COMPARE WORKING BLUEPRINTS WITH BUILT RESULTS
          </span>
        </div>

        <BeforeAfterSlider
          cadImage={PROJECTS[0].blueprintImage}
          realityImage={PROJECTS[0].heroImage}
          projectTitle={PROJECTS[0].title}
          projectRef={PROJECTS[0].refCode}
          location={PROJECTS[0].location}
        />
      </section>

      {/* 6. SELECTED WORKS PORTFOLIO PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-8 pb-4 border-b border-slate-300">
          <div>
            <div className="text-xs font-mono text-sky-800 uppercase tracking-widest font-bold mb-1">
              ARCHIVE_01 // SELECTED WORKS
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display">
              Featured Case Studies
            </h2>
          </div>
          <button
            onClick={() => { setCurrentPage('projects'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="px-4 py-2 border-2 border-slate-700 bg-white hover:bg-slate-100 text-xs font-mono font-bold text-slate-900 flex items-center space-x-2"
          >
            <span>VIEW ALL PROJECTS [{PROJECTS.length}]</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PROJECTS.slice(0, 3).map((proj) => (
            <div
              key={proj.id}
              className="bg-white border-2 border-slate-300 overflow-hidden flex flex-col justify-between hover:border-[#001f3f] transition-all hover:shadow-xl group"
            >
              <div>
                {/* Image */}
                <div className="relative h-60 w-full overflow-hidden bg-slate-900">
                  <img
                    src={proj.heroImage}
                    alt={proj.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-[#001733]/90 text-sky-300 font-mono text-[10px] px-2 py-0.5 border border-slate-700">
                    {proj.refCode}
                  </div>
                  <div className="absolute bottom-3 right-3 bg-black/80 text-emerald-400 font-mono text-[10px] px-2 py-0.5">
                    {proj.areaSqm} m² // {proj.year}
                  </div>
                </div>

                <div className="p-5 space-y-3">
                  <div className="flex items-center justify-between text-[11px] font-mono text-slate-500">
                    <span>{proj.categoryLabel.toUpperCase()}</span>
                    <span>{proj.location.split(',')[0]}</span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 font-display">
                    {proj.title}
                  </h3>

                  <p className="text-xs text-slate-600 font-sans line-clamp-2 leading-relaxed">
                    {proj.description}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0">
                <button
                  onClick={() => onSelectProject(proj)}
                  className="w-full py-2.5 bg-[#001f3f] hover:bg-[#002b49] text-white font-mono text-xs font-bold flex items-center justify-center space-x-2 transition-colors cursor-pointer"
                >
                  <span>INSPECT BLUEPRINT DOSSIER</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-sky-400" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. METHODOLOGY & PROCESS PREVIEW */}
      <section className="bg-[#001026] text-white py-16 border-y-2 border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-12">
            <div>
              <div className="text-xs font-mono text-sky-400 uppercase tracking-widest font-bold mb-1">
                S_A WORKFLOW // METHODOLOGY
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display">
                Architectural Process
              </h2>
            </div>
            <button
              onClick={() => { setCurrentPage('process'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="text-xs font-mono text-sky-300 hover:text-white flex items-center space-x-1.5"
            >
              <span>EXPLORE FULL STAGE DOSSIERS</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
            {PROCESS_STAGES.map((stg) => (
              <div
                key={stg.stepNumber}
                className="p-4 bg-[#001838] border border-slate-800 flex flex-col justify-between hover:border-sky-500 transition-colors"
              >
                <div>
                  <div className="flex justify-between items-center text-xs font-mono text-sky-400 mb-2">
                    <span className="font-bold text-lg">{stg.stepNumber}.</span>
                    <span className="text-[10px] text-slate-400">{stg.duration}</span>
                  </div>
                  <h4 className="text-sm font-bold text-white font-display mb-2">
                    {stg.title}
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed font-sans line-clamp-3">
                    {stg.summary}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800 text-[10px] font-mono text-slate-400">
                  {stg.deliverableCode}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. TESTIMONIALS & STATS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-5 space-y-6">
            <div className="text-xs font-mono text-sky-800 uppercase tracking-widest font-bold">
              VERIFIED_CREDENTIALS // PROVEN TRACK RECORD
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display">
              Precision That Speaks
            </h2>
            <p className="text-sm text-slate-700 font-sans leading-relaxed">
              We operate as trusted architectural drafting partners to private homeowners, commercial developers, and planning consultants across London and the home counties.
            </p>

            <div className="grid grid-cols-2 gap-4 font-mono">
              {STATS.map((stat, i) => (
                <div key={i} className="p-4 bg-white border border-slate-300">
                  <div className="text-2xl font-bold text-[#001f3f] font-display">
                    {stat.value}
                  </div>
                  <div className="text-xs font-bold text-slate-800 mt-0.5">
                    {stat.label}
                  </div>
                  <div className="text-[10px] text-slate-500 mt-0.5">
                    {stat.sub}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7 space-y-4">
            {TESTIMONIALS.map((t) => (
              <div key={t.id} className="p-6 bg-white border-2 border-slate-300 shadow-sm space-y-3 font-sans">
                <div className="flex justify-between items-start">
                  <div className="font-mono text-xs">
                    <span className="font-bold text-slate-900 block">{t.clientName}</span>
                    <span className="text-slate-500 text-[11px]">{t.clientRole}</span>
                  </div>
                  <span className="px-2 py-0.5 bg-[#001f3f] text-sky-300 font-mono text-[10px]">
                    REF: {t.projectRef}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic">
                  "{t.quote}"
                </p>
                <div className="flex justify-between items-center text-[10px] font-mono text-slate-400 pt-2 border-t border-slate-100">
                  <span>PROJECT: {t.projectTitle}</span>
                  <span>LOCATION: {t.location}</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 9. TECHNICAL FAQS ACCORDION */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-2 mb-8">
          <div className="text-xs font-mono text-sky-800 uppercase tracking-widest font-bold">
            STATUTORY_CLARIFICATIONS // FAQS
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 font-display">
            Frequently Asked Questions
          </h2>
          <p className="text-xs text-slate-600 font-mono">
            Key insights on Permitted Development, Part L Energy, and Building Control Approvals.
          </p>
        </div>

        <div className="space-y-3 font-sans">
          {FAQS.map((faq) => {
            const isOpen = openFaqId === faq.id;
            return (
              <div
                key={faq.id}
                className="border-2 border-slate-300 bg-white overflow-hidden transition-all"
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between font-bold text-slate-900 text-sm sm:text-base hover:bg-slate-50 transition-colors focus:outline-none"
                >
                  <span className="flex items-center space-x-3">
                    <span className="font-mono text-xs text-sky-700 bg-sky-100 px-2 py-0.5 border border-sky-300">
                      {faq.category}
                    </span>
                    <span>{faq.question}</span>
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-500 transition-transform shrink-0 ml-2 ${
                      isOpen ? 'rotate-180 text-sky-700' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-700 leading-relaxed border-t border-slate-200 bg-slate-50/50 space-y-2">
                    <p>{faq.answer}</p>
                    {faq.docRef && (
                      <div className="text-[10px] font-mono text-slate-500 pt-2 border-t border-slate-200">
                        REFERENCE: {faq.docRef}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 10. PROJECT INITIATION TITLE BLOCK SECTION */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-2 mb-8">
          <div className="text-xs font-mono text-sky-800 uppercase tracking-widest font-bold">
            DISPATCH_01 // SUBMIT INTAKE
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display">
            Start Your Architectural Project
          </h2>
          <p className="text-sm text-slate-600 font-sans max-w-xl mx-auto">
            Upload sketches, estate agent plans, or outline your spatial requirements to receive a fixed-fee proposal within 4 hours.
          </p>
        </div>

        <TitleBlockEnquiryForm initialBrief={enquiryBrief} />
      </section>

    </div>
  );
};
