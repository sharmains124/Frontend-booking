import React from 'react';
import { Star, MapPin, ChevronDown, ShieldCheck, Check } from 'lucide-react';

const FilterSection = ({ title, children, showClear = false }) => (
  <div className="py-6 border-b border-gray-100 last:border-0">
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-[13px] font-black text-gray-800 uppercase tracking-wide">{title}</h3>
      {showClear && <button className="text-[11px] font-black text-blue-600 hover:underline">CLEAR</button>}
    </div>
    <div className="space-y-3">{children}</div>
  </div>
);

const CheckboxFilter = ({ label, count, checked = false }) => (
  <label className="flex items-center group cursor-pointer">
    <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${checked ? 'bg-blue-600 border-blue-600 shadow-md' : 'border-gray-200 group-hover:border-blue-400'}`}>
      {checked && <Check size={14} className="text-white" strokeWidth={4} />}
      <input type="checkbox" className="hidden" defaultChecked={checked} />
    </div>
    <span className={`ml-3 text-[13px] font-medium transition-colors flex-1 ${checked ? 'text-gray-900 font-bold' : 'text-gray-600 group-hover:text-blue-600'}`}>
      {label}
    </span>
    {count && <span className="text-[11px] font-bold text-gray-400">({count})</span>}
  </label>
);

const HotelFilters = ({ destination }) => {
  return (
    <aside className="lg:w-[280px] shrink-0 font-sans">
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden sticky top-[180px]">
        
        {/* Header */}
        <div className="p-5 border-b border-gray-100 bg-gray-50/50">
          <h2 className="text-lg font-black text-gray-800 tracking-tight">Select Filters</h2>
        </div>

        <div className="p-5">
          <FilterSection title="Suggested For You">
            <CheckboxFilter label="Free Breakfast" count={124} checked />
            <CheckboxFilter label="Free Cancellation" count={89} />
            <CheckboxFilter label="Pay at Hotel" count={56} />
          </FilterSection>

          <FilterSection title="Price Range (per night)" showClear>
            <div className="pt-2">
              <div className="h-1 bg-gray-100 rounded-full relative mb-4">
                <div className="absolute left-0 right-1/4 h-full bg-blue-600"></div>
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-blue-600 rounded-full cursor-pointer shadow-md"></div>
                <div className="absolute right-1/4 top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-blue-600 rounded-full cursor-pointer shadow-md"></div>
              </div>
              <div className="flex justify-between text-[11px] font-black text-gray-800 uppercase tabular-nums">
                <span>₹0</span>
                <span>₹30,000+</span>
              </div>
            </div>
          </FilterSection>

          <FilterSection title="Star Rating">
            {[5, 4, 3].map(star => (
              <CheckboxFilter 
                key={star} 
                label={
                  <div className="flex items-center gap-1">
                    <span className="font-bold">{star} Star</span>
                    <div className="flex gap-0.5 ml-1">
                      {[...Array(star)].map((_, i) => <Star key={i} size={10} className="fill-yellow-500 text-yellow-500" />)}
                    </div>
                  </div>
                } 
                count={star * 24} 
              />
            ))}
          </FilterSection>

          <FilterSection title="Locality" showClear>
            <div className="relative mb-3">
              <MapPin size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search Locality" 
                className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-100 rounded-lg text-[12px] font-bold focus:ring-1 focus:ring-blue-600 outline-none"
              />
            </div>
            <CheckboxFilter label="Colaba" count={45} />
            <CheckboxFilter label="Andheri East" count={82} />
            <CheckboxFilter label="Marine Drive" count={12} />
          </FilterSection>

          <FilterSection title="User Rating">
            <CheckboxFilter label="4.5 & above (Excellent)" count={34} />
            <CheckboxFilter label="4 & above (Very Good)" count={112} />
            <CheckboxFilter label="3 & above (Good)" count={204} />
          </FilterSection>

          <FilterSection title="Property Type">
            <CheckboxFilter label="Hotels" count={412} checked />
            <CheckboxFilter label="Resorts" count={45} />
            <CheckboxFilter label="Apartments" count={98} />
          </FilterSection>
        </div>
      </div>
    </aside>
  );
};

export default HotelFilters;
