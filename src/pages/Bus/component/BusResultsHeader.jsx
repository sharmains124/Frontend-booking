import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { 
  Bus, 
  MapPin, 
  Calendar, 
  ChevronDown, 
  ArrowLeftRight, 
  Search, 
  X,
  Check
} from 'lucide-react';

const BusResultsHeader = ({ origin, destination, date }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Local search state synced with props/params
  const [searchData, setSearchData] = useState({
    from: origin || 'New Delhi',
    to: destination || 'Manali'
  });

  const [travelDate, setTravelDate] = useState(date ? new Date(date) : new Date());

  const dropdownRef = useRef(null);

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

  const handleSearch = () => {
    const formattedDate = travelDate ? travelDate.toISOString().split('T')[0] : '';
    const query = `?from=${searchData.from}&to=${searchData.to}&date=${formattedDate}`;
    navigate('/bus/results' + query);
    setActiveDropdown(null);
  };

  return (
    <div className="bg-[#f2f2f2] border-b border-gray-200 sticky top-[80px] z-[1000] py-3 shadow-md">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Main Search Inputs Grid */}
        <div className="flex items-center gap-2 relative">
          
          {/* From City */}
          <div 
            className="flex-1 bg-white rounded-lg border border-gray-200 px-4 py-2 cursor-pointer flex flex-col justify-center h-[55px] hover:border-blue-400 transition-colors relative shadow-sm"
            onClick={() => setActiveDropdown('from')}
          >
            <span className="text-[10px] font-black text-gray-400 uppercase mb-0.5 tracking-widest">From</span>
            <span className="text-[14px] font-black text-gray-900 truncate tracking-tight">{searchData.from}</span>
          </div>

          {/* Swap Icon */}
          <button 
            className="z-10 -mx-3 w-8 h-8 bg-white rounded-full border border-gray-100 flex items-center justify-center text-blue-500 shadow-md hover:shadow-lg transition-all active:scale-90"
            onClick={() => setSearchData({ from: searchData.to, to: searchData.from })}
          >
            <ArrowLeftRight size={14} strokeWidth={3} />
          </button>

          {/* To City */}
          <div 
            className="flex-1 bg-white rounded-lg border border-gray-200 px-4 py-2 cursor-pointer flex flex-col justify-center h-[55px] hover:border-blue-400 transition-colors shadow-sm"
            onClick={() => setActiveDropdown('to')}
          >
            <span className="text-[10px] font-black text-gray-400 uppercase mb-0.5 tracking-widest">To</span>
            <span className="text-[14px] font-black text-gray-900 truncate tracking-tight">{searchData.to}</span>
          </div>

          {/* Travel Date */}
          <div 
            className="w-48 bg-white rounded-lg border border-gray-200 px-4 py-2 cursor-pointer flex flex-col justify-center h-[55px] hover:border-blue-400 transition-colors shadow-sm"
            onClick={() => setActiveDropdown('calendar')}
          >
            <span className="text-[10px] font-black text-gray-400 uppercase mb-0.5 tracking-widest">Date of Journey</span>
            <span className="text-[14px] font-black text-gray-900">
               {travelDate?.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
            </span>
          </div>

          {/* Search Button */}
          <button 
            onClick={handleSearch}
            className="bg-[#2196f3] hover:bg-[#1976d2] text-white px-12 h-[55px] rounded-lg font-black text-[16px] uppercase tracking-widest shadow-lg active:scale-95 transition-all"
          >
            Modify
          </button>

          {/* Dropdown Containers */}
          {activeDropdown && (
            <div ref={dropdownRef} className="absolute top-[65px] z-[1001] animate-fade-in shadow-2xl">
              {(activeDropdown === 'from' || activeDropdown === 'to') && (
                <div className={`absolute ${activeDropdown === 'from' ? 'left-0' : 'left-[300px]'} w-[350px] bg-white rounded-xl overflow-hidden border border-gray-100 flex flex-col`}>
                   <div className="p-4 border-b border-gray-100 flex items-center gap-3 bg-white">
                      <Search size={18} className="text-gray-400" />
                      <input 
                        autoFocus
                        type="text" 
                        placeholder={activeDropdown === 'from' ? "Leaving from" : "Going to"}
                        className="flex-1 bg-transparent border-none outline-none text-[13px] font-bold text-gray-800 placeholder:text-gray-300"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                   </div>
                   <div className="max-h-[300px] overflow-y-auto py-2 bg-white">
                      {['New Delhi', 'Manali', 'Chandigarh', 'Jaipur', 'Shimla', 'Lucknow', 'Dehradun'].filter(c => c.toLowerCase().includes(searchQuery.toLowerCase())).map(city => (
                        <div key={city} onClick={() => { setSearchData({...searchData, [activeDropdown]: city}); setActiveDropdown(null); }}
                          className="px-5 py-3 text-sm font-bold text-gray-700 hover:bg-gray-50 hover:text-blue-600 cursor-pointer transition-colors border-b border-gray-50 last:border-0">
                          {city}
                        </div>
                      ))}
                   </div>
                </div>
              )}

              {activeDropdown === 'calendar' && (
                <div className="absolute left-[500px] bg-white rounded-xl overflow-hidden border border-gray-100 p-5 flex flex-col gap-4 min-w-[280px]">
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Journey Date</label>
                    <input
                      type="date"
                      value={travelDate ? travelDate.toISOString().split('T')[0] : ''}
                      min={new Date().toISOString().split('T')[0]}
                      onChange={e => {
                        const d = e.target.value ? new Date(e.target.value) : null;
                        setTravelDate(d);
                        setActiveDropdown(null);
                      }}
                      className="border-2 border-gray-100 focus:border-blue-500 rounded-lg px-3 py-2 text-sm font-black text-gray-900 outline-none cursor-pointer"
                    />
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

export default BusResultsHeader;
