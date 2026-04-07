import React from 'react';

const Newsletter = () => {
  return (
    <section className="bg-secondary-900 rounded-[5rem] p-16 md:p-32 text-center relative overflow-hidden group">
       <div className="absolute inset-0 bg-accent-gold opacity-5 translate-y-full group-hover:translate-y-0 transition-transform duration-1000"></div>
       <div className="relative z-10 max-w-4xl mx-auto">
          <span className="text-[11px] font-black text-accent-gold uppercase tracking-[0.8em] mb-8 block">THE RADIANCE DISPATCH</span>
          <h3 className="text-6xl md:text-8xl font-serif font-bold text-white tracking-tighter leading-none mb-16">
             Archival <br/> <span className="text-white/20 italic">Provisions.</span>
          </h3>
          <p className="text-2xl font-serif italic text-white/40 mb-20 max-w-2xl mx-auto">
             Join the inner circle for first-access to trans-continental manifests and elite tier updates.
          </p>
          <div className="flex flex-col md:flex-row gap-6 max-w-xl mx-auto">
             <input type="email" placeholder="patron@archival-domain.com" className="flex-grow bg-white/5 border border-white/10 rounded-full px-12 py-6 text-white text-lg font-serif italic focus:ring-4 ring-accent-gold/20 transition-all outline-none" />
             <button className="bg-white text-secondary-900 rounded-full px-16 py-6 text-[12px] font-black uppercase tracking-widest hover:bg-accent-gold transition-all shadow-2xl">SUBSCRIBE</button>
          </div>
       </div>
    </section>
  );
};

export default Newsletter;
