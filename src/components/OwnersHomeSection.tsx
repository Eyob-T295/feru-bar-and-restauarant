import { motion } from "motion/react";
import { Heart, Star, Users } from "lucide-react";
import { IMAGES } from "../data";
// @ts-ignore
import imgInside2 from "../assets/gallery/inside2.jpg";

export default function OwnersHomeSection() {
  return (
    <section className="relative py-20 bg-[#FAF9F6] border-t border-gold-200/50 overflow-hidden">
      {/* Subtle radial warm glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-radial from-[#C14F26]/4 to-transparent blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <div className="text-center mb-14 space-y-3">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 bg-[#C14F26]/5 border border-[#C14F26]/15 px-3.5 py-1 rounded-full text-brand-orange text-[10px] tracking-[0.25em] uppercase font-black"
          >
            <Users className="w-3.5 h-3.5" />
            The Founders
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl font-serif text-onyx-100 font-bold tracking-wide"
          >
            Meet the Owners
          </motion.h2>

          <div className="w-16 h-[1.5px] bg-brand-orange mx-auto" />

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-sm text-onyx-300 font-light max-w-md mx-auto leading-relaxed"
          >
            Two hearts, one vision — bringing the soul of Ethiopia to Alexandria's table.
          </motion.p>
        </div>

        {/* Main content: portrait + story */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* Owner portrait + Restaurant shot */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 relative group mt-8 lg:mt-0 pb-8 sm:pb-12 pr-6 sm:pr-8" 
          >
            
            {/* Background ambiance picture (imgInside2) */}
            <div className="absolute right-0 bottom-0 w-[70%] sm:w-[65%] aspect-[3/4] rounded-2xl overflow-hidden shadow-[0_15px_40px_rgba(0,0,0,0.15)] border-4 border-white rotate-6 group-hover:rotate-12 transition-all duration-700 z-0">
               <img src={imgInside2} alt="Feru ambiance" className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-700" />
            </div>

            {/* Main portrait (owners) */}
            <div className="relative w-[85%] rounded-2xl overflow-hidden border-[6px] border-white aspect-[4/5] shadow-[0_20px_50px_rgba(0,0,0,0.18)] bg-white z-10 -rotate-3 group-hover:-rotate-1 transition-transform duration-700">
              <img
                src={IMAGES.owners}
                alt="Melaku and Nibret — owners of Feru Bar & Restaurant"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#120D08]/80 pointer-events-none" />

              {/* Founder badge top-left */}
              <div className="absolute top-4 left-4 z-10">
                <span className="bg-brand-orange text-white text-[8px] uppercase tracking-[0.25em] py-1 px-3 rounded font-black border border-white/10 shadow">
                  Founders Profile
                </span>
              </div>

              {/* Heart icon top-right */}
              <div className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center border border-white/10">
                <Heart className="w-4 h-4 text-brand-orange fill-brand-orange" />
              </div>

              {/* Names overlay at bottom */}
              <div className="absolute bottom-0 left-0 right-0 z-10 p-5 border-t border-white/10">
                <h4 className="font-serif font-black text-2xl text-[#FFDAB3] tracking-wide drop-shadow-md">Melaku &amp; Nibret</h4>
                <p className="text-[10px] uppercase tracking-[0.3em] text-brand-orange font-black mt-0.5">
                  Owners &amp; Cultural Curators
                </p>
              </div>
            </div>
          </motion.div>

          {/* Story column */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-7 space-y-7"
          >
            <div className="space-y-2">
              <span className="text-xs uppercase tracking-widest text-brand-orange font-bold font-sans">
                THE VISIONARIES
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif text-onyx-100 font-bold leading-tight">
                A Family Dream Born in Addis Ababa
              </h3>
              <div className="w-12 h-[1.5px] bg-brand-orange" />
            </div>

            <p className="text-sm sm:text-[15px] text-onyx-300 font-light leading-relaxed">
              Melaku and Nibret brought Feru to life with a single, powerful mission — to share the authentic flavors, warming traditions, and heartfelt hospitality of Ethiopia with the Alexandria community.
            </p>

            {/* Signature quote */}
            <div className="bg-gradient-to-r from-amber-500/8 to-transparent border-l-4 border-brand-orange p-6 rounded-r-xl">
              <p className="font-serif italic text-lg sm:text-xl text-onyx-100 leading-relaxed font-medium">
                "We cook like we're serving family — because we are."
              </p>
              <span className="block text-[10px] font-sans tracking-widest text-brand-orange uppercase font-black mt-2">
                — MELAKU &amp; NIBRET, FOUNDERS
              </span>
            </div>

            {/* Quick stat row */}
            <div className="grid grid-cols-3 gap-4 pt-2">
              {[
                { value: "15+", label: "Years of Craft" },
                { value: "4.9", label: "Google Rating", icon: <Star className="w-3 h-3 fill-amber-500 text-amber-500 inline -mt-0.5" /> },
                { value: "100%", label: "Family Recipes" }
              ].map((stat) => (
                <div key={stat.label} className="text-center bg-white border border-gold-200 rounded-xl p-4 shadow-sm hover:border-brand-orange/40 transition-all duration-300">
                  <span className="block text-xl font-serif font-black text-onyx-100">
                    {stat.value} {stat.icon}
                  </span>
                  <span className="block text-[9px] uppercase tracking-widest text-brand-orange font-bold mt-0.5">{stat.label}</span>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
