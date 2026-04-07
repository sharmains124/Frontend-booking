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
      {/* Left Arrow */}
      <button
        onClick={prev}
        className="absolute -left-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white border border-gray-200 shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors"
      >
        <ChevronLeft size={20} className="text-gray-600" />
      </button>

      {/* Slider viewport */}
      <div className="overflow-hidden rounded-xl">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * (100 / slidesPerView)}%)` }}
        >
          {promos.map((promo, i) => (
            <div
              key={i}
              className="flex-shrink-0 px-2"
              style={{ width: `${100 / slidesPerView}%` }}
            >
              {/* Card — matches Agoda screenshot proportions */}
              <div className="relative h-[220px] rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer group border border-gray-100">

                {/* Background image */}
                <img
                  src={promo.img}
                  alt={promo.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />

                {/* Dark gradient for readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10" />

                {/* Top left — hotel icon */}
                <div className="absolute top-3 left-3 w-8 h-8 bg-white rounded-lg shadow flex items-center justify-center">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="#ef4444">
                    <path d="M3 21V7l9-4 9 4v14H3zm6-2h6V14H9v5zm6-7V9H9v3h6z" />
                  </svg>
                </div>

                {/* Top center — flag + country badge */}
                <div className="absolute top-3 left-0 right-0 flex justify-center">
                  <div className="flex items-center gap-1.5 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 shadow-sm">
                    <span className="text-base leading-none">{promo.flag}</span>
                    <span className="text-[11px] font-bold text-gray-700">{promo.badge}</span>
                  </div>
                </div>

                {/* Center logo/watermark removed as requested */}

                {/* Bottom — discount text */}
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <p className="text-2xl font-black leading-tight drop-shadow-md" dangerouslySetInnerHTML={{ __html: promo.title }} />
                  <p className="text-[11px] font-semibold text-white/90 mt-0.5 drop-shadow">{promo.subtitle}</p>
                  {promo.terms && (
                    <p className="text-[9px] text-white/50 mt-0.5">{promo.terms}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Arrow */}
      <button
        onClick={next}
        className="absolute -right-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white border border-gray-200 shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors"
      >
        <ChevronRight size={20} className="text-gray-600" />
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
