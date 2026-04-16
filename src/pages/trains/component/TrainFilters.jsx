import React from 'react';
import { Filter, ShieldCheck } from 'lucide-react';

const TrainFilters = ({ trainsCount }) => {
  return (
    <aside className="lg:w-1/4 space-y-6">
      {/* Search Result Summary */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-black text-[14px] text-gray-800 uppercase tracking-tight flex items-center gap-2">
            <Filter size={14} className="text-emerald-600" /> Your Search
          </h3>
          <button className="text-[10px] font-bold text-emerald-600 uppercase hover:underline">Clear all</button>
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-500">Available Trains</span>
            <span className="text-xs font-black text-gray-800 tracking-widest">{trainsCount}</span>
          </div>
          <label className="flex items-center gap-3 cursor-pointer group">
            <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-emerald-600 focus:ring-0" />
            <span className="text-xs font-bold text-gray-600 group-hover:text-gray-900 flex-1">Running on time</span>
          </label>
        </div>
      </div>

      {/* Train Type Filter */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
        <h3 className="font-black text-[13px] text-gray-800 uppercase tracking-tight mb-6">Train Type</h3>
        <div className="space-y-4">
          {['Rajdhani', 'Shatabdi', 'Duronto', 'Express', 'Superfast'].map((t) => (
            <label key={t} className="flex items-center gap-3 cursor-pointer group">
              <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-emerald-600 focus:ring-0" />
              <span className="text-xs font-bold text-gray-600 group-hover:text-gray-900 flex-1">{t}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Departure Time */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
        <h3 className="font-black text-[13px] text-gray-800 uppercase tracking-tight mb-6">Departure Time</h3>
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: 'Morning', time: '06:00 - 11:59', emoji: '🌅' },
            { label: 'Afternoon', time: '12:00 - 17:59', emoji: '☀️' },
            { label: 'Evening', time: '18:00 - 23:59', emoji: '🌆' },
            { label: 'Night', time: '00:00 - 05:59', emoji: '🌙' },
          ].map((t, i) => (
            <div key={i} className="flex flex-col items-center justify-center p-2 rounded-lg border border-gray-100 hover:border-emerald-300 cursor-pointer transition-colors group">
              <span className="text-[10px] font-black text-gray-800 group-hover:text-emerald-600">{t.emoji} {t.label}</span>
              <span className="text-[8px] font-bold text-gray-400 italic">{t.time}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Availability Filter */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
        <h3 className="font-black text-[13px] text-gray-800 uppercase tracking-tight mb-6">Class Availability</h3>
        <div className="space-y-4">
          {[
            { name: 'Sleeper (SL)', price: '₹615' },
            { name: 'AC 3 Tier (3A)', price: '₹1,620' },
            { name: 'AC 2 Tier (2A)', price: '₹2,290' },
            { name: 'AC First (1A)', price: '₹4,575' },
            { name: 'Chair Car (CC)', price: '₹1,550' },
          ].map((cls) => (
            <label key={cls.name} className="flex items-center gap-3 cursor-pointer group">
              <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-emerald-600 focus:ring-0" />
              <span className="text-xs font-bold text-gray-600 group-hover:text-gray-900 flex-1">{cls.name}</span>
              <span className="text-[10px] font-black text-gray-400">{cls.price}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Amenities */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
        <h3 className="font-black text-[13px] text-gray-800 uppercase tracking-tight mb-6">Amenities</h3>
        <div className="space-y-4">
          {['Pantry Car', 'Wi-Fi', 'Bedroll', 'Meals Included'].map((a) => (
            <label key={a} className="flex items-center gap-3 cursor-pointer group">
              <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-emerald-600 focus:ring-0" />
              <span className="text-xs font-bold text-gray-600 group-hover:text-gray-900 flex-1">{a}</span>
            </label>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default TrainFilters;
