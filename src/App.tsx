import React from "react";
import { motion, AnimatePresence } from "motion/react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeSection from "./components/HomeSection";
import MenuSection from "./components/MenuSection";
import CoffeeSection from "./components/CoffeeSection";
import ReservationsSection from "./components/ReservationsSection";
import EventsSection from "./components/EventsSection";
import CateringSection from "./components/CateringSection";
import AboutSection from "./components/AboutSection";
import ContactSection from "./components/ContactSection";
import { GlobalThreeDBackground } from "./components/ThreeDHelper";

export default function App() {
  const [activeTab, setActiveTab] = React.useState<string>("home");
  const [theme, setTheme] = React.useState<"dark" | "light">(() => {
    const saved = localStorage.getItem("feru-theme");
    return (saved as "dark" | "light") || "light";
  });

  React.useEffect(() => {
    localStorage.setItem("feru-theme", theme);
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  // Renders the correct visual section based on active state
  const renderActiveSection = () => {
    switch (activeTab) {
      case "home":
        return <HomeSection setActiveTab={setActiveTab} />;
      case "menu":
        return <MenuSection />;
      case "coffee":
        return <CoffeeSection />;
      case "reservations":
        return <ReservationsSection />;
      case "events":
        return <EventsSection />;
      case "catering":
        return <CateringSection />;
      case "about":
        return <AboutSection />;
      case "contact":
        return <ContactSection />;
      default:
        return <HomeSection setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-onyx-950 flex flex-col justify-between selection:bg-gold-500 selection:text-onyx-950 font-sans text-onyx-100 antialiased overflow-x-hidden relative">
      
      {/* GLOBAL PERSISTENT 3D BACKGROUND (COFFEE BEAN JOURNEY) */}
      <GlobalThreeDBackground />

      {/* Premium Navigation Header */}
      <Header activeTab={activeTab} setActiveTab={setActiveTab} theme={theme} toggleTheme={toggleTheme} />
      
      {/* Immersive Page Container */}
      <main className="flex-grow pt-24 relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            {renderActiveSection()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Luxury Brand Footer */}
      <Footer setActiveTab={setActiveTab} />
      
    </div>
  );
}
