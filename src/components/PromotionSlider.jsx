import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const PromotionSlider = ({ promos }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [slidesPerView, setSlidesPerView] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) setSlidesPerView(1);
      else if (window.innerWidth < 1024) setSlidesPerView(2);
      else setSlidesPerView(3);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = promos.length - slidesPerView;

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 3500);
    return () => clearInterval(interval);
  }, [isPaused, maxIndex]);

  const prev = () => setCurrentIndex((i) => (i <= 0 ? maxIndex : i - 1));
  const next = () => setCurrentIndex((i) => (i >= maxIndex ? 0 : i + 1));

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Left Arrow - Hidden on Mobile */}
      <button
        onClick={prev}
        className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white border border-gray-100 shadow-premium flex items-center justify-center hover:bg-gray-50 transition-all hidden md:flex"
      >
        <ChevronLeft size={18} className="text-slate-600" />
      </button>

      {/* Slider viewport */}
      <div className="overflow-visible md:overflow-hidden px-4 md:px-0">
        <div
          className="flex transition-transform duration-500 ease-in-out hide-scrollbar overflow-x-auto md:overflow-x-visible snap-x"
          style={{ transform: window.innerWidth >= 768 ? `translateX(-${currentIndex * (100 / slidesPerView)}%)` : 'none' }}
        >
          {promos.map((promo, i) => (
            <div
              key={i}
              className="flex-shrink-0 px-1.5 md:px-2 snap-center"
              style={{ width: window.innerWidth >= 768 ? `${100 / slidesPerView}%` : '85%' }}
            >
              {/* Card — matches Agoda screenshot proportions */}
              <div className="relative h-[180px] md:h-[220px] rounded-2xl md:rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 cursor-pointer group border border-gray-100">

                {/* Background image */}
                <img
                  src={promo.img}
                  alt={promo.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />

                {/* Dark gradient for readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Top left — hotel icon */}
                <div className="absolute top-3 left-3 w-7 h-7 md:w-8 md:h-8 bg-white/90 backdrop-blur-sm rounded-lg shadow flex items-center justify-center">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill={promo.iconColor || "#3b82f6"}>
                    <path d="M3 21V7l9-4 9 4v14H3zm6-2h6V14H9v5zm6-7V9H9v3h6z" />
                  </svg>
                </div>

                {/* Top center — flag + country badge */}
                <div className="absolute top-3 right-3 flex justify-center">
                  <div className="flex items-center gap-1.5 bg-black/40 backdrop-blur-md rounded-full px-2.5 py-1 shadow-sm border border-white/10">
                    <span className="text-xs md:text-sm leading-none">{promo.flag}</span>
                    <span className="text-[10px] md:text-[11px] font-black text-white/90 uppercase tracking-widest">{promo.badge}</span>
                  </div>
                </div>

                {/* Bottom — discount text */}
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5 text-white">
                  <p className="text-lg md:text-2xl font-black leading-tight tracking-tight" dangerouslySetInnerHTML={{ __html: promo.title }} />
                  <p className="text-[10px] md:text-[11px] font-bold text-white/70 mt-1 uppercase tracking-widest leading-none">{promo.subtitle}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Arrow - Hidden on Mobile */}
      <button
        onClick={next}
        className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white border border-gray-100 shadow-premium flex items-center justify-center hover:bg-gray-50 transition-all hidden md:flex"
      >
        <ChevronRight size={18} className="text-slate-600" />
      </button>

      {/* Dot indicators */}
      <div className="flex justify-center gap-1.5 mt-5">
        {Array.from({ length: maxIndex + 1 }).map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${currentIndex === i ? 'w-6 bg-blue-500' : 'w-1.5 bg-gray-300'}`}
          />
        ))}
      </div>
    </div>
  );
};

export default PromotionSlider;
