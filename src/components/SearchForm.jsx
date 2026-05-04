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
  Search,
  ChevronLeft,
  ChevronRight
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
    { code: "BOM", city: "Mumbai, India", airport: "Chhatrapati Shivaji International Airport" },
    { code: "DEL", city: "New Delhi, India", airport: "Indira Gandhi International Airport" },
    { code: "BKK", city: "Bangkok, Thailand", airport: "Suvarnabhumi Airport" },
    { code: "BLR", city: "Bengaluru, India", airport: "Bengaluru International Airport" },
    { code: "PNQ", city: "Pune, India", airport: "Pune Airport" },
    { code: "HYD", city: "Hyderabad, India", airport: "Rajiv Gandhi International Airport" },
    { code: "CCU", city: "Kolkata, India", airport: "Netaji Subhash Chandra Bose International Airport" },
    { code: "MAA", city: "Chennai, India", airport: "Chennai International Airport" },
    { code: "GOI", city: "Goa - Dabolim Airport, India", airport: "Goa Dabolim International Airport" },
    { code: "DXB", city: "Dubai, United Arab Emirates", airport: "Dubai International", hasEVisa: true }
  ]
};

const SearchForm = ({ initialTab = 'Flights', hideTabs = false }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(initialTab);
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const [dates, setDates] = useState({ checkIn: tomorrow, checkOut: null });
  const [showCalendar, setShowCalendar] = useState(false);
  const [calendarMode, setCalendarMode] = useState('checkIn'); // 'checkIn' | 'checkOut'
  const [showGuests, setShowGuests] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null); // 'from' | 'to' | null
  const [tripType, setTripType] = useState('oneWay');
  const [searchQuery, setSearchQuery] = useState('');
  const [swapRotation, setSwapRotation] = useState(0);
  const [hotelOption, setHotelOption] = useState('upto4'); // 'upto4' | 'group'
  const [busOption, setBusOption] = useState('booking'); // 'booking' | 'status' | 'track'
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
    { name: 'Bus', route: '/bus/results' },
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

  const renderBusSubHeader = () => (
    <div className="flex items-center gap-8 md:gap-12 mb-6 px-4 flex-wrap">
      {[
        { id: 'booking', label: 'Book Bus Tickets' },
        { id: 'status', label: 'Check Booking Status' },
        { id: 'track', label: 'Track My Bus' }
      ].map((opt) => (
        <label key={opt.id} className="flex items-center gap-3 cursor-pointer group">
          <div className="relative flex items-center justify-center">
            <input 
              type="radio" 
              name="busOption" 
              checked={busOption === opt.id}
              onChange={() => setBusOption(opt.id)}
              className="appearance-none w-6 h-6 rounded-full border border-gray-300 checked:bg-primary checked:border-primary transition-all cursor-pointer shadow-sm"
            />
            {busOption === opt.id && (
              <Check className="absolute text-white" size={14} strokeWidth={4} />
            )}
          </div>
          <span className={`text-[14px] md:text-[15px] font-black transition-colors relative pb-1 leading-none ${busOption === opt.id ? 'text-text-main border-b-2 border-primary' : 'text-gray-400 group-hover:text-text-main'}`}>
            {opt.label}
          </span>
        </label>
      ))}
    </div>
  );

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

  const renderBusLayout = () => (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 bg-white border border-gray-200 rounded-3xl overflow-hidden relative shadow-sm">
      {/* From City Selection */}
      <div 
        className={`lg:col-span-5 p-6 cursor-pointer transition-all hover:bg-gray-50/50 relative border-b lg:border-b-0 lg:border-r border-gray-100 min-h-[100px] flex flex-col justify-center ${activeDropdown === 'from' ? 'bg-primary/5' : ''}`}
        onClick={() => { setActiveDropdown('from'); setShowCalendar(false); setShowGuests(false); }}
      >
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] mb-1">From</p>
        <h3 className="text-xl md:text-2xl font-black text-slate-900 leading-none truncate tracking-tight">{searchData.from.city}</h3>
        <p className="text-[11px] font-bold text-slate-500 truncate mt-1">
          {searchData.from.city.split(',')[1]?.trim() || 'India'}
        </p>
      </div>

      {/* Swap Button - Repositioned for Mobile */}
      <div className="absolute left-1/2 lg:left-[41.66%] top-[100px] lg:top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
        <button 
          onClick={(e) => {
            e.stopPropagation();
            setSearchData({ from: searchData.to, to: searchData.from });
            setSwapRotation(prev => prev + 180);
          }}
          className="w-8 h-8 lg:w-10 lg:h-10 bg-white border border-gray-100 rounded-full shadow-premium flex items-center justify-center text-primary hover:text-white hover:bg-primary transition-all duration-500 hover:scale-110 active:scale-95"
          style={{ transform: `rotate(${swapRotation}deg)` }}
        >
          <ArrowLeftRight size={14} className="lg:hidden" strokeWidth={3} />
          <ArrowLeftRight size={16} className="hidden lg:block" strokeWidth={3} />
        </button>
      </div>

      {/* To City Selection */}
      <div 
        className={`lg:col-span-5 p-6 cursor-pointer transition-all hover:bg-gray-50/50 relative border-b lg:border-b-0 lg:border-r border-gray-100 min-h-[100px] flex flex-col justify-center ${activeDropdown === 'to' ? 'bg-primary/5' : ''}`}
        onClick={() => { setActiveDropdown('to'); setShowCalendar(false); setShowGuests(false); }}
      >
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] mb-1">To</p>
        <h3 className="text-xl md:text-2xl font-black text-slate-900 leading-none truncate tracking-tight">{searchData.to.city}</h3>
        <p className="text-[11px] font-bold text-slate-500 truncate mt-1">
          {searchData.to.city.split(',')[1]?.trim() || 'India'}
        </p>
      </div>

      {/* Travel Date Selection */}
      <div 
        className={`lg:col-span-2 p-6 cursor-pointer transition-all hover:bg-gray-50/50 min-h-[100px] flex flex-col justify-center ${showCalendar ? 'bg-primary/5' : ''}`}
        ref={departureRef}
        onClick={() => { setShowCalendar(!showCalendar); setActiveDropdown(null); setShowGuests(false); }}
      >
        <div className="flex items-center gap-1 mb-1">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em]">Travel Date</p>
          <ChevronDown size={14} className="text-primary" />
        </div>
        <div className="flex items-baseline gap-1">
          <h3 className="text-xl md:text-2xl font-black text-slate-900 leading-none">{dates.checkIn?.getDate()}</h3>
          <span className="text-sm font-black text-slate-900">{dates.checkIn?.toLocaleString('default', { month: 'short' })}'{dates.checkIn?.getFullYear().toString().substring(2)}</span>
        </div>
        <p className="text-[10px] font-bold text-slate-500 mt-1 uppercase">
          {dates.checkIn?.toLocaleString('default', { weekday: 'long' })}
        </p>
      </div>
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

  const isAnyOpen = activeDropdown || showCalendar || showGuests;

  return (
    <div className={`w-full max-w-[1200px] mx-auto relative ${isAnyOpen ? 'z-[1000]' : 'z-[50]'} font-sans`}>
      
      {/* MMT Style Backdrop Overlay - Placed BEHIND the form */}
      {isAnyOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/70 backdrop-blur-[4px] -z-10 animate-fade-in" 
          onClick={(e) => { e.stopPropagation(); setActiveDropdown(null); setShowCalendar(false); setShowGuests(false); }}
        />
      )}

      <div className={`bg-white rounded-[32px] shadow-[0_20px_80px_-20px_rgba(0,0,0,0.25)] relative border border-gray-100 animate-fade-in-up z-10 ${hideTabs ? 'pb-4' : ''}`}>
        
        {/* ── Tabs Bar ─────────────────────────────────────────── */}
        {!hideTabs && (
          <div className="flex px-4 md:px-8 border-b border-gray-100 overflow-x-auto hide-scrollbar">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.name;
              return (
                <button
                  key={tab.name}
                  onClick={() => setActiveTab(tab.name)}
                  className={`flex items-center gap-2 md:gap-3 px-4 md:px-6 py-4 text-[11px] md:text-[13px] font-black tracking-widest uppercase transition-all relative whitespace-nowrap
                    ${isActive ? 'text-primary' : 'text-gray-400 hover:text-text-main'}`}
                >
                  {tab.name === 'Flights' && <Plane size={16} />}
                  {tab.name === 'Bus' && <Bus size={16} />}
                  {tab.name === 'Train' && <Train size={16} />}
                  {tab.name === 'Hotels' && <Hotel size={16} />}
                  {tab.name}
                  {isActive && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary rounded-t-full shadow-[0_-2px_10px_rgba(124,58,237,0.3)]" />
                  )}
                </button>
              );
            })}
          </div>
        )}

        {/* ── Main Search Form ────────────────────────────────── */}
        <div className={activeTab === 'Hotels' ? 'p-2 md:p-4' : 'p-2 md:p-6'}>
          {/* Layout Switcher */}
          {activeTab === 'Hotels' ? (
            <>
              {renderHotelSubHeader()}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 bg-white border border-gray-200 rounded-3xl overflow-hidden relative shadow-sm">
                {/* Hotel Location Box */}
                <div 
                  className="lg:col-span-4 p-6 cursor-pointer transition-all hover:bg-gray-50/50 relative border-b lg:border-b-0 lg:border-r border-gray-100 min-h-[100px] flex flex-col justify-center"
                  onClick={() => { setActiveDropdown('from'); setShowCalendar(false); setShowGuests(false); }}
                >
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] mb-1">City / Hotel / Area</p>
                  <h3 className="text-xl md:text-2xl font-black text-slate-900 leading-none truncate">{searchData.from.city}</h3>
                  <p className="text-[11px] font-bold text-slate-500 truncate mt-1">
                    {searchData.from.airport.split(',').pop().trim() || 'India'}
                  </p>
                </div>

                <div 
                  className={`lg:col-span-2 p-6 cursor-pointer transition-all hover:bg-gray-50/50 border-b lg:border-b-0 lg:border-r border-gray-100 min-h-[100px] flex flex-col justify-center ${showCalendar && calendarMode === 'checkIn' ? 'bg-primary/5' : ''}`}
                  onClick={() => { setShowCalendar(true); setCalendarMode('checkIn'); setActiveDropdown(null); setShowGuests(false); }}
                >
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] mb-1">Check-In</p>
                  <div className="flex items-baseline gap-1">
                    <h3 className="text-xl md:text-2xl font-black text-slate-900 leading-none">{dates.checkIn?.getDate()}</h3>
                    <span className="text-sm font-black text-slate-900">{dates.checkIn?.toLocaleString('default', { month: 'short' })}'{dates.checkIn?.getFullYear().toString().substring(2)}</span>
                  </div>
                  <p className="text-[10px] font-bold text-slate-500 mt-1 uppercase">
                    {dates.checkIn?.toLocaleString('default', { weekday: 'long' })}
                  </p>
                </div>

                <div 
                  className={`lg:col-span-2 p-6 cursor-pointer transition-all hover:bg-gray-50/50 border-b lg:border-b-0 lg:border-r border-gray-100 min-h-[100px] flex flex-col justify-center ${showCalendar && calendarMode === 'checkOut' ? 'bg-primary/5' : ''}`}
                  onClick={() => { setShowCalendar(true); setCalendarMode('checkOut'); setActiveDropdown(null); setShowGuests(false); }}
                >
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] mb-1">Check-Out</p>
                  <div className="flex items-baseline gap-1">
                    <h3 className="text-xl md:text-2xl font-black text-slate-900 leading-none">{dates.checkOut?.getDate() || (new Date(dates.checkIn.getTime() + 86400000)).getDate()}</h3>
                    <span className="text-sm font-black text-slate-900">{dates.checkOut?.toLocaleString('default', { month: 'short' }) || (new Date(dates.checkIn.getTime() + 86400000)).toLocaleString('default', { month: 'short' })}'{dates.checkIn?.getFullYear().toString().substring(2)}</span>
                  </div>
                  <p className="text-[10px] font-bold text-slate-500 mt-1 uppercase">
                    {dates.checkOut?.toLocaleString('default', { weekday: 'long' }) || (new Date(dates.checkIn.getTime() + 86400000)).toLocaleString('default', { weekday: 'long' })}
                  </p>
                </div>

                {/* Rooms & Guests */}
                <div 
                  className={`lg:col-span-4 p-6 cursor-pointer transition-all hover:bg-gray-50/50 min-h-[100px] flex flex-col justify-center ${showGuests ? 'bg-primary/5' : ''}`}
                  onClick={() => { setShowGuests(!showGuests); setShowCalendar(false); setActiveDropdown(null); }}
                >
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] mb-1">Rooms & Guests</p>
                  <div className="flex items-baseline gap-1">
                    <h3 className="text-xl md:text-2xl font-black text-slate-900 leading-none">
                      {guestData.rooms} <span className="text-xs text-slate-400 uppercase">Rooms</span> {guestData.adults} <span className="text-xs text-slate-400 uppercase">Adults</span>
                    </h3>
                  </div>
                  <p className="text-[10px] font-bold text-slate-500 mt-1 truncate">
                    {guestData.children > 0 ? `${guestData.children} Children` : 'Click to select guests'}
                  </p>
                </div>
              </div>
            </>
          ) : activeTab === 'Bus' ? (
            <>
              {renderBusSubHeader()}
              {renderBusLayout()}
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
                          if (type.id === 'roundTrip') {
                            setShowCalendar(true);
                            setCalendarMode('checkOut');
                          }
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

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 bg-white border border-gray-200 rounded-3xl overflow-hidden relative shadow-sm">
                
                {/* From City Selection */}
                <div 
                  className={`lg:col-span-3 p-6 cursor-pointer transition-all hover:bg-gray-50/50 relative border-b lg:border-b-0 lg:border-r border-gray-100 min-h-[100px] flex flex-col justify-center ${activeDropdown === 'from' ? 'bg-primary/5' : ''}`}
                  onClick={() => { setActiveDropdown('from'); setShowCalendar(false); setShowGuests(false); }}
                >
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] mb-1">From</p>
                  <h3 className="text-xl md:text-2xl font-black text-slate-900 leading-none truncate tracking-tight">{searchData.from.city}</h3>
                  <p className="text-[11px] font-bold text-slate-500 truncate mt-1">
                    {searchData.from.code}, {searchData.from.airport.split(',')[0]}
                  </p>
                </div>

                {/* Swap Button - Repositioned for Mobile */}
                <div className="absolute left-1/2 lg:left-1/4 top-[100px] lg:top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setSearchData({ from: searchData.to, to: searchData.from });
                      setSwapRotation(prev => prev + 180);
                    }}
                    className="w-8 h-8 lg:w-10 lg:h-10 bg-white border border-gray-100 rounded-full shadow-premium flex items-center justify-center text-primary hover:text-white hover:bg-primary transition-all duration-500 hover:scale-110 active:scale-95"
                    style={{ transform: `rotate(${swapRotation}deg)` }}
                  >
                    <ArrowLeftRight size={14} className="lg:hidden" strokeWidth={3} />
                    <ArrowLeftRight size={16} className="hidden lg:block" strokeWidth={3} />
                  </button>
                </div>

                {/* To City Selection */}
                <div 
                  className={`lg:col-span-3 p-6 cursor-pointer transition-all hover:bg-gray-50/50 relative border-b lg:border-b-0 lg:border-r border-gray-100 min-h-[100px] flex flex-col justify-center ${activeDropdown === 'to' ? 'bg-primary/5' : ''}`}
                  onClick={() => { setActiveDropdown('to'); setShowCalendar(false); setShowGuests(false); }}
                >
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] mb-1">To</p>
                  <h3 className="text-xl md:text-2xl font-black text-slate-900 leading-none truncate tracking-tight">{searchData.to.city}</h3>
                  <p className="text-[11px] font-bold text-slate-500 truncate mt-1">
                    {searchData.to.code}, {searchData.to.airport.split(',')[0]}
                  </p>
                </div>

                <div 
                  className={`lg:col-span-2 p-6 cursor-pointer transition-all hover:bg-gray-50/50 border-b lg:border-b-0 lg:border-r border-gray-100 min-h-[100px] flex flex-col justify-center ${showCalendar && calendarMode === 'checkIn' ? 'bg-primary/5' : ''}`}
                  ref={departureRef}
                  onClick={() => { setShowCalendar(true); setCalendarMode('checkIn'); setActiveDropdown(null); setShowGuests(false); }}
                >
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] mb-1">Departure</p>
                  <div className="flex items-baseline gap-1">
                    <h3 className="text-xl md:text-2xl font-black text-slate-900 leading-none">{dates.checkIn?.getDate()}</h3>
                    <span className="text-sm font-black text-slate-900">{dates.checkIn?.toLocaleString('default', { month: 'short' })}'{dates.checkIn?.getFullYear().toString().substring(2)}</span>
                  </div>
                  <p className="text-[10px] font-bold text-slate-500 mt-1 uppercase">
                    {dates.checkIn?.toLocaleString('default', { weekday: 'long' })}
                  </p>
                </div>

                <div 
                  className={`lg:col-span-2 p-6 transition-all hover:bg-gray-50/50 border-b lg:border-b-0 lg:border-r border-gray-100 last:border-0 cursor-pointer min-h-[100px] flex flex-col justify-center ${tripType === 'oneWay' ? 'bg-slate-50/30' : (showCalendar && calendarMode === 'checkOut' ? 'bg-primary/5' : '')}`}
                  onClick={() => { setTripType('roundTrip'); setShowCalendar(true); setCalendarMode('checkOut'); setActiveDropdown(null); setShowGuests(false); }}
                >
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] mb-1">Return</p>
                  {tripType === 'oneWay' ? (
                    <p className="text-[11px] font-bold text-slate-300 mt-1 leading-tight flex items-center gap-2">
                       <Calendar size={12} /> Add Date
                    </p>
                  ) : (
                    <>
                      <div className="flex items-baseline gap-1">
                        <h3 className="text-xl md:text-2xl font-black text-slate-900 leading-none">{dates.checkOut?.getDate() || '--'}</h3>
                        <span className="text-sm font-black text-slate-900">{dates.checkOut?.toLocaleString('default', { month: 'short' }) || ''}</span>
                      </div>
                      <p className="text-[10px] font-bold text-slate-500 mt-1"> {dates.checkOut?.toLocaleString('default', { weekday: 'long' }) || 'Select Return'}</p>
                    </>
                  )}
                </div>

                {/* Travellers Selection */}
                <div 
                  className={`lg:col-span-2 p-6 cursor-pointer transition-all hover:bg-gray-50/50 min-h-[100px] flex flex-col justify-center ${showGuests ? 'bg-primary/5' : ''}`}
                  ref={guestsRef}
                  onClick={() => { setShowGuests(!showGuests); setShowCalendar(false); setActiveDropdown(null); }}
                >
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] mb-1">Travellers</p>
                  <div className="flex items-baseline gap-1">
                    <h3 className="text-xl md:text-2xl font-black text-slate-900 leading-none">{guestData.adults + guestData.children}</h3>
                    <span className="text-sm font-black text-slate-900 ml-1">Guests</span>
                  </div>
                  <p className="text-[10px] font-bold text-slate-500 truncate mt-1">
                    {guestData.cabinClass}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Overlapping Absolute Search Button - MMT Signature Style */}
          <div className="absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2 z-[100] w-full px-4 flex justify-center">
            <button 
              onClick={handleSearch}
              className="bg-gradient-to-r from-primary to-[#065af3] text-white px-8 md:px-20 py-4.5 rounded-full flex items-center justify-center font-black text-base md:text-xl uppercase tracking-[0.1em] shadow-[0_10px_40px_rgba(6,90,243,0.35)] active:scale-95 hover:scale-105 transition-all group max-w-xs md:max-w-none w-full md:w-auto"
            >
              SEARCH
            </button>
          </div>
        </div>

        {/* ── Popups ───────────────────────────────────────── */}
        
        {/* City Selector Modal */}
        {activeDropdown && (
          <div 
            ref={dropdownRef}
            className="fixed top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-[2000] w-[90%] max-w-[650px] h-[85vh] max-h-[600px] bg-white shadow-[0_20px_70px_rgba(0,0,0,0.4)] rounded-[24px] overflow-hidden flex flex-col animate-fade-in-up"
          >
             {/* Header */}
             <div className="p-5 md:p-6 border-b border-gray-100 flex items-center justify-between bg-white sticky top-0 z-20">
                <h3 className="font-black text-slate-900 text-lg md:text-xl tracking-tight">
                   Select {activeDropdown === 'from' ? 'Origin' : 'Destination'} City
                </h3>
                <button onClick={() => setActiveDropdown(null)} className="p-2 hover:bg-slate-100 text-slate-500 rounded-full transition-colors">
                  <X size={20} />
                </button>
             </div>

             {/* Search Bar */}
             <div className="p-5 md:p-6 pb-2 bg-white sticky top-[72px] md:top-[80px] z-10">
                <div className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 focus-within:border-primary focus-within:bg-white transition-all shadow-inner">
                  <Search size={20} className="text-slate-400" />
                  <input 
                    autoFocus
                    type="text" 
                    placeholder="Search by city or airport..."
                    className="flex-1 bg-transparent border-none outline-none text-base font-bold text-slate-900 placeholder:text-gray-400 placeholder:font-medium"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
             </div>
  
             <div className="flex-1 overflow-y-auto py-4 px-5 md:px-6 space-y-6 bg-white overflow-x-hidden">
                {searchQuery.trim().length > 0 && (
                   <div 
                        onClick={() => handleCitySelect({ city: searchQuery.trim(), code: searchQuery.trim().substring(0,3).toUpperCase(), airport: 'Search Result' }, activeDropdown)}
                        className="flex items-center gap-4 p-4 rounded-2xl cursor-pointer bg-primary/5 border border-primary/20 group"
                      >
                         <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white shrink-0">
                            <Search size={18} />
                         </div>
                         <div className="flex flex-col flex-1 min-w-0">
                            <span className="text-[14px] font-black text-slate-900 group-hover:text-primary transition-colors truncate">Select "{searchQuery}"</span>
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Custom Location</span>
                         </div>
                      </div>
                )}

                {/* Popular Searches */}
                <div>
                   <h4 className="text-[10px] font-black text-slate-400 mb-4 uppercase tracking-[0.2em] px-1">Top Recommendations</h4>
                   <div className="space-y-1">
                      {CITY_DATA.popular.filter(c => c.city.toLowerCase().includes(searchQuery.toLowerCase()) || c.code.toLowerCase().includes(searchQuery.toLowerCase())).map((city) => (
                        <div 
                          key={city.code}
                          onClick={() => handleCitySelect(city, activeDropdown)}
                          className="flex items-center gap-4 p-3 rounded-2xl cursor-pointer hover:bg-slate-50 group border border-transparent hover:border-slate-100"
                        >
                           <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-[12px] font-black text-slate-900 group-hover:bg-primary group-hover:text-white transition-all shrink-0">
                              {city.code}
                           </div>
                           <div className="flex-1 min-w-0">
                              <p className="text-[14px] font-black text-slate-900 truncate">{city.city}</p>
                              <p className="text-[10px] font-bold text-slate-400 truncate uppercase tracking-widest">{city.airport}</p>
                           </div>
                        </div>
                      ))}
                   </div>
                </div>
             </div>
          </div>
        )}

        {showCalendar && (
          <div className="fixed top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-[2000] flex flex-col w-[95%] max-w-[850px] h-[85vh] max-h-[650px] bg-white shadow-[0_20px_70px_rgba(0,0,0,0.4)] rounded-[24px] overflow-hidden animate-fade-in-up">
             <div className="p-5 md:p-6 border-b border-gray-100 flex items-center justify-between bg-white sticky top-0 z-20">
                <h3 className="font-black text-slate-900 text-lg md:text-xl tracking-tight">Select Dates</h3>
                <button onClick={() => setShowCalendar(false)} className="p-2 hover:bg-slate-100 text-slate-500 rounded-full transition-colors"><X size={20} /></button>
             </div>
             
             {/* Date Type Tabs */}
             {(tripType === 'roundTrip' || activeTab === 'Hotels') && (
               <div className="flex bg-gray-50 p-2 border-b border-gray-100">
                 <div 
                   onClick={() => setCalendarMode('checkIn')}
                   className={`flex-1 py-3 text-center cursor-pointer font-black text-sm uppercase tracking-widest rounded-xl transition-all ${calendarMode === 'checkIn' ? 'bg-white text-primary shadow-sm' : 'text-slate-500 hover:bg-white/50'}`}
                 >
                   {activeTab === 'Hotels' ? 'Check-In' : 'Departure'}
                 </div>
                 <div 
                   onClick={() => setCalendarMode('checkOut')}
                   className={`flex-1 py-3 text-center cursor-pointer font-black text-sm uppercase tracking-widest rounded-xl transition-all ${calendarMode === 'checkOut' ? 'bg-white text-primary shadow-sm' : 'text-slate-500 hover:bg-white/50'}`}
                 >
                   {activeTab === 'Hotels' ? 'Check-Out' : 'Return'}
                 </div>
               </div>
             )}

             <div className="flex-1 overflow-y-auto p-5 md:p-6 bg-white custom-scrollbar">
                <CustomCalendarView 
                   selectedDate={calendarMode === 'checkIn' ? dates.checkIn : dates.checkOut}
                   minDate={calendarMode === 'checkOut' && dates.checkIn ? dates.checkIn : new Date(new Date().setHours(0,0,0,0))}
                   onSelect={(date) => {
                      if (calendarMode === 'checkIn') {
                         setDates(prev => ({ ...prev, checkIn: date }));
                         if (tripType === 'roundTrip' || activeTab === 'Hotels') {
                           setCalendarMode('checkOut');
                         } else {
                           setShowCalendar(false);
                         }
                      } else {
                         setDates(prev => ({ ...prev, checkOut: date }));
                         setShowCalendar(false);
                      }
                   }}
                />
             </div>
          </div>
        )}

        {showGuests && (
           <div className="fixed top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-[2000] flex flex-col w-[95%] max-w-[750px]">
             <div className="bg-white shadow-[0_20px_70px_rgba(0,0,0,0.4)] rounded-3xl overflow-hidden w-full relative z-10 animate-fade-in-up">
                <div className="p-6 md:p-8 border-b border-gray-100 flex items-center justify-between">
                    <h3 className="font-black text-slate-900 text-xl tracking-tight">Passengers</h3>
                    <button onClick={() => setShowGuests(false)} className="p-2 hover:bg-slate-100 text-slate-500 rounded-full transition-colors"><X size={20} /></button>
                </div>
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
                      onClose={() => setShowGuests(false)}
                    />
                )}
             </div>
           </div>
        )}
      </div>
    </div>
  );
};

