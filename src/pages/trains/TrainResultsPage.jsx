import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import {
  Train, Clock, Filter, ChevronDown, Star, ArrowRight,
  ShieldCheck, Zap, Wifi, Coffee, Info, ArrowLeftRight
} from 'lucide-react';

const getMockTrains = (from, to) => [
  {
    id: 't1',
    name: 'Rajdhani Express',
    number: '12301',
    departureTime: '16:55',
    arrivalTime: '10:00',
    duration: '17h 05m',
    from, to,
    classes: [
      { type: '1A', price: 4575, available: 6 },
      { type: '2A', price: 2710, available: 18 },
      { type: '3A', price: 1905, available: 42 },
    ],
    days: 'Mon, Tue, Wed, Thu, Fri, Sat, Sun',
    features: ['Pantry Car', 'Bedroll', 'Wi-Fi'],
    rating: 4.8,
    type: 'Rajdhani',
    color: 'emerald',
  },
  {
    id: 't2',
    name: 'Shatabdi Express',
    number: '12002',
    departureTime: '06:00',
    arrivalTime: '14:00',
    duration: '8h 00m',
    from, to,
    classes: [
      { type: 'CC', price: 1550, available: 28 },
      { type: '1A', price: 2850, available: 10 },
    ],
    days: 'Mon, Wed, Fri, Sun',
    features: ['Meals Included', 'Wi-Fi', 'AC'],
    rating: 4.6,
    type: 'Shatabdi',
    color: 'blue',
  },
  {
    id: 't3',
    name: 'Duronto Express',
    number: '12213',
    departureTime: '22:40',
    arrivalTime: '15:50',
    duration: '17h 10m',
    from, to,
    classes: [
      { type: '2A', price: 2290, available: 32 },
      { type: '3A', price: 1620, available: 64 },
      { type: 'SL', price: 615, available: 120 },
    ],
    days: 'Tue, Thu, Sat',
    features: ['Non-Stop', 'Pantry Car', 'Bedroll'],
    rating: 4.5,
    type: 'Duronto',
    color: 'violet',
  },
  {
    id: 't4',
    name: 'Garib Rath Express',
    number: '12910',
    departureTime: '20:15',
    arrivalTime: '13:30',
    duration: '17h 15m',
    from, to,
    classes: [
      { type: '3A', price: 1050, available: 96 },
      { type: 'SL', price: 385, available: 240 },
    ],
    days: 'Mon, Wed, Fri',
    features: ['Budget Friendly', 'Pantry'],
    rating: 4.0,
    type: 'Express',
    color: 'orange',
  },
];

const CLASS_COLORS = {
  '1A': 'bg-purple-100 text-purple-700 border-purple-200',
  '2A': 'bg-blue-100 text-blue-700 border-blue-200',
  '3A': 'bg-emerald-100 text-emerald-700 border-emerald-200',
  'SL': 'bg-orange-100 text-orange-700 border-orange-200',
  'CC': 'bg-cyan-100 text-cyan-700 border-cyan-200',
};

const TRAIN_COLORS = {
  emerald: { bar: 'bg-emerald-600', badge: 'bg-emerald-100 text-emerald-700', dot: 'bg-emerald-500' },
  blue: { bar: 'bg-blue-600', badge: 'bg-blue-100 text-blue-700', dot: 'bg-blue-500' },
  violet: { bar: 'bg-violet-600', badge: 'bg-violet-100 text-violet-700', dot: 'bg-violet-500' },
  orange: { bar: 'bg-orange-500', badge: 'bg-orange-100 text-orange-700', dot: 'bg-orange-500' },
};

const TrainResultsPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [activeSort, setActiveSort] = useState('departure');
  const [selectedClass, setSelectedClass] = useState('All');

  const from = searchParams.get('from') || 'NDLS';
  const to = searchParams.get('to') || 'CSTM';
  const date = searchParams.get('date') || new Date().toISOString().split('T')[0];
  const travelClass = searchParams.get('class') || 'All';
  const passengers = searchParams.get('passengers') || '1';

  const formattedDate = new Date(date).toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' });

  const trains = getMockTrains(from, to);

  return (
    <div className="bg-[#f5f7f9] min-h-screen">
      {/* ─── Results Header ─────────────────────────────────────────── */}
      <div className="bg-white border-b border-gray-100 shadow-sm sticky top-[70px] z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Route Info */}
            <div className="flex items-center gap-4">
              <button onClick={() => navigate('/trains')} className="text-gray-400 hover:text-emerald-600 transition-colors font-black text-sm">← Back</button>
              <div className="flex items-center gap-3">
                <span className="text-xl font-black text-text-main">{from}</span>
                <div className="flex items-center gap-2 text-text-muted">
                  <div className="w-8 h-[2px] bg-gray-300 rounded" />
                  <Train size={16} className="text-emerald-600" />
                  <div className="w-8 h-[2px] bg-gray-300 rounded" />
                </div>
                <span className="text-xl font-black text-text-main">{to}</span>
              </div>
              <div className="hidden md:flex items-center gap-2 text-[11px] text-text-muted font-black uppercase tracking-widest">
                <span>|</span>
                <span>{formattedDate}</span>
                <span>|</span>
                <span>{passengers} Pax</span>
              </div>
            </div>

            {/* Sort Options */}
            <div className="flex gap-2">
              {[
                { id: 'departure', label: 'Departure' },
                { id: 'duration', label: 'Duration' },
                { id: 'price', label: 'Price' },
                { id: 'arrival', label: 'Arrival' },
              ].map(opt => (
                <button
                  key={opt.id}
                  onClick={() => setActiveSort(opt.id)}
                  className={`px-4 py-2 rounded-xl text-[11px] font-black uppercase tracking-wider transition-all ${activeSort === opt.id ? 'bg-emerald-600 text-white shadow-lg' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 pb-20 mt-[70px]">
        {/* Class Filter */}
        <div className="flex items-center gap-3 mb-6 overflow-x-auto pb-2 scrollbar-hide">
          <span className="text-[11px] font-black text-text-muted uppercase tracking-widest shrink-0">Filter by class:</span>
          {['All', '1A', '2A', '3A', 'SL', 'CC'].map(cls => (
            <button
              key={cls}
              onClick={() => setSelectedClass(cls)}
              className={`px-5 py-2 rounded-xl text-[11px] font-black uppercase tracking-wider border transition-all shrink-0 ${selectedClass === cls ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-white text-text-muted border-gray-200 hover:border-emerald-400'}`}
            >
              {cls}
            </button>
          ))}
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filters Sidebar */}
          <aside className="lg:w-[260px] shrink-0">
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 sticky top-[160px]">
              <div className="flex items-center gap-2 mb-6">
                <Filter size={16} className="text-emerald-600" />
                <span className="text-[13px] font-black text-text-main uppercase tracking-widest">Filters</span>
              </div>

              {/* Train Type */}
              <div className="mb-6">
                <p className="text-[11px] font-black text-text-muted uppercase tracking-widest mb-3">Train Type</p>
                {['Rajdhani', 'Shatabdi', 'Duronto', 'Express', 'Superfast'].map(t => (
                  <label key={t} className="flex items-center gap-3 py-2 cursor-pointer group">
                    <input type="checkbox" className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500" />
                    <span className="text-[13px] font-bold text-text-main group-hover:text-emerald-600 transition-colors">{t}</span>
                  </label>
                ))}
              </div>

              {/* Departure Time */}
              <div className="border-t border-gray-100 pt-6 mb-6">
                <p className="text-[11px] font-black text-text-muted uppercase tracking-widest mb-3">Departure Time</p>
                {[
                  { label: 'Early Morning', sub: '00:00 – 06:00', icon: '🌙' },
                  { label: 'Morning', sub: '06:00 – 12:00', icon: '🌅' },
                  { label: 'Afternoon', sub: '12:00 – 18:00', icon: '☀️' },
                  { label: 'Night', sub: '18:00 – 24:00', icon: '🌃' },
                ].map(t => (
                  <label key={t.label} className="flex items-center gap-3 py-2 cursor-pointer group">
                    <input type="checkbox" className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500" />
                    <div>
                      <p className="text-[12px] font-black text-text-main group-hover:text-emerald-600 transition-colors">{t.icon} {t.label}</p>
                      <p className="text-[10px] font-bold text-text-muted">{t.sub}</p>
                    </div>
                  </label>
                ))}
              </div>

              {/* Amenities */}
              <div className="border-t border-gray-100 pt-6">
                <p className="text-[11px] font-black text-text-muted uppercase tracking-widest mb-3">Amenities</p>
                {['Pantry Car', 'Wi-Fi', 'Bedroll', 'Meals Included'].map(a => (
                  <label key={a} className="flex items-center gap-3 py-2 cursor-pointer group">
                    <input type="checkbox" className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500" />
                    <span className="text-[12px] font-bold text-text-main group-hover:text-emerald-600 transition-colors">{a}</span>
                  </label>
                ))}
              </div>
            </div>
          </aside>

          {/* Train Results */}
          <main className="flex-1 space-y-4">
            <div className="flex items-center justify-between mb-2">
              <h1 className="text-[13px] font-black text-text-main tracking-tight">
                {trains.length} Trains found · <span className="text-emerald-600">{from} → {to}</span>
              </h1>
              <div className="flex items-center gap-2 text-green-600 font-bold text-[10px] uppercase tracking-widest bg-green-50 px-3 py-1.5 rounded-xl border border-green-100">
                <ShieldCheck size={12} />
                Live Availability
              </div>
            </div>

            {trains.map(train => {
              const tc = TRAIN_COLORS[train.color];
              return (
                <div key={train.id} className="bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group">
                  {/* Top color bar */}
                  <div className={`h-1 ${tc.bar} w-full`} />

                  <div className="p-6">
                    {/* Train Name Row */}
                    <div className="flex items-center justify-between mb-5">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-2xl ${tc.bar} flex items-center justify-center`}>
                          <Train size={18} className="text-white" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="text-[16px] font-black text-text-main tracking-tight">{train.name}</h3>
                            <span className={`text-[9px] font-black px-2 py-0.5 rounded-lg uppercase tracking-wider ${tc.badge}`}>{train.type}</span>
                          </div>
                          <p className="text-[11px] font-bold text-text-muted">#{train.number} · Runs: {train.days}</p>
                        </div>
                      </div>
                      <div className="hidden md:flex items-center gap-1 text-amber-500">
                        <Star size={14} fill="currentColor" />
                        <span className="text-[13px] font-black text-text-main">{train.rating}</span>
                      </div>
                    </div>

                    {/* Timings Row */}
                    <div className="flex items-center gap-6 mb-6">
                      <div>
                        <p className="text-2xl font-black text-text-main">{train.departureTime}</p>
                        <p className="text-[11px] font-black text-text-muted uppercase">{from}</p>
                      </div>
                      <div className="flex-1 flex flex-col items-center gap-1">
                        <p className="text-[10px] font-black text-text-muted uppercase tracking-widest">{train.duration}</p>
                        <div className="flex items-center w-full gap-2">
                          <div className={`w-2 h-2 rounded-full ${tc.dot} shrink-0`} />
                          <div className="flex-1 h-[2px] bg-gray-200 rounded relative overflow-hidden">
                            <div className={`absolute inset-y-0 left-0 w-1/2 ${tc.bar} opacity-30 rounded`} />
                          </div>
                          <Train size={14} className={`shrink-0 ${tc.bar.replace('bg-', 'text-')}`} />
                          <div className="flex-1 h-[2px] bg-gray-200 rounded" />
                          <div className={`w-2 h-2 rounded-full ${tc.dot} shrink-0`} />
                        </div>
                        <p className="text-[10px] font-black text-emerald-600">Runs on time</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-black text-text-main">{train.arrivalTime}</p>
                        <p className="text-[11px] font-black text-text-muted uppercase">{to}</p>
                      </div>
                    </div>

                    {/* Features + Classes */}
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-t border-gray-50 pt-5">
                      {/* Features */}
                      <div className="flex flex-wrap gap-2">
                        {train.features.map(f => (
                          <span key={f} className="text-[10px] font-black text-text-muted bg-gray-50 border border-gray-100 px-3 py-1.5 rounded-xl uppercase tracking-wider">{f}</span>
                        ))}
                      </div>

                      {/* Class Fare Buttons */}
                      <div className="flex flex-wrap gap-3">
                        {train.classes.map(cls => (
                          <button
                            key={cls.type}
                            onClick={() => navigate(`/trains/details/${train.id}`, { state: { train, selectedClass: cls, from, to, date, passengers } })}
                            className={`flex flex-col items-center px-5 py-3 rounded-2xl border-2 transition-all hover:scale-105 active:scale-95 hover:shadow-lg font-black ${CLASS_COLORS[cls.type] || 'bg-gray-100 text-gray-700 border-gray-200'}`}
                          >
                            <span className="text-[13px] uppercase tracking-wider">{cls.type}</span>
                            <span className="text-[15px]">₹{cls.price.toLocaleString()}</span>
                            <span className="text-[9px] opacity-70">{cls.available} avail.</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* No Results */}
            {trains.length === 0 && (
              <div className="bg-white p-20 rounded-3xl border border-gray-100 text-center shadow-sm">
                <Info size={40} className="mx-auto text-gray-300 mb-4" />
                <h3 className="text-xl font-black text-gray-800">No trains found</h3>
                <p className="text-gray-400 font-bold mt-2">Try changing the date or route.</p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default TrainResultsPage;
