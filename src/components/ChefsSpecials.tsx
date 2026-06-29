import React from "react";
import { motion } from "motion/react";
import { Sparkles, ArrowRight, Flame, Heart, Calendar } from "lucide-react";
// @ts-ignore
import tibsImg from "../assets/images/Chicken_Tibs.png";
// @ts-ignore
import doroWotImg from "../assets/images/Doro_Wat.png";
// @ts-ignore
import veggieComboImg from "../assets/images/Veggie_Combo.png";
// @ts-ignore
import mushroomKitfoImg from "../assets/images/Mushroom_Kitfo.png";
// @ts-ignore
import meatLoversComboImg from "../assets/images/meatLoversCombo.jpg";
// @ts-ignore
import bulaKitfoImg from "../assets/images/bulaKitfo.jpg";

interface ChefsSpecialsProps {
  setActiveTab: (tab: string) => void;
}

export default function ChefsSpecials(props: ChefsSpecialsProps) {
  const { setActiveTab } = props;

  const specials = [
    {
      id: "special-1",
      name: "Chicken Tibs",
      subName: "Chicken Tibs",
      description: "Sautéed, spiced chicken breast cubes cooked with garlic, fresh onions, tomatoes, and jalapeños.",
      price: "$17.99",
      label: "Sizzling & Fresh",
      image: tibsImg,
      badge: "In High Demand"
    },
    {
      id: "special-2",
      name: "Doro Wat",
      subName: "Doro Wot",
      description: "Slow-simmered, rich spicy chicken stew cooked with authentic Berbere, served with a hard-boiled egg and handmade cottage cheese.",
      price: "$22.99",
      label: "Legacy Special",
      image: doroWotImg,
      badge: "Signature"
    },
    {
      id: "special-3",
      name: "Vegetarian Combo",
      subName: "Veggie Combo",
      description: "A gorgeous, colorful mosaic platter featuring key lentils, split peas, cabbage, and spinach, cooked with heritage spices.",
      price: "$19.99",
      label: "Garden Fresh",
      image: veggieComboImg,
      badge: "Vegan-Friendly"
    },
    {
      id: "special-4",
      name: "Mushroom Kitfo",
      subName: "Mushroom Kitfo",
      description: "Finely minced fresh organic mushrooms seasoned with Mitmita spice, warm spiced herbal oil, and cardamom.",
      price: "$19.99",
      label: "Innovative Plant-Based",
      image: mushroomKitfoImg,
      badge: "Trending"
    },
    {
      id: "special-5",
      name: "Meat Lovers Combo",
      subName: "Meat Lovers Combo",
      description: "A grand culinary feast featuring Special Tibs, Prime Kitfo, Awaze Tibs, and succulent Chicken Tibs. Perfect for group feasting.",
      price: "$59.99",
      label: "Feast Platter",
      image: meatLoversComboImg,
      badge: "Perfect for Groups"
    },
    {
      id: "special-6",
      name: "Bula with Kitfo",
      subName: "Bula with Kitfo",
      description: "Creamy traditional false-banana porridge (bula) paired with spicy lean kitfo, seasoned with spiced butter.",
      price: "$25.99",
      label: "Highland Tradition",
      image: bulaKitfoImg,
      badge: "Authentic Original"
    }
  ];

  return (
    <section className="relative py-24 bg-[#FAF9F6] overflow-hidden border-t border-b border-gold-200/50">
      
      {/* Decorative soft glowing clay overlays for luxury atmospheric depth */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-radial from-[#C14F26]/3 to-transparent blur-[110px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Elegant Michelin-Grade Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 bg-[#C14F26]/5 border border-[#C14F26]/15 px-3.5 py-1 rounded-full text-brand-orange text-[10px] tracking-[0.25em] uppercase font-black"
          >
            <Sparkles className="w-3.5 h-3.5 text-brand-orange" />
            Gastronomy Showcase
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl font-serif text-onyx-100 tracking-widest font-bold"
          >
            Chef’s Specials
          </motion.h2>
          
          <div className="w-16 h-[1.5px] bg-brand-orange mx-auto my-3" />
          
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-sm text-onyx-300 font-light max-w-lg mx-auto tracking-wide leading-relaxed"
          >
            Indulge in masterfully prepared delicacies of Ethiopian culinary legacy, curated with imported premium organic spices and authentic family recipes.
          </motion.p>
        </div>

        {/* Clean, Simple luxury Grid Panel */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {specials.map((dish, i) => (
            <motion.div
              key={dish.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="bg-white border border-gold-200 rounded-xl overflow-hidden group hover:border-[#C14F26]/40 transition-all duration-300 flex flex-col justify-between shadow-gold-glow"
            >
              <div>
                
                {/* Media frame with premium aspect ratio */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#FAF9F6] border-b border-gold-100">
                  <img
                    src={dish.image}
                    alt={dish.name}
                    className="w-full h-full object-cover filter brightness-[0.94] contrast-[1.02] group-hover:scale-103 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Subtle top/bottom overlays on image for luxury layout feel */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent opacity-90" />

                  {/* Top Left Badge */}
                  <div className="absolute top-3 left-3 flex gap-1.5 items-center z-10">
                    <span className="bg-[#C14F26] text-white text-[8px] font-black tracking-widest uppercase px-2 py-0.5 rounded shadow-sm">
                      {dish.badge}
                    </span>
                  </div>

                  {/* Top Right Label */}
                  <div className="absolute top-3 right-3 z-10">
                    <div className="bg-white/90 backdrop-blur-md px-2 py-0.5 rounded border border-gold-200/50 text-[8px] text-[#B28F4D] uppercase tracking-widest font-black">
                      {dish.label}
                    </div>
                  </div>

                  {/* Clean text over frame bottom */}
                  <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between">
                    <div>
                      <p className="text-[10px] text-amber-300 italic font-medium tracking-widest uppercase">
                        {dish.subName}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Info & Typography Description in High Readability Light Shades */}
                <div className="p-6 space-y-4">
                  <div className="flex justify-between items-start gap-4">
                    <h3 className="text-xl font-serif text-onyx-100 font-bold leading-tight group-hover:text-[#C14F26] transition-colors">
                      {dish.name}
                    </h3>
                    <span className="text-base font-serif font-bold text-brand-orange shrink-0">
                      {dish.price}
                    </span>
                  </div>
                  
                  {/* Fixed high readability slate text for description */}
                  <p className="text-xs sm:text-[13px] text-onyx-300 leading-relaxed font-light min-h-[55px]">
                    {dish.description}
                  </p>
                </div>
              </div>

              {/* Order/Reserve micro-actions for premium realism */}
              <div className="px-6 pb-6 pt-3 border-t border-gold-100/60 flex items-center justify-between bg-[#FAF9F6]/40">
                <button
                  onClick={() => {
                    const el = document.getElementById("reservation-anchor");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="text-[9.5px] font-sans font-black tracking-widest uppercase text-brand-orange hover:text-[#B02A1E] transition-colors cursor-pointer flex items-center gap-1"
                >
                  <Calendar className="w-3 h-3" />
                  Reserve Table &gt;
                </button>
                <div className="flex items-center gap-1.5 text-brand-orange">
                  <Flame className="w-3.5 h-3.5 text-brand-orange animate-pulse" />
                  <span className="text-[9px] font-sans font-bold text-onyx-400 uppercase tracking-wider">House Secret Spice</span>
                </div>
              </div>

            </motion.div>
          ))}
        </div>

        {/* Browse Full Menu CTA at the bottom */}
        <div className="text-center pt-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              setActiveTab("menu");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="inline-flex items-center gap-2.5 px-10 py-4 bg-[#C14F26] hover:bg-[#B02A1E] text-white text-xs font-bold uppercase tracking-[0.22em] rounded shadow-gold-glow transition-all cursor-pointer"
          >
            Browse Full Menu
            <ArrowRight className="w-4 h-4 animate-bounce-right shrink-0" />
          </motion.button>
        </div>

      </div>

      <style>{`
        @keyframes bounce-right {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(4px); }
        }
        .animate-bounce-right {
          animation: bounce-right 1s infinite;
        }
      `}</style>
    </section>
  );
}
