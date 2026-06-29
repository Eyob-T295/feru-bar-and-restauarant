import React from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Sparkles, Activity, AlertCircle, Award } from "lucide-react";
import { IMAGES } from "../data";

interface EmergingCardProps {
  title: string;
  tagline: string;
  bgImage: string;
  foodLayerImage: string;
  fgDetails?: { src: string; alt: string; initialX: number; initialY: number; speed: number }[];
  description: string;
  index: number;
  key?: React.Key;
}

function CompanionEmergingCard(props: EmergingCardProps) {
  const { title, tagline, bgImage, foodLayerImage, fgDetails, description, index } = props;
  const cardRef = React.useRef<HTMLDivElement | null>(null);

  // Scroll bindings for the individual card position
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });

  // Calculate distinct scroll translations for background vs foreground
  const bgTranslateY = useTransform(scrollYProgress, [0, 1], [-25, 25]);
  const plateTranslateY = useTransform(scrollYProgress, [0, 1], [-55, -15]); // translates faster!
  const plateScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1.12, 1.02]);
  const plateRotate = useTransform(scrollYProgress, [0, 1], [-6, 8]);
  const steamOpacity = useTransform(scrollYProgress, [0.2, 0.4, 0.8, 1], [0, 0.7, 0.5, 0]);

  // Mouse hover tilt trigger
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <div
      ref={cardRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative h-[480px] bg-onyx-950/80 rounded-xl overflow-hidden border border-gold-950/35 group shadow-2xl transition-all duration-700"
    >
      {/* 1. Underlying Backdrop Scene (Parallaxing background) */}
      <motion.div
        style={{ y: bgTranslateY }}
        className="absolute inset-0 z-0 scale-110 filter brightness-[0.4] transition-filter duration-500 group-hover:brightness-[0.3]"
      >
        <img
          src={bgImage}
          alt="Backdrop"
          className="w-full h-full object-cover grayscale"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-onyx-950 via-onyx-950/30 to-transparent" />
      </motion.div>

      {/* 2. Glassmorphic card boundary border lighting */}
      <div className="absolute inset-0 bg-gradient-to-br from-gold-500/5 via-transparent to-gold-900/10 pointer-events-none z-10" />

      {/* 3. Rising hot steam simulation */}
      <motion.div
        style={{ opacity: steamOpacity }}
        className="absolute inset-x-0 bottom-40 top-10 pointer-events-none z-20 flex justify-center overflow-hidden"
      >
        <div className="relative w-32 h-full flex justify-around">
          {/* Sinuous steam paths moving upwards */}
          <div className="w-1 bg-gradient-to-t from-white/10 to-transparent h-48 rounded-full filter blur-[4px] animate-[pulse_3s_infinite] translate-y-2" />
          <div className="w-1 bg-gradient-to-t from-white/15 to-transparent h-40 rounded-full filter blur-[6px] animate-[pulse_4s_infinite]" />
          <div className="w-1 bg-gradient-to-t from-white/8 to-transparent h-52 rounded-full filter blur-[5px] animate-[pulse_2.5s_infinite] -translate-x-3" />
        </div>
      </motion.div>

      {/* 4. The primary plate breaking OUT of its boundary */}
      <motion.div
        style={{ 
          y: plateTranslateY, 
          scale: plateScale, 
          rotate: plateRotate,
          z: 50
        }}
        className="absolute top-28 left-4 right-4 h-64 z-30 flex items-center justify-center pointer-events-none"
      >
        <div className="relative w-56 h-56 rounded-full overflow-hidden shadow-[0_30px_50px_rgba(0,0,0,0.9)] border-[6px] border-onyx-950 group-hover:shadow-[0_45px_70px_rgba(184,124,43,0.25)] transition-all duration-500">
          <img
            src={foodLayerImage}
            alt={title}
            className="w-full h-full object-cover scale-105 filter brightness-105"
            referrerPolicy="no-referrer"
          />
          {/* Specular glass reflection */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent" />
        </div>
      </motion.div>

      {/* 5. Custom Foreground Overlapping details (like floating rosemary leaves, spices, or sauces) */}
      {fgDetails && fgDetails.map((detail, idx) => {
        // Compute parallax rate linked directly to scroll
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const detailY = useTransform(scrollYProgress, [0, 1], [detail.initialY - (25 * detail.speed), detail.initialY + (25 * detail.speed)]);
        
        return (
          <motion.div
            key={idx}
            className={`absolute z-40 p-2 pointer-events-none group-hover:scale-110 transition-transform duration-500`}
            style={{
              y: detailY,
              left: `${detail.initialX}%`,
              transformStyle: "preserve-3d"
            }}
          >
            <div className="relative">
              {/* Dynamic shadow representing physical altitude */}
              <div className="absolute top-4 left-4 w-6 h-6 bg-black/45 rounded-full blur-sm" />
              <span className="text-xl filter drop-shadow-[0_4px_6px_rgba(0,0,0,0.8)] leading-none block font-sans">
                {detail.src}
              </span>
            </div>
          </motion.div>
        );
      })}

      {/* 6. Text Metadata panel on glass backdrop */}
      <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-onyx-950 via-onyx-950/95 to-onyx-950/70 p-6 z-40 border-t border-gold-900/15 flex flex-col justify-end h-40">
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-gold-500 text-[10px] tracking-widest uppercase font-bold">
            <span>{tagline}</span>
            <span className="w-1 h-1 rounded-full bg-gold-600" />
            <span>Layered Depth</span>
          </div>
          <h4 className="text-lg font-serif text-white font-semibold flex items-center justify-between">
            {title}
            <span className="text-gold-300 font-sans text-xs font-normal px-2.5 py-0.5 rounded bg-onyx-950 border border-gold-950">
              Depth Level {index + 1 + ".0"}
            </span>
          </h4>
        </div>
        <p className="text-xs text-onyx-400 font-light mt-2 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}

export default function EmergingFoodShowcase() {
  const cards: EmergingCardProps[] = [
    {
      title: "Sizzling Sensation Beef Tibs",
      tagline: "Flame & Rose",
      bgImage: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=600&auto=format&fit=crop",
      foodLayerImage: IMAGES.tibs,
      fgDetails: [
        { src: "🌿", alt: "rosemary", initialX: 18, initialY: 100, speed: 1.4 },
        { src: "🌶️", alt: "chili", initialX: 78, initialY: 125, speed: 2.2 },
        { src: "🧅", alt: "onion", initialX: 70, initialY: 50, speed: 1.2 }
      ],
      description: "Sautéed chicken and beef in clarified butter. The pan and rosemary sprigs break outward past the edge frame reflecting cast iron shadows.",
      index: 0
    },
    {
      title: "Crown Jewel Doro Wot",
      tagline: "Authentic Slow Cook",
      bgImage: "https://images.unsplash.com/photo-1601050690597-df056fb4db78?q=80&w=600&auto=format&fit=crop",
      foodLayerImage: IMAGES.doroWot,
      fgDetails: [
        { src: "🥚", alt: "egg item", initialX: 82, initialY: 85, speed: 1.9 },
        { src: "🥢", alt: "stick item", initialX: 12, initialY: 140, speed: 2.4 }
      ],
      description: "Rich stew structured in layers. Watch the slow-boiled egg and caramelized berbere gravy rise visually towards your coordinate path.",
      index: 1
    },
    {
      title: "Vibrant Veggie Platter",
      tagline: "Rainbow Canvas",
      bgImage: "https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?q=80&w=600&auto=format&fit=crop",
      foodLayerImage: IMAGES.veggieCombo,
      fgDetails: [
        { src: "🧄", alt: "garlic clove", initialX: 20, initialY: 110, speed: 1.5 },
        { src: "🥬", alt: "collard greens leaf", initialX: 74, initialY: 160, speed: 1.8 }
      ],
      description: "A colossal ring platter of traditional lentils, chickpea purées, and collards. The rolls of injera split out to construct physical altitude.",
      index: 2
    }
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 py-20 relative">
      
      {/* Visual accents in corners */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-gold-400/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-gold-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-onyx-900 pb-8">
        <div className="space-y-3">
          <div className="flex items-center gap-1 bg-gold-950/50 border border-gold-800/40 w-max px-2.5 py-0.5 rounded text-[9px] uppercase tracking-widest text-gold-400 font-bold">
            <Award className="w-3.5 h-3.5" />
            Parallax Stereo Effects
          </div>
          <h3 className="text-3xl sm:text-5xl font-serif text-white font-bold leading-none">
            3D Emerging Portfolio
          </h3>
          <p className="text-sm text-onyx-400 font-light max-w-xl leading-relaxed">
            Plated photography split into individual stereoscopic planes. Slide your cursor or scroll downstream to break the visual box.
          </p>
        </div>

        {/* Aggregate marker */}
        <div className="flex items-center gap-2.5 bg-onyx-950 border border-gold-950 px-4 py-2 rounded text-xs text-onyx-350 shrink-0">
          <Activity className="w-4 h-4 text-gold-400 animate-pulse" />
          <span>Real-time Scroll Depth Renderer Active</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4">
        {cards.map((card, i) => (
          <CompanionEmergingCard
            key={card.title}
            title={card.title}
            tagline={card.tagline}
            bgImage={card.bgImage}
            foodLayerImage={card.foodLayerImage}
            fgDetails={card.fgDetails}
            description={card.description}
            index={i}
          />
        ))}
      </div>

    </section>
  );
}
