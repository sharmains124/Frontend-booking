import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, MapPin, Compass, Camera, Calendar, Star, Search, ArrowRight, X, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';
import Hero from '../../components/Hero';

const OFFER_TABS = ['All Offers', 'Adventure', 'Beach', 'Heritage', 'Honeymoon', 'Luxury', 'Budget'];

const OFFERS_DATA = [
  {
    tag: 'EXOTIC ESCAPE',
    title: 'Bali: Sun, Sand & Serenity',
    subtitle: 'Flat 15% OFF on luxury retreats and spa packages.',
    img: 'https://images.weserv.nl/?url=https://images.unsplash.com/photo-1544644181-1484b3fdfc62?q=80&w=400&auto=format&fit=crop',
    validity: "T&C's Apply",
    cta: 'EXPLORE NOW',
    category: 'Beach'
  },
  {
    tag: 'ALPINE MAGIC',
    title: 'Swiss Alps: The Winter Wonderland',
    subtitle: 'Save up to ₹10,000 on premium ski-in ski-out tours.',
    img: 'https://images.weserv.nl/?url=https://images.unsplash.com/photo-1531219432768-9f540ce91ef3?q=80&w=400&auto=format&fit=crop',
    validity: "Expires 30 Jun 26",
    cta: 'VIEW DETAILS',
    category: 'Adventure'
  },
  {
    tag: 'HERITAGE JOURNEY',
    title: 'Rajasthan: Land of Kings',
    subtitle: 'Extra night free on heritage palace stays across Jaipur & Udaipur.',
    img: 'https://images.weserv.nl/?url=https://images.unsplash.com/photo-1599661046289-e31897846e41?q=80&w=400&auto=format&fit=crop',
    validity: "T&C's Apply",
    cta: 'BOOK NOW',
    category: 'Heritage'
  },
  {
    tag: 'TROPICAL PARADISE',
    title: 'Maldives: Overwater Villa Special',
    subtitle: 'Complimentary speedboat transfers & snorkeling gear included.',
    img: 'https://images.weserv.nl/?url=https://images.unsplash.com/photo-1514282401047-d79a71a590e8?q=80&w=400&auto=format&fit=crop',
    validity: "T&C's Apply",
    cta: 'VIEW DETAILS',
    category: 'Honeymoon'
  },
  {
    tag: 'CITY LIGHTS',
    title: 'Tokyo: Future Meets Tradition',
    subtitle: 'Curated 5-day tech & temple tour with local guides.',
    img: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?q=80&w=800&auto=format&fit=crop',
    validity: "Limited Time Offer",
    cta: 'EXPLORE',
    category: 'Luxury'
  },
  {
    tag: 'WILDLIFE SAFARI',
    title: 'Kenya: The Big Five Adventure',
    subtitle: 'Special family discounts on Maasai Mara group departures.',
    img: 'https://images.weserv.nl/?url=https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=400&auto=format&fit=crop',
    validity: "T&C's Apply",
    cta: 'BOOK NOW',
    category: 'Adventure'
  }
];

