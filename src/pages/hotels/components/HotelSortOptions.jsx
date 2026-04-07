import React from 'react';

const HotelSortOptions = ({ activeSort, setActiveSort }) => {
  const options = [
    { id: 'recommended', label: 'POPULARITY', sub: 'Most preferred' },
    { id: 'guest-rating', label: 'GUEST RATING', sub: '4.5+ score' },
    { id: 'lowest', label: 'PRICE', sub: 'Low to High' },
    { id: 'highest', label: 'PRICE', sub: 'High to Low' }
  ];

  return (
    <div className="bg-white border-b border-gray-200 mb-6 font-sans">
      <div className="flex items-center gap-10 px-4">
        <span className="text-[11px] font-black text-gray-400 uppercase tracking-widest py-4">Sort By:</span>
        <div className="flex items-center gap-12">
          {options.map(sort => (
            <button 
              key={sort.id}
              onClick={() => setActiveSort(sort.id)}
              className={`py-3 relative group transition-all min-w-[100px] text-left ${activeSort === sort.id ? 'text-blue-600' : 'text-gray-500 hover:text-blue-600'}`}
            >
              <div className="flex flex-col items-start">
                <span className={`text-[12px] font-black uppercase tracking-wide ${activeSort === sort.id ? 'text-blue-600' : 'text-gray-700'}`}>
                  {sort.label}
                </span>
                <span className={`text-[10px] font-bold mt-0 ${activeSort === sort.id ? 'text-blue-400' : 'text-gray-400'}`}>
                  {sort.sub}
                </span>
              </div>
              {activeSort === sort.id && (
                <div className="absolute bottom-0 left-0 w-full h-[3px] bg-blue-600 rounded-t-full shadow-[0_-2px_10px_rgba(37,99,235,0.4)]"></div>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HotelSortOptions;
