import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search } from 'lucide-react';
import { ALL_OFFERS, CATEGORIES } from './component/offersData';
import OfferCard from './component/OfferCard';

const OffersResultsPage = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-[#f8fafc] min-h-screen pb-20">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-[1240px] mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <button 
              onClick={() => navigate('/offers')}
              className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-600 transition-colors"
            >
              <ArrowLeft size={20} />
            </button>
            <div>
              <h1 className="text-xl font-black text-slate-900 leading-none mb-1">Search Results</h1>
              <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">Found {ALL_OFFERS.length} Exclusive Deals</p>
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-4 bg-gray-50 border border-gray-100 px-4 py-2.5 rounded-xl w-80">
            <Search size={18} className="text-gray-400" />
            <input 
              type="text" 
              placeholder="Filter these results..." 
              className="bg-transparent border-none outline-none text-sm font-bold placeholder:text-gray-400 w-full"
            />
          </div>
        </div>
      </header>

      <main className="max-w-[1240px] mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ALL_OFFERS.map((offer, idx) => (
            <OfferCard 
              key={offer.id} 
              offer={offer} 
              idx={idx}
              categoryIcon={CATEGORIES.find(c => c.name === offer.category)?.icon}
              copyToClipboard={(code) => console.log('Copy', code)}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default OffersResultsPage;
