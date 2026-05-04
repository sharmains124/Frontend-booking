import React from 'react';
import { Filter, ShieldCheck, CheckCircle2 } from 'lucide-react';

const TrainFilters = ({ trainsCount }) => {
  return (
    <aside className="lg:w-1/4 space-y-6">
      {/* Search Result Summary */}
      <div className="bg-white rounded-2xl shadow-[0_4px_25px_rgba(0,0,0,0.03)] border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-black text-[15px] text-slate-800 uppercase tracking-tight flex items-center gap-2">
            <Filter size={16} className="text-blue-600" /> Filters
          </h3>
          <button className="text-[11px] font-black text-blue-600 uppercase hover:underline tracking-widest">Reset</button>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-gray-50">
            <span className="text-[12px] font-bold text-gray-500 uppercase tracking-tight">Available Trains</span>
            <span className="text-[13px] font-black text-slate-900 bg-blue-50 px-3 py-1 rounded-lg border border-blue-100">{trainsCount}</span>
          </div>
          <label className="flex items-center gap-3 cursor-pointer group">
            <div className="relative flex items-center justify-center">
               <input type="checkbox" className="peer appearance-none w-5 h-5 rounded-lg border-2 border-gray-200 checked:bg-blue-600 checked:border-blue-600 transition-all cursor-pointer" />
               <CheckCircle2 size={12} className="absolute text-white opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity" strokeWidth={3} />
            </div>
            <span className="text-[13px] font-black text-slate-600 group-hover:text-blue-700 flex-1 transition-colors">Running on time only</span>
          </label>
        </div>
      </div>

      {/* Train Type Filter */}
      <div className="bg-white rounded-2xl shadow-[0_4px_25px_rgba(0,0,0,0.03)] border border-gray-100 p-6">
        <h3 className="font-black text-[14px] text-slate-800 uppercase tracking-tight mb-6 flex items-center gap-2">
           <div className="w-1.5 h-6 bg-blue-600 rounded-full" /> Train Type
        </h3>
        <div className="space-y-4">
          {['Rajdhani', 'Shatabdi', 'Duronto', 'Express', 'Superfast'].map((t) => (
            <label key={t} className="flex items-center gap-3 cursor-pointer group">
              <div className="relative flex items-center justify-center">
                 <input type="checkbox" className="peer appearance-none w-5 h-5 rounded-lg border-2 border-gray-200 checked:bg-blue-600 checked:border-blue-600 transition-all cursor-pointer" />
                 <CheckCircle2 size={12} className="absolute text-white opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity" strokeWidth={3} />
              </div>
              <span className="text-[13px] font-black text-slate-600 group-hover:text-blue-700 flex-1 transition-colors">{t}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Departure Time */}
      <div className="bg-white rounded-2xl shadow-[0_4px_25px_rgba(0,0,0,0.03)] border border-gray-100 p-6">
        <h3 className="font-black text-[14px] text-slate-800 uppercase tracking-tight mb-6 flex items-center gap-2">
           <div className="w-1.5 h-6 bg-blue-600 rounded-full" /> Departure Time
        </h3>
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: 'Morning', time: '06-12', emoji: '🌅' },
            { label: 'Afternoon', time: '12-18', emoji: '☀️' },
            { label: 'Evening', time: '18-00', emoji: '🌆' },
            { label: 'Night', time: '00-06', emoji: '🌙' },
          ].map((t, i) => (
            <div key={i} className="flex flex-col items-center justify-center p-3 rounded-2xl border-2 border-gray-50 hover:border-blue-500 hover:bg-blue-50/20 cursor-pointer transition-all active:scale-95 group">
              <span className="text-[13px] mb-1">{t.emoji}</span>
              <span className="text-[12px] font-black text-slate-800 group-hover:text-blue-700">{t.label}</span>
              <span className="text-[10px] font-bold text-gray-400 italic tracking-tighter">{t.time} hrs</span>
            </div>
          ))}
        </div>
      </div>

      {/* Availability Filter */}
      <div className="bg-white rounded-2xl shadow-[0_4px_25px_rgba(0,0,0,0.03)] border border-gray-100 p-6 text-slate-900 italic font-medium">
        <h3 className="font-black text-[14px] text-slate-800 uppercase tracking-tight mb-6 flex items-center gap-2 not-italic">
           <div className="w-1.5 h-6 bg-blue-600 rounded-full" /> Preferred Class
        </h3>
        <div className="space-y-4">
          {[
            { name: 'Sleeper (SL)', price: '₹615+' },
            { name: 'AC 3 Tier (3A)', price: '₹1,620+' },
            { name: 'AC 2 Tier (2A)', price: '₹2,290+' },
            { name: 'AC First (1A)', price: '₹4,575+' },
            { name: 'Chair Car (CC)', price: '₹1,550+' },
          ].map((cls) => (
            <label key={cls.name} className="flex items-center gap-3 cursor-pointer group">
              <div className="relative flex items-center justify-center">
                 <input type="checkbox" className="peer appearance-none w-5 h-5 rounded-lg border-2 border-gray-200 checked:bg-blue-600 checked:border-blue-600 transition-all cursor-pointer" />
                 <CheckCircle2 size={12} className="absolute text-white opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity" strokeWidth={3} />
              </div>
              <span className="text-[13px] font-black text-slate-600 group-hover:text-blue-700 flex-1 transition-colors not-italic">{cls.name}</span>
              <span className="text-[11px] font-black text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-100/50 not-italic">{cls.price}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Amenities */}
      <div className="bg-white rounded-2xl shadow-[0_4px_25px_rgba(0,0,0,0.03)] border border-gray-100 p-6">
        <h3 className="font-black text-[14px] text-slate-800 uppercase tracking-tight mb-6 flex items-center gap-2">
           <div className="w-1.5 h-6 bg-blue-600 rounded-full" /> Quick Filters
        </h3>
        <div className="space-y-4">
          {['Pantry Car', 'Wi-Fi', 'Trip Guarantee', 'Meals Available'].map((a) => (
            <label key={a} className="flex items-center gap-3 cursor-pointer group">
              <div className="relative flex items-center justify-center">
                 <input type="checkbox" className="peer appearance-none w-5 h-5 rounded-lg border-2 border-gray-200 checked:bg-blue-600 checked:border-blue-600 transition-all cursor-pointer" />
                 <CheckCircle2 size={12} className="absolute text-white opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity" strokeWidth={3} />
              </div>
              <span className="text-[13px] font-black text-slate-600 group-hover:text-blue-700 flex-1 transition-colors">{a}</span>
            </label>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default TrainFilters;
