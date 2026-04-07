import React from 'react';
import { ShieldCheck } from 'lucide-react';

const FlightFilters = ({ flightsCount }) => {
  return (
    <aside className="lg:w-1/4 space-y-6">
      {/* Search Result Summary Section (Top of sidebar) */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
         <div className="flex items-center justify-between mb-4">
            <h3 className="font-black text-[14px] text-gray-800 uppercase tracking-tight">Your Search</h3>
            <button className="text-[10px] font-bold text-blue-600 uppercase hover:underline">Clear all</button>
         </div>
         <div className="space-y-3">
            <div className="flex items-center justify-between">
               <span className="text-xs font-bold text-gray-500">Available Flights</span>
               <span className="text-xs font-black text-gray-800 tracking-widest">{flightsCount}</span>
            </div>
            <label className="flex items-center gap-3 cursor-pointer group">
               <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-0" />
               <span className="text-xs font-bold text-gray-600 group-hover:text-gray-900 flex-1">One-stop or more</span>
               <span className="text-[10px] font-black text-gray-400">₹4,200</span>
            </label>
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
