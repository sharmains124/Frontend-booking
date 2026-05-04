import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Star, MapPin } from 'lucide-react';

const CITIES = ['Bangalore', 'Mumbai', 'New Delhi', 'Hyderabad', 'Goa'];

const getBaseImages = () => [
  "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1542314831-c6a4d74d9d20?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
];

// Shuffle helper to make each city look different
const shuffle = (array) => [...array].sort(() => Math.random() - 0.5);

// Generating mock data per city
const cityHotelData = CITIES.reduce((acc, city) => {
  const images = shuffle(getBaseImages());
  acc[city] = [
    { id: 1, title: `GRAND ${city.toUpperCase()} HOTEL BY WINGTRIP`, location: `City Center, ${city}`, price: 2685.84, stars: 5, img: images[0] },
    { id: 2, title: `YELLO STAYS PREMIUM ${city.toUpperCase()}`, location: `Business District, ${city}`, price: 3602.52, stars: 5, img: images[1] },
    { id: 3, title: `CITY CENTER INN ${city.toUpperCase()}`, location: `Downtown, ${city}`, price: 1850.00, stars: 4, img: images[2] },
    { id: 4, title: `THE RESIDENCY EXCLUSIVE`, location: `Premium Hub, ${city}`, price: 4200.75, stars: 5, img: images[3] },
    { id: 5, title: `COMFORT SUITES ${city.toUpperCase()}`, location: `North Avenue, ${city}`, price: 2150.25, stars: 4, img: images[4] },
    { id: 6, title: `HERITAGE HOMESTAY`, location: `South Layout, ${city}`, price: 1545.99, stars: 5, img: images[5] }
  ];
  return acc;
}, {});

const ExploreHotels = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Bangalore');
  const [showAll, setShowAll] = useState(false);

  const handleHotelClick = () => {
    // Navigate to the hotel selection/results page, mimicking the search behavior
    navigate('/hotels/results');
  };

  const currentData = cityHotelData[activeTab] || [];
  const displayedHotels = showAll ? currentData : currentData.slice(0, 2);

  return (
    <div className="space-y-6 pb-16 mt-12 w-full font-sans">
      <section className="px-4 md:px-0">
        <div className="mb-6">
          <h2 className="text-2xl md:text-[32px] font-bold text-[#1a1a1a] tracking-tight mb-4">
            Featured homes recommended for you
          </h2>
          
          {/* Tabs Container */}
          <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-gray-200">
            <div className="flex items-center gap-6 overflow-x-auto hide-scrollbar">
              {CITIES.map((city) => (
                <button
                  key={city}
                  onClick={() => { setActiveTab(city); setShowAll(false); }}
                  className={`pb-3 text-sm md:text-[15px] font-bold whitespace-nowrap transition-colors relative ${
                    activeTab === city 
                      ? 'text-[#008cff]' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {city}
                  {activeTab === city && (
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#008cff]"></span>
                  )}
                </button>
              ))}
            </div>

            {/* See More Link */}
            {!showAll && currentData.length > 2 && (
              <button
                onClick={() => setShowAll(true)}
                className="mt-2 md:mt-0 text-[#008cff] font-bold hover:text-blue-800 flex items-center gap-1 text-sm md:text-[15px] bg-transparent border-none pb-3"
              >
                See more ({activeTab}) properties <ChevronRight size={18} strokeWidth={2.5} className="mt-[2px]" />
              </button>
            )}
          </div>
        </div>

        {/* Cards Grid */}
        <div className="flex flex-wrap gap-4 md:gap-7 pt-2">
          {displayedHotels.map((hotel) => (
            <div
              key={hotel.id}
              onClick={handleHotelClick}
              className="flex flex-col cursor-pointer group transition-all duration-300 w-full md:w-[300px] lg:w-[350px] shrink-0 bg-transparent pb-4"
            >
              {/* Image Block */}
              <div className="relative rounded-[8px] md:rounded-[12px] overflow-hidden h-[160px] md:h-[180px] lg:h-[200px] w-full mb-3 shadow-md group-hover:shadow-lg transition-shadow">
                <img
                  src={hotel.img}
                  alt={hotel.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
              </div>
              
              {/* Content Detail Block below Image */}
              <div className="px-0.5 flex flex-col gap-1">
                <h3 className="text-[14px] font-black text-[#1a1a1a] leading-tight uppercase tracking-tight truncate">
                  {hotel.title}
                </h3>
                
                <div className="flex items-center gap-1.5 mt-[2px]">
                  <div className="flex text-[#c86e10]">
                    {[...Array(hotel.stars)].map((_, i) => (
                      <Star key={i} size={12} fill="currentColor" strokeWidth={0} />
                    ))}
                  </div>
                  <div className="flex items-center text-[#0071C2] text-xs font-bold truncate">
                    <MapPin size={11} strokeWidth={3} className="mr-[3px]" />
                    {hotel.location}
                  </div>
                </div>

                <div className="mt-1.5">
                  <p className="text-[11px] text-[#666] font-medium tracking-wide">
                    Per night before taxes and fees
                  </p>
                  <p className="text-[#c02626] font-black text-[15px] mt-[1px]">
                    INR {hotel.price.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </section>
    </div>
  );
};

export default ExploreHotels;
