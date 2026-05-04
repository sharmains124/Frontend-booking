import React from 'react';
import { HelpCircle, MessageSquare, PhoneCall, ChevronRight, FileText, Globe } from 'lucide-react';

const Support = () => {
  return (
    <div className="min-h-screen bg-[#FDFDFD] pt-28 pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-12 flex items-center gap-6">
          <div className="w-20 h-20 bg-rose-50 rounded-[1.5rem] flex items-center justify-center text-rose-600 shadow-sm">
            <HelpCircle size={36} strokeWidth={2.5} />
          </div>
          <div>
            <h1 className="text-5xl font-black text-[#111] tracking-tight mb-2">Help Center</h1>
            <p className="text-[#666] font-medium text-lg">FAQs, chat and 24/7 customer support</p>
          </div>
        </div>

        {/* Main Support Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {[
            { icon: FileText, title: 'Archival FAQ', desc: 'Detailed guides for all platform features and booking policies.', color: 'text-blue-600', bg: 'bg-blue-50/80' },
            { icon: MessageSquare, title: 'Live Chat', desc: 'Zero-latency concierge resolution with our support agents.', color: 'text-emerald-600', bg: 'bg-emerald-50/80' },
            { icon: PhoneCall, title: 'Priority Call', desc: 'Immediate trans-continental phone support for VIP members.', color: 'text-amber-600', bg: 'bg-amber-50/80' }
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <div key={i} className="bg-white rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 p-8 flex flex-col justify-between group hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                <div>
                  <div className={`w-16 h-16 rounded-[1.2rem] ${item.bg} flex items-center justify-center ${item.color} mb-6 group-hover:scale-110 transition-transform duration-300 shadow-sm`}>
                    <Icon size={28} strokeWidth={2.5} />
                  </div>
                  <h3 className="text-2xl font-black text-[#111] tracking-tight mb-3">{item.title}</h3>
                  <p className="text-gray-500 font-medium leading-relaxed">{item.desc}</p>
                </div>
                <div className="mt-8 flex items-center text-sm font-black text-[#111] uppercase tracking-widest group-hover:text-rose-500 transition-colors">
                  Get Help <ChevronRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Global Support Card */}
        <div className="bg-[#111] rounded-[2.5rem] p-10 lg:p-14 text-white shadow-[0_20px_40px_rgb(0,0,0,0.12)] relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gradient-to-bl from-rose-500/20 to-transparent rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>
          
          <div className="relative z-10 max-w-xl">
            <div className="flex items-center gap-3 mb-4">
              <Globe size={24} className="text-rose-400" />
              <span className="text-xs font-black uppercase tracking-[0.2em] text-white/60">Global Reach</span>
            </div>
            <h2 className="text-4xl font-black tracking-tight mb-4">Need personalized assistance?</h2>
            <p className="text-lg text-white/70 font-medium">Our travel experts are available worldwide to help you plan your next perfect getaway.</p>
          </div>
          
          <div className="relative z-10 shrink-0">
            <button className="bg-white text-[#111] px-10 py-5 rounded-full font-black uppercase tracking-widest shadow-[0_8px_20px_rgb(255,255,255,0.2)] hover:bg-gray-100 hover:-translate-y-1 active:scale-95 transition-all">
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;
