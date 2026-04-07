import React, { useState } from 'react';
import { Search, MapPin, Calendar, Users, ChevronDown, X, Plus, Minus } from 'lucide-react';

const SearchField = ({ label, value, onClick, isOpen, children, className = "" }) => (
  <div className={`relative ${className}`}>
    <button 
      onClick={onClick}
      className={`flex flex-col items-start px-4 py-2 border border-gray-200 rounded-lg bg-white hover:border-blue-400 transition-all text-left w-full h-full shadow-sm ${isOpen ? 'ring-2 ring-blue-500 border-blue-500 shadow-md scale-[1.01]' : ''}`}
    >
      <span className="text-[10px] font-black text-gray-400 uppercase tracking-wider mb-0.5">{label}</span>
      <div className="flex items-center gap-2 w-full">
        <span className="text-[14px] font-black text-gray-900 truncate uppercase tracking-tight">{value}</span>
      </div>
    </button>
    
    {/* Dropdown Menu - High Fidelity */}
    {isOpen && (
      <div className="absolute top-[120%] left-0 w-[380px] bg-white border border-gray-100 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] z-[999] animate-in fade-in zoom-in duration-300 py-5 px-4">
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-50">
          <span className="text-[12px] font-black text-blue-600 uppercase tracking-widest">{label.split(',')[0]}</span>
          <span className="text-gray-400 cursor-pointer hover:text-red-500 font-bold text-[11px]" onClick={onClick}>CLOSE</span>
        </div>
        {children}
      </div>
    )}
  </div>
);

