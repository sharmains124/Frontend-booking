import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, Zap, ShieldCheck, Star, Gift } from 'lucide-react';

const PROMO_DATA = [
  {
    id: 1,
    icon: <div className="w-14 h-14 rounded-2xl bg-blue-600 flex items-center justify-center text-white shrink-0 shadow-lg shadow-blue-500/20"><Zap size={24} /></div>,
    title: 'Tatkal Express Booking',
    desc: 'Confirm tickets in under 60 seconds with our high-speed API',
    bg: 'bg-white',
  },
  {
    id: 2,
    icon: <div className="w-14 h-14 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shrink-0 shadow-lg shadow-indigo-500/20"><ShieldCheck size={24} /></div>,
    title: 'Elite Trip Protection',
    desc: 'Premium insurance coverage for all your railway journeys',
    bg: 'bg-white',
  },
  {
    id: 3,
    icon: <div className="w-14 h-14 rounded-2xl bg-amber-500 flex items-center justify-center text-white shrink-0 shadow-lg shadow-amber-500/20"><Star size={24} /></div>,
    title: 'Double Reward Points',
    desc: 'Earn 2x W-Points on every AC class booking this month',
    bg: 'bg-white',
  },
  {
    id: 4,
    icon: <div className="w-14 h-14 rounded-2xl bg-emerald-600 flex items-center justify-center text-white shrink-0 shadow-lg shadow-emerald-500/20"><Gift size={24} /></div>,
    title: 'Dining on Rails',
    desc: 'Pre-book gourmet meal combos from IRCTC-authorized partners',
    bg: 'bg-white',
  },
];

const TrainPromoSlider = () => {
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
    <div className="relative group mb-10">
      <button
        onClick={() => scroll('left')}
        className="absolute left-[-20px] top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white shadow-xl border border-gray-100 flex items-center justify-center text-blue-600 hover:bg-blue-50 transition-all opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100"
      >
        <ChevronLeft size={24} strokeWidth={3} />
      </button>

      <button
        onClick={() => scroll('right')}
        className="absolute right-[-20px] top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white shadow-xl border border-gray-100 flex items-center justify-center text-blue-600 hover:bg-blue-50 transition-all opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100"
      >
        <ChevronRight size={24} strokeWidth={3} />
      </button>

      <div
        ref={scrollRef}
        className="flex items-center gap-6 overflow-x-auto scrollbar-hide py-4 px-1"
      >
        {PROMO_DATA.map((promo) => (
          <div
            key={promo.id}
            className="flex items-center gap-5 p-6 min-w-[360px] md:min-w-[400px] bg-white rounded-3xl border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_15px_40px_rgba(0,0,0,0.08)] transition-all duration-500 cursor-pointer group/card hover:-translate-y-1"
          >
            <div className="transition-transform duration-500 group-hover/card:scale-110">
               {promo.icon}
            </div>
            <div className="flex flex-col min-w-0">
              <h4 className="text-[15px] font-black text-slate-800 truncate tracking-tight">{promo.title}</h4>
              <p className="text-[12px] font-bold text-gray-500 mt-1.5 uppercase tracking-tight line-clamp-1 italic">{promo.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrainPromoSlider;
