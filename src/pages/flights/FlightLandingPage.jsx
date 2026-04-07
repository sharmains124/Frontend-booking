import React from 'react';
import FlightHero from '../../components/Hero';
import TopFlightDeals from './components/TopFlightDeals';
import PopularAirlines from './components/PopularAirlines';

const FlightLandingPage = () => {
  return (
    <div className="bg-[#f8f9fa] min-h-screen font-sans antialiased text-slate-900 overflow-x-hidden pb-0">
      <FlightHero 
        bgType="image" 
        bgUrl="/assets/Amrit.png" 
        animate={true} 
        isFlight={true}
      />

      <main className="container-custom py-20 space-y-24">
        
        <TopFlightDeals />

        <PopularAirlines />

      </main>
    </div>
  );
};

export default FlightLandingPage;
