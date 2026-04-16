import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Train, Star, ChevronDown, Clock, CheckCircle2, ShieldCheck } from 'lucide-react';

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
    <div className="bg-white shadow-[0_2px_10px_rgb(0,0,0,0.06)] border border-gray-100 hover:shadow-md transition-all duration-300 mb-4 font-sans relative rounded-xl overflow-hidden">
      {/* Top color bar */}
      <div className={`h-1 ${tc.bar} w-full`} />

      <div className="p-5 md:p-6">
        {/* Train Name Row */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-2xl ${tc.bar} flex items-center justify-center shrink-0`}>
              <Train size={18} className="text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-[15px] font-black text-gray-900 tracking-tight">{train?.name}</h3>
                <span className={`text-[9px] font-black px-2 py-0.5 rounded-lg uppercase tracking-wider ${tc.badge}`}>{train?.type}</span>
              </div>
              <p className="text-[11px] font-bold text-gray-500">#{train?.number} · Runs: {train?.days}</p>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-1 text-amber-500">
            <Star size={14} fill="currentColor" />
            <span className="text-[13px] font-black text-gray-900">{train?.rating}</span>
          </div>
        </div>

        {/* Timings Row */}
        <div className="flex items-center gap-4 mb-5">
          <div>
            <p className="text-2xl font-black text-gray-900">{train?.departureTime}</p>
            <p className="text-[11px] font-black text-gray-500 uppercase">{from || train?.from}</p>
          </div>
          <div className="flex-1 flex flex-col items-center gap-1">
            <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest flex items-center gap-1">
              <Clock size={10} /> {train?.duration}
            </p>
            <div className="flex items-center w-full gap-2">
              <div className={`w-2 h-2 rounded-full ${tc.dot} shrink-0`} />
              <div className="flex-1 h-[2px] bg-gray-200 rounded relative overflow-hidden">
                <div className={`absolute inset-y-0 left-0 w-1/2 ${tc.bar} opacity-30 rounded`} />
              </div>
              <Train size={14} className={`shrink-0 ${tc.text}`} />
              <div className="flex-1 h-[2px] bg-gray-200 rounded" />
              <div className={`w-2 h-2 rounded-full ${tc.dot} shrink-0`} />
            </div>
            <p className={`text-[10px] font-black ${tc.text}`}>Runs on time</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-black text-gray-900">{train?.arrivalTime}</p>
            <p className="text-[11px] font-black text-gray-500 uppercase">{to || train?.to}</p>
          </div>
        </div>

        {/* Features + Classes */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-t border-gray-50 pt-4">
          <div className="flex flex-wrap gap-2">
            {train?.features?.map((f) => (
              <span key={f} className="text-[10px] font-black text-gray-500 bg-gray-50 border border-gray-100 px-3 py-1.5 rounded-xl uppercase tracking-wider">
                {f}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap gap-3">
            {train?.classes?.map((cls) => (
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

      {/* Expand Footer */}
      <div
        className="bg-gray-50 py-2.5 flex items-center px-6 cursor-pointer border-t border-gray-100 group transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <span className="text-[11px] font-bold text-emerald-600 flex items-center gap-1">
          Train Details
          <ChevronDown size={14} className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
        </span>
        <div className="ml-auto text-[10px] font-bold text-green-600 flex items-center gap-1 px-2 py-0.5 bg-green-50 rounded-md">
          <CheckCircle2 size={12} /> Live Availability
        </div>
      </div>

      {isExpanded && (
        <div className="p-6 bg-white border-t border-gray-100">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Runs on</span>
              <p className="text-[12px] font-black text-gray-800 mt-1">{train?.days}</p>
            </div>
            <div>
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Train Type</span>
              <p className="text-[12px] font-black text-gray-800 mt-1">{train?.type}</p>
            </div>
            <div>
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Duration</span>
              <p className="text-[12px] font-black text-gray-800 mt-1">{train?.duration}</p>
            </div>
            <div>
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Rating</span>
              <p className="text-[12px] font-black text-gray-800 mt-1 flex items-center gap-1">
                <Star size={11} fill="#f59e0b" className="text-amber-400" /> {train?.rating} / 5
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrainCard;
