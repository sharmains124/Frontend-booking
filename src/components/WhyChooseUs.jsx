import React from 'react';
import { ShieldCheck, Tags, HandCoins, Info } from 'lucide-react';

const WhyChooseUs = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 w-full mb-12 font-sans">
       <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-8 flex flex-col md:flex-row gap-8 justify-around items-start">
          {[
            { 
              icon: <Tags size={36} className="text-[#1e88e5] mb-4" />, 
              title: "Cheapest Price Guarantee", 
              desc: "Found it cheaper elsewhere? We'll match it or refund the difference." 
            },
            { 
              icon: <HandCoins size={36} className="text-[#1e88e5] mb-4" />, 
              title: "No Hidden Booking Fees", 
              desc: "What you see is what you pay. Transparent pricing across all bookings." 
            },
            { 
              icon: <ShieldCheck size={36} className="text-[#1e88e5] mb-4" />, 
              title: "Secure & Trusted", 
              desc: "Safe encryption prevents fraud and ensures your data is strictly protected." 
            }
          ].map((item, i) => (
            <div key={i} className="flex-1 flex flex-col items-center text-center">
               {item.icon}
               <h3 className="text-lg font-bold text-gray-800 mb-2">{item.title}</h3>
               <p className="text-sm text-gray-500 font-medium max-w-[250px] leading-relaxed">{item.desc}</p>
            </div>
          ))}
       </div>
    </section>
  );
};

export default WhyChooseUs;
