import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  Filter, 
  MapPin, 
  Search, 
  ChevronDown, 
  Star, 
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  SlidersHorizontal,
  Clock,
  ArrowLeftRight,
  Hotel as HotelIcon
} from 'lucide-react';
import HotelCard from '../components/HotelCard';

const HotelsPage = () => {
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [activeSort, setActiveSort] = useState('recommended');

  const destination = searchParams.get('to') || 'Mumbai';
  const checkIn = searchParams.get('departure') || '2026-03-18';
  
  const mockHotels = [
    { id: 1, name: 'The Taj Mahal Palace', location: 'Colaba, Mumbai', price: '15,324', rating: '4.9', reviews: '12,450', image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=600&h=400', amenities: ["Free WiFi", "Breakfast included", "Pool", "Spa"], discount: "15% OFF", status: "Top Pick", cancellation: "Free Cancellation", payment: "Pay at hotel" },
    { id: 2, name: 'Oberoi Trident', location: 'Nariman Point, Mumbai', price: '12,567', rating: '4.8', reviews: '8,210', image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&q=80&w=600&h=400', amenities: ["Free WiFi", "Sea View", "Pool"], discount: "20% OFF", status: "Recommended", cancellation: "Non-refundable", payment: "Prepay online" },
    { id: 3, name: 'JW Marriott Sahar', location: 'Andheri East, Mumbai', price: '10,845', rating: '4.7', reviews: '6,150', image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=600&h=400', amenities: ["Airport Shuttle", "Breakfast", "Gym"], discount: "10% OFF", status: "Best Value", cancellation: "Free Cancellation", payment: "Pay at hotel" },
    { id: 4, name: 'Hotel Sahara Star', location: 'Near Airport, Mumbai', price: '8,153', rating: '4.5', reviews: '4,890', image: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&q=80&w=600&h=400', amenities: ["Pool", "Restaurant", "Bar"], discount: "25% OFF", status: "Popular", cancellation: "Flexible", payment: "Pay later" },
    { id: 5, name: 'ITC Maratha', location: 'Sahar, Mumbai', price: '14,200', rating: '4.6', reviews: '5,300', image: 'https://images.unsplash.com/photo-1551882547-ff43c33f7835?auto=format&fit=crop&q=80&w=600&h=400', amenities: ["Luxury Spa", "Five Restaurants", "Pool"], discount: null, status: "Agoda Preferred", cancellation: "Free Cancellation", payment: "Pay at hotel" },
    { id: 6, name: 'The Leela Mumbai', location: 'Andheri East, Mumbai', price: '11,450', rating: '4.7', reviews: '3,200', image: 'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&q=80&w=600&h=400', amenities: ["WiFi", "Pool", "Transfer"], discount: "30% OFF", status: "Secret Deal", cancellation: "Non-refundable", payment: "Prepay" },
    { id: 7, name: 'Sofitel BKC', location: 'Bandra Kurla Complex, Mumbai', price: '13,800', rating: '4.8', reviews: '2,950', image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&q=80&w=600&h=400', amenities: ["French Luxury", "Pool", "Gym"], discount: "12% OFF", status: "Exclusive", cancellation: "Free Cancellation", payment: "Pay at hotel" },
    { id: 8, name: 'Novotel Mumbai', location: 'Juhu, Mumbai', price: '9,200', rating: '4.4', reviews: '4,100', image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&q=80&w=600&h=400', amenities: ["Beach View", "Pool", "Kids Club"], discount: "18% OFF", status: "Top Family", cancellation: "Flexible", payment: "Pay at hotel" },
    { id: 9, name: 'Sea Princess Hotel', location: 'Juhu Beach, Mumbai', price: '7,500', rating: '4.3', reviews: '2,100', image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=600&h=400', amenities: ["WiFi", "Oceanfront", "Bar"], discount: "15% OFF", status: "Great View", cancellation: "Free Cancellation", payment: "Pay later" },
    { id: 10, name: 'Sahara Star', location: 'Vile Parle, Mumbai', price: '8,900', rating: '4.5', reviews: '5,800', image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&q=80&w=600&h=400', amenities: ["Unique Atrium", "Pool", "Dining"], discount: "22% OFF", status: "Unique Choice", cancellation: "Non-refundable", payment: "Pay now" },
    { id: 11, name: 'Hotel Grand Residency', location: 'Bandra, Mumbai', price: '6,400', rating: '4.2', reviews: '1,560', image: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&q=80&w=600&h=400', amenities: ["WiFi", "Comfort", "Breakfast"], discount: "10% OFF", status: "Budget Friendly", cancellation: "Flexible", payment: "Pay later" },
    { id: 12, name: 'The Fern Residency', location: 'Chembur, Mumbai', price: '5,800', rating: '4.1', reviews: '1,200', image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=600&h=400', amenities: ["Eco-friendly", "WiFi", "Gym"], discount: "5% OFF", status: "Eco Choice", cancellation: "Free Cancellation", payment: "Pay at hotel" },
    { id: 13, name: 'Ramada Plaza by Wyndham', location: 'Juhu, Mumbai', price: '9,500', rating: '4.5', reviews: '3,100', image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&q=80&w=600&h=400', amenities: ["Pool", "WiFi", "Bar"], discount: "20% OFF", status: "Member Deal", cancellation: "Free Cancellation", payment: "Pay at hotel" },
    { id: 14, name: 'Hyatt Regency Mumbai', location: 'Sahar, Mumbai', price: '12,900', rating: '4.7', reviews: '5,600', image: 'https://images.unsplash.com/photo-1551133073-351ad7521ac5?auto=format&fit=crop&q=80&w=600&h=400', amenities: ["Luxury Spa", "WiFi", "Gym"], discount: null, status: "Agoda Preferred", cancellation: "Flexible", payment: "Pay at hotel" },
    { id: 15, name: 'The Orchid Hotel', location: 'Vile Parle, Mumbai', price: '7,800', rating: '4.3', reviews: '2,800', image: 'https://images.unsplash.com/photo-1590073242678-70ee3fc28e8e?auto=format&fit=crop&q=80&w=600&h=400', amenities: ["Eco-friendly", "WiFi", "Pool"], discount: "15% OFF", status: "Great Value", cancellation: "Free Cancellation", payment: "Pay later" },
    { id: 16, name: 'Radisson Mumbai Andheri', location: 'Andheri East, Mumbai', price: '8,500', rating: '4.4', reviews: '1,900', image: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&q=80&w=600&h=400', amenities: ["WiFi", "Gym", "Breakfast"], discount: "12% OFF", status: "Recommended", cancellation: "Non-refundable", payment: "Pay now" },
    { id: 17, name: 'Four Seasons Hotel Mumbai', location: 'Worli, Mumbai', price: '18,500', rating: '4.8', reviews: '2,150', image: 'https://images.unsplash.com/photo-1551882547-ff43c33f7835?auto=format&fit=crop&q=80&w=600&h=400', amenities: ["Infinity Pool", "Sky Bar", "Spa"], discount: null, status: "Top Luxury", cancellation: "Free Cancellation", payment: "Pay at hotel" },
    { id: 18, name: 'InterContinental Marine Drive', location: 'Marine Drive, Mumbai', price: '16,200', rating: '4.7', reviews: '1,450', image: 'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&q=80&w=600&h=400', amenities: ["Sea View", "WiFi", "Dining"], discount: "10% OFF", status: "Exclusive Deal", cancellation: "Flexible", payment: "Pay at hotel" },
    { id: 19, name: 'Marine Plaza Mumbai', location: 'Marine Drive, Mumbai', price: '9,800', rating: '4.2', reviews: '2,100', image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&q=80&w=600&h=400', amenities: ["WiFi", "Bar", "Pool"], discount: "18% OFF", status: "Prime Location", cancellation: "Free Cancellation", payment: "Pay now" },
    { id: 20, name: 'Sahara Star Atrium', location: 'Near Airport, Mumbai', price: '8,200', rating: '4.5', reviews: '6,200', image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&q=80&w=600&h=400', amenities: ["WiFi", "Pool", "Spa"], discount: "25% OFF", status: "Secret Deal", cancellation: "Non-refundable", payment: "Prepay" }
  ];

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-[#f8f7f9] min-h-screen font-sans pt-[80px]">
      {/* Search Header Section */}
      <div className="bg-white border-b border-gray-200 sticky top-[80px] z-50 shadow-sm font-sans">
        {/* Top Utility Bar (Agoda Style) */}
        <div className="bg-[#f8f7f9] border-b border-gray-100 py-1.5 hidden md:block">
           <div className="max-w-7xl mx-auto px-4 flex justify-end gap-6 text-[9px] font-black text-gray-400 uppercase tracking-widest italic">
              <span className="cursor-pointer hover:text-gray-800 transition-colors">Agoda for Business</span>
              <span className="cursor-pointer hover:text-gray-800 transition-colors">List your property</span>
              <span className="cursor-pointer hover:text-gray-800 transition-colors flex items-center gap-1"><Star size={10} className="fill-agoda-yellow text-agoda-yellow" /> INR</span>
              <span className="cursor-pointer hover:text-gray-800 transition-colors">English</span>
              <span className="text-agoda-blue cursor-pointer hover:underline">Sign in</span>
              <span className="bg-white border border-agoda-blue text-agoda-blue px-2 py-0.5 rounded cursor-pointer hover:bg-agoda-blue hover:text-white transition-all">Create account</span>
           </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex flex-col md:flex-row items-center gap-3">
            <div className="flex-1 w-full md:w-auto flex items-center bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 hover:border-[#1e88e5] transition-colors cursor-pointer group">
              <Search className="text-gray-400 mr-3 group-hover:text-[#1e88e5]" size={18} />
              <div className="flex flex-col">
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">Destination</span>
                <span className="text-sm font-black text-gray-800 uppercase tracking-tight italic">{destination}</span>
              </div>
            </div>
            
            <div className="w-full md:w-auto flex items-center bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 hover:border-[#1e88e5] transition-colors cursor-pointer group">
              <div className="flex flex-col">
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">Dates</span>
                <span className="text-sm font-black text-gray-800 uppercase tracking-tight italic">{checkIn} - 20 Mar</span>
              </div>
            </div>

            <div className="w-full md:w-auto flex items-center bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 hover:border-[#1e88e5] transition-colors cursor-pointer group">
              <div className="flex flex-col">
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">Guests</span>
                <span className="text-sm font-black text-gray-800 uppercase tracking-tight italic">2 Adults, 1 Room</span>
              </div>
            </div>

            <button className="bg-[#1e88e5] hover:bg-blue-600 text-white px-10 py-3 rounded-xl font-black text-[12px] uppercase tracking-widest shadow-lg shadow-blue-500/30 transition-all w-full md:w-auto">
              Search
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col lg:flex-row gap-8">
        {/* Sidebar Filters */}
        <aside className="lg:w-1/4 space-y-6">
           {/* Map Thumbnail */}
           <div className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm relative group cursor-pointer h-32 mb-6">
              <img 
                src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&q=80&w=400&h=300" 
                alt="Map" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-90" 
              />
              <div className="absolute inset-0 bg-black/5 hover:bg-transparent transition-colors"></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-5 py-2.5 rounded-full shadow-2xl border border-gray-100 flex items-center gap-3 group-hover:scale-105 transition-all">
                 <div className="bg-[#1e88e5] p-1.5 rounded-full text-white">
                    <MapPin size={16} />
                 </div>
                 <span className="text-[10px] font-black uppercase tracking-widest text-[#1e88e5]">View on map</span>
              </div>
           </div>

           <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm space-y-8">
               <div className="flex items-center justify-between">
                  <h2 className="text-xs font-black text-gray-800 uppercase tracking-[0.2em] italic">Filter by</h2>
                  <button className="text-[10px] font-black text-[#1e88e5] uppercase tracking-widest hover:underline">Clear all</button>
               </div>

               {/* Your Budget */}
               <div>
                  <h3 className="text-[11px] font-black text-gray-500 uppercase tracking-widest mb-4">Your budget (per night)</h3>
                  <div className="px-1">
                     <div className="h-1 bg-gray-100 rounded-full relative mb-6">
                        <div className="absolute left-0 right-1/4 h-full bg-[#1e88e5] rounded-full"></div>
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-[#1e88e5] rounded-full cursor-pointer shadow-md"></div>
                        <div className="absolute right-1/4 top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-[#1e88e5] rounded-full cursor-pointer shadow-md"></div>
                     </div>
                     <div className="flex justify-between text-[10px] font-black text-gray-800 uppercase tracking-tight italic">
                        <span>₹0</span>
                        <span>₹25,000+</span>
                     </div>
                  </div>
               </div>

               {/* Popular Filters */}
               <div>
                  <h3 className="text-[11px] font-black text-gray-500 uppercase tracking-widest mb-4">Popular filters</h3>
                  <div className="space-y-3">
                     {[
                        { name: 'Free WiFi', count: 450 },
                        { name: 'Breakfast included', count: 320 },
                        { name: 'Swimming pool', count: 180 },
                        { name: 'Parking', count: 210 },
                        { name: 'Agoda Preferred', count: 85 }
                     ].map(f => (
                        <label key={f.name} className="flex items-center group cursor-pointer">
                           <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-[#1e88e5] focus:ring-[#1e88e5]" />
                           <span className="ml-3 text-[10px] font-black text-gray-600 uppercase tracking-widest italic flex-1 group-hover:text-[#1e88e5] transition-colors">{f.name}</span>
                           <span className="text-[9px] font-bold text-gray-400">({f.count})</span>
                        </label>
                     ))}
                  </div>
               </div>

               {/* Star Rating */}
               <div>
                  <h3 className="text-[11px] font-black text-gray-500 uppercase tracking-widest mb-4">Star rating</h3>
                  <div className="space-y-3">
                     {[5, 4, 3, 2, 1].map(star => (
                        <label key={star} className="flex items-center group cursor-pointer">
                           <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-[#1e88e5] focus:ring-[#1e88e5]" />
                           <div className="ml-3 flex items-center gap-0.5 flex-1 transition-transform group-hover:translate-x-1">
                              {[...Array(star)].map((_, i) => <Star key={i} size={10} className="fill-agoda-yellow text-agoda-yellow" />)}
                           </div>
                           <span className="text-[9px] font-bold text-gray-400">({Math.floor(100 * (6-star))})</span>
                        </label>
                     ))}
                  </div>
               </div>

               {/* Top areas in Mumbai */}
               <div>
                  <div className="flex items-center justify-between mb-4">
                     <h3 className="text-[11px] font-black text-gray-500 uppercase tracking-widest">Top areas in Mumbai</h3>
                     <span className="text-[8px] font-bold text-[#1e88e5] cursor-pointer hover:underline">Distance from center</span>
                  </div>
                  <div className="space-y-3">
                     {[
                        { name: 'Andheri East', count: 312 },
                        { name: 'Juhu Beach', count: 142 },
                        { name: 'Colaba', count: 213 },
                        { name: 'Bandra', count: 205 },
                        { name: 'Nariman Point', count: 98 }
                     ].map(a => (
                        <label key={a.name} className="flex items-center group cursor-pointer">
                           <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-[#1e88e5] focus:ring-[#1e88e5]" />
                           <span className="ml-3 text-[10px] font-black text-gray-600 uppercase tracking-widest italic flex-1 group-hover:text-[#1e88e5] transition-colors">{a.name}</span>
                           <span className="text-[9px] font-bold text-gray-400">({a.count})</span>
                        </label>
                     ))}
                  </div>
                  <button className="text-[9px] font-black text-[#1e88e5] uppercase tracking-widest mt-4 flex items-center gap-1 hover:underline italic">Show all areas <ChevronDown size={10} /></button>
               </div>

               {/* Guest Rating */}
               <div>
                  <h3 className="text-[11px] font-black text-gray-500 uppercase tracking-widest mb-4">Guest rating</h3>
                  <div className="space-y-3">
                     {[
                        { name: 'Excellent: 9+', count: 45 },
                        { name: 'Very Good: 8+', count: 120 },
                        { name: 'Good: 7+', count: 215 },
                        { name: 'Pleasant: 6+', count: 310 }
                     ].map(r => (
                        <label key={r.name} className="flex items-center group cursor-pointer">
                           <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-[#1e88e5] focus:ring-[#1e88e5]" />
                           <span className="ml-3 text-[10px] font-black text-gray-600 uppercase tracking-widest italic flex-1 group-hover:text-[#1e88e5] transition-colors">{r.name}</span>
                           <span className="text-[9px] font-bold text-gray-400">({r.count})</span>
                        </label>
                     ))}
                  </div>
               </div>

               {/* Property Type */}
               <div>
                  <h3 className="text-[11px] font-black text-gray-500 uppercase tracking-widest mb-4">Property type</h3>
                  <div className="space-y-3">
                     {[
                        { name: 'Hotel', count: 420 },
                        { name: 'Apartment', count: 85 },
                        { name: 'Resort', count: 32 },
                        { name: 'Guest House', count: 18 }
                     ].map(t => (
                        <label key={t.name} className="flex items-center group cursor-pointer">
                           <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-[#1e88e5] focus:ring-[#1e88e5]" />
                           <span className="ml-3 text-[10px] font-black text-gray-600 uppercase tracking-widest italic flex-1 group-hover:text-[#1e88e5] transition-colors">{t.name}</span>
                           <span className="text-[9px] font-bold text-gray-400">({t.count})</span>
                        </label>
                     ))}
                  </div>
               </div>

               {/* Facilities */}
               <div>
                  <h3 className="text-[11px] font-black text-gray-500 uppercase tracking-widest mb-4">Facilities</h3>
                  <div className="space-y-3">
                     {[
                        { name: 'Parking', count: 210 },
                        { name: 'Gym', count: 145 },
                        { name: 'Restaurant', count: 320 },
                        { name: 'Spa', count: 95 },
                        { name: 'Airport transfer', count: 180 }
                     ].map(f => (
                        <label key={f.name} className="flex items-center group cursor-pointer">
                           <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-[#1e88e5] focus:ring-[#1e88e5]" />
                           <span className="ml-3 text-[10px] font-black text-gray-600 uppercase tracking-widest italic flex-1 group-hover:text-[#1e88e5] transition-colors">{f.name}</span>
                           <span className="text-[9px] font-bold text-gray-400">({f.count})</span>
                        </label>
                     ))}
                  </div>
                  <button className="text-[9px] font-black text-[#1e88e5] uppercase tracking-widest mt-4 flex items-center gap-1 hover:underline italic">Show all 25 facilities <ChevronDown size={10} /></button>
               </div>

               {/* Room Offers */}
               <div>
                  <h3 className="text-[11px] font-black text-gray-500 uppercase tracking-widest mb-4">Room offers</h3>
                  <div className="space-y-3">
                     {['Free cancellation', 'Pay at hotel', 'Breakfast included', 'Book without credit card'].map(o => (
                        <label key={o} className="flex items-center group cursor-pointer">
                           <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-[#1e88e5] focus:ring-[#1e88e5]" />
                           <span className="ml-3 text-[10px] font-black text-gray-600 uppercase tracking-widest italic flex-1 group-hover:text-[#1e88e5] transition-colors">{o}</span>
                        </label>
                     ))}
                  </div>
               </div>

               {/* Chain Name */}
               <div>
                  <h3 className="text-[11px] font-black text-gray-500 uppercase tracking-widest mb-4">Chain name</h3>
                  <div className="space-y-3">
                     {['Taj Hotels', 'Oberoi', 'Marriott', 'Radisson', 'Hyatt'].map(b => (
                        <label key={b} className="flex items-center group cursor-pointer">
                           <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-[#1e88e5] focus:ring-[#1e88e5]" />
                           <span className="ml-3 text-[10px] font-black text-gray-600 uppercase tracking-widest italic flex-1 group-hover:text-[#1e88e5] transition-colors">{b}</span>
                        </label>
                     ))}
                  </div>
               </div>

               {/* Nearby landmark */}
               <div>
                  <h3 className="text-[11px] font-black text-gray-500 uppercase tracking-widest mb-4">Nearby landmark</h3>
                  <div className="space-y-3">
                     {['Gateway of India', 'Marine Drive', 'Juhu Beach', 'Siddhivinayak Temple', 'Bandra-Worli Sea Link'].map(l => (
                        <label key={l} className="flex items-center group cursor-pointer">
                           <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-[#1e88e5] focus:ring-[#1e88e5]" />
                           <span className="ml-3 text-[10px] font-black text-gray-600 uppercase tracking-widest italic flex-1 group-hover:text-[#1e88e5] transition-colors">{l}</span>
                        </label>
                     ))}
                  </div>
               </div>

               {/* Neighborhood */}
               <div>
                  <h3 className="text-[11px] font-black text-gray-500 uppercase tracking-widest mb-4">Neighborhood</h3>
                  <div className="space-y-3">
                     {['South Mumbai', 'Western Suburbs', 'Central Mumbai', 'Navi Mumbai'].map(n => (
                        <label key={n} className="flex items-center group cursor-pointer">
                           <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-[#1e88e5] focus:ring-[#1e88e5]" />
                           <span className="ml-3 text-[10px] font-black text-gray-600 uppercase tracking-widest italic flex-1 group-hover:text-[#1e88e5] transition-colors">{n}</span>
                        </label>
                     ))}
                  </div>
               </div>
           </div>

           {/* Agoda Trust Seal */}
           <div className="bg-blue-600 rounded-xl p-5 text-white flex items-center gap-4 shadow-xl shadow-blue-500/20">
              <ShieldCheck size={32} className="opacity-80" />
              <div>
                 <h4 className="text-[10px] font-black uppercase tracking-widest italic leading-none mb-1">Book with confidence</h4>
                 <p className="text-[9px] font-bold opacity-70 uppercase leading-tight">Lowest price guaranteed or we'll match it.</p>
              </div>
           </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1">
           {/* Sort Options */}
           <div className="bg-white rounded-xl border border-gray-200 shadow-sm mb-6 overflow-hidden">
              <div className="flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x border-gray-100">
                {[
                  { id: 'recommended', label: 'Recommended', sub: 'Best match' },
                  { id: 'lowest', label: 'Lowest Price', sub: 'From ₹4,500' },
                  { id: 'top-reviewed', label: 'Top Reviewed', sub: '8.5+ score' },
                  { id: 'best-value', label: 'Best Value', sub: 'Agoda deals' }
                ].map(sort => (
                  <button 
                    key={sort.id}
                    onClick={() => setActiveSort(sort.id)}
                    className={`flex-1 px-6 py-4 transition-all relative group text-left ${activeSort === sort.id ? 'bg-gray-50' : 'hover:bg-gray-50 font-sans'}`}
                  >
                    <div className="flex flex-col">
                      <span className={`text-[11px] font-black uppercase tracking-widest italic ${activeSort === sort.id ? 'text-[#1e88e5]' : 'text-gray-400'}`}>{sort.label}</span>
                      <span className="text-[9px] font-bold text-gray-400 lowercase">{sort.sub}</span>
                    </div>
                    {activeSort === sort.id && <div className="absolute bottom-0 left-0 w-full h-1 bg-[#1e88e5]"></div>}
                  </button>
                ))}
              </div>
           </div>

           <div className="flex items-center justify-between mb-4 px-2">
              <h2 className="text-[11px] font-black text-gray-500 uppercase tracking-[0.2em] italic">{destination.toUpperCase()}: 158 HOTELS FOUND</h2>
              <div className="flex items-center gap-2 cursor-pointer group">
                 <span className="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em] group-hover:text-[#1e88e5] transition-colors">SORT BY:</span>
                 <div className="flex items-center gap-1 text-[10px] font-black text-gray-800 uppercase tracking-widest border-b border-gray-300 pb-0.5 group-hover:border-[#1e88e5] transition-all">
                    POPULARITY <ChevronDown size={12} className="text-gray-400 group-hover:text-[#1e88e5] transition-colors" />
                 </div>
              </div>
           </div>

           {/* Hotel List */}
           <div className="space-y-6">
              {loading ? (
                <div className="py-20 flex flex-col items-center justify-center bg-white rounded-2xl border border-gray-100 italic">
                   <HotelIcon size={48} className="text-gray-100 animate-pulse mb-4" />
                   <p className="text-xs font-black text-gray-300 uppercase tracking-[0.3em]">Curating your stay...</p>
                </div>
              ) : (
                <div className="space-y-4">
                   {/* Section Header */}
                   <div className="flex items-center gap-3 mb-6">
                      <div className="h-px bg-gray-200 flex-1"></div>
                      <h2 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em]">TOP PICKS IN {destination.toUpperCase()}</h2>
                      <div className="h-px bg-gray-200 flex-1"></div>
                   </div>

                   {mockHotels.slice(0, 5).map(hotel => (
                     <HotelCard key={hotel.id} hotel={hotel} />
                   ))}

                   {/* Section Header */}
                   <div className="flex items-center gap-3 my-10">
                      <div className="h-px bg-gray-200 flex-1"></div>
                      <h2 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em]">OTHER POPULAR PROPERTIES</h2>
                      <div className="h-px bg-gray-200 flex-1"></div>
                   </div>

                   {mockHotels.slice(5).map(hotel => (
                     <HotelCard key={hotel.id} hotel={hotel} />
                   ))}
                </div>
              )}
           </div>
        </main>
      </div>

      {/* Footer (Agoda Style) */}
      <footer className="mt-20 bg-[#2a2a2e] text-white py-16 italic">
         <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-8 border-b border-gray-700 pb-12 mb-12">
               <div>
                  <h4 className="text-white font-black text-xs uppercase tracking-widest mb-6 underline">Help</h4>
                  <ul className="space-y-3 text-[10px] font-bold text-gray-400 uppercase">
                     <li className="hover:text-white cursor-pointer transition-colors">Help Center</li>
                     <li className="hover:text-white cursor-pointer transition-colors">FAQs</li>
                     <li className="hover:text-white cursor-pointer transition-colors">Privacy Policy</li>
                     <li className="hover:text-white cursor-pointer transition-colors">Cookie Policy</li>
                  </ul>
               </div>
               <div>
                  <h4 className="text-white font-black text-xs uppercase tracking-widest mb-6 underline">Company</h4>
                  <ul className="space-y-3 text-[10px] font-bold text-gray-400 uppercase">
                     <li className="hover:text-white cursor-pointer transition-colors">About Us</li>
                     <li className="hover:text-white cursor-pointer transition-colors">Careers</li>
                     <li className="hover:text-white cursor-pointer transition-colors">Press</li>
                     <li className="hover:text-white cursor-pointer transition-colors">Blog</li>
                  </ul>
               </div>
               <div>
                  <h4 className="text-white font-black text-xs uppercase tracking-widest mb-6 underline">Destinations</h4>
                  <ul className="space-y-3 text-[10px] font-bold text-gray-400 uppercase">
                     <li className="hover:text-white cursor-pointer transition-colors">Countries/Territories</li>
                     <li className="hover:text-white cursor-pointer transition-colors">All Hotel Destinations</li>
                  </ul>
               </div>
            </div>
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 opacity-60">
               <h2 className="text-xl font-black text-white tracking-widest uppercase italic font-sans">Wing Trip</h2>
               <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">© 2026 Wing Trip Company Ltd. All Rights Reserved.</p>
            </div>
         </div>
      </footer>
    </div>
  );
};

export default HotelsPage;
