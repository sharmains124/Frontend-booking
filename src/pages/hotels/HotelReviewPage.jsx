import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Check, ChevronLeft, MapPin, Calendar, Users, 
  ShieldCheck, Info, User, Mail, Phone, CreditCard,
  Building2, ArrowRight, Loader2
} from 'lucide-react';
import toast from 'react-hot-toast';
import { bookingService } from '../../services/bookingService';
import HotelSearchHeader from './components/HotelSearchHeader';

const HotelReviewPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Use data from navigation state if available, otherwise fallback
  const liveState = location.state || {};
  const hotel = liveState.hotel || { name: "The Taj Mahal Palace, Mumbai", location: "Apollo Bandar, Colaba, Mumbai, Maharashtra 400001" };
  const room = liveState.room || { name: "Luxury Grande Room", price: "15,000", tax: "2,145" };

  const [guestDetails, setGuestDetails] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobile: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);

  // Calculate prices based on room data
  const basePrice = parseInt(room.price.toString().replace(/,/g, '')) || 15000;
  const taxPrice = parseInt(room.tax.toString().replace(/,/g, '')) || 2145;
  const nights = 1; // Default to 1 night for simplicity unless specified
  const discount = 1250;
  const totalPayable = (basePrice + taxPrice) * nights - discount;

  // Preload Razorpay SDK
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const handlePayment = async (e) => {
    e.preventDefault();
    if (!window.Razorpay) {
      toast.error("Payment Gateway not ready. Please refresh.");
      return;
    }

    setIsProcessing(true);

    const openRazorpay = (orderId = null) => {
      const options = {
        key: 'rzp_test_SSesz1GFvxuPR3',
        amount: Math.round(totalPayable * 100),
        currency: 'INR',
        name: 'WingTrip Hotels',
        description: `${hotel.name} - ${room.name}`,
        ...(orderId && { order_id: orderId }),
        handler: async function (response) {
          try {
            if (orderId) {
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
            toast.success('🏨 Hotel Booked! Confirmation will be emailed shortly.');
            navigate('/profile');
          }
        },
        prefill: {
          name: `${guestDetails.firstName} ${guestDetails.lastName}`,
          email: guestDetails.email,
          contact: guestDetails.mobile
        },
        theme: { color: '#2563eb' },
        modal: { ondismiss: () => setIsProcessing(false) }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
      setIsProcessing(false);
    };

    try {
      const bookingResp = await bookingService.createBooking({
        type: 'hotel',
        totalPrice: totalPayable,
        providerName: hotel.name,
        from: hotel.location || hotel.name,
        travelDate: new Date().toISOString(),
        details: {
          hotelName: hotel.name,
          roomType: room.name,
          guestName: `${guestDetails.firstName} ${guestDetails.lastName}`,
          contact: guestDetails.mobile
        }
      });
      openRazorpay(bookingResp?.orderId || null);
    } catch (error) {
      console.warn("Backend booking creation failed, proceeding without order_id:", error.message);
      openRazorpay(null);
    }
  };

  return (
    <div className="bg-[#f2f2f2] min-h-screen font-sans pb-20">
      <HotelSearchHeader destination="Mumbai" checkIn="18 Mar 2026" />

      <div className="max-w-7xl mx-auto px-6 pt-10">
        
        {/* Step Indicator (Premium) */}
        <div className="flex items-center justify-center gap-6 mb-12">
          {[
            { label: 'Review', active: true, done: false },
            { label: 'Payment', active: false, done: false },
            { label: 'Confirm', active: false, done: false }
          ].map((step, idx) => (
            <div key={idx} className="flex items-center gap-4 group">
               <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-lg transition-all duration-500 ${
                 step.active ? 'bg-blue-600 text-white shadow-xl shadow-blue-600/30 scale-110' : 'bg-white text-gray-300 border border-gray-100'
               }`}>
                  {idx + 1}
               </div>
               <span className={`text-[12px] font-black uppercase tracking-[0.2em] transition-colors ${
                  step.active ? 'text-blue-600' : 'text-gray-400'
               }`}>{step.label}</span>
               {idx < 2 && <div className="w-16 h-[2px] bg-gray-200 mx-4 rounded-full"></div>}
            </div>
          ))}
        </div>

        <div className="flex flex-col lg:flex-row gap-10 items-start">
          
          {/* Main Content Area */}
          <div className="flex-1 space-y-10">
            
            {/* 1. Hotel Details Card */}
            <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden p-8 transition-all hover:shadow-md">
               <div className="flex items-start justify-between mb-8">
                  <div>
                    <span className="bg-blue-50 text-blue-600 text-[10px] font-black px-3 py-1 rounded-lg uppercase tracking-wider mb-3 inline-block">Confirm Details</span>
                    <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tight leading-none">{hotel.name}</h2>
                    <div className="flex items-center gap-2 text-gray-500 font-bold text-sm mt-3">
                       <MapPin size={16} className="text-blue-600" />
                       {hotel.location}
                    </div>
                  </div>
                  <div className="text-right">
                     <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-1">Room Category</p>
                     <p className="text-blue-600 font-black uppercase text-sm tracking-tight">{room.name}</p>
                  </div>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-8 border-y border-gray-50">
                  <div className="space-y-4">
                     <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 shadow-sm shadow-blue-100/50">
                           <Calendar size={18} />
                        </div>
                        <div>
                           <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">Check-In</p>
                           <p className="text-sm font-black text-gray-900 uppercase tracking-tight">Sat, 18 Mar 2026 <span className="text-gray-300 font-bold lowercase text-xs ml-2">12:00 PM</span></p>
                        </div>
                     </div>
                  </div>
                  <div className="space-y-4">
                     <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center text-orange-600 shadow-sm shadow-orange-100/50">
                           <Calendar size={18} />
                        </div>
                        <div>
                           <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">Check-Out</p>
                           <p className="text-sm font-black text-gray-900 uppercase tracking-tight">Mon, 20 Mar 2026 <span className="text-gray-300 font-bold lowercase text-xs ml-2">11:00 AM</span></p>
                        </div>
                     </div>
                  </div>
               </div>

               <div className="pt-8 flex items-center gap-10">
                  <div className="flex items-center gap-3">
                     <Users size={18} className="text-gray-400" />
                     <span className="text-[13px] font-black text-gray-700 uppercase tracking-tight">2 Adults, 1 Room</span>
                  </div>
                  <div className="flex items-center gap-3">
                     <ShieldCheck size={18} className="text-green-600" />
                     <span className="text-[13px] font-black text-green-600 uppercase tracking-tight">Free Cancellation till 17 Mar</span>
                  </div>
               </div>
            </div>

            {/* 2. Guest Information Card */}
            <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
               <div className="p-8 border-b border-gray-100 bg-gray-50/20 flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-black text-gray-900 uppercase tracking-tight mb-1">Guest Information</h2>
                    <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">E-Confirmation will be sent here</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-blue-600/30">
                     <User size={24} />
                  </div>
               </div>

               <form onSubmit={handlePayment} className="p-8 space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                       <label className="text-[11px] font-black text-gray-500 uppercase tracking-widest ml-1">First Name</label>
                       <div className="relative group">
                          <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors" size={18} />
                          <input 
                            type="text" 
                            placeholder="e.g. John" 
                            required
                            className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-blue-600 outline-none font-black text-gray-800 transition-all placeholder:font-bold placeholder:text-gray-300 shadow-inner"
                            value={guestDetails.firstName}
                            onChange={(e) => setGuestDetails({...guestDetails, firstName: e.target.value})}
                          />
                       </div>
                    </div>
                    <div className="space-y-3">
                       <label className="text-[11px] font-black text-gray-500 uppercase tracking-widest ml-1">Last Name</label>
                       <input 
                          type="text" 
                          placeholder="e.g. Doe" 
                          required
                          className="w-full px-5 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-blue-600 outline-none font-black text-gray-800 transition-all placeholder:font-bold placeholder:text-gray-300 shadow-inner"
                          value={guestDetails.lastName}
                          onChange={(e) => setGuestDetails({...guestDetails, lastName: e.target.value})}
                       />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                       <label className="text-[11px] font-black text-gray-500 uppercase tracking-widest ml-1">Email Address</label>
                       <div className="relative group">
                          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors" size={18} />
                          <input 
                            type="email" 
                            placeholder="yourname@gmail.com" 
                            required
                            className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-blue-600 outline-none font-black text-gray-800 transition-all placeholder:font-bold placeholder:text-gray-300 shadow-inner"
                            value={guestDetails.email}
                            onChange={(e) => setGuestDetails({...guestDetails, email: e.target.value})}
                          />
                       </div>
                    </div>
                    <div className="space-y-3">
                       <label className="text-[11px] font-black text-gray-500 uppercase tracking-widest ml-1">Mobile Number</label>
                       <div className="relative group">
                          <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors" size={18} />
                          <input 
                            type="tel" 
                            placeholder="10 digit mobile number" 
                            required
                            pattern="[0-9]{10}"
                            className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-blue-600 outline-none font-black text-gray-800 transition-all placeholder:font-bold placeholder:text-gray-300 shadow-inner"
                            value={guestDetails.mobile}
                            onChange={(e) => setGuestDetails({...guestDetails, mobile: e.target.value})}
                          />
                       </div>
                    </div>
                  </div>

                  <div className="bg-blue-50/50 rounded-2xl p-6 flex items-start gap-4 border border-blue-100">
                    <ShieldCheck size={24} className="text-blue-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-[14px] font-black text-blue-900 uppercase tracking-tight">Safe Booking Policy</p>
                      <p className="text-[12px] font-bold text-blue-600/70 italic leading-relaxed">Your data is secured with SSL encryption. WingTrip ensures 100% privacy and will never share your contact details.</p>
                    </div>
                  </div>

                  <button 
                    type="submit"
                    disabled={isProcessing}
                    className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-70 text-white py-5 rounded-2xl font-black text-lg uppercase tracking-[0.2em] shadow-2xl shadow-blue-600/30 transform active:scale-[0.98] transition-all flex items-center justify-center gap-3 mt-4"
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="animate-spin" size={24} />
                        PROCESSING...
                      </>
                    ) : (
                      <>
                        CONFIRM & PAY ₹{totalPayable.toLocaleString()}
                        <ArrowRight size={20} strokeWidth={3} />
                      </>
                    )}
                  </button>
               </form>
            </div>
          </div>

          {/* Right Section: Price Summary Sticky */}
          <div className="lg:w-[380px] shrink-0 sticky top-[100px]">
             
             <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden mb-6 transition-all hover:shadow-md">
                <div className="p-8 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
                   <h2 className="text-lg font-black text-gray-900 uppercase tracking-widest">Price Summary</h2>
                   <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm text-blue-600">
                      <CreditCard size={20} />
                   </div>
                </div>
                <div className="p-8 space-y-5">
                   <div className="flex justify-between text-[14px]">
                      <span className="font-bold text-gray-500">Base Price (2 Nights)</span>
                      <span className="font-black text-gray-900">₹{ (parseInt(room.price) * 2).toLocaleString() }</span>
                   </div>
                   <div className="flex justify-between text-[14px]">
                      <span className="font-bold text-gray-500">Service Fee & Taxes</span>
                      <span className="font-black text-gray-900">₹{ (parseInt(room.tax) * 2).toLocaleString() }</span>
                   </div>
                   <div className="flex justify-between text-[14px] text-green-600">
                      <span className="font-bold">Member Discount</span>
                      <span className="font-black">-₹1,250</span>
                   </div>
                   <div className="flex justify-between text-[14px] pt-6 border-t border-gray-100">
                      <div className="flex flex-col">
                        <span className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-1">Total Payable</span>
                        <span className="text-3xl font-black text-blue-600 italic tracking-tighter">₹{ ( (parseInt(room.price) + parseInt(room.tax)) * 2 - 1250 ).toLocaleString() }</span>
                      </div>
                   </div>
                </div>
                <div className="p-5 bg-blue-600 text-white text-center font-black text-[12px] uppercase tracking-[0.2em] shadow-inner">
                   100% SECURE TRANSACTION
                </div>
             </div>

             <div className="bg-white rounded-3xl border border-gray-200 p-8 shadow-sm group">
                <h3 className="text-[12px] font-black text-gray-400 uppercase tracking-widest mb-6 px-1">Applied Offers</h3>
                <div className="flex gap-3 bg-gray-50 p-2 rounded-2xl border border-gray-100/50">
                   <input type="text" placeholder="Promo Code" className="flex-1 bg-transparent border-none rounded-lg px-4 py-2 text-sm font-black focus:ring-0 outline-none uppercase placeholder:lowercase" />
                   <button className="bg-blue-600 text-white px-6 py-2 rounded-xl font-black text-[11px] uppercase tracking-widest shadow-lg shadow-blue-600/20">Apply</button>
                </div>
             </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default HotelReviewPage;
