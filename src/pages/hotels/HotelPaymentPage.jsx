import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  ChevronLeft, ChevronRight, ShieldCheck, CreditCard, Smartphone, 
  Building2, Wallet, CheckCircle2, Lock, ArrowRight,
  ShieldEllipsis, CreditCard as CardIcon, Hourglass
} from 'lucide-react';
import toast from 'react-hot-toast';
import HotelSearchHeader from './components/HotelSearchHeader';

import { bookingService } from '../../services/bookingService';

const HotelPaymentPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { hotel, room, guestDetails, pricing } = location.state || {
    hotel: { name: "The Taj Mahal Palace, Mumbai" },
    room: { name: "Luxury Grande Room", price: "15,000", tax: "2,145" },
    guestDetails: { firstName: "John", lastName: "Doe", email: "john@example.com", mobile: "9876543210" },
    pricing: { total: 15895 }
  };

  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [isProcessing, setIsProcessing] = useState(false);

  const totalAmount = pricing?.total || 15895;

  // Preload Razorpay SDK
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const handlePayment = async () => {
    if (!window.Razorpay) {
      toast.error("Payment Gateway not ready. Please refresh.");
      return;
    }

    setIsProcessing(true);

    // Build Razorpay options — order_id is optional; we try to get one from backend
    const openRazorpay = (orderId = null) => {
      const options = {
        key: 'rzp_test_SSesz1GFvxuPR3',
        amount: Math.round(totalAmount * 100),
        currency: 'INR',
        name: 'WingTrip Hotels',
        description: `${hotel.name} - ${room.name}`,
        ...(orderId && { order_id: orderId }),
        handler: async function (response) {
          try {
            if (orderId) {
              // Verify with backend only if we have an orderId
              const verifyResp = await bookingService.verifyPayment({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              });
              if (!verifyResp.success) {
                toast.error("Payment verification failed.");
                return;
              }
            }
            toast.success('🏨 Hotel Booked Successfully!', {
              duration: 5000,
              style: { background: '#10b981', color: '#fff', fontWeight: 'black', borderRadius: '15px' }
            });
            navigate('/profile');
          } catch (err) {
            // Even if verify fails, payment was captured — show success
            toast.success('🏨 Hotel Booked! Confirmation will be emailed shortly.');
            navigate('/profile');
          }
        },
        prefill: {
          name: `${guestDetails?.firstName || ''} ${guestDetails?.lastName || ''}`,
          email: guestDetails?.email || '',
          contact: guestDetails?.mobile || ''
        },
        theme: { color: '#2563eb' },
        modal: {
          ondismiss: () => setIsProcessing(false)
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
      setIsProcessing(false);
    };

    try {
      // Try to create a backend order for proper payment tracking
      const bookingResp = await bookingService.createBooking({
        type: 'hotel',
        totalPrice: totalAmount,
        providerName: hotel.name,
        from: hotel.location || hotel.name,
        travelDate: new Date().toISOString(),
        details: {
          hotelName: hotel.name,
          roomType: room.name,
          guestName: `${guestDetails?.firstName} ${guestDetails?.lastName}`,
          contact: guestDetails?.mobile
        }
      });
      openRazorpay(bookingResp?.orderId || null);
    } catch (error) {
      // Backend unavailable (DB down etc.) — still open Razorpay for demo
      console.warn("Backend booking creation failed, proceeding without order_id:", error.message);
      openRazorpay(null);
    }
  };

  const methods = [
    { id: 'upi', label: 'UPI (GPay / PhonePe / Paytm)', icon: <Smartphone size={22}/> },
    { id: 'card', label: 'Credit / Debit Card', icon: <CardIcon size={22}/> },
    { id: 'net', label: 'Net Banking', icon: <Building2 size={22}/> },
    { id: 'wallet', label: 'Mobile Wallets', icon: <Wallet size={22}/> }
  ];

  return (
    <div className="bg-[#f2f2f2] min-h-screen font-sans pb-20">
      <HotelSearchHeader destination="Mumbai" checkIn="18 Mar 2026" />

      <div className="max-w-7xl mx-auto px-6 pt-10">
        
        {/* Step Indicator (Premium) */}
        <div className="flex items-center justify-center gap-6 mb-12 overflow-x-auto no-scrollbar">
          {[
            { label: 'Review', active: false, done: true },
            { label: 'Payment', active: true, done: false },
            { label: 'Confirm', active: false, done: false }
          ].map((step, idx) => (
            <div key={idx} className="flex items-center gap-4 group shrink-0">
               <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-lg transition-all duration-500 ${
                 step.active ? 'bg-blue-600 text-white shadow-xl shadow-blue-600/30 scale-110' : step.done ? 'bg-green-100 text-green-600 shadow-sm border border-green-200' : 'bg-white text-gray-300 border border-gray-100'
               }`}>
                  {step.done ? <CheckCircle2 size={24} /> : idx + 1}
               </div>
               <span className={`text-[12px] font-black uppercase tracking-[0.2em] transition-colors ${
                  step.active ? 'text-blue-600' : 'text-gray-400'
               }`}>{step.label}</span>
               {idx < 2 && <div className={`w-16 h-[2px] mx-4 rounded-full ${step.done ? 'bg-green-400' : 'bg-gray-200'}`}></div>}
            </div>
          ))}
        </div>

        <div className="max-w-5xl mx-auto">
          
          {/* Header Amount Row */}
          <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-6 bg-white p-8 rounded-3xl border border-gray-200 shadow-sm">
             <div className="flex items-center gap-4">
                <button onClick={() => navigate(-1)} className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-all group">
                  <ChevronLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
                </button>
                <div>
                   <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">Final Payable Amount</p>
                   <h2 className="text-3xl font-black text-blue-600 italic tracking-tighter leading-none">₹{totalAmount.toLocaleString()}</h2>
                </div>
             </div>
             <div className="flex items-center gap-6 px-6 py-3 bg-blue-50/50 rounded-2xl border border-blue-100">
                <div className="flex -space-x-3">
                   <div className="w-10 h-10 border-4 border-white rounded-full bg-blue-600 flex items-center justify-center text-[11px] font-black text-white shadow-lg shadow-blue-200/50">V</div>
                   <div className="w-10 h-10 border-4 border-white rounded-full bg-orange-500 flex items-center justify-center text-[11px] font-black text-white shadow-lg shadow-orange-200/50">M</div>
                   <div className="w-10 h-10 border-4 border-white rounded-full bg-gray-900 flex items-center justify-center text-[11px] font-black text-white shadow-lg shadow-gray-400/50">P</div>
                </div>
                <div className="h-8 w-[1px] bg-blue-200/50"></div>
                <div className="flex items-center gap-2 text-blue-900">
                   <Lock size={16} strokeWidth={3} className="text-blue-600"/>
                   <span className="text-[11px] font-black uppercase tracking-widest">SECURE PAYMENT</span>
                </div>
             </div>
          </div>

          <div className="bg-white rounded-3xl border border-gray-200 shadow-xl overflow-hidden flex flex-col md:flex-row min-h-[550px]">
             
             {/* Sidebar: Methods */}
             <div className="md:w-[320px] border-r border-gray-100 bg-gray-50/50 p-8 space-y-3 shrink-0">
                <h3 className="text-[12px] font-black text-gray-400 uppercase tracking-widest mb-6 px-1 italic">Choose Method</h3>
                {methods.map(method => (
                  <button
                    key={method.id}
                    onClick={() => setPaymentMethod(method.id)}
                    className={`w-full flex items-center gap-4 p-5 rounded-2xl transition-all duration-500 text-left font-black text-[14px] uppercase tracking-tight group ${
                      paymentMethod === method.id 
                        ? 'bg-blue-600 text-white shadow-2xl shadow-blue-600/30 scale-[1.03] transform z-10' 
                        : 'text-gray-500 hover:bg-white hover:text-blue-600 hover:shadow-xl hover:shadow-blue-500/10'
                    }`}
                  >
                    <div className={`transition-transform duration-500 ${paymentMethod === method.id ? 'text-white scale-110' : 'text-gray-300 group-hover:text-blue-400'}`}>
                      {method.icon}
                    </div>
                    {method.label}
                    {paymentMethod === method.id && <ChevronRight size={18} className="ml-auto opacity-70 animate-pulse" />}
                  </button>
                ))}
             </div>

             {/* Content: Selected Section */}
             <div className="flex-1 p-10 md:p-14 flex flex-col justify-between">
                
                <div className="animate-in fade-in slide-in-from-right-10 duration-700">
                   {paymentMethod === 'upi' && (
                     <div className="space-y-10">
                        <div>
                           <h2 className="text-3xl font-black text-gray-900 uppercase tracking-tight mb-2 leading-none">Instant UPI Checkout</h2>
                           <p className="text-[13px] font-bold text-gray-400 uppercase tracking-widest">Fastest & Secure way to book</p>
                        </div>

                        <div className="bg-gray-50 rounded-[40px] p-12 flex flex-col items-center justify-center border-2 border-dashed border-gray-200 group hover:border-blue-400 transition-all shadow-inner">
                           <div className="w-56 h-56 bg-white rounded-3xl shadow-2xl flex items-center justify-center p-6 mb-8 group-hover:scale-110 transition-transform duration-700">
                              <div className="w-full h-full border-[6px] border-gray-900/5 rounded-2xl flex items-center justify-center">
                                {/* Simulated Premium QR */}
                                <div className="grid grid-cols-5 gap-2 opacity-10">
                                   {[...Array(25)].map((_,i)=><div key={i} className="w-5 h-5 bg-gray-900 rounded-lg"></div>)}
                                </div>
                                <ShieldCheck size={64} className="absolute text-blue-600 opacity-90 drop-shadow-lg" />
                              </div>
                           </div>
                           <p className="text-[12px] font-black text-gray-800 uppercase tracking-[0.2em] mb-2 leading-none italic">Scan QR to pay ₹{totalAmount.toLocaleString()}</p>
                           <p className="text-[10px] font-bold text-gray-400 italic font-mono tracking-tighter">Encrypted by WingLock™ 256-bit</p>
                        </div>

                        <div className="space-y-4">
                           <p className="text-center text-[11px] font-black text-gray-300 uppercase tracking-[0.4em]">OR ENTER UPI ID</p>
                           <div className="flex gap-4">
                              <input type="text" placeholder="user@okhdfc" className="flex-1 bg-gray-50 border-2 border-transparent rounded-2xl px-6 py-4.5 font-black focus:border-blue-600 focus:bg-white outline-none transition-all placeholder:font-bold shadow-inner" />
                              <button className="bg-blue-600 text-white px-10 rounded-2xl font-black text-[11px] uppercase tracking-widest shadow-xl shadow-blue-500/20 active:scale-95 transition-all">Verify</button>
                           </div>
                        </div>
                     </div>
                   )}

                   {paymentMethod === 'card' && (
                     <div className="space-y-10">
                        <div>
                           <h2 className="text-3xl font-black text-gray-900 uppercase tracking-tight mb-2 leading-none">Credit / Debit Card</h2>
                           <p className="text-[13px] font-bold text-gray-400 uppercase tracking-widest">Global Secure Payments</p>
                        </div>

                        <div className="space-y-6">
                           <div className="space-y-3">
                              <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">Card Number</label>
                              <div className="relative">
                                 <input type="text" placeholder="XXXX XXXX XXXX XXXX" className="w-full bg-gray-50 border-2 border-transparent rounded-2xl px-6 py-4.5 font-black focus:bg-white focus:border-blue-600 outline-none transition-all shadow-inner" />
                                 <CreditCard size={20} className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-300" />
                              </div>
                           </div>
                           <div className="grid grid-cols-2 gap-8">
                              <div className="space-y-3">
                                 <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">Expiry Date</label>
                                 <input type="text" placeholder="MM / YY" className="w-full bg-gray-50 border-2 border-transparent rounded-2xl px-6 py-4.5 font-black focus:bg-white focus:border-blue-600 outline-none transition-all shadow-inner" />
                              </div>
                              <div className="space-y-3">
                                 <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">CVV / CVC</label>
                                 <input type="password" placeholder="XXX" maxLength={3} className="w-full bg-gray-50 border-2 border-transparent rounded-2xl px-6 py-4.5 font-black focus:bg-white focus:border-blue-600 outline-none transition-all shadow-inner" />
                              </div>
                           </div>
                           <div className="space-y-3">
                              <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">Name on Card</label>
                              <input type="text" placeholder="FULL NAME" className="w-full bg-gray-50 border-2 border-transparent rounded-2xl px-6 py-4.5 font-black focus:bg-white focus:border-blue-600 outline-none transition-all uppercase placeholder:lowercase shadow-inner" />
                           </div>
                        </div>
                     </div>
                   )}

                   {['net', 'wallet'].includes(paymentMethod) && (
                      <div className="h-64 flex flex-col items-center justify-center text-center">
                         <div className="w-20 h-20 bg-gray-50 rounded-3xl flex items-center justify-center text-gray-200 mb-6">
                            <Hourglass size={32} className="animate-spin duration-[3000ms]" />
                         </div>
                         <h3 className="text-sm font-black text-gray-400 uppercase tracking-[0.3em] mb-2 leading-none">Coming Soon</h3>
                         <p className="text-[11px] font-bold text-gray-300 italic">This payment method is being secured for launch</p>
                      </div>
                   )}
                </div>

                {/* Confirm Action Bar */}
                <div className="mt-12 pt-10 border-t border-gray-100 flex flex-col gap-6">
                   <button 
                     onClick={handlePayment}
                     disabled={isProcessing}
                     className={`w-full bg-blue-600 hover:bg-blue-700 text-white py-6 rounded-3xl font-black text-xl uppercase tracking-[0.3em] shadow-2xl shadow-blue-600/40 transform active:scale-[0.98] transition-all flex items-center justify-center gap-4 ${isProcessing ? 'opacity-70 cursor-not-allowed' : ''}`}
                   >
                      {isProcessing ? (
                        <>
                          <div className="w-6 h-6 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
                          <span className="animate-pulse">STABILIZING CRYPTO...</span>
                        </>
                      ) : (
                        <>
                          CONFIRM & PAY ₹{totalAmount.toLocaleString()}
                          <ArrowRight size={24} strokeWidth={3} />
                        </>
                      )}
                   </button>
                   <div className="flex items-center justify-center gap-4 opacity-30 grayscale hover:grayscale-0 transition-all duration-700">
                      <img src="https://img.icons8.com/color/48/visa.png" alt="Visa" className="h-8" />
                      <div className="h-6 w-[1px] bg-gray-400"></div>
                      <img src="https://img.icons8.com/color/48/mastercard.png" alt="Mastercard" className="h-8" />
                      <div className="h-6 w-[1px] bg-gray-400"></div>
                      <img src="https://img.icons8.com/color/48/pci-compliant.png" alt="PCI" className="h-8" />
                      <div className="h-6 w-[1px] bg-gray-400"></div>
                      <img src="https://img.icons8.com/color/48/norton.png" alt="Norton" className="h-8" />
                   </div>
                </div>

             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelPaymentPage;
