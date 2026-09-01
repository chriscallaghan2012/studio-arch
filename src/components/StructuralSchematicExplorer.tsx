import React, { useState } from 'react';
import { Activity, Anchor, ArrowDown, ArrowUp, Compass, Cpu, Zap, Shield } from 'lucide-react';

interface NodeData {
  id: string;
  name: string;
  type: 'LOAD_NODE' | 'TENSION_VECTOR' | 'BENDING_MOMENT' | 'SHEAR_PLANE';
  capacity: string;
  safetyFactor: string;
  formula: string;
  status: 'OPTIMAL' | 'VERIFIED' | 'PASS';
  detail: string;
}

const STRUCTURAL_NODES: NodeData[] = [
  {
    id: 'node-a',
    name: 'LOAD_NODE_A // FLITCH STEEL PORTAL',
    type: 'LOAD_NODE',
    capacity: '148.5 kN Ultimate Load',
    safetyFactor: 'γM0 = 1.05 (Eurocode 3)',
    formula: 'M_Ed / M_c,Rd = 0.68 ≤ 1.0',
    status: 'OPTIMAL',
    detail: 'Flitched 254x146x31 UB connected via 12mm Grade 8.8 structural bolts into existing 215mm solid masonry party wall with precast padstones.'
  },
  {
    id: 'vector-t1',
    name: 'TENSION_VECTOR_01 // CANTILEVER TIE',
    type: 'TENSION_VECTOR',
    capacity: '82.0 kN Axial Tension',
    safetyFactor: 'γM2 = 1.25',
    formula: 'N_Ed / N_t,Rd = 0.54 ≤ 1.0',
    status: 'VERIFIED',
    detail: 'High-tensile Grade S355 steel tie-rod with turnbuckle tensioner balancing the 2.4m glass corner canopy cantilever.'
  },
  {
    id: 'moment-b',
    name: 'BENDING_MOMENT_MAX // RIDGE SPAN',
    type: 'BENDING_MOMENT',
    capacity: '94.2 kNm Moment Capacity',
    safetyFactor: 'Deflection: L/360 (4.8mm)',
    formula: 'δ_max = 5wL⁴ / 384EI',
    status: 'PASS',
    detail: 'Engineered glulam ridge beam spanning 6.2 meters with integrated concealed steel flitch plate and concealed mortise connections.'
  },
  {
    id: 'shear-p1',
    name: 'SHEAR_PLANE_03 // FOUNDATION PAD',
    type: 'SHEAR_PLANE',
    capacity: '185.0 kPa Soil Bearing',
    safetyFactor: 'FoS = 3.0 on Stiff Clay',
    formula: 'V_Ed / V_Rd,c = 0.42 ≤ 1.0',
    status: 'OPTIMAL',
    detail: 'C30/37 reinforced concrete footing (1000x1000x500mm) founded 1.2m below ground level below tree root influence zone.'
  }
];

