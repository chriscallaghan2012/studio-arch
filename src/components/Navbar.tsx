import React, { useState } from 'react';
import { PageView } from '../types';
import { STUDIO_COORDINATES, STUDIO_STATUS } from '../data/mockData';
import { Menu, X, Compass, Calculator, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  currentPage: PageView;
  setCurrentPage: (page: PageView) => void;
  onOpenEstimator: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  setCurrentPage,
  onOpenEstimator
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: PageView; label: string; docCode: string }[] = [
    { id: 'home', label: 'Overview', docCode: '00' },
    { id: 'projects', label: 'Selected Works', docCode: '01' },
    { id: 'services', label: 'Services & Regs', docCode: '02' },
    { id: 'process', label: 'Methodology', docCode: '03' },
    { id: 'about', label: 'Studio', docCode: '04' },
    { id: 'faqs', label: 'Technical FAQs', docCode: '05' },
    { id: 'contact', label: 'Project Enquiry', docCode: '06' }
  ];

  const handleNavClick = (page: PageView) => {
    setCurrentPage(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-[#F4F2ED]/95 backdrop-blur-md border-b border-[#cbd5e1] transition-all">
      {/* Top Engineering Micro-Bar */}
      <div className="border-b border-[#e2e8f0] bg-[#ebe7df] px-4 py-1 text-[11px] font-mono text-[#475569] hidden md:flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <span className="flex items-center space-x-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="font-semibold text-slate-800">SYSTEM: ONLINE</span>
          </span>
          <span>LAT/LONG: {STUDIO_COORDINATES}</span>
          <span className="text-slate-400">|</span>
          <span>DISPATCH: {STUDIO_STATUS}</span>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-slate-600">RIBA CHARTERED PRACTICE // ARB REG: 084920</span>
          <button
            onClick={onOpenEstimator}
            className="flex items-center text-[#002b49] font-medium hover:underline cursor-pointer"
          >
            <Calculator className="w-3 h-3 mr-1" />
            <span>Instant Fee Estimator</span>
          </button>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          
          {/* Studio Brand / Monolith Mark */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center space-x-3 text-left group focus:outline-none"
            id="brand-logo-btn"
          >
            <div className="w-10 h-10 bg-[#001f3f] text-white flex items-center justify-center font-mono font-bold text-sm tracking-widest border border-slate-700 shadow-xs group-hover:bg-[#002b49] transition-colors">
              <Compass className="w-5 h-5 text-sky-400" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-lg tracking-tight text-slate-900 font-display">
                  STUDIO ARCH
                </span>
                <span className="px-1.5 py-0.5 text-[9px] font-mono bg-slate-200 text-slate-700 rounded border border-slate-300">
                  PLANS // CAD
                </span>
              </div>
              <p className="text-[11px] font-mono text-slate-500 tracking-wider">
                ARCHITECTURAL DRAFTING & PLANNING
              </p>
            </div>
          </button>

          {/* CTA Action Buttons */}
          <div className="hidden sm:flex items-center space-x-3">
            <button
              onClick={onOpenEstimator}
              id="header-estimator-btn"
              className="px-3.5 py-2 text-xs font-mono font-medium border border-slate-400 text-slate-800 hover:bg-slate-200 transition-colors flex items-center space-x-1.5"
            >
              <Calculator className="w-3.5 h-3.5 text-slate-600" />
              <span>CALC_QUOTE</span>
            </button>

            <button
              onClick={() => handleNavClick('contact')}
              id="header-enquiry-btn"
              className="px-4 py-2 text-xs font-mono font-bold bg-[#001f3f] text-white hover:bg-[#002b49] transition-all shadow-xs flex items-center space-x-1.5 group"
            >
              <span>SUBMIT BRIEF</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform text-sky-400" />
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex lg:hidden items-center space-x-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 border border-slate-300 text-slate-700 hover:bg-slate-200 focus:outline-none"
              aria-label="Toggle Navigation Menu"
              id="mobile-nav-toggle-btn"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Desktop Nav Directory Strip */}
      <nav className="hidden lg:grid grid-cols-7 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-[#dbe2ea] bg-[#f7f5ef]">
        {navItems.map((item) => {
          const isActive = currentPage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              id={`nav-link-${item.id}`}
              className={`whitespace-nowrap px-2 py-3 text-[11px] xl:text-xs font-medium uppercase tracking-wider flex items-center justify-center gap-1.5 border-r border-slate-200 last:border-r-0 border-b-2 transition-colors ${
                isActive
                  ? 'border-b-[#002b49] text-[#002b49] font-bold bg-slate-200/60'
                  : 'border-b-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-200/30'
              }`}
            >
              <span className="font-mono text-[10px] text-slate-400 hidden xl:inline">{item.docCode}.</span>
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Mobile Nav Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-300 bg-[#F4F2ED] px-4 pt-3 pb-6 space-y-2 shadow-lg animate-in fade-in duration-150">
          <div className="text-[10px] font-mono text-slate-500 px-2 py-1 uppercase tracking-widest border-b border-slate-200">
            SYSTEM DIRECTORY // SELECT MODULE
          </div>
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`w-full text-left px-3 py-2.5 text-sm font-mono flex items-center justify-between border ${
                currentPage === item.id
                  ? 'bg-[#001f3f] text-white border-[#001f3f]'
                  : 'bg-white text-slate-800 border-slate-300 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center space-x-2">
                <span className={currentPage === item.id ? 'text-sky-400' : 'text-slate-400'}>
                  [{item.docCode}]
                </span>
                <span className="font-semibold">{item.label}</span>
              </div>
              <ArrowUpRight className="w-4 h-4 opacity-70" />
            </button>
          ))}
          
          <div className="pt-2 grid grid-cols-2 gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenEstimator();
              }}
              className="w-full py-2.5 px-2 text-xs font-mono font-medium border border-slate-400 text-slate-800 text-center bg-slate-100"
            >
              CALCULATE QUOTE
            </button>
            <button
              onClick={() => handleNavClick('contact')}
              className="w-full py-2.5 px-2 text-xs font-mono font-bold bg-[#001f3f] text-white text-center"
            >
              START PROJECT
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
