import React, { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const properties = [
  {
    id: 1,
    img: "https://images.unsplash.com/photo-1613490901509-f31623588231?w=600&auto=format&fit=crop&q=80",
    alt: "Modern Luxury Villa",
    name: "Modern Luxury Villa",
    location: "Goa, India",
    price: "₹12,500/night"
  },
  {
    id: 2,
    img: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=600&auto=format&fit=crop&q=80",
    alt: "Beachfront Paradise",
    name: "Beachfront Paradise",
    location: "Maldives",
    price: "₹28,000/night"
  },
  {
    id: 3,
    img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&auto=format&fit=crop&q=80",
    alt: "Elite Private House",
    name: "Elite Private House",
    location: "Shimla, India",
    price: "₹9,800/night"
  },
  {
    id: 4,
    img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&auto=format&fit=crop&q=80",
    alt: "Designer Apartment",
    name: "Designer Apartment",
    location: "Mumbai, India",
    price: "₹6,500/night"
  },
  {
    id: 5,
    img: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=600&auto=format&fit=crop&q=80",
    alt: "Grand Estate",
    name: "Grand Estate",
    location: "Jaipur, India",
    price: "₹18,000/night"
  },
  {
    id: 6,
    img: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=600&auto=format&fit=crop&q=80",
    alt: "Mountain Retreat",
    name: "Mountain Retreat",
    location: "Manali, India",
    price: "₹7,200/night"
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
    }, 3500);
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
    <div className="space-y-8 pb-20 mt-8 w-full font-sans">
      <section
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-2xl md:text-[28px] font-bold text-[#1a1a1a]">
              Properties we think you'll like
            </h2>
            <p className="text-gray-500 text-sm mt-0.5">Handpicked stays for every traveller</p>
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
            {properties.map((prop) => (
              <div
                key={prop.id}
                className="flex flex-col shrink-0 snap-start cursor-pointer group/card"
                style={{ width: '280px', minWidth: '280px' }}
              >
                {/* Image */}
                <div
                  className="relative w-full overflow-hidden rounded-xl shadow-sm hover:shadow-md transition-shadow"
                  style={{ height: '180px' }}
                >
                  <img
                    src={prop.img}
                    alt={prop.alt}
                    referrerPolicy="no-referrer"
                    crossOrigin="anonymous"
                    className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.style.display = 'none';
                      e.target.parentElement.style.background = 'linear-gradient(135deg, #f0f4f8, #d9e2ec)';
                    }}
                  />
                  {/* Price Tag */}
                  <div className="absolute bottom-2 right-2 bg-white/95 text-[#1a1a1a] text-xs font-bold px-2 py-1 rounded-lg shadow-sm">
                    {prop.price}
                  </div>
                </div>

                {/* Info */}
                <div className="mt-2.5 px-0.5">
                  <h3 className="text-[#1a1a1a] text-sm font-bold leading-tight">{prop.name}</h3>
                  <p className="text-gray-500 text-xs mt-0.5">{prop.location}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Left Arrow */}
          <button
            onClick={scrollLeft}
            className="absolute left-0 top-[45%] -translate-y-1/2 -translate-x-3 w-9 h-9 bg-white rounded-full shadow-lg border border-gray-200 flex items-center justify-center text-gray-600 hover:text-[#e03a3c] hover:border-[#e03a3c] transition-all z-10"
            style={{ opacity: showLeft ? 1 : 0, pointerEvents: showLeft ? 'auto' : 'none' }}
          >
            <ChevronLeft size={20} />
          </button>

          {/* Right Arrow */}
          <button
            onClick={scrollRight}
            className="absolute right-0 top-[45%] -translate-y-1/2 translate-x-3 w-9 h-9 bg-white rounded-full shadow-lg border border-gray-200 flex items-center justify-center text-gray-600 hover:text-[#e03a3c] hover:border-[#e03a3c] transition-all z-10"
            style={{ opacity: showRight ? 1 : 0, pointerEvents: showRight ? 'auto' : 'none' }}
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </section>
    </div>
  );
};

export default PremiumCollections;
