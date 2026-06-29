import React from "react";
import { Mail, Phone, MapPin, Clock, Calendar, MessageSquare, Send, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import StaticMapVisual from "./StaticMapVisual";

export default function ContactSection() {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [subject, setSubject] = React.useState("General Inquiry");
  const [message, setMessage] = React.useState("");
  const [isSending, setIsSending] = React.useState(false);
  const [isSent, setIsSent] = React.useState(false);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      setIsSent(true);
      setName("");
      setEmail("");
      setMessage("");
    }, 1500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 pb-16">
      
      {/* Contact Header */}
      <div className="text-center space-y-3 pt-6">
        <span className="text-xs uppercase tracking-[0.35em] text-brand-orange font-bold font-sans">
          ETHIOPIAN RESTAURANT ALEXANDRIA VA
        </span>
        <h1 className="text-4xl sm:text-6xl font-serif text-gold-900 font-bold tracking-wide">
          Connect With Us
        </h1>
        <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-brand-orange to-transparent mx-auto" />
        <p className="text-sm font-light text-onyx-300 max-w-xl mx-auto leading-relaxed">
          Questions about our 3-day fermented teff wheat, traditional group seatings, or seeking to book private events in Northern Virginia? Reach out directly.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start max-w-6xl mx-auto">
        
        {/* Left column: Core Contact Metrists & Map */}
        <div className="lg:col-span-5 space-y-8">
          
          <div className="bg-white border border-gold-205 border-gold-200 p-6 sm:p-8 rounded-lg space-y-6 shadow-sm">
            <h3 className="text-lg font-serif font-bold text-gold-900 border-b border-gold-100 pb-3">The Concierge Desks</h3>
            
            <ul className="space-y-4 text-xs font-light text-onyx-200">
              <li className="flex items-start gap-3.5">
                <MapPin className="w-5 h-5 text-brand-orange shrink-0 mt-0.5" />
                <div>
                  <span className="block font-bold text-gold-700 uppercase tracking-wider text-[9px] mb-1">Our Location</span>
                  <a 
                    href="https://maps.google.com/?q=814+King+St,+Alexandria,+VA+22314" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="hover:text-brand-orange transition-colors leading-relaxed font-semibold text-gold-900"
                  >
                    814 King Street, <br />
                    Old Town Alexandria, VA 22314
                  </a>
                </div>
              </li>

              <li className="flex items-start gap-3.5 border-t border-gold-100 pt-4">
                <Phone className="w-5 h-5 text-brand-orange shrink-0 mt-0.5" />
                <div>
                  <span className="block font-bold text-gold-700 uppercase tracking-wider text-[9px] mb-1">Call Booking Desk</span>
                  <a href="tel:+17035550291" className="hover:text-brand-orange transition-colors text-sm font-mono text-brand-orange font-bold">
                    (703) 555-0291
                  </a>
                </div>
              </li>

              <li className="flex items-start gap-3.5 border-t border-gold-100 pt-4">
                <Mail className="w-5 h-5 text-brand-orange shrink-0 mt-0.5" />
                <div>
                  <span className="block font-bold text-gold-700 uppercase tracking-wider text-[9px] mb-1">Concierge Email</span>
                  <a href="mailto:concierge@ferubarestaurant.com" className="hover:text-brand-orange transition-colors font-semibold text-gold-900">
                    concierge@ferubarestaurant.com
                  </a>
                </div>
              </li>
            </ul>
          </div>

          {/* Map Section */}
          <StaticMapVisual />

        </div>

        {/* Right column: Concierge Contact Form */}
        <div className="lg:col-span-7 bg-white border border-gold-200 rounded-lg p-6 sm:p-10 shadow-sm relative">
          
          <AnimatePresence mode="wait">
            {!isSent ? (
              <motion.form
                key="contact-form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSendMessage}
                className="space-y-6 font-light text-xs"
              >
                <div className="space-y-1">
                  <span className="text-[10px] text-brand-orange uppercase tracking-widest font-bold block">PATRON DISPATCH</span>
                  <h3 className="text-xl font-serif text-gold-900 font-bold">Send A Message</h3>
                  <p className="text-xs text-onyx-300 leading-normal">Submit your catering queries or table questions directly to Feru's personal concierge.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase text-gold-700 tracking-wider font-semibold">Your Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Marcus Vance"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-white border border-gold-200 focus:border-brand-orange focus:outline-none rounded p-3 text-gold-900 text-xs shadow-sm"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase text-gold-700 tracking-wider font-semibold">Your Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="marcus@vancegroup.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-white border border-gold-200 focus:border-brand-orange focus:outline-none rounded p-3 text-gold-900 text-xs shadow-sm"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase text-gold-700 tracking-wider font-semibold">Inquiry Category</label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full bg-white border border-gold-200 focus:border-brand-orange focus:outline-none rounded p-3 text-gold-900 text-xs cursor-pointer shadow-sm"
                  >
                    <option value="General Inquiry">General Table / Tasting Inquiry</option>
                    <option value="Catering & Banquets">Custom Catering Banquet Virginia</option>
                    <option value="Private Tasting event">Private Dining Room Reserve Info</option>
                    <option value="Dietary & Soucing">Dietary Ingredients (Teff, Spices) Info</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase text-gold-700 tracking-wider font-semibold font-sans">Message</label>
                  <textarea
                    rows={5}
                    required
                    placeholder="e.g. Seeking information regarding group reservations for 12 colleagues next Wednesday, we'd love to request the premium traditional coffee ceremony poured directly for us..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-white border border-gold-200 focus:border-brand-orange focus:outline-none rounded p-3 text-gold-900 text-xs leading-relaxed shadow-sm"
                  />
                </div>

                <div className="pt-4 border-t border-gold-100 flex justify-end">
                  <button
                    type="submit"
                    disabled={isSending}
                    className="w-full sm:w-auto px-8 py-3.5 bg-brand-orange hover:bg-vibrant-red disabled:bg-gold-300 text-white font-bold uppercase tracking-widest text-xs rounded transition-all flex items-center justify-center gap-2 shadow-gold-glow cursor-pointer duration-300"
                  >
                    {isSending ? (
                      <>
                        <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Sending Message...
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        Send Dispatch
                      </>
                    )}
                  </button>
                </div>
              </motion.form>
            ) : (
              <motion.div
                key="contact-success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="text-center space-y-6 py-12"
              >
                <div className="w-16 h-16 bg-gold-100 border border-gold-300 rounded-full flex items-center justify-center text-brand-orange mx-auto shadow-inner">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <div className="space-y-2">
                  <h3 className="text-2xl font-serif text-gold-900 font-bold">Dispatch Received</h3>
                  <p className="text-xs text-onyx-300 max-w-sm mx-auto leading-relaxed font-light">
                    Your message has been safely funneled. Our King Street concierge typically reviews and returns replies within 2-4 hours. Thank you.
                  </p>
                </div>

                <button
                  onClick={() => setIsSent(false)}
                  className="px-6 py-2.5 bg-white border border-gold-300 text-gold-700 hover:text-white hover:bg-brand-orange hover:border-brand-orange font-bold text-xs uppercase tracking-widest rounded transition-all cursor-pointer shadow-sm duration-300"
                >
                  Send Another Message
                </button>
              </motion.div>
            )}
          </AnimatePresence>

        </div>

      </div>

    </div>
  );
}
