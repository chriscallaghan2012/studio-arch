import React from 'react';
import { PageView } from '../types';
import { MapPin, Phone, Mail, ArrowUpRight } from 'lucide-react';

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

  const navItems: { id: PageView; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'projects', label: 'Selected Works' },
    { id: 'services', label: 'Services' },
    { id: 'process', label: 'Process' },
    { id: 'about', label: 'The Studio' },
    { id: 'faqs', label: 'Guidance' },
    { id: 'contact', label: 'Enquire' }
  ];

  return (
    <footer className="bg-ink text-white/70 border-t border-white/10 relative overflow-hidden font-sans">
      {/* Brass-glint watermark backdrop */}
      <div className="absolute inset-0 bg-blueprint-dark opacity-60 pointer-events-none"></div>

      {/* Top Title Strip */}
      <div className="border-b border-white/10 bg-ink-soft px-4 py-2.5 text-xs font-sans relative z-10">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center space-x-4">
            <span className="text-brass-light tracking-[0.2em] font-medium">
              MASONRY&nbsp;ARCHITECTURE
            </span>
            <span className="text-white/40">|</span>
            <span>Chartered Architectural Practice · London &amp; the United Kingdom</span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-white/70">RIBA · ARB · IStructE</span>
            <span className="text-white/40">|</span>
            <button
              onClick={onOpenEstimator}
              className="text-brass-light hover:text-white transition-colors cursor-pointer"
            >
              Fee Guide
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">

          {/* Col 1: Brand */}
          <div className="lg:col-span-4 space-y-5">
            <div>
              <span className="font-display text-xl lg:text-2xl tracking-[0.08em] text-white">
                MASONRY&nbsp;ARCHITECTURE
              </span>
              <p className="text-[11px] font-sans uppercase tracking-[0.3em] text-brass-light mt-1">
                Chartered Architectural Practice
              </p>
            </div>
            <p className="text-sm text-white/60 leading-relaxed max-w-sm">
              A Mayfair studio crafting considered architecture, precise working drawings and
              statutory approvals for private residences and commercial commissions across the UK.
            </p>
            <div className="pt-2 flex items-center space-x-3 text-[11px] text-white/50">
              <MapPin className="w-3.5 h-3.5 text-brass-light" />
              <span>14 Berkeley Square, Mayfair, London W1J 6BD</span>
            </div>
          </div>

          {/* Col 2: Navigate */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-semibold text-white uppercase tracking-[0.25em] mb-4 border-b border-white/10 pb-2">
              Navigate
            </h4>
            <ul className="space-y-2.5">
              {navItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => { setCurrentPage(item.id); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    className="text-sm text-white/60 hover:text-brass-light transition-colors cursor-pointer"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Contact */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-semibold text-white uppercase tracking-[0.25em] mb-4 border-b border-white/10 pb-2">
              Enquiries
            </h4>
            <ul className="space-y-3 text-sm text-white/60">
              <li className="flex items-start space-x-3">
                <Phone className="w-4 h-4 text-brass-light shrink-0 mt-0.5" />
                <span>+44 (0) 20 7946 0842</span>
              </li>
              <li className="flex items-start space-x-3">
                <Mail className="w-4 h-4 text-brass-light shrink-0 mt-0.5" />
                <span>plans@masonryarchitecture.com</span>
              </li>
            </ul>
            <div className="pt-4 text-[11px] leading-relaxed text-white/40 space-y-1 border-t border-white/10">
              <p>Monday — Friday · 09:00 — 18:00</p>
              <p>Private consultations by appointment</p>
            </div>
          </div>

          {/* Col 4: The Journal */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-semibold text-white uppercase tracking-[0.25em] mb-4 border-b border-white/10 pb-2">
              The Journal
            </h4>
            <p className="text-sm text-white/60 leading-relaxed">
              Occasional notes on planning, materials and the craft of building — delivered quarterly.
            </p>

            {subscribed ? (
              <div className="p-3 bg-brass/15 border border-brass/40 text-brass-light text-xs flex items-center space-x-2">
                <span>Thank you — please look for your first letter.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="w-full bg-ink-soft border border-white/10 text-white placeholder:text-white/35 px-3 py-2.5 text-sm focus:outline-none focus:border-brass/60"
                />
                <button
                  type="submit"
                  className="w-full py-2.5 bg-brass text-ink text-xs font-semibold uppercase tracking-[0.2em] flex items-center justify-center space-x-1.5 hover:bg-brass-light transition-colors cursor-pointer"
                >
                  <span>Subscribe</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-3 text-[11px] text-white/40">
          <span>© {new Date().getFullYear()} Masonry Architecture Ltd. All rights reserved.</span>
          <span className="text-white/40">ARB Registered Practice · No. 084920</span>
          <span className="text-brass-light/70 tracking-[0.2em]">LONDON · EST. 2014</span>
        </div>
      </div>
    </footer>
  );
};