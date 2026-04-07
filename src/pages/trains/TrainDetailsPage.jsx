import React, { useState } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import {
  Train, Clock, Star, MapPin, ShieldCheck, Coffee, Wifi,
  Users, ChevronLeft, ArrowRight, CheckCircle2, Info
} from 'lucide-react';

const CLASS_COLORS = {
  '1A': { bg: 'bg-purple-600', light: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200' },
  '2A': { bg: 'bg-blue-600', light: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' },
  '3A': { bg: 'bg-emerald-600', light: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200' },
  'SL': { bg: 'bg-orange-500', light: 'bg-orange-50', text: 'text-orange-700', border: 'border-orange-200' },
  'CC': { bg: 'bg-cyan-600', light: 'bg-cyan-50', text: 'text-cyan-700', border: 'border-cyan-200' },
};

const TrainDetailsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();

  const { train, selectedClass, from, to, date, passengers } = location.state || {
    train: {
      id: 't1', name: 'Rajdhani Express', number: '12301',
      departureTime: '16:55', arrivalTime: '10:00', duration: '17h 05m',
      from: 'NDLS', to: 'CSTM', rating: 4.8, type: 'Rajdhani',
      features: ['Pantry Car', 'Bedroll', 'Wi-Fi'],
      classes: [
        { type: '1A', price: 4575, available: 6 },
        { type: '2A', price: 2710, available: 18 },
        { type: '3A', price: 1905, available: 42 },
      ]
    },
    selectedClass: { type: '2A', price: 2710, available: 18 },
    from: 'NDLS', to: 'CSTM', date: new Date().toISOString().split('T')[0], passengers: '1'
  };

  const [activeClass, setActiveClass] = useState(selectedClass || train?.classes[0]);
  const totalAmount = (activeClass?.price || 0) * parseInt(passengers || 1);
  const colorTheme = CLASS_COLORS[activeClass?.type] || CLASS_COLORS['2A'];
  const formattedDate = new Date(date).toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <div className="bg-[#f2f2f2] min-h-screen font-sans pb-20 pt-[80px]">
      <div className="max-w-7xl mx-auto px-6 pt-8">

        {/* Back Button */}
        <button onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-[13px] font-black text-text-muted hover:text-emerald-600 transition-colors mb-8 group">
          <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          Back to Results
        </button>

        <div className="flex flex-col lg:flex-row gap-10 items-start">

          {/* ─── Left: Train Details ─────────────────────────────────── */}
          <div className="flex-1 space-y-6">

            {/* Train Header Card */}
            <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
              <div className={`h-2 ${colorTheme.bg} w-full`} />
              <div className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`w-12 h-12 rounded-2xl ${colorTheme.bg} flex items-center justify-center`}>
                        <Train size={20} className="text-white" />
                      </div>
                      <div>
                        <h1 className="text-2xl font-black text-gray-900 tracking-tight">{train?.name}</h1>
                        <p className="text-[12px] font-bold text-text-muted">Train #{train?.number}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 bg-amber-50 px-4 py-2 rounded-2xl border border-amber-100">
                    <Star size={16} fill="#f59e0b" className="text-amber-500" />
                    <span className="text-[15px] font-black text-text-main">{train?.rating}</span>
                  </div>
                </div>

                {/* Journey Timeline */}
                <div className="flex items-center justify-between py-8 border-y border-gray-50">
                  <div className="text-center">
                    <p className="text-4xl font-black text-gray-900">{train?.departureTime}</p>
                    <p className={`text-[13px] font-black mt-1 ${colorTheme.text}`}>{from}</p>
                    <p className="text-[11px] font-bold text-text-muted mt-0.5">{formattedDate}</p>
                  </div>

                  <div className="flex flex-col items-center gap-2 flex-1 mx-6">
                    <div className="flex items-center w-full gap-3">
                      <div className={`w-3 h-3 rounded-full ${colorTheme.bg}`} />
                      <div className="flex-1 relative">
                        <div className="h-[3px] bg-gray-200 rounded w-full" />
                        <div className={`absolute inset-y-0 left-0 w-1/3 ${colorTheme.bg} opacity-40 rounded`} />
                      </div>
                      <div className={`w-8 h-8 rounded-full ${colorTheme.bg} flex items-center justify-center`}>
                        <Train size={14} className="text-white" />
                      </div>
                      <div className="flex-1 relative">
                        <div className="h-[3px] bg-gray-200 rounded w-full" />
                      </div>
                      <div className={`w-3 h-3 rounded-full ${colorTheme.bg}`} />
                    </div>
                    <div className="flex items-center gap-2 text-text-muted text-[11px] font-black uppercase tracking-widest">
                      <Clock size={12} />
                      {train?.duration}
                    </div>
                  </div>

                  <div className="text-center">
                    <p className="text-4xl font-black text-gray-900">{train?.arrivalTime}</p>
                    <p className={`text-[13px] font-black mt-1 ${colorTheme.text}`}>{to}</p>
                    <p className="text-[11px] font-bold text-text-muted mt-0.5">Next Day</p>
                  </div>
                </div>

                {/* Features */}
                <div className="flex flex-wrap gap-2 pt-6">
                  {train?.features.map(f => (
                    <span key={f} className={`${colorTheme.light} ${colorTheme.text} border ${colorTheme.border} text-[11px] font-black px-4 py-2 rounded-xl uppercase tracking-wider`}>
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Class Selection */}
            <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-8">
              <h2 className="text-lg font-black text-gray-900 uppercase tracking-tight mb-6">Select Travel Class</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {train?.classes.map(cls => {
                  const c = CLASS_COLORS[cls.type] || CLASS_COLORS['2A'];
                  const isActive = activeClass?.type === cls.type;
                  return (
                    <button
                      key={cls.type}
                      onClick={() => setActiveClass(cls)}
                      className={`rounded-2xl p-5 border-2 transition-all duration-300 text-center ${isActive ? `${c.bg} text-white border-transparent shadow-xl scale-105` : `bg-white ${c.text} ${c.border} hover:scale-105`}`}
                    >
                      <div className="text-2xl font-black">{cls.type}</div>
                      <div className="text-xl font-black mt-1">₹{cls.price.toLocaleString()}</div>
                      <div className={`text-[10px] font-black uppercase tracking-wider mt-1 ${isActive ? 'text-white/70' : 'opacity-60'}`}>
                        {cls.available} seats avail.
                      </div>
                      {isActive && <CheckCircle2 size={16} className="mx-auto mt-2 text-white" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Seat Layout Info */}
            <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-8">
              <h2 className="text-lg font-black text-gray-900 uppercase tracking-tight mb-6">Coach & Seat Info</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { label: 'Total Coaches', value: '18', icon: <Train size={20} className={colorTheme.text} /> },
                  { label: 'Seats Per Coach', value: activeClass?.type === '1A' ? '24' : activeClass?.type === '2A' ? '48' : '72', icon: <Users size={20} className={colorTheme.text} /> },
                  { label: 'Charting Status', value: 'Not Charted', icon: <Info size={20} className={colorTheme.text} /> },
                ].map((item, i) => (
                  <div key={i} className={`${colorTheme.light} rounded-2xl p-6 border ${colorTheme.border}`}>
                    <div className="flex items-center gap-2 mb-2">
                      {item.icon}
                      <span className="text-[11px] font-black text-text-muted uppercase tracking-widest">{item.label}</span>
                    </div>
                    <div className={`text-2xl font-black ${colorTheme.text}`}>{item.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ─── Right: Price Summary ──────────────────────────────────── */}
          <div className="lg:w-[360px] shrink-0 sticky top-[100px]">
            <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden mb-6">
              <div className={`${colorTheme.bg} p-6 text-white`}>
                <p className="text-[11px] font-black uppercase tracking-widest opacity-80 mb-1">Total Fare</p>
                <h2 className="text-4xl font-black tracking-tight italic">₹{totalAmount.toLocaleString()}</h2>
                <p className="text-[12px] font-bold opacity-70 mt-1">{passengers} passenger(s) · {activeClass?.type} class</p>
              </div>

              <div className="p-6 space-y-4">
                <div className="flex justify-between text-[13px]">
                  <span className="font-bold text-text-muted">Base Fare ({activeClass?.type})</span>
                  <span className="font-black text-text-main">₹{activeClass?.price.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-[13px]">
                  <span className="font-bold text-text-muted">Reservation Fee</span>
                  <span className="font-black text-text-main">₹40</span>
                </div>
                <div className="flex justify-between text-[13px] text-green-600">
                  <span className="font-bold">WingTrip Discount</span>
                  <span className="font-black">−₹100</span>
                </div>
                <div className="border-t border-gray-100 pt-4 flex justify-between">
                  <span className="font-black text-[13px] text-text-main">Payable Amount</span>
                  <span className={`text-2xl font-black ${colorTheme.text}`}>₹{(totalAmount + 40 - 100).toLocaleString()}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => navigate('/trains/review', { state: { train, selectedClass: activeClass, from, to, date, passengers, total: totalAmount + 40 - 100 } })}
              className={`w-full ${colorTheme.bg} hover:opacity-90 text-white py-5 rounded-2xl font-black text-[16px] uppercase tracking-[0.2em] shadow-2xl active:scale-[0.98] transition-all flex items-center justify-center gap-3`}
            >
              BOOK NOW
              <ArrowRight size={20} strokeWidth={3} />
            </button>

            <div className="mt-4 flex items-center gap-2 justify-center text-[11px] font-black text-text-muted uppercase tracking-widest">
              <ShieldCheck size={14} className="text-emerald-600" />
              100% Secure · Instant Confirmation
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default TrainDetailsPage;
