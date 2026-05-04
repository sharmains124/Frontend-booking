import React, { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Plane } from 'lucide-react';

const flightsPromotions = [
  {
    id: 1,
    img: 'https://images.weserv.nl/?url=https://cdn6.agoda.net/images/EmailMarketing/activities/hp_banner/web/en-us.png',
    alt: 'Tours, Attractions & More - Up to 5% OFF',
    badge: 'Worldwide',
    badgeColor: '#e03a3c',
  },
  {
    id: 2,
    img: 'https://images.weserv.nl/?url=https://cdn6.agoda.net/images/blt2/wcFlightsEvergreen2025/Web/5pct/en-us.png',
    alt: 'Flash Sale - Up to 5% OFF on all flights',
    badge: 'Limited Time',
    badgeColor: '#7c3aed',
  },
  {
    id: 3,
    img: 'https://images.weserv.nl/?url=https://cdn6.agoda.net/images/WebCampaign/2026Activities/Q226_HKDL_MSPA_HP1.png',
    alt: 'Hong Kong Disneyland - Get 2 Free Early Entry Passes',
    badge: 'Hong Kong',
    badgeColor: '#059669',
  },
];

const FlightActive = () => {
  const scrollRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(true);

  const updateArrows = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setShowLeft(scrollLeft > 10);
    setShowRight(scrollLeft + clientWidth < scrollWidth - 10);
  };

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
        updateArrows();
      }
    }, 4000);
    return () => clearInterval(interval);
  }, [isHovered]);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -340, behavior: 'smooth' });
      setTimeout(updateArrows, 400);
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 340, behavior: 'smooth' });
      setTimeout(updateArrows, 400);
    }
  };

  return (
    <section
      className="mx-auto w-full font-sans mb-16 mt-8 px-4 md:px-0"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-end justify-between mb-8">
        <div>
          <h2 className="text-2xl md:text-[32px] font-bold text-[#1a1a1a] tracking-tight">
            Flights & Activities <span className="text-[#e03a3c]">Promotions</span>
          </h2>
          <p className="text-gray-500 text-base mt-1">Best flight and travel deals curated for you</p>
        </div>
        <button className="text-[#e03a3c] font-bold hover:underline py-2 rounded-full flex items-center gap-1 text-sm shadow-sm px-4 border border-[#e03a3c] bg-white transition-all">
          View all <ChevronRight size={16} />
        </button>
      </div>

      <div className="relative group/container">
        <div
          ref={scrollRef}
          onScroll={updateArrows}
          className="flex overflow-x-auto gap-5 snap-x snap-mandatory pb-6 px-1 hide-scrollbar"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {flightsPromotions.map((promo) => (
            <div
              key={promo.id}
              className="relative flex shrink-0 snap-start cursor-pointer group/card rounded-[20px] overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
              style={{ width: '360px', minWidth: '360px', height: '170px' }}
            >
              {/* Image */}
              <img
                src={promo.img}
                alt={promo.alt}
                referrerPolicy="no-referrer"
                crossOrigin="anonymous"
                className="absolute inset-0 w-full h-full object-cover object-center group-hover/card:scale-105 transition-transform duration-700"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.style.display = 'none';
                  e.target.parentElement.style.background = 'linear-gradient(135deg, #1e3a5f, #2563eb)';
                }}
              />
              {/* Badge */}
              {promo.badge && (
                <div
                  className="absolute top-3 left-3 px-2.5 py-0.5 rounded-md text-white text-[10px] font-black uppercase shadow-md z-10"
                  style={{ backgroundColor: promo.badgeColor || '#e03a3c' }}
                >
                  {promo.badge}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Left Arrow */}
        <button
          onClick={scrollLeft}
          className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-11 h-11 bg-white rounded-full shadow-xl border border-gray-100 flex items-center justify-center text-gray-700 hover:text-[#e03a3c] transition-all z-20 ${showLeft ? 'opacity-100 scale-100' : 'opacity-0 scale-90 pointer-events-none'}`}
        >
          <ChevronLeft size={24} strokeWidth={2.5} />
        </button>

        {/* Right Arrow */}
        <button
          onClick={scrollRight}
          className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-11 h-11 bg-white rounded-full shadow-xl border border-gray-100 flex items-center justify-center text-gray-700 hover:text-[#e03a3c] transition-all z-20 ${showRight ? 'opacity-100 scale-100' : 'opacity-0 scale-90 pointer-events-none'}`}
        >
          <ChevronRight size={24} strokeWidth={2.5} />
        </button>
      </div>
    </section>
  );
};

export default FlightActive;
