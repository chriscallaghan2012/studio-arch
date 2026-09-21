 import React, { useState, useRef, useCallback } from 'react';
import { Sparkles, Compass, MoveHorizontal, ZoomIn } from 'lucide-react';

interface BeforeAfterSliderProps {
  cadImage: string;
  realityImage: string;
  projectTitle: string;
  projectRef: string;
  location: string;
}

export const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({
  cadImage,
  realityImage,
  projectTitle,
  projectRef,
  location
}) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  }, []);

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isDragging && e.touches.length > 0) {
      handleMove(e.touches[0].clientX);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      handleMove(e.clientX);
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    handleMove(e.clientX);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div className="bg-ink-soft border border-white/10 text-white overflow-hidden shadow-xl">
      {/* Title block header */}
      <div className="bg-ink-soft px-4 py-2.5 border-b border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs font-sans">
        <div className="flex items-center space-x-3">
          <span className="bg-brass/20 text-brass-light border border-brass/40 px-2 py-0.5 font-bold">
            CONSIDERED COMPARISON
          </span>
          <span className="font-bold text-white tracking-wider">{projectTitle}</span>
          <span className="text-stone">[{projectRef}]</span>
        </div>
        <div className="flex items-center space-x-4 text-[11px] text-white/70">
          <span className="hidden sm:inline">LOC: {location}</span>
          <span className="text-stone">|</span>
          <span className="text-brass-light font-bold">VIEW: {Math.round(sliderPosition)}% BUILT</span>
        </div>
      </div>

      {/* Main Interactive Stage */}
      <div
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={() => setIsDragging(true)}
        onTouchMove={handleTouchMove}
        onTouchEnd={() => setIsDragging(false)}
        className="relative w-full h-[360px] sm:h-[480px] lg:h-[540px] cursor-ew-resize select-none overflow-hidden group"
      >
        {/* Layer 1: Left Background - Wireframe CAD Blueprint */}
        <div className="absolute inset-0 w-full h-full bg-ink-soft flex items-center justify-center">
          <img
            src={cadImage}
            alt="Technical CAD Blueprint Elevation"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover filter contrast-125 brightness-95"
          />
          {/* Blueprint Crosshair Overlays */}
          <div className="absolute inset-0 bg-blueprint-grid-dense opacity-30 pointer-events-none"></div>
          
          <div className="absolute top-4 left-4 z-10 bg-ink-soft/90 border border-brass/40 px-3 py-1.5 backdrop-blur-xs font-sans text-[11px] text-brass-light">
            <span className="w-2 h-2 rounded-full bg-brass inline-block mr-1.5"></span>
            <span>DRAWING · 1:50</span>
          </div>

          <div className="absolute bottom-4 left-4 z-10 bg-ink-soft/90 border border-white/10 px-3 py-1 text-[10px] font-sans text-stone hidden sm:block">
            1000MM GRID · BS 1192 COMPLIANT
          </div>
        </div>

        {/* Layer 2: Right Foreground - Photorealistic Built Reality (Clipped) */}
        <div
          className="absolute inset-0 h-full overflow-hidden"
          style={{ clipPath: `inset(0 0 0 ${sliderPosition}%)` }}
        >
          <img
            src={realityImage}
            alt="Completed Built Architecture"
            referrerPolicy="no-referrer"
            className="absolute inset-0 w-full h-full object-cover"
          />
          
          <div className="absolute top-4 right-4 z-10 bg-ink/80 border border-sage/40 px-3 py-1.5 backdrop-blur-xs font-sans text-[11px] text-brass-light">
            <span className="w-2 h-2 rounded-full bg-brass inline-block mr-1.5 animate-pulse"></span>
            <span>THE BUILT RESULT</span>
          </div>

          <div className="absolute bottom-4 right-4 z-10 bg-ink/80 border border-white/10 px-3 py-1 text-[10px] font-sans text-white/70 hidden sm:block">
            STATUS: CERTIFIED
          </div>
        </div>

        {/* Draggable Divider Line & Controller Handle */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-brass z-20 shadow-[0_0_12px_rgba(56,189,248,0.8)]"
          style={{ left: `${sliderPosition}%` }}
        >
          {/* Vertical measurement ticks along the divider line */}
          <div className="absolute top-1/4 -left-1 text-[8px] font-sans text-brass-light bg-ink px-1 py-0.5 border border-brass -translate-x-full">
            +3.450m
          </div>
          <div className="absolute bottom-1/4 -left-1 text-[8px] font-sans text-brass-light bg-ink px-1 py-0.5 border border-brass -translate-x-full">
            ±0.000 FFL
          </div>

          {/* Central Handle Button */}
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-ink border border-brass text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
            <MoveHorizontal className="w-5 h-5 text-brass-light" />
          </div>
        </div>
      </div>

      {/* Bottom Interactive Controls & Preset Snapping */}
      <div className="bg-ink-soft px-4 py-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs font-sans">
        <div className="flex items-center space-x-2 text-stone">
          <Compass className="w-4 h-4 text-brass-light" />
          <span>DRAG THE HANDLE, OR JUMP TO A VIEW:</span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setSliderPosition(0)}
            className={`px-2.5 py-1 text-[11px] font-sans border transition-colors ${
              sliderPosition === 0
                ? 'bg-brass text-black border-brass font-bold'
                : 'bg-ink text-white/70 border-white/10 hover:bg-ink-soft'
            }`}
          >
            100% BUILT
          </button>
          <button
            onClick={() => setSliderPosition(50)}
            className={`px-2.5 py-1 text-[11px] font-sans border transition-colors ${
              sliderPosition === 50
                ? 'bg-brass text-black border-brass font-bold'
                : 'bg-ink text-white/70 border-white/10 hover:bg-ink-soft'
            }`}
          >
            50% DRAWING / BUILT
          </button>
          <button
            onClick={() => setSliderPosition(100)}
            className={`px-2.5 py-1 text-[11px] font-sans border transition-colors ${
              sliderPosition === 100
                ? 'bg-brass text-black border-brass font-bold'
                : 'bg-ink text-white/70 border-white/10 hover:bg-ink-soft'
            }`}
          >
            100% DRAWING
          </button>
        </div>
      </div>
    </div>
  );
};
