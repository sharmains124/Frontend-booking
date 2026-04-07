import React, { useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import {
   Star, MapPin, Wifi, Wind, Coffee, Check, ChevronRight,
   Share2, Heart, Image as ImageIcon, ShieldCheck, Info,
   Users, Bed, Maximize, Tv, UserPlus, PlayCircle, Map,
   CheckCircle2, AlertCircle, Sparkles, Building, Utensils,
   Gamepad2, Hourglass, HelpCircle, ChevronDown
} from 'lucide-react';
import HotelSearchHeader from './components/HotelSearchHeader';

const HotelDetailsPage = () => {
   const navigate = useNavigate();
   const { id } = useParams();
   const location = useLocation();
   const [activeTab, setActiveTab] = useState('select rooms');

   // Use data from navigation state if available, otherwise fallback
   const liveHotel = location.state?.hotel || {};
   
   const hotel = {
      name: liveHotel.name || "The Taj Mahal Palace, Mumbai",
      location: liveHotel.location || "Apollo Bandar, Colaba, Mumbai, Maharashtra 400001",
      rating: liveHotel.rating || 4.9,
      reviews: liveHotel.reviews || 4850,
      price: liveHotel.price || "15,000",
      tax: liveHotel.tax || "2,145",
      images: [
         liveHotel.image || "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&q=80&w=1200",
         "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&q=80&w=800",
         "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&q=80&w=800",
      ]
   };

   const roomGroups = [
      {
         title: "Luxury Grande Room City View",
         image: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&q=80&w=800",
         features: ["350 sq.ft", "City View", "King Bed"],
         options: [
            { id: 101, plan: "Room Only", inclusions: ["Free WiFi", "Free Cancellation till 24hrs before"], price: hotel.price, tax: hotel.tax, status: "Recommended" },
            { id: 102, plan: "Room with Breakfast", inclusions: ["Free WiFi", "Breakfast Included", "Free Cancellation"], price: (parseInt(hotel.price.replace(/,/g, '')) + 1500).toLocaleString('en-IN'), tax: (parseInt(hotel.tax.replace(/,/g, '')) + 200).toLocaleString('en-IN') },
         ]
      }
   ];

   const scrollToSection = (id) => {
      const element = document.getElementById(id);
      if (element) {
         const offset = 220;
         const bodyRect = document.body.getBoundingClientRect().top;
         const elementRect = element.getBoundingClientRect().top;
         const elementPosition = elementRect - bodyRect;
         const offsetPosition = elementPosition - offset;

         window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
         setActiveTab(id);
      }
   };

   return (
      <div className="bg-[#f2f2f2] min-h-screen font-sans pb-20">
         <HotelSearchHeader destination="Mumbai" checkIn="18 Mar 2026" />

         {/* Breadcrumbs */}
         <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-2 text-[11px] font-black text-gray-400 uppercase tracking-widest">
            <span>Home</span> | <span>Hotels in Mumbai</span> | <span className="text-blue-600 font-bold">{hotel.name}</span>
         </div>

         <div className="max-w-7xl mx-auto px-6">

            {/* Title and Wishlist Row (Screenshot 1 Style) */}
            <div className="flex items-center justify-between mb-4">
               <div className="flex items-center gap-3">
                  <h1 className="text-2xl font-black text-gray-900 tracking-tight uppercase">{hotel.name}</h1>
                  <div className="flex gap-0.5">
                     <span className="text-[14px] font-black text-gray-900 border border-gray-900 px-1 rounded">5 STAR</span>
                  </div>
               </div>
               <button className="flex items-center gap-2 text-gray-600 font-black text-[13px] uppercase tracking-widest hover:text-red-500 transition-colors">
                  Wishlist
               </button>
            </div>

            {/* Image Gallery (66% Large left, 33% smaller stacked right) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8 items-start">

               <div className="lg:col-span-8 bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-sm">
                  <div className="grid grid-cols-3 h-[380px] gap-1">
                     <div className="col-span-2 relative group overflow-hidden">
                        <img src={hotel.images[0]} alt="Main" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                        <div className="absolute bottom-6 right-6">
                           <button className="bg-black/50 backdrop-blur-md px-6 py-2 rounded-xl text-[11px] font-black uppercase tracking-widest text-white flex items-center gap-2 shadow-xl hover:bg-black/70 transition-all border border-white/20">
                              1572 Property & Guest Photos
                           </button>
                        </div>
                     </div>
                     <div className="grid grid-rows-2 gap-1">
                        <div className="relative group overflow-hidden">
                           <img src={hotel.images[1]} alt="Sub 1" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                        </div>
                        <div className="relative group overflow-hidden">
                           <img src={hotel.images[2]} alt="Sub 2" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                           <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white cursor-pointer hover:bg-black/50 transition-all">
                              <span className="font-black text-[10px] uppercase tracking-widest">+12 Photos</span>
                           </div>
                        </div>
                     </div>
                  </div>

                  {/* About and Amenities Row (Screenshot 1 Style) */}
                  <div className="p-8 space-y-8">
                     <div>
                        <h2 className="text-xl font-black text-gray-900 uppercase tracking-tight mb-4">About Property</h2>
                        <p className="text-[14px] font-bold text-gray-500 leading-relaxed">
                           Set in the heart of Mumbai's historic Colaba district, this property is a masterpiece of Victorian luxury and Indian heritage. The hotel offers well-appointed rooms, contemporary amenities, and a warm, welcoming ambience... <button className="text-blue-600 hover:underline">Read more</button>
                        </p>
                     </div>

                     <div>
                        <h3 className="text-[12px] font-black text-gray-900 uppercase tracking-widest mb-6">Amenities</h3>
                        <div className="flex flex-wrap gap-8 items-center">
                           {[
                              { label: "Restaurant" },
                              { label: "Free WiFi" },
                              { label: "Lounge" },
                              { label: "Room Service" },
                              { label: "Indoor Games" },
                              { label: "Gym" }
                           ].map((item, idx) => (
                              <div key={idx} className="flex items-center gap-2.5 group">
                                 <span className="text-[12px] font-bold text-gray-600">{item.label}</span>
                              </div>
                           ))}
                           <button className="text-blue-600 text-[12px] font-black uppercase tracking-widest hover:underline ml-4 font-bold">View All</button>
                        </div>
                     </div>

                     {/* Login Banner (Screenshot 1 Style) */}
                     <div className="bg-white rounded-2xl border-2 border-blue-100 overflow-hidden flex items-center shadow-sm">
                        <div className="w-2 h-full bg-blue-600 shrink-0"></div>
                        <div className="flex-1 p-6 flex flex-col md:flex-row items-center justify-between gap-6">
                           <h3 className="text-[15px] font-black text-gray-900 uppercase tracking-tight">Login to unlock deals & manage your bookings!</h3>
                           <div className="flex items-center gap-3 w-full md:w-auto">
                              <div className="relative flex-1 md:w-[240px]">
                                 <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">+91</span>
                                 <input type="text" placeholder="Mobile Number" className="w-full pl-14 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:bg-white focus:border-blue-600 transition-all font-black outline-none " />
                              </div>
                              <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-black text-[11px] uppercase tracking-widest shadow-lg shadow-blue-500/20 active:scale-95 transition-all">
                                 LOGIN NOW
                              </button>
                           </div>
                        </div>
                     </div>
                  </div>

                  {/* Bottom Update Bar (Screenshot 1 Style) */}
                  <div className="p-6 bg-gray-50 border-t border-gray-100 flex flex-wrap items-center justify-between gap-4">
                     <div className="flex items-center gap-8">
                        <div className="space-y-1">
                           <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">Change Dates and Guest(s)</p>
                           <div className="flex items-center gap-4">
                              <button className="flex items-center gap-2 text-sm font-black text-gray-700 hover:text-blue-600 transition-colors">
                                 Sat, 18 Mar 2026
                              </button>
                              <span className="text-gray-300">|</span>
                              <button className="flex items-center gap-2 text-sm font-black text-gray-700 hover:text-blue-600 transition-colors">
                                 Mon, 20 Mar 2026
                              </button>
                              <span className="text-gray-300">|</span>
                              <button className="flex items-center gap-2 text-sm font-black text-gray-700 hover:text-blue-600 transition-colors">
                                 2 Adults, 1 Room
                              </button>
                           </div>
                        </div>
                     </div>
                     <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-black text-[11px] uppercase tracking-widest shadow-lg shadow-blue-500/30 transition-all active:scale-95">
                        UPDATE SEARCH
                     </button>
                  </div>
               </div>

               {/* Sidebar Component (Ginger Style Cards) */}
               <div className="lg:col-span-4 space-y-6">

                  {/* BOOK THIS NOW Card */}
                  <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden p-6 transition-all hover:shadow-md">
                     <h3 className="text-lg font-black text-gray-900 uppercase tracking-tight mb-2 leading-tight">Luxe Twin Room-Tropical View</h3>
                     <p className="text-[12px] font-bold text-gray-400 mb-4 uppercase tracking-widest">Fits 2 Adults</p>

                     <div className="flex items-center gap-2 text-[11px] font-bold text-green-600 mb-6 bg-green-50 p-2 rounded-lg border border-green-100">
                        <span>MEAL UPGRADE INCLUDED</span>
                     </div>

                     <div className="flex flex-col mb-6">
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Per Night:</p>
                        <div className="flex items-end gap-2">
                           <span className="text-3xl font-black text-gray-900 leading-none tabular-nums">₹4,899</span>
                           <span className="text-[11px] font-bold text-gray-500 pb-1">+ ₹245 taxes & fees</span>
                        </div>
                     </div>

                     <button
                        onClick={() => navigate('/hotels/review', { state: { hotel, room: { ...roomGroups[0].options[0], name: roomGroups[0].title + ' - ' + roomGroups[0].options[0].plan } } })}
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white py-4 rounded-xl font-black text-[13px] uppercase tracking-widest shadow-xl shadow-blue-500/20 transition-all active:scale-95 mb-4"
                     >
                        BOOK THIS NOW
                     </button>

                     <div className="p-3 bg-gray-50 rounded-xl flex items-center justify-between group cursor-pointer hover:bg-blue-50 transition-all">
                        <p className="text-[11px] font-black text-gray-800 uppercase">More options available with <span className="text-blue-600">Meals Included</span></p>
                     </div>
                  </div>

                  {/* Rating Card */}
                  <div className="bg-white rounded-3xl border border-gray-200 p-6 flex items-center justify-between shadow-sm">
                     <div className="flex items-center gap-4">
                        <div className="bg-blue-600 text-white w-12 h-12 rounded-xl flex items-center justify-center font-black text-xl shadow-lg shadow-blue-600/20">
                           4.3
                        </div>
                        <div>
                           <p className="text-lg font-black text-blue-600 italic leading-none">Excellent</p>
                           <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest mt-1">2614 ratings</p>
                        </div>
                     </div>
                     <button className="text-blue-600 text-[11px] font-black uppercase tracking-widest hover:underline font-bold">All Reviews</button>
                  </div>

                  {/* Location/Map Card */}
                  <div className="bg-white rounded-3xl border border-gray-200 p-6 flex items-center gap-4 shadow-sm">
                     <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center shrink-0 border border-blue-100 font-black text-blue-600 text-[10px]">
                        GOA MAP
                     </div>
                     <div className="flex-1">
                        <p className="text-lg font-black text-gray-900 uppercase tracking-tight">Candolim</p>
                        <p className="text-[11px] font-bold text-gray-500">8 minutes walk to Candolim Beach</p>
                     </div>
                     <button className="text-blue-600 text-[11px] font-black uppercase tracking-widest hover:underline font-bold">SEE MAP</button>
                  </div>

               </div>
            </div>

            {/* Content Section: Room Selection Table */}
            <div id="select rooms" className="mt-4">
               <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tight mb-8">Room Options</h2>
               {roomGroups.map((group, gIdx) => (
                  <div key={gIdx} className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden mb-10">
                     <div className="grid grid-cols-1 md:grid-cols-4">
                        <div className="md:col-span-1 p-8 border-r border-gray-100 bg-gray-50/20">
                           <h3 className="text-xl font-black text-gray-900 uppercase tracking-tight mb-4">{group.title}</h3>
                           <img src={group.image} alt={group.title} className="w-full h-48 object-cover rounded-2xl mb-4 shadow-sm" />
                           <ul className="space-y-3">
                              {group.features.map((f, i) => (
                                 <li key={i} className="flex items-center gap-2 text-[12px] font-bold text-gray-600 underline"> {f}</li>
                              ))}
                           </ul>
                        </div>
                        <div className="md:col-span-3 divide-y divide-gray-100">
                           {group.options.map((opt, oIdx) => (
                              <div key={oIdx} className="grid grid-cols-1 md:grid-cols-3 p-8 group hover:bg-blue-50/10 transition-all">
                                 <div className="space-y-4">
                                    <p className="text-[15px] font-black text-gray-800 uppercase tracking-tight">{opt.plan}</p>
                                    <ul className="space-y-2">
                                       {opt.inclusions.map((inc, i) => (
                                          <li key={i} className="flex items-start gap-2 text-[12px] font-bold text-green-600">{inc}</li>
                                       ))}
                                    </ul>
                                 </div>
                                 <div className="text-center flex flex-col justify-center py-6 md:py-0">
                                    <span className="text-2xl font-black text-gray-900 tracking-tight">₹{opt.price}</span>
                                    <p className="text-[11px] font-bold text-gray-400 mt-1 uppercase">+ ₹{opt.tax} TAXES</p>
                                    {opt.status && <span className="bg-orange-100 text-orange-600 text-[10px] font-black px-3 py-1 rounded uppercase mt-4 self-center tracking-widest">{opt.status}</span>}
                                 </div>
                                 <div className="flex flex-col justify-center items-end">
                                    <button
                                       onClick={() => navigate('/hotels/review', { state: { hotel, room: { ...opt, name: group.title + ' - ' + opt.plan } } })}
                                       className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-xl font-black text-[13px] uppercase tracking-widest shadow-lg shadow-blue-500/20 active:scale-95 transition-all"
                                    >
                                       Select Room
                                    </button>
                                 </div>
                              </div>
                           ))}
                        </div>
                     </div>
                  </div>
               ))}
            </div>

         </div>
      </div>
   );
};

export default HotelDetailsPage;
