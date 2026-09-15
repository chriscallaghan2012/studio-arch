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
      <div className="border-b border-hairline pb-6 text-center space-y-3">
        <div className="text-xs font-sans text-brass uppercase tracking-widest font-bold">
          GUIDANCE &amp; ANSWERS
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-ink font-display">
          Technical &amp; Planning FAQs
        </h1>
        <p className="text-sm text-stone font-sans max-w-xl mx-auto">
          Clear answers to common questions regarding permitted development, building regulations compliance, structural calculations, and council timelines.
        </p>
      </div>

      {/* Filter and Search Console */}
      <div className="bg-white border border-hairline p-4 space-y-4 font-sans text-xs shadow-xs">
        <div className="relative">
          <Search className="w-4 h-4 text-stone absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search regulations (e.g. Part L, Party Wall, Permitted Development)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-ivory border border-hairline text-ink pl-9 pr-3 py-2 text-xs font-sans focus:outline-none focus:border-ink"
          />
        </div>

        <div className="flex flex-wrap gap-2 pt-1 border-t border-hairline">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 border transition-all ${
                selectedCategory === cat
                  ? 'bg-ink text-white border-ink font-bold'
                  : 'bg-ivory text-stone border-hairline hover:bg-hairline/60'
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
              className="border border-hairline bg-white overflow-hidden shadow-xs transition-all"
            >
              <button
                onClick={() => toggleFaq(faq.id)}
                className="w-full p-5 text-left flex items-center justify-between font-bold text-ink text-sm sm:text-base hover:bg-ivory transition-colors focus:outline-none"
              >
                <div className="flex items-center space-x-3">
                  <span className="font-sans text-xs text-brass bg-brass/10 px-2 py-0.5 border border-brass/40 shrink-0">
                    {faq.category}
                  </span>
                  <span>{faq.question}</span>
                </div>
                <ChevronDown
                  className={`w-5 h-5 text-stone transition-transform shrink-0 ml-3 ${
                    isOpen ? 'rotate-180 text-brass' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-5 pb-5 pt-2 text-xs sm:text-sm text-stone leading-relaxed border-t border-hairline bg-ivory/50 space-y-3">
                  <p>{faq.answer}</p>
                  {faq.docRef && (
                    <div className="p-2 bg-hairline/60 border border-hairline text-[10px] font-sans text-stone flex items-center space-x-2">
                      <FileText className="w-3.5 h-3.5 text-brass shrink-0" />
                      <span>Reference · {faq.docRef}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}

        {filteredFaqs.length === 0 && (
          <div className="p-12 text-center bg-white border border-hairline font-sans text-xs text-stone">
            No questions found matching your search.
          </div>
        )}
      </div>

      {/* Still have questions banner */}
      <div className="bg-ink-soft text-white p-6 sm:p-8 border border-white/10 flex flex-wrap items-center justify-between gap-4 font-sans text-xs">
        <div>
          <span className="text-brass-light font-bold block text-sm">Have a unique site constraint or planning enquiry?</span>
          <span className="text-stone text-[11px]">Speak directly with a lead chartered architect for a free 15-minute briefing.</span>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={onContactClick}
            className="px-4 py-2.5 bg-brass text-black font-bold hover:bg-brass transition-colors"
          >
            REQUEST A CONSULTATION
          </button>
          <button
            onClick={onOpenEstimator}
            className="px-4 py-2.5 bg-ink-soft border border-white/15 text-white hover:bg-ink-soft transition-colors"
          >
            FEE GUIDE
          </button>
        </div>
      </div>

    </div>
  );
};
