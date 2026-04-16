import React, { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Plane } from 'lucide-react';

const flightsPromotions = [
  {
    id: 1,
    img: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80&w=800',
    alt: 'International Flights - Flat 10% OFF',
    title: 'International Flights',
    subtitle: 'Flat 10% OFF* | Use code: FLYNOW',
    badge: 'Worldwide',
    badgeColor: '#2563eb',
  },
  {
    id: 2,
    img: 'https://images.unsplash.com/photo-1542296332-2e4473faf563?auto=format&fit=crop&q=80&w=800',
    alt: 'Business Class Premium Flights',
    title: 'Business Class Deals',
    subtitle: 'Premium Experience | From ₹28,000',
    badge: 'Premium',
    badgeColor: '#7c3aed',
  },
  {
    id: 3,
    img: 'https://images.unsplash.com/photo-1556388158-158ea5ccacbd?auto=format&fit=crop&q=80&w=800',
    alt: 'Domestic Flights India Starting 999',
    title: 'Domestic Flights',
    subtitle: 'Starting ₹999* | All Major Airports',
    badge: 'India',
    badgeColor: '#e03a3c',
  },
  {
    id: 4,
    img: 'https://images.unsplash.com/photo-1583207823870-bf44e9f0de07?auto=format&fit=crop&q=80&w=800',
    alt: 'Sky High Savings Upto 5000 OFF',
    title: 'Sky High Savings',
    subtitle: 'Upto ₹5,000 OFF | Flash Sale Today',
    badge: 'HOT 🔥',
    badgeColor: '#dc2626',
  },
  {
    id: 5,
    img: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&q=80&w=800',
    alt: 'Student Discount Flights',
    title: 'Student Fares',
    subtitle: 'Extra 12% OFF for Students | Verified',
    badge: 'Student',
    badgeColor: '#0891b2',
  },
  {
    id: 6,
    img: 'https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?auto=format&fit=crop&q=80&w=800',
    alt: 'Armed Forces Discount Flights',
    title: 'Armed Forces Special',
    subtitle: 'Special Fares for Defence Personnel',
    badge: 'Defence',
    badgeColor: '#065f46',
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
      className="mx-auto w-full font-sans mb-12 mt-8"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center justify-between mb-5 px-1">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-red-50 flex items-center justify-center text-[#e03a3c]">
            <Plane size={20} />
          </div>
          <div>
            <h2 className="text-2xl md:text-[28px] font-bold text-[#1a1a1a] tracking-tight">
              Flights & Activities <span className="text-[#e03a3c]">Promotions</span>
            </h2>
            <p className="text-gray-500 text-sm">Best flight deals curated for you</p>
          </div>
        </div>
        <button className="text-[#e03a3c] font-semibold hover:underline flex items-center gap-1 text-sm hidden md:flex">
          View all <ChevronRight size={16} />
        </button>
      </div>

      <div className="relative">
        <div
          ref={scrollRef}
          onScroll={updateArrows}
          className="flex overflow-x-auto gap-4 snap-x snap-mandatory pb-2"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {flightsPromotions.map((promo) => (
            <div
              key={promo.id}
              className="relative flex shrink-0 snap-start cursor-pointer group/card rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
              style={{ width: '340px', minWidth: '340px', height: '180px' }}
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
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

              {/* Badge */}
              <div
                className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-white text-[10px] font-bold shadow-md"
                style={{ backgroundColor: promo.badgeColor || '#e03a3c' }}
              >
                {promo.badge}
              </div>

              {/* Text */}
              <div className="absolute bottom-3 left-3 right-3">
                <h3 className="text-white text-base font-bold leading-tight drop-shadow-md">
                  {promo.title}
                </h3>
                <p className="text-white/85 text-xs font-medium mt-0.5">{promo.subtitle}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Left Arrow */}
        <button
          onClick={scrollLeft}
          className="absolute left-0 top-[50%] -translate-y-1/2 -translate-x-3 w-9 h-9 bg-white rounded-full shadow-lg border border-gray-200 flex items-center justify-center text-gray-600 hover:text-[#e03a3c] hover:border-[#e03a3c] transition-all z-10"
          style={{ opacity: showLeft ? 1 : 0, pointerEvents: showLeft ? 'auto' : 'none' }}
        >
          <ChevronLeft size={20} />
        </button>

        {/* Right Arrow */}
        <button
          onClick={scrollRight}
          className="absolute right-0 top-[50%] -translate-y-1/2 translate-x-3 w-9 h-9 bg-white rounded-full shadow-lg border border-gray-200 flex items-center justify-center text-gray-600 hover:text-[#e03a3c] hover:border-[#e03a3c] transition-all z-10"
          style={{ opacity: showRight ? 1 : 0, pointerEvents: showRight ? 'auto' : 'none' }}
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </section>
  );
};

export default FlightActive;
