import React from 'react';
import { Wallet as WalletIcon, TrendingUp, CreditCard, Clock, Plus, IndianRupee } from 'lucide-react';

const Wallet = () => {
  return (
    <div className="min-h-screen bg-[#FDFDFD] pt-28 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-12 flex items-center gap-6">
          <div className="w-20 h-20 bg-emerald-50 rounded-[1.5rem] flex items-center justify-center text-emerald-600 shadow-sm">
            <WalletIcon size={36} strokeWidth={2.5} />
          </div>
          <div>
            <h1 className="text-5xl font-black text-[#111] tracking-tight mb-2">wingtrip Wallet</h1>
            <p className="text-[#666] font-medium text-lg">Manage your balance and transactions</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          {/* Main Balance Card */}
          <div className="md:col-span-2 bg-[#111] rounded-[2.5rem] p-10 text-white shadow-[0_20px_40px_rgb(0,0,0,0.12)] relative overflow-hidden animate-fade-in-up group">
            {/* Glossy Overlay Effects */}
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gradient-to-bl from-white/10 to-transparent rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none transition-transform duration-1000 group-hover:scale-110"></div>
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-gradient-to-tr from-emerald-500/20 to-transparent rounded-full blur-3xl -ml-20 -mb-20 pointer-events-none transition-transform duration-1000 group-hover:scale-110"></div>
            
            <div className="relative z-10 flex flex-col h-full justify-between">
              <div className="flex items-center justify-between mb-8">
                <p className="text-white/60 font-black uppercase tracking-[0.2em] text-xs">Available Balance</p>
                <div className="w-12 h-8 bg-white/20 backdrop-blur-md rounded-lg flex items-center justify-center">
                  <span className="w-6 h-6 border-2 border-white/50 rounded-full inline-block"></span>
                  <span className="w-6 h-6 border-2 border-white/50 rounded-full inline-block -ml-3 bg-white/10"></span>
                </div>
              </div>
              
              <h2 className="text-6xl font-black mb-12 flex items-start tracking-tight">
                <span className="text-3xl text-emerald-400 mt-2 mr-1">₹</span>450<span className="text-3xl text-white/40 mt-2">.00</span>
              </h2>
              
              <div className="flex gap-4">
                <button className="bg-white text-[#111] px-8 py-3.5 rounded-full font-black text-sm uppercase tracking-widest flex items-center gap-2 hover:bg-gray-100 transition-all shadow-[0_8px_20px_rgb(255,255,255,0.2)] active:scale-95 hover:-translate-y-0.5">
                  <Plus size={18} strokeWidth={2.5} /> Add Money
                </button>
                <button className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-8 py-3.5 rounded-full font-black text-sm uppercase tracking-widest flex items-center gap-2 hover:bg-white/20 transition-all active:scale-95 hover:-translate-y-0.5">
                  <CreditCard size={18} strokeWidth={2.5} /> Withdraw
                </button>
              </div>
            </div>
          </div>

          {/* Stats Card */}
          <div className="bg-white rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 p-10 flex flex-col justify-center animate-fade-in-up" style={{ animationDelay: '100ms' }}>
            <div className="w-16 h-16 bg-blue-50/80 text-blue-600 rounded-[1.2rem] flex items-center justify-center mb-6 shadow-sm">
              <TrendingUp size={30} strokeWidth={2.5} />
            </div>
            <p className="text-gray-400 font-black uppercase tracking-[0.2em] text-[11px] mb-2">Total Saved</p>
            <h3 className="text-4xl font-black text-[#111] tracking-tight mb-4">₹1,250</h3>
            <div className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-600 px-3 py-1.5 rounded-lg text-[11px] font-black uppercase tracking-widest w-max border border-emerald-100/50">
              <TrendingUp size={14} />
              +12% vs last month
            </div>
          </div>
        </div>

        {/* Transactions Section */}
        <div className="bg-white rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 overflow-hidden animate-fade-in-up" style={{ animationDelay: '200ms' }}>
          <div className="p-8 border-b border-gray-100/60 flex items-center justify-between">
            <h3 className="text-2xl font-black text-[#111] tracking-tight ml-2">Recent Transactions</h3>
            <button className="text-sm font-bold text-gray-400 hover:text-[#111] transition-colors">View All</button>
          </div>
          
          <div className="p-20 text-center flex flex-col items-center justify-center relative overflow-hidden group">
            <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[radial-gradient(circle_at_center,_#000_1px,_transparent_1px)]" style={{ backgroundSize: '24px 24px' }}></div>
            
            <div className="relative w-32 h-32 mb-8">
               <div className="absolute inset-0 bg-gray-100 rounded-full blur-2xl opacity-60"></div>
               <div className="relative w-full h-full bg-white rounded-full border border-gray-100 shadow-xl flex items-center justify-center z-10">
                 <Clock size={48} className="text-gray-300" strokeWidth={1.5} />
               </div>
            </div>
            
            <h4 className="text-2xl font-black text-[#111] mb-2 tracking-tight">No Recent Activity</h4>
            <p className="text-gray-500 font-medium text-lg max-w-md">Your recent transactions will appear here. Start booking to see your wallet history.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wallet;
