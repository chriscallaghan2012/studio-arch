import React, { useState, useMemo } from 'react';
import { FAQS } from '../data/mockData';
import { Search, ChevronDown, HelpCircle, FileText, ArrowRight, Calculator } from 'lucide-react';

interface FaqPageProps {
  onOpenEstimator: () => void;
  onContactClick: () => void;
}

export const FaqPage: React.FC<FaqPageProps> = ({ onOpenEstimator, onContactClick }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [openIds, setOpenIds] = useState<Record<string, boolean>>({
    [FAQS[0].id]: true
  });

  const categories = ['All', 'Planning', 'Building Regs', 'Structural', 'Pricing & Process'];

  const filteredFaqs = useMemo(() => {
    return FAQS.filter((item) => {
      const matchesCat = selectedCategory === 'All' || item.category === selectedCategory;
      const matchesSearch =
        item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.docRef && item.docRef.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCat && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const toggleFaq = (id: string) => {
    setOpenIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Title block */}
      <div className="border-b-2 border-slate-300 pb-6 text-center space-y-3">
        <div className="text-xs font-mono text-sky-800 uppercase tracking-widest font-bold">
          STATUTORY_KNOWLEDGEBASE // FAQS
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 font-display">
          Technical &amp; Planning FAQs
        </h1>
        <p className="text-sm text-slate-600 font-sans max-w-xl mx-auto">
          Clear answers to common questions regarding permitted development, building regulations compliance, structural calculations, and council timelines.
        </p>
      </div>

      {/* Filter and Search Console */}
      <div className="bg-white border-2 border-slate-300 p-4 space-y-4 font-mono text-xs shadow-xs">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search regulations (e.g. Part L, Party Wall, Permitted Development)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 border border-slate-300 text-slate-900 pl-9 pr-3 py-2 text-xs font-mono focus:outline-none focus:border-[#001f3f]"
          />
        </div>

        <div className="flex flex-wrap gap-2 pt-1 border-t border-slate-200">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 border transition-all ${
                selectedCategory === cat
                  ? 'bg-[#001f3f] text-white border-[#001f3f] font-bold'
                  : 'bg-slate-50 text-slate-700 border-slate-300 hover:bg-slate-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* FAQ Accordion List */}
      <div className="space-y-4 font-sans">
        {filteredFaqs.map((faq) => {
          const isOpen = !!openIds[faq.id];
          return (
            <div
              key={faq.id}
              className="border-2 border-slate-300 bg-white overflow-hidden shadow-xs transition-all"
            >
              <button
                onClick={() => toggleFaq(faq.id)}
                className="w-full p-5 text-left flex items-center justify-between font-bold text-slate-900 text-sm sm:text-base hover:bg-slate-50 transition-colors focus:outline-none"
              >
                <div className="flex items-center space-x-3">
                  <span className="font-mono text-xs text-sky-800 bg-sky-100 px-2 py-0.5 border border-sky-300 shrink-0">
                    {faq.category}
                  </span>
                  <span>{faq.question}</span>
                </div>
                <ChevronDown
                  className={`w-5 h-5 text-slate-500 transition-transform shrink-0 ml-3 ${
                    isOpen ? 'rotate-180 text-sky-700' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-5 pb-5 pt-2 text-xs sm:text-sm text-slate-700 leading-relaxed border-t border-slate-200 bg-slate-50/50 space-y-3">
                  <p>{faq.answer}</p>
                  {faq.docRef && (
                    <div className="p-2 bg-slate-100 border border-slate-300 text-[10px] font-mono text-slate-600 flex items-center space-x-2">
                      <FileText className="w-3.5 h-3.5 text-sky-700 shrink-0" />
                      <span>OFFICIAL STATUTORY REFERENCE: {faq.docRef}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}

        {filteredFaqs.length === 0 && (
          <div className="p-12 text-center bg-white border-2 border-slate-300 font-mono text-xs text-slate-500">
            No questions found matching your search.
          </div>
        )}
      </div>

      {/* Still have questions banner */}
      <div className="bg-[#001733] text-white p-6 sm:p-8 border-2 border-slate-700 flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
        <div>
          <span className="text-sky-400 font-bold block text-sm">Have a unique site constraint or planning enquiry?</span>
          <span className="text-slate-400 text-[11px]">Speak directly with a lead chartered architect for a free 15-minute briefing.</span>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={onContactClick}
            className="px-4 py-2.5 bg-sky-500 text-black font-bold hover:bg-sky-400 transition-colors"
          >
            DISPATCH ENQUIRY
          </button>
          <button
            onClick={onOpenEstimator}
            className="px-4 py-2.5 bg-[#001229] border border-slate-600 text-white hover:bg-slate-800 transition-colors"
          >
            CALCULATE FEE
          </button>
        </div>
      </div>

    </div>
  );
};
