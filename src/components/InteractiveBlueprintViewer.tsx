import React, { useState } from 'react';
import { ZoomIn, ZoomOut, RotateCcw, Eye, Layers, Info, Check, Maximize2 } from 'lucide-react';

interface BlueprintAnnotation {
  id: string;
  x: number; // percentage
  y: number; // percentage
  title: string;
  category: 'structural' | 'thermal' | 'dimensions' | 'mep';
  code: string;
  description: string;
  value: string;
}

interface InteractiveBlueprintViewerProps {
  blueprintImage: string;
  title: string;
  refCode: string;
  scale?: string;
}

const DEFAULT_ANNOTATIONS: BlueprintAnnotation[] = [
  {
    id: 'node-1',
    x: 32,
    y: 28,
    title: 'Load Node A // Primary Steel Beam',
    category: 'structural',
    code: 'BS EN 1993 // UB 203x133x25',
    description: 'Flitched mild steel universal beam carrying second-floor point loads to ground masonry pads.',
    value: 'Capacity: 142 kN // Max Deflection: 4.2mm'
  },
  {
    id: 'node-2',
    x: 68,
    y: 42,
    title: 'Thermal Envelope // Glazing Interface',
    category: 'thermal',
    code: 'PART L // LOW-E COATING',
    description: 'Structural frameless triple glazing with argon cavity and warm-edge spacer bars.',
    value: 'U-Value: 0.85 W/m²K // Solar G-Value: 0.42'
  },
  {
    id: 'node-3',
    x: 48,
    y: 75,
    title: 'Sub-structure // Pad Foundation',
    category: 'structural',
    code: 'BS 8110 // C35 CONCRETE',
    description: 'Reinforced concrete pad 900x900x450mm with B500B mesh reinforcement over stiff clay strata.',
    value: 'Bearing Pressure: 150 kPa'
  },
  {
    id: 'node-4',
    x: 82,
    y: 65,
    title: 'Drainage // Perimeter Slot Drain',
    category: 'mep',
    code: 'PART H // SUDS COMPLIANT',
    description: 'Concealed stainless steel slot channel discharging directly to soakaway attenuation crate.',
    value: 'Flow Rate: 4.8 L/sec'
  },
  {
    id: 'node-5',
    x: 18,
    y: 55,
    title: 'Party Wall Junction // Acoustic Break',
    category: 'dimensions',
    code: 'PART E // SOUND INSULATION',
    description: 'Independent 50mm acoustic stud lining with 100mm mineral wool and double SoundBloc plasterboard.',
    value: 'Acoustic Reduction: 54 dB DnT,w + Ctr'
  }
];

