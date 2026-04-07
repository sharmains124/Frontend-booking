import React from 'react';
import { ArrowUpRight } from 'lucide-react';

const TopFlightDeals = () => {
  return (
    <section className="py-12">
      <div className="text-center mb-12 space-y-3">
        <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight uppercase">
          TOP FLIGHT DEALS
        </h2>
        <p className="text-slate-500 font-medium max-w-2xl mx-auto">
          Discover top flight deals for elite travel experiences at unprecedented prices.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Left Large Card */}
        <div className="bg-white rounded-[2rem] overflow-hidden flex flex-col sm:flex-row shadow-sm hover:shadow-md transition-shadow border border-gray-100">
          <div className="sm:w-1/2 aspect-square sm:aspect-auto">
            <img 
              src="https://images.unsplash.com/photo-1542296332-2e4473faf563?q=80&w=800&auto=format&fit=crop" 
              alt="Luxury flight interior"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="sm:w-1/2 p-8 md:p-10 flex flex-col justify-center">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-3">5 TOURS</p>
            <h3 className="text-2xl font-black text-slate-900 tracking-tight uppercase mb-4 leading-tight">
              LUXURY TRAVEL AND AIRLINES
            </h3>
            <p className="text-sm font-medium text-slate-500 mb-8 leading-relaxed">
              Luxury travel and airlines offer residence, comfort and exclusivity for discerning travellers.
            </p>
            <button className="bg-blue-300 text-white w-fit px-6 py-2.5 rounded-full text-xs font-bold hover:bg-blue-400 transition-colors">
              Learn More
            </button>
          </div>
        </div>

        {/* Right Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          
          {/* Card 1 */}
          <div className="relative rounded-[2rem] overflow-hidden group shadow-sm hover:shadow-md transition-shadow border border-gray-100">
            <img 
              src="https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=600&auto=format&fit=crop" 
              alt="Hotel Booking Flight"
              className="w-full h-full object-cover aspect-square sm:aspect-auto group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/80 to-transparent flex items-end justify-between">
              <span className="text-white font-black text-sm tracking-wide uppercase">HOTEL BOOKING</span>
              <button className="w-8 h-8 flex items-center justify-center rounded-xl bg-blue-300 text-white hover:bg-blue-400 transition-colors">
                <ArrowUpRight size={16} />
              </button>
            </div>
          </div>

          {/* Card 2 */}
          <div className="relative rounded-[2rem] overflow-hidden group shadow-sm hover:shadow-md transition-shadow border border-gray-100">
            <img 
              src="https://images.unsplash.com/photo-1542314831-c6a4d14d8c1e?q=80&w=600&auto=format&fit=crop" 
              alt="Holiday Packages"
              className="w-full h-full object-cover aspect-[4/5] sm:aspect-auto group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/80 to-transparent flex items-end justify-between">
              <span className="text-white font-black text-sm tracking-wide uppercase">HOLIDAY BOOKING</span>
              <button className="w-8 h-8 flex items-center justify-center rounded-xl bg-blue-300 text-white hover:bg-blue-400 transition-colors">
                <ArrowUpRight size={16} />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default TopFlightDeals;
