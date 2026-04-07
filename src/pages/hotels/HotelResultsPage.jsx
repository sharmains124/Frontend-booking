import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Hotel as HotelIcon, ChevronDown, Sparkles, Map as MapIcon } from 'lucide-react';
import HotelCard from '../../components/HotelCard';
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

      <div className="max-w-7xl mx-auto px-6 pt-48 pb-10 flex flex-col lg:flex-row gap-10">
        <HotelFilters destination={destination} />

        <main className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-xl font-black text-gray-800 uppercase tracking-tight">
              Hotels, Homestays and more in {destination}
            </h1>
            <button className="flex items-center gap-2 bg-white border border-gray-200 px-4 py-2 rounded-lg text-[12px] font-black text-blue-600 shadow-sm hover:shadow-md transition-all">
                <MapIcon size={14} /> VIEW ON MAP
            </button>
          </div>

          <HotelSortOptions activeSort={activeSort} setActiveSort={setActiveSort} />

          <div className="space-y-4">
            {loading ? (
              <div className="py-32 flex flex-col items-center justify-center bg-white rounded-xl border border-gray-200 shadow-sm animate-pulse">
                 <HotelIcon size={64} className="text-blue-100 mb-6 animate-bounce" />
                 <p className="text-sm font-black text-gray-400 uppercase tracking-[0.3em] italic">Finding the best prices for you...</p>
              </div>
            ) : (
              <div className="space-y-5">
                 <div className="grid grid-cols-1 gap-4 animate-fade-in-up">
                   {hotels.map(hotel => (
                     <HotelCard key={hotel.id} hotel={hotel} />
                   ))}
                 </div>
                 
                 <button className="w-full py-6 bg-white border border-gray-200 rounded-xl text-blue-600 font-black uppercase tracking-widest text-[13px] hover:bg-gray-50 transition-all shadow-sm">
                    Show More Properties
                 </button>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default HotelResultsPage;
