import React from 'react';
import { HelpCircle, MessageSquare, PhoneCall } from 'lucide-react';

const Support = () => {
  return (
    <div className="container-custom">
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
        {[
          { icon: HelpCircle, title: 'Archival FAQ', desc: 'Detailed manifests for all provisions.', color: 'text-blue-500' },
          { icon: MessageSquare, title: 'Live Stewardship', desc: 'Zero-latency concierge resolution.', color: 'text-emerald-500' },
          { icon: PhoneCall, title: 'Priority Channel', desc: 'Immediate trans-continental support.', color: 'text-amber-500' }
        ].map((item, i) => {
          const Icon = item.icon;
          return (
            <div key={i} className="flex flex-col items-start gap-6 p-10 rounded-[2.5rem] bg-white border border-secondary-50 hover:border-accent-gold/30 group transition-all duration-700 cursor-pointer shadow-premium hover:shadow-2xl hover:-translate-y-2">
              <div className={`w-16 h-16 rounded-2xl bg-secondary-50 flex items-center justify-center ${item.color} group-hover:scale-110 transition-all duration-500`}>
                <Icon size={28} strokeWidth={1.5} />
              </div>
              <div>
                <h5 className="text-[12px] font-black text-secondary-900 uppercase tracking-[0.3em] mb-3">{item.title}</h5>
                <p className="text-[14px] font-sans text-secondary-500 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
};

export default Support;
