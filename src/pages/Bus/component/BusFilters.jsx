import React from 'react';
import { ShieldCheck, Bus, Clock, MapPin } from 'lucide-react';

const BusFilters = () => {
  return (
    <aside className="lg:w-1/4 space-y-6">
      {/* Applied Filters placeholder */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
         <div className="flex items-center justify-between mb-4">
            <h3 className="font-black text-[16px] text-gray-900 tracking-tight">Applied Filters</h3>
            <button className="text-[12px] font-black text-blue-600 hover:underline">Clear All</button>
         </div>
         <div className="flex flex-wrap gap-2">
            <div className="bg-blue-50 border border-blue-100 flex items-center gap-2 px-3 py-1.5 rounded-lg text-[11px] font-black text-blue-700 shadow-sm transition-all hover:bg-blue-100 cursor-pointer">
               AC <span className="text-[14px]">×</span>
            </div>
         </div>
      </div>

      {/* Bus Types */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
         <h3 className="font-black text-[14px] text-gray-800 uppercase tracking-widest mb-6">Bus Types</h3>
         <div className="space-y-4">
            {[
              { label: 'AC', count: 145 },
              { label: 'Non AC', count: 42 },
              { label: 'Sleeper', count: 89 },
              { label: 'Seater', count: 112 },
            ].map((type) => (
              <label key={type.label} className="flex items-center gap-3 cursor-pointer group">
                 <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-0 cursor-pointer" />
                 <span className="text-xs font-bold text-gray-600 group-hover:text-gray-900 flex-1">{type.label}</span>
                 <span className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">{type.count}</span>
              </label>
            ))}
         </div>
      </div>

      {/* Departure Time */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
         <h3 className="font-black text-[14px] text-gray-800 uppercase tracking-widest mb-6">Departure Time</h3>
         <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'Before 6 AM', icon: <Clock size={14} />, time: 'Early Morning' },
              { label: '6 AM - 12 PM', icon: <Clock size={14} />, time: 'Morning' },
              { label: '12 PM - 6 PM', icon: <Clock size={14} />, time: 'Afternoon' },
              { label: 'After 6 PM', icon: <Clock size={14} />, time: 'Evening/Night' },
            ].map((t, i) => (
              <div key={i} className="flex flex-col items-center justify-center p-3 rounded-xl border border-gray-100 hover:border-blue-400 hover:bg-blue-50/30 cursor-pointer transition-all group">
                 <span className="text-[10px] font-black text-gray-800 group-hover:text-blue-600 uppercase mb-1">{t.time}</span>
                 <span className="text-[8px] font-bold text-gray-400 italic text-center">{t.label}</span>
              </div>
            ))}
         </div>
      </div>

      {/* Price Range */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
         <h3 className="font-black text-[14px] text-gray-800 uppercase tracking-widest mb-6 px-1">Price Range</h3>
         <div className="px-1">
            <input type="range" min="300" max="5000" className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600" />
            <div className="flex justify-between mt-4 text-[11px] font-black text-gray-400 uppercase tracking-widest">
               <span>₹300</span>
               <span>₹5,000</span>
            </div>
         </div>
      </div>

      {/* Pick up points */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
         <h3 className="font-black text-[14px] text-gray-800 uppercase tracking-widest mb-6">Pickup Points</h3>
         <div className="relative mb-4">
            <input type="text" placeholder="Search for pickup..." className="w-full bg-gray-50 border border-gray-100 rounded-lg py-2.5 px-4 text-[12px] font-bold outline-none placeholder:text-gray-300 focus:bg-white focus:border-blue-200 transition-all" />
         </div>
         <div className="space-y-4 max-h-[200px] overflow-y-auto pr-2 scrollbar-hide">
            {['Majnu ka Tilla', 'Kashmere Gate', 'ISBT', 'Anand Vihar', 'Dhaula Kuan', 'RK Ashram'].map((point) => (
              <label key={point} className="flex items-center gap-3 cursor-pointer group">
                 <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-0 cursor-pointer" />
                 <span className="text-xs font-bold text-gray-600 group-hover:text-gray-900 flex-1">{point}</span>
              </label>
            ))}
         </div>
      </div>

      {/* Bus Operators */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
         <h3 className="font-black text-[14px] text-gray-800 uppercase tracking-widest mb-6">Bus Operators</h3>
         <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 scrollbar-hide">
            {['Zingbus', 'IntrCity SmartBus', 'Laxmi Holidays', 'Blue World Tourist', 'Himalayan Nomad', 'RedLine Bus'].map((op) => (
              <label key={op} className="flex items-center gap-3 cursor-pointer group">
                 <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-0 cursor-pointer" />
                 <span className="text-xs font-bold text-gray-600 group-hover:text-gray-900 flex-1">{op}</span>
              </label>
            ))}
         </div>
      </div>
    </aside>
  );
};

export default BusFilters;
