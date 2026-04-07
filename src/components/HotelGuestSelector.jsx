import React from 'react';
import { Minus, Plus, X } from 'lucide-react';

const HotelGuestSelector = ({ guestData, onChange, onClose }) => {
  const updateGuests = (type, delta) => {
    const newValue = Math.max(type === 'children' ? 0 : 1, (guestData[type] || 0) + delta);
    if (type === 'rooms' && newValue > 10) return;
    if (type === 'adults' && newValue > 12) return;
    if (type === 'children' && newValue > 10) return;
    
    onChange({ ...guestData, [type]: newValue });
  };

  const handleApply = () => {
    onClose();
  };

  return (
    <div className="bg-white rounded-2xl shadow-premium p-6 w-[320px] border border-gray-100 font-sans">
      <div className="flex items-center justify-between mb-6">
        <h4 className="text-sm font-black text-text-main uppercase tracking-widest">Rooms & Guests</h4>
        <button onClick={onClose} className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-lg transition-colors font-black text-gray-400 text-lg">
          ×
        </button>
      </div>

      <div className="space-y-6">
        {/* Rooms Selection */}
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[15px] font-black text-text-main tracking-tight">Rooms</span>
            <span className="text-[11px] font-bold text-text-light uppercase tracking-tighter">Max 10 rooms</span>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => updateGuests('rooms', -1)}
              className="w-9 h-9 rounded-xl border border-gray-100 flex items-center justify-center text-primary hover:bg-primary/5 active:scale-90 transition-all font-black text-xl leading-none"
            >
              -
            </button>
            <span className="w-4 text-center font-black text-text-main text-lg">{guestData.rooms || 1}</span>
            <button
              onClick={() => updateGuests('rooms', 1)}
              className="w-9 h-9 rounded-xl border border-gray-100 flex items-center justify-center text-primary hover:bg-primary/5 active:scale-90 transition-all font-black text-xl leading-none"
            >
              +
            </button>
          </div>
        </div>

        {/* Adults Selection */}
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[15px] font-black text-text-main tracking-tight">Adults</span>
            <span className="text-[11px] font-bold text-text-light uppercase tracking-tighter">Above 12 years</span>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => updateGuests('adults', -1)}
              className="w-9 h-9 rounded-xl border border-gray-100 flex items-center justify-center text-primary hover:bg-primary/5 active:scale-90 transition-all font-black text-xl leading-none"
            >
              -
            </button>
            <span className="w-4 text-center font-black text-text-main text-lg">{guestData.adults || 2}</span>
            <button
              onClick={() => updateGuests('adults', 1)}
              className="w-9 h-9 rounded-xl border border-gray-100 flex items-center justify-center text-primary hover:bg-primary/5 active:scale-90 transition-all font-black text-xl leading-none"
            >
              +
            </button>
          </div>
        </div>

        {/* Children Selection */}
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[15px] font-black text-text-main tracking-tight">Children</span>
            <span className="text-[11px] font-bold text-text-light uppercase tracking-tighter">0 - 12 years</span>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => updateGuests('children', -1)}
              className="w-9 h-9 rounded-xl border border-gray-100 flex items-center justify-center text-primary hover:bg-primary/5 active:scale-90 transition-all font-black text-xl leading-none"
            >
              -
            </button>
            <span className="w-4 text-center font-black text-text-main text-lg">{guestData.children || 0}</span>
            <button
              onClick={() => updateGuests('children', 1)}
              className="w-9 h-9 rounded-xl border border-gray-100 flex items-center justify-center text-primary hover:bg-primary/5 active:scale-90 transition-all font-black text-xl leading-none"
            >
              +
            </button>
          </div>
        </div>
      </div>

      <button
        onClick={handleApply}
        className="w-full mt-8 py-3 bg-primary text-white font-black text-[11px] uppercase tracking-widest rounded-xl shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
      >
        Apply Selection
      </button>
    </div>
  );
};

export default HotelGuestSelector;
