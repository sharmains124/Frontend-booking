import React from 'react';
import Hero from '../components/Hero';
import TopDestinations from '../components/TopDestinations';
import WhyChooseUs from '../components/WhyChooseUs';
import Accommodation from '../components/Accommodation';
import Properties from '../components/Properties';
import FlightActive from '../components/FlightActive';
import ExploreHotels from '../components/ExploreHotels';

const HomePage = () => {
  return (
    <div className="bg-[#f5f7f9] min-h-screen font-sans antialiased text-gray-800 pb-20">
      <Hero />
      
      <main className="w-full mt-4 space-y-6">
        {/* Top Destinations */}
        <TopDestinations />

        {/* Existing sections */}
        <div className="max-w-7xl mx-auto px-4 w-full space-y-12">
          <Accommodation />
          <FlightActive />
          <Properties />
          <ExploreHotels />
        </div>
      </main>
    </div>
  );
};

export default HomePage;

