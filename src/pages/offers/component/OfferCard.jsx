import React from 'react';
import { CheckCircle, Copy, ArrowRight } from 'lucide-react';

const OfferCard = ({ offer, categoryIcon, copyToClipboard, idx }) => {
  return (
    <div 
      className="bg-white rounded-[32px] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 group border border-gray-100 flex flex-col h-full animate-fade-in"
      style={{ animationDelay: `${idx * 50}ms` }}
    >
      {/* Image Section */}
      <div className="relative h-[200px] overflow-hidden">
        <img 
          src={offer.img} 
          alt={offer.title} 
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest uppercase shadow-sm">
          {offer.tag}
        </div>
        <div className="absolute bottom-4 left-4 flex items-center gap-2 text-white">
          <div className="w-8 h-8 rounded-full bg-[#008cff] flex items-center justify-center">
             {categoryIcon}
          </div>
          <span className="text-xs font-black uppercase tracking-widest">{offer.category}</span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-8 flex flex-col flex-1">
        <h3 className="text-xl font-black text-slate-800 leading-tight mb-4 group-hover:text-[#008cff] transition-colors line-clamp-2">
          {offer.title}
        </h3>
        <p className="text-sm text-gray-500 font-medium leading-relaxed mb-6 flex-1 line-clamp-3">
          {offer.subtitle}
        </p>
        
        {/* Validity & Code */}
        <div className="bg-gray-50 rounded-2xl p-4 mb-6 border border-dashed border-gray-200">
          <div className="flex justify-between items-center text-[11px] font-black text-gray-400 uppercase tracking-widest mb-1.5">
            <span>{offer.code ? 'PROMO CODE' : 'VALIDITY'}</span>
            <span className="text-emerald-500 flex items-center gap-1">
              <CheckCircle size={12} />
              VERIFIED
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className={`font-black ${offer.code ? 'text-lg text-slate-800' : 'text-sm text-gray-600'}`}>
              {offer.code || offer.validity}
            </span>
            {offer.code && (
              <button 
                onClick={() => copyToClipboard(offer.code)}
                className="w-10 h-10 rounded-full bg-white shadow-sm border border-gray-100 flex items-center justify-center text-[#008cff] hover:bg-[#008cff] hover:text-white transition-all active:scale-90"
              >
                <Copy size={16} />
              </button>
            )}
          </div>
        </div>

        <button className="w-full bg-[#008cff] hover:bg-[#005ea1] text-white py-4 rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-2 group/btn transition-all shadow-lg hover:shadow-[#008cff]/30 active:scale-95">
          {offer.cta || 'BOOK NOW'}
          <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};

export default OfferCard;
