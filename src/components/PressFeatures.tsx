import { ExternalLink, Award, Quote } from "lucide-react";
import { motion } from "motion/react";
// @ts-ignore
import wpLogo from "../assets/images/wp.png";
// @ts-ignore
import alexandriaLogo from "../assets/images/alexandria.png";
// @ts-ignore
import patchLogo from "../assets/images/patch.png";

const features = [
  {
    id: "wapo-jul-2024",
    image: wpLogo,
    outlet: "The Washington Post",
    date: "July 2024",
    badge: "Featured Review",
    badgeColor: "bg-black text-white",
    headline: "Ethiopian Restaurant in Van Dorn Shopping Center Named a Great, Affordable Spot",
    excerpt:
      "The Washington Post food critic spotlights Feru as a standout for authentic, affordable Ethiopian cuisine in the Alexandria area.",
    url: "https://www.alxnow.com/2024/07/17/washington-post-highlights-ethiopian-restaurant-in-van-dorn-shopping-center-as-great-affordable-spot/",
    accent: "border-l-black",
    hoverBorder: "hover:border-black/30",
  },
  {
    id: "wapo-nov-2024",
    image: wpLogo,
    outlet: "The Washington Post",
    date: "November 2024",
    badge: "Best of 2024",
    badgeColor: "bg-black text-white",
    headline: "Best Restaurants in Alexandria — Top Picks by Washington Post Critics",
    excerpt:
      "Named one of the best restaurants in all of Alexandria, Virginia — recognized for exceptional food, atmosphere, and cultural authenticity.",
    url: "https://www.washingtonpost.com/dc-md-va/2024/11/08/best-restaurants-alexandria/",
    accent: "border-l-black",
    hoverBorder: "hover:border-black/30",
  },
  {
    id: "visit-alexandria",
    image: alexandriaLogo,
    outlet: "Visit Alexandria",
    date: "Official Listing",
    badge: "City Guide",
    badgeColor: "bg-amber-600 text-white",
    headline: "Feru Bar & Restaurant — Alexandria's Official Tourism Spotlight",
    excerpt:
      "Listed by Visit Alexandria as a must-visit dining destination, celebrating Ethiopia's rich culinary heritage in the heart of the city.",
    url: "https://visitalexandria.com/listings/feru-bar-restaurant/",
    accent: "border-l-amber-500",
    hoverBorder: "hover:border-amber-400/40",
  },
  {
    id: "patch",
    image: patchLogo,
    outlet: "Patch · Old Town Alexandria",
    date: "2024",
    badge: "Local Pick",
    badgeColor: "bg-emerald-700 text-white",
    headline: "Alexandria Eatery Named Great, Affordable Dining Pick by Post Food Critic",
    excerpt:
      "Patch Alexandria covers Feru's recognition as a top local eatery — praised for bold spices, generous portions, and warm hospitality.",
    url: "https://patch.com/virginia/oldtownalexandria/alexandria-eatery-named-great-affordable-dining-post-food-critic",
    accent: "border-l-emerald-600",
    hoverBorder: "hover:border-emerald-400/40",
  },
];

export default function PressFeatures() {
  return (
    <section className="relative py-24 overflow-hidden bg-[#FAF9F6] border-y border-gold-200/50">
      {/* Subtle radial background warm glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(178,143,77,0.06)_0%,transparent_60%)] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Section header ── */}
        <div className="text-center mb-16 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-brand-orange/8 border border-brand-orange/20 px-4 py-1.5 rounded-full"
          >
            <Award className="w-3.5 h-3.5 text-brand-orange" />
            <span className="text-[10px] uppercase tracking-[0.3em] text-brand-orange font-black">
              Press &amp; Accolades
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl font-serif text-onyx-100 font-bold"
          >
            As Featured In
          </motion.h2>

          <div className="w-16 h-[1.5px] bg-brand-orange mx-auto" />

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-sm text-onyx-300 font-light max-w-md mx-auto"
          >
            Recognized by leading voices across Washington D.C. and Northern Virginia.
          </motion.p>
        </div>

        {/* ── Press logo strip (decorative) ── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="flex items-center justify-center gap-8 sm:gap-14 mb-16 flex-wrap"
        >
          {[
            { img: wpLogo, alt: "Washington Post", cls: "h-8 grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100" },
            { img: alexandriaLogo, alt: "Visit Alexandria", cls: "h-8 grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100" },
            { img: patchLogo, alt: "Patch", cls: "h-8 grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100" },
          ].map((l) => (
            <img key={l.alt} src={l.img} alt={l.alt} className={l.cls} />
          ))}
        </motion.div>

        {/* ── Press cards grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <motion.a
              key={f.id}
              href={f.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.09 }}
              whileHover={{ y: -6 }}
              className={`group bg-white rounded-xl border border-gold-200/80 ${f.hoverBorder} hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden cursor-pointer`}
            >
              {/* Logo image header */}
              <div className="relative h-28 bg-[#F5F3EF] flex items-center justify-center px-6 border-b border-gold-100 overflow-hidden">
                <img
                  src={f.image}
                  alt={f.outlet}
                  className="max-h-16 max-w-[80%] object-contain group-hover:scale-105 transition-transform duration-500"
                />
                {/* Date badge top right */}
                <div className="absolute top-3 right-3">
                  <span className="text-[8px] uppercase tracking-widest text-onyx-300 font-bold bg-white border border-gold-200 px-2 py-0.5 rounded">
                    {f.date}
                  </span>
                </div>
                {/* Feature badge top left */}
                <div className="absolute top-3 left-3">
                  <span className={`text-[8px] uppercase tracking-widest font-black px-2 py-0.5 rounded ${f.badgeColor}`}>
                    {f.badge}
                  </span>
                </div>
              </div>

              {/* Content body */}
              <div className={`flex flex-col flex-1 p-5 space-y-3 border-l-4 ${f.accent}`}>
                {/* Quote icon */}
                <Quote className="w-4 h-4 text-brand-orange/40 shrink-0" />

                <h3 className="text-sm font-serif font-bold text-onyx-100 leading-snug group-hover:text-brand-orange transition-colors duration-200 line-clamp-3">
                  {f.headline}
                </h3>

                <p className="text-[11.5px] text-onyx-300 leading-relaxed font-light flex-1 line-clamp-3">
                  {f.excerpt}
                </p>

                {/* Footer link */}
                <div className="pt-3 border-t border-gold-100 flex items-center justify-between">
                  <span className="text-[9px] uppercase tracking-widest text-onyx-400 font-bold truncate pr-2">
                    {f.outlet}
                  </span>
                  <div className="flex items-center gap-1 text-brand-orange group-hover:text-vibrant-red transition-colors shrink-0">
                    <span className="text-[9px] font-black uppercase tracking-wider">Read</span>
                    <ExternalLink className="w-3 h-3" />
                  </div>
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        {/* ── Bottom quote strip ── */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-16 bg-gradient-to-r from-brand-orange/5 via-amber-500/5 to-brand-orange/5 border border-brand-orange/15 rounded-2xl px-8 py-8 text-center space-y-3"
        >
          <Quote className="w-6 h-6 text-brand-orange mx-auto opacity-50" />
          <p className="font-serif italic text-xl sm:text-2xl text-onyx-100 font-medium max-w-2xl mx-auto leading-relaxed">
            "A great, affordable spot for authentic Ethiopian cuisine that delivers bold flavor and warm hospitality."
          </p>
          <span className="block text-[10px] uppercase tracking-[0.35em] text-brand-orange font-black">
            — The Washington Post, 2024
          </span>
        </motion.div>

      </div>
    </section>
  );
}
