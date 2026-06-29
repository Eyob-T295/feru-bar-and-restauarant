import React from "react";
import { Calendar as CalendarIcon, Clock, Users, ShieldCheck, Mail, Phone, GlassWater, Landmark } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { ReservationRequest } from "../types";
import LuxuryCalendarPicker from "./LuxuryCalendarPicker";

export default function ReservationsSection() {
  const [form, setForm] = React.useState<ReservationRequest>({
    name: "",
    email: "",
    phone: "",
    date: new Date().toISOString().split('T')[0],
    time: "18:30",
    guests: 2
  });

  const [specialRequest, setSpecialRequest] = React.useState("");
  const [validationError, setValidationError] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isConfirmed, setIsConfirmed] = React.useState(false);
  const [bookingCode, setBookingCode] = React.useState("");

  // Curated premium timeslot suggestions
  const timeSlots = [
    { time: "17:00", label: "5:00 PM • Coffee Ceremony" },
    { time: "17:30", label: "5:30 PM • Coffee Ceremony" },
    { time: "18:30", label: "6:30 PM • Prime Seating" },
    { time: "19:00", label: "7:00 PM • Prime Seating" },
    { time: "20:00", label: "8:00 PM • Evening Vibe" },
    { time: "20:30", label: "8:30 PM • Late Night Lounge" }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: name === "guests" ? parseInt(value) : value }));
  };

  const selectTimeSlot = (time: string) => {
    setForm((prev) => ({ ...prev, time }));
  };

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.phone.trim() || !form.date || !form.time) {
      setValidationError("Please fill out all required fields (Full Name, Email, Phone, Preferred Date, and Time).");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      setValidationError("Please provide a valid email address.");
      return;
    }
    const phoneDigits = form.phone.replace(/\D/g, "");
    if (phoneDigits.length < 7) {
      setValidationError("Please provide a valid phone contact number.");
      return;
    }
    setValidationError("");
    setIsSubmitting(true);
    
    // Simulate high-fidelity server verification of reservation
    setTimeout(() => {
      const code = "FR-" + Math.floor(100000 + Math.random() * 900000);
      setBookingCode(code);
      setIsSubmitting(false);
      setIsConfirmed(true);
    }, 1500);
  };

  const resetBookingForm = () => {
    setIsConfirmed(false);
    setValidationError("");
    setForm({
      name: "",
      email: "",
      phone: "",
      date: new Date().toISOString().split('T')[0],
      time: "18:30",
      guests: 2
    });
    setSpecialRequest("");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 pb-16">
      
      {/* Reservations Header */}
      <div className="text-center space-y-3 pt-6">
        <span className="text-xs uppercase tracking-[0.35em] text-brand-orange font-bold font-sans">
          OPENTABLE ENGINE
        </span>
        <h1 className="text-4xl sm:text-6xl font-serif text-gold-900 font-bold tracking-wide">
          Secure A Seating
        </h1>
        <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-brand-orange to-transparent mx-auto" />
        <p className="text-sm font-light text-onyx-300 max-w-xl mx-auto leading-relaxed">
          Book your private dining table, high bar seat, or lounge section facing the traditional stone stage in Old Town Alexandria.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start max-w-6xl mx-auto">
        
        {/* Left Side: Editorial Dining Rules */}
        <div className="lg:col-span-4 space-y-8">
          
          <div className="bg-white border border-gold-200 p-6 rounded-lg space-y-4 shadow-sm">
            <h3 className="text-lg font-serif font-bold text-gold-900">Fine Dining Notes</h3>
            <div className="w-10 h-[1.5px] bg-brand-orange" />
            
            <ul className="space-y-4 text-xs font-light text-onyx-250">
              <li className="space-y-1">
                <span className="font-bold text-brand-orange block uppercase tracking-wider text-[10px]">Dress Code</span>
                <p className="leading-relaxed">We kindly request a smart causal attire. Fashionable, romantic, and culturally formal attires are highly welcomed. Athletic attire is discouraged.</p>
              </li>
              <li className="space-y-1">
                <span className="font-bold text-brand-orange block uppercase tracking-wider text-[10px]">Lateness Policy</span>
                <p className="leading-relaxed">Please notify us if you're running late. Tables are held strictly for up to 15 minutes past the slot check-in time.</p>
              </li>
              <li className="space-y-1">
                <span className="font-bold text-brand-orange block uppercase tracking-wider text-[10px]">Valet & Parking</span>
                <p className="leading-relaxed">Convenient street parking is available along King Street. Premium parking garages are located within 1-2 blocks of historic Alexandria Old Town corridors.</p>
              </li>
            </ul>
          </div>

          {/* Luxury assurance badge */}
          <div className="bg-gold-50/50 border border-gold-200 p-6 rounded-lg text-center space-y-3 shadow-sm">
            <Landmark className="w-8 h-8 text-brand-orange mx-auto" strokeWidth="1.2" />
            <h4 className="text-xs font-bold uppercase tracking-widest text-gold-900">Private Feasts & Celebrations</h4>
            <p className="text-[11px] text-onyx-250 font-light leading-relaxed">
              Seeking to book events for more than 8 guests, or seeking premium private dining room buyouts? Check our catering tab or call our team.
            </p>
            <a 
              href="mailto:events@ferubarestaurant.com" 
              className="inline-block text-[10px] font-bold uppercase tracking-wider text-brand-orange hover:text-vibrant-red transition-colors"
            >
              Get Private Quote
            </a>
          </div>

        </div>

        {/* Right Side: Interactive Form / Confirmation Sheet */}
        <div className="lg:col-span-8 bg-white border border-gold-200 rounded-lg p-6 sm:p-10 shadow-sm relative">
          
          <AnimatePresence mode="wait">
            {!isConfirmed ? (
              
              /* RESERVATION SCHEDULER FORM */
              <motion.form
                key="booking-form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleBooking}
                className="space-y-8 animate-fade-in"
              >
                {validationError && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-brand-orange/10 border border-brand-orange text-brand-orange p-3.5 rounded-lg text-xs font-semibold flex items-center gap-2.5 shadow-sm"
                  >
                    <ShieldCheck className="w-4 h-4 shrink-0 animate-pulse" />
                    <span>{validationError}</span>
                  </motion.div>
                )}

                <div className="space-y-4">
                  <h3 className="text-lg font-serif font-bold text-gold-900 flex items-center gap-2">
                    <Users className="w-5 h-5 text-brand-orange" />
                    Table Preferences
                  </h3>
                  
                  {/* Selectors grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    
                    {/* Guest select */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] uppercase text-gold-700 tracking-wider font-semibold">Guests Count</label>
                      <div className="relative">
                        <Users className="absolute left-3.5 top-3.5 w-4 h-4 text-brand-orange pointer-events-none" />
                        <select
                          name="guests"
                          value={form.guests}
                          onChange={handleInputChange}
                          className="w-full bg-white border border-gold-200 focus:border-brand-orange focus:outline-none rounded p-3 pl-11 text-xs text-gold-900 appearance-none cursor-pointer shadow-sm"
                        >
                          {[1, 2, 3, 4, 5, 6, 7, 8].map(qty => (
                            <option key={qty} value={qty}>{qty} {qty === 1 ? "Guest" : "Guests"}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Custom Luxury Calendar Date Picker */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] uppercase text-gold-700 tracking-wider font-semibold">Preferred Date</label>
                      <LuxuryCalendarPicker
                        value={form.date}
                        onChange={(dateStr) => setForm((prev) => ({ ...prev, date: dateStr }))}
                        minDate={new Date().toISOString().split('T')[0]}
                      />
                    </div>

                    {/* Time field */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] uppercase text-gold-700 tracking-wider font-semibold">Exact hour</label>
                      <div className="relative">
                        <Clock className="absolute left-3.5 top-3.5 w-4 h-4 text-brand-orange pointer-events-none" />
                        <input
                          type="time"
                          name="time"
                          required
                          value={form.time}
                          onChange={handleInputChange}
                          className="w-full bg-white border border-gold-200 focus:border-brand-orange focus:outline-none rounded p-3 pl-11 text-xs text-gold-900 cursor-pointer shadow-sm"
                        />
                      </div>
                    </div>

                  </div>
                </div>

                {/* Popular Time Slot Suggestions */}
                <div className="space-y-3 border-t border-gold-105 pt-6">
                  <span className="text-[10px] text-gold-700 tracking-wider uppercase font-semibold">Or Select Available OpenTable Window</span>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {timeSlots.map((slot) => {
                      const isSelected = form.time === slot.time;
                      return (
                        <button
                          key={slot.time}
                          type="button"
                          onClick={() => selectTimeSlot(slot.time)}
                          className={`p-3 rounded text-[11px] font-bold tracking-wider text-center transition-all ${
                            isSelected
                              ? "bg-brand-orange text-white font-bold border-transparent shadow-gold-glow scale-102"
                              : "bg-white border border-gold-200 text-gold-750 hover:border-brand-orange hover:text-brand-orange cursor-pointer shadow-sm"
                          }`}
                        >
                          {slot.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Client Core Details */}
                <div className="space-y-4 border-t border-gold-105 pt-6">
                  <h3 className="text-lg font-serif font-bold text-gold-900 flex items-center gap-2">
                    <Mail className="w-5 h-5 text-brand-orange" />
                    Guest Profile Details
                  </h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <div className="space-y-1.5">
                      <label className="text-[10px] uppercase text-gold-700 tracking-wider font-semibold">Full Name</label>
                      <input
                        type="text"
                        name="name"
                        required
                        placeholder="Jessica Sterling"
                        value={form.name}
                        onChange={handleInputChange}
                        className="w-full bg-white border border-gold-200 focus:border-brand-orange focus:outline-none rounded p-3 text-xs text-gold-900 placeholder:text-onyx-400 shadow-sm"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] uppercase text-gold-700 tracking-wider font-semibold">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        required
                        placeholder="jessica@example.com"
                        value={form.email}
                        onChange={handleInputChange}
                        className="w-full bg-white border border-gold-200 focus:border-brand-orange focus:outline-none rounded p-3 text-xs text-gold-900 placeholder:text-onyx-400 shadow-sm"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] uppercase text-gold-700 tracking-wider font-semibold">Phone Contact</label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        placeholder="(703) 555-0199"
                        value={form.phone}
                        onChange={handleInputChange}
                        className="w-full bg-white border border-gold-200 focus:border-brand-orange focus:outline-none rounded p-3 text-xs text-gold-900 placeholder:text-onyx-400 shadow-sm"
                      />
                    </div>
                  </div>

                  {/* Special Requests */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase text-gold-700 tracking-wider font-semibold">Special Notes / Allergies (Optional)</label>
                    <textarea
                      rows={3}
                      placeholder="e.g. Celebrating a wedding anniversary! We are Gluten-free, prefer proximity to the coffee roast center..."
                      value={specialRequest}
                      onChange={(e) => setSpecialRequest(e.target.value)}
                      className="w-full bg-white border border-gold-200 focus:border-brand-orange focus:outline-none rounded p-3 text-xs text-gold-900 placeholder:text-onyx-400 leading-relaxed shadow-sm"
                    />
                  </div>
                </div>

                {/* Submit Panel */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-gold-105 pt-6">
                  <div className="flex items-center gap-2.5 text-onyx-300 text-xs text-left">
                    <ShieldCheck className="w-4 h-4 text-brand-orange shrink-0" />
                    <span>Instant high-priority booking secured via OpenTable engine.</span>
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto px-8 py-3.5 bg-brand-orange hover:bg-vibrant-red disabled:bg-gold-200 disabled:text-gold-400 disabled:cursor-not-allowed text-white text-xs uppercase font-bold tracking-[0.2em] rounded border border-brand-orange/45 shadow-gold-glow hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 duration-300 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Placing Seat Reservation...
                      </>
                    ) : (
                      "Complete Booking"
                    )}
                  </button>
                </div>
              </motion.form>
            ) : (
              
              /* RESERVATION CONFIRMED MODULE RECEIPT */
              <motion.div
                key="booking-success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="text-center space-y-8 py-4"
              >
                <div className="w-16 h-16 bg-gold-100 border border-gold-300 rounded-full flex items-center justify-center text-brand-orange mx-auto shadow-inner">
                  <ShieldCheck className="w-8 h-8" />
                </div>

                <div className="space-y-2">
                  <p className="text-xs uppercase tracking-[0.3em] text-brand-orange font-bold font-sans">
                    YOUR RESERVATION IS SECURED
                  </p>
                  <h3 className="text-2xl sm:text-3xl font-serif text-gold-900 font-bold">
                    We'll See You At The Table
                  </h3>
                  <div className="w-12 h-0.5 bg-brand-orange mx-auto" />
                  <p className="text-xs font-light text-onyx-300 max-w-sm mx-auto leading-relaxed">
                    A confirmation email has been dispatched to <strong className="text-brand-orange font-mono font-bold">{form.email}</strong> with details.
                  </p>
                </div>

                {/* Printable Digital Receipt Card */}
                <div className="max-w-md mx-auto bg-[#FCFAF6] border border-gold-300 rounded-lg p-6 space-y-4 text-left shadow-sm divide-y divide-gold-105">
                  
                  {/* Top: Booking ref */}
                  <div className="flex justify-between items-center pb-3">
                    <span className="text-[10px] uppercase text-onyx-400 tracking-wider font-semibold">OpenTable Code</span>
                    <span className="font-mono text-sm text-brand-orange font-bold tracking-wider uppercase">{bookingCode}</span>
                  </div>

                  {/* Middle: Details */}
                  <div className="py-3 space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-onyx-300 font-light">Lead Guest</span>
                      <span className="font-bold text-gold-900">{form.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-onyx-300 font-light">Guests Party</span>
                      <span className="font-bold text-gold-900">{form.guests} Guests</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-onyx-300 font-light">Calendar Date</span>
                      <span className="font-bold text-gold-900">
                        {new Date(form.date).toLocaleDateString("en-US", {
                          weekday: "short",
                          month: "short",
                          day: "numeric",
                          year: "numeric"
                        })}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-onyx-300 font-light">Dining Time</span>
                      <span className="font-bold text-brand-orange">{form.time.split(":")[0] + ":" + form.time.split(":")[1]}</span>
                    </div>
                    {specialRequest && (
                      <div className="space-y-1 pt-2 border-t border-gold-105">
                        <span className="text-onyx-400 text-[10px] uppercase block tracking-wider font-semibold">Chef Notes / Accommodations</span>
                        <p className="text-[11px] text-onyx-200 font-serif leading-normal italic">
                          "{specialRequest}"
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Bottom details */}
                  <div className="pt-3 text-[11px] text-onyx-300 leading-normal flex gap-3 text-center sm:text-left">
                    <GlassWater className="w-5 h-5 text-brand-orange shrink-0" />
                    <span>
                      Dress standard: <strong>Dress-casual or cultural attire</strong> requested. Please call <strong className="text-brand-orange">(703) 555-0291</strong> if your headcount changes.
                    </span>
                  </div>

                </div>

                {/* Dual controls to reserve more or check directions */}
                <div className="flex justify-center gap-4">
                  <button
                    onClick={resetBookingForm}
                    className="px-5 py-2.5 bg-white border border-gold-300 hover:text-white hover:bg-brand-orange hover:border-brand-orange text-[11px] text-gold-700 font-bold tracking-widest uppercase rounded transition-all cursor-pointer shadow-sm duration-300"
                  >
                    Book Another Night
                  </button>
                  <button
                    onClick={() => {
                      // Navigate to contact where the maps reside
                      const contactBtn = document.querySelector('button[aria-label="Contact"]');
                      if (contactBtn) (contactBtn as HTMLButtonElement).click();
                    }}
                    className="px-5 py-2.5 bg-brand-orange hover:bg-vibrant-red text-white font-bold text-[11px] tracking-widest uppercase rounded transition-all cursor-pointer shadow-sm duration-300"
                  >
                    View Map & Parking
                  </button>
                </div>

              </motion.div>
            )}
          </AnimatePresence>

        </div>

      </div>

    </div>
  );
}
