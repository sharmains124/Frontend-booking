import React from 'react';
import { Plus, Minus } from 'lucide-react';

const GuestClassSelector = ({ guestData, onChange, mode = 'flight' }) => {
  const updateCount = (type, delta) => {
    let minCount = 0;
    if (type === 'adults') minCount = 1;
    if (type === 'rooms') minCount = 1;
    const newCount = Math.max(minCount, (guestData[type] || 0) + delta);
    onChange({ ...guestData, [type]: newCount });
  };

  const updateClass = (className) => {
    onChange({ ...guestData, cabinClass: className });
  };

  const items = mode === 'hotel'
    ? [
        { id: 'rooms', label: 'Rooms', sub: '' },
        { id: 'adults', label: 'Adult', sub: '(18+ yrs)' },
        { id: 'children', label: 'Children', sub: '(0-17 yrs)' }
      ]
    : [
        { id: 'adults', label: 'Adult', sub: '(12yrs and above)' },
        { id: 'children', label: 'Children', sub: '(2-11yrs)' },
        { id: 'infants', label: 'Infants', sub: '(below 2yrs)' }
      ];

  const classes = ['Economy', 'Premium economy', 'Business', 'First'];

  return (
    <div className="bg-white rounded-[12px] shadow-2xl p-6 w-[360px] border border-gray-100 animate-in fade-in zoom-in duration-300">
      
      {/* Passenger Counters */}
      <div className="flex flex-col mb-6">
        {items.map((item, index) => {
          const count = guestData[item.id] || 0;
          let isMin = false;
          if (item.id === 'adults' || item.id === 'rooms') {
            isMin = count <= 1;
          } else {
            isMin = count <= 0;
          }
          
          return (
            <div key={item.id} className={`flex items-center justify-between py-4 ${index !== items.length - 1 ? 'border-b border-gray-100' : ''}`}>
              <button 
                onClick={() => updateCount(item.id, -1)}
                disabled={isMin}
                className={`w-8 h-8 flex items-center justify-center transition-colors border rounded-lg ${isMin ? 'text-gray-200 border-gray-100 cursor-not-allowed' : 'text-primary border-gray-200 hover:bg-primary/5'}`}
              >
                <span className="text-xl font-bold leading-none">-</span>
              </button>
              
              <div className="flex items-center gap-2">
                <span className="text-[22px] font-black text-blue-500">{count}</span>
                <span className="text-[14px] font-bold text-gray-500 tracking-tight">
                  {item.label}
                </span>
              </div>

              <button 
                onClick={() => updateCount(item.id, 1)}
                className="w-8 h-8 flex items-center justify-center text-primary border border-gray-200 rounded-lg hover:bg-primary/5 transition-all active:scale-95"
              >
                <span className="text-xl font-bold leading-none">+</span>
              </button>
            </div>
          );
        })}
      </div>

      {/* Cabin Classes Grid (Hidden in hotel mode) */}
      {mode !== 'hotel' && (
        <div className="grid grid-cols-2 gap-3 mt-2">
          {classes.map((cls) => (
            <button
              key={cls}
              onClick={() => updateClass(cls)}
              className={`py-3 px-2 rounded-[4px] text-[13px] font-medium transition-colors border
                ${guestData.cabinClass === cls 
                  ? 'bg-[#4a85f6] hover:bg-blue-600 text-white border-[#4a85f6]' 
                  : 'bg-white text-[#4a85f6] border-[#4a85f6] hover:bg-blue-50'}`}
            >
              {cls}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default GuestClassSelector;
