import React from 'react';
import { Link } from 'react-router-dom';
import { User, ChevronDown } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#f8f9fa] mt-16 border-t border-gray-200">
      {/* Top Main Section */}
      <div className="max-w-[1400px] mx-auto px-6 py-12">
        
        {/* Quick Links Multi Columns */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 px-2 py-8">
          {/* Col 1 */}
          <div className="space-y-4">
            <h4 className="text-[11px] font-bold text-gray-900 mb-2">Destination Cities</h4>
            {['Bangkok Hotels', 'Tokyo Hotels', 'Singapore Hotels', 'London Hotels', 'Paris Hotels'].map(l => (
              <div key={l}><Link to="#" className="text-[10px] text-gray-500 hover:text-blue-600">{l}</Link></div>
            ))}
          </div>
          {/* Col 2 */}
          <div className="space-y-4">
            <h4 className="text-[11px] font-bold text-gray-900 mb-2">Countries</h4>
            {['Japan Hotels', 'United States Hotels', 'Thailand Hotels', 'Malaysia Hotels', 'Australia Hotels'].map(l => (
              <div key={l}><Link to="#" className="text-[10px] text-gray-500 hover:text-blue-600">{l}</Link></div>
            ))}
          </div>
          {/* Col 3 */}
          <div className="space-y-4">
            <h4 className="text-[11px] font-bold text-gray-900 mb-2">Wingtrip Homes</h4>
            {['Bangkok Apartments', 'Kuala Lumpur Apartments', 'Osaka Apartments', 'Bali Villas'].map(l => (
              <div key={l}><Link to="#" className="text-[10px] text-gray-500 hover:text-blue-600">{l}</Link></div>
            ))}
          </div>
          {/* Col 4 */}
          <div className="space-y-4">
            <h4 className="text-[11px] font-bold text-gray-900 mb-2">Destination Guides</h4>
            {['Bali Guide', 'Phuket Guide', 'Osaka Guide', 'Sydney Guide'].map(l => (
              <div key={l}><Link to="#" className="text-[10px] text-gray-500 hover:text-blue-600">{l}</Link></div>
            ))}
          </div>
          {/* Col 5 */}
          <div className="space-y-4">
            <h4 className="text-[11px] font-bold text-gray-900 mb-2">Other Destinations</h4>
            {['Europe Hotels', 'Middle East Hotels', 'Oceania Hotels', 'Africa Hotels'].map(l => (
              <div key={l}><Link to="#" className="text-[10px] text-gray-500 hover:text-blue-600">{l}</Link></div>
            ))}
          </div>
        </div>

      </div>

      {/* Bottom Dark Copyright Section */}
      <div className="bg-[#2a2a2c] py-8">
        <div className="max-w-[800px] mx-auto text-center space-y-6">
          <p className="text-[10px] text-gray-400 leading-relaxed font-medium">
            All material herein © 2005-2023 Wingtrip Company Pte. Ltd. All Rights Reserved.<br />
            Wingtrip is part of Booking Holdings Inc., the world leader in online travel & related services.
          </p>
          
          <div className="flex flex-wrap justify-center items-center gap-6 md:gap-14 pt-2 opacity-70">
            {/* Fake logos using text/css for now to match screenshot footprint */}
            <div className="flex items-center gap-1">
              <div className="flex gap-0.5">
                <div className="w-2 h-2 rounded-full bg-red-500"></div>
                <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
              </div>
              <span className="text-white font-bold text-sm ml-1 tracking-tight">Wingtrip</span>
            </div>
            
            <div className="text-blue-400 font-bold text-sm tracking-tight">priceline</div>
            <div className="text-orange-500 font-black text-sm uppercase px-1 py-0.5 border border-orange-500">KAYAK</div>
            <div className="text-white font-black tracking-tighter text-sm">Booking.com</div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
