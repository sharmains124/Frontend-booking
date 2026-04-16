import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TrainPopularRoutes from './component/TrainPopularRoutes';
import {
  Train, MapPin, Calendar, Users, ArrowRight, ArrowLeftRight,
  ShieldCheck, Clock, Star, Zap, TrendingDown, Globe,
  ChevronDown, X
} from 'lucide-react';

const POPULAR_STATIONS = [
  { code: 'NDLS', name: 'New Delhi', full: 'New Delhi Railway Station' },
  { code: 'CSTM', name: 'Mumbai CST', full: 'Chhatrapati Shivaji Terminus' },
  { code: 'MAS', name: 'Chennai Central', full: 'Chennai Central Station' },
  { code: 'HWH', name: 'Howrah', full: 'Howrah Junction, Kolkata' },
  { code: 'BCT', name: 'Mumbai Central', full: 'Mumbai Central Station' },
  { code: 'SBC', name: 'Bengaluru', full: 'KSR Bengaluru City Junction' },
  { code: 'SC', name: 'Secunderabad', full: 'Secunderabad Junction' },
  { code: 'JP', name: 'Jaipur', full: 'Jaipur Junction' },
  { code: 'ADI', name: 'Ahmedabad', full: 'Ahmedabad Junction' },
  { code: 'LKO', name: 'Lucknow', full: 'Lucknow Charbagh' },
];

const TRAIN_CLASSES = ['Sleeper (SL)', 'AC 3 Tier (3A)', 'AC 2 Tier (2A)', 'AC First Class (1A)', 'Chair Car (CC)'];

const POPULAR_ROUTES = [
  { from: 'Delhi', to: 'Mumbai', duration: '16h', trains: 48, price: '₹1,850' },
  { from: 'Delhi', to: 'Kolkata', duration: '17h', trains: 36, price: '₹2,100' },
  { from: 'Mumbai', to: 'Goa', duration: '12h', trains: 22, price: '₹1,200' },
  { from: 'Delhi', to: 'Jaipur', duration: '6h', trains: 55, price: '₹650' },
  { from: 'Bangalore', to: 'Chennai', duration: '5h', trains: 30, price: '₹550' },
  { from: 'Mumbai', to: 'Ahmedabad', duration: '7h', trains: 40, price: '₹750' },
];

