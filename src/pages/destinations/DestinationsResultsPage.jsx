import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, Filter, MapPin, Grid, List } from 'lucide-react';
import PopularDestinations from './component/PopularDestinations';

const DestinationsResultsPage = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-[#f8fafc] min-h-screen pb-20">
      {/* Search Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 md:top-20 z-50 shadow-sm">
        <div className="max-w-[1440px] mx-auto px-4 md:px-6 py-4 md:h-24 flex flex-col md:flex-row items-center gap-4 md:justify-between">
          <div className="flex items-center gap-4 md:gap-8 w-full md:w-auto">
            <button 
              onClick={() => navigate('/destinations')}
              className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl hover:bg-slate-50 flex items-center justify-center text-slate-800 transition-all border border-slate-100 shrink-0"
            >
              <ArrowLeft size={18} />
            </button>
            <div className="flex-1">
              <h1 className="text-lg md:text-xl font-black text-slate-900 leading-none mb-1 uppercase tracking-tight truncate">Explore</h1>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest flex items-center gap-1.5 whitespace-nowrap">
                <MapPin size={10} className="text-primary" /> 2,450 Spots Found
              </p>
            </div>

            {/* Mobile View Toggle */}
            <div className="flex md:hidden items-center gap-1 bg-slate-50 p-1 rounded-xl border border-slate-100">
               <button className="w-8 h-8 bg-white shadow-sm rounded-lg flex items-center justify-center text-primary">
                  <Grid size={16} />
               </button>
               <button className="w-8 h-8 flex items-center justify-center text-slate-400">
                  <List size={16} />
               </button>
            </div>
          </div>
          
          <div className="flex items-center gap-3 w-full md:max-w-2xl md:flex-1 md:mx-12">
            <div className="flex-1 relative group">
              <input 
                type="text" 
                placeholder="Search..." 
                className="w-full h-11 md:h-14 bg-slate-50 border border-slate-100 rounded-xl md:rounded-2xl px-10 md:px-12 text-xs md:text-sm font-bold focus:bg-white focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all outline-none"
              />
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={16} />
            </div>
            <button className="h-11 md:h-14 px-4 md:px-6 bg-white border border-slate-100 rounded-xl md:rounded-2xl flex items-center gap-2 text-xs md:text-sm font-black text-slate-800 hover:border-primary hover:text-primary transition-all shadow-sm">
              <Filter size={16} />
              <span className="hidden sm:inline">FILTERS</span>
            </button>
          </div>

          <div className="hidden md:flex items-center gap-2 bg-slate-50 p-1.5 rounded-xl border border-slate-100">
             <button className="w-10 h-10 bg-white shadow-sm rounded-lg flex items-center justify-center text-primary">
                <Grid size={18} />
             </button>
             <button className="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-slate-800">
                <List size={18} />
             </button>
          </div>
        </div>
      </header>

      <main className="max-w-[1440px] mx-auto px-4 md:px-6 py-6 md:py-12">
        {/* Using PopularDestinations as a base for results for now */}
        <PopularDestinations />
        
        {/* Load More Button */}
        <div className="text-center mt-8 md:mt-12 px-4">
           <button className="w-full md:w-auto md:px-12 py-4 md:py-5 bg-slate-900 text-white rounded-2xl md:rounded-[2rem] font-black text-xs md:text-sm uppercase tracking-widest hover:bg-primary transition-all shadow-xl hover:shadow-primary/20 active:scale-95">
              Load More Destinations
           </button>
        </div>
      </main>
    </div>
  );
};

export default DestinationsResultsPage;
