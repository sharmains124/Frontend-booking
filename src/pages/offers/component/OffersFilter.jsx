import React from 'react';

const OffersFilter = ({ categories, activeCategory, setActiveCategory }) => {
  return (
    <div className="bg-white rounded-3xl shadow-xl p-4 mb-12 flex items-center gap-4 overflow-x-auto hide-scrollbar scroll-smooth">
      {categories.map((cat) => (
        <button
          key={cat.name}
          onClick={() => setActiveCategory(cat.name)}
          className={`flex items-center gap-2 px-6 py-3.5 rounded-2xl text-sm font-black whitespace-nowrap transition-all
            ${activeCategory === cat.name 
              ? 'bg-[#008cff] text-white shadow-[0_10px_20px_rgba(0,140,255,0.3)] scale-105' 
              : 'text-gray-500 hover:bg-gray-50 hover:text-gray-800'
            }`}
        >
          {cat.icon}
          {cat.name}
        </button>
      ))}
    </div>
  );
};

export default OffersFilter;
