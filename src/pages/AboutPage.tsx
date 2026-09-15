import React from 'react';
import { STATS } from '../data/mockData';
import { Compass, ShieldCheck, Award, Building2, CheckCircle2, ArrowRight } from 'lucide-react';

interface AboutPageProps {
  onOpenEstimator: () => void;
  onContactClick: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({
  onOpenEstimator,
  onContactClick
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      
      {/* Title block */}
      <div className="border-b border-hairline pb-6">
        <div className="text-xs font-sans text-brass uppercase tracking-widest font-bold mb-1">
          The Studio &amp; Its Philosophy
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-ink font-display">
          Architectural Rigor Meets Editorial Elegance
        </h1>
        <p className="text-base text-stone font-sans mt-3 max-w-3xl leading-relaxed">
          Founded in 2014, Studio Arch was established to eliminate the friction between architectural imagination and statutory construction reality. We engineer working drawing packages that builders trust and planning officers approve.
        </p>
      </div>

      {/* Hero Visual & Core Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-7 relative h-80 sm:h-96 overflow-hidden border border-white/10 bg-ink">
          <img
            src="https://lh3.googleusercontent.com/aida/AEtjO1Vm4CJkv_b4q-h_ywnAxUO5T1EW3-Kipu7LFG6APXrey-nJPVtRa5po_DrekW_WS-WzIjxgyjbSA3HJ7mrtNHNBSdet6ohSbdZ3PWcYhNAzupbBUbaGDd5bEfN3hDQusFLzu5E8TzWlAoVzl-AVzqCiKkTAic9-2ujr3tbkKKZAUvuGy0OoToUcSNKP78AdvAToA-jd-W9N-oqDNPj8FQ92g5eDRMcgZR9vU7We7KBidzbdQS2KfJxO-vU"
            alt="Studio Arch Architectural Annex"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
          <div className="absolute bottom-4 left-4 right-4 text-white font-sans text-xs flex justify-between">
            <span>Craftsmanship &amp; Rigor</span>
            <span>Mayfair · London</span>
          </div>
        </div>

        <div className="lg:col-span-5 space-y-4">
          <div className="grid grid-cols-2 gap-3 font-sans">
            {STATS.map((stat, idx) => (
              <div key={idx} className="p-4 bg-white border border-hairline">
                <div className="text-3xl font-extrabold text-brass font-display">
                  {stat.value}
                </div>
                <div className="text-xs font-bold text-ink mt-1">
                  {stat.label}
                </div>
                <div className="text-[10px] text-stone mt-0.5">
                  {stat.sub}
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 bg-ink-soft text-white border border-white/10 font-sans text-xs space-y-2">
            <span className="text-brass-light font-bold uppercase block">
              ACCREDITATIONS
            </span>
            <ul className="space-y-1 text-white/70 text-[11px]">
              <li>• Royal Institute of British Architects (RIBA Chartered)</li>
              <li>• Architects Registration Board (ARB UK)</li>
              <li>• Institution of Structural Engineers (IStructE Affiliate)</li>
              <li>• ISO 9001 Quality Management Certified</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Manifesto 3 Pillars */}
      <div className="space-y-6">
        <div className="border-b border-hairline pb-2">
          <div className="text-xs font-sans text-brass uppercase tracking-widest font-bold">
            FOUNDATIONAL TENETS
          </div>
          <h2 className="text-3xl font-extrabold text-ink font-display">
            The Studio Manifesto
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-sans">
          <div className="bg-white border border-hairline p-6 space-y-3">
            <div className="w-10 h-10 bg-ink text-brass-light flex items-center justify-center font-sans font-bold text-sm">
              01
            </div>
            <h3 className="text-xl font-bold text-ink font-display">
              Millimeter Accuracy
            </h3>
            <p className="text-xs text-stone leading-relaxed">
              We never approximate. Every architectural scheme originates with 3D Leica point-cloud laser scanning, verifying existing structural levels to +/- 2mm.
            </p>
          </div>

          <div className="bg-white border border-hairline p-6 space-y-3">
            <div className="w-10 h-10 bg-ink text-brass-light flex items-center justify-center font-sans font-bold text-sm">
              02
            </div>
            <h3 className="text-xl font-bold text-ink font-display">
              Unified Engineering
            </h3>
            <p className="text-xs text-stone leading-relaxed">
              We design structural steelwork concurrently with spatial layouts. Steel universal beams and padstones are sized from day one to protect ceiling heights and sightlines.
            </p>
          </div>

          <div className="bg-white border border-hairline p-6 space-y-3">
            <div className="w-10 h-10 bg-ink text-brass-light flex items-center justify-center font-sans font-bold text-sm">
              03
            </div>
            <h3 className="text-xl font-bold text-ink font-display">
              Statutory Mastery
            </h3>
            <p className="text-xs text-stone leading-relaxed">
              Planning policies and Building Regulations Part L/B are treated as creative catalysts rather than obstacles, maintaining a 99.4% first-time approval rate across UK councils.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Box */}
      <div className="bg-ink-soft text-white p-8 sm:p-12 border border-white/10 flex flex-wrap items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <span className="text-xs font-sans text-brass-light uppercase tracking-wider block">
            READY TO BEGIN?
          </span>
          <h3 className="text-2xl sm:text-3xl font-extrabold font-display">
            Book an Initial Architectural Consultation
          </h3>
          <p className="text-xs text-white/70 font-sans">
            Discuss planning feasibility, permitted development rights, and structural budgets with a Chartered Architect.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            onClick={onContactClick}
            className="px-6 py-3.5 bg-brass hover:bg-brass text-black font-sans text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
          >
            REQUEST A CONSULTATION
          </button>
          <button
            onClick={onOpenEstimator}
            className="px-6 py-3.5 bg-transparent border border-slate-500 hover:border-white text-white font-sans text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
          >
            FEE GUIDE
          </button>
        </div>
      </div>

    </div>
  );
};