const getPriceForDate = (year, month, date) => {
  const d = new Date(year, month, date);
  const day = d.getDay();
  // Weekends are more expensive
  const base = (day === 0 || day === 6) ? 8000 : 6500;
  // Deterministic random modifier based on date:
  const seed = year * 10000 + month * 100 + date;
  const rand = (seed * 9301 + 49297) % 233280;
  const mod = rand / 233280;
  
  const price = base + Math.floor(mod * 2000);
  return price.toLocaleString('en-IN');
};

const CustomCalendarView = ({ selectedDate, minDate, onSelect }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const handlePrevMonth = () => {
    if (currentMonth === 0) { setCurrentMonth(11); setCurrentYear(y => y - 1); }
    else { setCurrentMonth(m => m - 1); }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) { setCurrentMonth(0); setCurrentYear(y => y + 1); }
    else { setCurrentMonth(m => m + 1); }
  };

  const renderMonth = (year, month, isLeft) => {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const days = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

    return (
      <div className="flex-1">
        <div className="flex items-center justify-center relative mb-6">
           {isLeft && (
             <button onClick={handlePrevMonth} className="absolute left-0 p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-600"><ChevronLeft size={20} /></button>
           )}
           <h4 className="font-black text-slate-900 text-lg md:text-xl">{monthNames[month]} {year}</h4>
           {!isLeft && (
             <button onClick={handleNextMonth} className="absolute right-0 p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-600"><ChevronRight size={20} /></button>
           )}
        </div>
        <div className="grid grid-cols-7 gap-1 md:gap-2 mb-2">
          {days.map(d => <div key={d} className="text-center text-[10px] font-black text-slate-400 uppercase tracking-widest">{d}</div>)}
        </div>
        <div className="grid grid-cols-7 gap-y-2 gap-x-1 md:gap-x-2">
          {Array.from({ length: firstDayOfMonth }).map((_, i) => <div key={`empty-${i}`} />)}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const dateNum = i + 1;
            const dateObj = new Date(year, month, dateNum);
            
            let isSelected = false;
            if (selectedDate) {
               isSelected = dateObj.getFullYear() === selectedDate.getFullYear() && 
                            dateObj.getMonth() === selectedDate.getMonth() && 
                            dateObj.getDate() === selectedDate.getDate();
            }
            
            let isPast = false;
            if (minDate) {
               const minD = new Date(minDate);
               minD.setHours(0,0,0,0);
               isPast = dateObj < minD;
            } else {
               isPast = dateObj < new Date(new Date().setHours(0,0,0,0));
            }

            const priceStr = getPriceForDate(year, month, dateNum);
            const priceVal = parseInt(priceStr.replace(',', ''));
            const isCheap = priceVal < 7000;
            
            return (
              <button
                key={dateNum}
                disabled={isPast}
                onClick={() => onSelect(dateObj)}
                className={`flex flex-col items-center justify-center py-2 px-1 rounded-xl transition-all border-2
                  ${isSelected 
                    ? 'bg-[#008cff] text-white border-[#008cff] shadow-md scale-105' 
                    : isPast 
                      ? 'text-gray-300 border-transparent cursor-not-allowed opacity-50' 
                      : 'text-slate-800 border-transparent hover:border-slate-200 hover:bg-slate-50'}`}
              >
                <span className="text-sm md:text-base font-black">{dateNum}</span>
                {!isPast && (
                  <span className={`text-[9px] md:text-[10px] font-bold mt-0.5 ${isSelected ? 'text-white/90' : isCheap ? 'text-green-600' : 'text-slate-500'}`}>
                    ₹{priceStr}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  const rightMonth = currentMonth === 11 ? 0 : currentMonth + 1;
  const rightYear = currentMonth === 11 ? currentYear + 1 : currentYear;

  return (
    <div className="flex flex-col md:flex-row gap-8 md:gap-12">
       {renderMonth(currentYear, currentMonth, true)}
       {/* On small screens, hide the second month or show it below. With flex-col it will show below. */}
       <div className="hidden md:block w-px bg-gray-100"></div>
       {renderMonth(rightYear, rightMonth, false)}
    </div>
  );
};

export default SearchForm;
