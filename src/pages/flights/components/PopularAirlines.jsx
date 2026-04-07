import React from 'react';
import { ArrowUpRight } from 'lucide-react';

const airlineData = [
  {
    name: 'TURKISH AIRLINES',
    image: 'https://images.unsplash.com/photo-1542296332-2e4473faf563?q=80&w=800&auto=format&fit=crop',
    alt: 'Turkish Airlines plane in sky',
  },
  {
    name: 'EMIRATES',
    image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=800&auto=format&fit=crop',
    alt: 'Emirates plane taking off',
  },
  {
    name: 'QATAR AIRWAYS',
    image: 'https://images.unsplash.com/photo-1556388158-158ea5ccacbd?q=80&w=800&auto=format&fit=crop',
    alt: 'Qatar Airways plane',
  },
  {
    name: 'SINGAPORE AIRLINES',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=800&auto=format&fit=crop',
    alt: 'Singapore Airlines plane',
  },
];

const PopularAirlines = () => {
  return (
    <section className="py-12">
      <div className="text-center mb-12 space-y-3">
        <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight uppercase">
          MOST POPULAR AIRLINES
        </h2>
        <p className="text-slate-500 font-medium max-w-2xl mx-auto px-4">
          The world's leading airlines offer top-notch service, ensuring memorable travel experiences for passengers.
        </p>
      </div>

      {/* Snap Scrolling Slider Container */}
      <div className="w-full relative px-4">
        <div className="flex overflow-x-auto gap-6 pb-8 snap-x snap-mandatory hide-scroll-bar">
          
          {airlineData.map((airline, idx) => (
            <div 
              key={idx}
              className="flex-none w-[280px] sm:w-[320px] md:w-[380px] h-[240px] md:h-[280px] rounded-[2rem] snap-center overflow-hidden relative group border border-gray-100 shadow-sm"
            >
              <img 
                src={airline.image} 
                alt={airline.alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              
              {/* Bottom tag block */}
              <div className="absolute bottom-4 inset-x-4 h-14 bg-white/95 backdrop-blur-md rounded-xl flex items-center justify-between px-5 shadow-sm transform translate-y-0 transition-all">
                <span className="font-black text-xs tracking-widest text-[#0B1A4B] uppercase">
                  {airline.name}
                </span>
                <button className="w-8 h-8 flex flex-shrink-0 items-center justify-center rounded-lg bg-blue-300 text-white hover:bg-blue-400 transition-colors">
                  <ArrowUpRight size={16} />
                </button>
              </div>
            </div>
          ))}

        </div>
      </div>
      
      {/* Add custom CSS to hide scrollbar but keep functionality */}
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scroll-bar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .hide-scroll-bar::-webkit-scrollbar {
          display: none;
        }
      `}} />
    </section>
  );
};

export default PopularAirlines;
