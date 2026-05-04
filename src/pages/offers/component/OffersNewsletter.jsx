import React from 'react';

const OffersNewsletter = () => {
  return (
    <section className="container-custom mt-20 px-6">
      <div className="bg-slate-900 rounded-[48px] p-8 md:p-16 flex flex-col lg:flex-row items-center justify-between gap-12 overflow-hidden relative shadow-2xl">
        <div className="relative z-10 text-center lg:text-left">
          <h2 className="text-3xl md:text-5xl font-black text-white mb-6">Never Miss A Deal!</h2>
          <p className="text-slate-400 font-medium text-lg max-w-xl">
            Subscribe to our newsletter and get the hottest travel deals, coupons, and discounts delivered straight to your inbox.
          </p>
        </div>
        
        <div className="w-full max-w-md relative z-10">
          <form className="flex flex-col sm:flex-row gap-4" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="flex-1 h-16 bg-white/10 border border-white/20 rounded-2xl px-6 font-bold text-white outline-none focus:border-[#008cff] transition-all"
            />
            <button className="h-16 px-8 bg-[#008cff] hover:bg-white hover:text-[#008cff] text-white rounded-2xl font-black text-sm uppercase tracking-widest transition-all">
              JOIN NOW
            </button>
          </form>
          <p className="text-[10px] text-white/40 mt-4 text-center sm:text-left font-bold tracking-widest uppercase">
            By subscribing, you agree to our Terms and Privacy Policy.
          </p>
        </div>
        
        {/* Shapes */}
        <div className="absolute top-0 right-0 w-[400px] h-full bg-[#008cff]/5 skew-x-12 translate-x-1/2"></div>
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-white/5 rounded-full blur-[60px]"></div>
      </div>
    </section>
  );
};

export default OffersNewsletter;
