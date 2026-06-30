import React from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "motion/react";
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

  // Smooth, spring-eased scroll progress indicator
  const { scrollYProgress } = useScroll();
  const scrollProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 25,
    restDelta: 0.001,
  });

  React.useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("dark");
  }, []);

  // Reset scroll to top on tab change, but smoothly rather than an abrupt jump
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [activeTab]);

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

      {/* Scroll progress indicator */}
      <motion.div
        style={{ scaleX: scrollProgress }}
        className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-brand-orange via-gold-accent to-vibrant-red origin-left z-[60]"
      />

      {/* Premium Navigation Header */}
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      
      {/* Immersive Page Container */}
      <main className="flex-grow pt-24 relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 24, scale: 0.985, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -18, scale: 0.985, filter: "blur(6px)" }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
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
