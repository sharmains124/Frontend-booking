import React from 'react';
import { Shield, Smartphone, Laptop, Globe, CheckCircle, ShieldCheck, LogOut } from 'lucide-react';

const Security = () => {
  return (
    <div className="min-h-screen bg-[#FDFDFD] pt-28 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-12 flex items-center gap-6">
          <div className="w-20 h-20 bg-slate-100 rounded-[1.5rem] flex items-center justify-center text-slate-700 shadow-sm">
            <Shield size={36} strokeWidth={2.5} />
          </div>
          <div>
            <h1 className="text-5xl font-black text-[#111] tracking-tight mb-2">Security Activity</h1>
            <p className="text-[#666] font-medium text-lg">Monitor your logins and connected devices</p>
          </div>
        </div>

        {/* Security Banner */}
        <div className="bg-emerald-50/50 rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.02)] border border-emerald-100 p-10 mb-10 flex items-center gap-8 animate-fade-in-up">
          <div className="w-20 h-20 bg-white text-emerald-500 rounded-full flex items-center justify-center shrink-0 shadow-sm border border-emerald-100/50">
            <ShieldCheck size={40} strokeWidth={2.5} />
          </div>
          <div>
            <h3 className="text-2xl font-black text-[#111] mb-2 tracking-tight">Your account is secure</h3>
            <p className="text-emerald-700 font-medium text-lg">We haven't detected any suspicious activity on your account recently.</p>
          </div>
        </div>

        <h3 className="text-xs font-black text-gray-400 mb-4 ml-6 uppercase tracking-[0.2em]">Active Devices</h3>
        
        {/* Devices List */}
        <div className="bg-white rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 overflow-hidden animate-fade-in-up" style={{ animationDelay: '100ms' }}>
          
          <div className="p-8 flex items-center gap-6 border-b border-gray-100/60 hover:bg-gray-50 transition-colors group">
            <div className="w-16 h-16 bg-blue-50/80 text-blue-600 rounded-[1.2rem] flex items-center justify-center shrink-0 shadow-sm transition-transform group-hover:scale-110">
              <Laptop size={28} strokeWidth={2.5} />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1.5">
                <h4 className="font-bold text-[#111] text-xl tracking-tight">Windows PC • Chrome</h4>
                <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md uppercase tracking-widest border border-emerald-100">Current Session</span>
              </div>
              <p className="text-sm text-gray-500 font-medium flex items-center gap-2">
                <Globe size={14} /> New Delhi, India • Active now
              </p>
            </div>
          </div>
          
          <div className="p-8 flex items-center gap-6 hover:bg-gray-50 transition-colors group">
            <div className="w-16 h-16 bg-gray-50 text-gray-500 rounded-[1.2rem] flex items-center justify-center shrink-0 border border-gray-200 transition-transform group-hover:scale-110">
              <Smartphone size={28} strokeWidth={2.5} />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1.5">
                <h4 className="font-bold text-[#111] text-xl tracking-tight">iPhone 13 Pro • Safari</h4>
              </div>
              <p className="text-sm text-gray-500 font-medium flex items-center gap-2">
                <Globe size={14} /> Mumbai, India • Last active: 2 hours ago
              </p>
            </div>
            <button className="flex items-center justify-center w-12 h-12 rounded-full bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-all active:scale-95 shadow-sm">
              <LogOut size={20} strokeWidth={2.5} className="-ml-0.5" />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Security;
