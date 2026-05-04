import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { toast } from 'react-hot-toast';
import OffersHero from './component/OffersHero';
import OffersFilter from './component/OffersFilter';
import OfferCard from './component/OfferCard';
import OffersNewsletter from './component/OffersNewsletter';
import { ALL_OFFERS, CATEGORIES } from './component/offersData';

const OffersLandingPage = () => {
  const [activeCategory, setActiveCategory] = useState('All Offers');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredOffers, setFilteredOffers] = useState(ALL_OFFERS);

  useEffect(() => {
    let result = ALL_OFFERS;
    
    if (activeCategory !== 'All Offers') {
      result = result.filter(offer => offer.category === activeCategory);
    }
    
    if (searchQuery) {
      result = result.filter(offer => 
        offer.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        offer.tag.toLowerCase().includes(searchQuery.toLowerCase()) ||
        offer.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    setFilteredOffers(result);
  }, [activeCategory, searchQuery]);

  const copyToClipboard = (code) => {
    if (!code) return;
    navigator.clipboard.writeText(code);
    toast.success('Promo Code Copied!', {
      style: {
        borderRadius: '10px',
        background: '#333',
        color: '#fff',
        fontWeight: 'bold'
      },
    });
  };

  return (
    <div className="bg-[#f2f2f2] min-h-screen font-sans antialiased text-slate-900 pb-20 overflow-x-hidden">
      {/* Hero Section */}
      <OffersHero searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      {/* Main Content */}
      <main className="max-w-[1240px] mx-auto px-6 -mt-24 relative z-20">
        {/* Category Tabs */}
        <OffersFilter 
          categories={CATEGORIES} 
          activeCategory={activeCategory} 
          setActiveCategory={setActiveCategory} 
        />

        {/* Offers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredOffers.length > 0 ? (
            filteredOffers.map((offer, idx) => (
              <OfferCard 
                key={offer.id}
                offer={offer}
                idx={idx}
                categoryIcon={CATEGORIES.find(c => c.name === offer.category)?.icon}
                copyToClipboard={copyToClipboard}
              />
            ))
          ) : (
            <div className="col-span-full py-20 text-center bg-white rounded-[40px] shadow-sm border border-gray-100 animate-fade-in">
              <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-300">
                <Search size={40} />
              </div>
              <h3 className="text-2xl font-black text-slate-800 mb-2">No Offers Found</h3>
              <p className="text-gray-500 font-medium">Try searching with another keyword or category.</p>
            </div>
          )}
        </div>
      </main>

      {/* Newsletter Section */}
      <OffersNewsletter />

      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in-up {
          animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in {
          animation: fadeIn 0.6s ease forwards;
        }

        .container-custom {
          max-width: 1240px;
          margin: 0 auto;
        }

        .text-shadow-sm {
          text-shadow: 0 1px 2px rgba(0,0,0,0.1);
        }
      `}</style>
    </div>
  );
};

export default OffersLandingPage;