export const StructuralSchematicExplorer: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState<NodeData>(STRUCTURAL_NODES[0]);

  return (
    <div className="bg-[#000d1c] border border-slate-700 text-white shadow-xl overflow-hidden font-sans">
      {/* Top Banner */}
      <div className="bg-[#001736] px-4 py-3 border-b border-slate-700 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
        <div className="flex items-center space-x-2">
          <Activity className="w-4 h-4 text-sky-400" />
          <span className="text-white font-bold">STRUCTURAL SIMULATION ENGINE // EUROCODE 3</span>
        </div>
        <div className="flex items-center space-x-3 text-[11px]">
          <span className="text-emerald-400 font-mono flex items-center">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-1.5 animate-pulse"></span>
            ISTAT_CALCULATOR: ACTIVE
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
        
        {/* Left Column: Interactive Vector Diagram Representation */}
        <div className="lg:col-span-7 p-6 relative bg-[#000814] flex flex-col justify-between overflow-hidden border-b lg:border-b-0 lg:border-r border-slate-800">
          <div className="absolute inset-0 bg-blueprint-dark opacity-80 pointer-events-none"></div>

          <div className="relative z-10">
            <div className="flex justify-between items-center text-[11px] font-mono text-slate-400 mb-4">
              <span>SCHEMATIC: MOMENT &amp; FORCE DISTRIBUTION</span>
              <span>DATUM: ±0.000 FFL</span>
            </div>

            {/* Custom SVG Structural Beam & Load Vector Diagram */}
            <div className="w-full h-56 relative border border-slate-800 bg-[#001226]/80 p-4 flex items-center justify-center">
              <svg viewBox="0 0 500 200" className="w-full h-full text-slate-400">
                {/* Grid guidelines */}
                <line x1="50" y1="140" x2="450" y2="140" stroke="#334155" strokeWidth="1" strokeDasharray="4 4" />
                <line x1="50" y1="50" x2="450" y2="50" stroke="#334155" strokeWidth="1" strokeDasharray="4 4" />

                {/* Main Steel Universal Beam Profile */}
                <rect x="70" y="85" width="360" height="18" fill="#1e3a8a" stroke="#38bdf8" strokeWidth="2" />
                <rect x="70" y="70" width="360" height="6" fill="#38bdf8" />
                <rect x="70" y="112" width="360" height="6" fill="#38bdf8" />

                {/* Left Support Column (Masonry Padstone) */}
                <rect x="70" y="118" width="30" height="50" fill="#334155" stroke="#64748b" strokeWidth="1" />
                <polygon points="70,168 100,168 85,185" fill="#475569" />

                {/* Right Cantilever Node */}
                <rect x="350" y="118" width="30" height="50" fill="#334155" stroke="#64748b" strokeWidth="1" />
                <polygon points="350,168 380,168 365,185" fill="#475569" />

                {/* Uniformly Distributed Load Arrows */}
                {[110, 150, 190, 230, 270, 310, 350, 390].map((x, i) => (
                  <g key={i}>
                    <line x1={x} y1="35" x2={x} y2="65" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrow)" />
                    <polygon points={`${x-3},60 ${x+3},60 ${x},68`} fill="#f59e0b" />
                  </g>
                ))}
                <text x="210" y="28" fill="#f59e0b" fontSize="10" fontFamily="monospace">UDL: 18.5 kN/m</text>

                {/* Interactive Clickable Nodes on Diagram */}
                {/* Node A */}
                <circle
                  cx="85"
                  cy="94"
                  r={selectedNode.id === 'node-a' ? '12' : '8'}
                  fill={selectedNode.id === 'node-a' ? '#38bdf8' : '#0284c7'}
                  stroke="#ffffff"
                  strokeWidth="2"
                  className="cursor-pointer transition-all hover:scale-125"
                  onClick={() => setSelectedNode(STRUCTURAL_NODES[0])}
                />
                <text x="50" y="75" fill="#38bdf8" fontSize="9" fontFamily="monospace" fontWeight="bold">NODE_A</text>

                {/* Vector T1 */}
                <circle
                  cx="415"
                  cy="94"
                  r={selectedNode.id === 'vector-t1' ? '12' : '8'}
                  fill={selectedNode.id === 'vector-t1' ? '#34d399' : '#059669'}
                  stroke="#ffffff"
                  strokeWidth="2"
                  className="cursor-pointer transition-all hover:scale-125"
                  onClick={() => setSelectedNode(STRUCTURAL_NODES[1])}
                />
                <text x="400" y="75" fill="#34d399" fontSize="9" fontFamily="monospace" fontWeight="bold">VECTOR_T1</text>

                {/* Bending Moment Max (Midspan) */}
                <circle
                  cx="220"
                  cy="94"
                  r={selectedNode.id === 'moment-b' ? '12' : '8'}
                  fill={selectedNode.id === 'moment-b' ? '#fbbf24' : '#d97706'}
                  stroke="#ffffff"
                  strokeWidth="2"
                  className="cursor-pointer transition-all hover:scale-125"
                  onClick={() => setSelectedNode(STRUCTURAL_NODES[2])}
                />
                <text x="200" y="125" fill="#fbbf24" fontSize="9" fontFamily="monospace" fontWeight="bold">M_MAX</text>

                {/* Shear Foundation */}
                <circle
                  cx="365"
                  cy="150"
                  r={selectedNode.id === 'shear-p1' ? '12' : '8'}
                  fill={selectedNode.id === 'shear-p1' ? '#c084fc' : '#9333ea'}
                  stroke="#ffffff"
                  strokeWidth="2"
                  className="cursor-pointer transition-all hover:scale-125"
                  onClick={() => setSelectedNode(STRUCTURAL_NODES[3])}
                />
                <text x="385" y="155" fill="#c084fc" fontSize="9" fontFamily="monospace" fontWeight="bold">PAD_P1</text>
              </svg>
            </div>
          </div>

          {/* Quick Select Buttons */}
          <div className="relative z-10 mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2">
            {STRUCTURAL_NODES.map((node) => (
              <button
                key={node.id}
                onClick={() => setSelectedNode(node)}
                className={`p-2 text-left text-[11px] font-mono border transition-all ${
                  selectedNode.id === node.id
                    ? 'bg-sky-900 text-white border-sky-400 font-bold'
                    : 'bg-[#001020] text-slate-400 border-slate-800 hover:bg-[#001830]'
                }`}
              >
                <span className="block truncate">{node.id.toUpperCase()}</span>
                <span className="text-[9px] text-sky-400 block">{node.status}</span>
              </button>
            ))}
          </div>

        </div>

        {/* Right Column: Node Engineering Report */}
        <div className="lg:col-span-5 p-6 bg-[#001229] flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-3">
              <span className="text-[10px] font-mono text-sky-400 uppercase tracking-widest font-bold">
                MEMBER ANALYSIS // ISTRUCTE
              </span>
              <span className="px-2 py-0.5 bg-emerald-950 border border-emerald-700 text-emerald-400 text-[10px] font-mono font-bold">
                STATUS: {selectedNode.status}
              </span>
            </div>

            <h4 className="text-base font-bold text-white font-display">
              {selectedNode.name}
            </h4>

            <div className="mt-4 space-y-3 font-mono text-xs">
              <div className="p-3 bg-[#000a17] border border-slate-800">
                <span className="text-slate-500 text-[10px] block">APPLIED FORMULATION:</span>
                <span className="text-sky-300 font-bold">{selectedNode.formula}</span>
              </div>

              <div className="p-3 bg-[#000a17] border border-slate-800">
                <span className="text-slate-500 text-[10px] block">CAPACITY THRESHOLD:</span>
                <span className="text-emerald-400 font-bold">{selectedNode.capacity}</span>
              </div>

              <div className="p-3 bg-[#000a17] border border-slate-800">
                <span className="text-slate-500 text-[10px] block">SAFETY FACTOR MARGIN:</span>
                <span className="text-slate-200">{selectedNode.safetyFactor}</span>
              </div>

              <div className="p-3 bg-[#001c3d] border border-sky-800/70 text-slate-300 text-[11px] leading-relaxed">
                {selectedNode.detail}
              </div>
            </div>
          </div>

          <div className="pt-2 text-[10px] font-mono text-slate-500 border-t border-slate-800 flex items-center justify-between">
            <span>ALL PACKAGES INCLUDE FULL CALCULATION TENDER BOOKS</span>
            <Shield className="w-3.5 h-3.5 text-sky-400" />
          </div>
        </div>

      </div>
    </div>
  );
};
