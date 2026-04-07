import React, { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const destinations = [
  { id: 1, name: 'Bangalore', properties: '5,372', img: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&q=80&w=600' },
  { id: 2, name: 'Mumbai', properties: '4,177', img: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&q=80&w=600' },
  { id: 3, name: 'Goa', properties: '9,254', img: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&q=80&w=600' },
  { id: 4, name: 'New Delhi', properties: '12,786', img: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&q=80&w=600' },
  { id: 5, name: 'Hyderabad', properties: '2,735', img: 'https://images.unsplash.com/photo-1571536802807-30451e3955d8?auto=format&fit=crop&q=80&w=600' },
  { id: 6, name: 'Chennai', properties: '2,832', img: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&q=80&w=600' },
  { id: 7, name: 'Jaipur', properties: '3,082', img: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&q=80&w=600' },
  { id: 8, name: 'Varanasi', properties: '2,000', img: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&q=80&w=600' },
  { id: 9, name: 'Kochi', properties: '2,165', img: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&q=80&w=600' },
  { id: 10, name: 'Pune', properties: '2,494', img: 'https://images.unsplash.com/photo-1598091383021-15ddea10925d?auto=format&fit=crop&q=80&w=600' }
];

const FeaturedDestinations = () => {
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
          scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
        }
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [isHovered]);

  const scrollLeft = () => {
    if (scrollRef.current) scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' });
  };
  
  const scrollRight = () => {
    if (scrollRef.current) scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
  };

  return (
    <section 
      className="max-w-7xl mx-auto px-4 w-full font-sans mb-12 mt-8"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <h2 className="text-3xl lg:text-[32px] font-bold text-[#1a1a1a] mb-6 text-left">
        Top destinations in India
      </h2>
      
      <div className="relative group">
        <div 
          ref={scrollRef}
          className="flex overflow-x-auto gap-4 md:gap-5 snap-x snap-mandatory pb-4 [&::-webkit-scrollbar]:hidden"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {destinations.map((dest) => (
            <div key={dest.id} className="flex flex-col shrink-0 w-[180px] md:w-[200px] lg:w-[220px] snap-start cursor-pointer group/card">
              <div className="w-full aspect-square rounded-[16px] overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <img 
                  src={dest.img} 
                  alt={dest.name} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover/card:scale-105" 
                />
              </div>
              <div className="mt-4 text-center">
                <h3 className="text-[#1a1a1a] text-lg font-bold leading-tight">{dest.name}</h3>
                <span className="text-gray-500 text-[13px]">{dest.properties} accommodations</span>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <button 
          onClick={scrollLeft}
          className="absolute left-2 top-[40%] -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg border border-gray-100 flex items-center justify-center text-gray-700 hover:text-primary hover:scale-110 transition-all z-10 opacity-0 group-hover:opacity-100 disabled:opacity-0"
        >
          <ChevronLeft size={24} />
        </button>
        <button 
          onClick={scrollRight}
          className="absolute right-2 top-[40%] -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg border border-gray-100 flex items-center justify-center text-gray-700 hover:text-primary hover:scale-110 transition-all z-10 opacity-0 group-hover:opacity-100"
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </section>
  );
};

export default FeaturedDestinations;
