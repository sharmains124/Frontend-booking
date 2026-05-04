import React from 'react';
import { User, Award, CheckCircle, ShieldCheck, Star } from 'lucide-react';

const MyAccount = () => {
  return (
    <div className="min-h-screen bg-[#FDFDFD] pt-28 pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-12 flex items-center gap-6">
          <div className="w-20 h-20 bg-amber-50 rounded-[1.5rem] flex items-center justify-center text-amber-600 shadow-sm">
            <User size={36} strokeWidth={2.5} />
          </div>
          <div>
            <h1 className="text-5xl font-black text-[#111] tracking-tight mb-2">My Account</h1>
            <p className="text-[#666] font-medium text-lg">Manage identity verification and membership tier</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Tier Level Card */}
          <div className="bg-[#111] rounded-[2.5rem] p-10 text-white shadow-[0_20px_40px_rgb(0,0,0,0.12)] relative overflow-hidden animate-fade-in-up group">
            {/* Elegant Background Gradients */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-amber-500/20 to-transparent rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none transition-transform duration-1000 group-hover:scale-110"></div>
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-yellow-500/10 to-transparent rounded-full blur-3xl -ml-20 -mb-20 pointer-events-none transition-transform duration-1000 group-hover:scale-110"></div>
            
            <div className="relative z-10 h-full flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-12">
                  <div className="w-16 h-16 bg-gradient-to-br from-amber-300 to-amber-600 rounded-[1.2rem] flex items-center justify-center shadow-lg border-2 border-white/10">
                    <Award size={32} strokeWidth={2} className="text-white" />
                  </div>
                  <span className="text-[10px] font-black bg-white/10 backdrop-blur-md px-4 py-2 rounded-full uppercase tracking-widest border border-white/20 shadow-sm flex items-center gap-1.5">
                    <Star size={12} className="text-amber-400 fill-amber-400" /> Tier Level
                  </span>
                </div>
                
                <h2 className="text-5xl font-black mb-4 tracking-tight bg-gradient-to-r from-amber-200 to-amber-500 bg-clip-text text-transparent">VIP Member</h2>
                <p className="text-white/80 font-medium text-lg mb-10 leading-relaxed max-w-[90%]">Enjoy exclusive lounge access, free cancellations, and priority 24/7 customer support globally.</p>
              </div>
              
              <button className="bg-white text-[#111] px-8 py-4 rounded-full font-black text-sm uppercase tracking-widest hover:bg-gray-100 transition-all shadow-[0_8px_20px_rgb(255,255,255,0.2)] active:scale-95 hover:-translate-y-0.5 mt-auto">
                View Exclusive Benefits
              </button>
            </div>
          </div>

          {/* Identity Verification Card */}
          <div className="bg-white rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 p-10 flex flex-col animate-fade-in-up" style={{ animationDelay: '100ms' }}>
            <div className="flex items-center gap-5 mb-10 pb-8 border-b border-gray-100/60">
              <div className="w-16 h-16 bg-emerald-50/80 rounded-[1.2rem] flex items-center justify-center text-emerald-500 shadow-sm">
                <ShieldCheck size={32} strokeWidth={2.5} />
              </div>
              <div>
                <h3 className="text-2xl font-black text-[#111] tracking-tight mb-1">Identity Verification</h3>
                <p className="text-sm text-gray-500 font-medium">Complete KYC to unlock full limits</p>
              </div>
            </div>
            
            <div className="flex-1 space-y-6">
              <div className="flex items-center gap-6 p-4 -mx-4 rounded-[1.5rem] hover:bg-gray-50 transition-colors">
                <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-500 flex items-center justify-center shadow-sm border border-emerald-200/50">
                  <CheckCircle size={20} strokeWidth={2.5} />
                </div>
                <div>
                  <p className="font-bold text-lg text-[#111] tracking-tight">Email Verified</p>
                  <p className="text-xs text-gray-500 font-medium mt-0.5">user@example.com</p>
                </div>
              </div>
              
              <div className="flex items-center gap-6 p-4 -mx-4 rounded-[1.5rem] hover:bg-gray-50 transition-colors">
                <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-500 flex items-center justify-center shadow-sm border border-emerald-200/50">
                  <CheckCircle size={20} strokeWidth={2.5} />
                </div>
                <div>
                  <p className="font-bold text-lg text-[#111] tracking-tight">Phone Verified</p>
                  <p className="text-xs text-gray-500 font-medium mt-0.5">+91 98765 43210</p>
                </div>
              </div>
              
              <div className="flex items-center gap-6 p-4 -mx-4 rounded-[1.5rem] bg-amber-50/50 border border-amber-100/50 transition-colors group cursor-pointer">
                <div className="w-10 h-10 border-2 border-amber-300 border-dashed rounded-full flex items-center justify-center bg-white group-hover:scale-110 transition-transform"></div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="font-bold text-lg text-[#111] tracking-tight">Government ID</p>
                    <p className="text-[10px] text-amber-600 font-black bg-amber-100 px-2 py-0.5 rounded-md uppercase tracking-widest border border-amber-200">Pending</p>
                  </div>
                  <p className="text-xs text-gray-500 font-medium mt-0.5">Upload a valid ID proof</p>
                </div>
              </div>
            </div>
            
            <button className="mt-10 bg-[#111] text-white px-8 py-4 rounded-full font-black text-sm uppercase tracking-widest hover:bg-black hover:-translate-y-1 transition-all shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-2xl active:scale-95 w-full">
              Complete KYC Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyAccount;
