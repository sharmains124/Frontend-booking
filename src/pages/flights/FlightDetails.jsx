import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
   Plane,
   Clock,
   Info,
   Calendar,
   Wifi,
   Coffee,
   Tv,
   Zap,
   ArrowLeft,
   Share2,
   Heart,
   ArrowRight,
   AlertCircle,
   ShieldCheck,
   Loader2
} from 'lucide-react';
import Button from '../../components/Button';
import { flightService } from '../../services/flightService';

const FlightDetails = () => {
   const { id } = useParams();
   const [activeTab, setActiveTab] = useState('itinerary');
   const [flight, setFlight] = useState(null);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      const fetchFlight = async () => {
         try {
            const response = await flightService.getFlightById(id);
            if (response.status) {
               setFlight(response.data);
            }
         } catch (error) {
            console.error("Error fetching flight:", error);
         } finally {
            setLoading(false);
         }
      };
      fetchFlight();
   }, [id]);

   if (loading) {
      return (
         <div className="min-h-screen flex flex-col items-center justify-center bg-white">
            <Loader2 className="animate-spin text-blue-600 mb-4" size={48} />
            <p className="text-sm font-black text-gray-400 uppercase tracking-widest italic">Decrypting Flight Manifest...</p>
         </div>
      );
   }

   if (!flight) {
      return (
         <div className="min-h-screen flex flex-col items-center justify-center bg-white p-6 text-center">
            <AlertCircle className="text-red-500 mb-6" size={64} />
            <h2 className="text-3xl font-black text-gray-900 mb-4 italic">Flight Not Found</h2>
            <p className="text-gray-500 mb-8 font-bold">The flight ID provided is invalid or the mission has been scrubbed.</p>
            <Link to="/flights">
               <Button variant="pill">Return to Hangar</Button>
            </Link>
         </div>
      );
   }

   const departureDateObj = new Date(flight.departureTime);
   const arrivalDateObj = new Date(flight.arrivalTime);

   const depTime = departureDateObj.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
   const arrTime = arrivalDateObj.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
   const depDate = departureDateObj.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });

   return (
      <div className="bg-white min-h-screen pt-[80px]">
         {/* Cinematic Header */}
         <div className="bg-secondary-900 py-48 text-center text-white relative overflow-hidden">
            <div className="absolute inset-0 z-0 scale-110">
               <img
                  src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2000"
                  alt="Aircraft wing"
                  className="w-full h-full object-cover opacity-20"
               />
            </div>

            <div className="container-custom relative z-10 pt-12">
               <p className="text-[12px] font-serif font-bold tracking-[0.4em] uppercase text-accent-gold mb-10">MISSION {flight.flightNumber}</p>
               <h1 className="text-6xl md:text-[110px] font-serif font-bold mb-12 tracking-tight leading-[0.85]">{flight.originCity} <br /> <span className="text-white/30 italic">to {flight.destinationCity}.</span></h1>
               <div className="flex flex-wrap justify-center gap-12 text-white/40">
                  <div className="flex items-center gap-4">
                     <Calendar size={16} />
                     <span className="text-[11px] font-serif font-bold uppercase tracking-widest">{depDate}</span>
                  </div>
                  <div className="flex items-center gap-4">
                     <Zap size={16} />
                     <span className="text-[11px] font-serif font-bold uppercase tracking-widest text-accent-gold">Economy Cabin</span>
                  </div>
               </div>
            </div>
         </div>

         <div className="container-custom -mt-32 relative z-20 pb-48">
            <div className="flex flex-col lg:flex-row gap-16">

               {/* Main Content Area */}
               <div className="lg:w-2/3 space-y-16">

                  <div className="flex items-center gap-4 bg-red-50 p-6 rounded-2xl border border-red-100 animate-pulse">
                     <AlertCircle size={18} className="text-red-500" />
                     <p className="text-[10px] font-serif font-bold text-red-600 uppercase tracking-widest leading-none">
                        High Demand: <span className="text-secondary-900">8 PATRONS ARE CURRENTLY VIEWING THIS MANIFEST</span>
                     </p>
                  </div>

                  <div className="glass-card-premium p-10 flex justify-between items-center rounded-3xl border border-white/10 hidden md:flex">
                     <div className="flex items-center gap-12 text-[11px] font-serif font-bold text-secondary-400 uppercase tracking-widest px-4">
                        <Link to="/flights/search" className="flex items-center gap-3 hover:text-secondary-900"><ArrowLeft size={16} /> FLIGHTS CATALOG</Link>
                     </div>
                     <div className="flex gap-6">
                        <button className="w-14 h-14 rounded-2xl bg-white border border-secondary-100 flex items-center justify-center text-secondary-900 hover:bg-secondary-900 hover:text-white transition-all"><Share2 size={18} /></button>
                        <button className="w-14 h-14 rounded-2xl bg-white border border-secondary-100 flex items-center justify-center text-secondary-900 hover:bg-secondary-900 hover:text-white transition-all"><Heart size={18} /></button>
                     </div>
                  </div>

                  <div className="bg-white rounded-[3rem] overflow-hidden shadow-premium border border-secondary-50">
                     <div className="flex bg-secondary-50 p-3">
                        {['itinerary', 'amenities', 'policies'].map((tab) => (
                           <button
                              key={tab}
                              onClick={() => setActiveTab(tab)}
                              className={`flex-1 py-5 rounded-[1.5rem] text-[11px] font-serif font-bold uppercase tracking-[0.2em] transition-all ${activeTab === tab ? 'bg-secondary-900 text-white shadow-premium' : 'text-secondary-400 hover:text-secondary-900'}`}
                           >
                              {tab}
                           </button>
                        ))}
                     </div>

                     <div className="p-16 md:p-24 bg-white">
                        {activeTab === 'itinerary' && (
                           <div className="space-y-12 animate-fade-in">
                              <div className="flex flex-col md:flex-row justify-between items-start gap-12 border-b border-secondary-100 pb-20 bg-accent-cream/20 p-12 rounded-[2.5rem] border border-accent-gold/5">
                                 <div>
                                    <div className="flex items-center gap-8 mb-8">
                                       <span className="text-7xl font-serif font-bold text-secondary-900 tracking-tight leading-none">{depTime}</span>
                                       <div className="p-2 px-6 bg-accent-cream rounded-full text-[10px] font-serif font-bold text-secondary-400 uppercase tracking-widest">{flight.origin}</div>
                                    </div>
                                    <p className="text-2xl font-serif italic text-secondary-900">{flight.originName}</p>
                                    <div className="mt-8 flex items-center gap-8">
                                       <span className="flex items-center gap-3 text-[10px] font-serif font-bold text-accent-gold uppercase tracking-widest"><Clock size={14} /> BOARDING 40M PRIOR</span>
                                    </div>
                                 </div>

                                 <div className="p-12 bg-secondary-900 rounded-[2.5rem] text-white shrink-0 group hover:-translate-y-2 transition-transform duration-700 shadow-premium">
                                    <div className="flex items-center gap-4 mb-6">
                                       <Plane className="text-accent-gold" size={20} />
                                       <span className="text-[10px] font-serif font-bold uppercase tracking-[0.2em] text-white/40">Vessel ID</span>
                                    </div>
                                    <p className="text-2xl font-serif font-bold tracking-tight mb-2">{flight.flightNumber}</p>
                                    <p className="text-[11px] font-serif font-bold text-white/30 uppercase tracking-widest">Boeing 737-800</p>
                                 </div>
                              </div>

                              <div className="flex flex-col md:flex-row justify-between items-start gap-12 pt-12 bg-secondary-900 p-12 rounded-[2.5rem] text-white shadow-classic group hover:bg-secondary-800 transition-colors duration-700">
                                 <div>
                                    <div className="flex items-center gap-8 mb-8">
                                       <span className="text-7xl font-serif font-bold text-white tracking-tight leading-none">{arrTime}</span>
                                       <div className="p-2 px-6 bg-white/10 rounded-full text-[10px] font-serif font-bold text-accent-gold uppercase tracking-widest border border-white/5">{flight.destination}</div>
                                    </div>
                                    <p className="text-2xl font-serif italic text-white/60">{flight.destinationName}</p>
                                    <div className="mt-8 flex items-center gap-8">
                                       <span className="flex items-center gap-3 text-[10px] font-serif font-bold text-accent-gold uppercase tracking-widest"><Info size={14} /> {arrivalDateObj.getDate() > departureDateObj.getDate() ? '+1 DAY ARRIVAL' : 'INSTANT LANDING'}</span>
                                    </div>
                                 </div>

                                 <div className="flex gap-8">
                                    {[
                                       { icon: <Wifi size={20} />, label: "Giga-Connect" },
                                       { icon: <Coffee size={20} />, label: "Curated Diner" },
                                       { icon: <Tv size={20} />, label: "8K Stream" }
                                    ].map((amenity, i) => (
                                       <div key={i} className="flex flex-col items-center gap-4 group/item">
                                          <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-accent-gold hover:text-secondary-900 transition-all shadow-inner group-hover/item:scale-110">{amenity.icon}</div>
                                          <span className="text-[9px] font-serif font-bold text-white/30 uppercase tracking-widest">{amenity.label}</span>
                                       </div>
                                    ))}
                                 </div>
                              </div>
                           </div>
                        )}

                        {activeTab === 'amenities' && (
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-12 animate-fade-in">
                              {[
                                 { title: "Standard Recline", desc: "Ergonomic seating with adjustable headrests for maximum comfort." },
                                 { title: "In-flight Diner", desc: "Complimentary snack and beverage service for all passengers." },
                                 { title: "Entertainment", desc: "Access to WingTrip's 8K streaming library on your personal devices." },
                                 { title: "Points Program", desc: "Earn double WingPoints on every booking through this portal." }
                              ].map((item, i) => (
                                 <div key={i} className="group p-12 rounded-[2.5rem] border border-accent-gold/10 bg-accent-cream/20 hover:bg-secondary-900 hover:text-white transition-all duration-700">
                                    <h4 className="text-2xl font-serif font-bold mb-6 tracking-tight group-hover:text-accent-gold">{item.title}</h4>
                                    <p className="text-[11px] font-serif font-bold text-secondary-400 uppercase tracking-widest leading-loose group-hover:text-white/60">{item.desc}</p>
                                 </div>
                              ))}
                           </div>
                        )}

                        {activeTab === 'policies' && (
                           <div className="bg-secondary-900 rounded-[2.5rem] p-16 text-white animate-fade-in relative overflow-hidden shadow-premium">
                              <div className="absolute top-0 right-0 p-12 opacity-5 scale-150">
                                 <CheckCircle2 size={180} />
                              </div>
                              <div className="relative z-10">
                                 <p className="text-[11px] font-serif font-bold text-accent-gold uppercase tracking-[0.3em] mb-10">THE WINGTRIP GUARANTEE</p>
                                 <h4 className="text-5xl font-serif font-bold mb-12 tracking-tight">Mission Policy.</h4>
                                 <div className="space-y-8 text-white/50 text-xl font-serif italic max-w-2xl leading-relaxed">
                                    <p>Cancellations are managed within 24 hours for a full refund. Standard fees apply thereafter.</p>
                                    <p>Baggage allowance: 15kg check-in and 7kg hand luggage included.</p>
                                 </div>
                              </div>
                           </div>
                        )}
                     </div>
                  </div>
               </div>

               {/* Pricing Sidebar */}
               <div className="lg:w-1/3">
                  <div className="glass-card-premium !bg-white rounded-[3rem] shadow-classic sticky top-32 overflow-hidden border border-accent-gold/10">
                     <div className="p-12 bg-secondary-900 text-white relative group overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-5 scale-150 transition-transform duration-1000 group-hover:rotate-12">
                           <Zap size={100} />
                        </div>
                        <p className="text-[11px] font-serif font-bold uppercase tracking-[0.4em] text-accent-gold mb-4">Investment Summary</p>
                        <h3 className="text-4xl font-serif font-bold tracking-tight">Fare Calculation.</h3>
                     </div>

                     <div className="p-12 space-y-10">
                        <div className="space-y-6">
                           <div className="flex justify-between items-center">
                              <span className="text-[11px] font-serif font-bold uppercase tracking-widest text-secondary-400">Patron Fare</span>
                              <span className="text-xl font-serif font-bold text-secondary-900">₹{(flight.price * 0.8).toLocaleString()}</span>
                           </div>
                           <div className="flex justify-between items-center">
                              <span className="text-[11px] font-serif font-bold uppercase tracking-widest text-secondary-400">WingTrip Tax</span>
                              <span className="text-xl font-serif font-bold text-secondary-900">₹{(flight.price * 0.2).toLocaleString()}</span>
                           </div>
                        </div>

                        <div className="pt-12 border-t border-secondary-100">
                           <p className="text-[10px] font-serif font-bold text-secondary-400 uppercase tracking-[0.4em] mb-6">Aggregate Total</p>
                           <div className="flex items-baseline gap-4">
                              <span className="text-7xl font-serif font-bold text-secondary-900 tracking-tight leading-none">₹{flight.price.toLocaleString()}</span>
                              <span className="text-[11px] font-serif font-bold text-secondary-400 uppercase tracking-widest">INR</span>
                           </div>
                        </div>

                        <div className="pt-10">
                           <Link to="/booking" state={{ flight }}>
                              <button className="w-full bg-[#008cff] hover:bg-blue-600 text-white rounded-full shadow-xl py-5 text-lg font-black tracking-widest uppercase transition-all hover:-translate-y-1 flex items-center justify-center">
                                 RESERVE MISSION <ArrowRight size={20} className="ml-4" />
                              </button>
                           </Link>
                           <div className="flex items-center justify-center gap-4 mt-12 opacity-30 text-secondary-900">
                              <ShieldCheck size={16} />
                              <span className="text-[10px] font-serif font-bold uppercase tracking-[0.2em]">PATRON PROTECTION ACTIVE</span>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>

            </div>
         </div>

         {/* STICKY BOOKING BAR */}
         <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-3xl border-t border-secondary-100 p-8 z-50 shadow-[0_-10px_40px_rgba(0,0,0,0.08)]">
            <div className="container-custom flex flex-col md:flex-row items-center justify-between gap-6">
               <div className="flex items-center gap-12">
                  <div className="hidden md:block">
                     <p className="text-[10px] font-serif font-bold text-secondary-400 uppercase tracking-widest mb-1">SELECTED VESSEL</p>
                     <p className="text-lg font-serif font-bold text-secondary-900 uppercase tracking-tight">{flight.airline} • {flight.flightNumber}</p>
                  </div>
                  <div className="h-10 w-px bg-secondary-100 hidden md:block"></div>
                  <div>
                     <p className="text-[10px] font-serif font-bold text-secondary-400 uppercase tracking-widest mb-1">TOTAL INVESTMENT</p>
                     <p className="text-4xl font-serif font-bold text-secondary-900">₹{flight.price.toLocaleString()} <span className="text-sm text-secondary-300 font-bold tracking-widest ml-2">INR</span></p>
                  </div>
               </div>
               <Link to="/booking" state={{ flight }} className="w-full md:w-auto">
                  <button className="bg-[#008cff] hover:bg-blue-600 text-white rounded-full shadow-xl px-12 py-4 w-full md:w-auto font-black tracking-widest uppercase transition-all flex items-center justify-center">
                     PROCEED TO SETTLEMENT <ArrowRight size={20} className="ml-3" />
                  </button>
               </Link>
            </div>
         </div>
      </div>
   );
};

export default FlightDetails;
