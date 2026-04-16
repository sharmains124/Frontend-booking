import React from 'react';
import { TrendingUp, ArrowRight, Train } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const POPULAR_ROUTES = [
  { from: 'Delhi', fromCode: 'NDLS', to: 'Mumbai', toCode: 'CSTM', duration: '16h', trains: 48, price: '₹1,850', img: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&q=80&w=600' },
  { from: 'Delhi', fromCode: 'NDLS', to: 'Kolkata', toCode: 'HWH', duration: '17h', trains: 36, price: '₹2,100', img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=600' },
  { from: 'Mumbai', fromCode: 'CSTM', to: 'Goa', toCode: 'MAO', duration: '12h', trains: 22, price: '₹1,200', img: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&q=80&w=600' },
  { from: 'Bangalore', fromCode: 'SBC', to: 'Chennai', toCode: 'MAS', duration: '5h', trains: 30, price: '₹550', img: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&q=80&w=600' },
];

const TrainPopularRoutes = () => {
  const navigate = useNavigate();
  const todayDate = new Date().toISOString().split('T')[0];

  return (
    <section>
      <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-10">
        <div className="space-y-4">
          <div className="flex items-center gap-3 text-emerald-600 font-black text-[11px] uppercase tracking-[0.4em] mb-2 px-3 py-1 bg-emerald-50 rounded-full w-fit">
            <TrendingUp size={14} /> POPULAR ROUTES
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-text-main tracking-tighter italic uppercase">
            TRENDING <span className="text-emerald-600 italic">RAIL ROUTES</span>
          </h2>
          <p className="text-text-muted font-bold text-lg">Most booked routes across India with guaranteed availability.</p>
        </div>
        <button className="flex items-center gap-3 px-10 py-5 rounded-3xl border-2 border-emerald-100 hover:border-emerald-600 hover:text-emerald-700 text-xs font-black uppercase tracking-[0.2em] transition-all group active:scale-95 bg-white shadow-soft hover:shadow-premium">
          ALL ROUTES <ArrowRight size={18} className="transition-transform group-hover:translate-x-2" />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {POPULAR_ROUTES.map((route, i) => (
          <div
            key={i}
            onClick={() => navigate(`/trains/results?from=${route.fromCode}&to=${route.toCode}&date=${todayDate}&class=Sleeper (SL)&passengers=1`)}
            className="group relative bg-white rounded-[2.5rem] overflow-hidden shadow-soft hover:shadow-premium transition-all duration-700 cursor-pointer border border-gray-50 hover:-translate-y-4"
          >
            <div className="aspect-[4/5] overflow-hidden">
              <img
                src={route.img}
                alt={`${route.from} to ${route.to}`}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-[5s] group-hover:scale-125"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/95 via-emerald-950/20 to-transparent" />
            </div>

            <div className="absolute bottom-8 left-8 right-8 text-white text-left">
              <div className="flex items-center gap-2 mb-2">
                <Train size={12} className="text-emerald-400" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-80">{route.from} to</span>
              </div>
              <h3 className="text-2xl font-black mb-4 truncate italic uppercase tracking-tight">{route.to}</h3>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-[10px] font-black bg-emerald-500/30 border border-emerald-500/40 px-2 py-1 rounded uppercase">{route.trains} trains</span>
                <span className="text-[10px] font-black bg-emerald-500/30 border border-emerald-500/40 px-2 py-1 rounded uppercase">{route.duration}</span>
              </div>
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-[10px] font-black opacity-60 uppercase tracking-[0.3em] leading-none mb-2">Starts at</p>
                  <p className="text-3xl font-black text-emerald-400">{route.price}</p>
                </div>
                <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-white transition-all transform group-hover:scale-110 border border-white/20">
                  <Train size={24} className="text-white group-hover:scale-110 transition-transform" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TrainPopularRoutes;
