import React, { useState } from 'react';
import BookingEngine from '../../components/SearchForm';
import { ChevronRight, ChevronLeft, QrCode } from 'lucide-react';
import { Link } from 'react-router-dom';

const HOTEL_OFFERS_DATA = [
   {
      title: "Grab Up to 40% OFF* on",
      subtitle: "Packages, Flights, Stays, Buses, Cabs, Trains & More",
      img: "https://promos.makemytrip.com/appfest/2x//Desktop-SummerSale-Common-02Apr.jpg?im=Resize=(134,134)",
      tag: "T&C's Apply",
      cta: "BOOK NOW"
   },
   {
      title: "KASHMIR TULIP FESTIVAL",
      subtitle: "Book Stunning Stays Nearby for a Vibrant Spring Escape!",
      img: "https://promos.makemytrip.com/appfest/2x//desktop-DH-Kashmir-200326.jpg?im=Resize=(134,134)",
      tag: "T&C's Apply",
      cta: "BOOK NOW"
   },
   {
      title: "For Your Char Dham Journey",
      subtitle: "Up to 40% OFF* on stays, packages, buses, cabs, trains & flights.",
      img: "https://promos.makemytrip.com/appfest/2x//Desktop-CharDham-1Apr.jpg?im=Resize=(134,134)",
      tag: "T&C's Apply",
      cta: "BOOK NOW"
   },
   {
      title: "LADAKH APRICOT BLOSSOM",
      subtitle: "Book Stays with Scenic Views and Get Set for a Surreal Getaway!",
      img: "https://promos.makemytrip.com/appfest/2x//desktop-DH-Ladakh-200326.jpg?im=Resize=(134,134)",
      tag: "T&C's Apply",
      cta: "BOOK NOW"
   },
   {
      title: "RuPay Credit Card Offers",
      subtitle: "Enjoy exclusive discounts when you book your stay with RuPay!",
      img: "https://promos.makemytrip.com/notification/xhdpi//rupay-116x116-19082022.jpg?im=Resize=(134,134)",
      tag: "T&C's Apply",
      cta: "BOOK NOW"
   },
   {
      title: "Up to 15% Savings with HSBC",
      subtitle: "Save extra on your next domestic or international booking.",
      img: "https://promos.makemytrip.com/appfest/2x//hsbc-116x116-06082025.jpg?im=Resize=(134,134)",
      tag: "T&C's Apply",
      cta: "BOOK NOW"
   },
   {
      title: "ICICI Bank Special Deals",
      subtitle: "Get flat instant discounts using your ICICI bank cards.",
      img: "https://promos.makemytrip.com/appfest/2x//icici-rupay-bg-23082125.jpg?im=Resize=(134,134)",
      tag: "T&C's Apply",
      cta: "BOOK NOW"
   },
   {
      title: "Luxury Stay at Amritara",
      subtitle: "Indulge in a premium holiday experience at unbeatable prices.",
      img: "https://promos.makemytrip.com/notification/xhdpi//116X116-amritara-21022024.jpg?im=Resize=(134,134)",
      tag: "T&C's Apply",
      cta: "BOOK NOW"
   }
];

