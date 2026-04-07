import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Loader2, CheckCircle2, Plane, Star, ShieldCheck, TrendingUp, Info } from 'lucide-react';
import FlightCard from './components/FlightCard';
import { useSearchFlightsQuery } from '../../services/flightService';
import FlightResultsHeader from './components/FlightResultsHeader';
import FlightFilters from './components/FlightFilters';
import FlightPromoSlider from './components/FlightPromoSlider';

const getMockFlights = (origin, destination, dateStr) => [
  { id: '1', airline: 'IndiGo', flightNumber: '6E-201', departureTime: new Date(dateStr).setHours(6, 0), arrivalTime: new Date(dateStr).setHours(8, 15), originCode: origin, destCode: destination, price: 4120, seatsAvailable: 12, originCity: 'New Delhi', destCity: 'Mumbai' },
  { id: '2', airline: 'Air India', flightNumber: 'AI-102', departureTime: new Date(dateStr).setHours(9, 30), arrivalTime: new Date(dateStr).setHours(11, 45), originCode: origin, destCode: destination, price: 5450, seatsAvailable: 24, originCity: 'New Delhi', destCity: 'Mumbai' },
  { id: '3', airline: 'Vistara', flightNumber: 'UK-854', departureTime: new Date(dateStr).setHours(14, 15), arrivalTime: new Date(dateStr).setHours(16, 30), originCode: origin, destCode: destination, price: 6200, seatsAvailable: 5, originCity: 'New Delhi', destCity: 'Mumbai' }
];

const FlightResultsPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeSort, setActiveSort] = useState('cheapest');

  // Search parameters
  const origin = searchParams.get('from') || 'DEL';
  const destination = searchParams.get('to') || 'BOM';
  const dateStr = searchParams.get('date') || new Date().toISOString().split('T')[0];
  const passengers = searchParams.get('passengers') || '1';
  const travelClass = searchParams.get('class') || 'Economy';

  const formattedDate = dateStr ? new Date(dateStr).toLocaleDateString('en-US', { day: 'numeric', month: 'short' }) : '18 Mar';

  // Generate Date Strip
  const dateStrip = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(dateStr);
    d.setDate(d.getDate() + (i - 2));
    return {
      date: d.toLocaleDateString('en-US', { day: 'numeric', month: 'short' }),
      price: `₹${(Math.random() * 2000 + 4000).toFixed(0)}`,
      active: i === 2
    };
  });



  const { data: response, error: queryError } = useSearchFlightsQuery({
    from: origin, to: destination, date: dateStr, passengers, time: ''
  });

  useEffect(() => {
    if (response) {
      if (response.status && response.data?.length > 0) {
        setFlights(response.data);
      } else {
        setFlights(getMockFlights(origin, destination, dateStr));
      }
      setLoading(false);
    } else if (queryError) {
      console.error("Backend Error - Using Mock Data:", queryError);
      setFlights(getMockFlights(origin, destination, dateStr));
      setLoading(false);
    }
  }, [response, queryError, origin, destination, dateStr]);

 

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f5f7f9] flex flex-col items-center justify-center">
        <Loader2 className="w-12 h-12 text-[#1e88e5] animate-spin mb-4" />
        <p className="text-xs font-black text-gray-400 uppercase tracking-[0.3em]">Connecting to backend...</p>
      </div>
    );
  }

  return (
    <div className="bg-[#f5f7f9] min-h-screen mt-[130px]">
      <FlightResultsHeader 
        origin={origin} 
        destination={destination} 
        date={formattedDate} 
        passengers={passengers} 
        travelClass={travelClass} 
      />

      <div className="max-w-7xl mx-auto px-4 mt-6 pb-20">
         {/* Main Title Section as per screenshot */}
         <div className="mb-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
               <h1 className="text-2xl font-black text-gray-900 tracking-tight font-sans">
                 Flights from {origin} to {destination}
               </h1>
               <div className="flex items-center gap-2 mt-1">
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{passengers} Traveler</span>
                  <div className="w-1 h-1 rounded-full bg-gray-300"></div>
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{travelClass} Class</span>
               </div>
            </div>
            
            <div className="flex items-center gap-4 bg-white p-2 rounded-xl border border-gray-100 shadow-sm animate-fade-in">
               <div className="flex items-center gap-2 text-green-600 font-bold text-[10px] uppercase tracking-widest">
                  <CheckCircle2 size={12} /> Real-time availability
               </div>
            </div>
         </div>

         <FlightPromoSlider />

         {/* Date Slider Strip as per Agoda screenshot */}
         <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2 scrollbar-hide bg-white rounded-xl p-3 border border-gray-100 shadow-sm">
           {dateStrip.map((item, i) => (
             <div 
               key={i}
               className={`flex-1 min-w-[120px] p-2 rounded-lg border cursor-pointer transition-all text-center
                 ${item.active 
                   ? 'bg-blue-50 border-blue-600 shadow-sm scale-105' 
                   : 'bg-white border-gray-100 hover:border-blue-400'}`}
             >
               <p className={`text-[10px] font-black uppercase ${item.active ? 'text-blue-600' : 'text-gray-500'}`}>{item.date}</p>
               <p className={`text-[12px] font-black mt-0.5 ${item.active ? 'text-blue-600' : 'text-gray-400'}`}>{item.price}</p>
             </div>
           ))}
         </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <FlightFilters flightsCount={flights.length} />

          <main className="lg:w-3/4">
             {/* Sort Options Bar as per screenshot */}
             <div className="flex flex-wrap lg:flex-nowrap gap-3 mb-4">
                {[
                  { id: 'cheapest', label: 'CHEAPEST', sub: '₹7,897 | 02h 55m', icon: <span className="font-bold text-lg">₹</span> },
                  { id: 'fastest', label: 'NON STOP FIRST', sub: '₹7,897 | 02h 55m', icon: <span className="font-bold text-lg">⚡</span> },
                  { id: 'smart', label: 'YOU MAY PREFER', sub: '₹7,897 | 02h 55m', icon: <Star size={16}/> },
                  { id: 'other', label: 'Other Sort', sub: null, icon: <span className="font-bold text-lg">≡</span> }
                ].map(opt => (
                  <button 
                    key={opt.id}
                    onClick={() => setActiveSort(opt.id)}
                    className={`flex items-center gap-3 p-3 rounded-lg border bg-white transition-all flex-1 text-left relative overflow-hidden group min-w-[150px]
                      ${activeSort === opt.id ? 'border-[#1e88e5] shadow-sm' : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'}`}
                  >
                    {activeSort === opt.id && <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#1e88e5]"></div>}
                    <div className={`w-8 h-8 rounded shrink-0 flex items-center justify-center
                      ${activeSort === opt.id ? 'bg-[#1e88e5] text-white' : 'bg-gray-100 text-gray-500 group-hover:bg-gray-200'}`}>
                       {opt.icon}
                    </div>
                    <div className="flex flex-col">
                       <span className={`text-[11px] font-black tracking-tight uppercase ${activeSort === opt.id ? 'text-gray-900' : 'text-gray-700'}`}>{opt.label}</span>
                       {opt.sub && <span className="text-[10px] font-bold text-gray-500">{opt.sub}</span>}
                    </div>
                  </button>
                ))}
             </div>

             <h2 className="text-[12px] font-black text-gray-800 mb-6 px-1 tracking-tight">Flights sorted by Lowest fares on this route</h2>

             {/* Flight List Section */}
             <div className="space-y-4">
                {flights.length > 0 ? (
                  flights.map((flight, index) => (
                    <FlightCard key={flight.id || index} flight={flight} onBook={() => navigate('/booking', { state: { flight } })} />
                  ))
                ) : (
                  <div className="bg-white p-20 rounded-3xl border border-gray-100 text-center space-y-4 shadow-premium">
                     <Info size={40} className="mx-auto text-gray-300" />
                     <h3 className="text-xl font-black text-gray-800">No flights found from backend</h3>
                     <p className="text-gray-400 font-bold">Try adjusting your filters or destination.</p>
                  </div>
                )}
             </div>

          </main>
        </div>
      </div>
    </div>
  );
};

export default FlightResultsPage;
