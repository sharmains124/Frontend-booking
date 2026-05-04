import React, { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const properties = [
  {
    id: 1,
    img: "https://images.weserv.nl/?url=https://cdn6.agoda.net/images/WebCampaign/20260203_accor/home_banner_web/en-us.png",
    alt: "Accor Hotels - Discover Hotels"
  },
  {
    id: 2,
    img: "https://images.weserv.nl/?url=https://cdn6.agoda.net/images/WebCampaign/20260225_radisson/home_banner_web/en-us.png",
    alt: "Radisson Hotels - Enjoy Memorable Moments"
  },
  {
    id: 3,
    img: "https://images.weserv.nl/?url=https://cdn6.agoda.net/images/WebCampaign/20260401_in_wyndham/home_banner_web/en-us.png",
    alt: "Wyndham Hotels - Stay Made Simple"
  },
  {
    id: 4,
    img: "https://images.weserv.nl/?url=https://cdn6.agoda.net/images/WebCampaign/20251119_uk_clermont/home_banner_web/en-us.png",
    alt: "Clermont Hotels - Great Stays"
  },
  {
    id: 5,
    img: "https://images.weserv.nl/?url=https://cdn6.agoda.net/images/WebCampaign/20250903_th_absolute/home_banner_web/en-us.png",
    alt: "Absolute Hotels - Luxury Experience"
  }
];

const PremiumCollections = () => {
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
    <div className="space-y-8 pb-16 mt-6 w-full font-sans">
      <section
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="px-4 md:px-0"
      >
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-[32px] font-bold text-[#1a1a1a] tracking-tight">
              Properties we think you'll like
            </h2>
            <p className="text-gray-500 text-base mt-1">Handpicked brand deals for your next stay</p>
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
            {properties.map((prop) => (
              <div
                key={prop.id}
                className="relative flex shrink-0 snap-start cursor-pointer group/card rounded-[20px] overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
                style={{ width: '380px', minWidth: '380px', height: '175px' }}
              >
                {/* Image */}
                <img
                  src={prop.img}
                  alt={prop.alt}
                  referrerPolicy="no-referrer"
                  crossOrigin="anonymous"
                  className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-700"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.style.display = 'none';
                    e.target.parentElement.style.background = 'linear-gradient(135deg, #f0f4f8, #d9e2ec)';
                  }}
                />
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
    </div>
  );
};

export default PremiumCollections;
