import React from "react";
import { Mail, Phone, Sliders, DollarSign, Gift, CheckCircle, ShieldAlert, Award } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { CateringQuote } from "../types";

export default function CateringSection() {
  const [guestCount, setGuestCount] = React.useState(25);
  const [selectedPackage, setSelectedPackage] = React.useState<"sheba" | "ezana" | "lounge">("sheba");
  const [isProposed, setIsProposed] = React.useState(false);
  const [isSubmittingProposal, setIsSubmittingProposal] = React.useState(false);

  // Proposal form structure
  const [proposal, setProposal] = React.useState<CateringQuote>({
    name: "",
    email: "",
    phone: "",
    date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 14 days out default
    guests: 25,
    serviceType: "Family Style"
  });

  const packages = {
    sheba: {
      name: "Queen Sheba Banquet",
      costPerGuest: 38,
      setup: "Traditional Family Banquet",
      inclusion: "3 Appetizers, 3 Meat Specials, 4 Vegetarian Sides, Sourdough Injera, House Honey Dressing salad, Spiced Tea Bar.",
      description: "Ideal for intimate family alliances, milestone birthdays, and beautiful wedding rehearsals."
    },
    ezana: {
      name: "King Ezana Royal Banquet",
      costPerGuest: 55,
      setup: "Full-Service live station which includes Mobile Coffee Ceremony",
      inclusion: "4 Appetizers, 4 Meat Specials, All Vegetarian Dishes (Shiro live pot), Desserts, Traditional Coffee Ceremony live on location.",
      description: "Our crown jewel. Includes a complete mobile charcoal stove setup, clay Jebena pouring, incense smoke, and active servers on scene."
    },
    lounge: {
      name: "Modern Lounge & Cocktail Mixer",
      costPerGuest: 32,
      setup: "Passed Hors d'oeuvres & Cocktail Stations",
      inclusion: "Mini crispy beef/lentil Sambusas, roasted cardamon sliders, seared Asa Tibs skewers, and open craft Tej Slings drink bars.",
      description: "Tailored for sophisticated art gallery launches, tech meetups, and upscale corporate receptions."
    }
  };

  const activePackageData = packages[selectedPackage];

  // Dynamic calculations
  const baseFoodCost = guestCount * activePackageData.costPerGuest;
  const staffSurcharge = guestCount > 50 ? 350 : 200; // staffing scales with party sizes
  const logisticsFee = 150; // set flat rate
  const estimatedTax = Math.round((baseFoodCost + staffSurcharge + logisticsFee) * 0.08); // VA Food Tax
  const grandTotal = baseFoodCost + staffSurcharge + logisticsFee + estimatedTax;

  const handleProposalSubmission = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingProposal(true);
    setTimeout(() => {
      setIsSubmittingProposal(false);
      setIsProposed(true);
    }, 1500);
  };

  const resetProposal = () => {
    setIsProposed(false);
    setProposal({
      name: "",
      email: "",
      phone: "",
      date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      guests: 25,
      serviceType: "Family Style"
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 pb-16">
      
      {/* Catering Page Header */}
      <div className="text-center space-y-3 pt-6">
        <span className="text-xs uppercase tracking-[0.35em] text-gold-500 font-semibold font-sans">
          ETHIOPIAN CATERING VIRGINIA
        </span>
        <h1 className="text-4xl sm:text-6xl font-serif text-white font-bold tracking-wide">
          Banquets & Catering
        </h1>
        <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-gold-500 to-transparent mx-auto" />
        <p className="text-sm font-light text-onyx-400 max-w-xl mx-auto leading-relaxed">
          Elevate your corporate banquet, milestone gala, or wedding in Northern Virginia with the soulful spice, beautiful colors, and legendary hospitality of Feru.
        </p>
      </div>

      {/* Interactive Cost Estimator & Slider Panel */}
      <section className="bg-onyx-900/30 border border-gold-900/20 rounded-lg p-6 sm:p-10 shadow-2xl space-y-8 max-w-5xl mx-auto">
        <div className="text-center space-y-1 border-b border-onyx-800 pb-4">
          <span className="text-[10px] text-gold-400 tracking-widest font-bold uppercase block">Interactive Estimator</span>
          <h3 className="text-2xl font-serif font-bold text-white">Create Your Custom Proposal</h3>
          <p className="text-xs text-onyx-400 font-light">Choose a banquet framework and adjust guest count to view live estimates.</p>
        </div>

        {/* 1. Select Package Frame */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {(Object.keys(packages) as Array<keyof typeof packages>).map((pkgKey) => {
            const isSelected = selectedPackage === pkgKey;
            return (
              <button
                key={pkgKey}
                onClick={() => {
                  setSelectedPackage(pkgKey);
                  setProposal(p => ({ ...p, guests: guestCount }));
                }}
                className={`p-5 rounded-lg text-left border transition-all ${
                  isSelected
                    ? "bg-gold-950/20 border-gold-500 shadow-lg scale-102"
                    : "bg-onyx-950 border-onyx-900 text-onyx-300 hover:border-gold-900/35"
                }`}
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="block font-serif text-sm font-bold text-white">{packages[pkgKey].name}</span>
                  <span className="font-serif text-gold-400 text-xs font-semibold">${packages[pkgKey].costPerGuest}/guest</span>
                </div>
                <p className="text-[11px] text-onyx-400 font-light leading-relaxed mb-3">{packages[pkgKey].description}</p>
                <span className="block text-[8.5px] uppercase tracking-wider text-gold-500 font-semibold">Includes: {packages[pkgKey].setup.split(" live ")[0]}</span>
              </button>
            );
          })}
        </div>

        {/* 2. Interactive Guest Count Slider */}
        <div className="bg-onyx-950 p-6 rounded border border-onyx-900 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="col-span-1 md:col-span-8 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-xs font-semibold text-white uppercase tracking-wider">Adjust Guests Capacity</span>
              <span className="font-mono text-lg text-gold-400 font-bold">{guestCount} Guests</span>
            </div>
            <input
              type="range"
              min="15"
              max="250"
              step="5"
              value={guestCount}
              onChange={(e) => {
                const count = parseInt(e.target.value);
                setGuestCount(count);
                setProposal(p => ({ ...p, guests: count }));
              }}
              className="w-full h-1.5 bg-onyx-800 rounded-lg appearance-none cursor-pointer accent-gold-500 focus:outline-none"
            />
            <div className="flex justify-between text-[10px] text-onyx-500">
              <span>Min: 15 guests</span>
              <span>Max: 250 guests</span>
            </div>
          </div>

          <div className="col-span-1 md:col-span-4 bg-onyx-900/60 p-4 rounded border border-onyx-800 text-center space-y-1">
            <span className="text-[10px] text-onyx-400 uppercase tracking-widest block">Selected Setup</span>
            <span className="block font-serif text-base text-gold-300 font-medium">{activePackageData.name}</span>
            <p className="text-[10px] text-onyx-500 italic">Simulated Setup Value: ${activePackageData.costPerGuest} / plate</p>
          </div>
        </div>

        {/* 3. Live Cost Calculation Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-4 border-t border-onyx-800">
          <div className="lg:col-span-5 space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-gold-400">Package Inclusions:</h4>
            <p className="text-xs text-onyx-300 font-light leading-relaxed">
              {activePackageData.inclusion}
            </p>
            <div className="bg-gold-950/10 border border-gold-900/30 p-4 rounded-lg flex items-start gap-2.5">
              <Award className="w-5 h-5 text-gold-400 shrink-0" strokeWidth="1" />
              <p className="text-[10.5px] text-onyx-400 font-light leading-normal">
                All ingredients are prepared strictly fresh on the morning of your banquet. Sourdough sourdough-injera bread and gluten-free teff roll options are fully baked by our core chefs.
              </p>
            </div>
          </div>

          <div className="lg:col-span-7 bg-onyx-950 p-6 rounded border border-onyx-900 space-y-3.5">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-white border-b border-onyx-900 pb-2 flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-gold-500" />
              Est. Financial Matrix
            </h4>
            
            <div className="space-y-2 text-xs font-light">
              <div className="flex justify-between text-onyx-400">
                <span>Food & Beverage Preparation ({guestCount} x ${activePackageData.costPerGuest})</span>
                <span className="font-mono text-white">${baseFoodCost.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-onyx-400">
                <span>Professional Catering Crew & Live Stations (100% Chef-led)</span>
                <span className="font-mono text-white">${staffSurcharge}</span>
              </div>
              <div className="flex justify-between text-onyx-400">
                <span>Alexandria Logistics & Local Travel</span>
                <span className="font-mono text-white">${logisticsFee}</span>
              </div>
              <div className="flex justify-between text-onyx-400">
                <span>Estimated Virginia State Food Surcharges (8%)</span>
                <span className="font-mono text-white">${estimatedTax}</span>
              </div>
              <div className="h-[1px] bg-onyx-900 my-2" />
              <div className="flex justify-between text-sm uppercase">
                <span className="font-semibold text-gold-300 tracking-wider">Estimated Grand Proposal Price</span>
                <span className="font-mono text-gold-400 font-bold">${grandTotal.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Corporate propose / Client details form */}
      <section className="bg-onyx-900/10 border border-gold-900/15 p-6 sm:p-10 rounded-lg max-w-4xl mx-auto shadow-2xl relative">
        <div className="text-center space-y-2 mb-8 border-b border-onyx-900 pb-5">
          <span className="text-[10px] text-gold-500 uppercase tracking-widest font-bold">VIRGINIA CATERING CORPS</span>
          <h2 className="text-2xl font-serif text-white font-bold">Request Catering Proposal</h2>
          <p className="text-xs text-onyx-400 font-light">Complete our checklist for King Ezana and Queen Sheba bookings across Alexandria/VA/DC.</p>
        </div>

        <AnimatePresence mode="wait">
          {!isProposed ? (
            <motion.form
              key="catering-form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onSubmit={handleProposalSubmission}
              className="space-y-6 font-light text-xs"
            >
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase text-onyx-400 tracking-wider font-semibold">Contact Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Marcus Vance"
                    value={proposal.name}
                    onChange={(e) => setProposal(p => ({ ...p, name: e.target.value }))}
                    className="w-full bg-onyx-950 border border-onyx-800 focus:border-gold-500 focus:outline-none rounded p-3 text-gold-100 text-xs text-left"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase text-onyx-400 tracking-wider font-semibold">Contact Corporate Email</label>
                  <input
                    type="email"
                    required
                    placeholder="marcus@vancegroup.com"
                    value={proposal.email}
                    onChange={(e) => setProposal(p => ({ ...p, email: e.target.value }))}
                    className="w-full bg-onyx-950 border border-onyx-800 focus:border-gold-500 focus:outline-none rounded p-3 text-gold-100 text-xs"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase text-onyx-400 tracking-wider font-semibold">Phone Contact</label>
                  <input
                    type="tel"
                    required
                    placeholder="(703) 555-0155"
                    value={proposal.phone}
                    onChange={(e) => setProposal(p => ({ ...p, phone: e.target.value }))}
                    className="w-full bg-onyx-950 border border-onyx-800 focus:border-gold-500 focus:outline-none rounded p-3 text-gold-100 text-xs"
                  />
                </div>

              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase text-onyx-400 tracking-wider font-semibold">Target Event Date</label>
                  <input
                    type="date"
                    required
                    value={proposal.date}
                    onChange={(e) => setProposal(p => ({ ...p, date: e.target.value }))}
                    className="w-full bg-onyx-950 border border-onyx-800 focus:border-gold-500 focus:outline-none rounded p-3 text-gold-100 text-xs cursor-pointer"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase text-onyx-400 tracking-wider font-semibold">Exact Headcount</label>
                  <input
                    type="number"
                    required
                    min="15"
                    max="1000"
                    value={proposal.guests}
                    onChange={(e) => {
                      const val = parseInt(e.target.value) || 15;
                      setProposal(p => ({ ...p, guests: val }));
                      setGuestCount(val);
                    }}
                    className="w-full bg-onyx-950 border border-onyx-800 focus:border-gold-500 focus:outline-none rounded p-3 text-gold-100 text-xs"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase text-onyx-400 tracking-wider font-semibold">Desired Service Styling</label>
                  <select
                    value={proposal.serviceType}
                    onChange={(e) => setProposal(p => ({ ...p, serviceType: e.target.value as any }))}
                    className="w-full bg-onyx-950 border border-onyx-800 focus:border-gold-500 focus:outline-none rounded p-3 text-gold-100 text-xs appearance-none cursor-pointer"
                  >
                    <option value="Family Style">Family Style Sharing</option>
                    <option value="Plated Dinner">Modern Plated Dinner</option>
                    <option value="Full Buffet">Staffed Buffet Station</option>
                    <option value="Lounge & Cocktails">Passed Trays & Hor d'oeuvres</option>
                  </select>
                </div>

              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] uppercase text-onyx-400 tracking-wider font-semibold">Dietary Excluders or General Remarks (e.g. Halal, Vegan, Nut Allergies)</label>
                <textarea
                  rows={3}
                  placeholder="Need 10 plates entirely halal, preferring several teff flour gluten-free options. Corporate backdrop details..."
                  className="w-full bg-onyx-950 border border-onyx-800 focus:border-gold-500 focus:outline-none rounded p-3 text-gold-100 text-xs leading-relaxed"
                />
              </div>

              <div className="pt-4 flex items-center justify-between border-t border-onyx-900 gap-4 flex-col sm:flex-row text-center sm:text-left">
                <p className="text-onyx-500 text-[10.5px]">
                  * Proposals are reviewed by concierge within 1 business day.
                </p>
                
                <button
                  type="submit"
                  disabled={isSubmittingProposal}
                  className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-br from-gold-600 to-gold-700 disabled:from-onyx-850 disabled:text-onyx-600 font-bold uppercase tracking-widest text-onyx-950 rounded shadow-md hover:scale-101 active:scale-99 transition-all"
                >
                  {isSubmittingProposal ? "Dispatched Request..." : "Request Proposal Plan"}
                </button>
              </div>
            </motion.form>
          ) : (
            <motion.div
              key="catering-success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="text-center space-y-6 py-6"
            >
              <div className="w-16 h-16 bg-gold-950 border border-gold-500/30 rounded-full flex items-center justify-center text-gold-400 mx-auto">
                <CheckCircle className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl font-serif text-white font-bold">Proposal Request Dispatched</h3>
                <p className="text-xs text-onyx-400 max-w-sm mx-auto leading-relaxed">
                  Thank you, <strong className="text-gold-300">{proposal.name}</strong>. Our custom events coordinator is assembling your banquet package for {proposal.guests} guests on {proposal.date}.
                </p>
              </div>

              <div className="max-w-md bg-onyx-950 p-6 rounded border border-onyx-900 text-left text-xs mx-auto space-y-2">
                <span className="text-[10px] text-onyx-500 uppercase tracking-widest block font-bold border-b border-onyx-900 pb-1.5 mb-2">Proposal Summary Target</span>
                <div className="flex justify-between"><span>Invoiced Client:</span><span className="text-white font-medium">{proposal.name}</span></div>
                <div className="flex justify-between"><span>Events Framework:</span><span className="text-white font-medium">{activePackageData.name}</span></div>
                <div className="flex justify-between"><span>Attendees Code:</span><span className="text-white font-medium">{proposal.guests} guests</span></div>
                <div className="flex justify-between"><span>Virginia Logistics Date:</span><span className="text-white font-medium">{proposal.date}</span></div>
                <div className="flex justify-between border-t border-onyx-900 pt-2 text-sm uppercase">
                  <span className="font-bold text-gold-400">Est. Retainer</span>
                  <span className="font-mono text-gold-350 font-bold">${grandTotal.toLocaleString()}</span>
                </div>
              </div>

              <button
                onClick={resetProposal}
                className="px-6 py-2.5 bg-onyx-950 border border-gold-800 text-gold-400 hover:text-white hover:border-gold-500 font-bold text-xs uppercase tracking-widest rounded transition-all"
              >
                Submit Alternative Proposal
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

    </div>
  );
}
