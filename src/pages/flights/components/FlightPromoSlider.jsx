import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const PROMO_DATA = [
  {
    id: 1,
    icon: <div className="text-blue-900 font-extrabold italic tracking-tighter text-2xl shrink-0 w-12 h-12 flex items-center justify-center bg-white !border-0 rounded-full shadow-sm">VISA</div>,
    title: "VISA Exclusive Offer",
    desc: "Free Seat with VISA Signature Credit...",
    bg: "bg-white"
  },
  {
    id: 2,
    icon: (
      <div className="w-12 h-12 rounded-full bg-[#bd1023] flex items-center justify-center text-white shrink-0 font-bold text-xl">
        <span className="w-4 h-5 block relative border-t-2 border-l-2 border-white">
           <span className="absolute left-0 top-1/2 w-2.5 h-[2px] bg-white -translate-y-1/2"></span>
        </span>
      </div>
    ),
    title: "Flat 10% Instant Discount ...",
    desc: "on IDFC FIRST Bank Credit Card EMI...",
    bg: "bg-white"
  },
  {
    id: 3,
    icon: <div className="w-12 h-12 rounded-full overflow-hidden shrink-0"><img src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=150&q=80" alt="Meet & Greet" className="w-full h-full object-cover" /></div>,
    title: "Meet and Greet & ...",
    desc: "Elevate your travel experience with priority...",
    bg: "bg-white"
  }
];

const FlightPromoSlider = () => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' 
        ? scrollLeft - clientWidth / 2 
        : scrollLeft + clientWidth / 2;
      
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative group w-full mb-4">
      {/* Navigation Buttons */}
      <button 
        onClick={() => scroll('left')}
        className="absolute left-[-15px] top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white shadow-lg border border-gray-100 flex flex-col items-center justify-center text-[#008cff] hover:bg-blue-50 transition-all opacity-0 group-hover:opacity-100"
      >
        <ChevronLeft size={20} strokeWidth={3} className="-ml-0.5" />
      </button>

      <button 
        onClick={() => scroll('right')}
        className="absolute right-[-15px] top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white shadow-lg border border-gray-100 flex flex-col items-center justify-center text-[#008cff] hover:bg-blue-50 transition-all opacity-100 md:opacity-0 group-hover:opacity-100"
      >
        <ChevronRight size={20} strokeWidth={3} className="ml-0.5" />
      </button>

      {/* Slider Container */}
      <div 
        ref={scrollRef}
        className="flex items-center gap-4 overflow-x-auto scrollbar-hide py-1 pl-1 pr-6"
      >
        {PROMO_DATA.map((promo) => (
          <div 
            key={promo.id}
            className="flex items-center gap-3 p-3 min-w-[280px] md:min-w-[320px] bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all cursor-pointer group/card"
          >
            {promo.icon}
            <div className="flex flex-col min-w-0">
               <h4 className="text-[13px] font-black text-gray-900 truncate tracking-tight group-hover/card:text-[#008cff] transition-colors">{promo.title}</h4>
               <p className="text-[11px] font-medium text-gray-600 mt-0.5 tracking-tight line-clamp-1">{promo.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FlightPromoSlider;
