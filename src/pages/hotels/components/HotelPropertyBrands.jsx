import React from 'react';
import { ArrowUpRight } from 'lucide-react';

const PROPERTY_BRANDS = [
  {
    name: 'TAJ HOTELS',
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=800&auto=format&fit=crop',
    alt: 'Taj Hotels luxury property',
  },
  {
    name: 'OYO ROOMS',
    image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=80&w=800&auto=format&fit=crop',
    alt: 'OYO Rooms property',
  },
  {
    name: 'MARRIOTT',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=800&auto=format&fit=crop',
    alt: 'Marriott hotel',
  },
  {
    name: 'OBEROI',
    image: 'https://images.unsplash.com/photo-1596436889106-be35e843f974?q=80&w=800&auto=format&fit=crop',
    alt: 'Oberoi luxury hotel',
  },
];

const HotelPropertyBrands = () => {
  return (
    <section className="py-12">
      <div className="text-center mb-12 space-y-3">
        <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight uppercase">
          TRUSTED PROPERTY BRANDS
        </h2>
        <p className="text-slate-500 font-medium max-w-2xl mx-auto px-4">
          Book with confidence through India's most loved and globally recognised hotel chains.
        </p>
      </div>

      <div className="w-full relative px-4">
        <div className="flex overflow-x-auto gap-6 pb-8 snap-x snap-mandatory hide-scroll-bar">
          {PROPERTY_BRANDS.map((brand, idx) => (
            <div
              key={idx}
              className="flex-none w-[280px] sm:w-[320px] md:w-[380px] h-[240px] md:h-[280px] rounded-[2rem] snap-center overflow-hidden relative group border border-gray-100 shadow-sm"
            >
              <img
                src={brand.image}
                alt={brand.alt}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute bottom-4 inset-x-4 h-14 bg-white/95 backdrop-blur-md rounded-xl flex items-center justify-between px-5 shadow-sm">
                <span className="font-black text-xs tracking-widest text-[#0B1A4B] uppercase">{brand.name}</span>
                <button className="w-8 h-8 flex flex-shrink-0 items-center justify-center rounded-lg bg-blue-300 text-white hover:bg-blue-400 transition-colors">
                  <ArrowUpRight size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

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

export default HotelPropertyBrands;
