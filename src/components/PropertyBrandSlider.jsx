import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const PropertyBrandSlider = () => {
  const brands = [
    {
      id: 1,
      name: "ALL ACCOR",
      logo: "https://logos-world.net/wp-content/uploads/2021/08/Accor-Logo.png", // Alternative to text logo
      title: "Discover Hotels",
      subtitle: "Visit Flagship Store",
      img: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=800",
      bgColor: "bg-[#001746]",
      logoType: "accor"
    },
    {
      id: 2,
      name: "CLERMONT HOTEL GROUP",
      title: "Amazing hotels, Unforgettable city.",
      subtitle: "",
      img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800",
      bgColor: "bg-[#2d4d63]",
      logoType: "clermont"
    },
    {
      id: 3,
      name: "ROYAL ORCHID",
      title: "Your Stay, Your Way",
      subtitle: "Across Every Budget",
      img: "https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=800",
      bgColor: "bg-[#6d2170]",
      logoType: "royal"
    },
    {
      id: 4,
      name: "MARRIOTT BONVOY",
      title: "Travel with Passion",
      subtitle: "Infinite Destinations",
      img: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?q=80&w=800",
      bgColor: "bg-[#000000]",
      logoType: "marriott"
    },
    {
      id: 5,
      name: "HILTON HONORS",
      title: "Expect the Best",
      subtitle: "Luxury Redefined",
      img: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=800",
      bgColor: "bg-[#002855]",
      logoType: "hilton"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const slidesPerView = window.innerWidth < 768 ? 1 : 3;
  const maxIndex = brands.length - slidesPerView;

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(timer);
  }, [isPaused, maxIndex]);

  const prev = () => setCurrentIndex((i) => (i <= 0 ? maxIndex : i - 1));
  const next = () => setCurrentIndex((i) => (i >= maxIndex ? 0 : i + 1));

  const renderLogo = (type) => {
    switch(type) {
      case 'accor':
        return (
          <div className="flex flex-col items-center">
            <span className="text-3xl font-black tracking-tighter leading-none">All</span>
            <span className="text-[10px] font-bold tracking-[0.3em] mt-1">ACCOR</span>
          </div>
        );
      case 'clermont':
        return (
          <div className="flex flex-col items-center">
            <span className="text-[10px] font-bold tracking-[0.2em] mb-1">CLERMONT</span>
            <span className="text-[10px] font-bold tracking-[0.2em]">HOTEL GROUP</span>
          </div>
        );
      case 'royal':
        return (
          <div className="flex items-center gap-4 border-t border-b border-white/20 py-2">
            <div className="flex flex-col items-center">
              <span className="text-[8px] font-bold">ROYAL ORCHID</span>
            </div>
            <div className="w-px h-6 bg-white/20"></div>
            <div className="flex flex-col items-center">
              <span className="text-[8px] font-bold">RE:GEN:TA</span>
            </div>
            <div className="w-px h-6 bg-white/20"></div>
            <div className="flex flex-col items-center">
              <span className="text-[8px] font-bold">ICONIQA</span>
            </div>
          </div>
        );
      default:
        return <span className="text-sm font-black tracking-widest uppercase">{type}</span>;
    }
  };

  return (
    <div 
      className="relative group px-1"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Navigation Arrows */}
      <button 
        onClick={prev}
        className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white shadow-xl border border-gray-100 flex items-center justify-center hover:bg-gray-50 transition-all opacity-0 group-hover:opacity-100"
      >
        <ChevronLeft size={24} className="text-gray-700" />
      </button>

      <div className="overflow-hidden rounded-3xl">
        <div 
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * (100 / slidesPerView)}%)` }}
        >
          {brands.map((brand) => (
            <div 
              key={brand.id} 
              className="flex-shrink-0 px-2"
              style={{ width: `${100 / slidesPerView}%` }}
            >
              <div className="h-[12.5rem] rounded-3xl overflow-hidden flex shadow-md group cursor-pointer border border-gray-100 hover:shadow-xl transition-all">
                {/* Left Side: Image */}
                <div className="w-[42%] h-full relative overflow-hidden">
                  <img 
                    src={brand.img} 
                    alt={brand.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                  />
                  {/* Flagship Store Badge */}
                  <div className="absolute top-3 left-3 bg-[#e8f1e9] pl-1 pr-3 py-1 rounded-lg shadow-sm border border-white/50 flex items-center gap-1.5 min-w-[80px]">
                    <div className="w-6 h-6 rounded-md bg-[#001746] flex items-center justify-center text-[10px] text-white">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z"/></svg>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[7px] font-black text-[#001746] leading-none">Flagship</span>
                      <span className="text-[7px] font-black text-[#001746] leading-none">Store</span>
                    </div>
                  </div>
                </div>

                {/* Right Side: Brand Content */}
                <div className={`${brand.bgColor} flex-grow h-full p-4 flex flex-col items-center justify-center text-white relative z-10 overflow-hidden`}>
                  {/* Decorative Curve divider */}
                  <div className={`absolute top-0 -left-10 w-20 h-full ${brand.bgColor} rounded-l-[4rem] group-hover:-left-12 transition-all duration-700`}></div>
                  
                  <div className="relative z-20 flex flex-col items-center w-full px-4">
                    <div className="mb-4 transform group-hover:scale-105 transition-transform duration-500">
                      {renderLogo(brand.logoType)}
                    </div>
                    <h3 className="text-lg md:text-xl font-black mb-1 leading-tight text-center tracking-tight text-white drop-shadow-md">
                      {brand.title}
                    </h3>
                    <p className="text-[10px] font-bold opacity-70 text-center uppercase tracking-wider">{brand.subtitle}</p>
                    <p className="text-[6px] opacity-40 mt-3 font-black uppercase tracking-widest">*T&Cs apply</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button 
        onClick={next}
        className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white shadow-xl border border-gray-100 flex items-center justify-center hover:bg-gray-50 transition-all opacity-0 group-hover:opacity-100"
      >
        <ChevronRight size={24} className="text-gray-700" />
      </button>

      {/* Dots */}
      <div className="flex justify-center gap-1.5 mt-6">
        {Array.from({ length: maxIndex + 1 }).map((_, i) => (
          <button 
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${i === currentIndex ? 'w-8 bg-blue-600' : 'w-1.5 bg-gray-300'}`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default PropertyBrandSlider;
