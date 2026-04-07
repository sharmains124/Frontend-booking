import React from 'react';
import { TrendingUp, ArrowRight, MapPin, Plane } from 'lucide-react';

const PopularDestinations = () => {
  const popularFlights = [
    { from: 'New Delhi', to: 'Mumbai', price: '₹3,224', img: 'https://images.unsplash.com/photo-1522228115018-d838bcce5c3a?auto=format&fit=crop&q=80&w=600' },
    { from: 'Bangalore', to: 'Goa', price: '₹4,567', img: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&q=80&w=600' },
    { from: 'Chennai', to: 'Bangkok', price: '₹12,450', img: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&q=80&w=600' },
    { from: 'Mumbai', to: 'Dubai', price: '₹9,800', img: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=600' },
  ];

  return (
    <section>
      <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-10">
        <div className="space-y-4">
          <div className="flex items-center gap-3 text-primary font-black text-[11px] uppercase tracking-[0.4em] mb-2 px-3 py-1 bg-primary/5 rounded-full w-fit">
             <TrendingUp size={14} /> FLIGHT HOTSPOTS
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-text-main tracking-tighter italic uppercase">
            TRENDING <span className="text-primary italic">SKYWAYS</span>
          </h2>
          <p className="text-text-muted font-bold text-lg">Elite routes curated for the uncompromising traveler.</p>
        </div>
        <button className="flex items-center gap-3 px-10 py-5 rounded-3xl border-2 border-primary/10 hover:border-primary hover:text-primary text-xs font-black uppercase tracking-[0.2em] transition-all group active:scale-95 bg-white shadow-soft hover:shadow-premium">
           EXPAND ALL ROUTES <ArrowRight size={18} className="transition-transform group-hover:translate-x-2" />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {popularFlights.map((flight, i) => (
          <div 
            key={i} 
            className="group relative bg-white rounded-[2.5rem] overflow-hidden shadow-soft hover:shadow-premium transition-all duration-700 cursor-pointer border border-gray-50 hover:-translate-y-4"
          >
            <div className="aspect-[4/5] overflow-hidden">
              <img 
                src={flight.img} 
                alt={flight.to} 
                className="w-full h-full object-cover transition-transform duration-[5s] group-hover:scale-125 group-hover:rotate-1"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/95 via-primary-dark/20 to-transparent"></div>
            </div>
            
            <div className="absolute bottom-8 left-8 right-8 text-white text-left">
              <div className="flex items-center gap-2 mb-2">
                <MapPin size={14} className="text-accent" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-80">{flight.from} to</span>
              </div>
              <h3 className="text-2xl font-black mb-6 truncate italic uppercase tracking-tight">{flight.to}</h3>
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-[10px] font-black opacity-60 uppercase tracking-[0.3em] leading-none mb-2">Elite Fare From</p>
                  <p className="text-3xl font-black text-accent">{flight.price}</p>
                </div>
                <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center group-hover:bg-accent group-hover:text-white transition-all transform group-hover:scale-110 border border-white/20">
                  <Plane size={24} className="text-white transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PopularDestinations;
