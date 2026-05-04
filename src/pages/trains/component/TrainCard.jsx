import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Train, Star, ChevronDown, Clock, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';

const CLASS_COLORS = {
  '1A': 'bg-purple-100 text-purple-700 border-purple-200',
  '2A': 'bg-blue-100 text-blue-700 border-blue-200',
  '3A': 'bg-emerald-100 text-emerald-700 border-emerald-200',
  'SL': 'bg-orange-100 text-orange-700 border-orange-200',
  'CC': 'bg-cyan-100 text-cyan-700 border-cyan-200',
};

const TRAIN_COLORS = {
  emerald: { bar: 'bg-emerald-600', badge: 'bg-emerald-100 text-emerald-700', dot: 'bg-emerald-500', text: 'text-emerald-600' },
  blue: { bar: 'bg-blue-600', badge: 'bg-blue-100 text-blue-700', dot: 'bg-blue-500', text: 'text-blue-600' },
  violet: { bar: 'bg-violet-600', badge: 'bg-violet-100 text-violet-700', dot: 'bg-violet-500', text: 'text-violet-600' },
  orange: { bar: 'bg-orange-500', badge: 'bg-orange-100 text-orange-700', dot: 'bg-orange-500', text: 'text-orange-600' },
};

const TrainCard = ({ train, from, to, date, passengers }) => {
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);

  const tc = TRAIN_COLORS[train?.color] || TRAIN_COLORS.emerald;

  return (
    <div className="group bg-white rounded-3xl shadow-[0_4px_25px_rgba(0,0,0,0.04)] border border-gray-100 hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] transition-all duration-500 mb-6 font-sans relative overflow-hidden">
      {/* Subtle accent gradient side bar */}
      <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${tc.bar} opacity-60`} />

      <div className="p-8">
        {/* Train Name & Route Info Row */}
        <div className="flex items-start justify-between mb-8">
          <div className="flex items-center gap-5">
            <div className={`w-14 h-14 rounded-2xl ${tc.bar} flex items-center justify-center shrink-0 shadow-lg shadow-blue-500/10`}>
              <Train size={24} className="text-white" />
            </div>
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h3 className="text-[19px] font-black text-slate-900 tracking-tight leading-none">{train?.name}</h3>
                <span className={`text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest ${tc.badge} border border-blue-100/50`}>{train?.type}</span>
              </div>
              <p className="text-[12px] font-bold text-gray-400 flex items-center gap-2">
                <span className="text-blue-600">#{train?.number}</span>
                <span className="w-1 h-1 rounded-full bg-gray-200" />
                Runs on: <span className="text-slate-600">{train?.days}</span>
              </p>
            </div>
          </div>
          
          <div className="flex flex-col items-end">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-amber-50 rounded-full border border-amber-100 mb-2">
              <Star size={14} fill="#f59e0b" className="text-amber-500" />
              <span className="text-[13px] font-black text-slate-900">{train?.rating}</span>
            </div>
            <p className={`text-[11px] font-black ${tc.text} uppercase tracking-widest flex items-center gap-1.5`}>
              <Zap size={10} className="fill-current" /> Fast Express
            </p>
          </div>
        </div>

        {/* Cinematic Timings Row */}
        <div className="flex items-center justify-between gap-12 mb-8 bg-gray-50/50 rounded-2xl p-6 border border-gray-50">
          <div className="flex flex-col items-start min-w-[120px]">
            <p className="text-3xl font-black text-slate-900 tracking-tighter mb-1">{train?.departureTime}</p>
            <p className="text-[14px] font-black text-slate-500 uppercase tracking-tight">{from || train?.from}</p>
            <p className="text-[11px] font-bold text-gray-400 mt-1">{new Date(date).toLocaleDateString('en-US', { weekday: 'short', day: 'numeric', month: 'short' })}</p>
          </div>

          <div className="flex-1 flex flex-col items-center">
            <p className="text-[12px] font-black text-blue-600/60 uppercase tracking-[0.2em] mb-3 flex items-center gap-2">
              <Clock size={12} strokeWidth={3} /> {train?.duration}
            </p>
            <div className="relative flex items-center w-full px-4">
              <div className={`w-3 h-3 rounded-full ${tc.dot} border-2 border-white shadow-md z-10`} />
              <div className="flex-1 h-[2px] bg-gray-200 relative mx-1">
                <div className={`absolute inset-y-0 left-0 w-3/4 ${tc.bar} opacity-40 rounded-full`} />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-2">
                   <Train size={16} className={`${tc.text} rotate-0`} />
                </div>
              </div>
              <div className={`w-3 h-3 rounded-full ${tc.dot} border-2 border-white shadow-md z-10`} />
            </div>
            <div className="mt-3 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <p className="text-[11px] font-black text-emerald-600 uppercase tracking-widest italic">Runs on time</p>
            </div>
          </div>

          <div className="flex flex-col items-end min-w-[120px] text-right">
            <p className="text-3xl font-black text-slate-900 tracking-tighter mb-1">{train?.arrivalTime}</p>
            <p className="text-[14px] font-black text-slate-500 uppercase tracking-tight">{to || train?.to}</p>
            <p className="text-[11px] font-bold text-gray-400 mt-1">{new Date(date).toLocaleDateString('en-US', { weekday: 'short', day: 'numeric', month: 'short' })}</p>
          </div>
        </div>

        {/* Classes Selectors Row */}
        <div className="flex flex-col md:flex-row items-end md:items-center justify-between gap-6 border-t border-gray-50 pt-8">
          <div className="flex flex-wrap gap-2.5">
            {train?.features?.map((f) => (
              <span key={f} className="text-[11px] font-black text-slate-500 bg-white border border-gray-100 px-4 py-2 rounded-xl uppercase tracking-wider shadow-sm hover:border-blue-200 transition-colors">
                {f}
              </span>
            ))}
          </div>
          
          <div className="flex flex-wrap gap-4">
            {train?.classes?.map((cls) => (
              <button
                key={cls.type}
                onClick={() => navigate(`/trains/details/${train.id}`, { state: { train, selectedClass: cls, from, to, date, passengers } })}
                className={`flex flex-col items-center min-w-[90px] px-4 py-4 rounded-3xl border-2 transition-all duration-500 hover:scale-[1.08] active:scale-95 group/btn relative overflow-hidden ${CLASS_COLORS[cls.type] || 'bg-gray-100 text-gray-700 border-gray-200'}`}
              >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500" />
                <span className="text-[12px] font-black uppercase tracking-widest mb-1 relative z-10">{cls.type}</span>
                <span className="text-[18px] font-black relative z-10 mb-1">₹{cls.price.toLocaleString()}</span>
                <span className="text-[10px] font-bold opacity-80 flex items-center gap-1 relative z-10">
                   <CheckCircle2 size={10} /> {cls.available} Avail
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Modern Expand Footer */}
      <div
        className="bg-gray-50/80 backdrop-blur-sm py-4 flex items-center px-8 cursor-pointer border-t border-gray-100 group transition-all hover:bg-blue-50/50"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <span className="text-[12px] font-black text-blue-600 flex items-center gap-2 uppercase tracking-widest">
          View Station Details & Food
          <ChevronDown size={14} strokeWidth={3} className={`transition-transform duration-500 ${isExpanded ? 'rotate-180' : ''}`} />
        </span>
        <div className="ml-auto flex items-center gap-6">
           <div className="flex items-center gap-3">
              <ShieldCheck size={16} className="text-emerald-500" />
              <span className="text-[11px] font-black text-slate-800 uppercase tracking-widest">Trip Gurantee Included</span>
           </div>
           <div className="h-4 w-[1px] bg-gray-200" />
           <div className="text-[11px] font-black text-emerald-600 flex items-center gap-2 bg-white px-4 py-1.5 rounded-full border border-emerald-100 shadow-sm">
             <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
             Live Status
           </div>
        </div>
      </div>

      {isExpanded && (
        <div className="p-10 bg-white border-t border-gray-100 grid grid-cols-1 md:grid-cols-4 gap-8 animate-fade-in">
          <div>
            <span className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-3 block">Train Information</span>
            <p className="text-[14px] font-black text-slate-900">Superfast Express</p>
            <p className="text-[12px] font-bold text-gray-500 mt-1">LHB Rake · Electric Loco</p>
          </div>
          <div>
            <span className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-3 block">Pantry & Food</span>
            <p className="text-[14px] font-black text-slate-900">E-Catering Available</p>
            <p className="text-[12px] font-bold text-gray-500 mt-1">Veg/Non-Veg Thali available</p>
          </div>
          <div>
            <span className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-3 block">Station Stops</span>
            <p className="text-[14px] font-black text-slate-900">8 Intermediate Stops</p>
            <p className="text-[12px] font-bold text-emerald-600 mt-1 hover:underline cursor-pointer">View full route →</p>
          </div>
          <div>
            <button className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black text-[13px] uppercase tracking-widest hover:bg-black transition-all shadow-xl">
               Check Full Schedule
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrainCard;
