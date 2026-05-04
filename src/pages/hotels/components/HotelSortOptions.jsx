import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const HotelSortOptions = ({ activeSort, setActiveSort }) => {
  const options = [
    { id: 'popularity', label: 'Popularity' },
    { id: 'price-low', label: 'Price (Low to High)' },
    { id: 'price-high', label: 'Price (High to Low)' },
    { id: 'rating', label: 'User Rating (Highest)' },
    { id: 'best-rated', label: 'Lowest Price & Best Rated' }
  ];

  return (
    <div className="bg-white border border-gray-100 rounded-md mb-6 font-sans relative flex items-center shadow-sm">
      <button className="flex-shrink-0 w-10 h-[48px] flex items-center justify-center text-gray-400 hover:text-blue-600 border-r border-gray-100 transition-colors">
        <ChevronLeft size={18} />
      </button>
      
      <div className="flex-1 flex items-center overflow-x-auto scrollbar-hide">
        {options.map((sort, index) => (
          <button 
            key={sort.id}
            onClick={() => setActiveSort(sort.id)}
            className={`flex-shrink-0 h-[48px] px-6 flex items-center text-[13px] font-bold transition-all border-r border-gray-100 last:border-r-0
              ${activeSort === sort.id 
                ? 'bg-[#e7f3ff] text-[#008cff]' 
                : 'text-gray-600 hover:bg-gray-50'}`}
          >
            {sort.label}
          </button>
        ))}
      </div>

      <button className="flex-shrink-0 w-10 h-[48px] flex items-center justify-center text-gray-400 hover:text-blue-600 border-l border-gray-100 transition-colors">
        <ChevronRight size={18} />
      </button>
    </div>
  );
};

export default HotelSortOptions;
