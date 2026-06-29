import React, { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import { 
  Sparkles, 
  Calendar, 
  BookOpen, 
  Volume2, 
  VolumeX, 
  Play, 
  Pause, 
  ChevronDown 
} from "lucide-react";
// @ts-ignore
import feruLogoCustom from "../assets/images/ferulogo.png";
// @ts-ignore
import logoIntroVideo from "../assets/images/logointro.mp4";

interface InteractiveHeroProps {
  setActiveTab: (tab: string) => void;
}

export default function InteractiveHero({ setActiveTab }: InteractiveHeroProps) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [absMousePos, setAbsMousePos] = useState({ x: 0, y: 0 });
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [videoError, setVideoError] = useState(false);
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);
  
  // Magnetic button states
  const [activeBtnOffset, setActiveBtnOffset] = useState({ x: 0, y: 0 });
  const [menuBtnOffset, setMenuBtnOffset] = useState({ x: 0, y: 0 });

  const heroRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Track standard scroll progress for the cinematic scale-down & fade
  const { scrollY } = useScroll();
  const videoScale = useTransform(scrollY, [0, 500], [1, 0.75]);
  const videoTranslateY = useTransform(scrollY, [0, 500], [0, 100]);
  const steamOpacity = useTransform(scrollY, [0, 300, 500], [0, 0.9, 0]);
  const steamScale = useTransform(scrollY, [0, 500], [0.8, 1.8]);
  const contentFade = useTransform(scrollY, [0, 300], [1, 0]);

  // Handle subtle 3D tilt calculations
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x: x * 15, y: y * -15 });
    setAbsMousePos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
    setActiveBtnOffset({ x: 0, y: 0 });
    setMenuBtnOffset({ x: 0, y: 0 });
  };

  // Magnetic button physics
  const handleButtonMouseMove = (e: React.MouseEvent<HTMLButtonElement>, buttonId: string) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    // Draw cursor in with a 35% bounding force
    const pullX = x * 0.35;
    const pullY = y * 0.35;
    
    if (buttonId === "reserve") {
      setActiveBtnOffset({ x: pullX, y: pullY });
    } else {
      setMenuBtnOffset({ x: pullX, y: pullY });
    }
  };

  const handleButtonMouseLeave = (buttonId: string) => {
    if (buttonId === "reserve") {
      setActiveBtnOffset({ x: 0, y: 0 });
    } else {
      setMenuBtnOffset({ x: 0, y: 0 });
    }
  };

  // Generate deterministic floating objects reflecting Ethiopian culture (coffee, spices, sacred geometry)
  const floatingObjects = useMemo(() => {
    return [
      // Roasted Coffee Beans
      { id: "coffee-1", type: "coffee", size: 28, x: 12, y: 22, rotation: 35, speed: 12, delay: 0 },
      { id: "coffee-2", type: "coffee", size: 22, x: 82, y: 15, rotation: -45, speed: 14, delay: 1.5 },
      { id: "coffee-3", type: "coffee", size: 32, x: 74, y: 72, rotation: 115, speed: 18, delay: 0.5 },
      { id: "coffee-4", type: "coffee", size: 18, x: 42, y: 84, rotation: 154, speed: 13, delay: 2 },
      
      // Star Anise / Cardamom Spices
      { id: "spice-1", type: "staranise", size: 36, x: 86, y: 48, rotation: 12, speed: 16, delay: 0.8 },
      { id: "spice-2", type: "cardamom", size: 20, x: 55, y: 20, rotation: 85, speed: 11, delay: 2.2 },
      
      // Ethiopian Sacred Geometric Grid Elements
      { id: "geo-1", type: "cross_pattern", size: 48, x: 5, y: 65, rotation: 0, speed: 22, delay: 0 },
      { id: "geo-2", type: "cross_pattern", size: 55, x: 88, y: 80, rotation: 45, speed: 25, delay: 1 }
    ];
  }, []);

  // Ambient gold dust particles
  const goldSparks = useMemo(() => {
    return Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 8 + 6,
      delay: Math.random() * 4,
      drift: Math.random() * 30 - 15,
    }));
  }, []);

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
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch((err) => console.warn(err));
      }
    }
  };

  return (
    <section
      ref={heroRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative bg-[#050505] min-h-screen flex flex-col justify-center overflow-hidden pt-20 pb-16 select-none border-b border-[#392211]/30"
      id="hero-stage"
    >
      
      {/* 1. Dynamic Cursor Spotlight Glow */}
      <div 
        className="absolute pointer-events-none inset-0 z-10 transition-opacity duration-500 bg-radial-spotlight opacity-0 sm:opacity-100"
        style={{
          background: `radial-gradient(450px circle at ${absMousePos.x}px ${absMousePos.y}px, rgba(224, 98, 47, 0.04), rgba(239, 178, 56, 0.02) 40%, transparent 100%)`,
        }}
      />

      {/* 2. Volumetric Textured Atmosphere & Ethiopian Mesh Pattern */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Deep Warm Radiance Clouds */}
        <div className="absolute top-[10%] left-[55%] -translate-x-1/2 w-[700px] h-[700px] bg-gradient-radial from-[#392211]/35 to-transparent blur-[120px]" />
        <div className="absolute bottom-[5%] right-[5%] w-[500px] h-[500px] bg-gradient-radial from-[#E0622F]/10 to-transparent blur-[100px]" />
        <div className="absolute top-[40%] left-[10%] w-[450px] h-[450px] bg-gradient-radial from-[#EFB238]/6 to-transparent blur-[110px]" />

        {/* Traditional fine-mesh cultural geometric grid overlay */}
        <div 
          className="absolute inset-0 opacity-[0.035] mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0 L60 30 L30 60 L0 30 Z' fill='none' stroke='%23EFB238' stroke-width='1'/%3E%3Cpath d='M30 15 L45 30 L30 45 L15 30 Z' fill='none' stroke='%23E0622F' stroke-width='0.5'/%3E%3C/svg%3E")`,
            backgroundSize: "60px 60px"
          }}
        />
      </div>

      {/* 3. Gold Dust Sparks Environment */}
      <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
        {goldSparks.map((p) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: "105%", x: `${p.x}%` }}
            animate={{
              opacity: [0, 0.7, 0.7, 0],
              y: ["100%", "0%"],
              x: [`${p.x}%`, `${p.x + p.drift}%`],
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute"
            style={{
              width: `${p.size}px`,
              height: `${p.size}px`,
              backgroundColor: p.id % 2 === 0 ? "#EFB238" : "#E0622F", // Gold & Brand Orange
              borderRadius: "50%",
              boxShadow: "0 0 8px rgba(239, 178, 56, 0.8)",
              left: 0,
              top: 0,
            }}
          />
        ))}
      </div>

      {/* 4. Elegant Interactive 3D Floating Assets (Coffee beans, cardamom stardust) */}
      <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
        {floatingObjects.map((obj) => (
          <motion.div
            key={obj.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: [0, 0.6, 0.6, 0],
              scale: [0.95, 1.05, 0.95],
              y: ["10%", "-10%"],
              rotate: [obj.rotation, obj.rotation + 360],
            }}
            transition={{
              y: {
                repeat: Infinity,
                repeatType: "reverse",
                duration: obj.speed,
                ease: "easeInOut",
              },
              rotate: {
                repeat: Infinity,
                duration: obj.speed * 2.5,
                ease: "linear",
              },
              opacity: {
                duration: 1.5,
                delay: obj.delay
              }
            }}
            className="absolute hidden sm:block"
            style={{
              left: `${obj.x}%`,
              top: `${obj.y}%`,
              width: `${obj.size}px`,
              height: `${obj.size}px`,
              transformStyle: "preserve-3d",
              // Respond slightly to global mouse tilt
              transform: `translate3d(${mousePos.x * 0.4}px, ${mousePos.y * 0.4}px, 0px)`,
            }}
          >
            {/* Roasted Coffee Bean Vector SVG */}
            {obj.type === "coffee" && (
              <svg viewBox="0 0 100 100" className="w-full h-full fill-[#392211] stroke-[#EFB238]/15 filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.8)]">
                {/* Outer Bean Shell */}
                <ellipse cx="50" cy="50" rx="32" ry="46" transform="rotate(-15 50 50)" />
                {/* Sylvan Center Cleavage */}
                <path d="M 40,4 C 44,20 34,42 50,50 C 66,58 56,80 60,96" stroke="#F2CF88" strokeWidth="5" fill="none" strokeLinecap="round" opacity="0.85" />
                {/* Secondary Roast Crevice */}
                <path d="M 48,15 Q 40,45 52,85" stroke="#050505" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.6" />
              </svg>
            )}

            {/* Traditional Cross Pattern Gear */}
            {obj.type === "cross_pattern" && (
              <svg viewBox="0 0 100 100" className="w-full h-full text-[#EFB238]/15 fill-none stroke-current stroke-[2] opacity-75">
                <circle cx="50" cy="50" r="40" />
                <path d="M 50,10 L 50,90 M 10,50 L 90,50" />
                <polygon points="50,15 55,30 70,30 58,40 62,55 50,45 38,55 42,40 30,30 45,30" className="fill-[#EFB238]/5" />
              </svg>
            )}

            {/* Organic star anise spice */}
            {obj.type === "staranise" && (
              <svg viewBox="0 0 120 120" className="w-full h-full fill-[#E0622F]/20 stroke-[#EFB238]/10">
                <g transform="translate(60,60)">
                  {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
                    <path
                      key={angle}
                      d="M 0,0 C 8,-12 12,-35 0,-45 C -12,-35 -8,-12 0,0"
                      transform={`rotate(${angle})`}
                      className="fill-[#392211] stroke-[#F2CF88]/30"
                    />
                  ))}
                  <circle cx="0" cy="0" r="8" className="fill-[#EFB238]/70" />
                </g>
              </svg>
            )}

            {/* Spiced Cardamom Shell */}
            {obj.type === "cardamom" && (
              <svg viewBox="0 0 80 80" className="w-full h-full fill-[#392211] stroke-[#EFB238]/30">
                <path d="M 40,8 C 58,22 58,58 40,72 C 22,58 22,22 40,8 Z" />
                <path d="M 40,8 Q 30,40 40,72 M 40,8 Q 50,40 40,72" fill="none" stroke="#F2CF88/40" />
              </svg>
            )}
          </motion.div>
        ))}
      </div>

      {/* 5. Volumetric Cinematic Expansion Steam/Smoke Cloud (Scales/fades dynamically on scroll) */}
      <motion.div
        style={{
          scale: steamScale,
          opacity: steamOpacity,
        }}
        className="absolute inset-0 pointer-events-none z-30 flex items-center justify-center mix-blend-screen"
      >
        <div className="w-[120%] h-[120%] bg-gradient-radial from-[#392211]/30 via-transparent to-transparent blur-[80px]" />
      </motion.div>

      {/* 6. Main Dual Column Grid Container (Fades carefully on scroll to begin Storyteller section) */}
      <motion.div 
        style={{ opacity: contentFade }}
        className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center py-4"
      >
        
        {/* Left Copy Panel with Luxury Typography & Animated Reveal */}
        <div className="lg:col-span-5 space-y-7 text-center lg:text-left relative z-25 order-2 lg:order-1 mt-6 lg:mt-0">

          <div className="space-y-4">
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="block text-[#E0622F] text-xs font-bold uppercase tracking-[0.45em] font-sans"
            >
              FERU BAR & RESTAURANT
            </motion.span>

            {/* Split Text Animated Entrance */}
            <motion.h1
              initial={{ opacity: 0, y: 35 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.85, ease: "easeOut" }}
              className="text-4xl sm:text-6xl lg:text-7xl font-serif text-white tracking-wide font-extrabold leading-[1.08] drop-shadow-[0_4px_10px_rgba(0,0,0,0.5)]"
            >
              Experience <span className="block text-gradient bg-gradient-to-r from-[#EFB238] via-[#F2CF88] to-[#E0622F] bg-clip-text text-transparent">Ethiopia</span> Through Every Bite
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="text-amber-100/80 text-sm sm:text-base lg:text-lg font-light max-w-md mx-auto lg:mx-0 leading-relaxed font-sans"
            >
              Authentic cuisine, handcrafted cocktails, traditional coffee ceremonies, and unforgettable hospitality.
            </motion.p>
          </div>

          {/* Symmetrical Luxury Interactive CTA Buttons (Magnetic effect) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4"
          >
            {/* Primary Button: Reserve Table */}
            <motion.button
              onMouseMove={(e) => handleButtonMouseMove(e, "reserve")}
              onMouseLeave={() => handleButtonMouseLeave("reserve")}
              animate={{ x: activeBtnOffset.x, y: activeBtnOffset.y }}
              onHoverStart={() => setHoveredButton("reserve")}
              onHoverEnd={() => setHoveredButton(null)}
              onClick={() => {
                const el = document.getElementById("reservation-anchor");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              style={{
                boxShadow: hoveredButton === "reserve" 
                  ? "0px 0px 25px rgba(224, 98, 47, 0.4)" 
                  : "0px 4px 15px rgba(0,0,0,0.4)"
              }}
              className="w-full sm:w-auto px-9 py-4 bg-[#E0622F] hover:bg-[#c94f21] text-white text-[11.5px] font-bold uppercase tracking-[0.25em] rounded transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 border border-[#E0622F]/40 hover:-translate-y-0.5 active:scale-95"
            >
              <Calendar className="w-4 h-4 text-[#F2CF88]" />
              Reserve a Table
            </motion.button>
            
            {/* Secondary Button: Explore Menu */}
            <motion.button
              onMouseMove={(e) => handleButtonMouseMove(e, "menu")}
              onMouseLeave={() => handleButtonMouseLeave("menu")}
              animate={{ x: menuBtnOffset.x, y: menuBtnOffset.y }}
              onHoverStart={() => setHoveredButton("menu")}
              onHoverEnd={() => setHoveredButton(null)}
              onClick={() => {
                setActiveTab("menu");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              style={{
                boxShadow: hoveredButton === "menu" 
                  ? "0px 0px 20px rgba(239, 178, 56, 0.2)" 
                  : "0px 4px 10px rgba(0,0,0,0.5)"
              }}
              className="w-full sm:w-auto px-9 py-4 bg-[#050505] text-[#F2CF88] hover:text-white border border-[#EFB238]/30 hover:border-[#EFB238] text-[11.5px] font-bold uppercase tracking-[0.25em] rounded transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 hover:-translate-y-0.5 active:scale-95"
            >
              <BookOpen className="w-4 h-4 text-[#EFB238]" />
              Explore Menu
            </motion.button>
          </motion.div>
        </div>

        {/* Right Column: Frameless Cinematically Integrated Logo Video */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center relative min-h-[400px] sm:min-h-[480px] order-1 lg:order-2">
          
          {/* Continuous floating perspective with mouse tracking */}
          <motion.div
            style={{
              transformStyle: "preserve-3d",
              transform: `perspective(1000px) rotateY(${mousePos.x}deg) rotateX(${mousePos.y}deg)`,
              scale: videoScale,
              y: videoTranslateY,
            }}
            animate={{
              y: [0, -12, 0],
            }}
            transition={{
              y: {
                repeat: Infinity,
                duration: 6,
                ease: "easeInOut"
              }
            }}
            className="relative w-80 h-80 sm:w-[500px] sm:h-[500px] flex flex-col items-center justify-center group"
          >
            
            {/* Ambient luxury halo backing the video */}
            <div className="absolute inset-0 rounded-full bg-gradient-radial from-[#EFB238]/12 via-[#E0622F]/4 to-transparent blur-[60px] pointer-events-none z-0" />

            {/* Frameless Video Container with beautiful soft-edge mask blending into the deep dark space */}
            <div 
              className="relative w-full h-full overflow-hidden z-10 flex items-center justify-center"
              style={{
                maskImage: "radial-gradient(circle, rgba(0,0,0,1) 50%, rgba(0,0,0,0.85) 75%, rgba(0,0,0,0) 100%)",
                WebkitMaskImage: "radial-gradient(circle, rgba(0,0,0,1) 50%, rgba(0,0,0,0.85) 75%, rgba(0,0,0,0) 100%)"
              }}
            >
              
              {!videoError ? (
                <video
                  ref={videoRef}
                  autoPlay
                  muted
                  loop
                  playsInline
                  onError={() => setVideoError(true)}
                  className="w-full h-full object-cover transition-opacity duration-1000 brightness-115 contrast-102"
                >
                  <source src={logoIntroVideo} type="video/mp4" />
                  Your system doesn't support local video streaming.
                </video>
              ) : (
                <img
                  src={feruLogoCustom}
                  alt="Feru Custom Logo"
                  className="w-80 h-80 object-contain filter drop-shadow-[0_4px_25px_rgba(239,178,56,0.25)]"
                />
              )}

              {/* Volumetric ambient steam emitter inside video borders */}
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-48 h-12 bg-gradient-to-t from-white/10 to-transparent blur-md pointer-events-none mix-blend-screen opacity-55" />
            </div>

          </motion.div>
        </div>

      </motion.div>

      {/* 7. Micro-interactions: Interactive Scroll Indicator at bottom */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 cursor-pointer"
        onClick={() => {
          const el = document.getElementById("reservation-anchor");
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }}
      >
        <span className="text-[10px] tracking-[0.3em] text-[#F2CF88]/70 uppercase font-black font-sans">
          Scroll to explore
        </span>
        <div className="w-6 h-10 border border-[#EFB238]/30 rounded-full flex justify-center items-start p-1.5 bg-[#050505]/60 backdrop-blur-sm">
          {/* Animated Coffee Bean Indicator */}
          <motion.div
            animate={{
              y: [0, 16, 0]
            }}
            transition={{
              repeat: Infinity,
              duration: 2.2,
              ease: "easeInOut"
            }}
            className="w-2.5 h-3.5 bg-[#EFB238] rounded-full relative"
          >
            {/* Coffee split line */}
            <div className="absolute inset-y-0 left-1/2 w-[0.5px] bg-[#392211] -translate-x-1/2 transform rotate-12" />
          </motion.div>
        </div>
      </motion.div>

    </section>
  );
}
