import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, Percent, CreditCard, Star, Gift } from 'lucide-react';

const PROMO_DATA = [
  {
    id: 1,
    icon: <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white shrink-0"><Percent size={22} /></div>,
    title: 'Up to 40% OFF on Stays',
    desc: 'Use code HOTELSUPER on domestic hotel bookings',
    bg: 'bg-white',
  },
  {
    id: 2,
    icon: <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center text-white shrink-0"><CreditCard size={22} /></div>,
    title: 'Flat ₹1,500 OFF with ICICI Cards',
    desc: 'On hotel bookings above ₹5,000 at checkout',
    bg: 'bg-white',
  },
  {
    id: 3,
    icon: <div className="w-12 h-12 rounded-full bg-amber-500 flex items-center justify-center text-white shrink-0"><Star size={22} /></div>,
    title: 'myRewards Bonus Points',
    desc: 'Earn 2x points on your next stay with WingTrip',
    bg: 'bg-white',
  },
  {
    id: 4,
    icon: <div className="w-12 h-12 rounded-full bg-emerald-600 flex items-center justify-center text-white shrink-0"><Gift size={22} /></div>,
    title: 'Free Breakfast on Select Hotels',
    desc: 'Complimentary breakfast for couples this weekend',
    bg: 'bg-white',
  },
];

const HotelPromoSlider = () => {
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
    <div className="relative group mb-8">
      <button
        onClick={() => scroll('left')}
        className="absolute left-[-15px] top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white shadow-lg border border-gray-100 flex items-center justify-center text-blue-600 hover:bg-blue-50 transition-all opacity-0 group-hover:opacity-100"
      >
        <ChevronLeft size={20} strokeWidth={3} />
      </button>

      <button
        onClick={() => scroll('right')}
        className="absolute right-[-15px] top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white shadow-lg border border-gray-100 flex items-center justify-center text-blue-600 hover:bg-blue-50 transition-all opacity-0 group-hover:opacity-100"
      >
        <ChevronRight size={20} strokeWidth={3} />
      </button>

      <div
        ref={scrollRef}
        className="flex items-center gap-4 overflow-x-auto scrollbar-hide py-2 px-1"
      >
        {PROMO_DATA.map((promo) => (
          <div
            key={promo.id}
            className="flex items-center gap-4 p-4 min-w-[340px] md:min-w-[380px] bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all cursor-pointer group/card"
          >
            {promo.icon}
            <div className="flex flex-col min-w-0">
              <h4 className="text-[13px] font-black text-gray-900 truncate tracking-tight">{promo.title}</h4>
              <p className="text-[11px] font-bold text-gray-500 mt-1 uppercase tracking-tight line-clamp-1">{promo.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HotelPromoSlider;
