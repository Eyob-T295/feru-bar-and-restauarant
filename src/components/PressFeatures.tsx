import React from "react";
import { ExternalLink, Play, Award, Sparkles, Newspaper } from "lucide-react";
import { motion } from "motion/react";

export default function PressFeatures() {
  const pressArticles = [
    {
      id: "wapo",
      outlet: "The Washington Post",
      logoType: "wapo",
      headline: "Feru Elevates Alexandria's East African Scene With Majestic Flavors",
      excerpt: "An exceptional masterclass in slow-simmered stews, house-fermented teff bread, and rare clay-pot coffee rituals.",
      linkText: "Read Gazette Feature",
      url: "https://www.washingtonpost.com",
      videoUrl: null,
      color: "border-gray-800 hover:border-black/50"
    },
    {
      id: "visit-alexandia",
      outlet: "Visit Alexandria",
      logoType: "alexandria",
      headline: "The Complete Culinary Journey Awaits on Historic King Street Corridor",
      excerpt: "Feru brings the soul of Addis Ababa to Old Town, featuring authentic spices and luxurious communal dining formats.",
      linkText: "Watch Dining Video Guide",
      url: "https://www.visitalexandriava.com",
      videoUrl: "#",
      color: "border-amber-100 hover:border-amber-400"
    },
    {
      id: "patch",
      outlet: "Alexandria Patch",
      logoType: "patch",
      headline: "Feru Restaurant Named Top Cultural Destination In Northern Virginia",
      excerpt: "From organic, master-poured espresso ceremonies to standard-setting doro wot stews, a dining room must-go.",
      linkText: "Read Local Review",
      url: "https://patch.com/virginia/oldtownalexandria",
      videoUrl: null,
      color: "border-emerald-100 hover:border-emerald-400"
    }
  ];

  return (
    <section className="relative py-20 bg-gradient-to-b from-onyx-950 via-[#FCFAF6] to-onyx-950 border-y border-gold-200 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(178,143,77,0.04)_0%,transparent_50%)] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center space-y-3 mb-14">
          <div className="inline-flex items-center gap-1.5 bg-brand-orange/10 px-3.5 py-1 rounded-full border border-brand-orange/20">
            <Award className="w-3.5 h-3.5 text-brand-orange" />
            <span className="text-[10px] uppercase font-sans tracking-[0.25em] text-brand-orange font-bold">
              Press & Accolades
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif text-gold-900 font-bold tracking-tight">
            Featured On The Media
          </h2>
          <div className="w-16 h-0.5 bg-brand-orange mx-auto" />
          <p className="text-xs text-onyx-300 font-light max-w-md mx-auto">
            Honored by respected journalists, regional guides, and food critics across Washington DC and Northern Virginia.
          </p>
        </div>

        {/* Press Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pressArticles.map((article) => (
            <motion.div
              key={article.id}
              whileHover={{ y: -6 }}
              className={`bg-white rounded-xl p-8 border hover:shadow-lg transition-all duration-300 flex flex-col justify-between space-y-6 ${article.color}`}
            >
              <div className="space-y-4">
                {/* Logo Display area with extremely visible and large custom layouts */}
                <div className="h-14 flex items-center border-b border-gold-100 pb-3">
                  {article.logoType === "wapo" && (
                    <div className="flex flex-col items-start">
                      <span className="font-serif font-black text-2xl tracking-tighter text-black uppercase">
                        The Washington Post
                      </span>
                      <span className="text-[9px] tracking-widest text-zinc-500 font-sans uppercase font-semibold">
                        CRITIC'S CHOICES
                      </span>
                    </div>
                  )}

                  {article.logoType === "alexandria" && (
                    <div className="flex items-center gap-2">
                      <div className="px-2.5 py-1 bg-amber-500 text-white rounded text-xs font-serif font-black">
                        VA
                      </div>
                      <div className="flex flex-col">
                        <span className="font-sans font-bold text-base tracking-wide text-zinc-900 uppercase">
                          Visit Alexandria
                        </span>
                        <span className="text-[8px] text-zinc-400 uppercase tracking-widest font-semibold">
                          CORRIDOR HIGHLIGHTS
                        </span>
                      </div>
                    </div>
                  )}

                  {article.logoType === "patch" && (
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded bg-emerald-600 flex items-center justify-center text-white text-base font-black font-sans">
                        P
                      </div>
                      <div className="flex flex-col">
                        <span className="font-sans font-black text-lg text-emerald-700 tracking-tight">
                          Patch
                        </span>
                        <span className="text-[8px] text-zinc-400 uppercase tracking-widest font-semibold">
                          ALEXANDRIA LOCAL NEWS
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Headline & Description */}
                <div className="space-y-2">
                  <h3 className="text-base font-serif font-bold text-gold-900 leading-snug hover:text-brand-orange transition-colors">
                    "{article.headline}"
                  </h3>
                  <p className="text-[11.5px] text-onyx-200 leading-normal font-light">
                    {article.excerpt}
                  </p>
                </div>
              </div>

              {/* URL Outbound and Video indicators */}
              <div className="pt-2 flex items-center justify-between">
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-brand-orange hover:text-vibrant-red font-bold uppercase tracking-wider"
                >
                  <Newspaper className="w-3.5 h-3.5 shrink-0" />
                  {article.linkText}
                  <ExternalLink className="w-3 h-3 text-brand-orange/60" />
                </a>

                {/* If there is video content, add play badge */}
                {article.videoUrl && (
                  <div className="flex items-center gap-1 text-[9px] bg-amber-500/10 text-brand-orange px-2 py-1 rounded font-bold uppercase tracking-wider font-sans border border-amber-500/20">
                    <Play className="w-2.5 h-2.5 fill-brand-orange text-brand-orange" />
                    Video Content
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
