import React from 'react';

const flightsPromotions = [
  { id: 1, img: "https://images.unsplash.com/photo-1436491865332-7a61a109c055?auto=format&fit=crop&q=80&w=800", alt: "Global Flight Deals" },
  { id: 2, img: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=800", alt: "Adventure Activities" }
];

const FlightActive = () => {
  return (
    <section className="w-full font-sans mb-12">
      <h2 className="text-2xl md:text-[28px] font-bold text-[#1a1a1a] mb-5">
        Flights & Activities Promotions
      </h2>
      <div className="flex overflow-x-auto gap-4 md:gap-5 pb-4 [&::-webkit-scrollbar]:hidden" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        {flightsPromotions.map((promo) => (
           <div key={promo.id} className="relative flex shrink-0 w-[280px] md:w-[320px] lg:w-[360px] h-[160px] md:h-[180px] cursor-pointer rounded-[16px] overflow-hidden shadow-sm hover:shadow-md transition-shadow bg-transparent group/card text-center justify-center items-center">
             <img src={promo.img} alt={promo.alt} className="w-full h-full object-contain group-hover/card:scale-[1.03] transition-transform duration-500" />
           </div>
        ))}
      </div>
    </section>
  );
};

export default FlightActive;
