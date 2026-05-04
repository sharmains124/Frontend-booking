import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { 
  Plane, 
  MapPin, 
  Calendar, 
  Users, 
  ChevronDown, 
  ArrowLeftRight, 
  Search, 
  X,
  Check
} from 'lucide-react';

import GuestClassSelector from '../../../components/GuestClassSelector';

const CITY_DATA = {
  visaFree: [
    "Manila", "Male", "Kuala Lumpur", "Colombo", "Mauritius", "Hong Kong", "Paro", "Mahe Island", "Nadi"
  ],
  eVisa: [
    "Denpasar Bali", "Ho Chi Minh", "Tokyo", "Siem Reap", "Tbilisi", "Dubai"
  ],
  popular: [
    { code: "BOM", name: "Mumbai, India", airport: "Chhatrapati Shivaji International Airport" },
    { code: "DEL", name: "New Delhi, India", airport: "Indira Gandhi International Airport" },
    { code: "BKK", name: "Bangkok, Thailand", airport: "Suvarnabhumi Airport" },
    { code: "BLR", name: "Bengaluru, India", airport: "Bengaluru International Airport" },
    { code: "PNQ", name: "Pune, India", airport: "Pune Airport" },
    { code: "HYD", name: "Hyderabad, India", airport: "Rajiv Gandhi International Airport" },
    { code: "CCU", name: "Kolkata, India", airport: "Netaji Subhash Chandra Bose International Airport" },
    { code: "MAA", name: "Chennai, India", airport: "Chennai International Airport" },
    { code: "GOI", name: "Goa - Dabolim Airport, India", airport: "Goa Dabolim International Airport" },
    { code: "DXB", name: "Dubai, United Arab Emirates", airport: "Dubai International", hasEVisa: true }
  ]
};

