import React, { useState } from 'react';
import { PageView } from '../types';
import { Menu, X, ArrowUpRight, ShoppingBag } from 'lucide-react';

interface NavbarProps {
  currentPage: PageView;
  setCurrentPage: (page: PageView) => void;
  onOpenEstimator: () => void;
  onOpenCart: () => void;
  cartCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  setCurrentPage,
  onOpenEstimator,
  onOpenCart,
  cartCount
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: PageView; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'projects', label: 'Selected Works' },
    { id: 'services', label: 'Services' },
    { id: 'process', label: 'Process' },
    { id: 'about', label: 'The Studio' },
    { id: 'faqs', label: 'Guidance' },
    { id: 'contact', label: 'Enquire' }
  ];

  const handleNavClick = (page: PageView) => {
    setCurrentPage(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-ivory/95 backdrop-blur-md border-b border-hairline transition-all">
      {/* Top Studio Bar */}
      <div className="border-b border-hairline bg-ink text-white/70 px-4 py-1.5 text-[11px] font-sans hidden lg:flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <span className="flex items-center space-x-2">
            <span className="w-1.5 h-1.5 rounded-full bg-brass-light"></span>
            <span className="font-semibold text-white/85">RIBA Chartered Practice</span>
          </span>
          <span className="text-white/60">London &amp; the United Kingdom</span>
          <span className="text-white/40">|</span>
          <span>Established 2014</span>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-white/60">Enquiries · +44 (0) 20 7946 0842</span>
          <button
            onClick={onOpenEstimator}
            className="flex items-center text-brass-light font-medium hover:text-white transition-colors cursor-pointer"
          >
            <span>Fee Guide</span>
            <ArrowUpRight className="w-3 h-3 ml-1" />
          </button>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          {/* Studio Brand */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center space-x-3 text-left group focus:outline-none"
            id="brand-logo-btn"
          >
            <div className="w-11 h-11 bg-ink text-brass-light flex items-center justify-center font-display text-lg tracking-widest border border-brass/30 shadow-sm group-hover:bg-ink-soft transition-colors">
              MA
            </div>
            <div>
              <div className="flex items-center space-x-3">
                <span className="font-display text-base sm:text-lg lg:text-xl tracking-[0.08em] text-ink">
                  MASONRY&nbsp;ARCHITECTURE
                </span>
              </div>
              <p className="text-[9px] font-sans uppercase tracking-[0.3em] text-stone mt-0.5">
                Chartered Architectural Practice
              </p>
            </div>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  id={`nav-link-${item.id}`}
                  className={`text-[13px] font-medium transition-colors border-b pb-1 cursor-pointer ${
                    isActive
                      ? 'border-brass text-ink font-semibold'
                      : 'border-transparent text-stone hover:text-ink'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>
          <div className="hidden lg:flex items-center space-x-6">
            <button
              onClick={onOpenCart}
              aria-label={`View cart (${cartCount} items)`}
              className="relative p-2.5 border border-hairline text-ink hover:bg-ink/10 transition-colors cursor-pointer"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 min-w-4 h-4 px-1 bg-brass text-black text-[9px] font-bold rounded-full flex items-center justify-center">
                  {cartCount > 9 ? '9+' : cartCount}
                </span>
              )}
            </button>
            <button
              onClick={() => handleNavClick('contact')}
              className="px-6 py-2.5 bg-ink text-white text-xs font-semibold uppercase tracking-[0.2em] hover:bg-ink-soft transition-colors cursor-pointer"
            >
              Start a Project
            </button>
          </div>

          {/* Mobile cart + toggle */}
          <div className="flex items-center space-x-1.5 lg:hidden">
            <button
              onClick={onOpenCart}
              aria-label={`View cart (${cartCount} items)`}
              className="relative p-2 border border-hairline text-ink hover:bg-ink/10 transition-colors cursor-pointer"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 min-w-4 h-4 px-1 bg-brass text-black text-[9px] font-bold rounded-full flex items-center justify-center">
                  {cartCount > 9 ? '9+' : cartCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 border border-hairline text-ink hover:bg-ink/10 focus:outline-none cursor-pointer"
              aria-label="Toggle Navigation Menu"
              id="mobile-nav-toggle-btn"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-hairline bg-ivory px-4 pt-3 pb-6 space-y-2 shadow-lg animate-in fade-in duration-150">
          <div className="text-[10px] font-sans uppercase tracking-[0.3em] text-brass px-2 py-1 border-b border-hairline">
            The Practice
          </div>
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`w-full text-left px-3 py-2.5 text-sm font-sans flex items-center justify-between border ${
                currentPage === item.id
                  ? 'bg-ink text-white border-ink'
                  : 'bg-white text-ink border-hairline hover:bg-ivory'
              }`}
            >
              <span className="font-medium">{item.label}</span>
              <ArrowUpRight className="w-4 h-4 opacity-70" />
            </button>
          ))}

          <div className="pt-2 grid grid-cols-2 gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenEstimator();
              }}
              className="w-full py-2.5 px-2 text-xs font-sans font-medium border border-stone text-ink text-center bg-white"
            >
              Fee Guide
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCart();
              }}
              className="w-full py-2.5 px-2 text-xs font-sans font-medium border border-stone text-ink text-center bg-white"
            >
              View Cart{cartCount > 0 ? ` (${cartCount})` : ''}
            </button>
            <button
              onClick={() => handleNavClick('contact')}
              className="w-full py-2.5 px-2 text-xs font-sans font-bold bg-ink text-white text-center"
            >
              Start a Project
            </button>
          </div>
        </div>
      )}
    </header>
  );
};