const HotelSearchHeader = ({ destination, checkIn }) => {
  const [openField, setOpenField] = useState(null);

  const toggleField = (field) => {
    setOpenField(openField === field ? null : field);
  };

  return (
    <div className="bg-white border-b border-gray-100 sticky top-[80px] z-[70] shadow-sm font-sans py-5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-stretch gap-4">
          
          {/* Location Field - MMT Style */}
          <SearchField 
            label="CITY, AREA OR PROPERTY" 
            value={destination} 
            className="flex-[1.5]"
            isOpen={openField === 'destination'}
            onClick={() => toggleField('destination')}
          >
            <div className="relative mb-5">
              <input 
                type="text" 
                placeholder="Where do you want to stay?" 
                className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl text-sm font-bold focus:ring-2 focus:ring-blue-500 transition-all outline-none"
                autoFocus
              />
            </div>
            <div className="space-y-1">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-2 mb-2">Popular Cities</p>
              {['Mumbai, Maharashtra', 'Goa, India', 'New Delhi, Delhi', 'Bangalore, Karnataka'].map((city, idx) => (
                <div key={idx} className="flex items-center gap-3 p-3 hover:bg-blue-50 rounded-xl cursor-pointer group transition-all">
                  <div className="w-9 h-9 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-white group-hover:text-blue-500 transition-all font-bold text-[10px]">
                    CITY
                  </div>
                  <div>
                    <p className="text-[14px] font-black text-gray-800 tracking-tight group-hover:text-blue-600">{city}</p>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">India</p>
                  </div>
                </div>
              ))}
            </div>
          </SearchField>
          
          {/* Check-In Field - Mini Calendar */}
          <SearchField 
            label="CHECK-IN" 
            value={checkIn} 
            isOpen={openField === 'checkIn'}
            onClick={() => toggleField('checkIn')}
          >
            <div className="p-2">
               <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-black text-gray-800">March 2026</span>
                  <div className="flex gap-2">
                    <button className="p-1 hover:bg-gray-100 rounded-lg text-[10px] font-black mr-2">PREV</button>
                    <button className="p-1 hover:bg-gray-100 rounded-lg text-[10px] font-black">NEXT</button>
                  </div>
               </div>
               <div className="grid grid-cols-7 gap-1 text-center mb-2">
                  {['Su','Mo','Tu','We','Th','Fr','Sa'].map(d=><span key={d} className="text-[10px] font-black text-gray-400 uppercase">{d}</span>)}
               </div>
               <div className="grid grid-cols-7 gap-1">
                  {Array.from({length: 31}).map((_, i) => (
                    <button key={i} className={`p-2 text-[12px] font-black rounded-lg hover:bg-blue-50 transition-all ${i+1 === 18 ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-700'}`}>
                      {i + 1}
                    </button>
                  ))}
               </div>
            </div>
          </SearchField>

          {/* Check-Out Field - Mini Calendar */}
          <SearchField 
            label="CHECK-OUT" 
            value="20 Mar 2026" 
            isOpen={openField === 'checkOut'}
            onClick={() => toggleField('checkOut')}
          >
             <div className="p-2">
               <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-black text-gray-800">March 2026</span>
                  <div className="flex gap-2">
                    <button className="p-1 hover:bg-gray-100 rounded-lg"><ChevronDown className="rotate-90" size={16}/></button>
                    <button className="p-1 hover:bg-gray-100 rounded-lg"><ChevronDown className="-rotate-90" size={16}/></button>
                  </div>
               </div>
               <div className="grid grid-cols-7 gap-1 text-center mb-2">
                  {['Su','Mo','Tu','We','Th','Fr','Sa'].map(d=><span key={d} className="text-[10px] font-black text-gray-400 uppercase">{d}</span>)}
               </div>
               <div className="grid grid-cols-7 gap-1">
                  {Array.from({length: 31}).map((_, i) => (
                    <button key={i} className={`p-2 text-[12px] font-black rounded-lg hover:bg-blue-50 transition-all ${i+1 === 20 ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-700'}`}>
                      {i + 1}
                    </button>
                  ))}
               </div>
            </div>
          </SearchField>

          {/* Guests Field - Polished Controls */}
          <SearchField 
            label="ROOMS & GUESTS" 
            value="2 Adults, 1 Room" 
            className="flex-1"
            isOpen={openField === 'guests'}
            onClick={() => toggleField('guests')}
          >
            <div className="space-y-6 px-2">
              <div className="flex items-center justify-between p-1">
                <div>
                  <p className="text-[14px] font-black text-gray-800">Adults</p>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">(Ages 12+)</p>
                </div>
                <div className="flex items-center gap-4 bg-gray-50 p-1 rounded-xl border border-gray-100">
                   <button className="w-9 h-9 rounded-lg bg-white border border-gray-200 flex items-center justify-center font-black text-gray-400 hover:text-blue-600 hover:border-blue-200 transition-all shadow-sm">-</button>
                   <span className="font-black text-lg w-4 text-center">2</span>
                   <button className="w-9 h-9 rounded-lg bg-white border border-gray-200 flex items-center justify-center font-black text-gray-700 hover:text-blue-600 hover:border-blue-200 transition-all shadow-sm">+</button>
                </div>
              </div>
              <div className="flex items-center justify-between p-1">
                <div>
                  <p className="text-[14px] font-black text-gray-800">Rooms</p>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">Your Stay</p>
                </div>
                <div className="flex items-center gap-4 bg-gray-50 p-1 rounded-xl border border-gray-100">
                   <button className="w-9 h-9 rounded-lg bg-white border border-gray-200 flex items-center justify-center font-black text-gray-400 hover:text-blue-600 hover:border-blue-200 transition-all shadow-sm">-</button>
                   <span className="font-black text-lg w-4 text-center">1</span>
                   <button className="w-9 h-9 rounded-lg bg-white border border-gray-200 flex items-center justify-center font-black text-gray-700 hover:text-blue-600 hover:border-blue-200 transition-all shadow-sm">+</button>
                </div>
              </div>
              <button className="w-full bg-blue-600 py-3.5 rounded-xl text-white font-black text-[13px] uppercase tracking-widest mt-4 hover:bg-blue-700 shadow-xl shadow-blue-600/20 transform active:scale-[0.98] transition-all">
                APPLY SELECTION
              </button>
            </div>
          </SearchField>

          {/* Search Button */}
          <button className="bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white px-10 py-4 rounded-xl font-black text-[15px] uppercase tracking-widest transition-all flex items-center justify-center gap-2 shadow-2xl shadow-blue-600/30 active:scale-[0.97] min-w-[180px]">
             SEARCH
          </button>
        </div>
      </div>
    </div>
  );
};

export default HotelSearchHeader;