const FlightResultsHeader = ({ origin, destination, date, passengers, travelClass }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [tripType, setTripType] = useState(searchParams.get('type') || 'oneWay');
  const [fareType, setFareType] = useState('regular');

  // Local search state synced with props/params
  const [searchData, setSearchData] = useState({
    from: { city: 'New Delhi', code: origin || 'DEL', airport: 'Indira Gandhi International Airport' },
    to: { city: 'Mumbai', code: destination || 'BOM', airport: 'Chhatrapati Shivaji International Airport' }
  });

  const [dates, setDates] = useState({ 
    checkIn: date ? new Date(date) : new Date(), 
    checkOut: null 
  });

  const [guestData, setGuestData] = useState({
    adults: parseInt(passengers) || 1,
    children: 0,
    infants: 0,
    rooms: 1,
    cabinClass: travelClass || 'Economy'
  });

  const dropdownRef = useRef(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = () => {
    const travelDate = dates.checkIn ? dates.checkIn.toISOString().split('T')[0] : '';
    const query = `?from=${searchData.from.code}&to=${searchData.to.code}&date=${travelDate}&passengers=${guestData.adults + guestData.children}&class=${guestData.cabinClass}`;
    navigate('/flights/search' + query);
    setActiveDropdown(null);
  };

  const handleCitySelect = (city, type) => {
    if (type === 'from') {
      setSearchData({ ...searchData, from: city });
      setActiveDropdown('to');
    } else {
      setSearchData({ ...searchData, to: city });
      setActiveDropdown(null);
    }
  };

  const fareOptions = [
    { id: 'regular', label: 'Regular' },
    { id: 'student', label: 'Student' },
    { id: 'armed', label: 'Armed Forces' },
    { id: 'gst', label: 'Have a GST number?' },
    { id: 'senior', label: 'Senior Citizen' },
    { id: 'medical', label: 'Doctor and Nurses' }
  ];

  return (
    <div className="bg-[#f2f2f2] border-b border-gray-200 sticky top-[80px] z-[1000] py-3 shadow-md">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Main Search Inputs Grid - MMT Style Horizontal Row */}
        <div className="flex items-center gap-1.5 relative">
          
          {/* Trip Type Dropdown */}
          <div 
            className="bg-white rounded-lg border border-gray-200 px-4 py-2 cursor-pointer flex flex-col justify-center min-w-[120px] h-[55px] hover:border-blue-400 transition-colors"
            onClick={() => setActiveDropdown(activeDropdown === 'tripType' ? null : 'tripType')}
          >
            <div className="flex items-center gap-1 mb-0.5">
              <span className="text-[10px] font-black text-gray-500 uppercase">Trip Type</span>
              <ChevronDown size={12} className="text-blue-500" />
            </div>
            <span className="text-[13px] font-black text-gray-900">{tripType === 'oneWay' ? 'One Way' : tripType === 'roundTrip' ? 'Round Trip' : 'Multi City'}</span>
          </div>

          {/* From City */}
          <div 
            className="flex-1 bg-white rounded-lg border border-gray-200 px-4 py-2 cursor-pointer flex flex-col justify-center h-[55px] hover:border-blue-400 transition-colors relative"
            onClick={() => setActiveDropdown('from')}
          >
            <span className="text-[10px] font-black text-gray-500 uppercase mb-0.5">From</span>
            <span className="text-[14px] font-black text-gray-900 truncate">{searchData.from.city}, India</span>
          </div>

          {/* Swap Icon */}
          <button 
            className="z-10 -mx-3 w-7 h-7 bg-white rounded-full border border-gray-200 flex items-center justify-center text-blue-500 shadow-sm hover:shadow-md transition-shadow active:scale-90"
            onClick={() => setSearchData({ from: searchData.to, to: searchData.from })}
          >
            <ArrowLeftRight size={14} strokeWidth={3} />
          </button>

          {/* To City */}
          <div 
            className="flex-1 bg-white rounded-lg border border-gray-200 px-4 py-2 cursor-pointer flex flex-col justify-center h-[55px] hover:border-blue-400 transition-colors"
            onClick={() => setActiveDropdown('to')}
          >
            <span className="text-[10px] font-black text-gray-500 uppercase mb-0.5">To</span>
            <span className="text-[14px] font-black text-gray-900 truncate">{searchData.to.city}, India</span>
          </div>

          {/* Depart Date */}
          <div 
            className="w-40 bg-white rounded-lg border border-gray-200 px-4 py-2 cursor-pointer flex flex-col justify-center h-[55px] hover:border-blue-400 transition-colors"
            onClick={() => setActiveDropdown('calendar')}
          >
            <span className="text-[10px] font-black text-gray-500 uppercase mb-0.5">Depart</span>
            <span className="text-[14px] font-black text-gray-900">
               {dates.checkIn?.toLocaleDateString('en-US', { weekday: 'short', day: 'numeric', month: 'short', year: '2-digit' }).replace(',', '')}
            </span>
          </div>

          {/* Return Date */}
          <div 
            className={`w-40 bg-white rounded-lg border border-gray-200 px-4 py-2 cursor-pointer flex flex-col justify-center h-[55px] hover:border-blue-400 transition-colors ${tripType === 'oneWay' ? 'opacity-70' : ''}`}
            onClick={() => { setTripType('roundTrip'); setActiveDropdown('calendar'); }}
          >
            <span className="text-[10px] font-black text-gray-500 uppercase mb-0.5">Return</span>
            <span className={`text-[14px] font-black ${dates.checkOut ? 'text-gray-900' : 'text-gray-400'}`}>
               {dates.checkOut 
                 ? dates.checkOut.toLocaleDateString('en-US', { weekday: 'short', day: 'numeric', month: 'short', year: '2-digit' }).replace(',', '')
                 : 'Select Return'}
            </span>
          </div>

          {/* Passenger & Class */}
          <div 
            className="flex-1 bg-white rounded-lg border border-gray-200 px-4 py-2 cursor-pointer flex flex-col justify-center h-[55px] hover:border-blue-400 transition-colors min-w-[180px]"
            onClick={() => setActiveDropdown('guests')}
          >
            <span className="text-[10px] font-black text-gray-500 uppercase mb-0.5">Passenger & Class</span>
            <span className="text-[13px] font-black text-gray-900 truncate">
               {guestData.adults + guestData.children} Adult, {guestData.cabinClass}
            </span>
          </div>

          {/* Search Button */}
          <button 
            onClick={handleSearch}
            className="bg-blue-600 hover:bg-blue-700 text-white px-10 h-[55px] rounded-lg font-black text-base uppercase tracking-wider shadow-lg active:scale-95 transition-all"
          >
            Search
          </button>

          {/* Dropdown Containers */}
          {activeDropdown && (
            <div ref={dropdownRef} className="absolute top-[65px] z-[1001] animate-fade-in">
              {(activeDropdown === 'from' || activeDropdown === 'to') && (
                <div className={`absolute ${activeDropdown === 'from' ? 'left-[130px]' : 'left-[350px]'} w-[400px] bg-white shadow-[0_1px_6px_0_rgba(0,0,0,0.2)] rounded-[8px] overflow-hidden border border-gray-100 flex flex-col animate-fade-in-up`}>
                   {/* Search Bar inside dropdown */}
                   <div className="p-4 border-b border-gray-100 flex items-center gap-3 bg-white">
                      <Search size={18} className="text-gray-400" />
                      <input 
                        autoFocus
                        type="text" 
                        placeholder={activeDropdown === 'from' ? "From" : "To"}
                        className="flex-1 bg-transparent border-none outline-none text-[13px] font-bold text-gray-800 placeholder:text-gray-300"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                   </div>
                   {/* Dropdown Content */}
                   <div className="max-h-[380px] overflow-y-auto py-4 px-5 space-y-6 bg-white">
                      <div>
                        <h4 className="text-[11px] font-black text-gray-800 mb-3 uppercase tracking-widest">Visa Destinations</h4>
                        <div className="grid grid-cols-3 gap-1.5">
                          {CITY_DATA.visaFree.slice(0, 6).map(city => (
                            <button key={city} onClick={() => handleCitySelect({ city, code: city.substring(0,3).toUpperCase(), airport: `${city} International Airport` }, activeDropdown)}
                              className="px-1 py-2 rounded-lg border border-gray-100 text-[10px] font-black text-gray-500 hover:border-blue-400 hover:text-blue-600 transition-all text-center">
                              {city}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div>
                         <h4 className="text-[11px] font-black text-gray-800 mb-3 uppercase tracking-widest">Popular Searches</h4>
                         <div className="space-y-0.5">
                            {CITY_DATA.popular.map(city => (
                              <div key={city.code} onClick={() => handleCitySelect(city, activeDropdown)}
                                className="flex items-center gap-3 p-2 rounded-lg cursor-pointer hover:bg-gray-50 group">
                                 <div className="w-9 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-[10px] font-black text-gray-400 group-hover:bg-blue-50 group-hover:text-blue-600">{city.code}</div>
                                 <div className="flex flex-col flex-1 min-w-0">
                                    <span className="text-xs font-black text-gray-800 group-hover:text-blue-600 truncate">{city.name}</span>
                                    <span className="text-[10px] font-bold text-gray-400 truncate">{city.airport}</span>
                                 </div>
                              </div>
                            ))}
                         </div>
                      </div>
                   </div>
                </div>
              )}

              {activeDropdown === 'calendar' && (
                <div className="absolute left-[500px] bg-white shadow-[0_1px_6px_0_rgba(0,0,0,0.2)] rounded-[8px] overflow-hidden border border-gray-100 p-5 flex flex-col gap-4 w-[400px] animate-fade-in-up">
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Depart Date</label>
                    <input
                      type="date"
                      value={dates.checkIn ? dates.checkIn.toISOString().split('T')[0] : ''}
                      min={new Date().toISOString().split('T')[0]}
                      onChange={e => {
                        const d = e.target.value ? new Date(e.target.value) : null;
                        setDates(prev => ({ ...prev, checkIn: d }));
                      }}
                      className="border-2 border-gray-200 focus:border-blue-500 rounded-lg px-3 py-2 text-sm font-black text-gray-900 outline-none cursor-pointer"
                    />
                  </div>
                  {tripType === 'roundTrip' && (
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Return Date</label>
                      <input
                        type="date"
                        value={dates.checkOut ? dates.checkOut.toISOString().split('T')[0] : ''}
                        min={dates.checkIn ? dates.checkIn.toISOString().split('T')[0] : new Date().toISOString().split('T')[0]}
                        onChange={e => {
                          const d = e.target.value ? new Date(e.target.value) : null;
                          setDates(prev => ({ ...prev, checkOut: d }));
                          if (d) setActiveDropdown(null);
                        }}
                        className="border-2 border-gray-200 focus:border-blue-500 rounded-lg px-3 py-2 text-sm font-black text-gray-900 outline-none cursor-pointer"
                      />
                    </div>
                  )}
                  <button
                    onClick={() => setActiveDropdown(null)}
                    className="w-full py-2 bg-blue-600 text-white rounded-lg text-[11px] font-black uppercase tracking-widest hover:bg-blue-700 transition-all"
                  >Done</button>
                </div>
              )}

              {activeDropdown === 'guests' && (
                <div className="absolute right-0 shadow-[0_1px_6px_0_rgba(0,0,0,0.2)] rounded-[8px] overflow-hidden border border-gray-100 w-[400px] animate-fade-in-up bg-white">
                  <GuestClassSelector 
                    guestData={guestData} 
                    onChange={setGuestData}
                  />
                </div>
              )}

              {activeDropdown === 'tripType' && (
                <div className="absolute left-0 w-48 bg-white shadow-[0_1px_6px_0_rgba(0,0,0,0.2)] rounded-[8px] border border-gray-100 overflow-hidden animate-fade-in-up">
                  {['oneWay', 'roundTrip', 'multiCity'].map((type) => (
                    <div 
                      key={type}
                      className="px-4 py-3 text-[13px] font-black text-gray-700 hover:bg-gray-50 cursor-pointer flex items-center justify-between"
                      onClick={() => { setTripType(type); setActiveDropdown(null); }}
                    >
                      {type === 'oneWay' ? 'One Way' : type === 'roundTrip' ? 'Round Trip' : 'Multi City'}
                      {tripType === type && <Check size={16} className="text-blue-600" />}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Fare Type Options Section (Row below search boxes) */}
        <div className="flex items-center gap-4 mt-3 px-1 overflow-x-auto scrollbar-hide">
          <span className="text-[11px] font-black text-gray-500 uppercase tracking-tight shrink-0">Fare type:</span>
          {fareOptions.map((opt) => (
             <label key={opt.id} className="flex items-center gap-2 cursor-pointer shrink-0">
               <div className="relative flex items-center justify-center">
                  <input 
                    type="radio" 
                    name="fareType" 
                    checked={fareType === opt.id}
                    onChange={() => setFareType(opt.id)}
                    className="appearance-none w-4 h-4 rounded-full border-2 border-gray-300 checked:border-blue-600 transition-all cursor-pointer"
                  />
                  {fareType === opt.id && <div className="absolute w-2 h-2 bg-blue-600 rounded-full" />}
               </div>
               <span className={`text-[11px] font-black transition-colors ${fareType === opt.id ? 'text-gray-900' : 'text-gray-500'}`}>
                 {opt.label}
                 {opt.id === 'gst' && <span className="ml-1 text-[8px] border border-pink-400 text-pink-500 px-1 rounded uppercase">New</span>}
               </span>
             </label>
          ))}
        </div>

      </div>
    </div>
  );
};

export default FlightResultsHeader;
