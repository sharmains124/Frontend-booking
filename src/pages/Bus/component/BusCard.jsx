import React, { useState } from 'react';
import { Bus, Star, MapPin, ShieldCheck, Clock, ChevronDown, CheckCircle2 } from 'lucide-react';

const BusCard = ({ bus }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Mock data if bus prop is missing
  const operator = bus?.operator || "Zingbus Plus";
  const busType = bus?.type || "A/C Sleeper (2+1)";
  const rating = bus?.rating || 4.8;
  const reviews = bus?.reviews || 2450;
  const departureTime = bus?.departureTime || "21:30";
  const arrivalTime = bus?.arrivalTime || "06:15";
  const duration = bus?.duration || "08h 45m";
  const price = bus?.price || 899;
  const origin = bus?.origin || "New Delhi";
  const destination = bus?.destination || "Manali";
  const seatsLeft = bus?.seatsLeft || 12;

  return (
    <div className="bg-white shadow-[0_2px_12px_rgba(0,0,0,0.08)] border border-gray-100 hover:shadow-lg transition-all duration-300 mb-4 font-sans overflow-hidden rounded-xl">
      <div className="p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        
        {/* Operator Info */}
        <div className="flex flex-col lg:w-1/4">
          <div className="flex items-center gap-2 mb-1">
             <h3 className="text-[18px] font-black text-gray-900 tracking-tight">{operator}</h3>
             <div className="flex items-center gap-1 bg-green-600 text-white text-[11px] font-black px-1.5 py-0.5 rounded shadow-sm">
                <Star size={10} fill="white" /> {rating}
             </div>
          </div>
          <p className="text-[12px] font-bold text-gray-500 uppercase tracking-wide mb-2 italic">{busType}</p>
          <div className="flex items-center gap-1.5 text-[11px] font-bold text-gray-400">
             <span className="flex items-center gap-1"><ShieldCheck size={14} className="text-blue-500" /> Live Tracking</span>
             <span className="text-gray-200">|</span>
             <span>{reviews} Ratings</span>
          </div>
        </div>

        {/* Schedule */}
        <div className="flex-1 flex items-center justify-between lg:justify-center gap-4 lg:gap-10">
          <div className="flex flex-col items-center">
            <span className="text-[20px] font-black text-gray-900 leading-none mb-1">{departureTime}</span>
            <span className="text-[12px] font-bold text-gray-500 truncate max-w-[100px]">{origin}</span>
          </div>

          <div className="flex flex-col items-center flex-1 max-w-[150px]">
            <span className="text-[11px] font-bold text-gray-400 mb-1 flex items-center gap-1 italic"><Clock size={12} /> {duration}</span>
            <div className="w-full h-[2px] bg-gray-200 relative flex items-center justify-center">
               <div className="w-2 h-2 rounded-full bg-blue-500 absolute -left-1"></div>
               <div className="w-2 h-2 rounded-full bg-gray-300 absolute -right-1"></div>
            </div>
          </div>

          <div className="flex flex-col items-center">
            <span className="text-[20px] font-black text-gray-900 leading-none mb-1">{arrivalTime}</span>
            <span className="text-[12px] font-bold text-gray-500 truncate max-w-[100px]">{destination}</span>
          </div>
        </div>

        {/* Pricing & CTA */}
        <div className="flex flex-col items-end lg:w-1/4">
          <div className="flex items-baseline gap-1 mb-1">
            <span className="text-[12px] font-bold text-gray-400">Starting from</span>
            <span className="text-[24px] font-black text-gray-900 tracking-tighter">₹ {price.toLocaleString()}</span>
          </div>
          <p className="text-[11px] font-bold text-red-500 mb-4">{seatsLeft} Seats left</p>
          <button className="bg-[#ff5c35] hover:bg-[#e64a19] text-white font-black py-2.5 px-8 rounded-lg uppercase tracking-widest text-[12px] transition-all shadow-md active:scale-95 w-full lg:w-auto">
             SELECT SEAT
          </button>
        </div>
      </div>

      {/* Footer Info Bar */}
      <div 
        className="bg-gray-50 px-5 py-2.5 flex items-center justify-between border-t border-gray-100 cursor-pointer group hover:bg-gray-100/50 transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-4">
           {['Amenities', 'Boarding & Dropping Points', 'Reviews', 'Bus Photos', 'Policies'].map((item, i) => (
             <span key={i} className="text-[11px] font-black text-[#008cff] hover:underline transition-all hidden md:block uppercase tracking-wider">{item}</span>
           ))}
           <span className="text-[11px] font-black text-[#008cff] flex items-center gap-1 md:hidden uppercase italic">
             View Details <ChevronDown size={14} className={`transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
           </span>
        </div>
        <div className="flex items-center gap-2">
           <span className="text-[11px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded flex items-center gap-1">
              <CheckCircle2 size={12} /> m-Ticket
           </span>
           <span className="text-[11px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded flex items-center gap-1">
              <CheckCircle2 size={12} /> Deep Cleaned
           </span>
        </div>
      </div>

      {isExpanded && (
        <div className="p-6 bg-white border-t border-gray-100 animate-fade-in">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                 <h4 className="text-[13px] font-black text-gray-800 uppercase mb-4 tracking-widest">Bus Amenities</h4>
                 <div className="grid grid-cols-2 gap-3">
                    {['WiFi', 'Charging Point', 'Water Bottle', 'Blanket', 'Reading Light', 'Emergency Contact'].map((amenity, i) => (
                      <div key={i} className="flex items-center gap-2 text-[12px] font-bold text-gray-500">
                         <div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div> {amenity}
                      </div>
                    ))}
                 </div>
              </div>
              <div>
                 <h4 className="text-[13px] font-black text-gray-800 uppercase mb-4 tracking-widest">Policy Details</h4>
                 <div className="space-y-2">
                    <p className="text-[11px] font-bold text-gray-400">Cancellation Policy:</p>
                    <p className="text-[12px] font-medium text-gray-600 leading-relaxed italic">Cancellation fee starts from 10% between 24 and 48 hours before departure. No refunds within 12 hours of journey.</p>
                 </div>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default BusCard;
