import React from 'react';
import { TitleBlockEnquiryForm } from '../components/TitleBlockEnquiryForm';
import { STUDIO_COORDINATES, STUDIO_STATUS } from '../data/mockData';
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
      <div className="border-b-2 border-slate-300 pb-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="text-xs font-mono text-sky-800 uppercase tracking-widest font-bold mb-1">
              COMMUNICATIONS // INTAKE CONSOLE
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 font-display">
              Project Enquiry &amp; Briefing
            </h1>
            <p className="text-sm text-slate-600 font-sans mt-2 max-w-2xl">
              Submit your property details, site sketches, or spatial aspirations. Every enquiry receives a formal fee proposal and permitted development assessment within 4 hours.
            </p>
          </div>

          <button
            onClick={onOpenEstimator}
            className="px-4 py-2.5 bg-white border-2 border-slate-700 text-xs font-mono font-bold text-slate-900 hover:bg-slate-100 transition-colors flex items-center space-x-1.5"
          >
            <Calculator className="w-4 h-4 text-sky-700" />
            <span>ESTIMATE FEE FIRST</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Col: Studio Coordinates & Office Data */}
        <div className="lg:col-span-4 space-y-6 font-mono text-xs">
          
          <div className="bg-[#001733] text-white p-6 border-2 border-slate-700 space-y-4 shadow-md">
            <span className="text-sky-400 font-bold uppercase tracking-widest block text-[10px] border-b border-slate-700 pb-2">
              CENTRAL STUDIO // MAYFAIR
            </span>

            <div className="space-y-3 text-slate-300">
              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-white font-bold block">14 Berkeley Square</span>
                  <span>Mayfair, London W1J 6BD</span>
                  <span className="text-[10px] text-sky-300 block mt-0.5">COORD: {STUDIO_COORDINATES}</span>
                </div>
              </div>

              <div className="flex items-start space-x-3 pt-2 border-t border-slate-800">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-white font-bold block">+44 (0) 20 7946 0842</span>
                  <span className="text-[10px] text-slate-400">Direct CAD Dispatch Line</span>
                </div>
              </div>

              <div className="flex items-start space-x-3 pt-2 border-t border-slate-800">
                <Mail className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-white font-bold block">plans@studioarch.co.uk</span>
                  <span className="text-[10px] text-slate-400">Statutory Tender Inquiries</span>
                </div>
              </div>
            </div>

            <div className="p-3 bg-[#001026] border border-slate-800 text-[10px] space-y-1">
              <div className="flex justify-between text-slate-400">
                <span>HOURS:</span>
                <span className="text-slate-200">Mon - Fri: 08:00 - 18:30 GMT</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>SLA STATUS:</span>
                <span className="text-emerald-400 font-bold">{STUDIO_STATUS}</span>
              </div>
            </div>
          </div>

          {/* Quick FAQ summary box */}
          <div className="bg-white border-2 border-slate-300 p-6 space-y-3">
            <span className="text-[11px] font-bold text-slate-900 uppercase tracking-wider block border-b border-slate-200 pb-1">
              WHAT HAPPENS NEXT?
            </span>
            <ol className="space-y-2 text-slate-700 text-[11px]">
              <li className="flex items-start space-x-2">
                <span className="font-bold text-sky-800">1.</span>
                <span>Desktop council planning history &amp; constraints check.</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="font-bold text-sky-800">2.</span>
                <span>Fixed-fee itemized drawing quotation issued within 4h.</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="font-bold text-sky-800">3.</span>
                <span>Leica 3D laser survey booked at your property.</span>
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
