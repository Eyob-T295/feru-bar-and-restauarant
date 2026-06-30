import React from "react";
import { Award, Compass, Heart, Shield, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import { IMAGES } from "../data";

export default function AboutSection() {
  const pillars = [
    {
      icon: <Compass className="w-6 h-6 text-brand-orange" />,
      title: "Direct Sourcing (Gondar)",
      description: "We source our core berbere spice, clarified butter (kibe), and organic coffee beans directly from family farms in Gondar and Kaffa."
    },
    {
      icon: <Award className="w-6 h-6 text-brand-orange" />,
      title: "The 3-Day Sourdough",
      description: "Our pure teff Injera is slowly fermented for 72 hours, creating its signature tang, airy texture, and gluten-free quality."
    },
    {
      icon: <Heart className="w-6 h-6 text-brand-orange" />,
      title: "The Ethos of Gursha",
      description: "Sharing injera from a communal plate and feeding a guest a hand-rolled wrap (Gursha) is our deepest tradition of respect."
    }
  ];

  return (
    <div className="space-y-24 pb-16">
      
      {/* Origins Editorial Hero */}
      <section className="relative h-[65vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1541532713592-79a0317b6b77?q=80&w=1500&auto=format&fit=crop"
            alt="Ethiopian mountains Landscape"
            className="w-full h-full object-cover filter brightness-[0.35] contrast-105"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-onyx-950 via-black/10 to-onyx-950" />
        </div>

        <div className="relative z-10 text-center max-w-3xl px-4 mx-auto space-y-4">
          <span className="text-xs uppercase tracking-[0.35em] text-brand-orange font-bold">
            ABOUT US & OUR ORIGINS
          </span>
          <h1 className="text-4xl sm:text-6xl font-serif text-white font-bold tracking-wide">
            Our Cultural Legacy
          </h1>
          <div className="w-16 h-0.5 bg-brand-orange mx-auto" />
          <p className="text-sm sm:text-base text-gold-50 font-light max-w-2xl mx-auto leading-relaxed italic font-serif">
            "We don't just plate recipes—we curate chapters of an ancient, soaring East African dynamic legacy."
          </p>
        </div>
      </section>

      {/* Main Narrative Column */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
        
        {/* Section 1: About Feru Bar and Restaurant */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <span className="text-xs uppercase tracking-widest text-brand-orange font-bold font-sans">OUR HOUSE ETHOS</span>
              <h2 className="text-3xl sm:text-4xl font-serif text-gold-900 font-bold leading-tight">About Feru Bar and Restaurant</h2>
              <div className="w-16 h-0.5 bg-brand-orange" />
            </div>

            <div className="space-y-4 text-sm sm:text-base text-onyx-200 leading-relaxed font-light">
              <p>
                Discover the taste of authentic Ethiopian cuisine, prepared with passion and served with warm hospitality. Every dish tells a story of tradition and flavor, perfect for sharing with family and friends.
              </p>
              <p>
                Whether you're here for a hearty meal, a refreshing drink, or a celebration, we promise a dining experience you'll never forget.
              </p>
            </div>
          </div>

          <div className="lg:col-span-5 relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-brand-orange to-amber-500 rounded-lg blur opacity-45 group-hover:opacity-75 transition duration-1000" />
            <div className="relative rounded-lg overflow-hidden border border-gold-300 bg-white aspect-[4/3] shadow-md">
              <img
                src={IMAGES.doroWot}
                alt="Finely presented Doro Wot"
                className="w-full h-full object-cover filter brightness-95 group-hover:scale-102 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="block text-[8px] uppercase tracking-widest text-[#FFBC7D] font-bold">COMMUNAL DINING</span>
                <span className="block font-serif text-sm font-semibold mt-0.5">"Every bite is a shared celebration"</span>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Meet Melaku and Nibret */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pt-8 border-t border-gold-200/50">
          
          {/* Customized Photo Canvas Frame specifically labeled for Melaku and Nibret */}
          <div className="lg:col-span-5 order-2 lg:order-1 relative group">
            <div className="absolute -inset-1.5 bg-gradient-to-r from-amber-600 to-brand-orange rounded-xl blur-md opacity-35 group-hover:opacity-55 transition duration-700" />
            
            <div className="relative rounded-xl overflow-hidden border-2 border-brand-orange bg-white aspect-[1/1] shadow-2xl flex flex-col justify-between p-6">
              
              {/* Actual host portrait */}
              <img
                src={IMAGES.owners}
                alt="Melaku and Nibret"
                className="absolute inset-0 w-full h-full object-cover opacity-95 group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              
              <div className="absolute inset-0 bg-gradient-to-b from-[#120D08]/5 via-[#120D08]/30 to-[#120D08]/75 z-0" />

              <div className="relative z-10 flex justify-between items-start">
                <span className="bg-brand-orange/90 text-white text-[8px] uppercase tracking-[0.25em] py-1 px-3.5 rounded font-black border border-white/10">
                  Founders Profile
                </span>
                <div className="w-8 h-8 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center border border-white/10">
                  <Heart className="w-4 h-4 text-brand-orange fill-brand-orange" />
                </div>
              </div>

              <div className="relative z-10 text-white space-y-1 pt-4 border-t border-white/10">
                <h4 className="font-serif font-black text-xl tracking-wide text-[#FFDAB3]">
                  Melaku & Nibret
                </h4>
                <p className="text-[10px] uppercase tracking-[0.3em] text-brand-orange font-black">
                  Owners & Cultural Curators
                </p>
              </div>
            </div>
          </div>

          {/* Context Copy Column */}
          <div className="lg:col-span-7 order-1 lg:order-2 space-y-6">
            <div className="space-y-2">
              <span className="text-xs uppercase tracking-widest text-brand-orange font-bold font-sans">THE VISIONARIES</span>
              <h2 className="text-3xl sm:text-4xl font-serif text-gold-900 font-bold leading-tight">Meet Melaku and Nibret</h2>
              <div className="w-16 h-0.5 bg-brand-orange" />
            </div>

            <div className="space-y-6">
              <p className="text-sm sm:text-base text-onyx-200 leading-relaxed font-light">
                Melaku and Nibret brought Feru to life to share authentic Ethiopian flavors, coffee ceremony traditions, and heartfelt hospitality with Alexandria.
              </p>

              {/* Beautiful luxury quote callout */}
              <div className="bg-gradient-to-r from-amber-500/5 to-transparent border-l-4 border-brand-orange p-6 rounded-r-xl my-4">
                <p className="font-serif italic text-lg sm:text-xl text-gold-900 leading-relaxed font-medium">
                  “We cook like we’re serving family — because we are.”
                </p>
                <span className="block text-[10px] font-sans tracking-widest text-brand-orange uppercase font-black mt-2">
                  — MELAKU & NIBRET, FOUNDERS
                </span>
              </div>
            </div>
          </div>

        </div>

      </section>

      {/* Cultural Pillar Blocks */}
      <section className="bg-gold-100/50 border-y border-gold-200 py-20 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center space-y-2">
            <span className="text-xs uppercase tracking-widest text-brand-orange font-bold font-sans font-sans">OUR FOUNDATIONAL MATRIX</span>
            <h2 className="text-3xl font-serif text-gold-900 font-bold">The Three Pillars of Feru</h2>
            <div className="w-12 h-0.5 bg-brand-orange mx-auto" />
            <p className="text-sm font-light text-onyx-300 max-w-md mx-auto">
              Our commitment to historical truth, organic techniques, and spiritual hospitality remains uncompromised.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pillars.map((p) => (
              <div
                key={p.title}
                className="bg-white p-8 rounded border border-gold-200 hover:border-brand-orange transition-all duration-300 space-y-4 shadow-sm hover:shadow-md text-center flex flex-col items-center"
              >
                <div className="w-12 h-12 bg-white border border-gold-300 rounded-full flex items-center justify-center text-brand-orange shadow-sm">
                  {p.icon}
                </div>
                <h4 className="text-lg font-serif font-bold text-gold-900">{p.title}</h4>
                <p className="text-xs text-onyx-200 leading-relaxed font-light font-sans">
                  {p.description}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

    </div>
  );
}
