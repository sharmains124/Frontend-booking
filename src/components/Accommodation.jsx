import React, { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Building2 } from 'lucide-react';

const promotions = [
  {
    id: 1,
    title: "Grab all your DEALS here!",
    subtitle: "%",
    bgClass: "bg-gradient-to-br from-purple-600 to-fuchsia-600",
    image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=800",
    badge: "Limited"
  },
  {
    id: 2,
    title: "Pay Day Sale",
    subtitle: "Extra 20% off",
    bgClass: "bg-gradient-to-r from-orange-500 to-red-500",
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&q=80&w=800",
    badge: "Worldwide"
  },
  {
    id: 3,
    title: "Night Owl SALE",
    subtitle: "Extra 20% off",
    bgClass: "bg-gradient-to-br from-blue-900 to-indigo-900",
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&q=80&w=800",
    badge: "Worldwide"
  },
  {
    id: 4,
    title: "Spring Sale",
    subtitle: "Extra 15% off",
    bgClass: "bg-gradient-to-r from-blue-600 to-blue-400",
    image: "https://images.unsplash.com/photo-1445013544686-3394625b2f2c?auto=format&fit=crop&q=80&w=800",
    badge: "Worldwide"
  },
  {
    id: 5,
    title: "7APPLE Hotels",
    subtitle: "Extra 10% off",
    bgClass: "bg-red-700",
    image: "https://cdn6.agoda.net/images/WebCampaign/20251216_in_7applehotels/home_banner_web/en-us.png",
    badge: "India"
  },
  {
    id: 6,
    title: "STONE WOOD",
    subtitle: "Extra 10% off",
    bgClass: "bg-teal-900",
    image: "https://cdn6.agoda.net/images/WebCampaign/20251118_in_stonewood/home_banner_web/en-us.png",
    badge: "India"
  },
  {
    id: 7,
    title: "Summit Resorts",
    subtitle: "Extra 10% off",
    bgClass: "bg-amber-900",
    image: "https://cdn6.agoda.net/images/WebCampaign/20250718_in_summit/home_banner_web/en-us.png",
    badge: "India"
  },
  {
    id: 8,
    title: "The Big Deal",
    subtitle: "Extra 10% OR MORE",
    bgClass: "bg-emerald-600",
    image: "https://cdn6.agoda.net/images/WebCampaign/20250120_ss_bigdeal/home_banner_web/en-us.png",
    badge: "Worldwide"
  },
  {
    id: 9,
    title: "Visit Malaysia",
    subtitle: "Extra 15% off",
    bgClass: "bg-blue-600",
    image: "https://cdn6.agoda.net/images/WebCampaign/20260115_my_visitmalaysia/home_banner_web/en-us.png",
    badge: "Malaysia"
  },
  {
    id: 10,
    title: "Escape Bonanza",
    subtitle: "Extra 10% off",
    bgClass: "bg-sky-500",
    image: "https://cdn6.agoda.net/images/WebCampaign/20251224_isc_escapebonanzasale/home_banner_web/en-us.png",
    badge: "South Asia"
  }
];

const Accommodation = () => {
  const scrollRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  // Auto-scroll logic
  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        if (scrollLeft + clientWidth >= scrollWidth - 10) {
          scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          scrollRef.current.scrollBy({ left: 340, behavior: 'smooth' });
        }
      }
    }, 3500);
    return () => clearInterval(interval);
  }, [isHovered]);

  const scrollLeft = () => {
    if (scrollRef.current) scrollRef.current.scrollBy({ left: -340, behavior: 'smooth' });
  };

  const scrollRight = () => {
    if (scrollRef.current) scrollRef.current.scrollBy({ left: 340, behavior: 'smooth' });
  };

  return (
    <section
      className="mx-auto w-full font-sans mb-12 mt-4"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl md:text-[28px] font-bold text-[#1a1a1a]">
          Accommodation Promotions
        </h2>
        <button className="text-blue-600 font-bold hover:underline flex items-center gap-1 text-sm md:text-base">
          View all <ChevronRight size={18} />
        </button>
      </div>

      <div className="relative group">
        <div
          ref={scrollRef}
          className="flex overflow-x-auto gap-4 snap-x snap-mandatory pb-4 [&::-webkit-scrollbar]:hidden"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {promotions.map((promo) => (
            <div key={promo.id} className="relative flex shrink-0 w-[280px] md:w-[320px] lg:w-[360px] h-[160px] md:h-[180px] snap-start cursor-pointer group/card rounded-[16px] overflow-hidden shadow-sm hover:shadow-md transition-shadow bg-gray-100">
              {promo.image && (
                <img src={promo.image} alt={promo.title} className="w-full h-full object-cover group-hover/card:scale-[1.03] transition-transform duration-500" />
              )}
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={scrollLeft}
          className="absolute left-2 top-[50%] -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg border border-gray-100 flex items-center justify-center text-gray-700 hover:text-blue-600 hover:scale-110 transition-all z-10 opacity-0 group-hover:opacity-100 disabled:opacity-0"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={scrollRight}
          className="absolute right-2 top-[50%] -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg border border-gray-100 flex items-center justify-center text-gray-700 hover:text-blue-600 hover:scale-110 transition-all z-10 opacity-0 group-hover:opacity-100"
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </section>
  );
};

export default Accommodation;
