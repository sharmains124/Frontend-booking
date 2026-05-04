import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { Plane, ChevronDown, CheckCircle2, Star, ShieldCheck, X } from 'lucide-react';

const FlightCard = ({ flight, onBook }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showFareModal, setShowFareModal] = useState(false);

  const airline = flight?.airline || "Air India Express";
  const origin = flight?.origin || "New Delhi";
  const destination = flight?.destination || "Bengaluru";
  const price = flight?.price || 7897;
  const duration = flight?.duration || "02 h 55 m";
  const flightNumber = flight?.flightNumber || "IX 1692";
  const stops = flight?.stops || "Non stop";
  
  const departureDateObj = flight?.departureTime ? new Date(flight.departureTime) : new Date(); 
  const arrivalDateObj = flight?.arrivalTime ? new Date(flight.arrivalTime) : new Date();
  
  const departureTime = flight?.departureTime ? departureDateObj.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }) : "15:25";
  const arrivalTime = flight?.arrivalTime ? arrivalDateObj.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }) : "18:20";
  

  const fareTiers = [
    {
      name: "VALUE",
      price: price,
      originalPrice: null,
      badge: null,
      baggage: { cabin: "7 Kgs Cabin Baggage", checkin: "15 Kgs Check-in Baggage" },
      flexibility: ["Cancellation fee starts at ₹ 4,300 (up to 2 hours before departure)", "Date Change fee starts at ₹ 3,000 up to 2 hrs before departure"],
      seats: ["Chargeable Seats", "Chargeable Meals"],
      tagline: "Get Flat ₹ 314 OFF using code MMTSUPER | FLAT 600 OFF on ICICI Bank Credit Cards",
      insurance: null
    },
    {
      name: "FARE BY MAKEMYTRIP",
      price: price - 95,
      originalPrice: price + 300,
      badge: "MMTSPECIAL",
      baggage: { cabin: "7 Kgs Cabin Baggage", checkin: "15 Kgs Check-in Baggage" },
      flexibility: ["Cancellation fee starts at ₹ 4,300 (up to 2 hours before departure)", "Date Change fee starts at ₹ 3,000 up to 2 hrs before departure"],
      seats: ["Chargeable Seats", "Chargeable Meals"],
      tagline: "BENEFITS WORTH ₹ 2,000 INCLUDED",
      insurance: "Travel Insurance included"
    },
    {
      name: "CLASSIC",
      price: price + 420,
      originalPrice: null,
      badge: null,
      baggage: { cabin: "7 Kgs Cabin Baggage", checkin: "15 Kgs Check-in Baggage" },
      flexibility: ["Lower Cancellation fee of ₹ 3,000 (up to 2 hours before departure)", "Lower Date Change fee ₹ 1,000 up to 2 hrs before departure"],
      seats: ["Free Seats", "Complimentary Meals"],
      tagline: "Get ₹ 314 OFF using code MMTSUPER | Flat 10% OFF with SBI Debit Cards",
      insurance: null
    },
    {
      name: "FLEX",
      price: price + 950,
      originalPrice: null,
      badge: null,
      baggage: { cabin: "7 Kgs Cabin Baggage", checkin: "20 Kgs Check-in Baggage" },
      flexibility: ["ZERO Cancellation fee", "ZERO Date Change fee"],
      seats: ["Free Seats", "Complimentary Meals"],
      tagline: "Enjoy Ultimate Flexibility when booking this fare",
      insurance: null
    }
  ];

  return (
    <div className="bg-white shadow-[0_2px_10px_rgb(0,0,0,0.06)] border border-gray-100 hover:shadow-md transition-all duration-300 mb-4 font-sans relative">
      
      {/* Main MakeMyTrip Style Horizontal Layout */}
      <div className="p-4 md:p-6 pb-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Airline Info */}
          <div className="flex items-center gap-3 w-[200px] shrink-0">
             <div className="w-[34px] h-[34px] flex items-center justify-center bg-white rounded overflow-hidden shadow-sm shrink-0">
                <img 
                   src={`/images/airlines/${(({
                     'indigo': '6E',
                     'air india': 'AI',
                     'vistara': 'UK',
                     'spicejet': 'SG',
                     'akasa air': 'QP',
                     'air india express': 'IX',
                     'go first': 'G8',
                     'airasia': 'I5'
                   })[(airline || '').toLowerCase()] || (flightNumber.includes('-') ? flightNumber.split('-')[0] : flightNumber.split(' ')[0]))}.png`} 
                   alt={airline} 
                   className="w-full h-full object-contain p-0.5"
                   onError={(e) => { e.target.onerror = null; e.target.style.display = 'none'; e.target.nextSibling.style.display = 'block'; }} 
                />
                <Plane size={24} className="text-[#ff5c35] hidden" />
             </div>
             <div className="flex flex-col">
                <span className="text-[13px] font-black text-gray-900 leading-none">{airline}</span>
                <span className="text-[11px] font-bold text-gray-500 mt-1">{flightNumber}</span>
             </div>
          </div>
          
          {/* Schedule */}
          <div className="flex-1 flex items-center justify-center gap-4">
             <div className="text-right w-[80px]">
                <p className="text-[22px] font-black text-gray-900 leading-none">{departureTime}</p>
                <p className="text-[12px] font-bold text-gray-600 mt-1">{origin}</p>
             </div>
             
             <div className="flex flex-col items-center w-[120px] relative">
                <span className="text-[11px] font-bold text-gray-600 mb-1">{duration}</span>
                <div className="w-full h-[2px] bg-gray-300 relative"></div>
                <span className="text-[10px] font-bold text-gray-500 mt-1">{stops}</span>
             </div>
             
             <div className="text-left w-[80px]">
                <p className="text-[22px] font-black text-gray-900 leading-none">{arrivalTime}</p>
                <p className="text-[12px] font-bold text-gray-600 mt-1">{destination}</p>
             </div>
          </div>
          
          {/* Price & Action */}
          <div className="flex flex-col items-end shrink-0 w-[180px] justify-end">
             <div className="flex items-center gap-1 mb-1 relative">
                <p className="text-[24px] font-black text-gray-900 leading-none">₹ {price.toLocaleString()}</p>
             </div>
             <p className="text-[11px] font-bold text-gray-500 mb-3">per adult</p>
             <button 
                onClick={(e) => { e.stopPropagation(); setShowFareModal(true); }}
                className="border-[1.5px] border-[#008cff] text-[#008cff] hover:bg-blue-50 font-black py-2 px-6 rounded-full uppercase tracking-widest text-[11px] transition-all shadow-sm"
             >
                VIEW PRICES
             </button>
          </div>
        </div>
      </div>

      {/* Expand Footer (e.g. Flight Details) */}
      <div 
         className="bg-gray-50 py-2.5 flex items-center px-6 cursor-pointer border-t border-gray-100 group transition-colors"
         onClick={() => setIsExpanded(!isExpanded)}
      >
         <span className="text-[11px] font-bold text-[#008cff] flex items-center gap-1 transition-colors">
            Flight Details
            <ChevronDown size={14} className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
         </span>
         <div className="ml-auto text-[10px] font-bold text-green-600 flex items-center gap-1 px-2 py-0.5 bg-green-50 rounded-md">
            <CheckCircle2 size={12}/> Free Meal
         </div>
      </div>

      {/* Expanded Details */}
      {isExpanded && (
         <div className="p-6 bg-white border-t border-gray-100 animate-fade-in text-sm font-bold text-gray-500 text-center">
            Flight detailed itinerary overview goes here. Similar to previous version.
         </div>
      )}

      {/* Fare Options Modal (MakeMyTrip Style) */}
      {showFareModal && createPortal(
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-0 md:p-6 font-sans">
          {/* Modal Backdrop */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in" onClick={() => setShowFareModal(false)}></div>
          
          {/* Modal Content */}
          <div className="bg-[#f5f7f9] rounded-xl w-full h-full md:h-auto md:max-h-[90vh] md:w-[95%] max-w-[1240px] flex flex-col shadow-2xl relative z-10 animate-fade-in-up md:animate-scale-in">
            {/* Header */}
            <div className="bg-white p-5 border-b border-gray-200 flex items-center justify-between shrink-0 rounded-t-xl">
               <h2 className="text-[20px] font-black text-gray-900 tracking-tight">Flight Details and Fare Options available for you!</h2>
               <button onClick={() => setShowFareModal(false)} className="text-gray-400 hover:text-gray-800 transition-colors p-1 rounded-full hover:bg-gray-100">
                 <X size={24} />
               </button>
            </div>
            
            {/* Subheader Route Info */}
            <div className="bg-[#fcfdfd] px-5 py-3 border-b border-gray-200 flex flex-wrap items-center gap-2 md:gap-3 text-[13px] font-black text-gray-700 shrink-0">
               <span>{origin} → {destination}</span>
               <Plane size={14} className="text-[#ff5c35] transform rotate-45" />
               <span>{airline}</span>
               <span className="text-gray-300">•</span>
               <span>Tue, 17 Mar 26</span>
               <span className="text-gray-300">•</span>
               <span>Departure at {departureTime} - Arrival at {arrivalTime}</span>
            </div>

            {/* Scrollable Fare Tiers */}
            <div className="flex-1 overflow-x-auto overflow-y-auto p-4 md:p-6">
               <div className="flex gap-4 min-w-[1000px] h-full">
                  {fareTiers.map((tier, idx) => (
                    <div key={idx} className="flex-1 bg-white rounded-lg border border-gray-200 shadow-sm flex flex-col relative overflow-hidden group hover:shadow-lg transition-shadow">
                       {/* Tier Header */}
                       <div className={`p-5 min-h-[90px] border-b border-gray-200 ${tier.badge === 'MMTSPECIAL' ? 'bg-[#fffcf7]' : 'bg-white'}`}>
                          {tier.badge && (
                            <div className="absolute top-0 right-0 bg-[#242b31] text-[#ffb700] text-[10px] font-black px-2 py-1 rounded-bl-lg flex items-center gap-1 shadow-sm">
                               <Star size={10} fill="#ffb700" className="text-[#ffb700]" /> {tier.badge}
                            </div>
                          )}
                          <div className="flex flex-wrap items-baseline gap-1 mb-1">
                            {tier.originalPrice && <span className="text-[12px] font-bold text-gray-400 line-through mr-1">₹{tier.originalPrice.toLocaleString()}</span>}
                            <span className="text-[24px] font-black text-gray-900 leading-none">₹ {tier.price.toLocaleString()}</span>
                            <span className="text-[11px] font-bold text-gray-500">per adult</span>
                          </div>
                          <p className="text-[12px] font-bold text-gray-600 uppercase mt-2">{tier.name}</p>
                       </div>
                       
                       {/* Tier Features */}
                       <div className="p-5 flex-1 space-y-6">
                          {/* Baggage */}
                          <div className="space-y-3">
                             <h4 className="text-[12px] font-black text-gray-900">Baggage</h4>
                             <div className="flex items-start gap-2 text-[12px] font-medium text-gray-700">
                               <CheckCircle2 size={14} fill="#e5f5e8" className="text-green-500 shrink-0 mt-0.5" /> {tier.baggage.cabin}
                             </div>
                             <div className="flex items-start gap-2 text-[12px] font-medium text-gray-700">
                               <CheckCircle2 size={14} fill="#e5f5e8" className="text-green-500 shrink-0 mt-0.5" /> {tier.baggage.checkin}
                             </div>
                          </div>
                          
                          {/* Flexibility */}
                          <div className="space-y-3">
                             <h4 className="text-[12px] font-black text-gray-900">Flexibility</h4>
                             {tier.flexibility.map((flex, i) => (
                               <div key={i} className="flex items-start gap-2 text-[12px] font-medium text-gray-700 leading-snug">
                                 <div className="w-[14px] h-[14px] rounded-full bg-[#faeedb] flex items-center justify-center shrink-0 mt-0.5">
                                    <span className="w-[6px] h-[2px] bg-[#e19a3b] rounded-full"></span>
                                 </div>
                                 <span>{flex}</span>
                               </div>
                             ))}
                          </div>
                          
                          {/* Seats & Meals */}
                          <div className="space-y-3">
                             <h4 className="text-[12px] font-black text-gray-900">Seats, Meals & More</h4>
                             {tier.seats.map((seat, i) => (
                               <div key={i} className="flex items-start gap-2 text-[12px] font-medium text-gray-700">
                                 {seat.includes('Free') || seat.includes('Complimentary') ? (
                                    <CheckCircle2 size={14} fill="#e5f5e8" className="text-green-500 shrink-0 mt-0.5" />
                                 ) : (
                                    <div className="w-[14px] h-[14px] rounded-full bg-[#faeedb] flex items-center justify-center shrink-0 mt-0.5">
                                      <span className="w-[6px] h-[2px] bg-[#e19a3b] rounded-full"></span>
                                    </div>
                                 )}
                                 <span className={seat.includes('Free') || seat.includes('Complimentary') ? 'text-green-600 font-bold' : ''}>{seat}</span>
                               </div>
                             ))}
                          </div>
                       </div>
                       
                       {/* Footer / Booking Action */}
                       <div className="px-5 pb-5 mt-auto bg-white flex flex-col items-center">
                          <div className={`w-full p-3 rounded-md text-[10px] font-bold leading-relaxed mb-5 flex items-start gap-2
                            ${tier.badge === 'MMTSPECIAL' ? 'bg-[#fff5e5] text-gray-800' : 'bg-[#fff8eb] text-gray-700'}`}
                          >
                             <div className="w-4 h-4 rounded-full bg-[#d5a452] shrink-0 flex items-center justify-center text-white italic text-[10px]">%</div>
                             <div className="flex-1">
                               {tier.badge === 'MMTSPECIAL' ? (
                                 <>
                                   <div className="font-black uppercase tracking-wider text-[#9d7328]">{tier.tagline}</div>
                                   <div className="flex items-center gap-1 mt-1 font-bold text-gray-600"><ShieldCheck size={12} className="text-[#d5a452]" /> {tier.insurance} <span className="text-gray-400 text-[10px] border border-gray-300 rounded-full w-3 h-3 flex items-center justify-center ml-1">i</span></div>
                                 </>
                               ) : (
                                 <>{tier.tagline}</>
                               )}
                             </div>
                          </div>
                          
                          <button 
                            onClick={() => { setShowFareModal(false); onBook({...flight, fareType: tier.name, farePrice: tier.price}); }}
                            className="bg-[#008cff] hover:bg-blue-600 text-white font-black py-3 px-8 rounded-full text-[13px] shadow-sm transition-all focus:ring-2 focus:ring-blue-400 active:scale-95 px-10"
                          >
                            BOOK NOW
                          </button>
                       </div>
                    </div>
                  ))}
               </div>
            </div>
          </div>
        </div>, document.body
      )}
    </div>
  );
};

export default FlightCard;
