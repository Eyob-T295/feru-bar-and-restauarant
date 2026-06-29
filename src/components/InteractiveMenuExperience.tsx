import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { DISHES } from "../data";
import { Dish } from "../types";
import { Sparkles, X, Flame, Eye, ThumbsUp, Layers, Compass } from "lucide-react";

export default function InteractiveMenuExperience() {
  const categories = ["Appetizers", "Meat Specials", "Vegetarian Dishes", "Cocktails & Wine"];
  const [activeCategory, setActiveCategory] = React.useState("Meat Specials");
  
  // Fit dishes based on category
  const filteredDishes = DISHES.filter(
    (d) => d.category.toLowerCase().includes(activeCategory.split(" ")[0].toLowerCase())
  );

  // Track currently expanded card for 3D modal detail slide-in
  const [selectedDish, setSelectedDish] = React.useState<Dish | null>(null);

  // Mouse tilt mechanics
  const [hoveredCardId, setHoveredCardId] = React.useState<string | null>(null);
  const [tilt, setTilt] = React.useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, id: string) => {
    setHoveredCardId(id);
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5; // [-0.5, 0.5]
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: x * 18, y: y * -18 });
  };

  const handleMouseLeave = () => {
    setHoveredCardId(null);
    setTilt({ x: 0, y: 0 });
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 py-20 relative">
      <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-gold-950/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 bg-gold-950/40 border border-gold-800/35 px-3 py-1 rounded-full text-gold-400 text-[10px] tracking-widest uppercase font-bold">
          <Sparkles className="w-3.5 h-3.5 text-gold-500" />
          Tactile Gastronomy
        </div>
        <h2 className="text-4xl sm:text-6xl font-serif text-white tracking-tight font-bold">
          Interactive Menu
        </h2>
        <div className="w-16 h-0.5 bg-gold-600 mx-auto" />
        <p className="text-xs sm:text-sm text-onyx-450 leading-relaxed font-sans max-w-lg mx-auto">
          Hover cards to sense their physical weight and reflection highlights. Click any dish to expand its 3D recipe landscape.
        </p>
      </div>

      {/* Categories chips bar */}
      <div className="flex flex-wrap justify-center gap-3 relative z-20">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setActiveCategory(cat);
              setSelectedDish(null);
            }}
            className={`px-4 py-2.5 rounded text-[11px] uppercase tracking-widest font-extrabold transition-all border ${
              activeCategory === cat
                ? "bg-gradient-to-r from-gold-600 to-gold-700 text-onyx-950 border-gold-400 font-semibold shadow-lg"
                : "bg-onyx-950/60 text-gold-400/80 border-gold-950 hover:border-gold-800 hover:text-white"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Responsive physical cards layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-25">
        {filteredDishes.map((dish) => {
          const isHovered = hoveredCardId === dish.id;
          
          return (
            <div
              key={dish.id}
              onMouseMove={(e) => handleMouseMove(e, dish.id)}
              onMouseLeave={handleMouseLeave}
              onClick={() => setSelectedDish(dish)}
              className="relative h-[480px] cursor-pointer"
              style={{ perspective: "1000px" }}
            >
              <motion.div
                style={{
                  transformStyle: "preserve-3d",
                  transform: isHovered
                    ? `perspective(1000px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg) translateY(-8px)`
                    : "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)"
                }}
                transition={{ type: "spring", stiffness: 120, damping: 20 }}
                className="w-full h-full bg-gradient-to-b from-onyx-900/60 to-onyx-950/90 rounded-xl overflow-hidden border border-gold-950/20 hover:border-gold-500/40 shadow-2xl flex flex-col justify-between p-5 relative select-none"
              >
                
                {/* Specular glint reflection overlay following cursor */}
                <div 
                  className={`absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none transition-opacity duration-300 ${
                    isHovered ? "opacity-100" : "opacity-0"
                  }`} 
                  style={{
                    transform: isHovered ? `translateX(${tilt.x * 2}px) translateY(${tilt.y * -2}px)` : "none"
                  }}
                />

                {/* Card Top: Dish image rotated slowly inside frame with altitude */}
                <div className="relative w-full h-[60%] rounded-lg overflow-hidden bg-onyx-950 shadow-inner group">
                  <motion.img
                    animate={{ rotate: isHovered ? 12 : 0 }}
                    transition={{ duration: 0.6 }}
                    src={dish.image}
                    alt={dish.name}
                    className="w-full h-full object-cover filter brightness-[0.78] transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-onyx-950/90 to-transparent" />
                  
                  {/* Floating price capsule */}
                  <span className="absolute top-4 right-4 bg-onyx-950/90 border border-gold-500/20 text-gold-300 text-[10px] font-sans px-2.5 py-1 rounded-full font-bold shadow-md">
                    ${dish.price}
                  </span>

                  {/* Spicy indicator in corner */}
                  {dish.spicyLevel && dish.spicyLevel > 0 && (
                    <div className="absolute bottom-4 left-4 flex gap-1">
                      {Array.from({ length: dish.spicyLevel }).map((_, i) => (
                        <span key={i} className="text-red-500 text-xs animate-pulse">🔥</span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Card Bottom: Text metadata */}
                <div className="space-y-3 pt-4 flex-grow flex flex-col justify-between">
                  <div className="space-y-1">
                    <h4 className="text-base sm:text-lg font-serif text-white group-hover:text-gold-300 transition-colors line-clamp-1">
                      {dish.name}
                    </h4>
                    <p className="text-xs text-onyx-400 font-light line-clamp-2 leading-relaxed">
                      {dish.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-onyx-900/60 text-[10px] tracking-widest uppercase font-bold text-gold-400/80">
                    <span>{dish.category}</span>
                    <span className="text-gold-500 hover:text-white transition-colors flex items-center gap-1 font-semibold">
                      Explore Details
                      <span className="text-xs">→</span>
                    </span>
                  </div>
                </div>

              </motion.div>
            </div>
          );
        })}
      </div>

      {/* Immersive 3D modal detail slide-in expansion */}
      <AnimatePresence>
        {selectedDish && (
          <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              transition={{ type: "spring", damping: 25, stiffness: 120 }}
              className="bg-gradient-to-b from-onyx-900 to-onyx-950 border border-gold-800/35 rounded-xl w-full max-w-4xl overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.95)] max-h-[90vh] overflow-y-auto"
            >
              <div className="grid grid-cols-1 md:grid-cols-2">
                
                {/* Modal Left column: High impact artwork */}
                <div className="relative h-64 md:h-full min-h-[350px] bg-onyx-950 overflow-hidden">
                  <motion.img
                    initial={{ rotate: -15, scale: 1.15 }}
                    animate={{ rotate: 0, scale: 1.02 }}
                    transition={{ duration: 0.8 }}
                    src={selectedDish.image}
                    alt={selectedDish.name}
                    className="w-full h-full object-cover filter brightness-[0.8]"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-transparent via-onyx-950/30 to-onyx-950" />
                  
                  <div className="absolute bottom-6 left-6 flex items-center gap-3">
                    <span className="text-3xl font-serif font-extrabold text-gold-450">${selectedDish.price}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-gold-900" />
                    <span className="text-[10px] uppercase font-bold tracking-widest text-white/80 bg-onyx-950/80 px-2.5 py-1 rounded backdrop-blur">
                      Gilded Selection
                    </span>
                  </div>
                </div>

                {/* Modal Right column: Elaborated culinary storytelling */}
                <div className="p-8 space-y-6 flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-gold-500 block">
                          {selectedDish.category}
                        </span>
                        <h3 className="text-2xl sm:text-3xl font-serif text-white font-bold tracking-tight mt-1">
                          {selectedDish.name}
                        </h3>
                      </div>
                      <button
                        onClick={() => setSelectedDish(null)}
                        className="p-1.5 rounded-full bg-onyx-950 border border-gold-950 text-gold-400 hover:text-white transition-colors cursor-pointer"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    <p className="text-sm text-onyx-300 font-light leading-relaxed">
                      {selectedDish.description}
                    </p>

                    {/* Meta facts specs */}
                    <div className="grid grid-cols-2 gap-4 pt-4 border-t border-onyx-900">
                      <div className="flex items-center gap-3">
                        <Flame className="w-5 h-5 text-gold-450" />
                        <div>
                          <span className="block text-[9px] uppercase tracking-wider text-onyx-500">Spice Palette</span>
                          <span className="block text-xs text-white font-sans font-bold">
                            {selectedDish.spicyLevel && selectedDish.spicyLevel > 0
                              ? Array.from({ length: selectedDish.spicyLevel }).map(() => "🔥").join(" ")
                              : "Cool / Mild"}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <Layers className="w-5 h-5 text-gold-450" />
                        <div>
                          <span className="block text-[9px] uppercase tracking-wider text-onyx-500">Plating Structure</span>
                          <span className="block text-xs text-white font-sans font-bold">communal mesob</span>
                        </div>
                      </div>
                    </div>

                    {/* Extended cultural insight paragraph */}
                    <div className="bg-onyx-950 border border-gold-950 p-4 rounded text-xs text-onyx-400 leading-relaxed font-sans space-y-1">
                      <span className="text-gold-400 uppercase font-black text-[9px] tracking-widest block">CHEF'S SIGNATURE PAIRING</span>
                      <p>
                        Best paired with our house-crafted <strong>Gilded Tej Honey Sling</strong> or a fresh draft of premium Habesha beer to balances the rich, lingering heat of the sun-dried Berbere spice blends.
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setSelectedDish(null);
                      // Scroll to booking
                      const resEl = document.getElementById("reservation-anchor");
                      if (resEl) {
                        resEl.scrollIntoView({ behavior: "smooth" });
                      }
                    }}
                    className="w-full py-4 bg-gradient-to-r from-gold-600 to-gold-700 hover:brightness-110 text-onyx-950 font-bold uppercase tracking-[0.2em] rounded text-xs transition-transform hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
                  >
                    Secure Seat to Experience
                  </button>

                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
