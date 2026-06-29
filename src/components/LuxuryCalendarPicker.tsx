import React, { useState, useEffect, useRef } from "react";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface LuxuryCalendarPickerProps {
  value: string; // YYYY-MM-DD
  onChange: (dateStr: string) => void;
  minDate?: string;
}

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const WEEKDAY_NAMES = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

export default function LuxuryCalendarPicker({ value, onChange, minDate }: LuxuryCalendarPickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Parse initial or current view month/year from value
  const initialDate = value ? new Date(value + "T00:00:00") : new Date();
  const [viewYear, setViewYear] = useState(initialDate.getFullYear());
  const [viewMonth, setViewMonth] = useState(initialDate.getMonth());

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Sync view when external value changes
  useEffect(() => {
    if (value) {
      const d = new Date(value + "T00:00:00");
      if (!isNaN(d.getTime())) {
        setViewYear(d.getFullYear());
        setViewMonth(d.getMonth());
      }
    }
  }, [value]);

  const handlePrevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear(viewYear - 1);
    } else {
      setViewMonth(viewMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear(viewYear + 1);
    } else {
      setViewMonth(viewMonth + 1);
    }
  };

  // Generate calendar grid
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfWeek = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  const daysInMonth = getDaysInMonth(viewYear, viewMonth);
  const firstDayOfWeek = getFirstDayOfWeek(viewYear, viewMonth);

  const daysArray: (number | null)[] = [];
  for (let i = 0; i < firstDayOfWeek; i++) {
    daysArray.push(null);
  }
  for (let d = 1; d <= daysInMonth; d++) {
    daysArray.push(d);
  }

  // Formatting helper
  const formatDateDisplay = (dateStr: string) => {
    if (!dateStr) return "Select Date";
    const d = new Date(dateStr + "T00:00:00");
    if (isNaN(d.getTime())) return dateStr;
    return d.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric"
    });
  };

  const isDateDisabled = (year: number, month: number, day: number) => {
    if (!minDate) return false;
    const currentStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    return currentStr < minDate;
  };

  const handleSelectDay = (day: number) => {
    if (isDateDisabled(viewYear, viewMonth, day)) return;
    const dateStr = `${viewYear}-${String(viewMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    onChange(dateStr);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full" ref={containerRef}>
      {/* Trigger Button styled like luxury input */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full bg-white border ${
          isOpen ? "border-brand-orange ring-1 ring-brand-orange/30" : "border-gold-200 hover:border-brand-orange/60"
        } rounded p-3 pl-11 pr-3 text-xs text-gold-900 text-left flex items-center justify-between cursor-pointer shadow-sm transition-all duration-300`}
      >
        <CalendarIcon className="absolute left-3.5 top-3.5 w-4 h-4 text-brand-orange pointer-events-none" />
        <span className="font-medium tracking-wide text-onyx-200">
          {formatDateDisplay(value)}
        </span>
        <ChevronDown className={`w-4 h-4 text-gold-600 transition-transform duration-300 ${isOpen ? "rotate-180 text-brand-orange" : ""}`} />
      </button>

      {/* Luxury Dropdown Popup */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 4, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute z-50 mt-1 left-0 w-72 sm:w-80 bg-white border border-gold-300 rounded-lg shadow-2xl p-4 select-none"
          >
            {/* Calendar Header */}
            <div className="flex items-center justify-between pb-3 border-b border-gold-100 mb-3">
              <button
                type="button"
                onClick={handlePrevMonth}
                className="p-1.5 rounded hover:bg-gold-50 text-gold-700 hover:text-brand-orange transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <span className="font-serif font-bold text-sm tracking-wide text-gold-900">
                {MONTH_NAMES[viewMonth]} {viewYear}
              </span>

              <button
                type="button"
                onClick={handleNextMonth}
                className="p-1.5 rounded hover:bg-gold-50 text-gold-700 hover:text-brand-orange transition-colors cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Weekday Labels */}
            <div className="grid grid-cols-7 gap-1 text-center mb-2">
              {WEEKDAY_NAMES.map((name) => (
                <span key={name} className="text-[10px] font-bold tracking-wider uppercase text-gold-600">
                  {name}
                </span>
              ))}
            </div>

            {/* Days Grid */}
            <div className="grid grid-cols-7 gap-1 text-center">
              {daysArray.map((day, idx) => {
                if (day === null) {
                  return <div key={`empty-${idx}`} className="p-2" />;
                }

                const dateStr = `${viewYear}-${String(viewMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
                const isSelected = dateStr === value;
                const disabled = isDateDisabled(viewYear, viewMonth, day);

                // Check if today
                const todayStr = new Date().toISOString().split("T")[0];
                const isToday = dateStr === todayStr;

                return (
                  <button
                    key={dateStr}
                    type="button"
                    disabled={disabled}
                    onClick={() => handleSelectDay(day)}
                    className={`p-2 rounded text-xs transition-all flex items-center justify-center aspect-square ${
                      disabled
                        ? "text-onyx-400 opacity-30 cursor-not-allowed"
                        : isSelected
                        ? "bg-brand-orange text-white font-bold shadow-md scale-105"
                        : isToday
                        ? "border border-brand-orange/60 text-brand-orange font-bold hover:bg-gold-50 cursor-pointer"
                        : "text-gold-900 hover:bg-gold-50 hover:text-brand-orange cursor-pointer"
                    }`}
                  >
                    {day}
                  </button>
                );
              })}
            </div>

            {/* Bottom Note */}
            <div className="mt-3 pt-2 border-t border-gold-100 text-center">
              <span className="text-[10px] text-onyx-400 italic">
                Reservations available up to 60 days in advance
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
