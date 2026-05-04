import React from 'react';
import { Link } from 'react-router-dom';
import { User, ChevronDown } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-slate-100">
      {/* Top Main Section */}
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-20">
        
        {/* Quick Links Multi Columns */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-10 md:gap-12">
          {/* Col 1 */}
          <div>
            <h4 className="text-xs font-black text-slate-900 mb-6 uppercase tracking-widest">Destinations</h4>
            <div className="space-y-3">
              {['Bangkok', 'Tokyo', 'Singapore', 'London', 'Paris'].map(l => (
                <div key={l}><Link to="#" className="text-sm font-medium text-slate-400 hover:text-primary transition-colors">{l}</Link></div>
              ))}
            </div>
          </div>
          {/* Col 2 */}
          <div>
            <h4 className="text-xs font-black text-slate-900 mb-6 uppercase tracking-widest">Countries</h4>
            <div className="space-y-3">
              {['Japan', 'United States', 'Thailand', 'Malaysia', 'Australia'].map(l => (
                <div key={l}><Link to="#" className="text-sm font-medium text-slate-400 hover:text-primary transition-colors">{l}</Link></div>
              ))}
            </div>
          </div>
          {/* Col 3 */}
          <div>
            <h4 className="text-xs font-black text-slate-900 mb-6 uppercase tracking-widest">Homes</h4>
            <div className="space-y-3">
              {['Apartments', 'Villas', 'Beach Houses', 'Mountain Cabins'].map(l => (
                <div key={l}><Link to="#" className="text-sm font-medium text-slate-400 hover:text-primary transition-colors">{l}</Link></div>
              ))}
            </div>
          </div>
          {/* Col 4 */}
          <div className="hidden md:block">
            <h4 className="text-xs font-black text-slate-900 mb-6 uppercase tracking-widest">Guides</h4>
            <div className="space-y-3">
              {['Bali Guide', 'Phuket Guide', 'Osaka Guide', 'Sydney Guide'].map(l => (
                <div key={l}><Link to="#" className="text-sm font-medium text-slate-400 hover:text-primary transition-colors">{l}</Link></div>
              ))}
            </div>
          </div>
          {/* Col 5 - Logo/About */}
          <div className="col-span-2 lg:col-span-1 border-t md:border-t-0 border-slate-100 pt-10 md:pt-0">
             <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
                   <span className="text-white text-xs font-black">W</span>
                </div>
                <span className="text-xl font-black text-slate-900 uppercase tracking-tighter">Wingtrip</span>
             </div>
             <p className="text-xs font-medium text-slate-400 leading-relaxed max-w-[200px]">
               The premium way to explore the world with absolute precision and elite comfort.
             </p>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="bg-slate-900 py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-6 text-center space-y-8">
          <div className="flex flex-wrap justify-center items-center gap-6 md:gap-16 opacity-30 grayscale invert">
            <div className="text-white font-bold text-lg tracking-tight">priceline</div>
            <div className="text-white font-black text-lg uppercase px-1 py-0.5 border border-white">KAYAK</div>
            <div className="text-white font-black tracking-tighter text-lg">Booking.com</div>
            <div className="text-white font-black tracking-tighter text-lg">Agoda</div>
          </div>

          <div className="w-12 h-px bg-white/10 mx-auto"></div>

          <p className="text-[10px] md:text-xs text-slate-500 leading-balanced font-medium tracking-wide">
            © 2024 Wingtrip Worldwide. All Rights Reserved.<br />
            Wing Trip is a trademark of Elite Travel Group Inc.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
