import React, { useState, useEffect, useRef, useCallback } from 'react';

const DestinationSlider = ({ destinations }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [slidesPerView, setSlidesPerView] = useState(5);
  const sliderRef = useRef(null);

  useEffect(() => {
    const maxIndex = destinations.length - slidesPerView;
    if (currentIndex > maxIndex) {
      setCurrentIndex(Math.max(0, maxIndex));
    }
  }, [slidesPerView, destinations.length, currentIndex]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setSlidesPerView(1);
      else if (window.innerWidth < 1024) setSlidesPerView(3);
      else setSlidesPerView(5);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % (destinations.length - slidesPerView + 1));
  }, [destinations.length, slidesPerView]);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      handleNext();
    }, 3000); // 3 seconds for smoother feel
    return () => clearInterval(interval);
  }, [isPaused, handleNext]);

  return (
    <div className="relative group">
      {/* Centered Large Heading */}
      <div className="flex flex-col items-center justify-center mb-12">
        <h2 className="text-4xl md:text-5xl font-extrabold text-secondary-900 tracking-tight text-center">
          Top destinations in India
        </h2>
        <div className="w-24 h-1.5 bg-teal-500 rounded-full mt-4"></div>
      </div>

      {/* Slider Container */}
      <div 
        className="overflow-hidden rounded-2xl"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div 
          ref={sliderRef}
          className="flex transition-transform duration-1000 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * (100 / slidesPerView)}%)` }}
        >
          {destinations.map((dest, i) => (
            <div 
              key={i} 
              className={`flex-shrink-0 px-3 group/item cursor-pointer`}
              style={{ width: `${100 / slidesPerView}%` }}
            >
              <div className="relative overflow-hidden rounded-2xl aspect-square mb-4 shadow-md group-hover/item:shadow-xl transition-all duration-500">
                <img 
                  src={dest.img} 
                  alt={dest.name} 
                  className="w-full h-full object-cover transform scale-100 group-hover/item:scale-110 transition-transform duration-1000" 
                  onError={(e) => {
                    e.target.src = `https://images.unsplash.com/photo-1510797215324-95aa89f43c33?q=80&w=400&v=${dest.name}`;
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover/item:opacity-100 transition-opacity duration-500 flex items-end p-5">
                   <span className="text-white text-xs font-bold tracking-widest uppercase">Explore {dest.name}</span>
                </div>
              </div>
              <div className="text-center">
                <h3 className="font-bold text-lg text-secondary-900 group-hover/item:text-teal-600 transition-colors">{dest.name}</h3>
                <p className="text-xs text-secondary-400 font-medium mt-1">{dest.count}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Progress Dots */}
      <div className="flex justify-center gap-1.5 mt-8">
        {Array.from({ length: destinations.length - slidesPerView + 1 }).map((_, i) => (
          <div 
            key={i} 
            className={`h-1.5 rounded-full transition-all duration-500 ${currentIndex === i ? 'w-6 bg-teal-500' : 'w-1.5 bg-gray-200'}`}
          />
        ))}
      </div>
    </div>
  );
};

export default DestinationSlider;
