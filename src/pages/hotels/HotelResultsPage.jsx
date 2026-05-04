import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Hotel as HotelIcon, ChevronDown, Sparkles, Map as MapIcon, Info, ShieldCheck } from 'lucide-react';
import HotelCard from './components/HotelCard';
import HotelSearchHeader from './components/HotelSearchHeader';
import HotelFilters from './components/HotelFilters';
import HotelSortOptions from './components/HotelSortOptions';

import { hotelService } from '../../services/hotelService';
import { toast } from 'react-hot-toast';

const HotelResultsPage = () => {
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [hotels, setHotels] = useState([]);
  const [activeSort, setActiveSort] = useState('recommended');

  const destination = searchParams.get('city') || 'Mumbai';
  const checkIn = searchParams.get('checkIn') || '2026-03-18';
  const checkOut = searchParams.get('checkOut');
  const adults = searchParams.get('adults') || 1;
  const rooms = searchParams.get('rooms') || 1;

  useEffect(() => {
    const fetchHotels = async () => {
      setLoading(true);
      try {
        const response = await hotelService.searchHotels({
          location: destination,
          checkInDate: checkIn,
          checkOutDate: checkOut || new Date(new Date(checkIn).getTime() + 86400000).toISOString().split('T')[0],
          adults: Number(adults),
          rooms: Number(rooms)
        });

        if (response.status && response.data) {
          // Map Amadeus Data to UI Format
          const mappedHotels = response.data.map(h => ({
            id: h.id,
            name: h.name,
            location: `${h.city}, India`,
            price: h.price.toLocaleString('en-IN'),
            originalPrice: (h.price * 1.2).toFixed(0).toLocaleString('en-IN'),
            tax: (h.price * 0.18).toFixed(0).toLocaleString('en-IN'),
            rating: h.rating || "4.5",
            ratingText: h.rating >= 4.7 ? "Excellent" : "Very Good",
            reviews: Math.floor(Math.random() * 5000) + 500,
            image: h.image, // Already high-fidelity from backend amadeus service
            amenities: ["Free WiFi", "Breakfast included", "Pool", "Gym"],
            discount: "15% OFF",
            status: h.rating >= 4.8 ? "Top Pick" : "Popular",
            distance: "Near city center",
            raw: h // Keep original for details page
          }));
          setHotels(mappedHotels);
        } else {
          toast.error("No hotels found for this search.");
        }
      } catch (error) {
        console.error("Fetch Hotels Error:", error);
        toast.error("Failed to fetch live data from Amadeus.");
      } finally {
        setLoading(false);
      }
    };

    fetchHotels();
  }, [destination, checkIn, checkOut, adults, rooms]);

  return (
    <div className="bg-[#f2f2f2] min-h-screen font-sans">
      <HotelSearchHeader destination={destination} checkIn={checkIn} />

      <div className="max-w-7xl mx-auto px-6 pt-28 pb-10">

        <div className="flex flex-col lg:flex-row gap-8">
          <HotelFilters destination={destination} />

          <main className="lg:w-3/4 min-w-0">
             
             {/* Breadcrumbs */}
             <div className="flex items-center gap-2 text-[11px] text-gray-500 font-medium mb-4">
                <span className="hover:text-[#008cff] cursor-pointer">Home</span>
                <span>›</span>
                <span className="text-gray-400">Hotels and more in {destination}</span>
             </div>

             {/* Main Title Section */}
             <div className="mb-6 mt-1 flex flex-wrap items-center gap-3">
               <h1 className="text-2xl md:text-[28px] font-black text-[#000] tracking-tight">
                 {hotels.length} Properties in {destination}
               </h1>
               <button className="flex items-center gap-1.5 bg-white border border-blue-100 px-3 py-1 rounded-full text-[11px] font-bold text-[#008cff] hover:bg-blue-50 transition-colors shadow-sm">
                 <Sparkles size={14} className="fill-blue-100" /> Explore Travel Tips →
               </button>
             </div>

             {/* Recently Viewed Placeholder */}
             <div className="mb-6">
                <h3 className="text-[20px] font-black text-[#000] tracking-tight mb-4">Recently Viewed</h3>
                {/* We won't add cards here unless data exists, but the header matches the screenshot */}
             </div>

            <HotelSortOptions activeSort={activeSort} setActiveSort={setActiveSort} />

            <h2 className="text-[12px] font-black text-gray-800 mb-6 px-1 tracking-tight">Hotels sorted by Recommended</h2>

            <div className="space-y-4">
              {loading ? (
                <div className="py-32 flex flex-col items-center justify-center bg-white rounded-xl border border-gray-200 shadow-sm">
                  <HotelIcon size={64} className="text-blue-100 mb-6 animate-bounce" />
                  <p className="text-sm font-black text-gray-400 uppercase tracking-[0.3em] italic">Finding the best prices for you...</p>
                </div>
              ) : hotels.length > 0 ? (
                <div className="space-y-4 animate-fade-in-up">
                  {hotels.map(hotel => (
                    <HotelCard key={hotel.id} hotel={hotel} />
                  ))}
                  <button className="w-full py-6 bg-white border border-gray-200 rounded-xl text-blue-600 font-black uppercase tracking-widest text-[13px] hover:bg-gray-50 transition-all shadow-sm">
                    Show More Properties
                  </button>
                </div>
              ) : (
                <div className="bg-white p-20 rounded-3xl border border-gray-100 text-center space-y-4 shadow-sm">
                  <Info size={40} className="mx-auto text-gray-300" />
                  <h3 className="text-xl font-black text-gray-800">No hotels found</h3>
                  <p className="text-gray-400 font-bold">Try adjusting your dates or destination.</p>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default HotelResultsPage;
