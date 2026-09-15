import React, { useState, useMemo } from 'react';
import { Project, ProjectCategory } from '../types';
import { PROJECTS } from '../data/mockData';
import { Search, LayoutGrid, Table, ArrowUpRight, Filter, Compass, CheckCircle2 } from 'lucide-react';

interface ProjectsPageProps {
  onSelectProject: (project: Project) => void;
  onOpenEstimator: () => void;
}

export const ProjectsPage: React.FC<ProjectsPageProps> = ({
  onSelectProject,
  onOpenEstimator
}) => {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProjects = useMemo(() => {
    return PROJECTS.filter((p) => {
      const matchesCategory =
        activeCategory === 'all' || p.category === activeCategory;
      const matchesSearch =
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.refCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.specs.structuralSystem.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Page Header Title Block */}
      <div className="border-b border-hairline pb-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="text-xs font-sans text-brass uppercase tracking-widest font-bold mb-1">
              SELECTED WORKS
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-ink font-display">
              Selected Works
            </h1>
            <p className="text-sm text-stone font-sans mt-2 max-w-2xl">
              An index of built residential extensions, commercial infills, and heritage interventions executed with statutory drawing packages and certified structural calculations.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={onOpenEstimator}
              className="px-4 py-2.5 bg-ink text-white text-xs font-sans font-bold hover:bg-ink-soft transition-colors"
            >
              REQUEST A FEE GUIDE
            </button>
          </div>
        </div>
      </div>

      {/* Control Bar: Categories & View Toggle */}
      <div className="bg-white border border-hairline p-4 flex flex-wrap items-center justify-between gap-4 font-sans text-xs shadow-xs">
        
        {/* Category Tabs */}
        <div className="flex flex-wrap items-center gap-1.5">
          {[
            { id: 'all', label: 'All Works' },
            { id: 'residential', label: 'Residential' },
            { id: 'commercial', label: 'Commercial' },
            { id: 'heritage', label: 'Conservation & Heritage' },
            { id: 'new-builds', label: 'New Builds' }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id as ProjectCategory)}
              className={`px-3 py-1.5 border transition-all ${
                activeCategory === cat.id
                  ? 'bg-ink text-white border-ink font-bold'
                  : 'bg-ivory text-stone border-hairline hover:bg-hairline/60'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search & Layout Mode Switcher */}
        <div className="flex items-center space-x-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="w-4 h-4 text-stone absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search reference, borough..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-ivory border border-hairline text-ink pl-8 pr-3 py-1.5 text-xs font-sans focus:outline-none focus:border-ink"
            />
          </div>

          <div className="flex items-center border border-hairline bg-ivory p-0.5">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 ${viewMode === 'grid' ? 'bg-ink text-white' : 'text-stone hover:text-ink'}`}
              title="Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 ${viewMode === 'table' ? 'bg-ink text-white' : 'text-stone hover:text-ink'}`}
              title="Table Index View"
            >
              <Table className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>

      {/* VIEW 1: CARD GRID */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((proj) => (
            <div
              key={proj.id}
              className="bg-white border border-hairline flex flex-col justify-between hover:border-ink hover:shadow-xl transition-all group overflow-hidden"
            >
              <div>
                {/* Hero / Blueprint toggle preview */}
                <div className="relative h-64 w-full overflow-hidden bg-ink">
                  <img
                    src={proj.heroImage}
                    alt={proj.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-ink-soft/90 text-brass-light font-sans text-[10px] px-2 py-0.5 border border-white/10">
                    {proj.refCode}
                  </div>
                  <div className="absolute bottom-3 right-3 bg-ink/80 text-brass-light font-sans text-[10px] px-2 py-0.5">
                    {proj.areaSqm} m² // {proj.scale}
                  </div>
                </div>

                <div className="p-5 space-y-3">
                  <div className="flex items-center justify-between text-[11px] font-sans text-stone">
                    <span className="font-bold text-brass">{proj.categoryLabel.toUpperCase()}</span>
                    <span>{proj.location}</span>
                  </div>

                  <h3 className="text-xl font-bold text-ink font-display">
                    {proj.title}
                  </h3>

                  <p className="text-xs text-stone font-sans line-clamp-3 leading-relaxed">
                    {proj.description}
                  </p>

                  <div className="pt-2 border-t border-hairline/60 text-[10px] font-sans text-stone space-y-1">
                    <div className="flex justify-between">
                      <span>PLANNING AUTHORITY:</span>
                      <span className="text-ink font-bold">{proj.specs.planningAuthority}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>APPROVAL TIMELINE:</span>
                      <span className="text-sage font-bold">{proj.specs.approvalTimeWeeks} Weeks (First Pass)</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-5 pt-0">
                <button
                  onClick={() => onSelectProject(proj)}
                  className="w-full py-2.5 bg-ink hover:bg-ink-soft text-white font-sans text-xs font-bold flex items-center justify-center space-x-2 transition-colors cursor-pointer"
                >
                  <span>VIEW PROJECT</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-brass-light" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* VIEW 2: ENGINEERING INDEX TABLE */}
      {viewMode === 'table' && (
        <div className="border border-hairline bg-white overflow-x-auto shadow-sm">
          <table className="w-full text-left border-collapse font-sans text-xs">
            <thead>
              <tr className="bg-ink-soft text-white border-b border-white/10">
                <th className="p-3.5 font-bold">DOC REF</th>
                <th className="p-3.5 font-bold">PROJECT TITLE</th>
                <th className="p-3.5 font-bold">CATEGORY</th>
                <th className="p-3.5 font-bold">BOROUGH / LOCATION</th>
                <th className="p-3.5 font-bold">AREA</th>
                <th className="p-3.5 font-bold">STATUS</th>
                <th className="p-3.5 font-bold text-right">ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredProjects.map((proj) => (
                <tr key={proj.id} className="hover:bg-ivory transition-colors">
                  <td className="p-3.5 font-bold text-brass">{proj.refCode}</td>
                  <td className="p-3.5 font-bold text-ink font-display text-sm">{proj.title}</td>
                  <td className="p-3.5 text-stone">{proj.categoryLabel}</td>
                  <td className="p-3.5 text-stone">{proj.location}</td>
                  <td className="p-3.5 text-ink">{proj.areaSqm} m²</td>
                  <td className="p-3.5">
                    <span className="px-2 py-0.5 bg-sage/15 text-sage border border-sage/40 text-[10px] font-bold">
                      {proj.status}
                    </span>
                  </td>
                  <td className="p-3.5 text-right">
                    <button
                      onClick={() => onSelectProject(proj)}
                      className="px-3 py-1 bg-ink text-white text-[11px] font-bold hover:bg-ink-soft transition-colors"
                    >
                      INSPECT
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {filteredProjects.length === 0 && (
        <div className="p-12 text-center bg-white border border-hairline font-sans text-xs text-stone">
          No architectural projects found matching query "{searchQuery}".
        </div>
      )}

    </div>
  );
};
