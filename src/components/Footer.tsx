import React from 'react';
import { PageView } from '../types';
import { STUDIO_COORDINATES, REVISION_TAG } from '../data/mockData';
import { Compass, ShieldCheck, Download, Mail, ArrowUpRight, CheckCircle2 } from 'lucide-react';

interface FooterProps {
  setCurrentPage: (page: PageView) => void;
  onOpenEstimator: () => void;
}

export const Footer: React.FC<FooterProps> = ({ setCurrentPage, onOpenEstimator }) => {
  const [subscribed, setSubscribed] = React.useState(false);
  const [email, setEmail] = React.useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
    }
  };

  return (
    <footer className="bg-[#000814] text-slate-300 border-t-2 border-[#1e293b] relative overflow-hidden font-sans">
      {/* Blueprint Grid Watermark Backdrop */}
      <div className="absolute inset-0 bg-blueprint-dark opacity-40 pointer-events-none"></div>

      {/* Top Title Block Header Strip */}
      <div className="border-b border-slate-800 bg-[#001026] px-4 py-2.5 text-xs font-mono text-slate-400 relative z-10">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center space-x-4">
            <span className="text-sky-400 font-bold tracking-widest">TITLE_BLOCK // METRIC_A1</span>
            <span className="text-slate-600">|</span>
            <span>STANDARD: BS EN ISO 19650 & RIBA STAGE 1-6</span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-emerald-400 font-mono">STATUS: DRAWINGS_STAMPED_APPROVED</span>
            <span className="text-slate-600">|</span>
            <span className="text-slate-400">{REVISION_TAG}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-6">
          
          {/* Col 1 & 2: Studio Overview & Monolith Identity */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-sky-950 border border-sky-600/40 text-sky-400 flex items-center justify-center font-mono font-bold">
                <Compass className="w-6 h-6" />
              </div>
              <div>
                <span className="font-bold text-xl tracking-tight text-white font-display">
                  STUDIO ARCH
                </span>
                <p className="text-[11px] font-mono text-sky-400 tracking-wider">
                  PRECISION ARCHITECTURAL PLANS & DRAFTING
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed font-mono max-w-md">
              Specialist architectural drafting studio engineering millimeter-accurate general arrangement floor plans, planning permissions, building regulations, and structural calculations across the United Kingdom.
            </p>

            <div className="border border-slate-800 bg-[#00142e] p-3 text-[11px] font-mono space-y-1">
              <div className="flex justify-between text-slate-400">
                <span>STUDIO COORDINATES:</span>
                <span className="text-slate-200">{STUDIO_COORDINATES}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>ACCREDITATIONS:</span>
                <span className="text-sky-300">RIBA CHARTERED // ARB // ISTRUCTE</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>HEAD OFFICE:</span>
                <span className="text-slate-200">14 Berkeley Square, Mayfair, London W1J 6BD</span>
              </div>
            </div>
          </div>

          {/* Col 3: Navigation Index */}
          <div>
            <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider mb-4 border-b border-slate-800 pb-1 flex items-center justify-between">
              <span>EXPLORE</span>
              <span className="text-sky-400">[01-04]</span>
            </h4>
            <ul className="space-y-2.5 text-xs font-mono">
              <li>
                <button
                  onClick={() => { setCurrentPage('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="text-slate-400 hover:text-white flex items-center space-x-1.5 transition-colors"
                >
                  <span className="text-slate-600">&gt;</span>
                  <span>Home & Overview</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setCurrentPage('projects'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="text-slate-400 hover:text-white flex items-center space-x-1.5 transition-colors"
                >
                  <span className="text-slate-600">&gt;</span>
                  <span>Selected Works Portfolio</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setCurrentPage('services'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="text-slate-400 hover:text-white flex items-center space-x-1.5 transition-colors"
                >
                  <span className="text-slate-600">&gt;</span>
                  <span>Services & Regulations</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setCurrentPage('process'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="text-slate-400 hover:text-white flex items-center space-x-1.5 transition-colors"
                >
                  <span className="text-slate-600">&gt;</span>
                  <span>Methodology & Workflow</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setCurrentPage('about'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="text-slate-400 hover:text-white flex items-center space-x-1.5 transition-colors"
                >
                  <span className="text-slate-600">&gt;</span>
                  <span>Studio & Philosophy</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setCurrentPage('faqs'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="text-slate-400 hover:text-white flex items-center space-x-1.5 transition-colors"
                >
                  <span className="text-slate-600">&gt;</span>
                  <span>Technical FAQs</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Technical Services Index */}
          <div>
            <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider mb-4 border-b border-slate-800 pb-1 flex items-center justify-between">
              <span>DISCIPLINES</span>
              <span className="text-sky-400">[CAD_SET]</span>
            </h4>
            <ul className="space-y-2 text-[11px] font-mono text-slate-400">
              <li className="p-1.5 border border-slate-800/80 bg-[#001020] hover:border-slate-700 transition-colors">
                <span className="text-sky-400 block font-bold">01. ARCHITECTURAL CAD</span>
                <span className="text-slate-500 text-[10px]">1:50 Plans, Elevations, Sections</span>
              </li>
              <li className="p-1.5 border border-slate-800/80 bg-[#001020] hover:border-slate-700 transition-colors">
                <span className="text-sky-400 block font-bold">02. PLANNING SUBMISSIONS</span>
                <span className="text-slate-500 text-[10px]">Prior Approvals & Full Applications</span>
              </li>
              <li className="p-1.5 border border-slate-800/80 bg-[#001020] hover:border-slate-700 transition-colors">
                <span className="text-sky-400 block font-bold">03. BUILDING CONTROL (PT A-S)</span>
                <span className="text-slate-500 text-[10px]">Thermal Part L & Fire Part B Packs</span>
              </li>
              <li className="p-1.5 border border-slate-800/80 bg-[#001020] hover:border-slate-700 transition-colors">
                <span className="text-sky-400 block font-bold">04. STRUCTURAL STEEL</span>
                <span className="text-slate-500 text-[10px]">IStructE Stamped Calculation Sets</span>
              </li>
            </ul>
          </div>

          {/* Col 5: Spec Download & Quick Contact */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider mb-4 border-b border-slate-800 pb-1 flex items-center justify-between">
              <span>TECHNICAL BULLETIN</span>
              <span className="text-emerald-400">[PDF]</span>
            </h4>
            <p className="text-[11px] font-mono text-slate-400">
              Receive our quarterly UK Building Regulations & Planning Policy Whitepaper.
            </p>

            {subscribed ? (
              <div className="p-3 bg-emerald-950/60 border border-emerald-600/40 text-emerald-300 text-xs font-mono flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>SPEC_DISPATCH_CONFIRMED: PDF sent to mailbox.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="architect@domain.com"
                    className="w-full bg-[#00142e] border border-slate-700 text-white placeholder-slate-500 px-3 py-2 text-xs font-mono focus:outline-none focus:border-sky-500"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2 bg-sky-900 hover:bg-sky-800 text-white font-mono text-xs font-semibold flex items-center justify-center space-x-1.5 border border-sky-700 transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>DOWNLOAD 2024 SPEC SHEET</span>
                </button>
              </form>
            )}

            <button
              onClick={onOpenEstimator}
              className="w-full py-2 bg-[#001c3d] hover:bg-[#002855] text-sky-300 font-mono text-xs border border-sky-800/60 flex items-center justify-center space-x-1 transition-colors"
            >
              <span>OPEN INSTANT FEE ESTIMATOR</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

        {/* Bottom Title Block Revision Matrix */}
        <div className="mt-12 pt-6 border-t border-slate-800 grid grid-cols-1 md:grid-cols-4 gap-4 text-[10px] font-mono text-slate-500">
          <div>
            <span className="text-slate-400 block font-bold">PROJECT CODE:</span>
            <span>SA-GLOBAL-2024</span>
          </div>
          <div>
            <span className="text-slate-400 block font-bold">SCALE & PROJECTION:</span>
            <span>METRIC // UNIFIED ORDNANCE DATUM</span>
          </div>
          <div>
            <span className="text-slate-400 block font-bold">LEGAL:</span>
            <span>© {new Date().getFullYear()} STUDIO ARCH LTD. ALL RIGHTS RESERVED.</span>
          </div>
          <div className="md:text-right">
            <span className="text-slate-400 block font-bold">REVISION LOG:</span>
            <span className="text-slate-300">REV_4.2.0 // APPROVED FOR TENDER</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
