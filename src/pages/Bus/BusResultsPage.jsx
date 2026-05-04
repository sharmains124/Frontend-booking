import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import BusResultsHeader from './component/BusResultsHeader';
import BusFilters from './component/BusFilters';
import BusCard from './component/BusCard';
import { Filter, SortAsc, Info } from 'lucide-react';

const MOCK_BUSES = [
  {
    id: 1,
    operator: "Zingbus Plus",
    type: "A/C Sleeper (2+1)",
    rating: 4.8,
    reviews: 1250,
    departureTime: "21:30",
    arrivalTime: "06:15",
    duration: "08h 45m",
    price: 899,
    origin: "New Delhi",
    destination: "Manali",
    seatsLeft: 12
  },
  {
    id: 2,
    operator: "Laxmi Holidays",
    type: "A/C Seater (2+2)",
    rating: 4.2,
    reviews: 850,
    departureTime: "20:00",
    arrivalTime: "05:00",
    duration: "09h 00m",
    price: 749,
    origin: "New Delhi",
    destination: "Manali",
    seatsLeft: 8
  },
  {
    id: 3,
    operator: "IntrCity SmartBus",
    type: "A/C Sleeper (2+1)",
    rating: 4.9,
    reviews: 3200,
    departureTime: "22:15",
    arrivalTime: "07:30",
    duration: "09h 15m",
    price: 1199,
    origin: "New Delhi",
    destination: "Manali",
    seatsLeft: 15
  },
  {
    id: 4,
    operator: "Blue World Tourist",
    type: "Non A/C Seater (2+2)",
    rating: 3.8,
    reviews: 450,
    departureTime: "18:30",
    arrivalTime: "04:45",
    duration: "10h 15m",
    price: 549,
    origin: "New Delhi",
    destination: "Manali",
    seatsLeft: 4
  }
];

const BusResultsPage = () => {
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const from = searchParams.get('from') || 'New Delhi';
  const to = searchParams.get('to') || 'Manali';
  const date = searchParams.get('date') || new Date().toISOString().split('T')[0];

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-[#f2f2f2] min-h-screen font-sans antialiased text-slate-900 pb-20">
      <BusResultsHeader origin={from} destination={to} date={date} />

      <main className="max-w-7xl mx-auto px-4 pt-6">
        <div className="flex flex-col lg:flex-row gap-6">
          
          {/* Filters Sidebar */}
          <BusFilters />

          {/* Results List */}
          <div className="flex-1 space-y-4">
            
            {/* Sorting & Stats Bar */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
               <div className="flex items-center gap-3">
                  <h2 className="text-[18px] font-black text-gray-900 tracking-tight">{MOCK_BUSES.length} Buses found</h2>
                  <div className="h-4 w-[1px] bg-gray-200 hidden md:block"></div>
                  <p className="text-[12px] font-bold text-gray-500 uppercase tracking-wider">{from} to {to}</p>
               </div>
               
               <div className="flex items-center gap-6 overflow-x-auto scrollbar-hide w-full md:w-auto">
                  <span className="text-[11px] font-black text-gray-400 uppercase shrink-0">SORT BY:</span>
                  {['Popularity', 'Departure', 'Arrival', 'Duration', 'Price', 'Ratings'].map((sort, i) => (
                    <button key={i} className={`text-[12px] font-black whitespace-nowrap transition-colors ${i === 4 ? 'text-blue-600' : 'text-gray-600 hover:text-blue-500'}`}>
                       {sort}
                    </button>
                  ))}
               </div>
            </div>

            {loading ? (
              <div className="flex flex-col gap-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-40 bg-white rounded-xl animate-pulse shadow-sm border border-gray-100"></div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col gap-4 animate-fade-in">
                {MOCK_BUSES.map(bus => (
                  <BusCard key={bus.id} bus={bus} />
                ))}

                {/* Empty State / Bottom Info */}
                <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 flex items-start gap-4 mt-8">
                   <div className="p-2 bg-white rounded-lg shadow-sm">
                      <Info className="text-blue-500" size={20} />
                   </div>
                   <div>
                      <h4 className="text-[14px] font-black text-blue-900 mb-1">Book with Confidence</h4>
                      <p className="text-[12px] font-medium text-blue-700 leading-relaxed max-w-2xl italic">All bus operators listed above are verified and follow strict safety guidelines. Free cancellation available on select operators.</p>
                   </div>
                </div>
              </div>
            )}
          </div>

        </div>
      </main>

      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fadeIn 0.5s ease-out forwards; }
      `}} />
    </div>
  );
};

export default BusResultsPage;