const TrainLandingPage = () => {

const TRAIN_OFFERS = [
  {
    title: "Grab Up to 40% OFF* on",
    sub: "Packages, Flights, Stays, Buses, Cabs, Trains & More",
    img: 'https://promos.makemytrip.com/appfest/2x//Desktop-SummerSale-Common-02Apr.jpg?im=Resize=(134,134)',
    code: null,
    btnText: 'BOOK NOW'
  },
  {
    title: "For Your Next Trip:",
    sub: "FLAT ₹20 OFF* on Train Bookings.",
    img: 'https://promos.makemytrip.com/appfest/2x//116X116-bhim-16022026.jpg?im=Resize=(134,134)',
    code: 'MMTBHIM',
    btnText: 'VIEW DETAILS'
  },
  {
    title: "For Your Char Dham Journey: Up to 40% OFF*",
    sub: "on stays, packages, buses, cabs, trains & flights.",
    img: 'https://promos.makemytrip.com/appfest/2x//Desktop-CharDham-1Apr.jpg?im=Resize=(134,134)',
    code: null,
    btnText: 'BOOK NOW'
  },
  {
    title: "For You: Up to ₹40 OFF*",
    sub: "on Train Bookings.",
    img: 'https://promos.makemytrip.com/appfest/2x//116X116-onecard-10022026.jpg?im=Resize=(134,134)',
    code: null,
    btnText: 'BOOK NOW'
  },
  {
    title: "Get ₹100 Extra Refund",
    sub: "with Free Cancellation on Train Tickets.",
    img: 'https://promos.makemytrip.com/notification/xhdpi//116x116-trip-gurantee-08072021.jpg?im=Resize=(134,134)',
    code: null,
    btnText: 'BOOK NOW'
  },
  {
    title: "Aadhaar Auth Required For IRCTC Profile:",
    sub: "Now required by IRCTC to book out...",
    img: 'https://promos.makemytrip.com/images//Desktop-AdharLinking-27Jun.jpg?im=Resize=(134,134)',
    code: null,
    btnText: 'KNOW MORE'
  },
];

const TrainOffersSlider = () => {
  const ITEMS_PER_PAGE = 4;
  const totalPages = Math.ceil(TRAIN_OFFERS.length / ITEMS_PER_PAGE);
  const [offerPage, setOfferPage] = useState(0);
  const visible = TRAIN_OFFERS.slice(offerPage * ITEMS_PER_PAGE, offerPage * ITEMS_PER_PAGE + ITEMS_PER_PAGE);
  
  return (
    <section className="bg-white py-8 pb-12 border-b border-gray-100">
      <div className="max-w-[1240px] mx-auto px-6">
        <div className="flex items-center gap-6 w-full pb-3 mb-6 relative">
          <h1 className="text-[28px] font-black text-gray-900 mr-4">Offers</h1>
          <h2 className="text-[15px] font-bold text-blue-600 border-b-[3px] border-blue-600 pb-[10px] -mb-[13px] px-2 cursor-pointer">Trains</h2>
          {['All Offers','Hotels','Flights','Holidays','Bus','Cabs'].map(t => (
            <button key={t} className="text-[14px] font-bold text-gray-500 hover:text-blue-600 transition-colors pb-[10px] -mb-[13px] px-2">{t}</button>
          ))}
          <div className="ml-auto flex items-center gap-4 shrink-0 border-b border-gray-200 absolute bottom-0 left-[110px] right-0 z-[-1]"></div>
          
          <div className="ml-auto flex items-center gap-3 shrink-0 relative top-1">
            <button className="text-[14px] font-black text-blue-600 hover:underline mr-2">VIEW ALL →</button>
            <div className="flex gap-1.5">
              <button 
                onClick={() => setOfferPage(p => Math.max(0, p-1))} 
                disabled={offerPage === 0}
                className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all ${offerPage === 0 ? 'border-gray-200 text-gray-300 cursor-not-allowed' : 'border-gray-300 text-blue-600 hover:shadow-md'}`}>
                <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/></svg>
              </button>
              <button 
                onClick={() => setOfferPage(p => Math.min(totalPages-1, p+1))} 
                disabled={offerPage === totalPages-1}
                className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all ${offerPage === totalPages-1 ? 'border-gray-200 text-gray-300 cursor-not-allowed' : 'border-gray-300 text-blue-600 hover:shadow-md'}`}>
                <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-6 gap-y-4">
          {visible.map((offer, idx) => (
            <div key={`${offerPage}-${idx}`} className="bg-white rounded-[12px] border border-gray-200 shadow-sm hover:shadow-md transition-shadow flex h-[160px] overflow-hidden group cursor-pointer">
              {/* Left Image Area */}
              <div className="w-[160px] shrink-0 p-4">
                <div className="w-full h-full rounded-lg overflow-hidden flex items-center justify-center">
                  <img src={offer.img} alt={offer.title} referrerPolicy="no-referrer"
                    className="w-[124px] h-[124px] object-cover group-hover:scale-105 transition-transform duration-500 rounded-lg shadow-sm"
                    onError={e => { e.target.onerror=null; e.target.style.display='none'; e.target.parentElement.classList.add('bg-gray-100'); }} 
                  />
                </div>
              </div>
              
              {/* Right Content Area */}
              <div className="flex-1 p-4 pl-0 flex flex-col justify-between py-5 pr-5">
                <div>
                  <div className="text-[10px] text-gray-500 font-bold text-right mb-1 tracking-wider uppercase">T&C's Apply</div>
                  <h3 className="text-[16px] font-black text-gray-900 leading-snug">{offer.title}</h3>
                  <div className="w-8 h-[2px] bg-red-500 my-2.5"></div>
                  <p className="text-[13px] text-gray-600 font-medium leading-relaxed">{offer.sub}</p>
                </div>
                
                <div className="mt-2 flex items-center justify-between">
                  {offer.code ? (
                    <div className="text-[12px] font-medium text-gray-500">Code: <span className="font-bold text-gray-800">{offer.code}</span></div>
                  ) : <div />}
                  <button className="text-blue-600 text-[13px] font-black uppercase tracking-wide group-hover:underline">{offer.btnText}</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};


  const navigate = useNavigate();
  const [from, setFrom] = useState({ code: 'NDLS', name: 'New Delhi', full: 'New Delhi Railway Station' });
  const [to, setTo] = useState({ code: 'CSTM', name: 'Mumbai CST', full: 'Chhatrapati Shivaji Terminus' });
  const [date, setDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  });
  const [travelClass, setTravelClass] = useState('Sleeper (SL)');
  const [passengers, setPassengers] = useState(1);
  const [activeDropdown, setActiveDropdown] = useState(null); // 'from' | 'to' | 'class' | null
  const [query, setQuery] = useState('');
  const [swapAngle, setSwapAngle] = useState(0);
  const [searchTab, setSearchTab] = useState('booking'); // 'booking' | 'pnr' | 'status'

  const filtered = POPULAR_STATIONS.filter(s =>
    s.name.toLowerCase().includes(query.toLowerCase()) ||
    s.code.toLowerCase().includes(query.toLowerCase())
  );

  const handleSwap = () => {
    setSwapAngle(a => a + 180);
    setFrom(to);
    setTo(from);
  };

  const handleSearch = () => {
    navigate(`/trains/results?from=${from.code}&to=${to.code}&date=${date}&class=${travelClass}&passengers=${passengers}`);
  };

  return (
    <div className="bg-bg-alt min-h-screen font-sans antialiased text-text-main overflow-x-hidden">
      {/* ─── Hero Section ───────────────────────────────────────────── */}
      <section className="relative min-h-[700px] flex items-center justify-center bg-slate-950 pt-[80px]">
        {/* Video + Overlay Background */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          {/* Real train video */}
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover scale-105 transition-transform duration-1000"
            style={{ filter: 'brightness(0.6) saturate(1.1)' }}
          >
            <source src="/assets/train.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          {/* Emerald/Teal cinematic colour grade overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/50 via-teal-950/30 to-cyan-950/50" />
          {/* Bottom dark vignette so search card reads cleanly */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
          {/* Left vignette */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />

          {/* Grid-line texture */}
          <div className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 60px, rgba(255,255,255,0.04) 60px, rgba(255,255,255,0.04) 61px), repeating-linear-gradient(90deg, transparent, transparent 60px, rgba(255,255,255,0.04) 60px, rgba(255,255,255,0.04) 61px)'
            }}
          />

          {/* Glowing colour orbs */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-400/15 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-400/15 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1.5s' }} />
        </div>

        <div className="container-custom relative z-10 w-full text-center px-4">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-emerald-500/20 border border-emerald-500/30 rounded-full px-5 py-2 mb-6 backdrop-blur-sm">
            <Train size={14} className="text-emerald-400" />
            <span className="text-emerald-300 text-[11px] font-black uppercase tracking-[0.3em]">India's Premium Train Booking</span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-[70px] font-black text-white leading-tight tracking-tight mb-4 drop-shadow-2xl animate-fade-in-up">
            Journey <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 decoration-[#008cff]/80 decoration-8 underline underline-offset-[12px]">Across</span> <span className="text-white/90 italic font-serif ml-2">India's Rails</span>
          </h1>

          <p className="text-base md:text-lg text-white/70 max-w-2xl mx-auto font-medium mb-10">
            Book 12,000+ trains instantly. Tatkal, Express, Superfast — all at the best fares.
          </p>

          {/* ─── Search Form Card ─────────────────────────────────────── */}
          <div className="max-w-[1240px] mx-auto relative z-20 mt-8 mb-10" onClick={() => setActiveDropdown(null)}>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 pt-6 px-6 pb-10 relative w-full"
              onClick={e => e.stopPropagation()}>

              {/* ─── Top Radio Buttons Row ────────────────────────── */}
              <div className="flex flex-col md:flex-row items-center justify-between mb-4">
                <div className="flex items-center gap-6">
                  {[
                    { id: 'booking', label: 'Book Train Tickets' },
                    { id: 'pnr', label: 'Check PNR Status' },
                    { id: 'status', label: 'Live Train Status' },
                  ].map((tab) => (
                    <label key={tab.id} className="flex items-center gap-2 cursor-pointer group">
                      <div className="relative flex items-center justify-center w-4 h-4">
                        <input
                          type="radio"
                          name="trainTab"
                          checked={searchTab === tab.id}
                          onChange={() => setSearchTab(tab.id)}
                          className="appearance-none w-4 h-4 rounded-full border border-gray-400 checked:border-blue-500 checked:bg-blue-500 transition-all cursor-pointer"
                        />
                        {searchTab === tab.id && <svg className="absolute w-[10px] h-[10px] text-white pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>}
                      </div>
                      <span className={`text-[14px] font-bold transition-colors ${searchTab === tab.id ? 'text-gray-900' : 'text-gray-500 group-hover:text-gray-900'}`}>
                        {tab.label}
                      </span>
                    </label>
                  ))}
                </div>

                <div className="flex flex-col text-right hidden md:flex">
                  <span className="text-[13px] font-black text-gray-800 leading-tight">Train Ticket Booking</span>
                  <span className="text-[11px] text-gray-500 font-medium">IRCTC Authorized e-ticketing</span>
                </div>
              </div>

              {/* ─── Fields Border Box ────────────────────────────── */}
              <div className="border border-gray-200 rounded-lg grid grid-cols-1 md:grid-cols-4 bg-white relative text-left">

                {/* FROM */}
                <div
                  className={`p-4 py-3 cursor-pointer transition-colors hover:bg-blue-50/40 relative border-b md:border-b-0 md:border-r border-gray-200 rounded-t-lg md:rounded-tr-none md:rounded-l-lg ${activeDropdown === 'from' ? 'bg-blue-50/50' : ''}`}
                  onClick={() => { setActiveDropdown('from'); setQuery(''); }}
                >
                  <p className="text-[13px] text-gray-500 mb-0 font-medium">From</p>
                  <h3 className="text-[32px] font-black text-black leading-tight tracking-tight">{from.name}</h3>
                  <p className="text-[13px] text-gray-500 truncate mt-0.5">
                    {from.code}, {from.full.split(',')[0]}
                  </p>

                  {/* Dropdown */}
                  {activeDropdown === 'from' && (
                    <StationDropdown
                      query={query}
                      setQuery={setQuery}
                      stations={filtered}
                      onSelect={s => { setFrom(s); setActiveDropdown('to'); setQuery(''); }}
                    />
                  )}
                </div>

                {/* SWAP BUTTON */}
                <div className="absolute left-[25%] top-[10%] md:top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex hidden md:flex">
                  <button
                    onClick={handleSwap}
                    className="w-10 h-10 bg-white border border-gray-200 rounded-full shadow-sm flex items-center justify-center text-blue-500 hover:text-blue-600 hover:shadow transition-all duration-300"
                    style={{ transform: `rotate(${swapAngle}deg)` }}
                  >
                    <ArrowLeftRight size={16} strokeWidth={2.5} />
                  </button>
                </div>

                {/* TO */}
                <div
                  className={`p-4 py-3 cursor-pointer transition-colors hover:bg-blue-50/40 relative border-b md:border-b-0 md:border-r border-gray-200 ${activeDropdown === 'to' ? 'bg-blue-50/50' : ''}`}
                  onClick={() => { setActiveDropdown('to'); setQuery(''); }}
                >
                  <p className="text-[13px] text-gray-500 mb-0 font-medium">To</p>
                  <h3 className="text-[32px] font-black text-black leading-tight tracking-tight">{to.name}</h3>
                  <p className="text-[13px] text-gray-500 truncate mt-0.5">
                    {to.code}, {to.full.split(',')[0]}
                  </p>

                  {activeDropdown === 'to' && (
                    <StationDropdown
                      query={query}
                      setQuery={setQuery}
                      stations={filtered}
                      onSelect={s => { setTo(s); setActiveDropdown(null); setQuery(''); }}
                    />
                  )}
                </div>

                {/* TRAVEL DATE */}
                <div className="p-4 py-3 cursor-pointer transition-colors hover:bg-blue-50/40 relative border-b md:border-b-0 md:border-r border-gray-200 flex flex-col justify-center">
                  <div className="flex items-center gap-1 mb-0 pointer-events-none">
                    <p className="text-[13px] text-gray-500 font-medium">Travel Date</p>
                    <ChevronDown size={14} className="text-blue-500" />
                  </div>
                  <div className="flex items-baseline gap-1.5 relative mt-0.5">
                    <h3 className="text-[32px] font-black text-black leading-none">{new Date(date).getDate()}</h3>
                    <span className="text-[18px] font-black text-black leading-none whitespace-nowrap">
                      {new Date(date).toLocaleString('default', { month: 'short' })}' {new Date(date).getFullYear().toString().substring(2)}
                    </span>
                    <input
                      type="date"
                      value={date}
                      onChange={e => setDate(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                  </div>
                  <p className="text-[13px] text-gray-500 mt-0.5 capitalize">
                    {new Date(date).toLocaleString('default', { weekday: 'long' })}
                  </p>
                </div>

                {/* CLASS */}
                <div
                  className={`p-4 py-3 cursor-pointer transition-colors hover:bg-blue-50/40 relative rounded-b-lg md:rounded-bl-none md:rounded-r-lg ${activeDropdown === 'class' ? 'bg-blue-50/50' : ''}`}
                  onClick={() => setActiveDropdown(activeDropdown === 'class' ? null : 'class')}
                >
                  <div className="flex items-center gap-1 mb-0">
                    <p className="text-[13px] text-gray-500 font-medium">Class</p>
                    <ChevronDown size={14} className="text-blue-500" />
                  </div>
                  <h3 className="text-[32px] font-black text-black leading-tight tracking-tight mt-0.5 uppercase">
                    {travelClass === 'Sleeper (SL)' ? 'SL' : travelClass === 'AC 3 Tier (3A)' ? '3A' : travelClass === 'AC 2 Tier (2A)' ? '2A' : travelClass === 'AC First Class (1A)' ? '1A' : travelClass === 'All Class' ? 'ALL' : 'CC'}
                  </h3>
                  <p className="text-[13px] text-gray-500 mt-0.5 truncate">
                    {travelClass.split('(')[0].trim()}
                  </p>
                  
                  {activeDropdown === 'class' && (
                    <div className="absolute top-full right-0 z-[500] w-60 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden py-1">
                      {['All Class', ...TRAIN_CLASSES].map(c => (
                        <button key={c} onClick={() => { setTravelClass(c); setActiveDropdown(null); }}
                          className={`w-full text-left px-5 py-3 text-[14px] font-bold hover:bg-blue-50 transition-colors ${travelClass === c ? 'text-blue-600 bg-blue-50' : 'text-gray-700'}`}>
                          {c}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

              </div>

              {/* ─── Search Button ─── */}
              <div className="absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2 z-[100]">
                <button
                  onClick={handleSearch}
                  className="bg-gradient-to-r from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700 text-white px-[70px] py-[15px] rounded-full font-black text-[22px] tracking-wide shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-95 transition-all text-center"
                >
                  SEARCH
                </button>
              </div>

            </div>
          </div>
        </div>
      </section>




      {/* ─── Offers Section ──────────────────────────────────────────── */}
      <TrainOffersSlider />


      {/* ─── Info Articles ───────────────────────────────────────────── */}
      <section className="bg-[#f5f7f9] py-10">
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {[
              {
                title: 'Book Train Tickets Without Any Hassle',
                body: 'WingTrip makes train booking simple – search your route, pick a train and class, and confirm your seat in seconds. No queues, no stress. Supports IRCTC-authenticated bookings for all classes including Sleeper, AC 3 Tier, AC 2 Tier, and First Class.',
              },
              {
                title: 'Check Your PNR Status',
                body: 'Know the real-time status of your ticket in one tap. Enter your 10-digit PNR number and instantly check if your booking is Confirmed, RAC, or Waitlisted. Get automatic SMS alerts on any changes to your reservation.',
              },
              {
                title: 'How to Book Train Tickets Online with WingTrip',
                body: 'Select your origin and destination, choose your travel date and preferred class, browse available trains sorted by departure time or price, select seats and complete payment securely. E-ticket delivered instantly to your email and WingTrip app.',
              },
              {
                title: 'Check Your Train Running Status',
                body: 'Track your train live on the map with real-time delay info. See which station the train is currently at, expected arrival time at your station, and platform number. Available for all IRCTC trains across India.',
              },
            ].map((article, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all">
                <h3 className="text-[15px] font-black text-gray-900 mb-3 leading-snug">{article.title}</h3>
                <p className="text-[12px] font-medium text-gray-500 leading-relaxed">{article.body}</p>
                <button className="mt-3 text-emerald-600 text-[11px] font-black hover:underline uppercase tracking-widest">Read More →</button>
              </div>
            ))}
          </div>

          {/* Why Book Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: 'Why Book Train Tickets Online with WingTrip?',
                points: ['Instant IRCTC-authorized e-ticket delivery', 'Real-time seat availability and live train tracking', 'Tatkal & Premium Tatkal bookings supported', 'All payment methods: UPI, Card, Net Banking, Wallets', 'Free cancellation on select trains'],
              },
              {
                title: 'Easy IRCTC Tatkal Booking',
                points: ['Tatkal opens 1 day before journey date (10 AM)', 'Premium Tatkal quota available for faster confirmation', 'No extra agent fee — direct IRCTC fare only', 'Dedicated fast-checkout mode for Tatkal bookings', 'Instant confirmation within 60 seconds'],
              },
            ].map((sec, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <h3 className="text-[15px] font-black text-gray-900 mb-4">{sec.title}</h3>
                <ul className="space-y-2">
                  {sec.points.map((pt, i) => (
                    <li key={i} className="flex items-start gap-2 text-[12px] font-medium text-gray-600">
                      <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-[9px] font-black shrink-0 mt-0.5">✓</span>
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FAQ Section ─────────────────────────────────────────────── */}
      <section className="bg-white py-10 border-t border-gray-100">
        <div className="max-w-[1200px] mx-auto px-4">
          <h2 className="text-[18px] font-black text-gray-900 mb-6">Frequently Asked Questions About IRCTC Ticket Booking</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6">
            {[
              { q: 'Why Book Train Tickets Online with WingTrip?', a: 'WingTrip is an IRCTC-authorized agent offering instant ticket confirmation, real-time availability, and the best fares across all train classes.' },
              { q: 'What is the process for booking an online train ticket?', a: 'Search your route → choose a train → select class → enter passenger details → make payment → receive instant e-ticket. Total process takes under 2 minutes.' },
              { q: 'How many people get on a single train booking?', a: 'You can book up to 6 passengers per transaction on WingTrip. For groups of 10+, use our Group Booking feature for bulk reservations.' },
              { q: 'How can I cancel my e-Tickets on WingTrip?', a: 'Go to My Trips → select the booking → click Cancel. Refund as per IRCTC cancellation rules is credited within 5-7 working days.' },
              { q: 'Are children charged for train tickets booking?', a: 'Children below 5 years travel free without a berth. Children aged 5-12 years are charged half the adult fare. Age proof may be required on board.' },
              { q: 'What documents or ID Cards must be carried for train travel?', a: 'You must carry a valid government-issued photo ID — Aadhaar, PAN, Driving License, or Passport. The name must match your ticket exactly.' },
              { q: 'What is the cancellation policy for train bookings?', a: 'Refund depends on how early you cancel. Full refund (minus ₹60 clerkage) if cancelled 48+ hours before departure. Tatkal tickets are non-refundable.' },
              { q: 'How can I check my train status on mobile?', a: 'Use the WingTrip app or website — enter your PNR or train number to get live running status, platform info, and delay alerts in real time.' },
            ].map((faq, idx) => (
              <div key={idx} className="border-b border-gray-100 pb-5">
                <h4 className="text-[13px] font-black text-gray-800 mb-1.5">Q. {faq.q}</h4>
                <p className="text-[12px] font-medium text-gray-500 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SEO Footer Strip ────────────────────────────────────────── */}
      <section className="bg-[#f5f7f9] py-8 border-t border-gray-200">
        <div className="max-w-[1200px] mx-auto px-4 text-[10px] text-gray-400 font-medium leading-relaxed space-y-3">
          <div><span className="font-black text-gray-600 uppercase text-[11px]">Popular Train Routes: </span>Delhi to Mumbai · Delhi to Kolkata · Mumbai to Goa · Bangalore to Chennai · Delhi to Jaipur · Mumbai to Ahmedabad · Hyderabad to Bangalore · Chennai to Coimbatore</div>
          <div><span className="font-black text-gray-600 uppercase text-[11px]">Train Types: </span>Rajdhani Express · Shatabdi Express · Duronto Express · Garib Rath · Jan Shatabdi · Vande Bharat Express · Humsafar Express · Tejas Express</div>
          <div><span className="font-black text-gray-600 uppercase text-[11px]">Train Classes: </span>First AC (1A) · Second AC (2A) · Third AC (3A) · Sleeper Class (SL) · Chair Car (CC) · Second Seating (2S) · AC Economy · Executive Chair Car</div>
        </div>
      </section>

    </div>

  );
};

// ─── Station Dropdown Component ───────────────────────────────────────────
const StationDropdown = ({ query, setQuery, stations, onSelect }) => (
  <div
    className="absolute top-full left-0 z-[500] mt-2 w-[340px] bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden"
    onClick={e => e.stopPropagation()}
  >
    <div className="p-4 border-b border-gray-100 sticky top-0 bg-white z-10">
      <input
        autoFocus
        type="text"
        placeholder="Search station or city..."
        className="w-full bg-gray-50 rounded-xl px-4 py-3 text-sm font-bold text-text-main outline-none border-2 border-transparent focus:border-emerald-500"
        value={query}
        onChange={e => setQuery(e.target.value)}
      />
    </div>
    <div className="max-h-[280px] overflow-y-auto">
      {stations.length > 0 ? stations.map(s => (
        <div
          key={s.code}
          onClick={() => onSelect(s)}
          className="flex items-center gap-4 px-5 py-4 cursor-pointer hover:bg-emerald-50 transition-all group"
        >
          <div className="w-12 h-10 bg-gray-100 group-hover:bg-emerald-100 rounded-xl flex items-center justify-center text-[11px] font-black text-text-muted group-hover:text-emerald-700 transition-all shrink-0">
            {s.code}
          </div>
          <div>
            <p className="text-[14px] font-black text-text-main group-hover:text-emerald-700 transition-colors">{s.name}</p>
            <p className="text-[11px] font-medium text-text-muted">{s.full}</p>
          </div>
        </div>
      )) : (
        <div className="p-6 text-center text-text-muted font-bold text-sm">No stations found</div>
      )}
    </div>
  </div>
);

export default TrainLandingPage;
