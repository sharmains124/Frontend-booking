import React from 'react';
import { Mail, Phone, MapPin, Send, MessageCircle, Clock, ShieldCheck, Zap, ArrowRight } from 'lucide-react';
import Button from '../components/Button';
import Support from '../components/Support';

const ContactPage = () => {
  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div className="bg-secondary-900 py-64 text-center text-white relative overflow-hidden">
        <div className="absolute inset-0 z-0 scale-110">
          <img 
            src="https://images.unsplash.com/photo-1464037862896-6a75d2fac19b?q=80&w=2000" 
            alt="Travel background" 
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        
        <div className="container-custom relative z-10 pt-12">
          <p className="text-[12px] font-serif font-bold tracking-[0.4em] uppercase text-accent-gold mb-10">CONCIERGE TERMINAL</p>
          <h1 className="text-6xl md:text-[110px] font-serif font-bold mb-12 tracking-tight leading-[0.85]">At your <br/> command.</h1>
          <p className="text-xl text-white/50 max-w-2xl mx-auto font-serif italic">
            Exceptional service is the cornerstone of Radiance. Connect with our dedicated stewards for absolute precision.
          </p>
        </div>
      </div>

      <div className="container-custom -mt-32 relative z-20 pb-48">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Quick Contacts */}
          <div className="lg:col-span-5 space-y-12">
             <div className="bg-secondary-900 rounded-[3rem] p-16 text-white shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-12 opacity-5 scale-150 transition-transform duration-1000 group-hover:rotate-12">
                    <ShieldCheck size={200} />
                </div>
                
                <h3 className="text-3xl font-serif font-bold mb-16 text-white tracking-tight">Direct Access</h3>
                
                <div className="space-y-16">
                  <div className="flex items-start gap-8">
                    <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-accent-gold">
                       <Phone size={24} />
                    </div>
                    <div>
                      <h4 className="font-serif font-bold text-[10px] uppercase tracking-[0.2em] text-white/40 mb-3">Priority Voice</h4>
                      <p className="text-2xl font-serif font-bold text-white tracking-widest">+1 (800) 123-4567</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-8">
                    <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-accent-gold">
                       <Mail size={24} />
                    </div>
                    <div>
                      <h4 className="font-serif font-bold text-[10px] uppercase tracking-[0.2em] text-white/40 mb-3">Archives</h4>
                      <p className="text-2xl font-serif font-bold text-white tracking-widest">concierge@radiance.com</p>
                    </div>
                  </div>
                </div>

                <div className="mt-24 pt-16 border-t border-white/5">
                   <p className="text-[11px] font-serif font-bold text-white/40 leading-loose uppercase tracking-[0.2em]">Our stewards are trained in zero-latency resolution protocols available at all global coordinates.</p>
                </div>
             </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-7">
             <div className="bg-white rounded-[3rem] p-16 md:p-24 shadow-classic border border-accent-gold/10">
                <div className="mb-20">
                    <h3 className="text-5xl font-serif font-bold text-secondary-900 tracking-tight">Correspondence</h3>
                    <p className="text-[11px] font-serif font-bold text-secondary-400 uppercase tracking-[0.2em] mt-6">Average resolution: 64 minutes</p>
                </div>

                <form className="space-y-12">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="space-y-4">
                       <label className="text-[10px] font-serif font-bold text-secondary-400 uppercase tracking-[0.1em] px-4">Subject Narrative</label>
                       <input type="text" className="input-field-apple !bg-accent-cream/30" placeholder="First Designation" />
                    </div>
                    <div className="space-y-4">
                       <label className="text-[10px] font-serif font-bold text-secondary-400 uppercase tracking-[0.1em] px-4">Surname</label>
                       <input type="text" className="input-field-apple !bg-accent-cream/30" placeholder="Last Name" />
                    </div>
                  </div>

                  <div className="space-y-4">
                     <label className="text-[10px] font-serif font-bold text-secondary-400 uppercase tracking-[0.1em] px-4">Electronic Mail</label>
                     <input type="email" className="input-field-apple !bg-accent-cream/30" placeholder="patron@domain.com" />
                  </div>

                  <div className="space-y-4">
                    <label className="text-[10px] font-serif font-bold text-secondary-400 uppercase tracking-[0.1em] px-4">Elaboration</label>
                    <textarea rows="5" className="input-field-apple !bg-accent-cream/30 resize-none" placeholder="How may we elevate your experience?"></textarea>
                  </div>

                  <div className="pt-8">
                    <Button variant="pill" size="lg" className="w-full shadow-2xl group py-6">
                      DISPATCH MESSAGE
                      <ArrowRight className="ml-4 w-5 h-5 transform group-hover:translate-x-2 transition-transform" />
                    </Button>
                  </div>
                </form>
             </div>
          </div>
        </div>
      </div>

      <div>
         <Support />
      </div>
    </div>
  );
};

export default ContactPage;
