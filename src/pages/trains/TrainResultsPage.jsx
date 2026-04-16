import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Train, ShieldCheck, Info, Star } from 'lucide-react';
import TrainCard from './component/TrainCard';
import TrainFilters from './component/TrainFilters';
import TrainResultsHeader from './component/TrainResultsHeader';
import TrainPromoSlider from './component/TrainPromoSlider';

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

  const formattedDate = new Date(date).toLocaleDateString('en-IN', {
    weekday: 'short', day: 'numeric', month: 'short', year: 'numeric'
  });

  const trains = getMockTrains(from, to);

  const sortOptions = [
    { id: 'departure', label: 'DEPARTURE', sub: '06:00 earliest', icon: <span className="font-bold text-lg">🕐</span> },
    { id: 'duration',  label: 'DURATION',  sub: '8h 00m fastest', icon: <span className="font-bold text-lg">⚡</span> },
    { id: 'price',     label: 'PRICE',     sub: '₹385 lowest',    icon: <span className="font-bold text-lg">₹</span> },
    { id: 'arrival',   label: 'ARRIVAL',   sub: '10:00 earliest', icon: <span className="font-bold text-lg">🏁</span> },
  ];

  return (
    <div className="bg-[#f5f7f9] min-h-screen">
      {/* Sticky Results Search Header */}
      <TrainResultsHeader
        from={from}
        to={to}
        date={date}
        passengers={passengers}
        travelClass={travelClass}
      />

      <div className="max-w-7xl mx-auto px-4 mt-[160px] pb-20">

        {/* Title Row */}
        <div className="mb-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black text-gray-900 tracking-tight">
              Trains from {from} to {to}
            </h1>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{passengers} Passenger{passengers > 1 ? 's' : ''}</span>
              <div className="w-1 h-1 rounded-full bg-gray-300" />
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{formattedDate}</span>
            </div>
          </div>
          <div className="flex items-center gap-2 text-green-600 font-bold text-[10px] uppercase tracking-widest bg-white p-2 rounded-xl border border-gray-100 shadow-sm">
            <ShieldCheck size={12} /> Live Availability
          </div>
        </div>

        {/* Promo Slider */}
        <TrainPromoSlider />

        {/* Class Filter Strip */}
        <div className="flex items-center gap-3 mb-8 overflow-x-auto pb-2 scrollbar-hide bg-white rounded-xl p-3 border border-gray-100 shadow-sm">
          <span className="text-[11px] font-black text-gray-500 uppercase tracking-widest shrink-0">Filter by class:</span>
          {['All', '1A', '2A', '3A', 'SL', 'CC'].map(cls => (
            <button
              key={cls}
              onClick={() => setSelectedClass(cls)}
              className={`px-5 py-2 rounded-xl text-[11px] font-black uppercase tracking-wider border transition-all shrink-0
                ${selectedClass === cls
                  ? 'bg-emerald-600 text-white border-emerald-600'
                  : 'bg-white text-gray-500 border-gray-200 hover:border-emerald-400'}`}
            >
              {cls}
            </button>
          ))}
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <TrainFilters trainsCount={trains.length} />

          {/* Main Results */}
          <main className="lg:w-3/4">
            {/* Sort Options Bar */}
            <div className="flex flex-wrap lg:flex-nowrap gap-3 mb-4">
              {sortOptions.map(opt => (
                <button
                  key={opt.id}
                  onClick={() => setActiveSort(opt.id)}
                  className={`flex items-center gap-3 p-3 rounded-lg border bg-white transition-all flex-1 text-left relative overflow-hidden group min-w-[140px]
                    ${activeSort === opt.id ? 'border-emerald-600 shadow-sm' : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'}`}
                >
                  {activeSort === opt.id && <div className="absolute bottom-0 left-0 right-0 h-1 bg-emerald-600" />}
                  <div className={`w-8 h-8 rounded shrink-0 flex items-center justify-center
                    ${activeSort === opt.id ? 'bg-emerald-600 text-white' : 'bg-gray-100 text-gray-500 group-hover:bg-gray-200'}`}>
                    {opt.icon}
                  </div>
                  <div className="flex flex-col">
                    <span className={`text-[11px] font-black tracking-tight uppercase ${activeSort === opt.id ? 'text-gray-900' : 'text-gray-700'}`}>
                      {opt.label}
                    </span>
                    {opt.sub && <span className="text-[10px] font-bold text-gray-500">{opt.sub}</span>}
                  </div>
                </button>
              ))}
            </div>

            <h2 className="text-[12px] font-black text-gray-800 mb-6 px-1 tracking-tight">
              {trains.length} Trains found · {from} → {to}
            </h2>

            {/* Train List */}
            <div className="space-y-0">
              {trains.length > 0 ? (
                trains.map((train) => (
                  <TrainCard
                    key={train.id}
                    train={train}
                    from={from}
                    to={to}
                    date={date}
                    passengers={passengers}
                  />
                ))
              ) : (
                <div className="bg-white p-20 rounded-3xl border border-gray-100 text-center space-y-4 shadow-sm">
                  <Info size={40} className="mx-auto text-gray-300" />
                  <h3 className="text-xl font-black text-gray-800">No trains found</h3>
                  <p className="text-gray-400 font-bold">Try changing the date or route.</p>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default TrainResultsPage;
