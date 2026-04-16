import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Plane,
  Hotel,
  Train,
  Bus,
  MapPin,
  Calendar,
  Users,
  ChevronDown,
  ArrowLeftRight,
  X,
  Check,
  Search
} from 'lucide-react';

import GuestClassSelector from './GuestClassSelector';
import HotelGuestSelector from './HotelGuestSelector';
import { toast } from 'react-hot-toast';

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

const SearchForm = ({ initialTab = 'Flights' }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(initialTab);
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const [dates, setDates] = useState({ checkIn: tomorrow, checkOut: null });
  const [showCalendar, setShowCalendar] = useState(false);
  const [showGuests, setShowGuests] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null); // 'from' | 'to' | null
  const [tripType, setTripType] = useState('oneWay');
  const [searchQuery, setSearchQuery] = useState('');
  const [swapRotation, setSwapRotation] = useState(0);
  const [hotelOption, setHotelOption] = useState('upto4'); // 'upto4' | 'group'
  const [guestData, setGuestData] = useState({
    adults: 1,
    children: 0,
    infants: 0,
    rooms: 1,
    cabinClass: 'Economy'
  });

  const [searchData, setSearchData] = useState({
    from: { city: 'New Delhi', code: 'DEL', airport: 'Indira Gandhi International Airport' },
    to: { city: 'Mumbai', code: 'BOM', airport: 'Chhatrapati Shivaji International Airport' }
  });
  
  const dropdownRef = useRef(null);
  const departureRef = useRef(null);
  const guestsRef = useRef(null);

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

  const tabs = [
    { name: 'Flights', route: '/flights/search' },
    { name: 'Bus', route: '/bus' },
    { name: 'Train', route: '/trains/results' },
    { name: 'Hotels', route: '/hotels/results' }
  ];

  const handleSearch = () => {
    const selectedTab = tabs.find(t => t.name === activeTab) || tabs[0];
    
    if (activeTab === 'Hotels') {
      if (!searchData.from.city) {
        toast.error('Please enter a location');
        return;
      }
      const checkIn = dates.checkIn ? dates.checkIn.toISOString().split('T')[0] : '';
      const checkOut = dates.checkOut ? dates.checkOut.toISOString().split('T')[0] : new Date(dates.checkIn.getTime() + 86400000).toISOString().split('T')[0];
      const query = `?city=${searchData.from.city}&checkIn=${checkIn}&checkOut=${checkOut}&rooms=${guestData.rooms}&adults=${guestData.adults}&children=${guestData.children}`;
      navigate(selectedTab.route + query);
    } else {
      if (!searchData.from.city || !searchData.to.city) {
        toast.error('Please enter both origin and destination');
        return;
      }
      const travelDate = dates.checkIn ? dates.checkIn.toISOString().split('T')[0] : '';
      const query = `?from=${searchData.from.code}&to=${searchData.to.code}&date=${travelDate}&passengers=${guestData.adults + guestData.children}&class=${guestData.cabinClass}`;
      navigate(selectedTab.route + query);
    }
  };


  const handleCitySelect = (city, type) => {
    if (type === 'from') {
      setSearchData({ ...searchData, from: city });
      setActiveDropdown('to');
    } else {
      setSearchData({ ...searchData, to: city });
      setActiveDropdown(null);
      setShowCalendar(true); // Auto-open calendar after selecting destination
    }
    setSearchQuery('');
  };

  // ── MMT Style Hotels Helpers ─────────────────────────────────────────

  const renderHotelSubHeader = () => (
    <div className="flex items-center justify-between mb-2 px-2">
      <div className="flex items-center gap-4">
        <label className="flex items-center gap-2 cursor-pointer group">
          <div className="relative flex items-center justify-center">
            <input 
              type="radio" 
              name="hotelOption" 
              checked={hotelOption === 'upto4'}
              onChange={() => setHotelOption('upto4')}
              className="appearance-none w-4 h-4 rounded-full border-2 border-gray-300 checked:bg-primary checked:border-primary transition-all cursor-pointer"
            />
          </div>
          <span className={`text-[12px] font-black transition-colors ${hotelOption === 'upto4' ? 'text-text-main' : 'text-text-muted group-hover:text-text-main'}`}>
            Upto 4 Rooms
          </span>
        </label>

        <label className="flex items-center gap-2 cursor-pointer group">
          <div className="relative flex items-center justify-center">
            <input 
              type="radio" 
              name="hotelOption" 
              checked={hotelOption === 'group'}
              onChange={() => setHotelOption('group')}
              className="appearance-none w-4 h-4 rounded-full border-2 border-gray-300 checked:bg-primary checked:border-primary transition-all cursor-pointer"
            />
          </div>
          <div className="flex items-center gap-2">
            <span className={`text-[12px] font-black transition-colors ${hotelOption === 'group' ? 'text-text-main' : 'text-text-muted group-hover:text-text-main'}`}>
              Group Deals
            </span>
            <span className="bg-accent text-white text-[8px] font-black px-1.5 py-0.5 rounded uppercase tracking-tighter shadow-sm">new</span>
          </div>
        </label>
      </div>

      <p className="hidden md:block text-[11px] font-medium text-text-muted">
        Book Domestic and International Property Online.
      </p>
    </div>
  );

  const renderTrendingSearches = () => (
    <div className="mt-4 flex items-center gap-3 px-2 flex-wrap">
      <span className="text-[12px] font-black text-text-light uppercase tracking-widest">Trending Searches:</span>
      {['Singapore, Singapore', 'London, United Kingdom', 'Dubai, United Arab Emirates'].map((city) => (
        <button 
          key={city}
          className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-[12px] font-bold text-text-main rounded-lg transition-all active:scale-95"
          onClick={() => handleCitySelect({ city: city.split(',')[0], code: 'TRD', airport: city }, 'from')}
        >
          {city}
        </button>
      ))}
    </div>
  );

  return (
    <div className="w-full max-w-6xl mx-auto relative z-[100] font-sans">
      <div className="bg-white rounded-[20px] shadow-[0_15px_60px_-15px_rgba(0,0,0,0.15)] relative border border-gray-100 animate-fade-in-up">
        
        {/* ── Tabs Bar ─────────────────────────────────────────── */}
        <div className="flex px-8 border-b border-gray-100">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.name;
            return (
              <button
                key={tab.name}
                onClick={() => setActiveTab(tab.name)}
                className={`flex items-center gap-3 px-6 py-4 text-[13px] font-black tracking-widest uppercase transition-all relative
                  ${isActive ? 'text-primary' : 'text-gray-400 hover:text-text-main'}`}
              >
                {tab.name}
                {isActive && (
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-1 bg-primary rounded-t-full shadow-[0_-2px_10px_rgba(124,58,237,0.3)]" />
                )}
              </button>
            );
          })}
        </div>

        {/* ── Main Search Form ────────────────────────────────── */}
        <div className={activeTab === 'Hotels' ? 'p-2 md:p-3' : 'p-3 md:p-4'}>
          {/* Layout Switcher */}
          {activeTab === 'Hotels' ? (
            <>
              {renderHotelSubHeader()}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch bg-white border border-gray-200 rounded-2xl overflow-visible relative shadow-sm">
                {/* Hotel Location Box */}
                <div 
                  className="lg:col-span-5 p-6 md:p-8 cursor-pointer transition-all hover:bg-gray-50/50 relative border-r border-gray-100 min-h-[110px] flex flex-col justify-center rounded-l-2xl"
                  onClick={() => { setActiveDropdown('from'); setShowCalendar(false); setShowGuests(false); }}
                >
                  <p className="text-[12px] font-black text-gray-400 uppercase tracking-[0.15em] mb-1">City / Hotel / Area</p>
                  <h3 className="text-2xl font-black text-text-main leading-none truncate">{searchData.from.city}</h3>
                  <p className="text-[12px] font-bold text-gray-500 truncate mt-1">
                    {searchData.from.airport.split(',').pop().trim() || 'India'}
                  </p>
                </div>

                {/* Check-In */}
                <div 
                  className={`lg:col-span-2 p-6 md:p-8 cursor-pointer transition-all hover:bg-gray-50/50 border-r border-gray-100 min-h-[110px] flex flex-col justify-center ${showCalendar ? 'bg-primary/5' : ''}`}
                  onClick={() => { setShowCalendar(!showCalendar); setActiveDropdown(null); setShowGuests(false); }}
                >
                  <p className="text-[12px] font-black text-gray-400 uppercase tracking-[0.15em] mb-1">Check-In</p>
                  <div className="flex items-baseline gap-1">
                    <h3 className="text-2xl font-black text-text-main leading-none">{dates.checkIn?.getDate()}</h3>
                    <span className="text-base font-black text-text-main">{dates.checkIn?.toLocaleString('default', { month: 'short' })}'{dates.checkIn?.getFullYear().toString().substring(2)}</span>
                  </div>
                  <p className="text-[12px] font-bold text-gray-500 mt-1 uppercase">
                    {dates.checkIn?.toLocaleString('default', { weekday: 'long' })}
                  </p>
                </div>

                {/* Check-Out */}
                <div 
                  className={`lg:col-span-2 p-6 md:p-8 cursor-pointer transition-all hover:bg-gray-50/50 border-r border-gray-100 min-h-[110px] flex flex-col justify-center ${showCalendar ? 'bg-primary/5' : ''}`}
                  onClick={() => { setShowCalendar(!showCalendar); setActiveDropdown(null); setShowGuests(false); }}
                >
                  <p className="text-[12px] font-black text-gray-400 uppercase tracking-[0.15em] mb-1">Check-Out</p>
                  <div className="flex items-baseline gap-1">
                    <h3 className="text-2xl font-black text-text-main leading-none">{dates.checkOut?.getDate() || (new Date(dates.checkIn.getTime() + 86400000)).getDate()}</h3>
                    <span className="text-base font-black text-text-main">{dates.checkOut?.toLocaleString('default', { month: 'short' }) || (new Date(dates.checkIn.getTime() + 86400000)).toLocaleString('default', { month: 'short' })}'{dates.checkIn?.getFullYear().toString().substring(2)}</span>
                  </div>
                  <p className="text-[12px] font-bold text-gray-500 mt-1 uppercase">
                    {dates.checkOut?.toLocaleString('default', { weekday: 'long' }) || (new Date(dates.checkIn.getTime() + 86400000)).toLocaleString('default', { weekday: 'long' })}
                  </p>
                </div>

                {/* Rooms & Guests */}
                <div 
                  className={`lg:col-span-3 p-6 md:p-8 cursor-pointer transition-all hover:bg-gray-50/50 min-h-[110px] flex flex-col justify-center rounded-r-2xl ${showGuests ? 'bg-primary/5' : ''}`}
                  onClick={() => { setShowGuests(!showGuests); setShowCalendar(false); setActiveDropdown(null); }}
                >
                  <p className="text-[12px] font-black text-gray-400 uppercase tracking-[0.15em] mb-1">Rooms & Guests</p>
                  <div className="flex items-baseline gap-1">
                    <h3 className="text-2xl font-black text-text-main leading-none">
                      {guestData.rooms} <span className="text-sm text-gray-500">R</span> {guestData.adults} <span className="text-sm text-gray-500">A</span>
                    </h3>
                  </div>
                  <p className="text-[12px] font-bold text-gray-500 mt-1 truncate">
                    {guestData.children > 0 ? `${guestData.children} Children` : 'Select Guest Info'}
                  </p>
                </div>
              </div>
            </>
          ) : (
            <div className="relative">
              {/* Trip Type Selection Bar - MMT Style */}
              <div className="flex gap-8 mb-4 px-6">
                {[
                  { id: 'oneWay', label: 'One Way' },
                  { id: 'roundTrip', label: 'Round Trip' },
                  { id: 'multiCity', label: 'Multi City' }
                ].map((type) => (
                  <label key={type.id} className="flex items-center gap-2 cursor-pointer group">
                    <div className="relative flex items-center justify-center">
                      <input 
                        type="radio" 
                        name="tripType" 
                        checked={tripType === type.id}
                        onChange={() => {
                          setTripType(type.id);
                          if (type.id === 'roundTrip') setShowCalendar(true);
                        }}
                        className="appearance-none w-5 h-5 rounded-full border-2 border-gray-300 checked:border-primary transition-all cursor-pointer"
                      />
                      {tripType === type.id && <div className="absolute w-2.5 h-2.5 bg-primary rounded-full" />}
                    </div>
                    <span className={`text-[13px] font-black transition-colors ${tripType === type.id ? 'text-text-main' : 'text-gray-400 group-hover:text-text-main'}`}>
                      {type.label}
                    </span>
                  </label>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch bg-white border border-gray-200 rounded-2xl overflow-visible relative shadow-sm">
                
                {/* From City Selection */}
                <div 
                  className={`lg:col-span-3 p-6 md:p-8 cursor-pointer transition-all hover:bg-gray-50/50 relative border-r border-gray-100 min-h-[110px] flex flex-col justify-center rounded-l-2xl ${activeDropdown === 'from' ? 'bg-primary/5' : ''}`}
                  onClick={() => { setActiveDropdown('from'); setShowCalendar(false); setShowGuests(false); }}
                >
                  <p className="text-[12px] font-black text-gray-400 uppercase tracking-[0.15em] mb-1">From</p>
                  <h3 className="text-2xl font-black text-text-main leading-none truncate tracking-tight">{searchData.from.city}</h3>
                  <p className="text-[12px] font-bold text-gray-500 truncate mt-1">
                    {searchData.from.code}, {searchData.from.airport.split(',')[0]}
                  </p>
                </div>

                {/* Swap Button (MMT Style) */}
                <div className="absolute left-1/4 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setSearchData({ from: searchData.to, to: searchData.from });
                      setSwapRotation(prev => prev + 180);
                    }}
                    className="w-10 h-10 bg-white border border-gray-100 rounded-full shadow-premium flex items-center justify-center text-primary hover:text-white hover:bg-primary transition-all duration-500 hover:scale-110 active:scale-95"
                    style={{ transform: `rotate(${swapRotation}deg)` }}
                  >
                    <ArrowLeftRight size={16} strokeWidth={3} />
                  </button>
                </div>

                {/* To City Selection */}
                <div 
                  className={`lg:col-span-3 p-6 md:p-8 cursor-pointer transition-all hover:bg-gray-50/50 relative border-r border-gray-100 min-h-[110px] flex flex-col justify-center ${activeDropdown === 'to' ? 'bg-primary/5' : ''}`}
                  onClick={() => { setActiveDropdown('to'); setShowCalendar(false); setShowGuests(false); }}
                >
                  <p className="text-[12px] font-black text-gray-400 uppercase tracking-[0.15em] mb-1">To</p>
                  <h3 className="text-2xl font-black text-text-main leading-none truncate tracking-tight">{searchData.to.city}</h3>
                  <p className="text-[12px] font-bold text-gray-500 truncate mt-1">
                    {searchData.to.code}, {searchData.to.airport.split(',')[0]}
                  </p>
                </div>

                {/* Departure Date Selection */}
                <div 
                  className={`lg:col-span-2 p-6 md:p-8 cursor-pointer transition-all hover:bg-gray-50/50 border-r border-gray-100 min-h-[110px] flex flex-col justify-center ${showCalendar ? 'bg-primary/5' : ''}`}
                  ref={departureRef}
                  onClick={() => { setShowCalendar(!showCalendar); setActiveDropdown(null); setShowGuests(false); }}
                >
                  <p className="text-[12px] font-black text-gray-400 uppercase tracking-[0.15em] mb-1">Departure</p>
                  <div className="flex items-baseline gap-1">
                    <h3 className="text-2xl font-black text-text-main leading-none">{dates.checkIn?.getDate()}</h3>
                    <span className="text-base font-black text-text-main">{dates.checkIn?.toLocaleString('default', { month: 'short' })}'{dates.checkIn?.getFullYear().toString().substring(2)}</span>
                  </div>
                  <p className="text-[12px] font-bold text-gray-500 mt-1 uppercase">
                    {dates.checkIn?.toLocaleString('default', { weekday: 'long' })}
                  </p>
                </div>

                {/* Return Date Selection */}
                <div 
                  className={`lg:col-span-2 p-6 md:p-8 transition-all hover:bg-gray-50/50 border-r border-gray-100 last:border-0 cursor-pointer min-h-[110px] flex flex-col justify-center ${tripType === 'oneWay' ? 'bg-gray-50/10' : ''}`}
                  onClick={() => { setTripType('roundTrip'); setShowCalendar(true); setActiveDropdown(null); setShowGuests(false); }}
                >
                  <p className="text-[12px] font-black text-gray-400 uppercase tracking-[0.15em] mb-1">Return</p>
                  {tripType === 'oneWay' ? (
                    <p className="text-[12px] font-bold text-gray-300 mt-1 leading-tight">Tap for return</p>
                  ) : (
                    <>
                      <div className="flex items-baseline gap-1">
                        <h3 className="text-2xl font-black text-text-main leading-none">{dates.checkOut?.getDate() || '--'}</h3>
                        <span className="text-base font-black text-text-main">{dates.checkOut?.toLocaleString('default', { month: 'short' }) || ''}</span>
                      </div>
                      <p className="text-[12px] font-bold text-gray-500 mt-1"> {dates.checkOut?.toLocaleString('default', { weekday: 'long' }) || 'Select Date'}</p>
                    </>
                  )}
                </div>

                {/* Travellers Selection */}
                <div 
                  className={`lg:col-span-2 p-6 md:p-8 cursor-pointer transition-all hover:bg-gray-50/50 border-r border-gray-100 last:border-0 min-h-[110px] flex flex-col justify-center rounded-r-2xl ${showGuests ? 'bg-primary/5' : ''}`}
                  ref={guestsRef}
                  onClick={() => { setShowGuests(!showGuests); setShowCalendar(false); setActiveDropdown(null); }}
                >
                  <p className="text-[12px] font-black text-gray-400 uppercase tracking-[0.15em] mb-1">Travellers</p>
                  <div className="flex items-baseline gap-1">
                    <h3 className="text-2xl font-black text-text-main leading-none">{guestData.adults + guestData.children}</h3>
                    <span className="text-sm font-black text-text-main ml-1">Guests</span>
                  </div>
                  <p className="text-[12px] font-bold text-gray-500 truncate mt-1">
                    {guestData.cabinClass}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Overlapping Absolute Search Button - MMT Signature Style */}
          <div className="absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2 z-[100]">
            <button 
              onClick={handleSearch}
              className="bg-gradient-to-r from-[#53b2fe] to-[#065af3] text-white px-16 py-4 rounded-full flex items-center justify-center font-black text-[18px] md:text-[24px] uppercase tracking-[0.1em] shadow-[0_10px_35px_rgba(6,90,243,0.4)] active:scale-95 hover:scale-105 transition-all group"
            >
              SEARCH
            </button>
          </div>
        </div>

        {/* ── Popups ───────────────────────────────────────── */}
        
        {/* City Selector Dropdown */}
        {activeDropdown && (
          <div 
            ref={dropdownRef}
            className={`absolute top-[98%] ${activeDropdown === 'from' ? 'left-0' : 'left-[10%]'} z-[1000] w-[500px] bg-white shadow-[0_30px_120px_rgba(0,0,0,0.45)] rounded-2xl overflow-hidden border border-gray-100 flex flex-col animate-fade-in`}
          >
             {/* Dropdown Search Bar */}
             <div className="p-5 border-b border-gray-100 flex items-center gap-3 bg-white sticky top-0 z-10">
                <input 
                  autoFocus
                  type="text" 
                  placeholder={activeDropdown === 'from' ? "From" : "To"}
                  className="flex-1 bg-transparent border-none outline-none text-base font-bold text-text-main placeholder:text-gray-300"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
             </div>
 
             {/* Dropdown Content */}
             <div className="max-h-[380px] overflow-y-auto scrollbar-hide py-5 px-6 space-y-8 bg-white">
                
                {(activeDropdown === 'to' || activeDropdown === 'from') && (
                  <>
                    {/* Visa-Free Section */}
                    <div>
                      <h4 className="text-[13px] font-black text-text-main mb-4 uppercase tracking-[0.1em]">Visa-Free/Visa-on-Arrival Destinations</h4>
                      <div className="grid grid-cols-3 gap-2">
                        {CITY_DATA.visaFree.map(city => (
                          <button 
                            key={city}
                            onClick={() => handleCitySelect({ city, code: city.substring(0,3).toUpperCase(), airport: `${city} International Airport` }, activeDropdown)}
                            className="px-2 py-3 rounded-xl border border-gray-100 text-[11px] font-black text-text-muted hover:border-primary hover:text-primary hover:bg-primary/5 transition-all text-center leading-tight shadow-sm"
                          >
                            {city}
                          </button>
                        ))}
                      </div>
                    </div>
    
                    {/* E-Visa Section */}
                    <div>
                      <h4 className="text-[13px] font-black text-text-main mb-4 uppercase tracking-[0.1em]">E-Visa Destinations</h4>
                      <div className="grid grid-cols-3 gap-2">
                        {CITY_DATA.eVisa.map(city => (
                          <button 
                            key={city}
                            onClick={() => handleCitySelect({ city, code: city.substring(0,3).toUpperCase(), airport: `${city} International Airport` }, activeDropdown)}
                            className="px-2 py-3 rounded-xl border border-gray-100 text-[11px] font-black text-text-muted hover:border-primary hover:text-primary hover:bg-primary/5 transition-all text-center leading-tight shadow-sm"
                          >
                            {city}
                          </button>
                        ))}
                      </div>
                    </div>
                  </>
                )}
 
                {/* Popular Searches List */}
                <div>
                   <h4 className="text-[13px] font-black text-text-main mb-4 uppercase tracking-[0.1em]">Popular Searches</h4>
                   <div className="space-y-1">
                      {CITY_DATA.popular.map((city, idx) => (
                        <div 
                          key={city.code}
                          onClick={() => handleCitySelect(city, activeDropdown)}
                          className="flex items-center gap-4 p-3 rounded-2xl cursor-pointer hover:bg-gray-50 group transition-all"
                        >
                           <div className="w-12 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-[12px] font-black text-text-muted group-hover:bg-primary/10 group-hover:text-primary transition-all shrink-0">
                              {city.code}
                           </div>
                           <div className="flex flex-col flex-1 min-w-0">
                              <span className="text-[14px] font-black text-text-main group-hover:text-primary transition-colors truncate">{city.name}</span>
                              <span className="text-[11px] font-medium text-text-light truncate">{city.airport}</span>
                           </div>
                           {city.hasEVisa && (
                             <span className="shrink-0 px-2 py-1 bg-blue-50 text-[9px] font-black text-blue-600 rounded uppercase tracking-wider">E-VISA</span>
                           )}
                        </div>
                      ))}
                   </div>
                </div>
             </div>
          </div>
        )}

        {showCalendar && (
          <div className="absolute top-[98%] left-[40%] -translate-x-1/2 z-[1010] animate-fade-in bg-white shadow-[0_30px_120px_rgba(0,0,0,0.45)] rounded-2xl overflow-hidden border border-gray-100 p-6 flex flex-col gap-5 min-w-[340px]">
            <div className="flex flex-col gap-1">
              <label className="text-[11px] font-black text-gray-500 uppercase tracking-widest">Departure Date</label>
              <input
                type="date"
                value={dates.checkIn ? dates.checkIn.toISOString().split('T')[0] : ''}
                min={new Date().toISOString().split('T')[0]}
                onChange={e => {
                  const d = e.target.value ? new Date(e.target.value) : null;
                  setDates(prev => ({ ...prev, checkIn: d }));
                }}
                className="border-2 border-gray-200 focus:border-primary rounded-xl px-4 py-2.5 text-sm font-black text-gray-900 outline-none cursor-pointer"
              />
            </div>
            {tripType === 'roundTrip' && (
              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-black text-gray-500 uppercase tracking-widest">Return Date</label>
                <input
                  type="date"
                  value={dates.checkOut ? dates.checkOut.toISOString().split('T')[0] : ''}
                  min={dates.checkIn ? dates.checkIn.toISOString().split('T')[0] : new Date().toISOString().split('T')[0]}
                  onChange={e => {
                    const d = e.target.value ? new Date(e.target.value) : null;
                    setDates(prev => ({ ...prev, checkOut: d }));
                    if (d) setShowCalendar(false);
                  }}
                  className="border-2 border-gray-200 focus:border-primary rounded-xl px-4 py-2.5 text-sm font-black text-gray-900 outline-none cursor-pointer"
                />
              </div>
            )}
            <button
              onClick={() => setShowCalendar(false)}
              className="w-full py-2.5 bg-primary text-white rounded-xl text-[12px] font-black uppercase tracking-widest hover:bg-primary/90 transition-all"
            >Done</button>
          </div>
        )}

        {showGuests && (
           <div className="absolute top-[98%] right-0 z-[1010] animate-fade-in shadow-[0_30px_120px_rgba(0,0,0,0.45)] rounded-2xl overflow-hidden border border-gray-100">
             {activeTab === 'Hotels' ? (
                <HotelGuestSelector 
                  guestData={guestData} 
                  onChange={setGuestData}
                  onClose={() => setShowGuests(false)}
                />
             ) : (
                <GuestClassSelector 
                  guestData={guestData} 
                  onChange={setGuestData}
                />
             )}
           </div>
        )}
      </div>
    </div>
  );
};

export default SearchForm;
