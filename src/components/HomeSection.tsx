import React from "react";
import { Star, Instagram, ChevronRight, MessageSquare, Heart, MapPin, Award, ThumbsUp, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import { DISHES, REVIEWS, INSTAGRAM_POSTS, IMAGES } from "../data";
import ThreeDScrollWrapper from "./ThreeDScrollWrapper";
import ThreeDInteractiveCard from "./ThreeDInteractiveCard";
import AmbientCanvasEffects from "./AmbientCanvasEffects";
import ChefsSpecials from "./ChefsSpecials";
import CoffeeCeremonyExperience from "./CoffeeCeremonyExperience";
import ThreeDPlate from "./ThreeDPlate";
import PressFeatures from "./PressFeatures";
import InteractiveHero from "./InteractiveHero";
import OwnersHomeSection from "./OwnersHomeSection";

interface HomeSectionProps {
  setActiveTab: (tab: string) => void;
}

export default function HomeSection(props: HomeSectionProps) {
  const { setActiveTab } = props;

  // Simple state to simulate liking instagram photos on hover or click
  const [likedPosts, setLikedPosts] = React.useState<Record<string, boolean>>({});
  const toggleLikePost = (id: string) => {
    setLikedPosts((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="space-y-24 pb-12 relative bg-onyx-950">
      
      {/* GLOBAL BACKGROUND CANVAS PHYSICS PARTICLES */}
      <AmbientCanvasEffects section="all" />

      {/* SECTION 1 – INTERACTIVE STORYBOARD CINEMATIC HERO */}
      <InteractiveHero setActiveTab={setActiveTab} />


      {/* SENSORY SHIFTING SMOKE/STEAM TRANSITION CONTAINER */}
      <div className="relative w-full h-12 overflow-hidden bg-onyx-950 z-20 select-none">
        <div className="absolute inset-0 bg-gradient-to-b from-onyx-950 to-transparent flex flex-col justify-end">
          {/* Decorative smoke trail effects */}
          <div className="w-full flex justify-around opacity-25">
            <div className="w-24 h-16 bg-white/5 rounded-full blur-xl animate-pulse" />
            <div className="w-40 h-10 bg-white/5 rounded-full blur-xl animate-pulse delay-75" />
            <div className="w-32 h-12 bg-white/5 rounded-full blur-xl animate-pulse delay-500" />
            <div className="w-28 h-20 bg-white/5 rounded-full blur-xl animate-pulse delay-200" />
          </div>
        </div>
      </div>

      {/* SECTION 2 – ABOUT THE OWNERS */}
      <OwnersHomeSection />

      {/* SECTION 3 – CHEF'S SPECIALS SHOWCASE */}
      <ChefsSpecials setActiveTab={setActiveTab} />

      {/* MID-BANNER: PRESS AND ACCLAIMED FEATURES */}
      <PressFeatures />

      {/* SECTION 3 – COFFEE CEREMONY EXPERIENCE */}
      <CoffeeCeremonyExperience />

      {/* SECTION 4 – FLOATING TESTIMONIALS */}
      <ThreeDScrollWrapper>
        <section className="bg-gradient-to-b from-[#FAF9F6] to-[#FAF7F2] border-t border-gold-200/50 py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-b border-gold-200 pb-8">
              <div className="space-y-2 text-center md:text-left">
                <span className="text-brand-orange uppercase font-sans font-bold text-xs tracking-widest block">
                  VERIFIED PATRON REVIEWS
                </span>
                <h2 className="text-3xl font-serif text-onyx-100 font-bold leading-tight">
                  Google Customer Reviews
                </h2>
                <p className="text-sm text-onyx-300 font-light font-sans mt-1">
                  See what food critics and local Alexandria circles are sharing.
                </p>
              </div>

              {/* Aggregate rating card */}
              <div className="bg-white border border-gold-200 px-6 py-4 rounded flex items-center gap-4 shadow-gold-glow shrink-0">
                <div className="text-center">
                  <span className="block text-2xl font-sans font-bold text-onyx-100">4.9</span>
                  <span className="block text-[8px] uppercase tracking-wider text-brand-orange font-bold">Google Rating</span>
                </div>
                <div className="h-8 w-[1px] bg-gold-200" />
                <div>
                  <div className="flex text-amber-500 gap-0.5 animate-pulse">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
                    ))}
                  </div>
                  <span className="text-[10px] text-onyx-300 font-light mt-1 block font-sans">Based on 482 reviews</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {REVIEWS.map((review) => (
                <ThreeDInteractiveCard key={review.id} className="h-full">
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-white p-6 rounded-lg border border-gold-200 hover:border-brand-orange/40 transition-all duration-300 flex flex-col justify-between space-y-4 shadow-gold-glow relative h-full"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-serif italic text-gold-accent">Verified Diner</span>
                        <ThumbsUp className="w-3.5 h-3.5 text-gold-accent" />
                      </div>
                      <div className="flex text-amber-500 gap-0.5">
                        {Array.from({ length: review.rating }).map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                        ))}
                      </div>
                      <p className="text-[13px] text-onyx-200 font-light leading-relaxed italic font-sans min-h-[60px]">
                        "{review.text}"
                      </p>
                    </div>

                    <div className="flex items-center gap-3 pt-4 border-t border-gold-100">
                      <img
                        src={review.avatar}
                        alt={review.author}
                        className="w-9 h-9 rounded-full object-cover border border-gold-200 grayscale group-hover:grayscale-0 transition-all"
                        referrerPolicy="no-referrer"
                      />
                      <div>
                        <h4 className="text-xs font-bold text-onyx-100">{review.author}</h4>
                        <span className="block text-[9px] text-onyx-300 font-sans">{review.time}</span>
                      </div>
                    </div>
                  </motion.div>
                </ThreeDInteractiveCard>
              ))}
            </div>

          </div>
        </section>
      </ThreeDScrollWrapper>

      {/* SECTION 8 – INSTAGRAM VISUAL FEED */}
      <ThreeDScrollWrapper>
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 py-12">
          <div className="text-center space-y-2">
            <p className="text-xs uppercase tracking-[0.3em] text-brand-orange font-bold font-sans">
              Follow Our Digital Gallery
            </p>
            <h2 className="text-3xl font-serif text-onyx-100 font-bold">Instagram @FeruAlexandria</h2>
            <div className="w-12 h-[1.5px] bg-[#C14F26] mx-auto" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {INSTAGRAM_POSTS.map((post) => {
              const isLiked = likedPosts[post.id];
              return (
                <ThreeDInteractiveCard key={post.id} className="h-full">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="relative aspect-square rounded overflow-hidden bg-white group shadow-gold-glow border border-gold-200 h-full w-full"
                  >
                    <img
                      src={post.imageUrl}
                      alt="Fine Dining Ethiopian food social media"
                      className="w-full h-full object-cover filter brightness-[0.92] transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    
                    {/* Hover info elegant glass layer */}
                    <div className="absolute inset-0 bg-white/95 border border-[#B28F4D]/20 gap-1.5 opacity-0 hover:opacity-100 transition-all duration-300 flex flex-col justify-between p-4 z-10 cursor-pointer">
                      <div className="flex items-center justify-between text-onyx-100 text-xs">
                        <span className="inline-flex items-center gap-1 font-bold text-brand-orange text-[10px] tracking-wider uppercase font-sans">
                          <Instagram className="w-3.5 h-3.5" />
                          @feru
                        </span>
                        <span className="text-[9px] text-[#B28F4D]">View details</span>
                      </div>

                      <p className="text-[11px] text-onyx-200 font-light line-clamp-3 leading-relaxed font-sans">
                        {post.caption}
                      </p>

                      <div className="flex items-center gap-4 pt-2 border-t border-gold-100">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleLikePost(post.id);
                          }}
                          className="flex items-center gap-1 text-[11px] text-[#C14F26] hover:text-[#B02A1E] font-medium transition-colors"
                        >
                          <Heart className={`w-3.5 h-3.5 ${isLiked ? "fill-red-500 text-red-500" : ""}`} />
                          {post.likes + (isLiked ? 1 : 0)}
                        </button>
                        <span className="flex items-center gap-1 text-[11px] text-onyx-300">
                          <MessageSquare className="w-3.5 h-3.5 text-gold-accent" />
                          {post.comments}
                        </span>
                      </div>
                    </div>

                    <div className="absolute bottom-2 right-2 bg-white/80 p-1 rounded-full text-brand-orange z-0 sm:hidden">
                      <Instagram className="w-4 h-4" />
                    </div>
                  </motion.div>
                </ThreeDInteractiveCard>
              );
            })}
          </div>
        </section>
      </ThreeDScrollWrapper>

      {/* SECTION 9 – LUXURY RESERVATION CTA */}
      <ThreeDScrollWrapper>
        <section id="reservation-anchor" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-30">
          <div className="relative rounded-xl overflow-hidden border-2 border-brand-orange/15 p-8 sm:p-16 text-center space-y-6 shadow-gold-glow bg-gradient-to-b from-white to-[#FAF7F2] flex flex-col items-center">
            
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(178,143,77,0.04)_0%,transparent_50%)] pointer-events-none" />

            <div className="w-12 h-12 bg-[#FAF9F6] border border-gold-300 rounded-full flex items-center justify-center text-[#C14F26] mb-2 shadow-inner">
              <MapPin className="w-5 h-5 text-brand-orange" />
            </div>

            <p className="text-xs uppercase tracking-[0.35em] text-[#B28F4D] font-black font-sans">
              AN ELEVATED DINING SEAT AWAITS
            </p>
            
            <h2 className="text-3xl sm:text-5xl font-serif text-onyx-100 font-bold max-w-2xl leading-tight">
              Indulge In The Legendary Hospitality Of Ethiopia
            </h2>
            
            <p className="text-sm sm:text-base text-onyx-300 font-light max-w-xl leading-relaxed font-sans">
              Planning a milestone birthday, a romantic date, or a traditional family gathering? Secure your private corner at Feru Bar & Restaurant today.
            </p>

            <div className="pt-4">
              <button
                onClick={() => {
                  setActiveTab("reservations");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="px-10 py-4 bg-[#C14F26] hover:bg-[#B02A1E] text-white font-bold uppercase tracking-[0.2em] rounded text-xs shadow-gold-glow transition-transform hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
              >
                Secure Table Reservation
              </button>
            </div>
            
            <p className="text-xs text-onyx-300 font-medium font-sans">
              You may also book directly over the phone at <a href="tel:+17035550291" className="text-brand-orange hover:underline font-bold">(703) 555-0291</a>. Walks-ins welcomed in lounge.
            </p>

          </div>
        </section>
      </ThreeDScrollWrapper>

    </div>
  );
}
