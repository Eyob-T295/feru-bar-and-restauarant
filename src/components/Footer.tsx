import React from "react";
import { Mail, Clock, MapPin, Phone, Instagram, Facebook } from "lucide-react";
import { motion } from "motion/react";

interface FooterProps {
  setActiveTab: (tab: string) => void;
}

export default function Footer(props: FooterProps) {
  const { setActiveTab } = props;
  const [email, setEmail] = React.useState("");
  const [subscribed, setSubscribed] = React.useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  const handleLinkClick = (tabId: string) => {
    setActiveTab(tabId);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-onyx-950 border-t border-gold-900/40 text-onyx-200 pt-20 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand & Introduction */}
          <div className="space-y-6">
            <div className="flex flex-col cursor-pointer" onClick={() => handleLinkClick("home")}>
              <span className="text-2xl font-serif font-semibold tracking-[0.2em] text-gold-400 uppercase">
                FERU
              </span>
              <span className="text-[9px] tracking-[0.3em] uppercase text-onyx-400">
                Bar & Restaurant
              </span>
            </div>
            <p className="text-sm text-onyx-400 font-light leading-relaxed">
              Crafting premium Ethiopian fine dining experiences, authentic coffee ceremonies, and custom herbal cocktails in the heart of historic Alexandria, Virginia.
            </p>
            <div className="flex items-center space-x-3">
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noreferrer" 
                className="w-10 h-10 rounded-full border border-onyx-800 flex items-center justify-center text-onyx-400 hover:text-gold-400 hover:border-gold-500/50 transition-all duration-300"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noreferrer" 
                className="w-10 h-10 rounded-full border border-onyx-800 flex items-center justify-center text-onyx-400 hover:text-gold-400 hover:border-gold-500/50 transition-all duration-300"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Practical Contact Info */}
          <div className="space-y-6">
            <h4 className="text-xs font-semibold uppercase tracking-[0.25em] text-gold-300">
              CULTURE & CONTACT
            </h4>
            <ul className="space-y-4 text-sm text-onyx-400 font-light">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-gold-500 mt-1 shrink-0" />
                <span>
                  814 King Street,<br />Alexandria, VA 22314
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-gold-500 shrink-0" />
                <a href="tel:+17035550291" className="hover:text-gold-300 transition-colors">
                  (703) 555-0291
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-gold-500 shrink-0" />
                <a href="mailto:concierge@ferubarestaurant.com" className="hover:text-gold-300 transition-colors">
                  concierge@ferubarestaurant.com
                </a>
              </li>
            </ul>
          </div>

          {/* Operating Hours */}
          <div className="space-y-6">
            <h4 className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-orange">
              OPERATING HOURS
            </h4>
            <div className="space-y-3 text-sm text-onyx-300 font-light">
              <div className="flex justify-between border-b border-onyx-900/60 pb-1.5">
                <span>Mon – Thu</span>
                <span className="text-gold-300 font-medium">4:00 PM – 11:00 PM</span>
              </div>
              <div className="flex justify-between border-b border-onyx-900/60 pb-1.5">
                <span>Friday</span>
                <span className="text-gold-300 font-medium">4:00 PM – 1:00 AM</span>
              </div>
              <div className="flex justify-between border-b border-onyx-900/60 pb-1.5">
                <span>Saturday</span>
                <span className="text-gold-300 font-medium">2:00 PM – 1:00 AM</span>
              </div>
              <div className="flex justify-between pb-1.5">
                <span>Sunday</span>
                <span className="text-gold-300 font-medium">11:30 AM – 10:00 PM</span>
              </div>
              <p className="text-[11px] text-brand-orange font-serif italic mt-2">
                * Traditional Ethiopian Coffee Ceremony held daily starting at 5:00 PM.
              </p>
            </div>
          </div>

          {/* Newsletter Subscribe */}
          <div className="space-y-6">
            <h4 className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-orange">
              NEWS & SOUL
            </h4>
            <p className="text-sm text-onyx-300 font-light leading-relaxed">
              Subscribe to unlock VIP invitations to organic wine tastings, live Habesha acoustic sessions, and seasonal recipes.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Your gourmet email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-black/40 border border-gold-950 focus:border-brand-orange focus:outline-none rounded px-4 py-3 text-xs placeholder:text-onyx-400 text-white transition-all"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-2 px-3 py-1 bg-brand-orange text-white text-[10px] font-bold uppercase tracking-wider rounded transition-all hover:bg-vibrant-red cursor-pointer"
                >
                  Join
                </button>
              </div>
              {subscribed && (
                <motion.p
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-xs text-brand-orange font-serif mt-1"
                >
                  Welcome to the Feru Circle. Your invitation is on its way.
                </motion.p>
              )}
            </form>
          </div>

        </div>

        {/* Lower Footer Details */}
        <div className="border-t border-onyx-900 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-onyx-500 font-light">
          <div className="flex flex-wrap justify-center sm:justify-start gap-x-6 gap-y-2">
            <button onClick={() => handleLinkClick("about")} className="hover:text-gold-400 transition-colors">Origins</button>
            <button onClick={() => handleLinkClick("menu")} className="hover:text-gold-400 transition-colors">Menu</button>
            <button onClick={() => handleLinkClick("coffee")} className="hover:text-gold-400 transition-colors">Ceremony</button>
            <button onClick={() => handleLinkClick("reservations")} className="hover:text-gold-400 transition-colors font-semibold">Reserve</button>
          </div>
          <p className="text-center sm:text-right">
            &copy; {new Date().getFullYear()} Feru Bar & Restaurant. All rights reserved.<br />
            <span className="font-serif italic text-[11px] text-onyx-600">Alexandria, Virginia • Authentic Elevates</span>
          </p>
        </div>

      </div>
    </footer>
  );
}
