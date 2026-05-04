import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Train, Calendar, Users, ChevronDown, ArrowLeftRight, Search, Check } from 'lucide-react';

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

const TrainResultsHeader = ({ from: fromProp, to: toProp, date: dateProp, passengers: passProp, travelClass: classProp }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [query, setQuery] = useState('');
  const dropdownRef = useRef(null);

  const [from, setFrom] = useState(
    POPULAR_STATIONS.find(s => s.code === fromProp) ||
    { code: fromProp || 'NDLS', name: 'New Delhi', full: 'New Delhi Railway Station' }
  );
  const [to, setTo] = useState(
    POPULAR_STATIONS.find(s => s.code === toProp) ||
    { code: toProp || 'CSTM', name: 'Mumbai CST', full: 'Chhatrapati Shivaji Terminus' }
  );
  const [date, setDate] = useState(dateProp || new Date().toISOString().split('T')[0]);
  const [passengers, setPassengers] = useState(passProp || '1');
  const [travelClass, setTravelClass] = useState(classProp || 'Sleeper (SL)');

  const filtered = POPULAR_STATIONS.filter(s =>
    s.name.toLowerCase().includes(query.toLowerCase()) ||
    s.code.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = () => {
    navigate(`/trains/results?from=${from.code}&to=${to.code}&date=${date}&class=${travelClass}&passengers=${passengers}`);
    setActiveDropdown(null);
  };

  return (
    <div className="bg-white/80 backdrop-blur-xl border-b border-gray-200 sticky top-[80px] z-[1000] py-4 shadow-sm">
      <div className="max-w-7xl mx-auto px-6">

        {/* Main Search Row */}
        <div className="flex items-center gap-3 relative" ref={dropdownRef}>

          {/* FROM */}
          <div
            className={`flex-1 bg-gray-50/50 rounded-2xl border border-gray-100 px-5 py-3 cursor-pointer flex flex-col justify-center h-[65px] transition-all hover:bg-white hover:border-blue-300 hover:shadow-md ${activeDropdown === 'from' ? 'bg-white border-blue-500 ring-2 ring-blue-500/10' : ''}`}
            onClick={() => { setActiveDropdown('from'); setQuery(''); }}
          >
            <span className="text-[11px] font-black text-blue-600 uppercase tracking-widest mb-1">From</span>
            <span className="text-[17px] font-black text-slate-900 truncate tracking-tight">{from.name} <span className="text-gray-400 font-bold ml-1">[{from.code}]</span></span>
          </div>

          {/* Swap */}
          <button
            className="z-10 -mx-5 w-10 h-10 bg-white rounded-full border border-gray-100 flex items-center justify-center text-blue-600 shadow-lg hover:shadow-xl transition-all active:scale-90 hover:scale-110"
            onClick={() => { const tmp = from; setFrom(to); setTo(tmp); }}
          >
            <ArrowLeftRight size={18} strokeWidth={3} />
          </button>

          {/* TO */}
          <div
            className={`flex-1 bg-gray-50/50 rounded-2xl border border-gray-100 px-5 py-3 cursor-pointer flex flex-col justify-center h-[65px] transition-all hover:bg-white hover:border-blue-300 hover:shadow-md ${activeDropdown === 'to' ? 'bg-white border-blue-500 ring-2 ring-blue-500/10' : ''}`}
            onClick={() => { setActiveDropdown('to'); setQuery(''); }}
          >
            <span className="text-[11px] font-black text-blue-600 uppercase tracking-widest mb-1">To</span>
            <span className="text-[17px] font-black text-slate-900 truncate tracking-tight">{to.name} <span className="text-gray-400 font-bold ml-1">[{to.code}]</span></span>
          </div>

          {/* Date */}
          <div className="w-52 bg-gray-50/50 rounded-2xl border border-gray-100 px-5 py-3 cursor-pointer flex flex-col justify-center h-[65px] transition-all hover:bg-white hover:border-blue-300 hover:shadow-md relative">
            <span className="text-[11px] font-black text-blue-600 uppercase tracking-widest mb-1">Travel Date</span>
            <div className="flex items-center gap-2">
              <Calendar size={16} className="text-blue-500" />
              <span className="text-[17px] font-black text-slate-900 tracking-tight">
                {new Date(date).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
              </span>
            </div>
            <input
              type="date"
              value={date}
              onChange={e => setDate(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
          </div>

          {/* Class */}
          <div
            className={`w-52 bg-gray-50/50 rounded-2xl border border-gray-100 px-5 py-3 cursor-pointer flex flex-col justify-center h-[65px] transition-all hover:bg-white hover:border-blue-300 hover:shadow-md ${activeDropdown === 'class' ? 'bg-white border-blue-500 ring-2 ring-blue-500/10' : ''}`}
            onClick={() => setActiveDropdown(activeDropdown === 'class' ? null : 'class')}
          >
            <span className="text-[11px] font-black text-blue-600 uppercase tracking-widest mb-1">Class</span>
            <div className="flex items-center justify-between">
              <span className="text-[17px] font-black text-slate-900 truncate tracking-tight">
                {travelClass.split('(')[0].trim()}
              </span>
              <ChevronDown size={16} className={`text-blue-500 transition-transform ${activeDropdown === 'class' ? 'rotate-180' : ''}`} />
            </div>
          </div>

          {/* Passengers */}
          <div className={`w-32 bg-gray-50/50 rounded-2xl border border-gray-100 px-5 py-3 cursor-pointer flex flex-col justify-center h-[65px] transition-all hover:bg-white hover:border-blue-300 hover:shadow-md ${activeDropdown === 'pax' ? 'bg-white border-blue-500 ring-2 ring-blue-500/10' : ''}`}
            onClick={() => setActiveDropdown(activeDropdown === 'pax' ? null : 'pax')}
          >
            <span className="text-[11px] font-black text-blue-600 uppercase tracking-widest mb-1">Pass.</span>
            <div className="flex items-center gap-2">
              <Users size={16} className="text-blue-500" />
              <span className="text-[17px] font-black text-slate-900">{passengers} Pax</span>
            </div>
          </div>

          {/* Search Button */}
          <button
            onClick={handleSearch}
            className="bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white px-8 h-[65px] rounded-2xl font-black text-[16px] uppercase tracking-widest shadow-[0_10px_30px_-10px_rgba(37,99,235,0.4)] active:scale-95 transition-all hover:scale-[1.02]"
          >
            SEARCH
          </button>

          {/* Dropdowns */}
          {activeDropdown && (
            <div className="absolute top-[65px] z-[1001]">
              {(activeDropdown === 'from' || activeDropdown === 'to') && (
                <div className={`absolute ${activeDropdown === 'from' ? 'left-0' : 'left-[200px]'} w-[360px] bg-white shadow-[0_20px_100px_rgba(0,0,0,0.3)] rounded-xl overflow-hidden border border-gray-100`}>
                  <div className="p-4 border-b border-gray-100 flex items-center gap-3">
                    <Search size={16} className="text-gray-400" />
                    <input
                      autoFocus
                      type="text"
                      placeholder="Search station or city..."
                      className="flex-1 bg-transparent border-none outline-none text-[13px] font-bold text-gray-800 placeholder:text-gray-300"
                      value={query}
                      onChange={e => setQuery(e.target.value)}
                    />
                  </div>
                  <div className="max-h-[320px] overflow-y-auto">
                    {filtered.map(s => (
                      <div
                        key={s.code}
                        onClick={() => {
                          if (activeDropdown === 'from') { setFrom(s); setActiveDropdown('to'); }
                          else { setTo(s); setActiveDropdown(null); }
                          setQuery('');
                        }}
                        className="flex items-center gap-3 p-3 cursor-pointer hover:bg-emerald-50 group"
                      >
                        <div className="w-10 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-[10px] font-black text-gray-500 group-hover:bg-emerald-100 group-hover:text-emerald-700 shrink-0">
                          {s.code}
                        </div>
                        <div>
                          <p className="text-[13px] font-black text-gray-800 group-hover:text-emerald-700">{s.name}</p>
                          <p className="text-[10px] font-bold text-gray-400">{s.full}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeDropdown === 'class' && (
                <div className="absolute right-[200px] w-56 bg-white shadow-[0_10px_30px_rgba(0,0,0,0.1)] rounded-xl border border-gray-100 overflow-hidden">
                  {TRAIN_CLASSES.map(cls => (
                    <div
                      key={cls}
                      className="px-4 py-3 text-[13px] font-black text-gray-700 hover:bg-gray-50 cursor-pointer flex items-center justify-between"
                      onClick={() => { setTravelClass(cls); setActiveDropdown(null); }}
                    >
                      {cls}
                      {travelClass === cls && <Check size={16} className="text-emerald-600" />}
                    </div>
                  ))}
                </div>
              )}

              {activeDropdown === 'pax' && (
                <div className="absolute right-[100px] w-48 bg-white shadow-[0_10px_30px_rgba(0,0,0,0.1)] rounded-xl border border-gray-100 p-4">
                  <p className="text-[11px] font-black text-gray-500 uppercase tracking-widest mb-3">Passengers</p>
                  <div className="flex items-center gap-4">
                    <button onClick={() => setPassengers(p => Math.max(1, parseInt(p) - 1))} className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center font-black text-gray-700 hover:border-emerald-400">-</button>
                    <span className="text-[18px] font-black text-gray-900">{passengers}</span>
                    <button onClick={() => setPassengers(p => Math.min(6, parseInt(p) + 1))} className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center font-black text-gray-700 hover:border-emerald-400">+</button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrainResultsHeader;
