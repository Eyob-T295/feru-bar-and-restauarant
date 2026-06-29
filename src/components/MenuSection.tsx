import React from "react";
import { Search, Flame, CircleAlert, Globe, Compass, Grid, List } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { DISHES } from "../data";
import { MenuItemCategory } from "../types";

export default function MenuSection() {
  const [selectedCategory, setSelectedCategory] = React.useState<MenuItemCategory | "All">("All");
  const [searchQuery, setSearchQuery] = React.useState("");
  const [viewMode, setViewMode] = React.useState<"grid" | "list">("list");

  const categories: (MenuItemCategory | "All")[] = [
    "All",
    "Appetizers",
    "Meat Specials",
    "Vegetarian Dishes",
    "Seafood",
    "Sandwiches & Pasta",
    "Desserts",
    "Hot Drinks",
    "Cocktails & Wine"
  ];

  // Filter logic based on category and search query
  const filteredDishes = DISHES.filter((dish) => {
    const matchesCategory = selectedCategory === "All" || dish.category === selectedCategory;
    const matchesSearch = 
      dish.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dish.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (dish.tags && dish.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 pb-16">
      
      {/* Page Header */}
      <div className="text-center space-y-3 pt-6">
        <span className="text-xs uppercase tracking-[0.35em] text-brand-orange font-bold font-sans">
          EPICUREAN COLLECTION
        </span>
        <h1 className="text-4xl sm:text-6xl font-serif text-gold-900 font-bold tracking-wide">
          Our Culinary Canvas
        </h1>
        <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-brand-orange to-transparent mx-auto" />
        <p className="text-sm font-light text-onyx-300 max-w-xl mx-auto leading-relaxed">
          Every item is hand-prepared with organic imports, slow-simmered clarified butter (Kibe), and authentic sun-dried spice blends.
        </p>
      </div>

      {/* Cultural Etiquette / Guide banner */}
      <div className="bg-gold-105 bg-gold-100/70 border border-gold-200 p-6 rounded-lg max-w-4xl mx-auto flex flex-col sm:flex-row gap-6 items-center shadow-sm">
        <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-brand-orange shrink-0 border border-gold-300 shadow-sm">
          <Compass className="w-5.5 h-4.5" />
        </div>
        <div className="space-y-1 text-center sm:text-left">
          <h4 className="text-xs font-bold uppercase tracking-wider text-brand-orange">Dining Etiquette: The Shared Circle ("Gursha")</h4>
          <p className="text-xs text-onyx-200 leading-relaxed font-light">
            Injera is used as your utensil. Tear a piece with your right hand, scoop stews, and enjoy. Feeding a companion a bite (<strong className="italic text-brand-orange">Gursha</strong>) is our highest sign of friendship.
          </p>
        </div>
      </div>

      {/* Search, Filter & Layout Toggle Controls */}
      <div className="space-y-6">
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between border-b border-gold-200 pb-6">
          
          {/* Advanced Search bar */}
          <div className="relative w-full lg:max-w-md">
            <Search className="absolute left-4 top-3.5 w-4 h-4 text-onyx-400" />
            <input
              type="text"
              placeholder="Search dishes (e.g., vegan, tibs, doro, garlic)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-gold-200 focus:border-brand-orange focus:outline-none rounded-full pl-11 pr-4 py-3 text-xs text-gold-900 placeholder:text-onyx-400 transition-all shadow-sm"
            />
          </div>

          {/* Toggle buttons for layout Grid/List */}
          <div className="flex items-center space-x-3 shrink-0">
            <span className="text-xs text-onyx-400 font-light mr-1">Menu format:</span>
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2.5 rounded transition-all flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider ${
                viewMode === "grid" 
                  ? "bg-brand-orange text-white font-bold" 
                  : "bg-white text-gold-700 border border-gold-200 hover:bg-gold-50 hover:text-gold-900 shadow-sm"
              }`}
              aria-label="Grid layout"
            >
              <Grid className="w-4 h-4" />
              Photo Cards
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2.5 rounded transition-all flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider ${
                viewMode === "list" 
                  ? "bg-brand-orange text-white font-bold" 
                  : "bg-white text-gold-700 border border-gold-200 hover:bg-gold-50 hover:text-gold-900 shadow-sm"
              }`}
              aria-label="List layout"
            >
              <List className="w-4 h-4" />
              Classic Menu List
            </button>
          </div>

        </div>

        {/* Categories Carousel (Responsive tabs) */}
        <div className="overflow-x-auto no-scrollbar py-2 -mx-4 px-4 sm:mx-0 sm:px-0">
          <div className="flex space-x-2.5 min-w-max">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-[11px] font-bold tracking-wider uppercase transition-all duration-300 ${
                  selectedCategory === cat
                    ? "bg-brand-orange text-white shadow-gold-glow border-transparent"
                    : "bg-white border border-gold-200 text-gold-700 hover:text-brand-orange hover:border-gold-300 shadow-sm"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Dishes Area */}
      <div className="min-h-[400px]">
        {filteredDishes.length === 0 ? (
          <div className="text-center py-20 space-y-4 max-w-sm mx-auto">
            <CircleAlert className="w-12 h-12 text-brand-orange mx-auto font-light" strokeWidth="1.5" />
            <span className="block font-serif text-lg text-gold-900 font-bold">No culinary items found</span>
            <p className="text-xs text-onyx-300 font-light">
              We couldn't find any dishes matching "{searchQuery}" under "{selectedCategory}". Try checking your spelling or selecting another category.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
              }}
              className="px-4 py-2 bg-brand-orange text-white text-xs rounded transition-all hover:bg-vibrant-red shadow-sm animate-pulse"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <AnimatePresence mode="popLayout">
            {viewMode === "grid" ? (
              
              /* GRID VIEW MODE */
              <motion.div
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {filteredDishes.map((dish) => (
                  <motion.div
                    key={dish.id}
                    layoutId={`dish-container-${dish.id}`}
                    className="bg-white border border-gold-200/80 hover:border-gold-400 rounded-lg overflow-hidden flex flex-col justify-between group transition-all duration-500 shadow-sm hover:shadow-md"
                  >
                    <div className="relative h-56 bg-gold-50 overflow-hidden">
                      <img
                        src={dish.image}
                        alt={dish.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                      <span className="absolute top-4 right-4 bg-white/90 backdrop-blur border border-gold-300 text-brand-orange text-xs font-serif px-3 py-1.5 rounded font-bold shadow-sm">
                        ${dish.price}
                      </span>

                      {/* Spice indicator label */}
                      {dish.spicyLevel !== undefined && dish.spicyLevel > 0 && (
                        <div className="absolute bottom-4 left-4 flex gap-1">
                          {Array.from({ length: dish.spicyLevel }).map((_, i) => (
                            <Flame key={i} className="w-4 h-4 fill-red-500 text-red-500" />
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="p-6 flex flex-col flex-grow justify-between space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-start justify-between gap-4">
                          <h3 className="text-xl font-serif text-gold-900 group-hover:text-brand-orange transition-colors font-semibold">
                            {dish.name}
                          </h3>
                        </div>
                        <p className="text-xs text-onyx-200 leading-relaxed font-light">
                          {dish.description}
                        </p>
                      </div>

                      <div className="space-y-3">
                        {/* Tags display */}
                        {dish.tags && dish.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 pt-1">
                            {dish.tags.map((tag) => (
                              <span 
                                key={tag} 
                                className="bg-gold-50 text-gold-700 text-[8.5px] font-sans px-2 py-0.5 rounded border border-gold-200 uppercase tracking-widest font-semibold"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}

                        <div className="flex items-center justify-between text-[9px] uppercase tracking-wider text-onyx-400 pt-2 border-t border-gold-100">
                          <span>{dish.category}</span>
                          <span className="text-brand-orange font-serif lowercase italic">Feru Culinary</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              
              /* MINIMALIST PRINTED CARD LIST VIEW MODE */
              <motion.div
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="max-w-4xl mx-auto space-y-12 bg-[#FCFAF6] border border-gold-300 p-8 sm:p-12 rounded-lg shadow-sm relative"
              >
                {/* Visual subtle watermark background */}
                <div className="absolute inset-0 opacity-[0.03] flex items-center justify-center pointer-events-none p-8 z-0">
                  <Globe className="w-4/5 h-4/5 text-brand-orange animate-spin" style={{ animationDuration: "120s" }} />
                </div>

                <div className="relative z-10 space-y-10">
                  
                  {/* Organize the list items by categories */}
                  {categories.filter(c => c !== "All" && (selectedCategory === "All" || c === selectedCategory)).map((cat) => {
                    const catDishes = filteredDishes.filter(d => d.category === cat);
                    if (catDishes.length === 0) return null;

                    return (
                      <div key={cat} className="space-y-6">
                        <div className="flex items-center gap-4">
                          <h3 className="text-lg font-serif tracking-[0.25em] text-brand-orange uppercase font-bold">
                            {cat}
                          </h3>
                          <div className="h-[1px] bg-gold-200 flex-grow" />
                        </div>

                        <div className="space-y-6">
                          {catDishes.map((dish) => (
                            <div key={dish.id} className="group py-1">
                              <div className="flex justify-between items-baseline gap-4 mb-1">
                                <h4 className="text-base font-serif font-semibold text-gold-900 group-hover:text-brand-orange transition-colors">
                                  {dish.name}
                                  {dish.spicyLevel !== undefined && dish.spicyLevel > 0 && (
                                    <span className="ml-2 text-red-500 text-xs inline-flex align-middle gap-0.5">
                                      {Array.from({ length: dish.spicyLevel }).map((_, i) => (
                                        <span key={i}>🔥</span>
                                      ))}
                                    </span>
                                  )}
                                </h4>
                                <div className="border-b border-dotted border-gold-300 flex-grow mx-2 min-w-[20px]" />
                                <span className="font-serif font-bold text-brand-orange shrink-0 text-sm">
                                  ${dish.price}
                                </span>
                              </div>
                              <p className="text-xs text-onyx-200 font-light leading-relaxed max-w-2xl">
                                {dish.description}
                              </p>
                              
                              {/* Small dietary subtags */}
                              {dish.tags && dish.tags.length > 0 && (
                                <p className="text-[10px] text-gold-600 font-semibold font-serif mt-1">
                                  Style: {dish.tags.join(" • ")}
                                </p>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}

                </div>
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>

    </div>
  );
}
