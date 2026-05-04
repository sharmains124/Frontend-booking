import React, { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const destinations = [
  { id: 1,  name: 'Bangalore', properties: '5,372',  img: 'https://images.weserv.nl/?url=https://pix6.agoda.net/geo/city/4923/1_4923_02.jpg?ca=8&ce=1&s=345x345&ar=1x1' },
  { id: 2,  name: 'Mumbai',    properties: '4,177',  img: 'https://images.weserv.nl/?url=https://pix6.agoda.net/geo/city/16850/1_16850_02.jpg?ca=6&ce=1&s=345x345&ar=1x1' },
  { id: 3,  name: 'Goa',       properties: '9,254',  img: 'https://images.weserv.nl/?url=https://pix6.agoda.net/geo/city/11304/077a5dc2a344a604731be86537916ba0.jpg?ce=0&s=345x345&ar=1x1' },
  { id: 4,  name: 'New Delhi', properties: '12,786', img: 'https://images.weserv.nl/?url=https://pix6.agoda.net/geo/city/14552/1_14552_02.jpg?ca=6&ce=1&s=345x345&ar=1x1' },
  { id: 5,  name: 'Hyderabad', properties: '2,735',  img: 'https://images.weserv.nl/?url=https://pix6.agoda.net/geo/city/8801/1_8801_02.jpg?ca=6&ce=1&s=345x345&ar=1x1' },
  { id: 6,  name: 'Chennai',   properties: '2,832',  img: 'https://images.weserv.nl/?url=https://pix6.agoda.net/geo/city/17269/1_17269_02.jpg?ca=6&ce=1&s=345x345&ar=1x1' },
  { id: 7,  name: 'Jaipur',    properties: '3,082',  img: 'https://images.weserv.nl/?url=https://pix6.agoda.net/geo/city/8845/017f7c5548e391397f2be20f88df0b2c.jpg?ce=0&s=345x345&ar=1x1' },
  { id: 8,  name: 'Varanasi',  properties: '2,000',  img: 'https://images.weserv.nl/?url=https://pix6.agoda.net/geo/city/3005/1_3005_02.jpg?ca=6&ce=1&s=345x345&ar=1x1' },
  { id: 9,  name: 'Kochi',     properties: '2,165',  img: 'https://images.weserv.nl/?url=https://pix6.agoda.net/geo/city/12722/1_12722_02.jpg?ca=6&ce=1&s=345x345&ar=1x1' },
  { id: 10, name: 'Pune',      properties: '2,494',  img: 'https://images.weserv.nl/?url=https://pix6.agoda.net/geo/city/16854/0abc435fa78c2ca6fb4cb5ec86af89d0.jpg?ce=0&s=345x345&ar=1x1' },
];

const TopDestinations = () => {
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

  // Auto-scroll logic
  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        if (scrollLeft + clientWidth >= scrollWidth - 10) {
          scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          scrollRef.current.scrollBy({ left: 240, behavior: 'smooth' });
        }
        updateArrows();
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [isHovered]);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -240, behavior: 'smooth' });
      setTimeout(updateArrows, 400);
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 240, behavior: 'smooth' });
      setTimeout(updateArrows, 400);
    }
  };

  return (
    <section
      className="max-w-7xl mx-auto px-4 w-full font-sans mb-12 mt-8"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl lg:text-[28px] font-bold text-[#1a1a1a] leading-tight">
            Top Destinations in India
          </h2>
          <p className="text-gray-500 text-sm mt-1">Explore our most loved travel spots</p>
        </div>
        <a
          href="#"
          className="text-[#e03a3c] text-sm font-semibold hover:underline hidden md:block"
        >
          View All →
        </a>
      </div>

      <div className="relative group">
        {/* Scroll Container */}
        <div
          ref={scrollRef}
          onScroll={updateArrows}
          className="flex overflow-x-auto gap-4 md:gap-5 snap-x snap-mandatory pb-2"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {destinations.map((dest) => (
            <div
              key={dest.id}
              className="flex flex-col shrink-0 w-[160px] md:w-[185px] lg:w-[200px] snap-start cursor-pointer"
              style={{ flex: '0 0 auto' }}
            >
              {/* Image Card */}
              <div
                className="relative w-full overflow-hidden shadow-md"
                style={{ borderRadius: '16px', aspectRatio: '1 / 1' }}
              >
                <img
                  src={dest.img}
                  alt={dest.name}
                  referrerPolicy="no-referrer"
                  crossOrigin="anonymous"
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.style.display = 'none';
                    e.target.parentElement.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
                  }}
                />
                {/* Gradient Overlay at Bottom */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-1/2"
                  style={{
                    background: 'linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 100%)',
                  }}
                />
                {/* Property count badge */}
                <div className="absolute bottom-3 left-0 right-0 text-center">
                  <span className="bg-black/40 backdrop-blur-sm text-white text-[10px] md:text-xs font-semibold px-3 py-1 rounded-full border border-white/20">
                    {dest.properties} stays
                  </span>
                </div>
              </div>

              {/* Text Below Card */}
              <div className="mt-3 text-center px-1">
                <h3 className="text-[#1a1a1a] text-base font-bold leading-tight">{dest.name}</h3>
              </div>
            </div>
          ))}
        </div>

        {/* Left Arrow */}
        <button
          onClick={scrollLeft}
          className="absolute left-0 top-[42%] -translate-y-1/2 -translate-x-3 w-9 h-9 bg-white rounded-full shadow-lg border border-gray-200 flex items-center justify-center text-gray-600 hover:text-[#e03a3c] hover:border-[#e03a3c] hover:scale-110 transition-all z-10"
          style={{
            opacity: showLeft ? 1 : 0,
            pointerEvents: showLeft ? 'auto' : 'none',
            transition: 'opacity 0.2s ease, transform 0.2s ease',
          }}
        >
          <ChevronLeft size={20} />
        </button>

        {/* Right Arrow */}
        <button
          onClick={scrollRight}
          className="absolute right-0 top-[42%] -translate-y-1/2 translate-x-3 w-9 h-9 bg-white rounded-full shadow-lg border border-gray-200 flex items-center justify-center text-gray-600 hover:text-[#e03a3c] hover:border-[#e03a3c] hover:scale-110 transition-all z-10"
          style={{
            opacity: showRight ? 1 : 0,
            pointerEvents: showRight ? 'auto' : 'none',
            transition: 'opacity 0.2s ease, transform 0.2s ease',
          }}
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </section>
  );
};

export default TopDestinations;
