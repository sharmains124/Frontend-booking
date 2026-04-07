import React, { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';


const properties = [
  { id: 1, img: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=800", alt: "Luxury Hotels" },
  { id: 2, img: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&q=80&w=800", alt: "Premium Resorts" },
  { id: 3, img: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&q=80&w=800", alt: "Boutique Stays" },
  { id: 4, img: "https://images.unsplash.com/photo-1445013544686-3394625b2f2c?auto=format&fit=crop&q=80&w=800", alt: "Business Class" },
  { id: 5, img: "https://images.unsplash.com/photo-1444201983204-c43cbd584d93?auto=format&fit=crop&q=80&w=800", alt: "Urban Escapes" }
];

const PremiumCollections = () => {
  const scrollRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  // Auto-scroll logic for Properties slider
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
    <div className="space-y-12 pb-20 mt-8 w-full font-sans">


      {/* Properties we think you'll like Section */}
      <section
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <h2 className="text-2xl md:text-[28px] font-bold text-[#1a1a1a] mb-5">
          Properties we think you'll like
        </h2>
        <div className="relative group">
          <div
            ref={scrollRef}
            className="flex overflow-x-auto gap-4 md:gap-5 snap-x snap-mandatory pb-4 [&::-webkit-scrollbar]:hidden"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {properties.map((promo) => (
              <div key={promo.id} className="relative flex shrink-0 w-[280px] md:w-[320px] lg:w-[360px] h-[160px] md:h-[180px] snap-start cursor-pointer rounded-[16px] overflow-hidden shadow-sm hover:shadow-md transition-shadow bg-gray-100 group/card">
                <img src={promo.img} alt={promo.alt} className="w-full h-full object-cover group-hover/card:scale-[1.03] transition-transform duration-500" />
              </div>
            ))}
          </div>

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

    </div>
  );
};

export default PremiumCollections;
