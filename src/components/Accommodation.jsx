import React, { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const promotions = [
  { 
    id: 1, 
    badge: "Worldwide",
    badgeColor: "#2563eb",
    image: "https://images.weserv.nl/?url=https://cdn6.agoda.net/images/WebCampaign/dealspagebanner_hp_web/en-us.png" 
  },
  { 
    id: 2, 
    badge: "Worldwide", 
    badgeColor: "#f97316", 
    image: "https://images.weserv.nl/?url=https://cdn6.agoda.net/images/WebCampaign/RTA/2604_IDFC_HP/homeweb/en-us.png" 
  },
  { 
    id: 3, 
    badge: "Worldwide", 
    badgeColor: "#3b82f6", 
    image: "https://images.weserv.nl/?url=https://cdn6.agoda.net/images/WebCampaign/20260330_ss_agp/home_banner_web/en-us.png" 
  },
  { 
    id: 4, 
    badge: "Worldwide", 
    badgeColor: "#0ea5e9", 
    image: "https://images.weserv.nl/?url=https://cdn6.agoda.net/images/WebCampaign/wcMM20230312/home_banner_web3/en-us.png" 
  },
  { 
    id: 5, 
    badge: "India", 
    badgeColor: "#ef4444", 
    image: "https://images.weserv.nl/?url=https://cdn6.agoda.net/images/WebCampaign/20260331_vn_bigholiday/home_banner_web/en-us.png" 
  },
  { 
    id: 6, 
    badge: "India", 
    badgeColor: "#0f766e", 
    image: "https://images.weserv.nl/?url=https://cdn6.agoda.net/images/WebCampaign/20260331_my_visitmalaysia/home_banner_web/en-us.png" 
  },
  { 
    id: 7, 
    badge: "India", 
    badgeColor: "#92400e", 
    image: "https://images.weserv.nl/?url=https://cdn6.agoda.net/images/WebCampaign/20260330_isc_spring_season_sale/home_banner_web/en-us.png" 
  },
  { 
    id: 8, 
    badge: "Worldwide", 
    badgeColor: "#059669", 
    image: "https://images.weserv.nl/?url=https://cdn6.agoda.net/images/WebCampaign/20260227_cn_canton/home_banner_web/en-us.png" 
  },
  { 
    id: 9, 
    badge: "Malaysia", 
    badgeColor: "#2563eb", 
    image: "https://images.weserv.nl/?url=https://cdn6.agoda.net/images/WebCampaign/20260312_eu_getawaydeal/home_banner_web/en-us.png" 
  },
  { 
    id: 10, 
    badge: "South Asia", 
    badgeColor: "#0369a1", 
    image: "https://images.weserv.nl/?url=https://cdn6.agoda.net/images/WebCampaign/20250403_ka_eliteescapes/home_banner_web/en-us.png" 
  },
];

const Accommodation = () => {
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
    }, 4500);
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
      className="mx-auto w-full font-sans mb-16 mt-6 px-4 md:px-0"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-end justify-between mb-8">
        <div>
          <h2 className="text-2xl md:text-[32px] font-bold text-[#1a1a1a] tracking-tight">
            Accommodation Promotions
          </h2>
          <p className="text-gray-500 text-base mt-1">Exclusive hotel deals just for you</p>
        </div>
        <button className="text-[#e03a3c] font-bold hover:underline py-2 rounded-full flex items-center gap-1 text-sm shadow-sm px-4 border border-[#e03a3c] bg-white transition-all">
          View all <ChevronRight size={16} />
        </button>
      </div>

      <div className="relative group/container">
        {/* Scroll Container */}
        <div
          ref={scrollRef}
          onScroll={updateArrows}
          className="flex overflow-x-auto gap-5 snap-x snap-mandatory pb-6 px-1 hide-scrollbar"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {promotions.map((promo) => (
            <div
              key={promo.id}
              className="relative flex shrink-0 snap-start cursor-pointer group/card rounded-[20px] overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
              style={{ width: '310px', minWidth: '310px', height: '165px' }}
            >
              {/* Background Image - Poster style */}
              <img
                src={promo.image}
                referrerPolicy="no-referrer"
                crossOrigin="anonymous"
                className="absolute inset-0 w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-500"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.style.background = 'linear-gradient(135deg, #667eea, #764ba2)';
                  e.target.style.display = 'none';
                }}
              />
              
              {/* Badge */}
              {promo.badge && (
                <div
                  className="absolute top-3 left-3 px-2 py-0.5 rounded-md text-white text-[10px] font-black uppercase shadow-md z-10"
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

export default Accommodation;

