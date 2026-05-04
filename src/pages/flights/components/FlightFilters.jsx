import React from 'react';
import { ShieldCheck } from 'lucide-react';

const FlightFilters = ({ flightsCount }) => {
  return (
    <aside className="lg:w-1/4 space-y-6">
      {/* Applied Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
         <div className="flex items-center justify-between mb-3">
            <h3 className="font-black text-[16px] text-[#000] tracking-tight">Applied Filters</h3>
            <button className="text-[12px] font-black text-[#008cff]">Clear All</button>
         </div>
         <div className="flex flex-wrap gap-2">
            <div className="bg-white border border-gray-200 flex items-center justify-between px-2 py-1.5 rounded-md text-[12px] font-bold text-gray-700 shadow-sm w-max cursor-pointer hover:bg-gray-50 transition-colors">
               Non Stop <span className="ml-2 text-gray-500 font-normal text-sm leading-none flex items-center">×</span>
            </div>
         </div>
      </div>

      {/* Smart Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
         <div className="flex items-center gap-1.5 mb-3">
            <div className="text-[#008cff]"><ShieldCheck size={18} className="fill-[#e5f3ff]" strokeWidth={1.5} /></div>
            <div>
              <h3 className="font-black text-[16px] text-[#000] tracking-tight leading-tight">Smart Filters</h3>
              <p className="text-[10px] text-gray-500 font-bold tracking-tight">Powered by Myra.Ai</p>
            </div>
         </div>
         <div className="relative mb-3">
            <input type="text" placeholder="What are you looking for ?" className="w-full bg-[#f9f9f9] rounded-md py-2.5 px-3 text-[12px] font-medium outline-none border-0 text-gray-800 placeholder-gray-400 font-sans" />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 -rotate-45 text-gray-400">
               <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"></path></svg>
            </div>
         </div>
         <div className="flex gap-2 overflow-x-auto scrollbar-hide">
             <button className="flex-shrink-0 bg-white border border-gray-200 text-gray-600 font-medium text-[11px] py-1.5 px-2.5 rounded-md hover:bg-gray-50 shadow-sm flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"></path><line x1="16" y1="8" x2="2" y2="22"></line><line x1="17.5" y1="15" x2="9" y2="6.5"></line></svg> 
                Flights with check-in baggage
             </button>
             <button className="flex-shrink-0 bg-white border border-gray-200 text-gray-600 font-medium text-[11px] py-1.5 px-2.5 rounded-md hover:bg-gray-50 shadow-sm flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="m4.93 4.93 1.41 1.41"></path><path d="m17.66 17.66 1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="m6.34 17.66-1.41 1.41"></path><path d="m19.07 4.93-1.41 1.41"></path></svg>
                Morning
             </button>
         </div>
      </div>

      {/* Price Slider Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
         <h3 className="font-black text-[13px] text-gray-800 uppercase tracking-tight mb-6">Price Per Traveller</h3>
         <input type="range" className="w-full accent-[#1e88e5]" min="2000" max="50000" />
         <div className="flex justify-between mt-3 text-[11px] font-black text-gray-400 uppercase tracking-tighter">
            <span>₹2,000</span>
            <span>₹50,000</span>
         </div>
      </div>

      {/* Popular Filters (Agoda Style) */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
         <h3 className="font-black text-[13px] text-gray-800 uppercase tracking-tight mb-6">Popular Filters</h3>
         <div className="space-y-4">
            {[
              { label: 'Non-stop', price: '₹5,300' },
              { label: 'Baggage inclusive', price: '₹6,100' },
              { label: 'IndiGo', price: '₹5,800' }
            ].map((f, i) => (
              <label key={i} className="flex items-center gap-3 cursor-pointer group">
                 <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-0" />
                 <span className="text-xs font-bold text-gray-600 group-hover:text-gray-900 flex-1">{f.label}</span>
                 <span className="text-[10px] font-black text-gray-400">{f.price}</span>
              </label>
            ))}
         </div>
      </div>

      {/* Airlines Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
         <h3 className="font-black text-[13px] text-gray-800 uppercase tracking-tight mb-6">Airlines</h3>
         <div className="space-y-4 max-h-[250px] overflow-y-auto pr-2 scrollbar-hide">
            {[
              { name: 'Air India', logo: 'AI', price: '₹5,800' },
              { name: 'IndiGo', logo: '6E', price: '₹5,300' },
              { name: 'Vistara', logo: 'UK', price: '₹6,100' },
              { name: 'SpiceJet', logo: 'SG', price: '₹6,400' },
              { name: 'Air India Express', logo: 'IX', price: '₹5,900' }
            ].map(airline => (
              <label key={airline.name} className="flex items-center gap-3 cursor-pointer group">
                 <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-0" />
                 <span className="text-xs font-bold text-gray-600 group-hover:text-gray-900 flex-1 italic">{airline.name}</span>
                 <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{airline.price}</span>
              </label>
            ))}
         </div>
      </div>

      {/* Arrival Time Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
         <h3 className="font-black text-[13px] text-gray-800 uppercase tracking-tight mb-6">Arrival Time</h3>
         <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'Morning', time: '06:00 - 11:59' },
              { label: 'Afternoon', time: '12:00 - 17:59' },
              { label: 'Evening', time: '18:00 - 23:59' },
              { label: 'Night', time: '00:00 - 05:59' }
            ].map((t, i) => (
              <div key={i} className="flex flex-col items-center justify-center p-2 rounded-lg border border-gray-100 hover:border-blue-300 cursor-pointer transition-colors group">
                 <span className="text-[10px] font-black text-gray-800 group-hover:text-blue-600">{t.label}</span>
                 <span className="text-[8px] font-bold text-gray-400 italic">{t.time}</span>
              </div>
            ))}
         </div>
      </div>

    </aside>
  );
};

export default FlightFilters;