const POPULAR_DESTINATIONS = [
  { city: 'Bangalore', subtitle: 'Garden City: Tech Hub & Historic Parks', src: 'https://images.weserv.nl/?url=https://images.unsplash.com/photo-1596176530529-78163a4f7af2?q=80&w=400&auto=format&fit=crop' },
  { city: 'Mumbai', subtitle: 'Coastal City: Gateway of India & Marine Drive', src: 'https://images.weserv.nl/?url=https://images.unsplash.com/photo-1566552881560-0be862a7c445?q=80&w=400&auto=format&fit=crop' },
  { city: 'Goa', subtitle: 'Beach Paradise: Sunsets, Parties & Sea Food', src: 'https://images.weserv.nl/?url=https://images.unsplash.com/photo-1512783563744-1996ec8c7921?q=80&w=400&auto=format&fit=crop' },
  { city: 'New Delhi', subtitle: 'Heritage Hub: Red Fort & Qutub Minar', src: 'https://images.weserv.nl/?url=https://images.unsplash.com/photo-1587474260584-136574528ed5?q=80&w=400&auto=format&fit=crop' },
  { city: 'Jaipur', subtitle: 'Pink City: Hawa Mahal & Amer Fort', src: 'https://images.weserv.nl/?url=https://images.unsplash.com/photo-1477587458883-47145ed94245?q=80&w=400&auto=format&fit=crop' },
  { city: 'Udaipur', subtitle: 'City of Lakes: Lake Palace & Pichola', src: 'https://images.weserv.nl/?url=https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?q=80&w=400&auto=format&fit=crop' },
  { city: 'Manali', subtitle: 'Hill Station: Snow Peaks & Solang Valley', src: 'https://images.weserv.nl/?url=https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=400&auto=format&fit=crop' },
  { city: 'Agra', subtitle: 'Taj Mahal City: Mughal Architecture & Petha', src: 'https://images.weserv.nl/?url=https://images.unsplash.com/photo-1548013146-72479768bbaa?q=80&w=600&auto=format&fit=crop' },
  { city: 'Kochi', subtitle: 'Coastal Beauty: Chinese Nets & Backwaters', src: 'https://images.weserv.nl/?url=https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?q=80&w=600&auto=format&fit=crop' },
];

const FEATURED_IMGS = [
  { name: 'Maldives', url: 'https://images.weserv.nl/?url=https://images.unsplash.com/photo-1514282401047-d79a71a590e8?q=80&w=400&auto=format&fit=crop' },
  { name: 'Paris', url: 'https://images.weserv.nl/?url=https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=400&auto=format&fit=crop' },
  { name: 'Santorini', url: 'https://images.weserv.nl/?url=https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=400&auto=format&fit=crop' },
  { name: 'Tokyo', url: 'https://images.weserv.nl/?url=https://images.unsplash.com/photo-1540959733332-e9ab65bc3ad1?q=80&w=800&auto=format&fit=crop' },
];

