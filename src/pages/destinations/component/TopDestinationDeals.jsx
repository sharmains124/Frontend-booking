import React from 'react';
import { ArrowUpRight } from 'lucide-react';

const TopDestinationDeals = () => {
  return (
    <section className="py-8 md:py-12">
      <div className="text-center mb-8 md:mb-12 space-y-2 md:space-y-3">
        <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight uppercase">
          TOP DEALS
        </h2>
        <p className="text-xs md:text-base text-slate-500 font-medium max-w-2xl mx-auto px-4">
          Discover handpicked travel experiences at the world's most desired locations.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 px-4 md:px-0">
        
        {/* Left Large Card - Beach Paradise */}
        <div className="bg-white rounded-3xl md:rounded-[2rem] overflow-hidden flex flex-col md:flex-row shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 group">
          <div className="md:w-1/2 aspect-[16/9] md:aspect-auto overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1544644181-1484b3fdfc62?q=80&w=800&auto=format&fit=crop" 
              alt="Coastal Paradise"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
          </div>
          <div className="md:w-1/2 p-6 md:p-10 flex flex-col justify-center bg-white relative z-10">
            <p className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-2 md:mb-3">COASTAL RETREATS</p>
            <h3 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight uppercase mb-3 md:mb-4 leading-tight group-hover:text-primary transition-colors">
              Sun, Sand & Serenity in Bali
            </h3>
            <p className="text-xs md:text-sm font-medium text-slate-500 mb-6 md:mb-8 leading-relaxed line-clamp-3">
              Experience the perfect blend of exotic tropical beaches and vibrant culture with our exclusive Bali packages.
            </p>
            <button className="bg-primary text-white w-full md:w-auto px-8 py-3 rounded-xl md:rounded-2xl text-[10px] md:text-xs font-black uppercase tracking-widest hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 active:scale-95">
              Explore Package
            </button>
          </div>
        </div>

        {/* Right Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          
          {/* Card 1 - Europe Heritage */}
          <div className="relative rounded-3xl md:rounded-[2rem] overflow-hidden group shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 aspect-square sm:aspect-auto">
            <img 
              src="https://images.unsplash.com/photo-1467269204594-9661b134dd2b?q=80&w=600&auto=format&fit=crop" 
              alt="Europe Heritage"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-6">
              <span className="text-white font-black text-[9px] md:text-[10px] tracking-[0.2em] uppercase mb-1 opacity-80">Heritage Tour</span>
              <div className="flex items-end justify-between">
                <h4 className="text-white font-black text-base md:text-lg tracking-tight uppercase">Europe Classical</h4>
                <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/20 backdrop-blur-md text-white hover:bg-primary transition-all group/btn">
                  <ArrowUpRight size={18} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                </button>
              </div>
            </div>
          </div>

          {/* Card 2 - Arctic Adventure */}
          <div className="relative rounded-3xl md:rounded-[2rem] overflow-hidden group shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 aspect-square sm:aspect-auto">
            <img 
              src="https://images.unsplash.com/photo-1517154421773-0529f29ea451?q=80&w=600&auto=format&fit=crop" 
              alt="Mountain Peaks"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-6">
              <span className="text-white font-black text-[9px] md:text-[10px] tracking-[0.2em] uppercase mb-1 opacity-80">Mountain Peak</span>
              <div className="flex items-end justify-between">
                <h4 className="text-white font-black text-base md:text-lg tracking-tight uppercase">Himalayan Base</h4>
                <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/20 backdrop-blur-md text-white hover:bg-primary transition-all group/btn">
                  <ArrowUpRight size={18} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                </button>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default TopDestinationDeals;
