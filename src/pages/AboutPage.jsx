import React from 'react';
import { Link } from 'react-router-dom';
import { Target, Users, Award, ShieldCheck, ChevronRight, Zap, Star, ArrowRight } from 'lucide-react';

import Newsletter from '../components/Newsletter';
import Button from '../components/Button';

const AboutPage = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden bg-secondary-900">
        <div className="absolute inset-0 z-0">
          <video 
            autoPlay 
            loop 
            muted 
            playsInline
            className="w-full h-full object-cover brightness-[0.3] saturate-[0.6]"
          >
            <source src="https://assets.mixkit.co/videos/preview/mixkit-passenger-plane-flying-above-the-clouds-at-sunset-24422-large.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-secondary-900/60 via-transparent to-accent-cream"></div>
        </div>
        
        <div className="container-custom relative z-10 text-center animate-parallax-up">
          <p className="text-[12px] font-serif font-bold tracking-[0.6em] uppercase text-accent-gold mb-10 drop-shadow-2xl">THE RADIANCE MANIFESTO • GOLDEN HOUR</p>
          <h1 className="text-6xl md:text-[110px] font-serif font-bold text-white tracking-tight leading-[0.75] mb-12">
            Pioneering the <br/> <span className="text-white/20 italic opacity-40">Aesthetic Flight.</span>
          </h1>
        </div>
      </section>

      {/* Narrative Section */}
      <section className="py-48 px-6 lg:px-0">
        <div className="container-custom">
          <div className="flex flex-col lg:flex-row items-center gap-32">
            <div className="lg:w-1/2 relative">
               <div className="relative z-10 rounded-[3rem] overflow-hidden shadow-premium group">
                  <img 
                    src="https://images.unsplash.com/photo-1542296332-2e4473faf563?q=80&w=800" 
                    alt="Refined Traveler" 
                    className="w-full aspect-square object-cover transition-all duration-1000 group-hover:scale-110"
                  />
               </div>
               
               {/* Glass stat card */}
                <div className="absolute -bottom-16 -right-10 glass-card-premium !bg-accent-cream p-12 z-20 rounded-3xl border border-accent-gold/10 shadow-classic">
                  <div className="flex items-baseline gap-4 mb-3">
                     <p className="text-7xl font-serif font-bold text-secondary-900 tracking-tight">5M</p>
                     <p className="text-xs font-serif font-bold text-secondary-500 uppercase tracking-widest">Patrons</p>
                  </div>
                  <p className="text-secondary-400 font-serif font-bold text-[10px] uppercase tracking-[0.2em]">Global Alliance 2026</p>
               </div>
            </div>
            
            <div className="lg:w-1/2">
              <p className="text-[11px] font-serif font-bold tracking-[0.3em] text-accent-gold uppercase mb-10">THE GENESIS</p>
              <h3 className="text-5xl md:text-7xl font-serif font-bold text-secondary-900 mb-12 tracking-tight leading-[0.9]">Exceptional is our <br/> minimum standard.</h3>
              
              <div className="space-y-12 text-secondary-500 text-xl font-serif italic leading-relaxed max-w-xl">
                <p>
                  WingTrip emerged as a response to the homogenization of travel. We believed that the journey should possess the same character and refinement as the destination itself.
                </p>
                 <div className="p-12 bg-accent-cream rounded-[2rem] border border-accent-gold/10 relative group overflow-hidden transition-all duration-700 hover:bg-secondary-900 hover:text-white shadow-inner">
                    <Zap size={24} className="text-accent-gold mb-8 transform group-hover:scale-125 transition-all" fill="currentColor" />
                    <p className="text-2xl font-serif font-bold leading-tight tracking-tight">"Luxury is not an indulgence, but a standard of care. We built Radiance to ensure every mile is celebrated."</p>
                 </div>
                <p>
                  Today, we collaborate exclusively with premier aviation partners to provide a seamless experience that transcends the ordinary.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Grid of Principles */}
      <section className="py-48 bg-secondary-900 text-white overflow-hidden">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">
            {[
              { icon: <Target className="w-8 h-8" />, title: "PATRON FOCUS", desc: "Our methodology is centered around specific member desires." },
              { icon: <ShieldCheck className="w-8 h-8" />, title: "INTEGRITY", desc: "Absolute transparency in pricing and operation." },
              { icon: <Users className="w-8 h-8" />, title: "COMMUNITY", desc: "A global network connected by a shared standard." },
              { icon: <Award className="w-8 h-8" />, title: "PRECISION", desc: "Leveraging technology to ensure flawless execution." },
            ].map((value, idx) => (
              <div key={idx} className="group p-12 rounded-[2.5rem] bg-white/5 border border-white/5 hover:bg-white/10 transition-all duration-700">
                <div className="text-accent-gold mb-10 group-hover:scale-110 transition-transform origin-left">
                  {value.icon}
                </div>
                <h4 className="text-[12px] font-serif font-bold text-white mb-6 tracking-[0.2em] uppercase">{value.title}</h4>
                <p className="text-white/40 font-serif font-bold text-[11px] leading-loose uppercase tracking-[0.1em]">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="py-48">

         <Newsletter />
      </div>
    </div>
  );
};

export default AboutPage;
