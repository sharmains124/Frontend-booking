import React, { useState } from 'react';
import { Settings as SettingsIcon, Bell, Shield, Eye, Globe, CreditCard, ChevronRight, Check } from 'lucide-react';

const Settings = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  return (
    <div className="min-h-screen bg-[#FDFDFD] pt-28 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-12 flex items-center gap-6">
          <div className="w-20 h-20 bg-indigo-50 rounded-[1.5rem] flex items-center justify-center text-indigo-600 shadow-sm">
            <SettingsIcon size={36} strokeWidth={2.5} />
          </div>
          <div>
            <h1 className="text-5xl font-black text-[#111] tracking-tight mb-2">Settings</h1>
            <p className="text-[#666] font-medium text-lg">Configure your privacy and preferences</p>
          </div>
        </div>

        <div className="space-y-6">
          {/* Group 1: Preferences */}
          <div className="bg-white rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 p-4">
            <p className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] ml-6 mt-4 mb-2">App Preferences</p>
            
            <div 
              className="p-6 flex items-center justify-between rounded-[1.5rem] hover:bg-gray-50 transition-colors cursor-pointer group"
              onClick={() => setNotificationsEnabled(!notificationsEnabled)}
            >
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 bg-blue-50/80 rounded-[1.2rem] flex items-center justify-center text-blue-600 transition-transform group-hover:scale-110">
                  <Bell size={24} strokeWidth={2.5} />
                </div>
                <div>
                  <h4 className="font-bold text-[#111] text-xl tracking-tight mb-1">Notifications</h4>
                  <p className="text-sm text-gray-500 font-medium">Email, SMS, and Push alerts</p>
                </div>
              </div>
              
              {/* Custom Toggle */}
              <div className={`w-14 h-8 rounded-full relative shadow-inner transition-colors duration-300 ${notificationsEnabled ? 'bg-[#111]' : 'bg-gray-200'}`}>
                <div className={`absolute top-1 bottom-1 w-6 bg-white rounded-full shadow-md transition-transform duration-300 flex items-center justify-center ${notificationsEnabled ? 'translate-x-7' : 'translate-x-1'}`}>
                  {notificationsEnabled && <Check size={12} className="text-[#111]" strokeWidth={4} />}
                </div>
              </div>
            </div>
            
            <div className="p-6 flex items-center justify-between rounded-[1.5rem] hover:bg-gray-50 transition-colors cursor-pointer group">
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 bg-emerald-50/80 rounded-[1.2rem] flex items-center justify-center text-emerald-600 transition-transform group-hover:scale-110">
                  <Globe size={24} strokeWidth={2.5} />
                </div>
                <div>
                  <h4 className="font-bold text-[#111] text-xl tracking-tight mb-1">Language & Region</h4>
                  <p className="text-sm text-gray-500 font-medium">English (US), USD ($)</p>
                </div>
              </div>
              <ChevronRight size={20} className="text-gray-300 group-hover:text-gray-500 group-hover:translate-x-1 transition-all" />
            </div>
          </div>

          {/* Group 2: Security & Privacy */}
          <div className="bg-white rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 p-4">
            <p className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] ml-6 mt-4 mb-2">Security & Privacy</p>
            
            <div className="p-6 flex items-center justify-between rounded-[1.5rem] hover:bg-gray-50 transition-colors cursor-pointer group">
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 bg-purple-50/80 rounded-[1.2rem] flex items-center justify-center text-purple-600 transition-transform group-hover:scale-110">
                  <Shield size={24} strokeWidth={2.5} />
                </div>
                <div>
                  <h4 className="font-bold text-[#111] text-xl tracking-tight mb-1">Two-Factor Auth (2FA)</h4>
                  <p className="text-sm text-gray-500 font-medium">Add an extra layer of security</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="bg-amber-50 text-amber-600 px-3 py-1 rounded-md text-[10px] font-black uppercase tracking-widest border border-amber-100">Recommended</span>
                <ChevronRight size={20} className="text-gray-300 group-hover:text-gray-500 group-hover:translate-x-1 transition-all" />
              </div>
            </div>
            
            <div className="p-6 flex items-center justify-between rounded-[1.5rem] hover:bg-gray-50 transition-colors cursor-pointer group">
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 bg-orange-50/80 rounded-[1.2rem] flex items-center justify-center text-orange-600 transition-transform group-hover:scale-110">
                  <Eye size={24} strokeWidth={2.5} />
                </div>
                <div>
                  <h4 className="font-bold text-[#111] text-xl tracking-tight mb-1">Privacy Controls</h4>
                  <p className="text-sm text-gray-500 font-medium">Manage how your data is used</p>
                </div>
              </div>
              <ChevronRight size={20} className="text-gray-300 group-hover:text-gray-500 group-hover:translate-x-1 transition-all" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
