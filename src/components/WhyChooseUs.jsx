import React from 'react';
import { ShieldCheck, Tags, HandCoins, Info } from 'lucide-react';

const WhyChooseUs = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 w-full mb-12 font-sans mt-8 md:mt-0">
       <div className="bg-white rounded-3xl border border-gray-100 shadow-premium p-6 md:p-10 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 lg:gap-12">
          {[
            { 
              icon: <Tags size={32} className="text-primary" />, 
              title: "Cheapest Price", 
              desc: "Found it cheaper? We'll match or refund the difference." 
            },
            { 
              icon: <HandCoins size={32} className="text-primary" />, 
              title: "No Hidden Fees", 
              desc: "Transparent pricing. No surprises at checkout." 
            },
            { 
              icon: <ShieldCheck size={32} className="text-primary" />, 
              title: "Secure & Trusted", 
              desc: "Elite encryption ensuring your data is protected." 
            }
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center text-center p-4 rounded-2xl hover:bg-slate-50 transition-colors">
               <div className="w-14 h-14 bg-primary/5 rounded-2xl flex items-center justify-center mb-6">{item.icon}</div>
               <h3 className="text-base md:text-lg font-black text-slate-800 mb-3 uppercase tracking-tight">{item.title}</h3>
               <p className="text-xs md:text-sm text-slate-500 font-medium max-w-[280px] leading-relaxed">{item.desc}</p>
            </div>
          ))}
       </div>
    </section>
  );
};

export default WhyChooseUs;
