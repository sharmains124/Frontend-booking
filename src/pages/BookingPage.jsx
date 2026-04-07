import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { 
  Clock, User, Check, ShieldCheck, ArrowLeft, ArrowRight, Loader2, Plane, Info, AlertCircle, CheckCircle2 
} from 'lucide-react';

import { toast } from 'react-hot-toast';

const BookingPage = () => {

  const location = useLocation();
  const { flight } = location.state || {};

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(14 * 60 + 19);
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    countryCode: '+91',
    mobileNumber: '',
    passGender: 'Male',
    passFirstName: '',
    passLastName: '',
  });
  const [isProcessing, setIsProcessing] = useState(false);

  // Aliases so the new payment handler works with the existing state
  const selectedFlight = flight;
  const passengersLocal = [{ firstName: formData.passFirstName, lastName: formData.passLastName }];
  const contactInfoLocal = { email: formData.email, phone: formData.mobileNumber };
  const farePrice = flight?.farePrice || flight?.price || 7897;

  const calculateTotal = () => farePrice;

  const setBookingResultLocal = () => {};
  const createBooking = () => Promise.resolve({ success: false, message: 'Not implemented' });
  const verifyPayment = () => Promise.resolve({ success: false });

  // Preload Razorpay SDK on mount so it's ready when user clicks Pay
  useEffect(() => {
    if (!document.querySelector('script[src*="razorpay"]')) {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `00:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePayment = async () => {
    setLoading(true);

    // If SDK not yet loaded, wait for it
    if (!window.Razorpay) {
      await new Promise((resolve, reject) => {
        // Check if script already exists
        const existing = document.querySelector('script[src*="razorpay"]');
        if (existing) {
          existing.onload = resolve;
          existing.onerror = reject;
        } else {
          const script = document.createElement('script');
          script.src = 'https://checkout.razorpay.com/v1/checkout.js';
          script.onload = resolve;
          script.onerror = reject;
          document.body.appendChild(script);
        }
      }).catch(() => {
        toast.error('Failed to load payment gateway. Check your connection.');
        setLoading(false);
        return;
      });
    }

    if (!window.Razorpay) {
      toast.error('Payment gateway unavailable. Please refresh and try again.');
      setLoading(false);
      return;
    }

    const options = {
      key: 'rzp_test_SSesz1GFvxuPR3',
      amount: farePrice * 100,   // in paise
      currency: 'INR',
      name: 'WingTrip',
      description: `Flight: ${flight?.originCode || flight?.origin || 'DEL'} → ${flight?.destCode || flight?.destination || 'BOM'}`,
      image: 'https://i.imgur.com/your-logo.png',
      handler: function (response) {
        console.log('Razorpay success:', response);
        toast.success('Payment Successful! Booking confirmed 🎉');
        setStep(3);
        window.scrollTo(0, 0);
      },
      prefill: {
        name: `${formData.passFirstName} ${formData.passLastName}`.trim() || 'Traveller',
        email: formData.email || '',
        contact: formData.mobileNumber || ''
      },
      notes: {
        flight: `${flight?.airline || ''} ${flight?.flightNumber || ''}`,
      },
      theme: { color: '#008cff' },
      modal: {
        ondismiss: () => {
          toast('Payment cancelled.', { icon: 'ℹ️' });
          setLoading(false);
        }
      }
    };

    try {
      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', (response) => {
        toast.error(`Payment failed: ${response.error.description}`);
        setLoading(false);
      });
      rzp.open();
    } catch (err) {
      console.error('Razorpay open error:', err);
      toast.error('Could not open payment gateway. Try again.');
    }
    setLoading(false);
  };

  // Guard: if no flight data was passed, redirect gracefully
  if (!flight) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#e5e9f2] gap-4">
        <Info size={40} className="text-gray-300" />
        <h2 className="text-xl font-black text-gray-600">No flight selected</h2>
        <a href="/flights" className="text-[#008cff] font-bold underline">Search Flights</a>
      </div>
    );
  }


  return (
    <div className="bg-[#e5e9f2] min-h-screen font-sans text-[#000000]">
      
      {/* Top Header */}
      <header className="bg-white sticky top-0 z-50 shadow-sm">
        <div className="max-w-[1200px] mx-auto flex items-center justify-between px-4 h-16">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-xl font-black text-gray-800 tracking-tight">WingTrip</span>
          </Link>
          
          <div className="hidden md:flex flex-1 max-w-[400px] mx-8 relative items-center justify-between">
             <div className="absolute left-0 right-0 top-1/2 h-[2px] bg-gray-200 -z-10 -translate-y-1/2"></div>
             {[1, 2, 3].map((s) => (
                <div key={s} className="flex flex-col items-center gap-1 bg-[#e5e9f2] bg-white px-2">
                   <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold tracking-tighter transition-all ${step >= s ? 'bg-[#008cff] text-white' : 'bg-gray-200 text-gray-500'}`}>
                      {step > s ? <Check size={14} /> : s}
                   </div>
                   <span className={`text-[10px] uppercase font-bold ${step >= s ? 'text-[#008cff]' : 'text-gray-400'}`}>
                      {s === 1 ? 'Information' : s === 2 ? 'Review' : 'Confirmed'}
                   </span>
                </div>
             ))}
          </div>
        </div>
      </header>

      {/* Session Timer */}
      {step < 3 && (
        <div className="bg-[#24292e] text-white py-2 flex justify-center items-center gap-3 text-[12px] font-bold">
            <Clock size={14} className="text-orange-400"/>
            Your session will expire in <span className="text-orange-400 font-mono text-[14px]">{formatTime(timeLeft)}</span>
            <span className="ml-2 font-normal text-gray-400">Please complete your booking.</span>
        </div>
      )}

      <main className="max-w-[1200px] mx-auto px-4 py-6">
        {step === 3 ? (
          <div className="max-w-xl mx-auto mt-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Ticket Header & Logo */}
            <div className="bg-white rounded-t-3xl p-6 flex flex-col items-center border-x border-t border-gray-100">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-[#002147] rounded-lg flex items-center justify-center">
                  <Plane size={18} className="text-white transform -rotate-45" />
                </div>
                <span className="text-xl font-bold tracking-tight text-[#002147]">WingTrip</span>
              </div>
              
              <div className="w-full h-px bg-gray-100 mb-6"></div>
              
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white">
                  <Check size={18} strokeWidth={3} />
                </div>
                <h1 className="text-xl font-black text-gray-900">Your flight is confirmed!</h1>
              </div>
            </div>

            {/* Boarding Pass Section */}
            <div className="bg-[#002147] text-white p-8 relative overflow-hidden">
               <div className="flex flex-col items-center mb-8 text-center">
                  <p className="text-[10px] uppercase font-black tracking-[0.2em] text-blue-200/60 mb-1">Confirmation code</p>
                  <p className="text-lg font-black tracking-widest text-white uppercase italic">RGE650</p>
               </div>

               <div className="flex items-center justify-between mb-10 w-full px-4">
                  <div className="text-center">
                    <p className="text-3xl font-black mb-1">{flight?.originCode || flight?.origin?.substring(0, 3).toUpperCase() || 'DEL'}</p>
                    <p className="text-[11px] font-bold text-blue-200/50 uppercase tracking-wider">{flight?.origin || 'Delhi, India'}</p>
                  </div>
                  
                  <div className="flex-1 flex flex-col items-center px-6 relative">
                    <div className="w-full flex items-center justify-between mb-2">
                      <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                      <div className="flex-1 border-t-2 border-dashed border-blue-400/30 mx-2"></div>
                      <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                    </div>
                    <span className="text-[10px] font-black uppercase text-blue-100/60">{flight?.duration || '2h 31m'}</span>
                  </div>

                  <div className="text-center">
                    <p className="text-3xl font-black mb-1">{flight?.destCode || flight?.destination?.substring(0, 3).toUpperCase() || 'TK'}</p>
                    <p className="text-[11px] font-bold text-blue-200/50 uppercase tracking-wider">{flight?.destination || 'Istanbul, Turkey'}</p>
                  </div>
               </div>

               <div className="grid grid-cols-3 gap-4 text-center border-t border-white/10 pt-8 mt-2">
                  <div>
                    <p className="text-[9px] uppercase font-bold text-blue-200/40 mb-1 tracking-widest">Terminal</p>
                    <p className="text-sm font-black">T3</p>
                  </div>
                  <div>
                    <p className="text-[9px] uppercase font-bold text-blue-200/40 mb-1 tracking-widest">Class</p>
                    <p className="text-sm font-black italic">Economy</p>
                  </div>
                  <div>
                    <p className="text-[9px] uppercase font-bold text-blue-200/40 mb-1 tracking-widest">Seat</p>
                    <p className="text-sm font-black">17A</p>
                  </div>
               </div>
            </div>

            {/* Perforated Divider */}
            <div className="relative bg-white h-10 border-x border-gray-100">
               <div className="absolute left-0 top-0 bottom-0 w-5 h-10 bg-[#e5e9f2] rounded-r-full -ml-[10px]"></div>
               <div className="absolute right-0 top-0 bottom-0 w-5 h-10 bg-[#e5e9f2] rounded-l-full -mr-[10px]"></div>
               <div className="absolute top-1/2 left-0 right-0 h-px border-t-[3px] border-dotted border-gray-200"></div>
            </div>

            {/* Receipt Section */}
            <div className="bg-white p-10 border-x border-gray-100">
               <h2 className="text-xl font-black text-gray-900 mb-8 border-b border-gray-50 pb-4">Your receipt</h2>
               
               <div className="space-y-5 mb-10">
                  <div className="flex justify-between items-center group">
                    <span className="text-sm font-bold text-gray-400 group-hover:text-gray-600 transition-colors">Passenger Name</span>
                    <span className="text-sm font-black text-gray-900">{formData.passFirstName} {formData.passLastName}</span>
                  </div>
                  <div className="flex justify-between items-center group">
                    <span className="text-sm font-bold text-gray-400 group-hover:text-gray-600 transition-colors">Payment Card</span>
                    <span className="text-sm font-black text-gray-900 lowercase opacity-80 italic">Verified ID ending xx34</span>
                  </div>
                  <div className="flex justify-between items-center group">
                    <span className="text-sm font-bold text-gray-400 group-hover:text-gray-600 transition-colors">Seat Price (x1)</span>
                    <span className="text-sm font-black text-gray-900">₹{(farePrice * 0.82).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center group">
                    <span className="text-sm font-bold text-gray-400 group-hover:text-gray-600 transition-colors">Fees & Taxes</span>
                    <span className="text-sm font-black text-gray-900">₹{(farePrice * 0.18).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center group">
                    <span className="text-sm font-bold text-gray-400 group-hover:text-gray-600 transition-colors">Discount Applied</span>
                    <span className="text-sm font-black text-green-600">(-) ₹0</span>
                  </div>
                  <div className="pt-5 border-t-2 border-gray-50 flex justify-between items-center">
                    <span className="text-lg font-black text-gray-900">Total Price Paid</span>
                    <span className="text-2xl font-black text-[#002147]">₹{farePrice.toLocaleString()}</span>
                  </div>
               </div>

               <div className="flex flex-col gap-3">
                  <button className="w-full bg-[#002147] text-white py-4 rounded-xl text-[11px] font-black uppercase tracking-[0.2em] shadow-lg shadow-[#002147]/20 hover:scale-[1.02] active:scale-[0.98] transition-all">
                    Download e-boarding pass
                  </button>
                  <button className="w-full bg-white text-[#002147] border-2 border-[#002147]/10 py-4 rounded-xl text-[11px] font-black uppercase tracking-[0.2em] hover:bg-gray-50 transition-all">
                    Generate PDF Receipt
                  </button>
               </div>
            </div>

            {/* Footer Section */}
            <div className="bg-white rounded-b-3xl p-10 border-x border-b border-gray-100 flex flex-col items-center gap-6">
               <div className="w-12 h-1 bg-gray-100 rounded-full"></div>
               <div className="flex items-center gap-6">
                 <button className="text-gray-400 hover:text-[#002147] transition-colors"><Plane size={20} /></button>
                 <button className="text-gray-400 hover:text-[#002147] transition-colors"><User size={20} /></button>
                 <button className="text-gray-400 hover:text-[#002147] transition-colors">
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                 </button>
               </div>
               
               <p className="text-[10px] text-gray-300 font-bold uppercase tracking-widest text-center leading-relaxed">
                  376 Roberts Fort, New Delhi, IN <br />
                  © 2026 WingTrip. Elevate your journey.
               </p>
               
               <Link to="/" className="text-[11px] font-black text-[#002147] uppercase tracking-widest border-b-2 border-[#002147]/10 pb-1 hover:border-[#002147] transition-all">
                  Back to Dashboard
               </Link>
            </div>
          </div>
        ) : (
          <div className="flex flex-col md:flex-row gap-6 items-start">
            
            {/* Left Column (Main Forms) */}
            <div className="w-full md:w-[70%] space-y-6">
               
               {/* Always show Flight Summary at top in both step 1 and 2 like MMT */}
               <div className="bg-white rounded-lg p-5 shadow-[0_2px_10px_rgb(0,0,0,0.06)] border border-gray-200">
                  <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100">
                     <h2 className="text-[18px] font-black text-gray-900">Itinerary</h2>
                     <span className="text-[12px] font-bold text-[#008cff] uppercase bg-blue-50 px-3 py-1 rounded-md">{flight?.origin || 'New Delhi'} to {flight?.destination || 'Bengaluru'}</span>
                  </div>
                  <div className="flex items-start gap-4">
                     <div className="p-2 border border-gray-200 rounded-md">
                        <Plane className="text-orange-500" size={24}/>
                     </div>
                     <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                           <span className="font-black text-[14px] text-gray-900">{flight?.airline || 'Air India Express'}</span>
                           <span className="text-[11px] font-bold text-gray-500">{flight?.flightNumber || 'IX 1692'}</span>
                        </div>
                        <div className="flex items-center gap-10 mt-3">
                           <div>
                              <p className="text-[20px] font-black text-gray-900 leading-none">15:25</p>
                              <p className="text-[12px] font-medium text-gray-600 mt-1">Tue, 17 Mar 26</p>
                              <p className="text-[12px] font-medium text-gray-600">New Delhi (DEL)</p>
                           </div>
                           <div className="flex flex-col items-center flex-1 relative px-4">
                              <span className="text-[12px] font-bold text-gray-500 mb-1">02 h 55 m</span>
                              <div className="w-full h-[2px] bg-gray-300 relative"></div>
                              <span className="text-[10px] text-gray-400 mt-1 uppercase font-bold">Non stop</span>
                           </div>
                           <div className="text-right">
                              <p className="text-[20px] font-black text-gray-900 leading-none">18:20</p>
                              <p className="text-[12px] font-medium text-gray-600 mt-1">Tue, 17 Mar 26</p>
                              <p className="text-[12px] font-medium text-gray-600">Bengaluru (BLR)</p>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>

               {/* STEP 1: INFORMATION */}
               {step === 1 && (
                 <>
                    {/* Important Info */}
                    <div className="bg-[#fff9e5] rounded-lg p-4 border border-[#fce3a1] flex gap-3 shadow-sm">
                       <AlertCircle size={20} className="text-[#d19b00] shrink-0 mt-0.5" />
                       <p className="text-[12px] text-[#8a6804] leading-relaxed font-medium">
                         <span className="font-bold">Important:</span> Mandatory check-in guidelines apply. Please ensure your name strictly matches your government issued ID.
                       </p>
                    </div>

                    {/* Traveller Details */}
                    <div className="bg-white rounded-lg shadow-[0_2px_10px_rgb(0,0,0,0.06)] border border-gray-200 overflow-hidden">
                       <div className="bg-gray-50 p-4 border-b border-gray-200">
                          <h2 className="text-[18px] font-black text-gray-900 flex items-center gap-2"><User size={20}/> Traveller Details</h2>
                       </div>
                       <div className="p-6">
                          <div className="flex gap-4 mb-5">
                            {['Male', 'Female'].map(g => (
                              <label key={g} className="flex items-center gap-2 cursor-pointer">
                                <input type="radio" name="passGender" value={g} checked={formData.passGender === g} onChange={handleChange} className="w-4 h-4 text-[#008cff] focus:ring-[#008cff]"/>
                                <span className="text-[13px] font-bold text-gray-700">{g}</span>
                              </label>
                            ))}
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                             <div className="space-y-1">
                                <label className="text-[11px] font-bold text-gray-500 uppercase">First & Middle Name</label>
                                <input type="text" name="passFirstName" value={formData.passFirstName} onChange={handleChange} className="w-full border border-gray-300 rounded-md p-3 text-sm focus:border-[#008cff] outline-none transition-colors" placeholder="e.g. John" />
                             </div>
                             <div className="space-y-1">
                                <label className="text-[11px] font-bold text-gray-500 uppercase">Last Name</label>
                                <input type="text" name="passLastName" value={formData.passLastName} onChange={handleChange} className="w-full border border-gray-300 rounded-md p-3 text-sm focus:border-[#008cff] outline-none transition-colors" placeholder="e.g. Doe" />
                             </div>
                          </div>
                       </div>
                    </div>

                    {/* Contact Details */}
                    <div className="bg-white rounded-lg shadow-[0_2px_10px_rgb(0,0,0,0.06)] border border-gray-200 overflow-hidden">
                       <div className="bg-gray-50 p-4 border-b border-gray-200 flex justify-between items-center">
                          <h2 className="text-[18px] font-black text-gray-900">Booking details will be sent to</h2>
                       </div>
                       <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-5">
                          <div className="space-y-1 md:col-span-2">
                              <label className="text-[11px] font-bold text-gray-500 uppercase">Email Address</label>
                              <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full border border-gray-300 rounded-md p-3 text-sm focus:border-[#008cff] outline-none" />
                          </div>
                          <div className="space-y-1">
                              <label className="text-[11px] font-bold text-gray-500 uppercase">Country Code</label>
                              <select name="countryCode" value={formData.countryCode} onChange={handleChange} className="w-full border border-gray-300 rounded-md p-3 text-sm outline-none">
                                <option value="+91">India (+91)</option>
                                <option value="+1">USA (+1)</option>
                              </select>
                          </div>
                          <div className="space-y-1">
                              <label className="text-[11px] font-bold text-gray-500 uppercase">Mobile Number</label>
                              <input type="tel" name="mobileNumber" value={formData.mobileNumber} onChange={handleChange} className="w-full border border-gray-300 rounded-md p-3 text-sm focus:border-[#008cff] outline-none" />
                          </div>
                       </div>
                    </div>

                    <div className="flex justify-end pt-4">
                       <button 
                         onClick={() => { if(formData.email && formData.passFirstName) { setStep(2); window.scrollTo(0,0); } else { toast.error('Please enter name and email'); } }} 
                         className="bg-[#008cff] hover:bg-blue-600 text-white py-3.5 px-12 rounded-full font-black text-[14px] shadow-md transition-all uppercase tracking-wide"
                       >
                         Continue
                       </button>
                    </div>
                 </>
               )}

               {/* STEP 2: REVIEW */}
               {step === 2 && (
                 <>
                    <div className="bg-[#e5f5e8] rounded-lg p-4 border border-[#c3e6cb] flex gap-3 shadow-sm">
                       <CheckCircle2 size={20} className="text-green-600 shrink-0 mt-0.5" />
                       <div className="text-[13px] text-green-800 leading-relaxed font-medium">
                         <span className="font-black text-lg block mb-1">Great! You're almost there.</span>
                         Review your itinerary and passenger details below.
                       </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-[0_2px_10px_rgb(0,0,0,0.06)] border border-gray-200 overflow-hidden">
                       <div className="bg-gray-50 p-4 border-b border-gray-200 flex justify-between items-center">
                          <h2 className="text-[16px] font-black text-gray-900">Passenger & Contact Details</h2>
                          <button onClick={() => setStep(1)} className="text-[#008cff] font-bold text-[12px] uppercase">Edit</button>
                       </div>
                       <div className="p-6 grid grid-cols-2 gap-6 text-sm">
                          <div>
                             <p className="text-[11px] text-gray-500 font-bold uppercase mb-1">Name</p>
                             <p className="font-black text-gray-900">{formData.passFirstName} {formData.passLastName}</p>
                          </div>
                          <div>
                             <p className="text-[11px] text-gray-500 font-bold uppercase mb-1">Gender</p>
                             <p className="font-black text-gray-900">{formData.passGender}</p>
                          </div>
                          <div>
                             <p className="text-[11px] text-gray-500 font-bold uppercase mb-1">Email</p>
                             <p className="font-black text-gray-900">{formData.email}</p>
                          </div>
                          <div>
                             <p className="text-[11px] text-gray-500 font-bold uppercase mb-1">Mobile</p>
                             <p className="font-black text-gray-900">{formData.countryCode} {formData.mobileNumber}</p>
                          </div>
                       </div>
                    </div>

                    <div className="flex justify-end pt-4 gap-4">
                       <button onClick={() => setStep(1)} className="text-[#008cff] font-black text-[14px] uppercase px-6">Back</button>
                       <button 
                         onClick={handlePayment} 
                         disabled={loading}
                         className="bg-[#008cff] flex items-center gap-2 hover:bg-blue-600 text-white py-3.5 px-12 rounded-full font-black text-[14px] shadow-md transition-all uppercase tracking-wide"
                       >
                         {loading ? <Loader2 className="animate-spin" size={18}/> : 'Proceed to Pay'}
                       </button>
                    </div>
                 </>
               )}
            </div>
            
            {/* Right Column (Fare Summary) */}
            <div className="w-full md:w-[30%] space-y-6 sticky top-20">
               <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                  <div className="bg-gray-50 p-4 border-b border-gray-200">
                     <h3 className="font-black text-[16px] text-gray-900">Fare Summary</h3>
                  </div>
                  <div className="p-5 space-y-3 border-b border-gray-100">
                     <div className="flex justify-between items-center">
                        <span className="text-[13px] text-gray-600 font-medium">Base Fare (1 Adult)</span>
                        <span className="text-[13px] font-black text-gray-900">₹{(farePrice * 0.8).toLocaleString()}</span>
                     </div>
                     <div className="flex justify-between items-center">
                        <span className="text-[13px] text-gray-600 font-medium">Taxes and Surcharges</span>
                        <span className="text-[13px] font-black text-gray-900">₹{(farePrice * 0.2).toLocaleString()}</span>
                     </div>
                  </div>
                  <div className="p-5 flex justify-between items-end bg-white">
                     <span className="text-[16px] font-black text-gray-900">Total Amount</span>
                     <span className="text-[22px] font-black text-[#008cff]">₹{farePrice.toLocaleString()}</span>
                  </div>
               </div>

               {step === 1 && (
                 <div className="bg-[#e5f5e8] rounded-lg p-4 border border-[#c3e6cb]">
                    <p className="text-[12px] font-bold text-green-800">Yay! You are getting the best price for this route.</p>
                 </div>
               )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default BookingPage;
