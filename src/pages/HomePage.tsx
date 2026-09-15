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
          <div className="inline-flex flex-wrap items-center gap-2 px-3 py-1.5 bg-ink-soft border border-white/10 text-brass-light text-xs font-sans mb-6">
            <span className="w-2 h-2 rounded-full bg-brass animate-ping inline-block"></span>
            <span className="font-bold">The Architectural Studio</span>
            <span className="text-white/40">|</span>
            <span className="text-white/70">LONDON &amp; THE UNITED KINGDOM</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Col: Main Headline & Actions */}
            <div className="lg:col-span-7 space-y-6">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-ink tracking-tight font-display leading-[1.08]">
                Considered Architecture,
                Drawn to <span className="underline decoration-brass decoration-4 underline-offset-8">Precision</span>.
              </h1>

              <p className="text-base sm:text-lg text-stone font-sans leading-relaxed max-w-2xl">
                We are a RIBA-chartered studio designing and drawing exceptional homes and buildings
                across the United Kingdom — from first conversations and planning consent through to
                builder-ready construction packages.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => { setCurrentPage('contact'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  id="hero-start-project-btn"
                  className="px-6 py-3.5 bg-ink hover:bg-ink-soft text-white font-sans text-xs font-bold uppercase tracking-wider flex items-center space-x-2 shadow-lg transition-all cursor-pointer group"
                >
                  <span>Start Your Project</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-brass-light" />
                </button>

                <button
                  onClick={onOpenEstimator}
                  id="hero-estimator-btn"
                  className="px-6 py-3.5 bg-white hover:bg-hairline/60 text-ink border border-white/10 font-sans text-xs font-bold uppercase tracking-wider flex items-center space-x-2 shadow-sm transition-all cursor-pointer"
                >
                  <Calculator className="w-4 h-4 text-brass" />
                  <span>Request a Fee Guide</span>
                </button>
              </div>

              {/* Trust Metric Badges */}
              <div className="pt-6 grid grid-cols-3 gap-4 border-t border-hairline font-sans text-xs text-stone">
                <div>
                  <span className="text-xl font-bold text-ink block font-display">99.4%</span>
                  <span className="text-[11px] text-stone">First-Time Planning Approval</span>
                </div>
                <div>
                  <span className="text-xl font-bold text-ink block font-display">1:50</span>
                  <span className="text-[11px] text-stone">Metric Drawing Standards</span>
                </div>
                <div>
                  <span className="text-xl font-bold text-ink block font-display">10+ Yrs</span>
                  <span className="text-[11px] text-stone">Statutory Architecture</span>
                </div>
              </div>
            </div>

            {/* Right Col: Blueprint CAD Elevation Preview Card */}
            <div className="lg:col-span-5 relative">
              <div className="bg-ink-soft border border-white/10 p-2 shadow-2xl relative overflow-hidden group">
                {/* Crosshairs */}
                <div className="absolute top-2 left-2 text-[9px] font-sans text-brass-light z-10 bg-black/70 px-1.5 py-0.5">
                  The Glass Pavilion · Hampstead, London
                </div>
                <div className="relative h-80 sm:h-96 w-full overflow-hidden bg-ink">
                  <img
                    src="https://lh3.googleusercontent.com/aida/AEtjO1V3viWW6MAR6F-Y0qtWlwk01uV2UsRbdj7xPRw-IKVh_4V6t4zVXKg6Y15hyYbsPuifAXmokMgbXBQ5nEj5NOeMADqIk8lR5RPLm2AY-wCFqi6ZT78JVahSWurHJ2mYtDKm7q7iz5FGazGlKpfxUs2PzdTjj6JfcQhprw3p3ISvsR2kJeeUnC2Z43BRGo_Eii7MHVUmXS9PESec4FGOppGnwGT1kgTc483N-_3Gy7QZddKJ1Ps1I9QiVy0"
                    alt="Technical Blueprint Cad"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover filter contrast-125 brightness-110 group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-blueprint-grid-dense opacity-40 pointer-events-none"></div>
                </div>

                {/* Card Title Block strip */}
                <div className="bg-ink-soft p-3 text-white font-sans text-xs flex justify-between items-center border-t border-white/10">
                  <div>
                    <span className="font-bold block">The Glass Pavilion</span>
                    <span className="text-[10px] text-brass-light">Hampstead, London · 142 m²</span>
                  </div>
                  <button
                    onClick={() => onSelectProject(PROJECTS[0])}
                    className="px-2.5 py-1 bg-brass hover:bg-brass text-black text-[11px] font-bold flex items-center space-x-1 transition-colors"
                  >
                    <span>View</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 2. TRUST & STANDARDS BAR */}
      <section className="bg-ink-soft text-white border-y border-white/10 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center font-sans text-xs">
            <div className="flex flex-col items-center justify-center space-y-1">
              <Building2 className="w-5 h-5 text-brass-light mb-1" />
              <span className="font-bold text-white/85">RIBA CHARTERED PRACTICE</span>
              <span className="text-[10px] text-stone">Strict Code of Professional Conduct</span>
            </div>
            <div className="flex flex-col items-center justify-center space-y-1">
              <ShieldCheck className="w-5 h-5 text-brass-light mb-1" />
              <span className="font-bold text-white/85">ARB REGISTERED</span>
              <span className="text-[10px] text-stone">Statutory Architects Registration</span>
            </div>
            <div className="flex flex-col items-center justify-center space-y-1">
              <Ruler className="w-5 h-5 text-brass-light mb-1" />
              <span className="font-bold text-white/85">ISO 19650</span>
              <span className="text-[10px] text-stone">Precision BIM &amp; CAD Compliance</span>
            </div>
            <div className="flex flex-col items-center justify-center space-y-1">
              <Layers className="w-5 h-5 text-brass-light mb-1" />
              <span className="font-bold text-white/85">ISTRUCTE STAMPED</span>
              <span className="text-[10px] text-stone">Chartered Structural Calculations</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CORE SERVICES & CAPABILITIES BENTO */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-10 pb-4 border-b border-hairline">
          <div>
            <div className="text-xs font-sans text-brass uppercase tracking-widest font-bold mb-1">
              Our Services
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-ink font-display">
              Services &amp; Capabilities
            </h2>
          </div>
          <button
            onClick={() => { setCurrentPage('services'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="text-xs font-sans font-bold text-brass hover:text-brass flex items-center space-x-1.5"
          >
            <span>View All Services</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES.map((srv) => (
            <div
              key={srv.id}
              className="bg-white border border-hairline p-6 flex flex-col justify-between hover:border-ink transition-all hover:shadow-lg group"
            >
              <div>
                <div className="flex justify-between items-start mb-4">
                  <span className="text-2xl font-sans font-bold text-stone group-hover:text-brass transition-colors">
                    {srv.indexNumber}
                  </span>
                  <span className="text-[10px] font-sans px-2 py-0.5 bg-hairline/60 text-stone border border-hairline">
                    {srv.leadTime}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-ink font-display mb-2">
                  {srv.title}
                </h3>
                <p className="text-xs text-stone font-sans leading-relaxed mb-4">
                  {srv.shortDesc}
                </p>

                <div className="space-y-1.5 pt-3 border-t border-hairline">
                  <span className="text-[10px] font-sans text-stone uppercase block">
                    DELIVERABLES
                  </span>
                  <ul className="space-y-1 text-xs font-sans text-stone">
                    {srv.deliverables.slice(0, 3).map((deliv, i) => (
                      <li key={i} className="flex items-start space-x-1.5">
                        <span className="text-brass font-bold">&gt;</span>
                        <span className="truncate">{deliv}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-6 mt-4 border-t border-hairline/60 flex items-center justify-between">
                <button
                  onClick={() => { setCurrentPage('services'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="text-xs font-sans font-bold text-brass flex items-center space-x-1 hover:underline"
                >
                  <span>Explore</span>
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
          <div className="text-xs font-sans text-brass uppercase tracking-widest font-bold mb-1">
            The Craft of Detail
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-ink font-display">
            Details Matter
          </h2>
          <p className="text-sm text-stone font-sans mt-1 max-w-2xl">
            Every drawing we produce is resolved to the level a builder can execute from with confidence —
            structural members, thermal junctions and concealed connections, each specified and dimensioned.
          </p>
        </div>

        <StructuralSchematicExplorer />
      </section>

      {/* 5. CONCEPT TO REALITY: Interactive Before/After Split Slider */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-6 pb-2 border-b border-hairline">
          <div>
            <div className="text-xs font-sans text-brass uppercase tracking-widest font-bold mb-1">
              From Drawing to Building
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-ink font-display">
              Concept to Reality
            </h2>
          </div>
          <span className="text-xs font-sans text-stone">
            Slide to compare our working drawings with the built result
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
        <div className="flex flex-wrap items-end justify-between gap-4 mb-8 pb-4 border-b border-hairline">
          <div>
            <div className="text-xs font-sans text-brass uppercase tracking-widest font-bold mb-1">
              Selected Works
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-ink font-display">
              Featured Case Studies
            </h2>
          </div>
          <button
            onClick={() => { setCurrentPage('projects'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="px-4 py-2 border border-white/10 bg-white hover:bg-hairline/60 text-xs font-sans font-bold text-ink flex items-center space-x-2"
          >
            <span>View Selected Works</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PROJECTS.slice(0, 3).map((proj) => (
            <div
              key={proj.id}
              className="bg-white border border-hairline overflow-hidden flex flex-col justify-between hover:border-ink transition-all hover:shadow-xl group"
            >
              <div>
                {/* Image */}
                <div className="relative h-60 w-full overflow-hidden bg-ink">
                  <img
                    src={proj.heroImage}
                    alt={proj.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-ink-soft/90 text-brass-light font-sans text-[10px] px-2 py-0.5 border border-white/10">
                    {proj.location}
                  </div>
                  <div className="absolute bottom-3 right-3 bg-ink/80 text-white/70 font-sans text-[10px] px-2 py-0.5">
                    {proj.areaSqm} m² · {proj.year}
                  </div>
                </div>

                <div className="p-5 space-y-3">
                  <div className="flex items-center justify-between text-[11px] font-sans text-stone">
                    <span>{proj.categoryLabel.toUpperCase()}</span>
                    <span>{proj.location.split(',')[0]}</span>
                  </div>

                  <h3 className="text-xl font-bold text-ink font-display">
                    {proj.title}
                  </h3>

                  <p className="text-xs text-stone font-sans line-clamp-2 leading-relaxed">
                    {proj.description}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0">
                <button
                  onClick={() => onSelectProject(proj)}
                  className="w-full py-2.5 bg-ink hover:bg-ink-soft text-white font-sans text-xs font-bold flex items-center justify-center space-x-2 transition-colors cursor-pointer"
                >
                  <span>View Project</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-brass-light" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. METHODOLOGY & PROCESS PREVIEW */}
      <section className="bg-ink-soft text-white py-16 border-y border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-12">
            <div>
              <div className="text-xs font-sans text-brass-light uppercase tracking-widest font-bold mb-1">
                Our Process
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display">
                Architectural Process
              </h2>
            </div>
            <button
              onClick={() => { setCurrentPage('process'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="text-xs font-sans text-brass-light hover:text-white flex items-center space-x-1.5"
            >
              <span>Explore the Process</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
            {PROCESS_STAGES.map((stg) => (
              <div
                key={stg.stepNumber}
                className="p-4 bg-ink-soft border border-white/10 flex flex-col justify-between hover:border-brass/50 transition-colors"
              >
                <div>
                  <div className="flex justify-between items-center text-xs font-sans text-brass-light mb-2">
                    <span className="font-bold text-lg">{stg.stepNumber}.</span>
                    <span className="text-[10px] text-stone">{stg.duration}</span>
                  </div>
                  <h4 className="text-sm font-bold text-white font-display mb-2">
                    {stg.title}
                  </h4>
                  <p className="text-xs text-stone leading-relaxed font-sans line-clamp-3">
                    {stg.summary}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-white/10 text-[10px] font-sans text-stone">
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
            <div className="text-xs font-sans text-brass uppercase tracking-widest font-bold">
              Credibility
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-ink font-display">
              Precision That Speaks
            </h2>
            <p className="text-sm text-stone font-sans leading-relaxed">
              We operate as trusted architectural drafting partners to private homeowners, commercial developers, and planning consultants across London and the home counties.
            </p>

            <div className="grid grid-cols-2 gap-4 font-sans">
              {STATS.map((stat, i) => (
                <div key={i} className="p-4 bg-white border border-hairline">
                  <div className="text-2xl font-bold text-brass font-display">
                    {stat.value}
                  </div>
                  <div className="text-xs font-bold text-ink mt-0.5">
                    {stat.label}
                  </div>
                  <div className="text-[10px] text-stone mt-0.5">
                    {stat.sub}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7 space-y-4">
            {TESTIMONIALS.map((t) => (
              <div key={t.id} className="p-6 bg-white border border-hairline shadow-sm space-y-3 font-sans">
                <div className="flex justify-between items-start">
                  <div className="font-sans text-xs">
                    <span className="font-bold text-ink block">{t.clientName}</span>
                    <span className="text-stone text-[11px]">{t.clientRole}</span>
                  </div>
                  <span className="px-2 py-0.5 bg-ink text-brass-light font-sans text-[10px]">
                    {t.location}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-stone leading-relaxed italic">
                  "{t.quote}"
                </p>
                <div className="flex justify-between items-center text-[10px] font-sans text-stone pt-2 border-t border-hairline/60">
                  <span>{t.projectTitle} · {t.year}</span>
                  <span>{t.location}</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 9. TECHNICAL FAQS ACCORDION */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-2 mb-8">
          <div className="text-xs font-sans text-brass uppercase tracking-widest font-bold">
            Guidance
          </div>
          <h2 className="text-3xl font-extrabold text-ink font-display">
            Frequently Asked Questions
          </h2>
          <p className="text-xs text-stone font-sans">
            Key insights on Permitted Development, Part L Energy, and Building Control Approvals.
          </p>
        </div>

        <div className="space-y-3 font-sans">
          {FAQS.map((faq) => {
            const isOpen = openFaqId === faq.id;
            return (
              <div
                key={faq.id}
                className="border border-hairline bg-white overflow-hidden transition-all"
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between font-bold text-ink text-sm sm:text-base hover:bg-ivory transition-colors focus:outline-none"
                >
                  <span className="flex items-center space-x-3">
                    <span className="font-sans text-xs text-brass bg-brass/10 px-2 py-0.5 border border-brass/40">
                      {faq.category}
                    </span>
                    <span>{faq.question}</span>
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-stone transition-transform shrink-0 ml-2 ${
                      isOpen ? 'rotate-180 text-brass' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-stone leading-relaxed border-t border-hairline bg-ivory/50 space-y-2">
                    <p>{faq.answer}</p>
                    {faq.docRef && (
                      <div className="text-[10px] font-sans text-stone pt-2 border-t border-hairline">
                        Reference · {faq.docRef}
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
          <div className="text-xs font-sans text-brass uppercase tracking-widest font-bold">
            Begin Your Project
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-ink font-display">
            Start Your Architectural Project
          </h2>
          <p className="text-sm text-stone font-sans max-w-xl mx-auto">
            Share your ideas, sketches, or drawings — a director will respond with a considered proposal within four working hours.
          </p>
        </div>

        <TitleBlockEnquiryForm initialBrief={enquiryBrief} />
      </section>

    </div>
  );
};
