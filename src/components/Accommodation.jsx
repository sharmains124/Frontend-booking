import React, { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const promotions = [
  { id: 1,  title: "Grab all your DEALS here!", subtitle: "Up to 30% OFF",      badge: "Limited",   badgeColor: "#8b5cf6", image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=600" },
  { id: 2,  title: "Pay Day Sale",              subtitle: "Extra 20% off",       badge: "Worldwide", badgeColor: "#f97316", image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&q=80&w=600" },
  { id: 3,  title: "Night Owl SALE",            subtitle: "Extra 20% off",       badge: "Worldwide", badgeColor: "#3b82f6", image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&q=80&w=600" },
  { id: 4,  title: "Spring Sale",               subtitle: "Extra 15% off",       badge: "Worldwide", badgeColor: "#0ea5e9", image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=600" },
  { id: 5,  title: "7APPLE Hotels",             subtitle: "Extra 10% off",       badge: "India",     badgeColor: "#ef4444", image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&q=80&w=600" },
  { id: 6,  title: "STONE WOOD",                subtitle: "Extra 10% off",       badge: "India",     badgeColor: "#0f766e", image: "https://images.unsplash.com/photo-1596436889106-be35e843f974?auto=format&fit=crop&q=80&w=600" },
  { id: 7,  title: "Summit Resorts",            subtitle: "Extra 10% off",       badge: "India",     badgeColor: "#92400e", image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&q=80&w=600" },
  { id: 8,  title: "The Big Deal",              subtitle: "Extra 10% OR MORE",   badge: "Worldwide", badgeColor: "#059669", image: "https://images.unsplash.com/photo-1542314831-c6a4d14d8c1e?auto=format&fit=crop&q=80&w=600" },
  { id: 9,  title: "Visit Malaysia",            subtitle: "Extra 15% off",       badge: "Malaysia",  badgeColor: "#2563eb", image: "https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&q=80&w=600" },
  { id: 10, title: "Escape Bonanza",            subtitle: "Extra 10% off",       badge: "South Asia", badgeColor: "#0369a1", image: "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?auto=format&fit=crop&q=80&w=600" },
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
    <section
      className="mx-auto w-full font-sans mb-12 mt-4"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-2xl md:text-[28px] font-bold text-[#1a1a1a]">
            Accommodation Promotions
          </h2>
          <p className="text-gray-500 text-sm mt-0.5">Exclusive hotel deals just for you</p>
        </div>
        <button className="text-[#e03a3c] font-semibold hover:underline flex items-center gap-1 text-sm">
          View all <ChevronRight size={16} />
        </button>
      </div>

      <div className="relative">
        {/* Scroll Container */}
        <div
          ref={scrollRef}
          onScroll={updateArrows}
          className="flex overflow-x-auto gap-4 snap-x snap-mandatory pb-2"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {promotions.map((promo) => (
            <div
              key={promo.id}
              className="relative flex shrink-0 snap-start cursor-pointer group/card rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
              style={{ width: '300px', minWidth: '300px', height: '160px' }}
            >
              {/* Background Image */}
              <img
                src={promo.image}
                alt={promo.title}
                referrerPolicy="no-referrer"
                crossOrigin="anonymous"
                className="absolute inset-0 w-full h-full object-cover object-center group-hover/card:scale-105 transition-transform duration-500"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.style.background = 'linear-gradient(135deg, #667eea, #764ba2)';
                  e.target.style.display = 'none';
                }}
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              {/* Badge */}
              <div
                className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-white text-[11px] font-bold shadow-md"
                style={{ backgroundColor: promo.badgeColor }}
              >
                {promo.badge}
              </div>
              {/* Text */}
              <div className="absolute bottom-3 left-3 right-3">
                <h3 className="text-white text-sm font-bold leading-tight drop-shadow-md">
                  {promo.title}
                </h3>
                <p className="text-white/90 text-xs font-medium mt-0.5">{promo.subtitle}</p>
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

export default Accommodation;