const HotelLandingPage = () => {
   const [currentPage, setCurrentPage] = useState(0);
   const itemsPerPage = 4;
   const totalPages = Math.ceil(HOTEL_OFFERS_DATA.length / itemsPerPage);

   const nextPage = () => {
      if (currentPage < totalPages - 1) setCurrentPage(prev => prev + 1);
   };

   const prevPage = () => {
      if (currentPage > 0) setCurrentPage(prev => prev - 1);
   };

   const offerPages = [];
   for (let i = 0; i < HOTEL_OFFERS_DATA.length; i += itemsPerPage) {
      offerPages.push(HOTEL_OFFERS_DATA.slice(i, i + itemsPerPage));
   }

   return (
      <div className="bg-[#e5eef4] min-h-screen font-sans antialiased text-gray-900 pb-20">
         {/* Hero Section */}
         <section className="relative min-h-[60vh] md:min-h-[600px] flex flex-col items-center justify-center pt-32 pb-20 mb-20 lg:mb-32">
            {/* Background Layer */}
            <div className="absolute inset-0 z-0 select-none overflow-hidden bg-slate-950">
               {/* Overlays for better contrast and premium feel */}
               <div className="absolute inset-0 bg-black/30 z-10 mix-blend-multiply"></div>
               <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/20 z-10"></div>
               
               <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  disablePictureInPicture
                  controlsList="nodownload"
                  className="w-full h-full object-cover opacity-80 animate-pan"
               >
                  <source src="/assets/hotal%20video.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
               </video>
            </div>

            <style>
            {`
              @keyframes panBackground {
                0% { transform: scale(1) translateX(0); }
                50% { transform: scale(1.1) translateX(-2%); }
                100% { transform: scale(1) translateX(0); }
              }
              .animate-pan {
                animation: panBackground 25s ease-in-out infinite;
              }
            `}
            </style>

            <div className="container-custom relative z-20 text-center px-6 mt-0 w-full">
               <div className="mb-4 md:mb-8 max-w-5xl mx-auto">
                 <h1 className="text-4xl md:text-6xl lg:text-[75px] font-black text-white leading-tight tracking-tight mb-4 drop-shadow-2xl animate-fade-in-up delay-100">
                   Find Your <br className="md:hidden" />
                   <span className="decoration-primary/80 decoration-4 underline underline-offset-[12px]">Perfect Stay</span>
                 </h1>
                 <p className="text-sm md:text-base lg:text-lg text-white/90 max-w-2xl mx-auto font-medium tracking-wide mb-8 drop-shadow-lg leading-relaxed animate-fade-in-up delay-200">
                   Discover and book the finest hotels, resorts, and homestays worldwide.
                 </p>
               </div>

               {/* Search Engine Integration */}
               <div className="max-w-6xl mx-auto relative z-30 animate-fade-in-up delay-300 transform translate-y-4 pb-12">
                  <div className="bg-white rounded-[2rem] shadow-2xl p-2 md:p-4 border border-white/20">
                     <BookingEngine initialTab="Hotels" />
                  </div>
               </div>
            </div>
            
            {/* Aesthetic Micro-elements */}
            <div className="absolute bottom-10 left-10 text-white/20 text-[10px] font-bold tracking-[0.5em] uppercase pointer-events-none" style={{writingMode: "vertical-rl"}}>
               WINGTRIP &bull; ELITE STAYS
            </div>
         </section>

         <main className="max-w-[1200px] mx-auto px-4 space-y-10">

            {/* 1. Offers Section Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 overflow-hidden">
               <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-6">
                  <div className="flex items-center gap-6">
                     <h2 className="text-3xl font-black text-gray-900">Offers</h2>
                     <div className="flex gap-6 mt-1.5 ml-4 text-sm font-black">
                        <button className="text-[#008cff] border-b-2 border-[#008cff] pb-4 -mb-4">Hotels</button>
                        <button className="text-gray-500 hover:text-gray-800 transition-colors">All Offers</button>
                        <button className="text-gray-500 hover:text-gray-800 transition-colors">Flights</button>
                        <button className="text-gray-500 hover:text-gray-800 transition-colors">Holidays</button>
                        <button className="text-gray-500 hover:text-gray-800 transition-colors">Trains</button>
                        <button className="text-gray-500 hover:text-gray-800 transition-colors">Cabs</button>
                        <button className="text-gray-500 hover:text-gray-800 transition-colors">Bank Offers</button>
                     </div>
                  </div>
                  <div className="flex items-center gap-4">
                     <Link to="/offers" className="hidden md:block text-[#008cff] font-black text-xs uppercase tracking-widest hover:text-blue-700 transition-colors mr-2">VIEW ALL →</Link>
                     {totalPages > 1 && (
                        <div className="flex gap-2">
                           <button 
                              onClick={prevPage} 
                              disabled={currentPage === 0}
                              className={`w-8 h-8 rounded-full border flex items-center justify-center transition-colors shadow-sm ${currentPage === 0 ? 'border-gray-100 text-gray-200 cursor-not-allowed' : 'border-gray-200 text-gray-500 hover:text-[#008cff] hover:border-[#008cff]'}`}
                           >
                              <ChevronLeft size={16} />
                           </button>
                           <button 
                              onClick={nextPage} 
                              disabled={currentPage === totalPages - 1}
                              className={`w-8 h-8 rounded-full border flex items-center justify-center transition-colors shadow-sm ${currentPage === totalPages - 1 ? 'border-gray-100 text-gray-200 cursor-not-allowed' : 'border-gray-200 text-[#008cff] hover:bg-blue-50 border-[#008cff]'}`}
                           >
                              <ChevronRight size={16} />
                           </button>
                        </div>
                     )}
                  </div>
               </div>

               <div className="relative overflow-hidden mt-2">
                  <div 
                     className="flex transition-transform duration-700 ease-in-out"
                     style={{ transform: `translateX(-${currentPage * 100}%)` }}
                  >
                     {offerPages.map((page, pageIdx) => (
                        <div key={pageIdx} className="w-full flex-shrink-0 grid grid-cols-1 md:grid-cols-2 gap-6">
                           {page.map((offer, idx) => (
                              <div key={idx} className="flex gap-4 p-4 border border-gray-200 rounded-xl hover:shadow-md transition-shadow cursor-pointer bg-white group hover:border-gray-300">
                                 <div className="w-[120px] h-[120px] md:w-[140px] md:h-[140px] rounded-lg overflow-hidden shrink-0 shadow-inner">
                                    <img src={offer.img} alt={offer.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                 </div>
                                 <div className="flex flex-col justify-between py-1 relative w-full">
                                    <span className="absolute top-0 right-0 text-[10px] font-bold text-gray-400">{offer.tag}</span>
                                    <div>
                                       <h3 className="text-gray-900 font-black text-base md:text-lg leading-tight mb-2 pr-12 group-hover:text-blue-600 transition-colors">{offer.title}</h3>
                                       <div className="w-8 h-0.5 bg-red-500 mb-2 rounded-full"></div>
                                       <p className="text-xs text-gray-600 font-medium line-clamp-2 md:line-clamp-none">{offer.subtitle}</p>
                                    </div>
                                    <div className="text-right mt-2 md:mt-0">
                                       <span className="text-[#008cff] text-xs font-black uppercase tracking-widest inline-block transition-transform group-hover:underline">{offer.cta}</span>
                                    </div>
                                 </div>
                              </div>
                           ))}
                        </div>
                     ))}
                  </div>
               </div>
            </div>

            {/* 3. App Download Block */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 flex flex-col lg:flex-row gap-10 items-center overflow-hidden relative">
               <div className="flex gap-4 flex-1">
                  <div className="w-16 h-16 shrink-0 relative mt-2">
                     <img src="https://cdn-icons-png.flaticon.com/512/565/565342.png" alt="Mobile App" className="w-full h-full object-contain opactiy-90" />
                     <div className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-black rounded-full w-4 h-4 flex items-center justify-center shadow animate-pulse">%</div>
                  </div>
                  <div>
                     <h2 className="text-2xl font-black text-gray-900 mb-2">Download App Now !</h2>
                     <p className="text-sm font-medium text-gray-600 mb-6">Use code <strong className="text-gray-900 font-black">WELCOMEWING</strong> and get Upto <strong className="text-gray-900 font-black">Rs 5000 OFF</strong> on your first domestic hotel booking</p>

                     <div className="flex gap-2 w-full max-w-sm">
                        <div className="flex items-center gap-2 border border-gray-300 rounded px-3 py-2 bg-white flex-1">
                           <span className="font-bold text-sm text-gray-800 flex items-center gap-2">
                              <img src="https://upload.wikimedia.org/wikipedia/en/thumb/4/41/Flag_of_India.svg/20px-Flag_of_India.svg.png" alt="India" className="h-3 w-4" />
                              +91 <span className="text-gray-300">|</span>
                           </span>
                           <input type="tel" placeholder="Enter Mobile number" className="w-full outline-none text-sm font-bold placeholder-gray-400" />
                        </div>
                        <button className="bg-white border-2 border-[#008cff] text-[#008cff] hover:bg-blue-50 font-black text-xs px-6 py-2 rounded uppercase tracking-widest shadow-sm transition-colors whitespace-nowrap">
                           GET APP LINK
                        </button>
                     </div>
                  </div>
               </div>

               <div className="w-px h-24 bg-gray-200 hidden lg:block"></div>

               <div className="flex items-center gap-8 shrink-0">
                  <div className="flex flex-col gap-3">
                     <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Google Play" className="h-10 cursor-pointer object-contain hover:opacity-80 transition-opacity" />
                     <img src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" alt="App Store" className="h-10 cursor-pointer object-contain hover:opacity-80 transition-opacity" />
                  </div>
                  <div className="w-24 h-24 shrink-0 bg-white border border-gray-200 rounded-xl p-1 shadow-inner relative overflow-hidden flex items-center justify-center">
                     <QrCode size={80} className="text-gray-800" strokeWidth={1} />
                     <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#008cff]/20 to-transparent animate-scan"></div>
                  </div>
               </div>
            </div>

            {/* 4. Destinations Grid */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-8 gap-x-6">
                  {[
                     { name: 'Goa', desc: 'Hotels, Budget Hotels, Resorts, Best Hotels, Near Beach', img: 'https://promos.makemytrip.com/store/GoaDT.JPG' },
                     { name: 'Delhi', desc: 'Hotels, Budget Hotels, Resorts, Best Hotels, Near IGI Airport', img: 'https://promos.makemytrip.com/store/DelhiDT.JPG' },
                     { name: 'Bangalore', desc: 'Hotels, Budget Hotels, Resorts, Near Airport, Guhantara Resort', img: 'https://promos.makemytrip.com/store/BangaloreDT.JPG' },
                     { name: 'Ooty', desc: 'Hotels, Resorts, Cottages, Budget Hotels, Homestay', img: 'https://promos.makemytrip.com/images/50x50-Ooty-23052019.png' },
                     { name: 'Mumbai', desc: 'Hotels, Budget Hotels, Resorts, Couple Hotels, Near Mumbai Airport', img: 'https://promos.makemytrip.com/store/MumbaiDT.JPG' },
                     { name: 'Shimla', desc: 'Hotels, Budget Hotels, Best Hotels, Resorts, Near Mall Road', img: 'https://promos.makemytrip.com/images/50x50-Shimla-23052019.png' },
                     { name: 'Jaipur', desc: 'Hotels, Resorts, Budget Hotels, Best Hotels, Near Railway Station', img: 'https://promos.makemytrip.com/store/JaipurDT.JPG' },
                     { name: 'Manali', desc: 'Hotels, Resorts, Budget Hotels, Best Hotels, Near Mall Road', img: 'https://promos.makemytrip.com/images/50x50-Manali-23052019.png' },
                     { name: 'Dubai', desc: 'Hotels, Budget Hotels, 5 Star Hotels, Apartments, Homestays', img: 'https://promos.makemytrip.com/images/CDN_upload/shutterstock_1892460739.jpg' },
                     { name: 'Singapore', desc: 'Hotels, 5 Star Hotels, Little India, Orchard Road, Hostels, Hotels in Sentosa', img: 'https://promos.makemytrip.com/images/CDN_upload/popular%20area.jpg' },
                     { name: 'Bangkok', desc: 'Hotels, 3 Star Hotels, 5 Star Hotels, Hostels, Budget Hotels, Hotels in Sukhumvit', img: 'https://promos.makemytrip.com/images/CDN_upload/shutterstock_701150233.jpg' },
                     { name: 'Pattaya', desc: 'Hotels, Budget Hotels, 3 Star Hotels, Resorts, Central Pattaya, Beachfront', img: ' https://promos.makemytrip.com/images/CDN_upload/shutterstock_1008532504.jpg' },
                     { name: 'Phuket', desc: 'Hotels, Resorts, Budget Hotels, Beachfront Properties', img: 'https://promos.makemytrip.com/images/CDN_upload/shutterstock_389416630.jpg' },
                     { name: 'Bali', desc: 'Hotels, Resorts, 5 Star Hotels, Budget Hotels, Villas in Bali, Beachfront Properties', img: 'https://promos.makemytrip.com/images/CDN_upload/shutterstock_1306548694.jpg' },
                     { name: 'Maldives', desc: 'Hotels, 7 Star Hotels, Resorts, 5 Star Hotels, 4 Star Hotels, Hotels in Male', img: 'https://promos.makemytrip.com/images/CDN_upload/shutterstock_1901686090.jpg' },
                     { name: 'Others', desc: 'Puri Hotels, OYO Delhi, Alleppey Houseboats, Mahabaleshwar Hotels', img: 'https://promos.makemytrip.com/images/50x50-Other-23052019.png' },
                  ].map((city, idx) => (
                     <div key={idx} className="flex gap-4 items-start cursor-pointer group">
                        <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 shadow-inner group-hover:scale-105 transition-transform">
                           <img src={city.img} alt={city.name} className="w-full h-full object-cover" />
                        </div>
                        <div>
                           <h3 className="text-sm font-black text-gray-900 group-hover:text-[#008cff] transition-colors">{city.name}</h3>
                           <p className="text-[11px] font-bold text-gray-500 leading-tight mt-1 hover:text-gray-700">{city.desc}</p>
                        </div>
                     </div>
                  ))}
               </div>
            </div>

         </main>




      </div>
   );
};

export default HotelLandingPage;
