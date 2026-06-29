import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MapPin, Compass, Navigation, Eye, Map, Info } from "lucide-react";

export default function StaticMapVisual() {
  const [viewMode, setViewMode] = useState<"artisanal" | "satellite">("artisanal");
  const [hoveredLandmark, setHoveredLandmark] = useState<string | null>(null);

  // Local Alexandria landmarks for high-craft storytelling
  const landmarks = [
    {
      id: "feru",
      name: "Feru Bar & Restaurant",
      desc: "814 King St. Our historic Old Town sanctuary.",
      x: 52,
      y: 45,
      type: "restaurant",
    },
    {
      id: "metro",
      name: "King St - Old Town Metro",
      desc: "4 blocks west. Blue & Yellow lines access.",
      x: 10,
      y: 45,
      type: "transit",
    },
    {
      id: "parking",
      name: "Alfred Street Secure Parking",
      desc: "Adjacent secure multi-level garage.",
      x: 52,
      y: 85,
      type: "parking",
    },
    {
      id: "waterfront",
      name: "Potomac River Waterfront",
      desc: "8 blocks east. Scenic riverside paths & piers.",
      x: 90,
      y: 45,
      type: "scenic",
    }
  ];

  return (
    <div className="bg-white border border-gold-200 rounded-lg overflow-hidden shadow-sm flex flex-col">
      {/* Map Header with premium toggles */}
      <div className="p-4 border-b border-gold-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 bg-gold-50/80">
        <div>
          <span className="text-[10px] uppercase text-brand-orange tracking-widest font-bold block mb-0.5">
            Old Town Alexandria Cartography
          </span>
          <span className="text-[10px] text-gold-700 font-serif italic">
            814 King Street, Alexandria, VA 22314
          </span>
        </div>

        {/* View Mode Pill Toggle */}
        <div className="flex bg-neutral-200/50 p-1 rounded-full border border-gold-200/45 self-end sm:self-auto">
          <button
            onClick={() => setViewMode("artisanal")}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
              viewMode === "artisanal"
                ? "bg-brand-orange text-white shadow-sm"
                : "text-gold-900 hover:text-brand-orange"
            }`}
          >
            <Compass className="w-3 h-3" />
            Artisanal Map
          </button>
          <button
            onClick={() => setViewMode("satellite")}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
              viewMode === "satellite"
                ? "bg-brand-orange text-white shadow-sm"
                : "text-gold-900 hover:text-brand-orange"
            }`}
          >
            <Map className="w-3 h-3" />
            Live Satellite
          </button>
        </div>
      </div>

      {/* Main Map Canvas Area */}
      <div className="relative h-72 w-full bg-[#FAF9F6] overflow-hidden select-none">
        <AnimatePresence mode="wait">
          {viewMode === "artisanal" ? (
            <motion.div
              key="artisanal-map"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 w-full h-full"
            >
              {/* Elegant grid background representing traditional paper */}
              <div 
                className="absolute inset-0 opacity-[0.035]"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M 30 0 L 0 0 0 30' fill='none' stroke='%23392211' stroke-width='1'/%3E%3C/svg%3E")`,
                  backgroundSize: "30px 30px"
                }}
              />

              {/* Alexandria Old Town Stylized Vector Grid */}
              <svg viewBox="0 0 600 300" className="w-full h-full">
                {/* Defs for gradients & shadows */}
                <defs>
                  <radialGradient id="feruGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#E0622F" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#E0622F" stopOpacity="0" />
                  </radialGradient>
                  <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
                    <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#392211" floodOpacity="0.12" />
                  </filter>
                </defs>

                {/* HISTORIC STREET LAYOUT */}
                
                {/* Horizontal: King Street (The core thoroughfare in gold) */}
                <line x1="0" y1="135" x2="600" y2="135" stroke="#EFB238" strokeWidth="22" strokeLinecap="square" opacity="0.15" />
                <line x1="0" y1="135" x2="600" y2="135" stroke="#EFB238" strokeWidth="6" strokeLinecap="square" />
                <text x="75" y="118" fill="#70563C" className="text-[9px] font-bold tracking-[0.25em] uppercase font-sans">King Street</text>

                {/* Horizontal: Cameron Street (Parallel block North) */}
                <line x1="0" y1="50" x2="600" y2="50" stroke="#E2DBD0" strokeWidth="4" />
                <text x="35" y="42" fill="#9C8A78" className="text-[8px] tracking-widest uppercase font-sans">Cameron St</text>

                {/* Horizontal: Duke Street (Parallel block South) */}
                <line x1="0" y1="230" x2="600" y2="230" stroke="#E2DBD0" strokeWidth="4" />
                <text x="35" y="222" fill="#9C8A78" className="text-[8px] tracking-widest uppercase font-sans">Duke St</text>

                {/* Vertical: S Patrick Street (Route 1) */}
                <line x1="180" y1="0" x2="180" y2="300" stroke="#E2DBD0" strokeWidth="4" />
                <text x="186" y="25" fill="#9C8A78" className="text-[8px] tracking-widest uppercase font-sans transform rotate-90 origin-left" style={{ transform: "rotate(90deg) translate(15px, -8px)" }}>Patrick St</text>

                {/* Vertical: S Alfred Street (Location edge) */}
                <line x1="310" y1="0" x2="310" y2="300" stroke="#E2DBD0" strokeWidth="5" />
                <text x="316" y="25" fill="#70563C" className="text-[8px] tracking-wider uppercase font-bold font-sans">Alfred St</text>

                {/* Vertical: S Columbus Street */}
                <line x1="440" y1="0" x2="440" y2="300" stroke="#E2DBD0" strokeWidth="4" />
                <text x="446" y="25" fill="#9C8A78" className="text-[8px] tracking-widest uppercase font-sans">Columbus St</text>

                {/* Compass Rose at top right corner */}
                <g transform="translate(540, 60)" className="opacity-75">
                  <circle cx="0" cy="0" r="24" fill="none" stroke="#EFB238" strokeWidth="1" strokeDasharray="2,2" />
                  <path d="M 0,-28 L 4,-8 L 24,-4 L 4,0 L 0,24 L -4,0 L -24,-4 L -4,-8 Z" fill="#EFB238" stroke="#392211" strokeWidth="0.75" />
                  <polygon points="0,-28 0,-8 4,-8" fill="#392211" />
                  <polygon points="0,24 0,0 -4,0" fill="#392211" />
                  <text x="-4" y="-32" fill="#392211" className="text-[8px] font-bold">N</text>
                </g>

                {/* Potomac River styling at right edge */}
                <path d="M 570,0 Q 560,75 580,150 T 570,300 L 600,300 L 600,0 Z" fill="#E0622F" opacity="0.04" />
                <path d="M 570,0 Q 560,75 580,150 T 570,300" fill="none" stroke="#EFB238" strokeWidth="1" opacity="0.25" />
                <text x="585" y="165" fill="#E0622F" className="text-[8px] font-black uppercase tracking-[0.3em] font-sans" transform="rotate(90, 585, 165)">Potomac</text>

                {/* Transit Rail / Line towards metro station on left side */}
                <line x1="30" y1="0" x2="30" y2="300" stroke="#EFB238" strokeWidth="3" strokeDasharray="6,4" opacity="0.3" />
              </svg>

              {/* Interactive Markers layered perfectly on top of SVG */}
              {landmarks.map((mark) => {
                const isFeru = mark.id === "feru";
                const isHovered = hoveredLandmark === mark.id;

                return (
                  <div
                    key={mark.id}
                    className="absolute"
                    style={{
                      left: `${mark.x}%`,
                      top: `${mark.y}%`,
                      transform: "translate(-50%, -50%)",
                    }}
                    onMouseEnter={() => setHoveredLandmark(mark.id)}
                    onMouseLeave={() => setHoveredLandmark(null)}
                  >
                    {/* Glowing highlight anchor */}
                    <div className="relative flex items-center justify-center">
                      <AnimatePresence>
                        {(isFeru || isHovered) && (
                          <motion.div
                            initial={{ scale: 0.6, opacity: 0 }}
                            animate={{ scale: 1.4, opacity: 1 }}
                            exit={{ scale: 0.6, opacity: 0 }}
                            className={`absolute w-12 h-12 rounded-full pointer-events-none ${
                              isFeru ? "bg-[#E0622F]/20" : "bg-[#EFB238]/20"
                            }`}
                            style={{
                              animation: "ping 2s cubic-bezier(0, 0, 0.2, 1) infinite",
                            }}
                          />
                        )}
                      </AnimatePresence>

                      {/* Actual Marker Button */}
                      <button
                        className={`p-2.5 rounded-full shadow-md border transition-transform duration-300 hover:scale-110 cursor-pointer ${
                          isFeru
                            ? "bg-[#E0622F] text-white border-[#EFB238]/40"
                            : "bg-white text-[#392211] border-gold-200 hover:bg-gold-50"
                        }`}
                      >
                        {isFeru ? (
                          <MapPin className="w-5 h-5 animate-bounce" />
                        ) : (
                          <div className="w-2.5 h-2.5 rounded-full bg-[#EFB238]" />
                        )}
                      </button>

                      {/* Tooltip Overlay */}
                      <AnimatePresence>
                        {isHovered && (
                          <motion.div
                            initial={{ opacity: 0, y: 12, scale: 0.95 }}
                            animate={{ opacity: 1, y: -45, scale: 1 }}
                            exit={{ opacity: 0, y: 12, scale: 0.95 }}
                            className="absolute z-40 bg-[#392211] text-white text-[10px] p-2.5 rounded shadow-lg border border-[#EFB238]/30 w-48 text-center pointer-events-none"
                          >
                            <span className="block font-serif font-bold text-[#F2CF88] mb-0.5">
                              {mark.name}
                            </span>
                            <span className="block font-sans text-stone-200 text-[9px] font-light leading-normal">
                              {mark.desc}
                            </span>
                            {/* Little carrot caret */}
                            <div className="w-2 h-2 bg-[#392211] rotate-45 border-r border-b border-[#EFB238]/30 absolute bottom-[-4px] left-1/2 -translate-x-1/2" />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                );
              })}
            </motion.div>
          ) : (
            /* Live Satellite Google Map Iframe Option */
            <motion.div
              key="satellite-map"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 w-full h-full"
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1s0x89b7b13df1dfffbf%3A0xe544ef24cb51b7cb!2s814%20King%20St%2C%20Alexandria%2C%20VA%2022314!5e0!3m2!1sen!2sus!4v1714392410292!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Map location of Feru Bar & Restaurant"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Guide/Parking notes footer matching the design system */}
      <div className="p-4 text-[10.5px] text-[#523821] font-light leading-relaxed bg-gold-50/55 border-t border-gold-200">
        <div className="flex gap-2 items-start">
          <Info className="w-4 h-4 text-brand-orange shrink-0 mt-0.5" />
          <p>
            <strong>Arriving at Feru:</strong> We are inside a majestic historic brick facade on King Street between Alfred and Columbus. Metered parking surrounds the area, and the <strong>Alfred Street Garage</strong> is immediately behind us for ultimate secure multi-level parking.
          </p>
        </div>
      </div>
    </div>
  );
}
