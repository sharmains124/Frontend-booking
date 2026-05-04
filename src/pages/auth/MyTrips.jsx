import React from 'react';
import { Briefcase, Plane, ArrowRight, Compass } from 'lucide-react';
import { Link } from 'react-router-dom';

const MyTrips = () => {
  return (
    <div className="min-h-screen bg-[#FDFDFD] pt-28 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="mb-12 flex items-center gap-6">
          <div className="w-20 h-20 bg-purple-50 rounded-[1.5rem] flex items-center justify-center text-purple-600 shadow-sm">
            <Briefcase size={36} strokeWidth={2.5} />
          </div>
          <div>
            <h1 className="text-5xl font-black text-[#111] tracking-tight mb-2">My Trips</h1>
            <p className="text-[#666] font-medium text-lg">Manage your upcoming and past bookings</p>
          </div>
        </div>

        {/* Empty State Card */}
        <div className="bg-white rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 p-12 lg:p-24 text-center relative overflow-hidden group">
          {/* Subtle background pattern/image for empty state */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>

          <div className="relative z-10 flex flex-col items-center justify-center animate-fade-in-up">
            <div className="relative w-40 h-40 mb-10">
              <div className="absolute inset-0 bg-blue-100 rounded-full blur-3xl opacity-50"></div>
              <div className="relative w-full h-full bg-white rounded-full border border-gray-100 shadow-xl flex items-center justify-center z-10 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50"></div>
                <Compass size={64} className="text-blue-500 relative z-10 animate-pulse-slow" strokeWidth={1.5} />
              </div>
              <div className="absolute -top-4 -right-4 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center z-20 border border-gray-50 animate-bounce" style={{ animationDuration: '3s' }}>
                <Plane size={20} className="text-purple-500 transform rotate-45" />
              </div>
            </div>
            
            <h2 className="text-4xl font-black text-[#111] mb-4 tracking-tight">No Upcoming Trips</h2>
            <p className="text-[#666] max-w-lg mx-auto mb-12 font-medium text-lg leading-relaxed">
              You haven't booked any trips yet. Discover amazing destinations, explore exclusive offers, and start planning your next unforgettable adventure!
            </p>
            
            <Link to="/destinations" className="bg-[#111] text-white px-10 py-5 rounded-full font-black uppercase tracking-widest transition-all shadow-[0_8px_30px_rgb(0,0,0,0.12)] flex items-center gap-3 hover:bg-black hover:-translate-y-1 hover:shadow-2xl active:scale-95 text-sm">
              Explore Destinations <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyTrips;
