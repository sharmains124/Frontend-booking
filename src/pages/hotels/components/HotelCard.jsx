import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, MapPin, Wifi, Coffee, Dumbbell, Waves, CheckCircle2, ChevronDown, X } from 'lucide-react';
import { createPortal } from 'react-dom';

const AMENITY_ICONS = {
  'Free WiFi': <Wifi size={12} />,
  'Breakfast included': <Coffee size={12} />,
  'Gym': <Dumbbell size={12} />,
  'Pool': <Waves size={12} />,
};

const HotelCard = ({ hotel }) => {
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);
  const [showRoomModal, setShowRoomModal] = useState(false);

  const name = hotel?.name || 'Grand Hyatt Mumbai';
  const location = hotel?.location || 'Mumbai, India';
  const price = hotel?.price || '7,500';
  const originalPrice = hotel?.originalPrice || '9,000';
  const rating = hotel?.rating || '4.5';
  const ratingText = hotel?.ratingText || 'Excellent';
  const reviews = hotel?.reviews || 2847;
  const discount = hotel?.discount || '15% OFF';
  const status = hotel?.status || 'Top Pick';
  const distance = hotel?.distance || 'Near city center';
  const amenities = hotel?.amenities || ['Free WiFi', 'Breakfast included', 'Pool', 'Gym'];
  const image = hotel?.image || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=800';

  const roomTypes = [
    { name: 'Standard Room', price: parseInt(price.replace(/,/g, '')), breakfast: false, cancellation: 'Non-refundable', available: 8 },
    { name: 'Deluxe Room', price: parseInt(price.replace(/,/g, '')) + 1200, breakfast: true, cancellation: 'Free cancellation', available: 4 },
    { name: 'Suite', price: parseInt(price.replace(/,/g, '')) + 3500, breakfast: true, cancellation: 'Free cancellation', available: 2 },
  ];

  return (
    <div className="bg-white shadow-[0_2px_10px_rgb(0,0,0,0.06)] border border-gray-100 hover:shadow-md transition-all duration-300 mb-4 font-sans relative rounded-xl overflow-hidden">
      {/* Main horizontal layout */}
      <div className="flex flex-col md:flex-row">
        {/* Hotel Image */}
        <div className="relative md:w-[260px] shrink-0 h-[200px] md:h-auto overflow-hidden">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="absolute top-3 left-3 bg-green-500 text-white text-[10px] font-black px-2 py-1 rounded-md uppercase tracking-wider">
            {discount}
          </div>
          {status === 'Top Pick' && (
            <div className="absolute top-3 right-3 bg-amber-500 text-white text-[10px] font-black px-2 py-1 rounded-md uppercase tracking-wider flex items-center gap-1">
              <Star size={10} fill="white" /> {status}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 p-5 flex flex-col justify-between">
          <div>
            {/* Header */}
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="text-[17px] font-black text-gray-900 tracking-tight">{name}</h3>
                <div className="flex items-center gap-1.5 mt-1">
                  <MapPin size={12} className="text-gray-400" />
                  <span className="text-[11px] font-bold text-gray-500">{location}</span>
                  <span className="text-gray-300">·</span>
                  <span className="text-[11px] font-bold text-gray-400">{distance}</span>
                </div>
              </div>
              {/* Rating Badge */}
              <div className="flex flex-col items-end shrink-0 ml-4">
                <div className="flex items-center gap-1.5 bg-blue-600 text-white px-3 py-1.5 rounded-lg">
                  <Star size={12} fill="white" />
                  <span className="text-[14px] font-black">{rating}</span>
                </div>
                <span className="text-[10px] font-bold text-blue-600 mt-1">{ratingText}</span>
                <span className="text-[9px] font-bold text-gray-400">{reviews.toLocaleString()} reviews</span>
              </div>
            </div>

            {/* Amenities */}
            <div className="flex flex-wrap gap-2 mt-3">
              {amenities.map((a) => (
                <span key={a} className="flex items-center gap-1 text-[10px] font-bold text-gray-600 bg-gray-50 border border-gray-100 px-2.5 py-1 rounded-full">
                  {AMENITY_ICONS[a] || null} {a}
                </span>
              ))}
            </div>

            {/* Trust Badges */}
            <div className="flex items-center gap-3 mt-3">
              <div className="flex items-center gap-1 text-green-600 text-[10px] font-bold">
                <CheckCircle2 size={11} /> Free cancellation
              </div>
              <div className="w-1 h-1 rounded-full bg-gray-300" />
              <div className="text-[10px] font-bold text-gray-400">Pay at hotel available</div>
            </div>
          </div>

          {/* Price & Action */}
          <div className="flex items-end justify-between mt-4 pt-4 border-t border-gray-50">
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-[11px] font-bold text-gray-400 line-through">₹{originalPrice}</span>
                <span className="text-[24px] font-black text-gray-900 leading-none">₹{price}</span>
              </div>
              <span className="text-[10px] font-bold text-gray-500">per night + taxes</span>
            </div>
            <button
              onClick={() => setShowRoomModal(true)}
              className="border-[1.5px] border-[#008cff] text-[#008cff] hover:bg-blue-50 font-black py-2 px-6 rounded-full uppercase tracking-widest text-[11px] transition-all shadow-sm"
            >
              SELECT ROOM
            </button>
          </div>
        </div>
      </div>

      {/* Expand Footer */}
      <div
        className="bg-gray-50 py-2.5 flex items-center px-6 cursor-pointer border-t border-gray-100 group transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <span className="text-[11px] font-bold text-[#008cff] flex items-center gap-1 transition-colors">
          Hotel Details
          <ChevronDown size={14} className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
        </span>
        <div className="ml-auto text-[10px] font-bold text-green-600 flex items-center gap-1 px-2 py-0.5 bg-green-50 rounded-md">
          <CheckCircle2 size={12} /> Free Breakfast
        </div>
      </div>

      {/* Expanded Details */}
      {isExpanded && (
        <div className="p-6 bg-white border-t border-gray-100 text-sm font-bold text-gray-500">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div><span className="text-gray-800 font-black">Check-in:</span> 14:00</div>
            <div><span className="text-gray-800 font-black">Check-out:</span> 12:00</div>
            <div><span className="text-gray-800 font-black">Property Type:</span> Hotel</div>
          </div>
        </div>
      )}

      {/* Room Selection Modal */}
      {showRoomModal && createPortal(
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 font-sans">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowRoomModal(false)} />
          <div className="bg-[#f5f7f9] rounded-xl w-full max-w-[900px] max-h-[90vh] flex flex-col shadow-2xl relative z-10 overflow-hidden">
            {/* Header */}
            <div className="bg-white p-5 border-b border-gray-200 flex items-center justify-between shrink-0">
              <h2 className="text-[18px] font-black text-gray-900 tracking-tight">Select Your Room at {name}</h2>
              <button onClick={() => setShowRoomModal(false)} className="text-gray-400 hover:text-gray-800 transition-colors p-1 rounded-full hover:bg-gray-100">
                <X size={22} />
              </button>
            </div>
            {/* Subheader */}
            <div className="bg-[#fcfdfd] px-5 py-3 border-b border-gray-200 text-[12px] font-black text-gray-700">
              {location} · Rating: {rating} · {reviews.toLocaleString()} reviews
            </div>
            {/* Room Options */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {roomTypes.map((room, idx) => (
                <div key={idx} className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:shadow-md transition-shadow">
                  <div className="flex-1">
                    <h3 className="text-[15px] font-black text-gray-900 mb-1">{room.name}</h3>
                    <div className="flex flex-wrap gap-3 mt-2">
                      <div className="flex items-center gap-1 text-[11px] font-bold text-gray-600">
                        {room.breakfast
                          ? <><CheckCircle2 size={12} className="text-green-500" /> Breakfast Included</>
                          : <><span className="w-3 h-3 rounded-full bg-gray-200 inline-block" /> Room only</>
                        }
                      </div>
                      <div className={`flex items-center gap-1 text-[11px] font-bold ${room.cancellation === 'Free cancellation' ? 'text-green-600' : 'text-orange-500'}`}>
                        <CheckCircle2 size={12} /> {room.cancellation}
                      </div>
                      <div className="text-[11px] font-bold text-gray-500">{room.available} rooms left</div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-[22px] font-black text-gray-900">₹{room.price.toLocaleString()}</span>
                    <span className="text-[10px] font-bold text-gray-400 mb-3">per night</span>
                    <button
                      onClick={() => { setShowRoomModal(false); navigate(`/hotels/details/${hotel?.id || '1'}`, { state: { hotel, selectedRoom: room } }); }}
                      className="bg-[#008cff] hover:bg-blue-600 text-white font-black py-2.5 px-6 rounded-full text-[12px] shadow-sm transition-all"
                    >
                      BOOK NOW
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>, document.body
      )}
    </div>
  );
};

export default HotelCard;
