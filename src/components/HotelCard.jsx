import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Star, 
  MapPin, 
  Wifi, 
  Wind, 
  Coffee, 
  ChevronRight,
  ShieldCheck,
  Check,
  Navigation
} from 'lucide-react';

const HotelCard = ({ hotel }) => {
  const navigate = useNavigate();
  const {
    name = "The Taj Mahal Palace",
    location = "Colaba, Mumbai",
    price = "15,000",
    originalPrice = "18,500",
    rating = "4.9",
    ratingText = "Excellent",
    reviews = "2,450",
    image = "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=600&h=400",
    amenities = ["Free WiFi", "Breakfast included", "Pool"],
    discount = "15% OFF",
    status = "Top Pick",
    tax = "2,145",
    distance = "500m from city center"
  } = hotel;

  const handleViewRooms = (e) => {
    e.stopPropagation();
    navigate(`/hotels/details/${hotel.id}`, { state: { hotel } });
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col md:flex-row mb-5 group cursor-pointer font-sans min-h-[220px]">
      
      {/* Column 1: Image Section */}
      <div className="md:w-[280px] relative overflow-hidden h-48 md:h-auto shrink-0 bg-gray-50 border-r border-gray-100">
         <img src={image} alt={name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
         
         {status && (
            <div className="absolute top-0 left-0 bg-blue-600 text-white text-[10px] font-black px-3 py-1 rounded-br-lg uppercase tracking-wider shadow-md">
               {status}
            </div>
         )}

         <div className="absolute bottom-2 left-2 bg-black/50 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-1 rounded flex items-center gap-1">
            <span>+12 Photos</span>
         </div>
      </div>

      {/* Column 2: Information Section */}
      <div className="flex-2 p-5 flex flex-col justify-between border-r border-gray-100">
         <div>
            <div className="flex items-center gap-2 mb-1">
                <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map(s => (
                        <Star key={s} size={10} className={s <= Math.floor(rating) ? "fill-yellow-500 text-yellow-500" : "text-gray-200"} />
                    ))}
                </div>
                <span className="text-[10px] font-bold text-gray-400">Hotel</span>
            </div>

            <h3 className="text-xl font-black text-gray-900 tracking-tight leading-tight mb-1 group-hover:text-blue-600 transition-colors uppercase">
                {name}
            </h3>

            <div className="flex items-center gap-1.5 text-[13px] mb-4">
                <span className="text-blue-600 font-bold hover:underline flex items-center gap-1">
                    {location}
                </span>
                <span className="text-gray-300">|</span>
                <span className="text-gray-500 font-medium">{distance}</span>
            </div>

            <div className="flex flex-wrap gap-4 mb-4">
                {amenities.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-1.5 text-gray-600 text-[12px] font-bold">
                        <Check size={14} className="text-green-600" strokeWidth={3} /> {item}
                    </div>
                ))}
            </div>
         </div>

         <div className="flex items-center gap-3">
            <span className="px-2 py-0.5 bg-blue-50 text-blue-600 border border-blue-100 text-[10px] font-black rounded uppercase tracking-wider">Early Bird Deal</span>
            <span className="px-2 py-0.5 bg-green-50 text-green-600 border border-green-100 text-[10px] font-black rounded uppercase tracking-wider">Free Cancellation</span>
         </div>
      </div>

      {/* Column 3: Pricing Section */}
      <div className="md:w-[220px] p-5 flex flex-col justify-between text-right bg-gray-50/30 shrink-0">
         <div className="flex flex-col items-end">
            <div className="flex items-center gap-2 mb-1">
                <div className="text-right">
                    <p className="text-[14px] font-black text-blue-600 leading-none">{ratingText}</p>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">{reviews} Ratings</p>
                </div>
                <div className="bg-blue-600 text-white min-w-[32px] h-8 rounded-lg flex items-center justify-center font-black text-sm shadow-md">
                    {rating}
                </div>
            </div>
         </div>

         <div className="flex flex-col items-end mt-auto">
            <span className="text-[13px] text-gray-400 line-through font-bold">₹{originalPrice}</span>
            <div className="flex flex-col items-end">
               <span className="text-2xl font-black text-gray-900 leading-none tabular-nums">₹{price}</span>
               <p className="text-[11px] font-bold text-gray-500 mt-1">+ ₹{tax} taxes & fees</p>
               <p className="text-[10px] font-bold text-gray-400 lowercase mt-0.5 italic">Per Night</p>
            </div>
            
            <button 
              onClick={handleViewRooms}
              className="mt-4 bg-blue-600 hover:bg-blue-700 text-white w-full py-3 rounded-xl font-black text-[13px] uppercase tracking-widest shadow-lg shadow-blue-600/20 transition-all flex items-center justify-center gap-2 group/btn"
            >
               VIEW ROOMS
               <ChevronRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
            </button>
         </div>
      </div>
    </div>
  );
};

export default HotelCard;
