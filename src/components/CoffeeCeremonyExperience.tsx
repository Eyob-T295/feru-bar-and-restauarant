import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Flame, Sparkles, Coffee, ChevronRight } from "lucide-react";
import ThreeDJebena from "./ThreeDJebena";

interface StoryStep {
  title: string;
  subtitle: string;
  concept: string;
  description: string;
}

export default function CoffeeCeremonyExperience() {
  const [activeStep, setActiveStep] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(true);
  const autoplayTimerRef = useRef<NodeJS.Timeout | null>(null);

  const steps: StoryStep[] = [
    {
      concept: "Phase I",
      title: "The Roasting (Buna Qela)",
      subtitle: "The Awakening of the Beans",
      description: "Masters roast green Yirgacheffe beans on a charcoal brazier. The warm, aromatic smoke carrying spicy and dark chocolatey tones is gently wafted around to welcome guests with traditional hospitality."
    },
    {
      concept: "Phase II",
      title: "The Black Clay (Jebena)",
      subtitle: "Slow Hearth Simmering",
      description: "The hand-crushed roasted beans are poured into the majestic black clay Jebena together with pure spring water. It boils slowly over red-hot embers, allowing the rich coffee oils to perfectly mature."
    },
    {
      concept: "Phase III",
      title: "The High Pour (Baraka)",
      subtitle: "Blessing of the Community",
      description: "Poured elegantly from a height into tiny finjal cups without breaking the continuous dark stream. The three traditional rounds represent Abol (First), Tona (Second), and Baraka (Blessing/Peace)."
    }
  ];

  // Auto-rotate steps every 6 seconds to keep the section alive, pausing on user interaction
  useEffect(() => {
    if (isAutoplay) {
      autoplayTimerRef.current = setInterval(() => {
        setActiveStep((prev) => (prev + 1) % steps.length);
      }, 6000);
    }
    return () => {
      if (autoplayTimerRef.current) clearInterval(autoplayTimerRef.current);
    };
  }, [isAutoplay, steps.length]);

  // Mouse tilt offsets for the 3D Jebena frame
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: x * 10, y: y * -10 });
  };
  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <section
      className="relative py-24 bg-[#FAF9F6] border-t border-[#E2DBD0] overflow-hidden flex items-center select-none"
      id="cultural-sanctum-section"
    >
      {/* Background cinematic lighting overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_50%,rgba(178,143,77,0.04)_0%,transparent_60%)] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* LEFT PANEL: Clean vertical interactive timeline accordions (lg:col-span-5) */}
          <motion.div
            initial={{ opacity: 0, y: 35, filter: "blur(4px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-6 space-y-8 order-2 lg:order-1 relative"
          >
            
            <div className="space-y-3">
              <div className="inline-flex items-center gap-1.5 bg-[#C14F26]/10 border border-[#C14F26]/20 px-3 py-1 rounded-full">
                <Sparkles className="w-3.5 h-3.5 text-[#C14F26]" />
                <span className="text-[10px] tracking-[0.25em] font-extrabold text-[#C14F26] uppercase font-sans">
                  IMMERSIVE CULTURAL SANCTUM
                </span>
              </div>
              <h2 className="text-4xl sm:text-5xl font-serif text-[#1A100B] tracking-tight font-extrabold leading-tight">
                The Daily Buna Ritual
              </h2>
              <p className="text-sm text-[#70563C] max-w-lg font-light leading-relaxed font-sans">
                At Feru, the traditional coffee ceremony is treated not as a theatrical display, but as a living cultural ritual. Conducted daily in our lounge, it invites you to pause and connect.
              </p>
            </div>

            {/* Interactive Timeline Accordion Blocks */}
            <div className="space-y-4">
              {steps.map((step, idx) => {
                const isActive = activeStep === idx;
                return (
                  <div
                    key={idx}
                    onClick={() => {
                      setActiveStep(idx);
                      setIsAutoplay(false); // Stop autoplay once user interacts
                    }}
                    className={`group relative cursor-pointer p-5 sm:p-6 rounded-2xl border transition-all duration-300 ${
                      isActive
                        ? "bg-white border-[#B28F4D]/40 shadow-[0_12px_24px_rgba(178,143,77,0.1)]"
                        : "bg-white/40 border-[#E2DBD0]/40 hover:bg-white hover:border-[#B28F4D]/25"
                    }`}
                  >
                    {/* Active side-border indicator accent */}
                    <div 
                      className={`absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl transition-all duration-300 ${
                        isActive ? "bg-[#C14F26]" : "bg-transparent group-hover:bg-[#B28F4D]/30"
                      }`}
                    />

                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-3">
                          <span className={`text-[10px] font-mono tracking-widest uppercase font-black px-2 py-0.5 rounded transition-colors duration-300 ${
                            isActive 
                              ? "bg-[#C14F26]/10 text-[#C14F26] border border-[#C14F26]/20" 
                              : "bg-neutral-100 text-[#70563C] border border-neutral-200"
                          }`}>
                            {step.concept}
                          </span>
                          <span className="text-[11px] text-[#70563C] uppercase tracking-wider font-bold">
                            {step.subtitle}
                          </span>
                        </div>
                        <h3 className="text-xl font-serif text-[#1A100B] font-extrabold pt-1">
                          {step.title}
                        </h3>
                      </div>
                      
                      <div className={`rounded-full p-1.5 border transition-all duration-300 ${
                        isActive 
                          ? "bg-[#C14F26] text-white border-transparent rotate-90" 
                          : "bg-neutral-50 text-[#70563C] border-neutral-200 group-hover:bg-[#B28F4D]/10 group-hover:text-[#B28F4D]"
                      }`}>
                        <ChevronRight className="w-4 h-4" />
                      </div>
                    </div>

                    {/* Expandable description block with layout/fade animation */}
                    <AnimatePresence initial={false}>
                      {isActive && (
                        <motion.div
                          initial={{ height: 0, opacity: 0, marginTop: 0 }}
                          animate={{ height: "auto", opacity: 1, marginTop: 12 }}
                          exit={{ height: 0, opacity: 0, marginTop: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <p className="text-sm text-[#523821] font-light leading-relaxed font-sans pt-1 border-t border-[#E2DBD0]/30">
                            {step.description}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

            {/* Cultural Citation Quote */}
            <div className="bg-[#EFECE6]/60 border border-[#E2DBD0]/60 p-4.5 rounded-xl flex items-start gap-4">
              <div className="bg-[#C14F26]/10 p-2 rounded-lg">
                <Flame className="w-5 h-5 text-[#C14F26] animate-pulse" />
              </div>
              <div className="space-y-1">
                <p className="text-xs text-[#523821] italic leading-relaxed font-medium font-serif">
                  "Buna dhuugi, buna tahi."
                </p>
                <p className="text-[11px] text-[#70563C] leading-normal font-sans font-light">
                  In Ethiopian villages, coffee is shared to settle disputes, foster eternal friendships, and invite deep peace to the dwelling.
                </p>
              </div>
            </div>

          </motion.div>

          {/* RIGHT PANEL: Immersive 3D Clay Jebena Model floating gracefully (lg:col-span-6) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.76, rotate: -15 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ 
              type: "spring",
              stiffness: 70,
              damping: 14,
              duration: 1.0
            }}
            style={{ transformOrigin: "center center" }}
            className="lg:col-span-6 flex justify-center items-center h-[480px] sm:h-[550px] relative order-1 lg:order-2"
          >
            
            {/* Pulsing warm hearth fire glow underneath the pot */}
            <div className="absolute w-[320px] h-[320px] bg-[radial-gradient(circle_at_center,rgba(193,79,38,0.06)_0%,transparent_60%)] rounded-full blur-3xl pointer-events-none z-0" />

            {/* Jebena Container pedestal with interactive mouse tracking */}
            <motion.div
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{
                transformStyle: "preserve-3d",
                transform: `perspective(1000px) rotateY(${tilt.x}deg) rotateX(${tilt.y}deg)`,
              }}
              transition={{ type: "spring", stiffness: 90, damping: 20 }}
              className="relative w-80 h-[420px] sm:w-[420px] sm:h-[480px] flex items-center justify-center cursor-grab active:cursor-grabbing z-10"
            >
              
              {/* Immersive Three.js 3D Clay Jebena Model */}
              <div className="w-full h-full relative z-10">
                <ThreeDJebena />
              </div>

              {/* Incense burner overlay representing Frankincense smoke */}
              <div className="absolute bottom-6 right-6 w-14 h-16 bg-[#1A100B] border border-[#B28F4D]/35 rounded-xl shadow-lg flex flex-col items-center justify-center p-1.5 z-20 hover:scale-105 transition-transform duration-300">
                <div className="w-2.5 h-2.5 bg-amber-500 rounded-full animate-ping absolute top-3.5" />
                <div className="w-2 h-2 bg-amber-600 rounded-full z-10" />
                <span className="text-[7px] font-sans font-extrabold text-[#E5CDAA] uppercase tracking-widest text-center mt-3 leading-none">
                  FRANK­INCENSE
                </span>
              </div>

            </motion.div>

          </motion.div>

        </div>

      </div>

    </section>
  );
}
