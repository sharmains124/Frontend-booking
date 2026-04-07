import React from 'react';
import BookingEngine from '../../components/SearchForm';
import PropertyBrandSlider from '../../components/PropertyBrandSlider';
import { ShieldCheck, Star, Calendar, MapPin, Globe } from 'lucide-react';

const HotelLandingPage = () => {
   return (
      <div className="bg-bg-alt min-h-screen font-sans antialiased text-text-main overflow-x-hidden pt-[80px]">
         {/* Hero Section - Restyled for Hotels */}
         <section className="relative min-h-[700px] flex items-center justify-center bg-slate-950">
            <div className="absolute inset-0 z-0 overflow-hidden">
               <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover opacity-60 scale-110"
               >
                  <source src="/assets/hostal video.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
               </video>
               <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40"></div>
               <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent"></div>
            </div>

            <div className="container-custom relative z-10 text-center px-4 w-full">
               <div className="mb-6 max-w-5xl mx-auto">
                  <h1 className="text-5xl md:text-6xl lg:text-[75px] font-black text-white leading-tight tracking-tight mb-4 drop-shadow-2xl animate-fade-in-up delay-100">
                     Luxury <span className="decoration-primary/80 decoration-4 underline underline-offset-[12px]">Awaits</span> <span className="text-secondary italic font-serif opacity-90">You Here</span>
                  </h1>

                  <p className="text-sm md:text-base lg:text-lg text-white/90 max-w-2xl mx-auto font-medium tracking-wide mb-6 drop-shadow-lg leading-relaxed animate-fade-in-up delay-200">
                     Smart stays, shared vibes, and unforgettable memories, where every moment feels like home
                  </p>
               </div>

               <div className="max-w-6xl mx-auto transform translate-y-6">
                  <div className="bg-white rounded-[2rem] shadow-premium p-2 md:p-4 relative z-20 border border-white/20">
                     <BookingEngine initialTab="Hotels" />
                  </div>
               </div>
            </div>
         </section>


         <main className="container-custom py-40 md:py-60 space-y-48">
            {/* Brand Recognition */}
            <div className="text-center space-y-6 max-w-4xl mx-auto">
               <span className="sub-heading">Global Partnerships</span>
               <h2 className="text-5xl md:text-6xl font-black text-text-main tracking-tighter italic">World-Class <span className="text-primary italic">Hospitality</span> Partners</h2>
               <p className="text-text-muted font-bold text-lg max-w-2xl mx-auto">Experience the standard of excellence with our curated network of international hotel chains and boutique resorts.</p>
            </div>

            <PropertyBrandSlider />

            {/* Benefits Cards - Premium Redesign */}
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
               {[
                  {
                     icon: <Calendar size={40} className="text-primary" />,
                     title: "Flexible Stays",
                     desc: "Change dates or cancel for free on select elite properties with zero penalty."
                  },
                  {
                     icon: <ShieldCheck size={40} className="text-accent" />,
                     title: "Best Rate",
                     desc: "We guarantee the lowest luxury rates or we will refund 200% of the difference."
                  },
                  {
                     icon: <MapPin size={40} className="text-primary-dark" />,
                     title: "Prime Locations",
                     desc: "Every hotel is vetted for safety and proximity to the finest landmarks and city centers."
                  },
                  {
                     icon: <Star size={40} className="text-accent" />,
                     title: "WingPoints",
                     desc: "Earn 10x points on every booking and redeem for free nights at any partner hotel."
                  }
               ].map((item, i) => (
                  <div key={i} className="group bg-white rounded-[3rem] p-12 border border-gray-50 shadow-soft hover:shadow-premium transition-all duration-700 transform hover:-translate-y-5">
                     <div className="w-24 h-24 rounded-[2rem] bg-bg-alt flex items-center justify-center mb-10 group-hover:bg-primary transition-colors duration-500">
                        <div className="group-hover:text-white transition-colors duration-500">
                           {item.icon}
                        </div>
                     </div>
                     <h3 className="text-2xl font-black text-text-main mb-4 tracking-tight uppercase italic">{item.title}</h3>
                     <p className="text-text-muted font-bold text-sm leading-relaxed">{item.desc}</p>
                  </div>
               ))}
            </section>

            {/* Exclusive Deals Banner */}
            <div className="bg-primary-dark rounded-[5rem] p-16 md:p-32 text-center text-white relative overflow-hidden group shadow-2xl">
               <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 transition-transform duration-[10s] group-hover:scale-150"></div>
               <div className="relative z-10 space-y-12">
                  <span className="text-sm font-black uppercase tracking-[0.5em] text-accent">Limited Time Offers</span>
                  <h2 className="text-5xl md:text-8xl font-black tracking-tighter leading-tight italic">Unlock <span className="text-secondary italic">Secret</span> <br /> Elite Member Prices.</h2>
                  <button className="bg-accent hover:bg-white hover:text-accent text-white px-20 py-8 rounded-[3rem] font-black text-lg uppercase tracking-[0.3em] transition-all duration-500 transform hover:scale-110 shadow-2xl shadow-accent/20">
                     Join WingTrip Elite
                  </button>
               </div>
            </div>
         </main>
      </div>
   );
};

export default HotelLandingPage;
