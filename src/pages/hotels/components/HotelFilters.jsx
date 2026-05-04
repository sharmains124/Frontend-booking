import React from 'react';
import { Star, MapPin, ChevronDown, ShieldCheck, Check, Sparkles, Search, ArrowRight } from 'lucide-react';

const FilterSection = ({ title, children, showClear = false, noBorder = false }) => (
  <div className={`py-6 px-1 ${noBorder ? '' : 'border-t border-gray-100'} font-sans`}>
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-[14px] font-black text-[#000] uppercase tracking-tight">{title}</h3>
      {showClear && <button className="text-[11px] font-black text-[#008cff] uppercase tracking-widest">CLEAR</button>}
    </div>
    <div className="space-y-3.5">{children}</div>
  </div>
);

const CheckboxFilter = ({ label, count, checked = false }) => (
  <label className="flex items-center group cursor-pointer">
    <div className={`w-[18px] h-[18px] rounded-[1px] border flex items-center justify-center transition-all ${checked ? 'bg-[#008cff] border-[#008cff]' : 'border-gray-300 group-hover:border-blue-400 bg-white'}`}>
      {checked && <Check size={12} className="text-white" strokeWidth={4} />}
      <input type="checkbox" className="hidden" defaultChecked={checked} />
    </div>
    <span className={`ml-3 text-[13px] transition-colors flex-1 ${checked ? 'text-[#000] font-black' : 'text-gray-600 font-bold group-hover:text-[#008cff]'}`}>
      {label}
    </span>
    {count !== undefined && <span className="text-[11px] font-bold text-gray-400 tracking-tight">({count})</span>}
  </label>
);

const HotelFilters = ({ destination }) => {
  return (
    <aside className="lg:w-[285px] shrink-0 font-sans">
      <div className="bg-white px-4 py-2 border border-gray-200 rounded-lg shadow-sm">
        
        {/* Search Locality top box */}
        <div className="py-4">
           <div className="relative group">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#008cff]" />
              <input 
                type="text" 
                placeholder="Search for locality / hote" 
                className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-md text-[13px] font-bold text-gray-800 placeholder-gray-400 group-hover:border-blue-300 focus:border-[#008cff] outline-none transition-all"
              />
           </div>
        </div>

        {/* Applied Filters Block if any */}
        <div className="py-6 border-t border-gray-100">
           <div className="flex items-center justify-between mb-4">
              <h3 className="text-[14px] font-black text-[#000] uppercase tracking-tight">Applied Filters</h3>
              <button className="text-[11px] font-black text-[#008cff] uppercase tracking-widest">Clear All</button>
           </div>
           <div className="flex flex-wrap gap-2">
              <div className="bg-white border border-gray-200 flex items-center gap-2 pl-3 pr-2 py-1.5 rounded text-[12px] font-bold text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer shadow-sm">
                 Free Breakfast <span className="text-gray-400 font-normal leading-none mb-0.5">×</span>
              </div>
           </div>
        </div>

        {/* Smart Filters (AI) */}
        <div className="py-6 border-t border-gray-100">
           <div className="flex items-center gap-2 mb-4">
              <ShieldCheck size={20} className="text-[#008cff]" fill="#eef7ff" />
              <div>
                 <h3 className="text-[14px] font-black text-[#000] leading-none tracking-tight">Smart Filters</h3>
                 <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">Powered by Myra.Ai</p>
              </div>
           </div>
           <div className="relative mb-3">
              <input 
                type="text" 
                placeholder="What are you looking for ?" 
                className="w-full bg-[#f9f9f9] border-0 rounded py-2.5 px-3 text-[12px] font-bold text-gray-800 placeholder-gray-400 outline-none"
              />
              <ArrowRight size={14} className="absolute right-3 top-1/2 -translate-y-1/2 -rotate-45 text-gray-400" />
           </div>
           <div className="flex gap-2 overflow-x-auto scrollbar-hide">
              <button className="flex-shrink-0 bg-white border border-gray-200 px-3 py-1.5 rounded text-[11px] font-bold text-gray-600 hover:border-blue-300 hover:text-blue-600 transition-all flex items-center gap-1">
                 <Sparkles size={12} className="text-[#008cff]" /> Luxury Properties
              </button>
              <button className="flex-shrink-0 bg-white border border-gray-200 px-3 py-1.5 rounded text-[11px] font-bold text-gray-600 hover:border-blue-300 hover:text-blue-600 transition-all flex items-center gap-1">
                 <MapPin size={12} className="text-gray-400" /> Near City Center
              </button>
           </div>
        </div>

        {/* Suggested For You */}
        <FilterSection title="Suggested For You">
            <CheckboxFilter label="Rush Deal" count={12} />
            <CheckboxFilter label="Last Minute Deals" />
            <CheckboxFilter label="5 Star" count={45} />
            <CheckboxFilter label="4 Star" count={234} />
            <CheckboxFilter label="Breakfast Included" count={3071} checked />
            <CheckboxFilter label="3 Star" count={121} />
        </FilterSection>

        {/* Price Per Night */}
        <FilterSection title="Price Per Night" showClear>
            <CheckboxFilter label="₹ 0 - ₹ 2500" count={1014} />
            <CheckboxFilter label="₹ 2500 - ₹ 5500" count={654} />
            <CheckboxFilter label="₹ 5500 - ₹ 9500" count={281} />
            <CheckboxFilter label="₹ 9500 - ₹ 15000" count={148} />
            <CheckboxFilter label="₹ 15000 - ₹ 30000" count={311} />
            <CheckboxFilter label="₹ 30000+" count={143} />
            
            <div className="mt-6">
               <p className="text-[12px] font-black text-gray-900 mb-3">Your Budget</p>
               <div className="flex items-center gap-2">
                  <input type="text" placeholder="Min" className="flex-1 w-full border border-gray-200 rounded px-2 py-1.5 text-[12px] font-bold outline-none focus:border-blue-400" />
                  <span className="text-gray-400 text-xs">to</span>
                  <input type="text" placeholder="Max" className="flex-1 w-full border border-gray-200 rounded px-2 py-1.5 text-[12px] font-bold outline-none focus:border-blue-400" />
                  <button className="bg-[#008cff] p-2 rounded text-white hover:bg-blue-600 transition-all">
                     <ArrowRight size={14} />
                  </button>
               </div>
            </div>
        </FilterSection>

        {/* Star Category */}
        <FilterSection title="Star Category">
            <CheckboxFilter label="3 Star" count={158} />
            <CheckboxFilter label="4 Star" count={232} />
            <CheckboxFilter label="5 Star" count={45} />
        </FilterSection>

        {/* User Rating */}
        <FilterSection title="User Rating">
            <CheckboxFilter label="Excellent: 4.2+" count={132} />
            <CheckboxFilter label="Very Good: 3.5+" count={3714} />
            <CheckboxFilter label="Good: 3+" count={408} />
        </FilterSection>

        {/* Property Type */}
        <FilterSection title="Property Type">
            <CheckboxFilter label="Apartment" count={218} />
            <CheckboxFilter label="Hotel" count={412} checked />
            <CheckboxFilter label="Villa" count={129} />
            <CheckboxFilter label="Resort" count={612} />
            <CheckboxFilter label="Homestay" count={148} />
            <button className="text-[12px] font-black text-[#008cff] mt-2">+ Show more</button>
        </FilterSection>

        {/* Top locations */}
        <FilterSection title="Top locations">
            <CheckboxFilter label="North Goa" />
            <CheckboxFilter label="South Goa" />
            <CheckboxFilter label="Baga Beach" />
            <CheckboxFilter label="Calangute" />
            <CheckboxFilter label="Panjim" />
            <button className="text-[12px] font-black text-[#008cff] mt-2">+ Show more</button>
        </FilterSection>

        {/* Room Views */}
        <FilterSection title="Room Views">
            <CheckboxFilter label="Garden View" count={112} />
            <CheckboxFilter label="City View" count={214} />
            <CheckboxFilter label="Sea View" count={341} />
            <CheckboxFilter label="Pool View" count={412} />
        </FilterSection>

        {/* Chains */}
        <FilterSection title="Chains">
            <CheckboxFilter label="OYO" count={54} />
            <CheckboxFilter label="7 Apple Hotels & Resorts" count={2} />
            <CheckboxFilter label="AM Hotels Collection" count={5} />
            <CheckboxFilter label="Lemon Tree Hotels" count={10} />
            <button className="text-[12px] font-black text-[#008cff] mt-2">+ Show more</button>
        </FilterSection>

        {/* MMT Luxe Selections */}
        <FilterSection title="MMT Luxe Selections">
            <CheckboxFilter label="MMT Luxe Selections" count={28} />
        </FilterSection>

        {/* Amenities */}
        <FilterSection title="Amenities">
            <div className="relative mb-4">
               <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
               <input 
                 type="text" 
                 placeholder="Search amenities" 
                 className="w-full pl-9 pr-4 py-1.5 bg-white border border-gray-200 rounded text-[12px] font-bold outline-none focus:border-blue-400"
               />
            </div>
            <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-3">Guests Love</p>
            <CheckboxFilter label="Swimming Pool" count={3110} />
            <CheckboxFilter label="WIFI" count={5541} />
            <CheckboxFilter label="Spa" count={234} />
            <button className="text-[12px] font-black text-[#008cff] mt-2">+ Show more</button>
        </FilterSection>

        {/* Booking Preference */}
        <FilterSection title="Booking Preference">
            <CheckboxFilter label="Go-MMT" count={506} />
            <CheckboxFilter label="Instant Book" count={2972} />
            <CheckboxFilter label="Entire Villas & Apartments" count={1013} />
            <CheckboxFilter label="Homestays" count={3114} />
        </FilterSection>

        {/* House Rules */}
        <FilterSection title="House Rules">
            <CheckboxFilter label="Self Check-in Available" count={148} />
            <CheckboxFilter label="Unmarried Couples Allowed" count={5410} />
            <CheckboxFilter label="Alcohol Allowed" count={1214} />
            <CheckboxFilter label="Pets Allowed" count={311} />
        </FilterSection>

        {/* Deals & Offers */}
        <FilterSection title="Deals & Offers">
            <CheckboxFilter label="Travelite Moments Sale" count={112} />
            <CheckboxFilter label="Lightning Deals" count={31} />
        </FilterSection>

        {/* Footer Link */}
        <div className="py-8 text-center">
            <button className="w-full py-2.5 border border-blue-400 text-blue-500 rounded-full text-[13px] font-black hover:bg-blue-50 transition-all uppercase tracking-widest">
                BACK TO TOP
            </button>
        </div>

      </div>
    </aside>
  );
};

export default HotelFilters;
