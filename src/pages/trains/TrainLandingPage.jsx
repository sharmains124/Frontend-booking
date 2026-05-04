import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import TrainPopularRoutes from './component/TrainPopularRoutes';
import {
  Train, MapPin, Calendar, Users, ArrowRight, ArrowLeftRight,
  ShieldCheck, Clock, Star, Zap, TrendingDown, Globe,
  ChevronDown, X, Check
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
  const navigate = useNavigate();
  const [searchTab, setSearchTab] = useState('booking');
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

  // ─── Seamless Video Loop Logic ───────────────────────────────────────────
  const v1Ref = useRef(null);
  const v2Ref = useRef(null);
  const [activeVideo, setActiveVideo] = useState(1); // 1 or 2
  const crossfadeBuffer = 2; // seconds before end to start transition

  useEffect(() => {
    const v1 = v1Ref.current;
    const v2 = v2Ref.current;
    if (!v1 || !v2) return;

    const checkLoop = () => {
      const active = activeVideo === 1 ? v1 : v2;
      const next = activeVideo === 1 ? v2 : v1;

      if (active.duration > 0 && active.currentTime >= (active.duration - crossfadeBuffer)) {
          if (next.paused) {
            next.currentTime = 0;
            next.play().catch(() => {});
            setActiveVideo(activeVideo === 1 ? 2 : 1);
          }
      }
    };

    const interval = setInterval(checkLoop, 500);
    return () => clearInterval(interval);
  }, [activeVideo]);

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
            <Link to="/offers" className="text-[14px] font-black text-blue-600 hover:underline mr-2">VIEW ALL →</Link>
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
      <section className="relative min-h-[720px] flex items-center justify-center bg-slate-950 pt-[80px]">
        {/* Video + Overlay Background */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          {/* Real train video */}
          {/* Double Video for Seamless Looping */}
          <video
            ref={v1Ref}
            autoPlay
            muted
            playsInline
            className={`absolute inset-0 w-full h-full object-cover scale-[1.15] transition-opacity duration-[1500ms] ease-in-out ${activeVideo === 1 ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
            style={{ filter: 'brightness(0.7)' }}
          >
            <source src="/assets/train-video.mp4" type="video/mp4" />
          </video>
          <video
            ref={v2Ref}
            muted
            playsInline
            className={`absolute inset-0 w-full h-full object-cover scale-[1.15] transition-opacity duration-[1500ms] ease-in-out ${activeVideo === 2 ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
            style={{ filter: 'brightness(0.7)' }}
          >
            <source src="/assets/train-video.mp4" type="video/mp4" />
          </video>

          {/* Neutral Dark Overlay for Legibility */}
          <div className="absolute inset-0 bg-slate-950/30" />
          
          {/* Neutral Vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/40" />
          
          {/* Depth Vignette */}
          <div className="absolute inset-x-0 inset-y-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(2,6,23,0.5)_100%)]" />

          {/* Grid-line texture for a technical/modern feel */}
          <div className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 40px, rgba(255,255,255,0.05) 40px, rgba(255,255,255,0.05) 41px), repeating-linear-gradient(90deg, transparent, transparent 40px, rgba(255,255,255,0.05) 40px, rgba(255,255,255,0.05) 41px)'
            }}
          />

          {/* Removed dynamic glowing blue accents */}
        </div>

        <div className="container-custom relative z-10 w-full text-center px-4">
          <h1 className="text-4xl md:text-5xl lg:text-[60px] font-black text-white leading-tight tracking-tight mb-4 drop-shadow-2xl animate-fade-in-up delay-100">
            Ride the <span className="text-white decoration-[#008cff]/80 decoration-8 underline underline-offset-[12px]">Rails,</span> <span className="text-white/90 italic font-serif ml-2">Effortlessly</span>
          </h1>

          <p className="text-sm md:text-base lg:text-lg text-white/90 max-w-2xl mx-auto font-medium tracking-wide mb-10 drop-shadow-lg leading-relaxed animate-fade-in-up delay-200">
            Book trains across India in seconds — fast, simple, and reliable.
          </p>

          {/* ─── Search Form Card ─────────────────────────────────────── */}
          
          <div className={`max-w-[1100px] mx-auto relative ${activeDropdown !== null ? 'z-[1000]' : 'z-20'} mt-8 mb-10`} onClick={() => setActiveDropdown(null)}>
            
            {/* MMT Style Backdrop Overlay - BEHIND THE FORM */}
            {activeDropdown !== null && (
              <div 
                className="fixed inset-0 bg-slate-900/70 backdrop-blur-[4px] -z-10 animate-fade-in" 
                onClick={(e) => { e.stopPropagation(); setActiveDropdown(null); }}
              />
            )}

            <div className={`bg-white/95 backdrop-blur-xl rounded-[32px] shadow-[0_20px_70px_-15px_rgba(0,0,0,0.3)] border border-white/20 pt-8 px-6 md:px-8 pb-12 relative w-full animate-fade-in-up z-10`}
              style={{ animationDelay: '300ms' }}
              onClick={e => e.stopPropagation()}>

              {/* ─── Top Radio Buttons Row ────────────────────────── */}
              <div className="flex flex-col md:flex-row items-center justify-between mb-6">
                <div className="flex items-center gap-8">
                  {[
                    { id: 'booking', label: 'Book Train Tickets' },
                    { id: 'pnr', label: 'Check PNR Status' },
                    { id: 'status', label: 'Live Train Status' },
                  ].map((tab) => (
                    <label key={tab.id} className="flex items-center gap-2 cursor-pointer group">
                      <div className="relative flex items-center justify-center w-5 h-5">
                        <input
                          type="radio"
                          name="trainTab"
                          checked={searchTab === tab.id}
                          onChange={() => setSearchTab(tab.id)}
                          className="appearance-none w-5 h-5 rounded-full border-2 border-gray-300 checked:border-blue-600 checked:bg-blue-600 transition-all cursor-pointer shadow-sm group-hover:border-blue-400"
                        />
                        {searchTab === tab.id && <Check className="absolute w-3 h-3 text-white pointer-events-none" strokeWidth={4} />}
                      </div>
                      <span className={`text-[15px] font-black tracking-tight transition-colors ${searchTab === tab.id ? 'text-gray-900 underline underline-offset-4 decoration-blue-600/30' : 'text-gray-400 group-hover:text-gray-600'}`}>
                        {tab.label}
                      </span>
                    </label>
                  ))}
                </div>

                <div className="hidden md:flex flex-col items-end">
                  <div className="flex items-center gap-2 mb-0.5">
                    <ShieldCheck size={14} className="text-emerald-500" />
                    <span className="text-[13px] font-black text-gray-800 leading-tight">IRCTC AUTHORIZED</span>
                  </div>
                  <span className="text-[11px] text-gray-400 font-bold tracking-widest">OFFICIAL E-TICKETING PARTNER</span>
                </div>
              </div>

              {/* ─── Fields Border Box ────────────────────────────── */}
              <div className="border border-gray-200 rounded-2xl grid grid-cols-1 md:grid-cols-4 bg-white/50 backdrop-blur-sm relative text-left shadow-inner">

                {/* FROM */}
                <div
                  className={`group/field p-6 py-5 cursor-pointer transition-all hover:bg-blue-50/60 relative border-b md:border-b-0 md:border-r border-gray-100 ${activeDropdown === 'from' ? 'bg-blue-50/80 ring-1 ring-blue-500/20' : ''}`}
                  onClick={(e) => { e.stopPropagation(); setActiveDropdown(activeDropdown === 'from' ? null : 'from'); }}
                >
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] mb-1 group-hover/field:translate-x-1 transition-transform">From Station</p>
                  <h3 className="text-xl md:text-2xl font-black text-slate-900 leading-none tracking-tight mb-1 truncate">{from.name}</h3>
                  <p className="text-[11px] font-bold text-slate-500 truncate mt-1">
                    [{from.code}] {from.full.split(',')[0]}
                  </p>

                  {activeDropdown === 'from' && (
                    <StationDropdown
                      query={query}
                      setQuery={setQuery}
                      stations={filtered}
                      type="from"
                      onSelect={s => { setFrom(s); setActiveDropdown('to'); setQuery(''); }}
                    />
                  )}
                </div>

                {/* SWAP BUTTON */}
                <div className="absolute left-[25%] top-[10%] md:top-1/2 -translate-x-1/2 -translate-y-1/2 z-30 hidden md:flex">
                  <button
                    onClick={handleSwap}
                    className="w-12 h-12 bg-white border border-gray-100 rounded-full shadow-[0_4px_15px_rgba(0,0,0,0.1)] flex items-center justify-center text-blue-600 hover:text-white hover:bg-blue-600 hover:shadow-[0_4px_25px_rgba(37,99,235,0.4)] transition-all duration-500 hover:scale-110 active:scale-90"
                    style={{ transform: `rotate(${swapAngle}deg)` }}
                  >
                    <ArrowLeftRight size={20} strokeWidth={2.5} />
                  </button>
                </div>

                {/* TO */}
                <div
                  className={`group/field p-6 py-5 cursor-pointer transition-all hover:bg-blue-50/60 relative border-b md:border-b-0 md:border-r border-gray-100 ${activeDropdown === 'to' ? 'bg-blue-50/80 ring-1 ring-blue-500/20' : ''}`}
                  onClick={(e) => { e.stopPropagation(); setActiveDropdown(activeDropdown === 'to' ? null : 'to'); }}
                >
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] mb-1 group-hover/field:translate-x-1 transition-transform">To Station</p>
                  <h3 className="text-xl md:text-2xl font-black text-slate-900 leading-none tracking-tight mb-1 truncate">{to.name}</h3>
                  <p className="text-[11px] font-bold text-slate-500 truncate mt-1">
                    [{to.code}] {to.full.split(',')[0]}
                  </p>

                  {activeDropdown === 'to' && (
                    <StationDropdown
                      query={query}
                      setQuery={setQuery}
                      stations={filtered}
                      type="to"
                      onSelect={s => { setTo(s); setActiveDropdown(null); setQuery(''); }}
                    />
                  )}
                </div>

                {/* TRAVEL DATE */}
                <div className="group/field p-6 py-5 cursor-pointer transition-all hover:bg-blue-50/60 relative border-b md:border-b-0 md:border-r border-gray-100 flex flex-col justify-center">
                  <div className="flex items-center gap-1 mb-1 group-hover/field:translate-x-1 transition-transform">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em]">Travel Date</p>
                    <Calendar size={14} className="text-[#008cff]" />
                  </div>
                  <div className="flex items-baseline gap-1 relative">
                    <h3 className="text-xl md:text-2xl font-black text-slate-900 leading-none tracking-tighter">{new Date(date).getDate()}</h3>
                    <span className="text-sm font-black text-slate-900 leading-none whitespace-nowrap">
                      {new Date(date).toLocaleString('default', { month: 'short' })} '{new Date(date).getFullYear().toString().substring(2)}
                    </span>
                    <input
                      type="date"
                      value={date}
                      onChange={e => setDate(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                  </div>
                  <p className="text-[10px] font-bold text-slate-500 mt-1 uppercase">
                    {new Date(date).toLocaleString('default', { weekday: 'long' })}
                  </p>
                </div>

                {/* CLASS */}
                <div
                  className={`group/field p-6 py-5 cursor-pointer transition-all hover:bg-blue-50/60 relative ${activeDropdown === 'class' ? 'bg-blue-50/80 ring-1 ring-blue-500/20' : ''}`}
                  onClick={(e) => { e.stopPropagation(); setActiveDropdown(activeDropdown === 'class' ? null : 'class'); }}
                >
                  <div className="flex items-center gap-1 mb-1 group-hover/field:translate-x-1 transition-transform">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em]">Class</p>
                    <ChevronDown size={14} className="text-[#008cff] group-hover:rotate-180 transition-transform duration-300" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-black text-slate-900 leading-none tracking-tight uppercase mb-1">
                    {travelClass === 'Sleeper (SL)' ? 'SL' : travelClass === 'AC 3 Tier (3A)' ? '3A' : travelClass === 'AC 2 Tier (2A)' ? '2A' : travelClass === 'AC First Class (1A)' ? '1A' : travelClass === 'All Class' ? 'ALL' : 'CC'}
                  </h3>
                  <p className="text-[11px] font-bold text-slate-500 mt-1 truncate">
                    {travelClass.split('(')[0].trim()} Class
                  </p>
                  
                  {activeDropdown === 'class' && (
                    <div className="fixed top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-[2000] w-[90%] max-w-[400px] bg-white shadow-[0_20px_70px_rgba(0,0,0,0.4)] rounded-[24px] overflow-hidden flex flex-col animate-fade-in-up">
                      <div className="p-5 border-b border-gray-100 flex items-center justify-between">
                        <h3 className="font-black text-slate-900 text-lg tracking-tight">Select Class</h3>
                        <button onClick={() => setActiveDropdown(null)} className="p-2 hover:bg-slate-100 text-slate-500 rounded-full transition-colors">
                          <X size={20} />
                        </button>
                      </div>
                      <div className="py-2">
                        {['All Class', ...TRAIN_CLASSES].map(c => (
                          <button key={c} onClick={() => { setTravelClass(c); setActiveDropdown(null); }}
                            className={`w-full text-left px-6 py-3.5 text-[15px] font-black hover:bg-blue-50 transition-colors ${travelClass === c ? 'text-blue-600 bg-blue-50' : 'text-gray-700'}`}>
                            {c}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

              </div>

              {/* ─── Search Button ─── */}
              <div className="absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2 z-[100]">
                <button
                  onClick={handleSearch}
                  className="bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white px-20 py-5 rounded-[20px] font-black text-[24px] uppercase tracking-[0.1em] shadow-[0_15px_45px_-12px_rgba(37,99,235,0.6)] hover:shadow-[0_20px_60px_-12px_rgba(37,99,235,0.8)] hover:scale-[1.05] active:scale-95 transition-all duration-300 text-center"
                >
                  Search Trains
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



    </div>

  );
};

const StationDropdown = ({ query, setQuery, stations, onSelect, type }) => (
  <div
    className="fixed top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-[2000] w-[90%] max-w-[650px] h-[85vh] max-h-[600px] bg-white shadow-[0_20px_70px_rgba(0,0,0,0.4)] rounded-[24px] overflow-hidden flex flex-col animate-fade-in-up"
    onClick={e => e.stopPropagation()}
  >
    <div className="p-5 md:p-6 border-b border-gray-100 flex items-center justify-between bg-white sticky top-0 z-20">
      <h3 className="font-black text-slate-900 text-lg md:text-xl tracking-tight">
        Select {type === 'from' ? 'Origin' : 'Destination'} Station
      </h3>
    </div>
    <div className="p-5 md:p-6 pb-2 bg-white sticky top-[72px] md:top-[80px] z-10">
      <div className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 focus-within:border-blue-500 focus-within:bg-white transition-all shadow-inner">
        <MapPin size={20} className="text-gray-400" />
        <input
          autoFocus
          type="text"
          placeholder="Search station or city..."
          className="flex-1 bg-transparent border-none outline-none text-base font-bold text-slate-900 placeholder:text-gray-400 placeholder:font-medium"
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
      </div>
    </div>
    <div className="max-h-[320px] overflow-y-auto custom-scrollbar p-2">
      {stations.length > 0 ? (
        <div className="space-y-1">
          {stations.map(s => (
            <div
              key={s.code}
              onClick={() => onSelect(s)}
              className="flex items-center gap-4 px-4 py-4 cursor-pointer hover:bg-blue-50/50 rounded-2xl transition-all group"
            >
              <div className="w-14 h-11 bg-slate-50 group-hover:bg-blue-600 group-hover:text-white rounded-xl flex items-center justify-center text-[12px] font-black text-slate-500 transition-all shrink-0 shadow-sm">
                {s.code}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[15px] font-black text-slate-900 group-hover:text-blue-700 transition-colors truncate">{s.name}</p>
                <p className="text-[12px] font-bold text-slate-400 truncate italic">{s.full}</p>
              </div>
              <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                <ArrowRight size={16} className="text-blue-600" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-10 text-center">
          <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <X className="text-gray-300" size={24} />
          </div>
          <p className="text-slate-400 font-black text-[13px] uppercase tracking-widest">No stations found</p>
          <p className="text-gray-400 text-[12px] mt-1">Try another keyword</p>
        </div>
      )}
    </div>
  </div>
);

export default TrainLandingPage;
