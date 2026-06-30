import React, { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import { Calendar, BookOpen, Sparkles, ChevronRight, Volume2, VolumeX, Play, Pause } from "lucide-react";
// @ts-ignore
import logoIntroVideo from "../assets/images/logointro.mp4";
// @ts-ignore
import feruLogoCustom from "../assets/images/ferulogo.png";
// @ts-ignore
import imgBar from "../assets/gallery/bar.jpg";
// @ts-ignore
import imgBar1 from "../assets/gallery/bar1.jpg";
// @ts-ignore
import imgInside from "../assets/gallery/inside.jpg";
// @ts-ignore
import imgInside1 from "../assets/gallery/inside1.jpg";
// @ts-ignore
import imgInside2 from "../assets/gallery/inside2.jpg";
// @ts-ignore
import imgOutside from "../assets/gallery/outside.jpg";
// @ts-ignore
import imgTable2 from "../assets/gallery/table2.jpg";
// @ts-ignore
import imgTables from "../assets/gallery/tables.jpg";

interface InteractiveHeroProps {
  setActiveTab: (tab: string) => void;
}

// Cycling bg images — pick the most atmospheric
const BG_IMAGES = [imgInside, imgBar, imgBar1, imgInside1];

export default function InteractiveHero({ setActiveTab }: InteractiveHeroProps) {
  const [bgIndex, setBgIndex] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [absMousePos, setAbsMousePos] = useState({ x: 0, y: 0 });
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);
  const [activeBtnOffset, setActiveBtnOffset] = useState({ x: 0, y: 0 });
  const [menuBtnOffset, setMenuBtnOffset] = useState({ x: 0, y: 0 });
  const [hoveredMosaic, setHoveredMosaic] = useState<number | null>(null);

  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [videoError, setVideoError] = useState(false);

  const heroRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { scrollY } = useScroll();
  const contentFade = useTransform(scrollY, [0, 380], [1, 0]);
  const bgParallax  = useTransform(scrollY, [0, 600], ["0%", "18%"]);

  // Auto-cycle background every 5s
  useEffect(() => {
    const t = setInterval(() => setBgIndex((i) => (i + 1) % BG_IMAGES.length), 5000);
    return () => clearInterval(t);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x: x * 10, y: y * -10 });
    setAbsMousePos({ x: e.clientX, y: e.clientY });
  };
  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
    setActiveBtnOffset({ x: 0, y: 0 });
    setMenuBtnOffset({ x: 0, y: 0 });
  };
  const handleBtnMove = (e: React.MouseEvent<HTMLButtonElement>, id: string) => {
    const r = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - (r.left + r.width / 2)) * 0.28;
    const y = (e.clientY - (r.top  + r.height / 2)) * 0.28;
    id === "reserve" ? setActiveBtnOffset({ x, y }) : setMenuBtnOffset({ x, y });
  };
  const handleBtnLeave = (id: string) =>
    id === "reserve" ? setActiveBtnOffset({ x: 0, y: 0 }) : setMenuBtnOffset({ x: 0, y: 0 });

  const handleToggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  const handleTogglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      if (isPlaying) { videoRef.current.pause(); setIsPlaying(false); }
      else { videoRef.current.play().then(() => setIsPlaying(true)).catch(console.warn); }
    }
  };

  // Gold dust
  const goldSparks = useMemo(() =>
    Array.from({ length: 18 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: Math.random() * 2.5 + 1,
      duration: Math.random() * 8 + 6,
      delay: Math.random() * 4,
      drift: Math.random() * 28 - 14,
    })), []);

  return (
    <section
      ref={heroRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-20 pb-10 select-none"
      id="hero-stage"
    >
      {/* ── BG: auto-cycling full-bleed photo ── */}
      <motion.div className="absolute inset-0 z-0" style={{ y: bgParallax }}>
        <AnimatePresence mode="sync">
          <motion.img
            key={bgIndex}
            src={BG_IMAGES[bgIndex]}
            alt="Feru ambiance"
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 1,  scale: 1.02 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.4, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
        </AnimatePresence>
        {/* Overlay stack */}
        <div className="absolute inset-0 bg-[#0A0604]/25" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#030101]/90 via-[#030101]/25 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0A0604]/70" />
      </motion.div>

      {/* ── Cursor spotlight ── */}
      <div
        className="absolute inset-0 z-10 pointer-events-none hidden sm:block"
        style={{
          background: `radial-gradient(380px circle at ${absMousePos.x}px ${absMousePos.y}px, rgba(224,98,47,0.07), rgba(239,178,56,0.03) 45%, transparent 100%)`,
        }}
      />

      {/* ── Ethiopian geometric mesh ── */}
      <div
        className="absolute inset-0 z-5 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0 L60 30 L30 60 L0 30 Z' fill='none' stroke='%23EFB238' stroke-width='1'/%3E%3C/svg%3E")`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* ── Gold dust sparks ── */}
      <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
        {goldSparks.map((p) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: "105%", x: `${p.x}%` }}
            animate={{
              opacity: [0, 0.6, 0.6, 0],
              y: ["100%", "0%"],
              x: [`${p.x}%`, `${p.x + p.drift}%`],
            }}
            transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "linear" }}
            className="absolute"
            style={{
              width: `${p.size}px`, height: `${p.size}px`,
              backgroundColor: p.id % 2 === 0 ? "#EFB238" : "#E0622F",
              borderRadius: "50%",
              boxShadow: "0 0 8px rgba(239,178,56,0.8)",
              left: 0, top: 0,
            }}
          />
        ))}
      </div>

      {/* ── Photo dot indicator (bottom left) ── */}
      <div className="absolute bottom-8 left-6 z-30 flex gap-1.5">
        {BG_IMAGES.map((_, i) => (
          <button
            key={i}
            onClick={() => setBgIndex(i)}
            className={`transition-all duration-300 rounded-full cursor-pointer ${
              i === bgIndex ? "w-5 h-1.5 bg-brand-orange" : "w-1.5 h-1.5 bg-white/30 hover:bg-white/60"
            }`}
          />
        ))}
      </div>

      {/* ── MAIN GRID ── */}
      <motion.div
        style={{ opacity: contentFade }}
        className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center py-4"
      >

        {/* ── LEFT: Copy + CTAs ── */}
        <div className="lg:col-span-5 space-y-6 text-center lg:text-left order-2 lg:order-1">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-brand-orange/15 border border-brand-orange/30 backdrop-blur-sm px-4 py-1.5 rounded-full"
          >
            <Sparkles className="w-3.5 h-3.5 text-brand-orange" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-orange">
              Alexandria, Virginia
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.85, ease: "easeOut" }}
            className="text-4xl sm:text-6xl lg:text-[4.5rem] font-serif text-white tracking-wide font-extrabold leading-[1.05]"
          >
            Experience
            <span className="block text-brand-orange drop-shadow-[0_0_30px_rgba(224,98,47,0.55)]">
              Ethiopia
            </span>
            Through Every Bite
          </motion.h1>

          {/* Sub */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-white/65 text-sm sm:text-base lg:text-[16px] font-light max-w-md mx-auto lg:mx-0 leading-relaxed"
          >
            Authentic cuisine, a full bar, traditional coffee ceremonies, and unforgettable hospitality — all under one roof.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-1"
          >
            <motion.button
              onMouseMove={(e) => handleBtnMove(e, "reserve")}
              onMouseLeave={() => handleBtnLeave("reserve")}
              animate={{ x: activeBtnOffset.x, y: activeBtnOffset.y }}
              onHoverStart={() => setHoveredButton("reserve")}
              onHoverEnd={() => setHoveredButton(null)}
              onClick={() => {
                const el = document.getElementById("reservation-anchor");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              style={{
                boxShadow: hoveredButton === "reserve"
                  ? "0 0 30px rgba(224,98,47,0.55)"
                  : "0 4px 20px rgba(224,98,47,0.3)",
              }}
              className="w-full sm:w-auto px-8 py-4 bg-brand-orange hover:bg-vibrant-red text-white text-[11.5px] font-bold uppercase tracking-[0.25em] rounded transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 hover:-translate-y-0.5 active:scale-95"
            >
              <Calendar className="w-4 h-4" />
              Reserve a Table
            </motion.button>

            <motion.button
              onMouseMove={(e) => handleBtnMove(e, "menu")}
              onMouseLeave={() => handleBtnLeave("menu")}
              animate={{ x: menuBtnOffset.x, y: menuBtnOffset.y }}
              onHoverStart={() => setHoveredButton("menu")}
              onHoverEnd={() => setHoveredButton(null)}
              onClick={() => { setActiveTab("menu"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
              className="w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white border border-white/25 hover:border-white/55 text-[11.5px] font-bold uppercase tracking-[0.25em] rounded transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 hover:-translate-y-0.5 active:scale-95"
            >
              <BookOpen className="w-4 h-4 text-brand-orange" />
              Explore Menu
            </motion.button>
          </motion.div>

          {/* Trust bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.15 }}
            className="flex items-center justify-center lg:justify-start gap-8 pt-2 border-t border-white/10 mt-2"
          >
            {[
              { value: "4.9★", label: "Google" },
              { value: "482+", label: "Reviews" },
              { value: "Full Bar", label: "& Lounge" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <span className="block text-sm font-serif font-black text-brand-orange">{s.value}</span>
                <span className="block text-[9px] uppercase tracking-widest text-white/40 font-bold mt-0.5">{s.label}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ── RIGHT: Expandable Interactive Accordion ── */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.9, ease: "easeOut" }}
          className="lg:col-span-7 order-1 lg:order-2 w-full h-[450px] sm:h-[520px] flex gap-2 sm:gap-3 items-stretch mt-8 lg:mt-0 overflow-hidden"
          onMouseLeave={() => setHoveredMosaic(null)}
        >
          {/* Panel 0: The Intro Video */}
          <motion.div 
            layout
            transition={{ type: "spring", stiffness: 200, damping: 25 }}
            className={`relative overflow-hidden rounded-2xl cursor-pointer group bg-black border border-white/10 ${
              (hoveredMosaic === null || hoveredMosaic === 0) ? "flex-[5]" : "flex-[1]"
            }`}
            onMouseEnter={() => setHoveredMosaic(0)}
          >
            <div className="absolute inset-0 z-0">
               {!videoError ? (
                  <video
                    ref={videoRef}
                    autoPlay
                    muted
                    loop
                    playsInline
                    onError={() => setVideoError(true)}
                    className="w-full h-full object-cover grayscale-[10%] group-hover:grayscale-0 transition-all duration-700"
                  >
                    <source src={logoIntroVideo} type="video/mp4" />
                  </video>
                ) : (
                  <img src={imgBar} alt="The Bar fallback" className="w-full h-full object-cover" />
                )}
            </div>
            {/* Gradient Overlay */}
            <div className={`absolute inset-0 transition-opacity duration-300 ${
              (hoveredMosaic === null || hoveredMosaic === 0) 
              ? "bg-gradient-to-t from-black/80 via-black/10 to-transparent" 
              : "bg-black/50"
            }`} />

            {/* Video Controls / Badges */}
            <AnimatePresence>
              {(hoveredMosaic === null || hoveredMosaic === 0) ? (
                <motion.div 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}
                  className="absolute inset-0 z-20 pointer-events-none"
                >
                  <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-4 py-3 bg-gradient-to-b from-black/80 to-transparent pointer-events-auto">
                    <div className="flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-brand-orange animate-pulse" />
                      <span className="text-[9px] uppercase tracking-[0.25em] text-white/90 font-black">Atmosphere</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={handleTogglePlay} className="w-7 h-7 rounded-full bg-white/15 hover:bg-white/30 backdrop-blur-sm flex items-center justify-center transition-all border border-white/20">
                        {isPlaying ? <Pause className="w-3 h-3 text-white" /> : <Play className="w-3 h-3 text-white ml-0.5" />}
                      </button>
                      <button onClick={handleToggleMute} className="w-7 h-7 rounded-full bg-white/15 hover:bg-white/30 backdrop-blur-sm flex items-center justify-center transition-all border border-white/20">
                        {isMuted ? <VolumeX className="w-3 h-3 text-white" /> : <Volume2 className="w-3 h-3 text-white" />}
                      </button>
                    </div>
                  </div>
                  <div className="absolute bottom-5 left-5 right-5">
                    <h3 className="text-white text-xl sm:text-3xl font-serif font-black drop-shadow-lg">Cinematic Vibe</h3>
                    <p className="text-white/80 text-xs sm:text-sm font-light mt-1 w-3/4">The energy, the music, the unmistakable feeling of a night in Addis Ababa.</p>
                  </div>
                </motion.div>
              ) : (
                 <motion.div 
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="absolute inset-0 flex items-center justify-center pointer-events-none origin-bottom -rotate-90 sm:rotate-0"
                 >
                    <span className="text-white text-[9px] sm:text-xs font-black uppercase tracking-widest whitespace-nowrap rotate-90 sm:-rotate-90">Vibe Intro</span>
                 </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Panel 1: Al Fresco Outside */}
          <motion.div 
            layout
            transition={{ type: "spring", stiffness: 200, damping: 25 }}
            className={`relative overflow-hidden rounded-2xl cursor-pointer group bg-black border border-white/10 ${
              hoveredMosaic === 1 ? "flex-[5]" : "flex-[1]"
            }`}
            onMouseEnter={() => setHoveredMosaic(1)}
          >
            <img src={imgOutside} alt="Outside" className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
            <div className={`absolute inset-0 transition-opacity duration-300 ${hoveredMosaic === 1 ? "bg-gradient-to-t from-black/80 via-transparent to-black/20" : "bg-black/60"}`} />
            
            <AnimatePresence>
              {hoveredMosaic === 1 ? (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 z-20 p-5 flex flex-col justify-end">
                   <h3 className="text-white text-xl sm:text-3xl font-serif font-black drop-shadow-lg">Al Fresco</h3>
                   <p className="text-white/80 text-xs sm:text-sm font-light mt-1 w-3/4">Elegant outdoor seating for breezy evenings and sunny weekend brunches.</p>
                </motion.div>
              ) : (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 flex items-center justify-center pointer-events-none origin-bottom -rotate-90 sm:rotate-0">
                   <span className="text-white text-[9px] sm:text-[11px] font-black uppercase tracking-[0.2em] whitespace-nowrap sm:-rotate-90 rotate-90">Patio</span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Panel 2: Inside Dining */}
          <motion.div 
            layout
            transition={{ type: "spring", stiffness: 200, damping: 25 }}
            className={`relative overflow-hidden rounded-2xl cursor-pointer group bg-black border border-white/10 ${
              hoveredMosaic === 2 ? "flex-[5]" : "flex-[1]"
            }`}
            onMouseEnter={() => setHoveredMosaic(2)}
          >
            <img src={imgInside1} alt="Inside Dining" className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
            <div className={`absolute inset-0 transition-opacity duration-300 ${hoveredMosaic === 2 ? "bg-gradient-to-t from-black/80 via-transparent to-black/20" : "bg-black/60"}`} />
            
            <AnimatePresence>
              {hoveredMosaic === 2 ? (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 z-20 p-5 flex flex-col justify-end">
                   <h3 className="text-white text-xl sm:text-3xl font-serif font-black drop-shadow-lg">Intimate Interior</h3>
                   <p className="text-white/80 text-xs sm:text-sm font-light mt-1 w-3/4">Warm lighting and rich wooden accents set the stage for romance and celebration.</p>
                </motion.div>
              ) : (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 flex items-center justify-center pointer-events-none origin-bottom -rotate-90 sm:rotate-0">
                   <span className="text-white text-[9px] sm:text-[11px] font-black uppercase tracking-[0.2em] whitespace-nowrap sm:-rotate-90 rotate-90">Dining Room</span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Panel 3: Private Tables */}
          <motion.div 
            layout
            transition={{ type: "spring", stiffness: 200, damping: 25 }}
            className={`relative overflow-hidden rounded-2xl cursor-pointer group bg-black border border-white/10 ${
              hoveredMosaic === 3 ? "flex-[5]" : "flex-[1]"
            }`}
            onMouseEnter={() => setHoveredMosaic(3)}
          >
            <img src={imgTables} alt="Private Tables" className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
            <div className={`absolute inset-0 transition-opacity duration-300 ${hoveredMosaic === 3 ? "bg-gradient-to-t from-black/80 via-transparent to-black/20" : "bg-black/60"}`} />
            
            <AnimatePresence>
              {hoveredMosaic === 3 ? (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 z-20 p-5 flex flex-col justify-between">
                   <div className="flex justify-end">
                      <button onClick={() => { setActiveTab("about"); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="flex items-center gap-1 bg-brand-orange/90 hover:bg-brand-orange text-white text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full transition-all cursor-pointer border border-white/10 shadow-lg">Our Story <ChevronRight className="w-3 h-3" /></button>
                   </div>
                   <div>
                     <h3 className="text-white text-xl sm:text-3xl font-serif font-black drop-shadow-lg">Communal Dining</h3>
                     <p className="text-white/80 text-xs sm:text-sm font-light mt-1 w-3/4">Gather around large traditional platters representing unity, family, and sharing.</p>
                   </div>
                </motion.div>
              ) : (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 flex items-center justify-center pointer-events-none origin-bottom -rotate-90 sm:rotate-0">
                   <span className="text-white text-[9px] sm:text-[11px] font-black uppercase tracking-[0.2em] whitespace-nowrap sm:-rotate-90 rotate-90">Events &amp; Tables</span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>

      </motion.div>

      {/* ── Scroll indicator ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 cursor-pointer"
        onClick={() => {
          const el = document.getElementById("reservation-anchor");
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }}
      >
        <span className="text-[10px] tracking-[0.3em] text-white/40 uppercase font-semibold">Scroll</span>
        <div className="w-6 h-10 border border-white/15 rounded-full flex justify-center items-start p-1.5 bg-white/5 backdrop-blur-sm">
          <motion.div
            animate={{ y: [0, 16, 0] }}
            transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
            className="w-2.5 h-3.5 bg-brand-orange rounded-full relative"
          >
            <div className="absolute inset-y-0 left-1/2 w-[0.5px] bg-[#392211] -translate-x-1/2 rotate-12" />
          </motion.div>
        </div>
      </motion.div>

    </section>
  );
}
