import React from "react";
import { Coffee, RotateCcw, Flame, CheckCircle2, Bookmark, FlameKindling, Info } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { IMAGES } from "../data";

export default function CoffeeSection() {
  const [selectedZone, setSelectedZone] = React.useState<string>("yirgacheffe");

  const coffeeZones = [
    {
      id: "yirgacheffe",
      name: "Yirgacheffe Region",
      altitude: "1,700 – 2,200m",
      flavorNotes: "Bright citrus, elegant lemongrass, lavender floral aromas, sweet jasmine honey.",
      roastProfile: "Light-Medium Roast",
      body: "Silky and tea-like",
      description: "Universally acknowledged as the gold standard of organic washing, carrying exceptionally crisp floral acidity."
    },
    {
      id: "sidamo",
      name: "Sidamo Highlands",
      altitude: "1,500 – 1,800m",
      flavorNotes: "Rich dark berries, wild blueberry preserves, brown baking spices, dark cocoa butter.",
      roastProfile: "Medium Roast",
      body: "Full and velvety",
      description: "Naturally processed under sun-drying beds, yielding concentrated stone fruit and creamy chocolate complexities."
    },
    {
      id: "harrar",
      name: "Harrar Wildlands",
      altitude: "1,400 – 1,600m",
      flavorNotes: "Deep blackberry jam, dry forest earthiness, dried figs, red wine acidity.",
      roastProfile: "Medium-Dark Roast",
      body: "Rich, syrupy and lingering",
      description: "Cultivated in dry, wild mountainous shrubs. Harrar beans are exceptionally complex, wild, and heavy-bodied."
    }
  ];

  const rounds = [
    {
      name: "Abol (The Primary Cup)",
      purpose: "Contemplation & Greeting",
      intensity: "Strongest, thick concentrated nectar",
      culturalNote: "The first brew of water. Reserved for quiet appreciation, grounding, and introducing elders or honored guests."
    },
    {
      name: "Tona (The Second Cup)",
      purpose: "Dialogue & Gathering",
      intensity: "Mild, balanced, lighter body",
      culturalNote: "Water is added back to the Jebena and boiled again. This is typically when family discussions, catch-ups, and laughter flow."
    },
    {
      name: "Baraka (The Final Cup)",
      purpose: "Blessing & Prosperity",
      intensity: "Very mild, sweet, aromatic finish",
      culturalNote: "The final brew. Represents a sacred token of peace and mutual blessings for the road. Leaving before Baraka is highly avoided."
    }
  ];

  const activeZoneInfo = coffeeZones.find(z => z.id === selectedZone) || coffeeZones[0];

  return (
    <div className="space-y-24 pb-16">
      
      {/* Editorial Header */}
      <section className="relative h-[65vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={IMAGES.coffeeCeremony}
            alt="Traditional Jebena Pouring"
            className="w-full h-full object-cover filter brightness-[0.2] contrast-105"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-onyx-950 via-transparent to-onyx-950" />
        </div>

        <div className="relative z-10 text-center max-w-3xl px-4 mx-auto space-y-4">
          <span className="text-xs uppercase tracking-[0.35em] text-gold-500 font-semibold">
            BORN IN ETHIOPIA
          </span>
          <h1 className="text-4xl sm:text-6xl font-serif text-white font-bold tracking-wide">
            The Living Ceremony
          </h1>
          <div className="w-16 h-0.5 bg-gold-400 mx-auto" />
          <p className="text-base sm:text-lg text-[#FAF5EC] font-light font-serif italic max-w-2xl mx-auto leading-relaxed">
            "Bunna is our spirit. Originating in the ancient forests of Kaffa, the bean is a daily gathering of souls."
          </p>
        </div>
      </section>

      {/* The Narrative & Timeline */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <div className="space-y-6">
            <div className="space-y-2">
              <span className="text-xs uppercase tracking-widest text-brand-orange font-semibold">SENSORY JOURNEY</span>
              <h2 className="text-3xl sm:text-4xl font-serif text-onyx-100 font-bold">The Alchemy of Jebena Brewing</h2>
              <div className="w-16 h-0.5 bg-brand-orange" />
            </div>
            <p className="text-sm text-onyx-300 font-light leading-relaxed">
              The traditional coffee ceremony is a daily ritual at Feru, inviting you to slow down and enjoy the warmth of ancient Ethiopian hospitality.
            </p>

            {/* Brewing Steps list */}
            <div className="space-y-6 pt-4">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-white border border-gold-300 text-brand-orange flex items-center justify-center font-serif text-sm shrink-0 font-bold shadow-sm">1</div>
                <div>
                  <h4 className="text-sm font-semibold text-onyx-150 uppercase tracking-wider">The Open Charcoal Roast ("Qollo")</h4>
                  <p className="text-xs text-onyx-300 font-light mt-1">Watch green coffee beans roast over live coals on a flat iron pan until they crack and turn oil-rich dark brown.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-white border border-gold-300 text-brand-orange flex items-center justify-center font-serif text-sm shrink-0 font-bold shadow-sm">2</div>
                <div>
                  <h4 className="text-sm font-semibold text-onyx-150 uppercase tracking-wider">The Crushing of the Bean ("Mukecha")</h4>
                  <p className="text-xs text-onyx-300 font-light mt-1">Inhale the potent roast smoke at your table before the beans are ground by hand using a traditional mortar and pestle.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-white border border-gold-300 text-brand-orange flex items-center justify-center font-serif text-sm shrink-0 font-bold shadow-sm">3</div>
                <div>
                  <h4 className="text-sm font-semibold text-onyx-150 uppercase tracking-wider">The Clay Steeping</h4>
                  <p className="text-xs text-onyx-300 font-light mt-1">The grounds are brewed with spring water in a narrow-necked clay Jebena pitcher over coals until boiling.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-white border border-gold-300 text-brand-orange flex items-center justify-center font-serif text-sm shrink-0 font-bold shadow-sm">4</div>
                <div>
                  <h4 className="text-sm font-semibold text-onyx-150 uppercase tracking-wider">The Perfect Steady Ribbon</h4>
                  <p className="text-xs text-onyx-300 font-light mt-1">Our coffee masters pour a smooth, unbroken ribbon from the Jebena into handless ceramic cups (Cinny) with perfect steady grace.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Visual card overlay representing custom table elements */}
          <div className="relative group">
            <div className="absolute -inset-1.5 bg-gradient-to-r from-gold-600 to-gold-700/60 rounded-lg blur opacity-15" />
            <div className="relative rounded-lg overflow-hidden border border-gold-250 bg-white p-8 space-y-8 shadow-gold-glow">
              
              <div className="flex items-center gap-4 border-b border-gold-100 pb-4">
                <Coffee className="w-8 h-8 text-brand-orange" strokeWidth="1" />
                <div>
                  <h3 className="text-lg font-serif font-bold text-onyx-100">Traditional Seating Set</h3>
                  <p className="text-[10px] uppercase text-brand-orange tracking-widest font-bold font-sans">Sacred hospitality elements</p>
                </div>
              </div>

              <div className="space-y-4 font-light text-xs text-onyx-200 font-sans">
                <p>
                  To experience the ceremony is to experience connection. When you partake at Feru:
                </p>
                <ul className="space-y-3.5 list-none">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-brand-orange shrink-0 mt-0.5" />
                    <span><strong>Frankincense Burning:</strong> High-grade organic resins burn throughout the room, creating a soothing woody smoke canopy.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-brand-orange shrink-0 mt-0.5" />
                    <span><strong>Fresh Grass Floor ("Ketema"):</strong> Soft freshly cut grass is spread over mats to symbolize peace and regrowth.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-brand-orange shrink-0 mt-0.5" />
                    <span><strong>Roasted Corn Side ("Kolo"):</strong> Rhythmic coffee sips are paired with crunchy toasted barley, peanuts, and honey seeds.</span>
                  </li>
                </ul>
              </div>

              <div className="pt-2">
                <div className="bg-gold-50 border border-gold-200 rounded-lg p-5 flex items-start gap-3">
                  <Info className="w-5 h-5 text-brand-orange shrink-0 mt-0.5" />
                  <div>
                    <span className="block text-xs font-semibold text-onyx-100">Daily Showtimes & Cost</span>
                    <span className="block text-[11px] text-onyx-300 mt-1">Conducted daily at <strong>5:00 PM</strong>. Complimentary for dining patrons or <strong>$12/guest</strong> for walk-ins.</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* The 3 Cups Breakdown */}
      <section className="bg-onyx-900/30 border-y border-gold-900/20 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center space-y-2">
            <span className="text-xs uppercase tracking-widest text-[#B28F4D] font-bold font-sans">THE THREE SACRED ROUNDS</span>
            <h2 className="text-3xl font-serif text-onyx-100 font-bold">Unfolding of the Cups</h2>
            <div className="w-16 h-0.5 bg-brand-orange mx-auto" />
            <p className="text-sm font-light text-onyx-300 max-w-xl mx-auto">
              Guests are served three distinct cups representing evolving layers of connection and blessings.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {rounds.map((round, index) => (
              <div
                key={round.name}
                className="bg-white p-6 rounded border border-gold-200 hover:border-brand-orange/40 transition-all duration-300 space-y-4 shadow-sm hover:shadow-md text-center flex flex-col items-center"
              >
                <div className="w-12 h-12 rounded-full bg-gold-50 border border-gold-200 text-brand-orange flex items-center justify-center font-bold text-sm shrink-0">
                  {index === 0 ? "I" : index === 1 ? "II" : "III"}
                </div>
                <div className="space-y-1">
                  <h4 className="text-lg font-serif font-semibold text-onyx-100">{round.name}</h4>
                  <span className="block text-[10px] text-brand-orange tracking-widest font-bold uppercase">{round.purpose}</span>
                </div>
                <p className="text-xs text-onyx-300 leading-relaxed font-light font-sans">
                  {round.culturalNote}
                </p>
                <div className="pt-2 border-t border-gold-100 w-full text-[10px] text-onyx-400 font-sans">
                  Intensity: <span className="text-brand-orange font-serif italic font-medium">{round.intensity}</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Interactive Single-Origin Scent Profile Explorer */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-2">
          <span className="text-xs uppercase tracking-widest text-[#B28F4D] font-bold font-sans">TERROIR SPECIFICS</span>
          <h2 className="text-3xl font-serif text-onyx-100 font-bold">Select Your Origin Profile</h2>
          <div className="w-12 h-0.5 bg-brand-orange mx-auto" />
          <p className="text-sm text-onyx-300 font-light max-w-md mx-auto">
            Explore cup parameters, roast levels, and distinct origin cupping notes.
          </p>
        </div>

        {/* Region selections */}
        <div className="flex justify-center border-b border-gold-200">
          <div className="flex space-x-8 -mb-[1px]">
            {coffeeZones.map((zone) => (
              <button
                key={zone.id}
                onClick={() => setSelectedZone(zone.id)}
                className={`py-4 text-xs font-semibold tracking-widest uppercase border-b-2 transition-all ${
                  selectedZone === zone.id
                    ? "border-brand-orange text-brand-orange font-bold"
                    : "border-transparent text-onyx-400 hover:text-brand-orange"
                }`}
              >
                {zone.name.split(" ")[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Region Information Cards with Animation */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedZone}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-white border border-gold-200 p-8 rounded-lg shadow-sm hover:shadow-md"
          >
            <div className="col-span-1 md:col-span-4 flex flex-col items-center justify-center p-6 border-b md:border-b-0 md:border-r border-gold-100 text-center space-y-3 shrink-0">
              <div className="w-16 h-16 bg-gold-50 rounded-full flex items-center justify-center text-brand-orange shadow-inner">
                <Coffee className="w-7 h-7" strokeWidth="1" />
              </div>
              <div>
                <span className="block font-serif text-xl font-bold text-onyx-100">{activeZoneInfo.name}</span>
                <span className="block text-[10px] text-brand-orange tracking-wider font-bold mt-0.5">EST. ORIGIN</span>
              </div>
            </div>

            <div className="col-span-1 md:col-span-8 space-y-4">
              <p className="text-sm text-onyx-200 font-light leading-relaxed">
                {activeZoneInfo.description}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="bg-gold-50 p-4 rounded border border-gold-150">
                  <span className="block text-[8px] uppercase tracking-widest text-onyx-400">Altitude Zone</span>
                  <span className="block text-xs font-bold text-onyx-100 mt-1">{activeZoneInfo.altitude}</span>
                </div>
                <div className="bg-gold-50 p-4 rounded border border-gold-150">
                  <span className="block text-[8px] uppercase tracking-widest text-onyx-400">Roast Target</span>
                  <span className="block text-xs font-bold text-onyx-100 mt-1">{activeZoneInfo.roastProfile}</span>
                </div>
                <div className="bg-gold-50 p-4 rounded border border-gold-150">
                  <span className="block text-[8px] uppercase tracking-widest text-[#BBC050] text-onyx-400">Mouthfeel</span>
                  <span className="block text-xs font-bold text-onyx-100 mt-1">{activeZoneInfo.body}</span>
                </div>
              </div>

              <div className="bg-gold-50 border border-gold-200 p-4 rounded-lg">
                <span className="block text-[9px] uppercase tracking-widest text-brand-orange font-bold mb-1 font-sans">Cupping & Scent Notes</span>
                <p className="text-xs text-brand-orange font-medium italic font-serif leading-relaxed">
                  "{activeZoneInfo.flavorNotes}"
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

      </section>

    </div>
  );
}
