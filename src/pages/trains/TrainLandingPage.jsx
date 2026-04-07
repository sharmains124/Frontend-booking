import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
            className="absolute inset-0 w-full h-full object-cover scale-105"
            style={{ filter: 'brightness(0.45) saturate(1.2)' }}
          >
            <source src="/assets/train" type="video/mp4" />
            <source src="/assets/train" type="video/webm" />
          </video>

          {/* Emerald/Teal cinematic colour grade overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/70 via-teal-950/50 to-cyan-950/70" />
          {/* Bottom dark vignette so search card reads cleanly */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
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

          {/* Stylised train-track lines at bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-28 opacity-20 pointer-events-none">
            <div className="absolute bottom-8 left-0 right-0 h-[3px] bg-white/60 rounded" />
            <div className="absolute bottom-16 left-0 right-0 h-[3px] bg-white/60 rounded" />
            {Array.from({ length: 40 }).map((_, i) => (
              <div key={i} className="absolute bottom-7 h-9 w-[3px] bg-white/50"
                style={{ left: `${i * 2.5 + 0.5}%` }} />
            ))}
          </div>
        </div>

        <div className="container-custom relative z-10 w-full text-center px-4">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-emerald-500/20 border border-emerald-500/30 rounded-full px-5 py-2 mb-6 backdrop-blur-sm">
            <Train size={14} className="text-emerald-400" />
            <span className="text-emerald-300 text-[11px] font-black uppercase tracking-[0.3em]">India's Premium Train Booking</span>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-[72px] font-black text-white leading-tight tracking-tight mb-4 drop-shadow-2xl">
            Journey <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Across</span>
            <br />
            <span className="text-white/80 italic font-serif">India's Rails</span>
          </h1>

          <p className="text-base md:text-lg text-white/70 max-w-2xl mx-auto font-medium mb-10">
            Book 12,000+ trains instantly. Tatkal, Express, Superfast — all at the best fares.
          </p>

          {/* ─── Search Form Card ─────────────────────────────────────── */}
          <div className="max-w-5xl mx-auto" onClick={() => setActiveDropdown(null)}>
            <div className="bg-white rounded-[2rem] shadow-2xl p-3 md:p-4 relative border border-white/20"
              onClick={e => e.stopPropagation()}>

              {/* Fields Row */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch bg-white border border-gray-100 rounded-2xl overflow-visible relative shadow-sm">

                {/* FROM */}
                <div
                  className={`lg:col-span-3 p-4 cursor-pointer transition-all hover:bg-gray-50 relative border-r border-gray-100 min-h-[80px] flex flex-col justify-center rounded-l-2xl ${activeDropdown === 'from' ? 'bg-blue-50/30' : ''}`}
                  onClick={() => { setActiveDropdown('from'); setQuery(''); }}
                >
                  <p className="text-[11px] font-black text-text-light uppercase tracking-widest mb-1">From Station</p>
                  <h3 className="text-xl font-black text-text-main leading-tight">{from.name}</h3>
                  <p className="text-[11px] font-bold text-text-muted truncate mt-0.5">{from.code} · {from.full.split(',')[0]}</p>

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

                {/* SWAP */}
                <div className="absolute left-1/4 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                  <button
                    onClick={handleSwap}
                    className="w-10 h-10 bg-white border border-gray-100 rounded-full shadow-lg flex items-center justify-center text-emerald-600 hover:text-white hover:bg-emerald-600 transition-all duration-500"
                    style={{ transform: `rotate(${swapAngle}deg)` }}
                  >
                    <ArrowLeftRight size={18} strokeWidth={3} />
                  </button>
                </div>

                {/* TO */}
                <div
                  className={`lg:col-span-3 p-4 cursor-pointer transition-all hover:bg-gray-50 relative border-r border-gray-100 min-h-[80px] flex flex-col justify-center ${activeDropdown === 'to' ? 'bg-blue-50/30' : ''}`}
                  onClick={() => { setActiveDropdown('to'); setQuery(''); }}
                >
                  <p className="text-[11px] font-black text-text-light uppercase tracking-widest mb-1">To Station</p>
                  <h3 className="text-xl font-black text-text-main leading-tight">{to.name}</h3>
                  <p className="text-[11px] font-bold text-text-muted truncate mt-0.5">{to.code} · {to.full.split(',')[0]}</p>

                  {activeDropdown === 'to' && (
                    <StationDropdown
                      query={query}
                      setQuery={setQuery}
                      stations={filtered}
                      onSelect={s => { setTo(s); setActiveDropdown(null); setQuery(''); }}
                    />
                  )}
                </div>

                {/* DATE */}
                <div className="lg:col-span-2 p-4 border-r border-gray-100 min-h-[80px] flex flex-col justify-center">
                  <p className="text-[11px] font-black text-text-light uppercase tracking-widest mb-2">Journey Date</p>
                  <input
                    type="date"
                    value={date}
                    onChange={e => setDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="text-lg font-black text-text-main bg-transparent border-none outline-none cursor-pointer w-full"
                  />
                </div>

                {/* CLASS */}
                <div
                  className={`lg:col-span-2 p-4 cursor-pointer border-r border-gray-100 min-h-[80px] flex flex-col justify-center ${activeDropdown === 'class' ? 'bg-blue-50/30' : 'hover:bg-gray-50'}`}
                  onClick={() => setActiveDropdown(activeDropdown === 'class' ? null : 'class')}
                >
                  <p className="text-[11px] font-black text-text-light uppercase tracking-widest mb-1">Class</p>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-black text-text-main leading-tight">{travelClass.split('(')[0].trim()}</h3>
                    <ChevronDown size={14} className="text-text-muted" />
                  </div>
                  {activeDropdown === 'class' && (
                    <div className="absolute top-full left-0 z-[500] mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
                      {TRAIN_CLASSES.map(c => (
                        <button key={c} onClick={() => { setTravelClass(c); setActiveDropdown(null); }}
                          className={`w-full text-left px-6 py-4 text-[13px] font-black hover:bg-emerald-50 hover:text-emerald-700 transition-all ${travelClass === c ? 'bg-emerald-50 text-emerald-700' : 'text-text-main'}`}>
                          {c}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* PASSENGERS */}
                <div className="lg:col-span-2 p-4 min-h-[80px] flex flex-col justify-center rounded-r-2xl">
                  <p className="text-[11px] font-black text-text-light uppercase tracking-widest mb-1">Passengers</p>
                  <div className="flex items-center gap-3">
                    <button onClick={() => setPassengers(p => Math.max(1, p - 1))}
                      className="w-7 h-7 rounded-full bg-gray-100 font-black text-gray-600 hover:bg-emerald-600 hover:text-white transition-all flex items-center justify-center">−</button>
                    <span className="text-xl font-black text-text-main">{passengers}</span>
                    <button onClick={() => setPassengers(p => Math.min(6, p + 1))}
                      className="w-7 h-7 rounded-full bg-gray-100 font-black text-gray-600 hover:bg-emerald-600 hover:text-white transition-all flex items-center justify-center">+</button>
                  </div>
                </div>
              </div>

              {/* Search Button */}
              <div className="flex justify-center -mb-14 mt-4 relative z-10">
                <button
                  onClick={handleSearch}
                  className="bg-gradient-to-r from-emerald-600 to-cyan-600 text-white px-20 py-4 rounded-full font-black text-[16px] uppercase tracking-[0.2em] shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center gap-3"
                >
                  <Train size={20} />
                  Search Trains
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Main Content ────────────────────────────────────────────── */}
      <main className="container-custom py-36 space-y-40">

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { value: '12,000+', label: 'Daily Trains', icon: <Train size={28} className="text-emerald-600" /> },
            { value: '7,500+', label: 'Stations', icon: <MapPin size={28} className="text-cyan-600" /> },
            { value: '2.5Cr+', label: 'Happy Travellers', icon: <Users size={28} className="text-violet-600" /> },
            { value: '99.8%', label: 'Booking Success', icon: <ShieldCheck size={28} className="text-orange-500" /> },
          ].map((stat, i) => (
            <div key={i} className="bg-white rounded-3xl p-8 shadow-soft border border-gray-100 text-center hover:shadow-premium transition-all duration-500 hover:-translate-y-2">
              <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                {stat.icon}
              </div>
              <div className="text-3xl font-black text-text-main tracking-tight">{stat.value}</div>
              <div className="text-[12px] font-black text-text-muted uppercase tracking-widest mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Popular Routes */}
        <section>
          <div className="text-center mb-16">
            <span className="sub-heading">Top Picks</span>
            <h2 className="section-heading mt-3">Popular Train Routes</h2>
            <p className="text-text-muted font-bold mt-4 max-w-xl mx-auto">
              Most booked routes across India with guaranteed availability and best fares.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {POPULAR_ROUTES.map((route, i) => (
              <div
                key={i}
                onClick={() => navigate(`/trains/results?from=${route.from}&to=${route.to}&date=${date}&class=${travelClass}&passengers=1`)}
                className="group bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-soft hover:shadow-premium hover:-translate-y-3 transition-all duration-500 cursor-pointer overflow-hidden relative"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700" />
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <p className="text-xl font-black text-text-main">{route.from}</p>
                      <p className="text-[11px] font-black text-text-muted uppercase tracking-widest">Origin</p>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <div className="flex items-center gap-2">
                        <div className="w-12 h-[2px] bg-gray-200 rounded" />
                        <Train size={18} className="text-emerald-600 group-hover:scale-125 transition-transform" />
                        <div className="w-12 h-[2px] bg-gray-200 rounded" />
                      </div>
                      <span className="text-[10px] font-black text-emerald-600 uppercase tracking-wider">{route.duration}</span>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-black text-text-main">{route.to}</p>
                      <p className="text-[11px] font-black text-text-muted uppercase tracking-widest">Destination</p>
                    </div>
                  </div>

                  <div className="border-t border-gray-50 pt-5 flex items-center justify-between">
                    <div>
                      <span className="text-[11px] font-black text-text-muted uppercase tracking-widest">{route.trains} trains</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] font-black text-text-muted uppercase">Starts at</span>
                      <p className="text-lg font-black text-emerald-600">{route.price}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Features Section */}
        <section className="bg-white rounded-[4rem] p-16 md:p-24 shadow-premium border border-gray-100 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />

          <div className="relative z-10">
            <div className="text-center mb-20">
              <span className="sub-heading">Why WingTrip Trains</span>
              <h2 className="section-heading mt-3">Travel Smarter, Pay Less</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
              {[
                {
                  icon: <Zap size={36} className="text-emerald-600" />,
                  title: 'Instant Booking',
                  desc: 'Confirm your Tatkal or regular reservation in under 30 seconds with our lightning-fast booking engine.'
                },
                {
                  icon: <TrendingDown size={36} className="text-cyan-600" />,
                  title: 'Lowest Fares',
                  desc: 'We compare all available quotas — General, Ladies, Tourist — to always show you the best available price.'
                },
                {
                  icon: <ShieldCheck size={36} className="text-violet-600" />,
                  title: 'Safe & Insured',
                  desc: 'Every booking comes with a travel insurance option and free cancellation on select trains.'
                }
              ].map((item, i) => (
                <div key={i} className="group/item space-y-6">
                  <div className="w-20 h-20 rounded-3xl bg-bg-alt flex items-center justify-center shadow-soft group-hover/item:bg-emerald-600 group-hover/item:text-white transition-all duration-500 transform group-hover/item:-translate-y-3">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-text-main tracking-tight italic uppercase mb-3">{item.title}</h3>
                    <div className="w-12 h-1 bg-emerald-500 rounded-full mb-4 group-hover/item:w-24 transition-all duration-500" />
                    <p className="text-text-muted font-bold leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Train Classes Guide */}
        <section>
          <div className="text-center mb-16">
            <span className="sub-heading">Travel In Comfort</span>
            <h2 className="section-heading mt-3">Choose Your Class</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { class: '1A', name: 'AC First Class', desc: 'Luxury cabins, linen service, maximum privacy', price: '₹3,500+', color: 'from-purple-600 to-violet-600', textColor: 'text-purple-600', bgColor: 'bg-purple-50' },
              { class: '2A', name: 'AC 2 Tier', desc: 'Comfortable berths with air-conditioning and curtains', price: '₹2,200+', color: 'from-blue-600 to-cyan-600', textColor: 'text-blue-600', bgColor: 'bg-blue-50' },
              { class: '3A', name: 'AC 3 Tier', desc: 'Economical AC travel, perfect for families', price: '₹1,500+', color: 'from-emerald-600 to-teal-600', textColor: 'text-emerald-600', bgColor: 'bg-emerald-50' },
              { class: 'SL', name: 'Sleeper Class', desc: 'Budget-friendly overnight travel across India', price: '₹450+', color: 'from-orange-500 to-amber-500', textColor: 'text-orange-600', bgColor: 'bg-orange-50' },
            ].map((c, i) => (
              <div key={i} className="group bg-white rounded-[2.5rem] overflow-hidden border border-gray-100 shadow-soft hover:shadow-premium transition-all duration-500 hover:-translate-y-3">
                <div className={`bg-gradient-to-br ${c.color} p-8 text-white text-center`}>
                  <div className="text-4xl font-black tracking-tighter">{c.class}</div>
                  <div className="text-sm font-black opacity-80 uppercase tracking-widest mt-1">{c.name}</div>
                </div>
                <div className="p-8">
                  <p className="text-[13px] font-bold text-text-muted leading-relaxed mb-4">{c.desc}</p>
                  <div className={`${c.bgColor} rounded-xl px-4 py-2 inline-block`}>
                    <span className={`text-[13px] font-black ${c.textColor}`}>{c.price}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Banner */}
        <div className="relative rounded-[5rem] overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-900 via-teal-900 to-cyan-900" />
          <div className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 40px, rgba(255,255,255,0.05) 40px, rgba(255,255,255,0.05) 41px)'
            }}
          />
          <div className="absolute top-1/2 -translate-y-1/2 right-16 opacity-5">
            <Train size={400} />
          </div>
          <div className="relative z-10 p-16 md:p-24 text-center text-white">
            <span className="text-[12px] font-black uppercase tracking-[0.5em] text-emerald-400">Limited Seats</span>
            <h2 className="text-4xl md:text-7xl font-black tracking-tighter leading-tight mt-4 mb-8">
              Book <span className="text-emerald-400 italic">Tatkal</span> Now
              <br />
              <span className="text-white/60 italic font-serif">Before It Sells Out.</span>
            </h2>
            <p className="text-white/60 font-bold text-lg max-w-xl mx-auto mb-10">
              Tatkal quota opens 1 day before journey. Be ready to book with WingTrip for guaranteed confirmation.
            </p>
            <button
              onClick={handleSearch}
              className="bg-emerald-500 hover:bg-emerald-400 text-white px-16 py-6 rounded-[3rem] font-black text-lg uppercase tracking-[0.3em] transition-all duration-300 hover:scale-105 shadow-2xl shadow-emerald-500/30 inline-flex items-center gap-3"
            >
              Search Trains <ArrowRight size={22} strokeWidth={3} />
            </button>
          </div>
        </div>
      </main>
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
