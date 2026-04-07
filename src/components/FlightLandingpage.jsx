import React from 'react';
import { Plane, ShieldCheck } from 'lucide-react';
import BookingEngine from './SearchForm';

const FlightHero = () => {
  return (
    <section className="relative min-h-[700px] flex items-center justify-center pt-20 overflow-hidden bg-primary-dark">
      <div className="absolute inset-0 z-0">
        <img
          src="/images/flight_hero.png"
          alt="Landing Background"
          className="w-full h-full object-cover opacity-60 scale-110 hover:scale-100 transition-transform duration-[10s] ease-linear"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/80 via-transparent to-primary-dark/40"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-primary-dark/20 to-transparent"></div>
      </div>

      <div className="container-custom relative z-10 text-center px-4 w-full">
        <div className="mb-12 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-accent text-white text-[13px] font-black uppercase tracking-[0.2em] mb-10 shadow-2xl animate-bounce-slow">
            <Plane size={16} /> FLY TO YOUR DREAMS
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-[0.9] tracking-tighter mb-8 drop-shadow-xl">
            GO <span className="text-secondary underline decoration-accent decoration-8">BEYOND</span> <br />
            YOUR <span className="text-accent italic font-serif opacity-90">HORIZONS</span>.
          </h1>

          <div className="flex flex-wrap items-center justify-center gap-6 text-white/90 font-black text-sm uppercase tracking-widest backdrop-blur-md bg-white/10 py-4 px-8 rounded-2xl w-fit mx-auto border border-white/20">
            <span className="flex items-center gap-2"><ShieldCheck size={20} className="text-accent" /> TRUSTED BOOKING</span>
            <div className="w-1.5 h-1.5 rounded-full bg-white/30"></div>
            <span className="flex items-center gap-2">24/7 ELITE SUPPORT</span>
            <div className="w-1.5 h-1.5 rounded-full bg-white/30"></div>
            <span className="flex items-center gap-2">GLOBAL NETWORK</span>
          </div>
        </div>

        <div className="max-w-6xl mx-auto transform translate-y-24">
          <div className="bg-white rounded-[2rem] shadow-premium p-2 md:p-4 relative z-20 overflow-visible">
            <BookingEngine />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FlightHero;
