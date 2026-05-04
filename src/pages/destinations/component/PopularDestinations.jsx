import React from 'react';
import { Star, MapPin } from 'lucide-react';

const destinations = [
  { id: 1, name: 'Bangalore', type: 'Garden City', price: '₹4,500', rating: 4.8, img: 'https://images.weserv.nl/?url=https://pix6.agoda.net/geo/city/4923/1_4923_02.jpg?ca=8&ce=1' },
  { id: 2, name: 'Mumbai', type: 'Coastal City', price: '₹6,200', rating: 4.9, img: 'https://images.weserv.nl/?url=https://pix6.agoda.net/geo/city/16850/1_16850_02.jpg?ca=6&ce=1' },
  { id: 3, name: 'Goa', type: 'Beach Paradise', price: '₹3,800', rating: 4.7, img: 'https://images.weserv.nl/?url=https://pix6.agoda.net/geo/city/11304/077a5dc2a344a604731be86537916ba0.jpg?ce=0' },
  { id: 4, name: 'New Delhi', type: 'Heritage Hub', price: '₹5,500', rating: 4.6, img: 'https://images.weserv.nl/?url=https://pix6.agoda.net/geo/city/14552/1_14552_02.jpg?ca=6&ce=1' },
];

const PopularDestinations = () => {
  return (
    <section className="py-12 md:py-20 bg-white rounded-3xl md:rounded-[4rem] px-6 md:px-12 shadow-sm border border-gray-50 my-8 md:my-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 md:mb-16 gap-4 md:gap-6">
        <div className="max-w-xl">
          <h2 className="text-2xl md:text-4xl font-black text-slate-900 mb-2 md:mb-4 uppercase tracking-tight">Popular Destinations</h2>
          <p className="text-sm md:text-base text-slate-500 font-medium">Explore the most visited cities and hidden treasures across India and beyond.</p>
        </div>
        <button className="text-primary font-black text-xs md:text-sm uppercase tracking-widest hover:underline flex items-center gap-2">
          View All <MapPin size={16} />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
        {destinations.map((dest) => (
          <div key={dest.id} className="group cursor-pointer">
            <div className="relative rounded-[24px] md:rounded-[32px] overflow-hidden aspect-[4/5] shadow-lg mb-4 md:mb-6">
              <img 
                src={dest.img} 
                alt={dest.name} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
              />
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1.5 text-[10px] md:text-xs font-black shadow-sm">
                <Star size={12} className="text-amber-500 fill-amber-500" />
                {dest.rating}
              </div>
              <div className="absolute inset-x-0 bottom-0 p-5 md:p-6 bg-gradient-to-t from-black/80 via-black/20 to-transparent">
                <p className="text-white/70 text-[9px] md:text-[10px] font-black uppercase tracking-widest mb-1">{dest.type}</p>
                <h4 className="text-lg md:text-xl font-black text-white tracking-tight uppercase">{dest.name}</h4>
              </div>
            </div>
            <div className="flex justify-between items-center px-2">
              <div>
                <p className="text-[9px] md:text-[10px] font-black text-gray-400 uppercase tracking-widest">Starting from</p>
                <p className="text-base md:text-lg font-black text-slate-800">{dest.price} <span className="text-[10px] md:text-xs font-medium text-gray-400">/ night</span></p>
              </div>
              <button className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-gray-50 flex items-center justify-center text-slate-800 group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
                <ArrowPin size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

// Internal icon component for simple button
const ArrowPin = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M12 5l7 7-7 7"/>
  </svg>
);

export default PopularDestinations;