export const InteractiveBlueprintViewer: React.FC<InteractiveBlueprintViewerProps> = ({
  blueprintImage,
  title,
  refCode,
  scale = '1:50 @ A1'
}) => {
  const [zoomLevel, setZoomLevel] = useState(1);
  const [selectedNode, setSelectedNode] = useState<BlueprintAnnotation | null>(DEFAULT_ANNOTATIONS[0]);
  const [activeLayers, setActiveLayers] = useState<{
    structural: boolean;
    thermal: boolean;
    dimensions: boolean;
    mep: boolean;
  }>({
    structural: true,
    thermal: true,
    dimensions: true,
    mep: true
  });

  const toggleLayer = (layer: keyof typeof activeLayers) => {
    setActiveLayers((prev) => ({ ...prev, [layer]: !prev[layer] }));
  };

  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 0.25, 2.2));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 0.25, 0.8));
  const handleResetZoom = () => setZoomLevel(1);

  const filteredAnnotations = DEFAULT_ANNOTATIONS.filter(
    (ann) => activeLayers[ann.category]
  );

  return (
    <div className="bg-ink-soft border border-white/10 text-white/90 shadow-2xl overflow-hidden font-sans">
      {/* Title block banner */}
      <div className="bg-ink-soft px-4 py-3 border-b border-white/10 flex flex-wrap items-center justify-between gap-4 font-sans text-xs">
        <div className="flex items-center space-x-3">
          <div className="w-2.5 h-2.5 rounded-xs bg-brass"></div>
          <div>
            <span className="text-white font-bold text-sm tracking-wide">{title}</span>
            <span className="text-brass-light ml-2 font-sans text-xs">[{refCode}]</span>
          </div>
        </div>

        {/* Layer Filters */}
        <div className="flex flex-wrap items-center gap-2 text-[11px]">
          <span className="text-white/60 hidden sm:inline">LAYERS:</span>
          <button
            onClick={() => toggleLayer('structural')}
            className={`px-2 py-0.5 border text-xs font-sans transition-colors ${
              activeLayers.structural
                ? 'bg-brass/20 text-brass-light border-brass/50'
                : 'bg-transparent text-white/60 border-white/10 line-through'
            }`}
          >
            STRUCTURAL
          </button>
          <button
            onClick={() => toggleLayer('thermal')}
            className={`px-2 py-0.5 border text-xs font-sans transition-colors ${
              activeLayers.thermal
                ? 'bg-brass/20 text-brass-light border-sage/50'
                : 'bg-transparent text-white/60 border-white/10 line-through'
            }`}
          >
            THERMAL / PART L
          </button>
          <button
            onClick={() => toggleLayer('dimensions')}
            className={`px-2 py-0.5 border text-xs font-sans transition-colors ${
              activeLayers.dimensions
                ? 'bg-amber-900 text-amber-200 border-amber-500'
                : 'bg-transparent text-white/60 border-white/10 line-through'
            }`}
          >
            DIMENSIONS
          </button>
          <button
            onClick={() => toggleLayer('mep')}
            className={`px-2 py-0.5 border text-xs font-sans transition-colors ${
              activeLayers.mep
                ? 'bg-purple-900 text-purple-200 border-purple-500'
                : 'bg-transparent text-white/60 border-white/10 line-through'
            }`}
          >
            MEP / DRAINAGE
          </button>
        </div>
      </div>

      {/* Blueprint Visual Stage & Sidebar Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
        
        {/* Main CAD Canvas */}
        <div className="lg:col-span-2 relative h-[380px] sm:h-[480px] bg-ink overflow-hidden flex items-center justify-center border-b lg:border-b-0 lg:border-r border-white/10">
          {/* Blueprint Grid pattern */}
          <div className="absolute inset-0 bg-blueprint-dark opacity-75 pointer-events-none"></div>

          {/* Scalable Container */}
          <div
            className="relative transition-transform duration-200 ease-out origin-center w-full h-full flex items-center justify-center p-4"
            style={{ transform: `scale(${zoomLevel})` }}
          >
            <img
              src={blueprintImage}
              alt="Technical CAD Architectural Drawing"
              referrerPolicy="no-referrer"
              className="max-w-full max-h-full object-contain filter contrast-125 brightness-110 drop-shadow-md select-none pointer-events-none"
            />

            {/* Interactive Pins / Hotspots */}
            {filteredAnnotations.map((pin) => {
              const isSelected = selectedNode?.id === pin.id;
              let pinBg = 'bg-brass border-brass/40';
              if (pin.category === 'thermal') pinBg = 'bg-brass border-sage/40';
              if (pin.category === 'dimensions') pinBg = 'bg-amber-500 border-amber-300';
              if (pin.category === 'mep') pinBg = 'bg-purple-500 border-purple-300';

              return (
                <button
                  key={pin.id}
                  onClick={() => setSelectedNode(pin)}
                  style={{ top: `${pin.y}%`, left: `${pin.x}%` }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 w-7 h-7 rounded-full border ${pinBg} text-black font-sans text-[10px] font-extrabold flex items-center justify-center shadow-none transition-all hover:scale-125 cursor-pointer z-20 ${
                    isSelected ? 'ring-4 ring-white scale-125 animate-bounce' : 'opacity-90'
                  }`}
                  aria-label={`Inspect ${pin.title}`}
                >
                  +
                </button>
              );
            })}
          </div>

          {/* Bottom Left: Scale Indicator */}
          <div className="absolute bottom-3 left-3 z-20 bg-ink-soft/90 border border-white/10 px-3 py-1.5 font-sans text-[11px] text-white/70 backdrop-blur-xs flex items-center space-x-3">
            <span className="text-brass-light font-bold">SCALE: {scale}</span>
            <span className="text-white/60">|</span>
            <span>PROJECTION: ORTHOGRAPHIC</span>
          </div>

          {/* Bottom Right: Zoom Tools */}
          <div className="absolute bottom-3 right-3 z-20 bg-ink-soft/90 border border-white/10 p-1 flex items-center space-x-1 font-sans text-xs backdrop-blur-xs">
            <button
              onClick={handleZoomIn}
              className="p-1.5 text-white/70 hover:text-white hover:bg-ink-soft transition-colors"
              title="Zoom In"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              onClick={handleZoomOut}
              className="p-1.5 text-white/70 hover:text-white hover:bg-ink-soft transition-colors"
              title="Zoom Out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <button
              onClick={handleResetZoom}
              className="p-1.5 text-white/70 hover:text-white hover:bg-ink-soft transition-colors"
              title="Reset View"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <span className="text-[10px] text-brass-light px-1 font-sans">
              {Math.round(zoomLevel * 100)}%
            </span>
          </div>
        </div>

        {/* Inspector Sidebar for Inspected Node */}
        <div className="p-5 bg-ink-soft flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-3">
              <span className="text-[11px] font-sans text-brass-light uppercase tracking-wider font-bold">
                DRAWING NOTES
              </span>
              <span className="text-[10px] font-sans text-white/60">
                {filteredAnnotations.length} NOTES VISIBLE
              </span>
            </div>

            {selectedNode ? (
              <div className="space-y-3">
                <div>
                  <span className="text-[10px] font-sans text-brass-light uppercase px-1.5 py-0.5 bg-brass/15 border border-sage/40 inline-block mb-1">
                    {selectedNode.category.toUpperCase()}
                  </span>
                  <h4 className="text-base font-bold text-white font-display">
                    {selectedNode.title}
                  </h4>
                  <p className="text-xs font-sans text-brass-light mt-0.5">
                    {selectedNode.code}
                  </p>
                </div>

                <div className="p-3 bg-[#000a17] border border-white/10 text-xs font-sans text-white/70 leading-relaxed">
                  {selectedNode.description}
                </div>

                <div className="p-2.5 bg-ink/70 border border-brass/40 text-xs font-sans">
                  <span className="text-white/60 block text-[10px]">SPECIFICATION:</span>
                  <span className="text-white font-bold">{selectedNode.value}</span>
                </div>
              </div>
            ) : (
              <div className="p-6 text-center text-white/60 font-sans text-xs">
                Select a numbered point on the drawing to view its specification.
              </div>
            )}
          </div>

          {/* Quick Node Selector Pills */}
          <div className="border-t border-white/10 pt-3">
            <span className="text-[10px] font-sans text-white/60 block mb-2">
              GO TO A NOTE:
            </span>
            <div className="grid grid-cols-2 gap-1.5">
              {DEFAULT_ANNOTATIONS.map((node) => (
                <button
                  key={node.id}
                  onClick={() => setSelectedNode(node)}
                  className={`text-left p-1.5 text-[10px] font-sans border transition-colors truncate ${
                    selectedNode?.id === node.id
                      ? 'bg-brass/20 text-white border-brass font-bold'
                      : 'bg-ink-soft text-white/60 border-white/10 hover:bg-ink-soft'
                  }`}
                >
                  {node.title.split('//')[0]}
                </button>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
