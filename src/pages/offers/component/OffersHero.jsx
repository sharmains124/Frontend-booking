import React from 'react';
import { Search, Percent } from 'lucide-react';

const OffersHero = ({ searchQuery, setSearchQuery }) => {
  return (
    <section className="bg-gradient-to-r from-[#008cff] to-[#005ea1] pt-32 pb-48 relative overflow-hidden">
      <div className="container-custom relative z-10 px-6 text-center">
        <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full text-white text-xs font-black tracking-widest uppercase mb-6 animate-fade-in text-shadow-sm">
          <Percent size={14} />
          Exclusive Deals
        </div>
        <h1 className="text-4xl md:text-6xl font-black text-white leading-tight mb-6 animate-fade-in-up">
          Unbeatable <span className="text-yellow-400">Offers</span> <br className="hidden md:block" /> For Your Next Adventure
        </h1>
        <p className="text-white/80 max-w-2xl mx-auto font-medium mb-10 text-lg animate-fade-in-up transition-all duration-300">
          Discover the best discounts on flights, hotels, trains, and buses. Book now and save big with WingTrip!
        </p>
        
        {/* Search Box */}
        <div className="max-w-xl mx-auto relative animate-fade-in-up" style={{ animationDelay: '300ms' }}>
          <div className="relative group">
            <input 
              type="text" 
              placeholder="Search across all offers..." 
              className="w-full h-16 bg-white rounded-2xl px-14 text-lg font-bold shadow-2xl focus:ring-4 focus:ring-white/20 transition-all outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#008cff] transition-colors" size={24} />
          </div>
        </div>
      </div>
      
      {/* Abstract Background Shapes */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-yellow-400/10 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>
    </section>
  );
};

export default OffersHero;
