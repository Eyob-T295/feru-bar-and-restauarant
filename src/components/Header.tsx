import React from "react";
import { Menu, X, Calendar, Phone, Sun, Moon } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
// @ts-ignore
import feruLogoCustom from "../assets/images/ferulogo.png";
// @ts-ignore
import feruLogoGenerated from "../assets/images/feru_logo_1781787714859.jpg";

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Header(props: HeaderProps) {
  const { activeTab, setActiveTab } = props;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [logoSource, setLogoSource] = React.useState<"custom" | "generated" | "fallback">("custom");

  const navItems = [
    { id: "home", label: "Home" },
    { id: "about", label: "About Us" },
    { id: "menu", label: "Menu" },
    { id: "coffee", label: "Ceremony" },
    { id: "reservations", label: "Reservations" },
    { id: "contact", label: "Contact" },
  ];

  const handleNavClick = (tabId: string) => {
    setActiveTab(tabId);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-onyx-950/90 backdrop-blur-md border-b border-gold-900/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          
          {/* Brand Logo Lockup with ferulogo.png support */}
          <div 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => handleNavClick("home")}
          >
            {logoSource === "custom" && (
              <img 
                src={feruLogoCustom} 
                alt="Feru Custom Logo" 
                className="w-16 h-16 sm:w-18 sm:h-18 object-contain rounded-md transition-transform duration-300 group-hover:scale-105"
                onError={() => setLogoSource("generated")}
              />
            )}
            {logoSource === "generated" && (
              <img 
                src={feruLogoGenerated} 
                alt="Feru Logo" 
                className="w-16 h-16 sm:w-18 sm:h-18 object-cover rounded-md border border-brand-orange transition-transform duration-300 group-hover:scale-105 shadow-md"
                onError={() => setLogoSource("fallback")}
              />
            )}
            {logoSource === "fallback" && (
              <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-full bg-gradient-to-br from-brand-orange to-coffee-deep border-2 border-brand-orange flex items-center justify-center font-serif text-white text-2xl font-bold shadow-gold-glow transition-transform duration-300 group-hover:scale-105">
                F
              </div>
            )}
            
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-xl sm:text-2xl font-serif font-black tracking-[0.25em] text-onyx-100 group-hover:text-brand-orange transition-colors uppercase duration-300">
                  FERU
                </span>
                <div className="w-2 h-2 rounded-full bg-brand-orange self-center mt-0.5"></div>
              </div>
              <span className="text-[10px] sm:text-[11px] tracking-[0.3em] font-extrabold text-[#8F7255] group-hover:text-brand-orange transition-colors uppercase duration-300">
                Bar & Restaurant
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center space-x-4 xl:space-x-6">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`relative text-[11px] font-semibold tracking-wider uppercase transition-colors duration-300 py-2 ${
                  activeTab === item.id 
                    ? "text-gold-accent" 
                    : "text-onyx-300 hover:text-gold-accent"
                }`}
              >
                {item.label}
                {activeTab === item.id && (
                  <motion.div
                     layoutId="activeNavLine"
                     className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-brand-orange via-gold-accent to-brand-orange"
                     transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </nav>

          <div className="hidden xl:flex items-center space-x-4">

            <a 
              href="tel:+17035550291" 
              className="flex items-center text-xs tracking-wider text-onyx-300 hover:text-gold-accent transition-colors duration-300 mr-2"
            >
              <Phone className="w-3.5 h-3.5 mr-1.5 text-brand-orange" />
              (703) 555-0291
            </a>
            <button
              id="header_reserve_btn"
              onClick={() => handleNavClick("reservations")}
              className="relative px-5 py-2.5 overflow-hidden group rounded bg-brand-orange hover:bg-vibrant-red border border-brand-orange/45 text-[11px] font-semibold uppercase tracking-[0.18em] text-white hover:text-white shadow-gold-glow transition-all duration-300"
            >
              <span className="relative z-10 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                Reserve Table
              </span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex xl:hidden items-center space-x-2">

            <button
              id="mobile_reserve_btn"
              onClick={() => handleNavClick("reservations")}
              className="p-2 text-gold-400 hover:text-gold-300 transition-colors sm:hidden"
              aria-label="Reservations"
            >
              <Calendar className="w-5.5 h-5.5" />
            </button>
            <button
              id="mobile_hamburger_btn"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-onyx-300 hover:text-gold-400 transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="xl:hidden border-t border-gold-900/50 bg-onyx-950 overflow-hidden"
          >
            <div className="px-4 pt-4 pb-8 space-y-2 max-h-[80vh] overflow-y-auto">
              {navItems.map((item, idx) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  onClick={() => handleNavClick(item.id)}
                  className={`block w-full text-left py-3 px-4 rounded text-sm tracking-widest uppercase transition-all ${
                    activeTab === item.id
                      ? "text-brand-orange bg-gold-950/5 border-l-2 border-brand-orange pl-4 font-semibold"
                      : "text-onyx-300 hover:text-brand-orange pl-2"
                  }`}
                >
                  {item.label}
                </motion.button>
              ))}
              
              <div className="pt-6 border-t border-gold-900/30 px-2 space-y-4">
                <a 
                  href="tel:+17035550291" 
                  className="flex items-center text-xs tracking-widest text-onyx-300 uppercase"
                >
                  <Phone className="w-4 h-4 mr-3 text-gold-500" />
                  (703) 555-0291
                </a>
                <button
                  id="mobile_drawer_reserve_btn"
                  onClick={() => handleNavClick("reservations")}
                  className="w-full flex items-center justify-center gap-2 py-3 bg-brand-orange text-white font-bold tracking-[0.2em] rounded text-xs uppercase transition-all shadow-gold-glow hover:bg-vibrant-red"
                >
                  <Calendar className="w-4 h-4" />
                  Reserve A Table
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
