import React from 'react';
import { 
  Search, 
  TrendingUp
} from 'lucide-react';
import Button from '../components/Button';
import BookingEngine from '../components/SearchForm';

const PlaceholderPage = ({ title, icon: IconComponent }) => (
  <div className="bg-white min-h-screen pt-48 pb-64">
    <div className="container-custom">
      <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
        <div className="w-32 h-32 rounded-[3.5rem] bg-accent-cream flex items-center justify-center text-accent-gold mb-16 shadow-premium">
           <IconComponent size={48} />
        </div>
        <span className="text-[13px] font-black uppercase tracking-[0.8em] text-accent-gold mb-10">ARCHIVAL PROVISIONING</span>
        <h1 className="text-8xl md:text-[140px] font-serif font-bold text-secondary-900 tracking-tighter leading-[0.8] mb-16">
          {title} <br/> 
          <span className="text-secondary-100 italic">Manifest.</span>
        </h1>
        <p className="text-2xl font-serif italic text-secondary-400 mb-20 leading-relaxed">
           The archival routes for {title.toLowerCase()} are currently being curated by our stewards. 
           Please check back for the sovereign update.
        </p>
        <div className="w-full mb-32">
           <BookingEngine />
        </div>
        <Button variant="pill" size="lg" onClick={() => window.history.back()}>
           RETURN TO ARCHIVE
        </Button>
      </div>
    </div>
  </div>
);

export const BusPage = () => <PlaceholderPage title="Omnibus" icon={Search} />;
export const TrainsPage = () => <PlaceholderPage title="Locomotive" icon={TrendingUp} />;
