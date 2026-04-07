import React from 'react';

const AirlinePartners = () => {
  const airlinePartners = [
    { name: 'Air India', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/5/52/Air_India_logo.svg/1200px-Air_India_logo.svg.png' },
    { name: 'IndiGo', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/IndiGo_logo.svg/1200px-IndiGo_logo.svg.png' },
    { name: 'Vistara', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Vistara_logo.svg/1200px-Vistara_logo.svg.png' },
    { name: 'SpiceJet', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/SpiceJet_logo.svg/1200px-SpiceJet_logo.svg.png' },
    { name: 'Akasa Air', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Akasa_Air_logo.svg/1200px-Akasa_Air_logo.svg.png' },
  ];

  return (
    <section>
      <div className="text-center mb-16 space-y-4">
         <h2 className="text-3xl font-black text-gray-900 tracking-tight font-sans uppercase italic">Official Airline Partners</h2>
         <div className="w-20 h-1.5 bg-blue-600 mx-auto rounded-full"></div>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-12 md:gap-24 grayscale hover:grayscale-0 transition-all duration-300 opacity-40 hover:opacity-100 px-4">
         {airlinePartners.map((airline, i) => (
           <img 
             key={i} 
             src={airline.logo} 
             alt={airline.name} 
             className="h-6 md:h-10 w-auto object-contain hover:scale-110 transition-transform cursor-pointer" 
           />
         ))}
      </div>
    </section>
  );
};

export default AirlinePartners;
