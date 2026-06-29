import React from "react";
import { Music, GlassWater, Sparkles, Calendar, Ticket, CheckCircle2, CircleAlert } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface Event {
  id: string;
  title: string;
  category: "Jazz" | "Traditional Music" | "Wine & Drinks" | "Cultural Arts";
  day: string;
  time: string;
  dateStr: string;
  coverPrice: string;
  description: string;
  image: string;
  highlights: string[];
}

export default function EventsSection() {
  const [selectedEventId, setSelectedEventId] = React.useState<string | null>(null);
  const [rsvpName, setRsvpName] = React.useState("");
  const [rsvpEmail, setRsvpEmail] = React.useState("");
  const [rsvpCount, setRsvpCount] = React.useState(2);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [rsvpConfirmed, setRsvpConfirmed] = React.useState(false);

  const eventsList: Event[] = [
    {
      id: "ev-1",
      title: "Ethio-Jazz Thursdays",
      category: "Jazz",
      day: "Every Thursday",
      time: "8:00 PM – 11:30 PM",
      dateStr: "Weekly Experience",
      coverPrice: "Complimentary for Diners",
      description: "Enjoy live tributes to Ethio-Jazz pioneer Mulatu Astatke. Led by premier DC horn and rhythm musicians, experience a hypnotic fusion of brass accents, minor pentatonic scales, and classic Afro-funk.",
      image: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?q=80&w=600&auto=format&fit=crop",
      highlights: [
        "Live brass octet",
        "Handcrafted spiced cardamon side cocktails",
        "Dim romantic candle lighting",
        "Bar reservation highly suggested"
      ]
    },
    {
      id: "ev-2",
      title: "Traditional Acoustic Habesha Nights",
      category: "Traditional Music",
      day: "Saturdays",
      time: "7:00 PM – 10:00 PM",
      dateStr: "Bi-Weekly",
      coverPrice: "$15 or free with Chef's Menu",
      description: "An intimate acoustic concert celebrating historic Ethiopian stringed instruments. Enjoy beautiful solos on the single-stringed Masinqo fiddle, six-stringed Krar lyre, and wooden Washint flute.",
      image: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?q=80&w=600&auto=format&fit=crop",
      highlights: [
        "Authentic Krar & Masinqo arrangements",
        "Immersive poetry reading in Amharic & English",
        "Ketema (fresh grass) mats laid",
        "Complimentary glass of house Tej honey wine"
      ]
    },
    {
      id: "ev-3",
      title: "Rift Valley Shiraz & Tej Wine Tastings",
      category: "Wine & Drinks",
      day: "First Tuesday of the Month",
      time: "6:30 PM – 8:30 PM",
      dateStr: "Monthly Special",
      coverPrice: "$45/person",
      description: "Explore volcanic soils of the Ethiopian Rift Valley. Guided by our sommelier, taste complex Rift Valley Shiraz wines paired perfectly with gourmet appetizer bites from Chef Feru.",
      image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=600&auto=format&fit=crop",
      highlights: [
        "Tasting flight of 4 selected reserve wines",
        "Gourmet culinary appetizer bites from Chef Feru",
        "In-depth discussion on East African volcanic soil viticulture",
        "Exclusive pricing on rare bottle orders"
      ]
    }
  ];

  const handleRsvpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setRsvpConfirmed(true);
      setRsvpName("");
      setRsvpEmail("");
    }, 1200);
  };

  const activeEvent = eventsList.find(ev => ev.id === selectedEventId);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 pb-16">
      
      {/* Events Page Header */}
      <div className="text-center space-y-3 pt-6">
        <span className="text-xs uppercase tracking-[0.35em] text-gold-500 font-semibold font-sans">
          CULTIVATING ATMOSPHERE
        </span>
        <h1 className="text-4xl sm:text-6xl font-serif text-white font-bold tracking-wide">
          Events & Gatherings
        </h1>
        <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-gold-500 to-transparent mx-auto" />
        <p className="text-sm font-light text-onyx-400 max-w-xl mx-auto leading-relaxed">
          From soulful Ethio-Jazz sessions to volcanic wine flights, we curate experiences that feed the mind as well as the palette.
        </p>
      </div>

      {/* Main Events Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {eventsList.map((ev) => (
          <div
            key={ev.id}
            className="bg-onyx-900/30 border border-onyx-900 hover:border-gold-900/20 rounded-lg overflow-hidden flex flex-col justify-between group transition-all duration-300 shadow-xl"
          >
            <div className="relative h-60 bg-onyx-950 overflow-hidden">
              <img
                src={ev.image}
                alt={ev.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter brightness-90"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-onyx-950/80 via-transparent to-transparent" />
              
              {/* Category tag */}
              <span className="absolute top-4 left-4 bg-gold-950/90 border border-gold-400/40 text-[10px] uppercase tracking-widest text-gold-400 font-bold px-3 py-1.5 rounded shadow">
                {ev.category}
              </span>

              {/* Day badge */}
              <span className="absolute bottom-4 right-4 bg-onyx-950/80 backdrop-blur border border-onyx-800 text-onyx-300 text-[10px] px-2.5 py-1 rounded">
                {ev.day}
              </span>
            </div>

            <div className="p-6 flex flex-col flex-grow justify-between space-y-5">
              <div className="space-y-3">
                <span className="text-[10px] uppercase font-bold text-gold-500 tracking-wider font-sans block">{ev.time}</span>
                <h3 className="text-xl font-serif text-white font-bold group-hover:text-gold-300 transition-colors">
                  {ev.title}
                </h3>
                <p className="text-xs text-onyx-400 font-light leading-relaxed">
                  {ev.description}
                </p>
              </div>

              <div className="space-y-4 pt-4 border-t border-onyx-900">
                {/* Highlights List */}
                <ul className="space-y-1.5">
                  {ev.highlights.slice(0, 3).map((hl, i) => (
                    <li key={i} className="flex items-center gap-2 text-[10.5px] text-onyx-300 font-light">
                      <span className="w-1.5 h-1.5 rounded-full bg-gold-500 flex-shrink-0" />
                      <span>{hl}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => {
                    setSelectedEventId(ev.id);
                    setRsvpConfirmed(false);
                  }}
                  className="w-full py-2.5 border border-gold-900/40 hover:border-gold-500 text-gold-400 hover:text-white text-xs font-bold uppercase tracking-wider rounded transition-all bg-onyx-950/50 flex items-center justify-center gap-2"
                >
                  <Ticket className="w-3.5 h-3.5 text-gold-500" />
                  RSVP For Tables
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* RSVP Modal Overlay */}
      <AnimatePresence>
        {selectedEventId && activeEvent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedEventId(null)}
              className="absolute inset-0 bg-onyx-950"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative bg-onyx-900 border border-gold-900/40 rounded-lg p-6 sm:p-10 max-w-lg w-full shadow-2xl space-y-6 z-10"
            >
              <div className="flex justify-between items-start gap-4">
                <div className="space-y-1">
                  <span className="text-[9px] uppercase tracking-widest text-gold-500 font-bold">{activeEvent.category} • VIP GUESTLIST</span>
                  <h3 className="text-2xl font-serif text-white font-bold">{activeEvent.title}</h3>
                </div>
                <button
                  onClick={() => setSelectedEventId(null)}
                  className="text-onyx-400 hover:text-white p-1 rounded-full border border-onyx-800"
                >
                  ✕
                </button>
              </div>

              {!rsvpConfirmed ? (
                
                /* RSVP Form inside modal */
                <form onSubmit={handleRsvpSubmit} className="space-y-4 font-light text-xs">
                  <p className="text-onyx-300 leading-normal">
                    Secure your entry pass to {activeEvent.title} on {activeEvent.day}. Note that VIP tables are held for diners. Walk-in space at the bar is limited.
                  </p>

                  <div className="space-y-3 pt-2">
                    <div className="space-y-1">
                      <label className="text-[9px] uppercase tracking-wider text-onyx-400 font-semibold">Full Name</label>
                      <input
                        type="text"
                        required
                        placeholder="Elena Romanova"
                        value={rsvpName}
                        onChange={(e) => setRsvpName(e.target.value)}
                        className="w-full bg-onyx-950 border border-onyx-800 focus:border-gold-500 focus:outline-none rounded p-3 text-gold-100 text-xs"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[9px] uppercase tracking-wider text-onyx-400 font-semibold">Email Address</label>
                      <input
                        type="email"
                        required
                        placeholder="elena@example.com"
                        value={rsvpEmail}
                        onChange={(e) => setRsvpEmail(e.target.value)}
                        className="w-full bg-onyx-950 border border-onyx-800 focus:border-gold-500 focus:outline-none rounded p-3 text-gold-100 text-xs"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[9px] uppercase tracking-wider text-onyx-400 font-semibold">Heads in Party</label>
                      <select
                        value={rsvpCount}
                        onChange={(e) => setRsvpCount(parseInt(e.target.value))}
                        className="w-full bg-onyx-950 border border-onyx-800 focus:border-gold-500 focus:outline-none rounded p-3 text-gold-100 text-xs appearance-none cursor-pointer"
                      >
                        {[1, 2, 3, 4, 6].map(qty => (
                          <option key={qty} value={qty}>{qty} {qty === 1 ? "Person" : "People"}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="pt-4 flex justify-end gap-3 border-t border-onyx-800">
                    <button
                      type="button"
                      onClick={() => setSelectedEventId(null)}
                      className="px-4 py-2 bg-onyx-950 border border-onyx-800 text-onyx-400 text-xs uppercase font-bold tracking-wider rounded"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-6 py-2.5 bg-gradient-to-br from-gold-600 to-gold-700 text-onyx-950 font-bold text-xs uppercase tracking-wider rounded"
                    >
                      {isSubmitting ? "Completing RSVP..." : "Submit Pass Request"}
                    </button>
                  </div>
                </form>
              ) : (
                
                /* Confirmation Screen inside modal */
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-6 text-center py-4"
                >
                  <div className="w-12 h-12 bg-gold-950 border border-gold-500/20 rounded-full flex items-center justify-center text-gold-400 mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="text-lg font-serif font-bold text-white">VIP Pass Approved</h4>
                    <p className="text-xs text-onyx-400 leading-relaxed font-light max-w-sm mx-auto">
                      Congratulations. We have added you to our guest list for <span className="text-gold-300 font-semibold">{activeEvent.title}</span>. Present this screen or your confirmation email upon entry.
                    </p>
                  </div>

                  <div className="bg-onyx-950 p-4 rounded border border-onyx-800 text-xs space-y-1 text-left max-w-sm mx-auto">
                    <div className="flex justify-between"><span className="text-onyx-500">Party Size</span><span className="font-semibold text-white">{rsvpCount} Guest(s)</span></div>
                    <div className="flex justify-between"><span className="text-onyx-500">Event Window</span><span className="font-semibold text-white">{activeEvent.day}</span></div>
                    <div className="flex justify-between"><span className="text-onyx-500">Door Cover</span><span className="font-semibold text-white">{activeEvent.coverPrice}</span></div>
                  </div>

                  <button
                    onClick={() => setSelectedEventId(null)}
                    className="px-6 py-2 bg-gradient-to-br from-gold-600 to-gold-700 text-onyx-950 font-bold text-xs uppercase tracking-widest rounded"
                  >
                    Done
                  </button>
                </motion.div>
              )}

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
