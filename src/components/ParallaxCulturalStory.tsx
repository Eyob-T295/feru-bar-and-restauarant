import React from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Landmark, Compass, Coffee, UserCheck, Flame, BookOpen } from "lucide-react";

interface StorySegmentProps {
  category: string;
  title: string;
  desc: string;
  quote?: string;
  imgUrl: string;
  icon: React.ReactNode;
  align: "left" | "right";
  key?: React.Key;
}

function CompanionStorySegment(props: StorySegmentProps) {
  const { category, title, desc, quote, imgUrl, icon, align } = props;
  const cardRef = React.useRef<HTMLDivElement | null>(null);

  // Scroll trackers for individual story segments
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });

  // Background slow translations (0 to 1 scroll translates it slightly)
  const bgTranslate = useTransform(scrollYProgress, [0, 1], [-80, 80]);
  
  // Foreground faster translation (moves in opposite direction)
  const fgTranslate = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <div
      ref={cardRef}
      className="relative min-h-[500px] grid grid-cols-1 md:grid-cols-12 gap-12 items-center py-20 border-b border-onyx-900 last:border-0"
    >
      {/* Visual background image layer (lg:col-span-6) */}
      <div
        className={`relative h-[320px] sm:h-[420px] overflow-hidden rounded-xl border border-gold-950/20 group md:col-span-6 ${
          align === "right" ? "md:order-2" : "md:order-1"
        }`}
      >
        <motion.div
          style={{ y: bgTranslate }}
          className="absolute -inset-y-20 inset-x-0 bg-onyx-950 scale-105"
        >
          <img
            src={imgUrl}
            alt={title}
            className="w-full h-full object-cover filter brightness-[0.55] group-hover:scale-105 transition-transform duration-[2000ms]"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-onyx-950 via-transparent to-transparent" />
        </motion.div>
        
        {/* Floating golden visual badge frame */}
        <div className="absolute inset-0 bg-gradient-to-tr from-gold-500/5 via-transparent to-gold-400/5 pointer-events-none" />
      </div>

      {/* Foreground narrative text card layout (lg:col-span-6) */}
      <motion.div
        style={{ y: fgTranslate }}
        className={`space-y-6 md:col-span-6 z-20 ${
          align === "right" ? "md:order-1 md:pr-8" : "md:order-2 md:pl-8"
        }`}
      >
        <div className="space-y-2">
          <div className="flex items-center gap-2.5 text-gold-500 text-[10px] tracking-widest uppercase font-bold">
            <span className="p-1 px-1.5 rounded bg-gold-950/40 border border-gold-800/25">
              {icon}
            </span>
            <span>{category}</span>
          </div>
          <h4 className="text-3xl sm:text-4xl font-serif text-white tracking-tight font-bold">
            {title}
          </h4>
          <div className="w-12 h-0.5 bg-gold-700" />
        </div>

        <p className="text-sm font-sans text-onyx-300 font-light leading-relaxed">
          {desc}
        </p>

        {quote && (
          <blockquote className="border-l-2 border-gold-500 pl-4 py-1 italic font-serif text-gold-150 text-xs sm:text-sm leading-relaxed bg-onyx-950/40 p-3 rounded">
            "{quote}"
          </blockquote>
        )}
      </motion.div>
    </div>
  );
}

export default function ParallaxCulturalStory() {
  const segments: StorySegmentProps[] = [
    {
      category: "ORIGIN",
      title: "Yirgacheffe Coffee Farms",
      desc: "Our story begins in the misty highlands of southern Ethiopia, 2,000 meters above sea level. This mineral-rich volcanic soil is the absolute cradle of Arabica coffee. Each bean is handpicked at peak crimson maturity by our cooperative agricultural partners, respecting the soil and preserving age-old washing methods.",
      quote: "To import directly from micro-lots is our lifetime promise to the land and the farming families of Yirgacheffe.",
      imgUrl: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=800&auto=format&fit=crop",
      icon: <Compass className="w-3.5 h-3.5" />,
      align: "left"
    },
    {
      category: "COMMUNITY",
      title: "Traditional Serving Rituals",
      desc: "In Ethiopia, dining is uniquely communal—never individual. Food is served atop a majestic woven straw table called the Mesob. Sharing a platter of injera together is a beautiful act of friendship (Gursha). We honor this warmth by offering multi-diner combos served with maximum luxury respect.",
      quote: "Through the sharing of bread (injera), we weave strings of connection that outlast any single meal.",
      imgUrl: "https://images.unsplash.com/photo-1541532713592-79a0317b6b77?q=80&w=800&auto=format&fit=crop",
      icon: <Landmark className="w-3.5 h-3.5" />,
      align: "right"
    },
    {
      category: "ATMOSPHERE",
      title: "The Feru Interior Energy",
      desc: "Crafted to embody the dark volcanic stone structures of Lalibela, northern Ethiopia, our lounge is highlighted with textured bronze, warm amber uplights, and raw brass finishes. The sound of roasting coffee and customized classic Ethiopian jazz rhythms envelope guests in an absolute sanctuary of focus.",
      quote: "We don't just plate food; we design a sensory theater of peace.",
      imgUrl: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=800&auto=format&fit=crop",
      icon: <Coffee className="w-3.5 h-3.5" />,
      align: "left"
    },
    {
      category: "LEGACY",
      title: "Chef Feru Tefera",
      desc: "Chef and cultural pioneer Feru Tefera launched Feru Bar & Restaurant to elevate Ethiopian cuisine to Michelin-caliber status. Mixing slow slow-cooked stews with meticulous local culinary presentation standards, Feru creates a stunning blueprint where culture, hospitality, and culinary precision meet.",
      quote: "Our grandmothers did not measure spices on digital scales. They cooked with intuition. I translate that soul into modern culinary art.",
      imgUrl: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?q=80&w=800&auto=format&fit=crop",
      icon: <UserCheck className="w-3.5 h-3.5" />,
      align: "right"
    }
  ];

  return (
    <section className="bg-gradient-to-b from-onyx-950 via-onyx-900/30 to-onyx-950 py-24 border-y border-gold-950/25 relative overflow-hidden">
      
      {/* Background graphic elements */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-gold-900/5 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] bg-gold-500/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Story Head */}
        <div className="text-center space-y-4 max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 bg-onyx-950 border border-gold-950 px-3 py-1 rounded-full text-gold-400 text-[10px] tracking-widest uppercase font-bold">
            <BookOpen className="w-3.5 h-3.5" />
            Gastronomy Narrative
          </div>
          <h3 className="text-4xl sm:text-5xl font-serif text-white tracking-tight font-bold">
            A Parallax Narrative
          </h3>
          <p className="text-xs sm:text-sm text-onyx-400 font-light leading-relaxed">
            From farm to cup, from ancient heritage to modern plate. Explore our chapters.
          </p>
        </div>

        {/* Narrative segments stack */}
        <div className="space-y-4">
          {segments.map((seg, idx) => (
            <CompanionStorySegment
              key={seg.title}
              category={seg.category}
              title={seg.title}
              desc={seg.desc}
              quote={seg.quote}
              imgUrl={seg.imgUrl}
              icon={seg.icon}
              align={seg.align}
            />
          ))}
        </div>

      </div>

    </section>
  );
}
