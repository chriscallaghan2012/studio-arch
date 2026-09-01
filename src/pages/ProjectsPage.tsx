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
      <div className="border-b-2 border-slate-300 pb-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="text-xs font-mono text-sky-800 uppercase tracking-widest font-bold mb-1">
              ARCHIVE_INDEX // PORTFOLIO
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 font-display">
              Selected Works
            </h1>
            <p className="text-sm text-slate-600 font-sans mt-2 max-w-2xl">
              An index of built residential extensions, commercial infills, and heritage interventions executed with statutory drawing packages and certified structural calculations.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={onOpenEstimator}
              className="px-4 py-2.5 bg-[#001f3f] text-white text-xs font-mono font-bold hover:bg-[#002b49] transition-colors"
            >
              ESTIMATE NEW PROJECT
            </button>
          </div>
        </div>
      </div>

      {/* Control Bar: Categories & View Toggle */}
      <div className="bg-white border-2 border-slate-300 p-4 flex flex-wrap items-center justify-between gap-4 font-mono text-xs shadow-xs">
        
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
                  ? 'bg-[#001f3f] text-white border-[#001f3f] font-bold'
                  : 'bg-slate-50 text-slate-700 border-slate-300 hover:bg-slate-100'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search & Layout Mode Switcher */}
        <div className="flex items-center space-x-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search reference, borough..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 text-slate-900 pl-8 pr-3 py-1.5 text-xs font-mono focus:outline-none focus:border-[#001f3f]"
            />
          </div>

          <div className="flex items-center border border-slate-300 bg-slate-50 p-0.5">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 ${viewMode === 'grid' ? 'bg-[#001f3f] text-white' : 'text-slate-500 hover:text-slate-900'}`}
              title="Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 ${viewMode === 'table' ? 'bg-[#001f3f] text-white' : 'text-slate-500 hover:text-slate-900'}`}
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
              className="bg-white border-2 border-slate-300 flex flex-col justify-between hover:border-[#001f3f] hover:shadow-xl transition-all group overflow-hidden"
            >
              <div>
                {/* Hero / Blueprint toggle preview */}
                <div className="relative h-64 w-full overflow-hidden bg-slate-900">
                  <img
                    src={proj.heroImage}
                    alt={proj.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-[#001733]/90 text-sky-300 font-mono text-[10px] px-2 py-0.5 border border-slate-700">
                    {proj.refCode}
                  </div>
                  <div className="absolute bottom-3 right-3 bg-black/80 text-emerald-400 font-mono text-[10px] px-2 py-0.5">
                    {proj.areaSqm} m² // {proj.scale}
                  </div>
                </div>

                <div className="p-5 space-y-3">
                  <div className="flex items-center justify-between text-[11px] font-mono text-slate-500">
                    <span className="font-bold text-sky-900">{proj.categoryLabel.toUpperCase()}</span>
                    <span>{proj.location}</span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 font-display">
                    {proj.title}
                  </h3>

                  <p className="text-xs text-slate-600 font-sans line-clamp-3 leading-relaxed">
                    {proj.description}
                  </p>

                  <div className="pt-2 border-t border-slate-100 text-[10px] font-mono text-slate-500 space-y-1">
                    <div className="flex justify-between">
                      <span>PLANNING AUTHORITY:</span>
                      <span className="text-slate-800 font-bold">{proj.specs.planningAuthority}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>APPROVAL TIMELINE:</span>
                      <span className="text-emerald-700 font-bold">{proj.specs.approvalTimeWeeks} Weeks (First Pass)</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-5 pt-0">
                <button
                  onClick={() => onSelectProject(proj)}
                  className="w-full py-2.5 bg-[#001f3f] hover:bg-[#002b49] text-white font-mono text-xs font-bold flex items-center justify-center space-x-2 transition-colors cursor-pointer"
                >
                  <span>INSPECT FULL DOSSIER & CAD</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-sky-400" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* VIEW 2: ENGINEERING INDEX TABLE */}
      {viewMode === 'table' && (
        <div className="border-2 border-slate-300 bg-white overflow-x-auto shadow-sm">
          <table className="w-full text-left border-collapse font-mono text-xs">
            <thead>
              <tr className="bg-[#001733] text-white border-b border-slate-700">
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
                <tr key={proj.id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-3.5 font-bold text-sky-900">{proj.refCode}</td>
                  <td className="p-3.5 font-bold text-slate-900 font-display text-sm">{proj.title}</td>
                  <td className="p-3.5 text-slate-600">{proj.categoryLabel}</td>
                  <td className="p-3.5 text-slate-700">{proj.location}</td>
                  <td className="p-3.5 text-slate-800">{proj.areaSqm} m²</td>
                  <td className="p-3.5">
                    <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 border border-emerald-300 text-[10px] font-bold">
                      {proj.status}
                    </span>
                  </td>
                  <td className="p-3.5 text-right">
                    <button
                      onClick={() => onSelectProject(proj)}
                      className="px-3 py-1 bg-[#001f3f] text-white text-[11px] font-bold hover:bg-[#002b49] transition-colors"
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
        <div className="p-12 text-center bg-white border-2 border-slate-300 font-mono text-xs text-slate-500">
          No architectural projects found matching query "{searchQuery}".
        </div>
      )}

    </div>
  );
};
