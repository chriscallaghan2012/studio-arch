import React from 'react';
import { TitleBlockEnquiryForm } from '../components/TitleBlockEnquiryForm';
import { MapPin, Phone, Mail, Clock, ShieldCheck, Calculator, ArrowRight } from 'lucide-react';

interface ContactPageProps {
  initialBrief?: string;
  onOpenEstimator: () => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({
  initialBrief = '',
  onOpenEstimator
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Title block Header */}
      <div className="border-b border-hairline pb-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="text-xs font-sans text-brass uppercase tracking-widest font-bold mb-1">
              PROJECT ENQUIRY
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-ink font-display">
              Project Enquiry &amp; Briefing
            </h1>
            <p className="text-sm text-stone font-sans mt-2 max-w-2xl">
              Submit your property details, site sketches, or spatial aspirations. Every enquiry receives a formal fee proposal and permitted development assessment within 4 hours.
            </p>
          </div>

          <button
            onClick={onOpenEstimator}
            className="px-4 py-2.5 bg-white border border-white/10 text-xs font-sans font-bold text-ink hover:bg-hairline/60 transition-colors flex items-center space-x-1.5"
          >
            <Calculator className="w-4 h-4 text-brass" />
            <span>REQUEST A FEE GUIDE</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Col: Studio Coordinates & Office Data */}
        <div className="lg:col-span-4 space-y-6 font-sans text-xs">
          
          <div className="bg-ink-soft text-white p-6 border border-white/10 space-y-4 shadow-md">
            <span className="text-brass-light font-bold uppercase tracking-widest block text-[10px] border-b border-white/10 pb-2">
              THE STUDIO · MAYFAIR
            </span>

            <div className="space-y-3 text-white/70">
              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-brass-light shrink-0 mt-0.5" />
                <div>
                  <span className="text-white font-bold block">14 Berkeley Square</span>
                  <span>Mayfair, London W1J 6BD</span>
                  <span className="text-[10px] text-brass-light block mt-0.5">London · W1J</span>
                </div>
              </div>

              <div className="flex items-start space-x-3 pt-2 border-t border-white/10">
                <Phone className="w-4 h-4 text-brass-light shrink-0 mt-0.5" />
                <div>
                  <span className="text-white font-bold block">+44 (0) 20 7946 0842</span>
                  <span className="text-[10px] text-white/60">Direct Line</span>
                </div>
              </div>

              <div className="flex items-start space-x-3 pt-2 border-t border-white/10">
                <Mail className="w-4 h-4 text-brass-light shrink-0 mt-0.5" />
                <div>
                  <span className="text-white font-bold block">plans@masonryarchitecture.com</span>
                  <span className="text-[10px] text-white/60">Project Enquiries</span>
                </div>
              </div>
            </div>

            <div className="p-3 bg-ink-soft border border-white/10 text-[10px] space-y-1">
              <div className="flex justify-between text-white/70">
                <span>HOURS</span>
                <span>Mon — Fri · 09:00 — 18:00</span>
              </div>
              <div className="flex justify-between text-white/70">
                <span>RESPONSE</span>
                <span className="text-brass-light font-bold">Within 4 Working Hours</span>
              </div>
            </div>
          </div>

          {/* Quick FAQ summary box */}
          <div className="bg-white border border-hairline p-6 space-y-3">
            <span className="text-[11px] font-bold text-ink uppercase tracking-wider block border-b border-hairline pb-1">
              WHAT HAPPENS NEXT
            </span>
            <ol className="space-y-2 text-stone text-[11px]">
              <li className="flex items-start space-x-2">
                <span className="font-bold text-brass">1.</span>
                <span>Peremptory planning history &amp; site constraints review.</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="font-bold text-brass">2.</span>
                <span>A considered, fixed-fee proposal within three working days.</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="font-bold text-brass">3.</span>
                <span>An architectural site visit or measured survey arranged at your convenience.</span>
              </li>
            </ol>
          </div>

        </div>

        {/* Right Col: The Interactive Title Block Form */}
        <div className="lg:col-span-8">
          <TitleBlockEnquiryForm initialBrief={initialBrief} />
        </div>

      </div>

    </div>
  );
};