const DestinationsLandingPage = () => {
  const [activeOfferTab, setActiveOfferTab] = useState('All Offers');
  const [currentPage, setCurrentPage] = useState(0);

  const filteredOffers = OFFERS_DATA.filter(off =>
    activeOfferTab === 'All Offers' || off.category === activeOfferTab
  );

  const itemsPerPage = 4;
  const totalPages = Math.ceil(filteredOffers.length / itemsPerPage);

  const handleTabChange = (tab) => {
    setActiveOfferTab(tab);
    setCurrentPage(0);
  };

  const offerPages = [];
  for (let i = 0; i < filteredOffers.length; i += itemsPerPage) {
    offerPages.push(filteredOffers.slice(i, i + itemsPerPage));
  }

  return (
    <div className="bg-[#ebeae8] min-h-screen font-sans antialiased text-slate-900 overflow-x-hidden pb-0">
      {/* Hero Section */}
      <Hero
        bgType="video"
        bgUrl="/assets/Destination video.mp4"
        animate={true}
        title={<>Find Your Next <span className="text-white decoration-blue-500 underline underline-offset-[12px]">Destination</span></>}
        subTitle="From stunning beaches to vibrant cities, explore the world’s most amazing places and plan your perfect getaway with ease."
      />

      <main className="pt-8">

        {/* ── OFFERS SECTION ── */}
        <section className="bg-white rounded-2xl shadow-xl border border-gray-100 max-w-[1200px] mx-auto overflow-hidden mt-6 mb-12 z-20 relative p-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 pb-1 border-b border-gray-100">
            <div className="flex items-center gap-10">
              <h2 className="text-3xl font-black text-slate-800 tracking-tight">Special Offers</h2>
              <div className="flex items-center gap-8 overflow-x-auto hide-scrollbar pt-2">
                {OFFER_TABS.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => handleTabChange(tab)}
                    className={`pb-3 text-[14px] font-bold whitespace-nowrap transition-all relative
                      ${activeOfferTab === tab
                        ? 'text-[#008cff] border-b-[3px] border-[#008cff]'
                        : 'text-gray-500 hover:text-gray-800'
                      }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Link to="/offers" className="hidden md:block text-[#008cff] text-[13px] font-black hover:underline whitespace-nowrap uppercase tracking-[0.1em] mr-4 text-center leading-[2.5]">
                VIEW ALL
              </Link>
              {totalPages > 1 && (
                <div className="flex items-center gap-2">
                  <button onClick={() => setCurrentPage(prev => Math.max(0, prev - 1))} className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-400"><ChevronLeft size={20} /></button>
                  <button onClick={() => setCurrentPage(prev => Math.min(totalPages - 1, prev + 1))} className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-400"><ChevronRight size={20} /></button>
                </div>
              )}
            </div>
          </div>

          <div className="relative overflow-hidden">
            <div className="flex transition-transform duration-700 ease-in-out" style={{ transform: `translateX(-${currentPage * 100}%)` }}>
              {offerPages.map((page, pIdx) => (
                <div key={pIdx} className="w-full flex-shrink-0 grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {page.map((offer, idx) => (
                    <div key={idx} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 cursor-pointer flex h-[150px] group">
                      <div className="w-[120px] sm:w-[140px] h-full overflow-hidden">
                        <img src={offer.img} alt={offer.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                      </div>
                      <div className="flex-1 p-4 flex flex-col justify-center">
                        <span className="text-[10px] font-black text-primary uppercase tracking-widest mb-1">{offer.tag}</span>
                        <h3 className="text-[15px] font-black text-slate-800 mb-1 leading-tight">{offer.title}</h3>
                        <p className="text-[11px] text-gray-500 line-clamp-2 leading-relaxed mb-2">{offer.subtitle}</p>
                        <div className="flex justify-between items-center mt-auto">
                          <span className="text-[9px] font-bold text-gray-400 uppercase">{offer.validity}</span>
                          <span className="text-[#008cff] text-[10px] font-black uppercase tracking-widest group-hover:underline">{offer.cta}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FEATURED DESTINATIONS GRID ── */}
        <section className="max-w-[1200px] mx-auto px-6 py-10">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-10">
            <h2 className="text-[24px] font-black text-slate-800 mb-8">Trending Destinations Around The World</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {FEATURED_IMGS.map((img, idx) => (
                <div key={idx} className="group cursor-pointer">
                  <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-md mb-3">
                    <img src={img.url} alt={img.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                      <p className="text-white font-black text-sm uppercase tracking-widest">{img.name}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── POPULAR DESTINATIONS GRID ── */}
        <section className="max-w-[1200px] mx-auto px-6 py-10">
          <h2 className="text-[20px] font-black text-slate-800 mb-6 uppercase tracking-wider">Top Destinations In India</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-5">
            {POPULAR_DESTINATIONS.map((dest, idx) => (
              <div key={idx} className="flex items-center gap-4 py-3 cursor-pointer group">
                <div className="w-[50px] h-[50px] rounded-full overflow-hidden border-2 border-gray-200 group-hover:border-[#008cff] transition-colors">
                  <img src={dest.src} alt={dest.city} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="text-[14px] font-bold text-slate-800 group-hover:text-[#008cff] transition-colors">{dest.city}</h4>
                  <p className="text-[11px] text-gray-400 leading-snug">{dest.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── BOTTOM NAV ── */}
        <section className="bg-[#1a1a2e] py-3 mt-12">
          <div className="max-w-[1200px] mx-auto px-6 flex items-center gap-6 overflow-x-auto hide-scrollbar">
            {['Explore', 'Honeymoon', 'Family', 'Adventure', 'Nature', 'Pilgrimage', 'Beach', 'Hill Stations'].map((item, i) => (
              <span key={i} className={`text-[11px] font-bold whitespace-nowrap cursor-pointer ${i === 0 ? 'text-white border-b-2 border-[#008cff] pb-1' : 'text-gray-400 hover:text-white'}`}>
                {item}
              </span>
            ))}
          </div>
        </section>


      </main>

      <style dangerouslySetInnerHTML={{
        __html: `
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
    </div>
  );
};

export default DestinationsLandingPage;
