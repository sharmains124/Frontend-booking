import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Train, User, Mail, Phone, ShieldCheck, ArrowRight,
  CheckCircle2, MapPin, Calendar, CreditCard, ChevronLeft
} from 'lucide-react';

const CLASS_COLORS = {
  '1A': { bg: 'bg-purple-600', light: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200' },
  '2A': { bg: 'bg-blue-600', light: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' },
  '3A': { bg: 'bg-emerald-600', light: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200' },
  'SL': { bg: 'bg-orange-500', light: 'bg-orange-50', text: 'text-orange-700', border: 'border-orange-200' },
  'CC': { bg: 'bg-cyan-600', light: 'bg-cyan-50', text: 'text-cyan-700', border: 'border-cyan-200' },
};

const TrainReviewPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { train, selectedClass, from, to, date, passengers, total } = location.state || {
    train: { name: 'Rajdhani Express', number: '12301', departureTime: '16:55', arrivalTime: '10:00', duration: '17h 05m' },
    selectedClass: { type: '2A', price: 2710 },
    from: 'NDLS', to: 'CSTM',
    date: new Date().toISOString().split('T')[0],
    passengers: 1, total: 2650
  };

  const colorTheme = CLASS_COLORS[selectedClass?.type] || CLASS_COLORS['2A'];
  const formattedDate = new Date(date).toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

  const [passengerDetails, setPassengerDetails] = useState({
    firstName: '', lastName: '', email: '', mobile: '', age: ''
  });

  const handleContinue = (e) => {
    e.preventDefault();
    navigate('/trains/payment', {
      state: { train, selectedClass, from, to, date, passengers, total, passengerDetails }
    });
  };

  return (
    <div className="bg-[#f2f2f2] min-h-screen font-sans pb-20 pt-[80px]">
      <div className="max-w-7xl mx-auto px-6 pt-8">

        {/* Back Button */}
        <button onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-[13px] font-black text-text-muted hover:text-emerald-600 transition-colors mb-8 group">
          <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          Back to Train Details
        </button>

        {/* Step Indicator */}
        <div className="flex items-center justify-center gap-6 mb-12">
          {[
            { label: 'Review', active: true },
            { label: 'Payment', active: false },
            { label: 'Confirm', active: false }
          ].map((step, idx) => (
            <div key={idx} className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-lg transition-all duration-500 ${step.active ? `${colorTheme.bg} text-white shadow-xl scale-110` : 'bg-white text-gray-300 border border-gray-100'}`}>
                {idx + 1}
              </div>
              <span className={`text-[12px] font-black uppercase tracking-[0.2em] ${step.active ? colorTheme.text : 'text-gray-400'}`}>{step.label}</span>
              {idx < 2 && <div className="w-16 h-[2px] bg-gray-200 mx-4 rounded-full" />}
            </div>
          ))}
        </div>

        <div className="flex flex-col lg:flex-row gap-10 items-start">

          {/* ─── Left: Booking Summary + Form ────────────────────────── */}
          <div className="flex-1 space-y-8">

            {/* Journey Details Card */}
            <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
              <div className={`h-1.5 ${colorTheme.bg} w-full`} />
              <div className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className={`w-12 h-12 rounded-2xl ${colorTheme.bg} flex items-center justify-center`}>
                    <Train size={20} className="text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-black text-gray-900 uppercase tracking-tight">{train?.name}</h2>
                    <p className="text-[12px] font-bold text-text-muted">Train #{train?.number}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-6 border-y border-gray-50">
                  {[
                    { icon: <MapPin size={16} className={colorTheme.text} />, label: 'From', value: from },
                    { icon: <MapPin size={16} className="text-orange-500" />, label: 'To', value: to },
                    { icon: <Calendar size={16} className={colorTheme.text} />, label: 'Date', value: formattedDate.split(',')[0] + ', ' + formattedDate.split(', ')[1] },
                    { icon: <Train size={16} className={colorTheme.text} />, label: 'Class', value: selectedClass?.type },
                  ].map((item, i) => (
                    <div key={i}>
                      <div className="flex items-center gap-1 mb-1">{item.icon}<p className="text-[10px] font-black text-text-muted uppercase tracking-widest">{item.label}</p></div>
                      <p className="text-[15px] font-black text-gray-900">{item.value}</p>
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-8 pt-6">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${colorTheme.bg}`} />
                    <span className="text-[13px] font-black text-gray-700">Departs {train?.departureTime}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${colorTheme.bg}`} />
                    <span className="text-[13px] font-black text-gray-700">Arrives {train?.arrivalTime} (+1 Day)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck size={16} className="text-green-600" />
                    <span className="text-[13px] font-black text-green-600">Free Cancellation till 4h before</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Passenger Details Form */}
            <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="p-8 border-b border-gray-100 bg-gray-50/30 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-black text-gray-900 uppercase tracking-tight mb-1">Passenger Details</h2>
                  <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">E-ticket will be sent to your email</p>
                </div>
                <div className={`w-12 h-12 ${colorTheme.bg} rounded-2xl flex items-center justify-center text-white shadow-xl`}>
                  <User size={22} />
                </div>
              </div>

              <form onSubmit={handleContinue} className="p-8 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[11px] font-black text-gray-500 uppercase tracking-widest ml-1">First Name</label>
                    <div className="relative group">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-emerald-600 transition-colors" size={18} />
                      <input
                        type="text" placeholder="e.g. Rahul" required
                        className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-emerald-600 outline-none font-black text-gray-800 transition-all placeholder:font-bold placeholder:text-gray-300 shadow-inner"
                        value={passengerDetails.firstName}
                        onChange={e => setPassengerDetails({ ...passengerDetails, firstName: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <label className="text-[11px] font-black text-gray-500 uppercase tracking-widest ml-1">Last Name</label>
                    <input
                      type="text" placeholder="e.g. Sharma" required
                      className="w-full px-5 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-emerald-600 outline-none font-black text-gray-800 transition-all placeholder:font-bold placeholder:text-gray-300 shadow-inner"
                      value={passengerDetails.lastName}
                      onChange={e => setPassengerDetails({ ...passengerDetails, lastName: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="space-y-3 md:col-span-2">
                    <label className="text-[11px] font-black text-gray-500 uppercase tracking-widest ml-1">Email Address</label>
                    <div className="relative group">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-emerald-600 transition-colors" size={18} />
                      <input
                        type="email" placeholder="yourname@gmail.com" required
                        className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-emerald-600 outline-none font-black text-gray-800 transition-all placeholder:font-bold placeholder:text-gray-300 shadow-inner"
                        value={passengerDetails.email}
                        onChange={e => setPassengerDetails({ ...passengerDetails, email: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <label className="text-[11px] font-black text-gray-500 uppercase tracking-widest ml-1">Age</label>
                    <input
                      type="number" placeholder="Age" required min="5" max="99"
                      className="w-full px-5 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-emerald-600 outline-none font-black text-gray-800 transition-all placeholder:font-bold placeholder:text-gray-300 shadow-inner"
                      value={passengerDetails.age}
                      onChange={e => setPassengerDetails({ ...passengerDetails, age: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-[11px] font-black text-gray-500 uppercase tracking-widest ml-1">Mobile Number</label>
                  <div className="relative group">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-emerald-600 transition-colors" size={18} />
                    <input
                      type="tel" placeholder="10 digit mobile number" required pattern="[0-9]{10}"
                      className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-emerald-600 outline-none font-black text-gray-800 transition-all placeholder:font-bold placeholder:text-gray-300 shadow-inner"
                      value={passengerDetails.mobile}
                      onChange={e => setPassengerDetails({ ...passengerDetails, mobile: e.target.value })}
                    />
                  </div>
                </div>

                <div className={`${colorTheme.light} rounded-2xl p-6 flex items-start gap-4 border ${colorTheme.border}`}>
                  <ShieldCheck size={22} className={`${colorTheme.text} shrink-0 mt-0.5`} />
                  <div>
                    <p className="text-[13px] font-black text-gray-800 uppercase tracking-tight">Safe Booking Policy</p>
                    <p className="text-[12px] font-bold text-text-muted italic leading-relaxed mt-1">
                      Your data is secured with SSL encryption. WingTrip ensures 100% privacy and will never share your details.
                    </p>
                  </div>
                </div>

                <button
                  type="submit"
                  className={`w-full ${colorTheme.bg} hover:opacity-90 text-white py-5 rounded-2xl font-black text-lg uppercase tracking-[0.2em] shadow-2xl active:scale-[0.98] transition-all flex items-center justify-center gap-3 mt-4`}
                >
                  PROCEED TO PAYMENT
                  <ArrowRight size={20} strokeWidth={3} />
                </button>
              </form>
            </div>
          </div>

          {/* ─── Right: Price Card ────────────────────────────────────── */}
          <div className="lg:w-[360px] shrink-0 sticky top-[100px]">
            <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden mb-6">
              <div className="p-6 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
                <h2 className="text-lg font-black text-gray-900 uppercase tracking-widest">Fare Summary</h2>
                <div className={`w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm ${colorTheme.text}`}>
                  <CreditCard size={20} />
                </div>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex justify-between text-[13px]">
                  <span className="font-bold text-text-muted">Base Fare ({selectedClass?.type})</span>
                  <span className="font-black text-gray-900">₹{selectedClass?.price?.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-[13px]">
                  <span className="font-bold text-text-muted">Reservation Fee</span>
                  <span className="font-black text-gray-900">₹40</span>
                </div>
                <div className="flex justify-between text-[13px] text-green-600">
                  <span className="font-bold">WingTrip Discount</span>
                  <span className="font-black">−₹100</span>
                </div>
                <div className="flex justify-between text-[13px] pt-5 border-t border-gray-100">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Total Payable</span>
                    <span className={`text-3xl font-black italic tracking-tighter ${colorTheme.text}`}>₹{((total || 2650)).toLocaleString()}</span>
                  </div>
                </div>
              </div>
              <div className={`p-4 ${colorTheme.bg} text-white text-center font-black text-[11px] uppercase tracking-[0.2em] shadow-inner`}>
                100% SECURE TRANSACTION
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default TrainReviewPage;
