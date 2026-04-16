import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Check, Info, ChevronDown, AlertCircle, ShieldCheck } from 'lucide-react';
import toast from 'react-hot-toast';
import { bookingService } from '../../services/bookingService';

const HotelReviewPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Use data from navigation state if available, otherwise fallback
  const liveState = location.state || {};
  // For the exact MMT look we can fallback to the screenshot data to match the image, 
  // but use dynamic data if passed from actual flow.
  const hotel = liveState.hotel || { 
    name: "Ginger Goa, Candolim", 
    location: "195/23-A/B, Candolim Main Road, Near Lawande Super Market, Anna Waddo,Candolim, Saligao, North Goa, Goa, Candolim, Goa, India",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?fit=crop&w=400&q=80"
  };
  const room = liveState.room || { name: "Luxe Twin Room", price: "3899", tax: "195" };

  const [guestDetails, setGuestDetails] = useState({
    title: 'Mr',
    firstName: '',
    lastName: '',
    email: '',
    mobile: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [tripSecure, setTripSecure] = useState(true);
  const [isConfirmed, setIsConfirmed] = useState(false);

  // Calculate prices based on room data
  const basePrice = parseInt(room.price.toString().replace(/,/g, '')) || 3899;
  const taxPrice = parseInt(room.tax.toString().replace(/,/g, '')) || 195;
  const nights = 1; 
  const tripSecurePrice = tripSecure ? 59 * 2 * nights : 0; // ₹59 per person per night (2 adults)
  const totalPayable = (basePrice + taxPrice) * nights + tripSecurePrice;

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
        name: 'MakeMyTrip Hotels',
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
            });
            setIsConfirmed(true);
            window.scrollTo(0,0);
          } catch (err) {
            toast.success('🏨 Hotel Booked! Confirmation will be emailed shortly.');
            setIsConfirmed(true);
            window.scrollTo(0,0);
          }
        },
        prefill: {
          name: `${guestDetails.firstName} ${guestDetails.lastName}`,
          email: guestDetails.email,
          contact: guestDetails.mobile
        },
        theme: { color: '#008cff' },
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

  if (isConfirmed) {
    return (
      <div className="bg-[#f2f2f2] min-h-screen font-sans pb-24">
         <div className="bg-white px-8 py-4 shadow-sm font-black text-xl text-gray-900 border-b border-gray-200">
          Booking Confirmed
         </div>
         <div className="max-w-[700px] mx-auto mt-10 p-8 bg-white border border-gray-200 shadow-sm rounded">
            <div className="flex items-center gap-4 mb-8">
               <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                  <Check size={32} strokeWidth={3} />
               </div>
               <div>
                  <h1 className="text-2xl font-black text-gray-900">Your hotel is confirmed!</h1>
                  <p className="text-sm font-bold text-gray-500 mt-1">Confirmation code: <span className="text-gray-900 bg-gray-100 px-2 rounded">HTL8402X</span></p>
               </div>
            </div>
            
            <div className="border border-gray-200 rounded p-5 mb-6 bg-gray-50">
               <h2 className="text-xl font-black text-gray-900 mb-2">{hotel.name}</h2>
               <p className="text-sm font-bold text-gray-500 mb-4 tracking-tight">{hotel.location}</p>
               <div className="flex justify-between border-t border-gray-200 pt-4">
                  <div>
                     <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">CHECK IN</p>
                     <p className="text-gray-800 font-black">18 Mar 2026, 2:00 PM</p>
                  </div>
                  <div className="text-right">
                     <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">CHECK OUT</p>
                     <p className="text-gray-800 font-black">19 Mar 2026, 12:00 PM</p>
                  </div>
               </div>
            </div>

            <div className="space-y-4 mb-8">
               <div className="flex justify-between items-center group">
                 <span className="text-sm font-bold text-gray-500">Guest Name</span>
                 <span className="text-sm font-black text-gray-900">{guestDetails.firstName || 'Guest'} {guestDetails.lastName}</span>
               </div>
               <div className="flex justify-between items-center group">
                 <span className="text-sm font-bold text-gray-500">Room</span>
                 <span className="text-sm font-black text-gray-900">{room.name}</span>
               </div>
               <div className="flex justify-between items-center group">
                 <span className="text-sm font-bold text-gray-500">Nights</span>
                 <span className="text-sm font-black text-gray-900">{nights}</span>
               </div>
               <div className="flex justify-between items-center border-t border-gray-100 pt-4">
                 <span className="text-lg font-black text-gray-900">Total Paid</span>
                 <span className="text-xl font-black text-[#008cff]">₹{totalPayable.toLocaleString()}</span>
               </div>
            </div>

            <button onClick={() => navigate('/profile')} className="w-full bg-[#008cff] text-white py-4 rounded font-black text-sm uppercase tracking-widest hover:bg-blue-600 transition-colors">
               Go to Dashboard
            </button>
         </div>
      </div>
    );
  }

  return (
    <div className="bg-[#f2f2f2] min-h-screen font-sans pb-24">
      {/* Top Simple Header */}
      <div className="bg-white px-8 py-4 shadow-sm font-black text-xl text-gray-900 border-b border-gray-200">
        Review your Booking
      </div>

      <div className="max-w-[1100px] mx-auto px-4 pt-6 flex flex-col lg:flex-row gap-6 items-start">
        
        {/* Left Column */}
        <div className="flex-[2] space-y-4">
          
          {/* 1. Hotel Detail Card */}
          <div className="bg-white border border-gray-200 rounded shadow-sm">
            <div className="p-5 flex gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h2 className="text-[22px] font-black text-gray-900 leading-tight">{hotel.name}</h2>
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex text-yellow-400 text-xs">★★★★</div>
                  <span className="bg-gray-100 text-gray-600 border border-gray-200 text-[10px] font-bold px-2 py-0.5 rounded uppercase">Couple Friendly</span>
                </div>
                <p className="text-gray-500 text-xs tracking-tight pr-6">
                  {hotel.location}
                </p>
              </div>
              <div className="w-[120px] h-[80px] shrink-0 rounded overflow-hidden">
                <img src={hotel.image || "https://images.unsplash.com/photo-1566073771259-6a8506099945?fit=crop&w=400&q=80"} alt="Hotel" className="w-full h-full object-cover" />
              </div>
            </div>

            <div className="flex bg-[#fafafa] border-y border-gray-200 px-5 py-4">
              <div className="flex-1 border-r border-gray-200">
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">CHECK IN</p>
                <p className="text-gray-800 font-bold text-[15px]">Sat <span className="font-black text-lg">18 Mar</span> 2026</p>
                <p className="text-gray-500 text-xs mt-1">2 PM</p>
              </div>
              <div className="px-6 flex items-center justify-center border-r border-gray-200 text-[10px] text-gray-500 font-bold tracking-widest">
                1 NIGHT
              </div>
              <div className="flex-1 pl-6">
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">CHECK OUT</p>
                <p className="text-gray-800 font-bold text-[15px]">Sun <span className="font-black text-lg">19 Mar</span> 2026</p>
                <p className="text-gray-500 text-xs mt-1">12 PM</p>
              </div>
              <div className="flex-1 pl-6 flex items-center justify-end">
                <span className="text-sm font-black text-gray-800">1 Night | 2 Adults | 1 Room</span>
              </div>
            </div>

            <div className="p-5">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-black text-[16px] text-gray-900">{room.name}</h3>
                  <p className="text-gray-500 text-xs font-bold mt-0.5">2 Adults</p>
                </div>
                <button className="text-[#008cff] font-bold text-sm uppercase">See Inclusions</button>
              </div>
              <ul className="text-xs text-gray-600 font-bold space-y-1.5 mt-4 ml-1">
                <li className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-gray-400"></span> Room With Free Cancellation</li>
                <li className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-gray-400"></span> No meals included</li>
                <li className="flex items-center gap-2 text-green-700 italic">🎁 Complimentary Meal Upgrade</li>
                <li className="flex items-center gap-2 text-green-700 italic">🍸 Enjoy Happy Hours with 1+1 offer</li>
              </ul>
              
              <div className="mt-6">
                <p className="text-[#008cff] font-bold text-xs flex items-center gap-1"><Check size={14} className="text-green-500"/> Cancellation policy details</p>
                <div className="mt-4 flex items-center px-4 w-1/2">
                   <div className="flex-1 border-t border-green-500 relative">
                     <span className="absolute -top-1.5 left-0 w-2 h-2 rounded-full bg-green-500"></span>
                     <p className="text-[10px] font-bold mt-2 -ml-2 text-gray-800">NOW</p>
                   </div>
                   <div className="relative">
                     <span className="absolute -top-3 left-0 w-[1px] h-3 bg-gray-300"></span>
                     <p className="text-[10px] font-bold mt-2 -ml-3 text-gray-800 text-center">17 Mar<br/>01:59 PM</p>
                   </div>
                   <div className="flex-1 border-t border-gray-300 relative border-dashed">
                     <p className="text-[10px] text-gray-400 font-bold mt-2 text-right mr-4">Check-in</p>
                   </div>
                </div>
              </div>
            </div>
          </div>

          {/* 2. Upgrade Your Stay Card */}
          <div className="bg-white border border-gray-200 rounded shadow-sm p-5">
             <h3 className="font-black text-[16px] text-gray-900 mb-4">Upgrade Your Stay</h3>
             <div className="flex gap-10">
               <label className="flex items-center gap-2 cursor-pointer text-sm font-bold text-gray-700 group">
                 <div className="w-4 h-4 rounded-full border border-gray-300 flex items-center justify-center group-hover:border-[#008cff]"></div>
                 <span>Add Breakfast for <span className="font-black text-gray-900">₹ 1995</span> for all guests</span>
               </label>
               <label className="flex items-center gap-2 cursor-pointer text-sm font-bold text-gray-700 group">
                 <div className="w-4 h-4 rounded-full border border-gray-300 flex items-center justify-center group-hover:border-[#008cff]"></div>
                 <span>Add Breakfast + Lunch/Dinner for <span className="font-black text-gray-900">₹ 4873</span> for all guests</span>
               </label>
             </div>
          </div>

          {/* 3. Important Information Card */}
          <div className="bg-white border border-gray-200 rounded shadow-sm p-5">
             <h3 className="font-black text-[16px] text-gray-900 mb-4">Important information</h3>
             
             <div className="border border-[#fdeeee] bg-[#fffafb] rounded-lg p-4 mb-4 relative overflow-hidden">
                <div className="flex items-center gap-2 text-red-500 font-bold text-xs mb-1">
                   <div className="w-4 h-4 rounded-full bg-red-100 flex items-center justify-center"><Info size={10} /></div>
                   Couple/Bachelor Rules
                </div>
                <p className="text-gray-800 text-sm font-bold">Unmarried couples allowed. Local ids are allowed</p>
             </div>

             <ul className="text-xs text-gray-600 font-bold space-y-2 ml-1">
                <li className="flex items-start gap-2"><span className="w-1 h-1 rounded-full bg-gray-400 mt-1.5 shrink-0"></span> Primary Guest should be at least 18 years of age.</li>
                <li className="flex items-start gap-2"><span className="w-1 h-1 rounded-full bg-gray-400 mt-1.5 shrink-0"></span> Groups with only male guests are allowed at the property</li>
                <li className="flex items-start gap-2"><span className="w-1 h-1 rounded-full bg-gray-400 mt-1.5 shrink-0"></span> Passport, Aadhaar and Driving License are accepted as ID proof(s)</li>
                <li className="flex items-start gap-2"><span className="w-1 h-1 rounded-full bg-gray-400 mt-1.5 shrink-0"></span> Pets are not allowed</li>
             </ul>
             <button className="text-[#008cff] font-bold text-xs mt-3">View More</button>
          </div>

          {/* 4. Guest Details Card */}
          <div className="bg-white border border-gray-200 rounded shadow-sm">
             <div className="p-5">
               <h3 className="font-black text-[16px] text-gray-900 mb-6">Guest Details</h3>
               <form id="payment-form" onSubmit={handlePayment}>
                 <div className="flex gap-4 mb-5">
                    <div className="w-[100px]">
                      <label className="text-[10px] text-gray-500 font-bold uppercase tracking-widest block mb-1">TITLE</label>
                      <div className="border border-gray-300 rounded px-3 py-2 flex items-center justify-between cursor-pointer text-sm font-bold text-gray-800">
                         {guestDetails.title} <ChevronDown size={14} className="text-gray-400"/>
                      </div>
                    </div>
                    <div className="flex-1 flex gap-4">
                      <div className="flex-1">
                        <label className="text-[10px] text-gray-500 font-bold block mb-1 opacity-0">FIRST NAME</label>
                        <input type="text" placeholder="First Name" required value={guestDetails.firstName} onChange={e=>setGuestDetails({...guestDetails, firstName: e.target.value})} className="w-full border border-gray-300 rounded px-3 py-2 text-sm font-bold text-gray-800 outline-none focus:border-[#008cff]" />
                      </div>
                      <div className="flex-1">
                        <label className="text-[10px] text-gray-500 font-bold block mb-1 opacity-0">LAST NAME</label>
                        <input type="text" placeholder="Last Name" required value={guestDetails.lastName} onChange={e=>setGuestDetails({...guestDetails, lastName: e.target.value})} className="w-full border border-gray-300 rounded px-3 py-2 text-sm font-bold text-gray-800 outline-none focus:border-[#008cff]" />
                      </div>
                    </div>
                 </div>
                 
                 <div className="flex gap-4">
                    <div className="flex-1">
                      <label className="text-[10px] text-gray-500 font-bold uppercase block mb-1">EMAIL ADDRESS <span className="lowercase font-normal tracking-normal text-gray-400">(Booking voucher will be sent to this email ID)</span></label>
                      <input type="email" placeholder="Email ID" required value={guestDetails.email} onChange={e=>setGuestDetails({...guestDetails, email: e.target.value})} className="w-full border border-gray-300 rounded px-3 py-2 text-sm font-bold text-gray-800 outline-none focus:border-[#008cff]" />
                    </div>
                    <div className="flex-[0.6] flex gap-2">
                       <div className="w-[80px]">
                          <label className="text-[10px] text-gray-500 font-bold uppercase block mb-1">MOBILE</label>
                          <div className="border border-gray-300 rounded px-3 py-2 flex items-center justify-between text-sm font-bold text-gray-800">
                            +91 <ChevronDown size={14} className="text-gray-400"/>
                          </div>
                       </div>
                       <div className="flex-1">
                          <label className="text-[10px] text-gray-500 font-bold uppercase block mb-1 opacity-0">NO</label>
                          <input type="tel" placeholder="Contact Number" required value={guestDetails.mobile} onChange={e=>setGuestDetails({...guestDetails, mobile: e.target.value})} pattern="[0-9]{10}" className="w-full border border-gray-300 rounded px-3 py-2 text-sm font-bold text-gray-800 outline-none focus:border-[#008cff]" />
                       </div>
                    </div>
                 </div>
                 
                 <label className="flex items-center gap-2 mt-5 cursor-pointer text-sm font-bold text-gray-800">
                    <input type="checkbox" className="w-4 h-4 rounded border-gray-300 rounded-sm accent-[#008cff]" />
                    <span>Enter GST Details <span className="text-gray-400 font-normal text-xs">(Optional)</span></span>
                 </label>
                 
                 <button type="button" className="text-[#008cff] font-bold text-sm mt-4">+ Add Guest</button>
               </form>
             </div>
             
             <div className="bg-[#f0f6ff] px-5 py-3 border-t border-gray-100 flex items-center justify-between">
                <span className="text-xs font-bold text-gray-800">Login to prefill traveller details and get access to secret deals</span>
                <button className="bg-white border border-[#008cff] text-[#008cff] text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded">LOGIN</button>
             </div>
          </div>

          {/* 5. Your State Card */}
          <div className="bg-white border border-gray-200 rounded shadow-sm p-5">
             <h3 className="font-black text-[16px] text-gray-900 mb-1">Your State <span className="text-gray-400 font-normal text-xs">(Required for GST purpose on your tax invoice. You can edit this anytime later in your profile section.)</span></h3>
             
             <div className="w-[300px] mt-4 mb-4">
                <label className="text-xs text-gray-800 font-bold block mb-1">Select the State</label>
                <div className="border border-gray-300 rounded px-3 py-2 flex items-center justify-between cursor-pointer text-sm font-bold text-gray-800">
                   Delhi <ChevronDown size={14} className="text-[#008cff]"/>
                </div>
             </div>

             <label className="flex items-center gap-2 cursor-pointer text-sm font-bold text-gray-800">
                <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-gray-300 rounded-sm accent-[#008cff]" />
                <span>Confirm and save billing details to your profile</span>
             </label>
          </div>

          {/* 6. Special Requests */}
          <div className="bg-white border border-gray-200 rounded shadow-sm p-5 flex items-start justify-between">
             <div>
                <h3 className="font-black text-[15px] text-gray-900 flex items-center gap-2"><span className="text-orange-500">🛎️</span> Special Requests</h3>
                <p className="text-[11px] text-gray-500 font-bold mt-1 max-w-[600px]">Add any special requests for your stay. These will be sent to the property after booking, and they will do their best to accommodate them.</p>
             </div>
             <button className="text-[#008cff] font-black text-xs uppercase tracking-widest">MAKE A REQUEST</button>
          </div>

          {/* 7. Trip Secure */}
          <div className="bg-white border border-gray-200 rounded shadow-sm overflow-hidden mb-8">
             <div className="bg-[#effefb] px-4 py-2 text-xs font-bold text-gray-700 flex items-center gap-2 border-b border-gray-100">
                <ShieldCheck size={16} className="text-[#00c598]" /> Chase the adrenaline rush worry-free! Secure your trip against sudden events
             </div>
             <div className="p-5">
               <div className="flex items-center justify-between mb-4">
                  <h3 className="font-black text-lg text-gray-900">Trip Secure</h3>
                  <div className="flex gap-2">
                     <span className="w-8 h-8 bg-blue-100 rounded text-[10px] font-black text-blue-600 flex items-center justify-center italic">ALL</span>
                     <span className="w-8 h-8 bg-pink-100 rounded text-[10px] font-black text-pink-600 flex items-center justify-center italic">SAFE</span>
                  </div>
               </div>
               <p className="text-xs font-bold text-[#008cff] mb-4">Enjoy a Worry-Free Stay</p>
               
               <div className="bg-[#f2f8ff] p-4 rounded text-xs font-bold space-y-3 mb-4">
                  <div className="flex justify-between items-center text-gray-700">
                     <div className="flex items-center gap-2"><span className="text-[#00c598]">🏥</span> Medical Assistance</div>
                     <div className="font-black">24*7 SUPPORT</div>
                  </div>
                  <div className="flex justify-between items-center text-gray-700">
                     <div className="flex items-center gap-2"><span className="text-orange-500">💗</span> Personal Accident</div>
                     <div className="font-black">Rs 10,00,000</div>
                  </div>
                  <div className="flex justify-between items-center text-gray-700">
                     <div className="flex items-center gap-2"><span className="text-blue-500">⚙</span> OPD Expenses</div>
                     <div className="font-black">Rs 25,000</div>
                  </div>
                  <div className="flex justify-between items-center text-gray-700">
                     <div className="flex items-center gap-2"><span className="text-gray-400">🏨</span> Refund on Hotel Cancellation</div>
                     <div className="font-black">Rs 10,000</div>
                  </div>
                  <div className="text-right text-[#008cff] pt-1">7 more benefits</div>
               </div>
               
               <p className="text-sm font-black text-gray-900 mb-1">₹59 <span className="font-bold text-gray-500 text-xs text-normal">per person per night</span></p>
               <p className="text-[10px] font-bold text-gray-400 mb-4 tracking-tight">18% GST Included | Non-Refundable</p>

               <div className="space-y-0 border border-gray-200 rounded overflow-hidden">
                  <label className={`flex items-center gap-3 p-3 cursor-pointer ${tripSecure ? 'bg-[#f4f9ff]' : 'bg-white'}`}>
                    <input type="radio" name="tripSecure" checked={tripSecure} onChange={() => setTripSecure(true)} className="w-4 h-4 accent-[#008cff]" />
                    <span className="text-sm font-bold text-gray-800">Yes, secure my trip.</span>
                  </label>
                  <div className="h-[1px] bg-gray-200 w-full"></div>
                  <label className={`flex items-center gap-3 p-3 cursor-pointer ${!tripSecure ? 'bg-[#f4f9ff]' : 'bg-white'}`}>
                    <input type="radio" name="tripSecure" checked={!tripSecure} onChange={() => setTripSecure(false)} className="w-4 h-4 accent-[#008cff]" />
                    <span className="text-sm font-bold text-gray-800">No, I will book without trip secure.</span>
                  </label>
               </div>
             </div>
          </div>
          
          {/* Bottom Agree & Pay Banner */}
          <div className="pt-2">
            <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-gray-600 mb-4">
               <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-gray-300 rounded-sm accent-[#008cff]" />
               <span>By proceeding, I agree to MakeMyTrip's <span className="text-[#008cff]">User Agreement</span>, <span className="text-[#008cff]">Terms of Service</span> and <span className="text-[#008cff]">Cancellation & Property Booking Policies</span>.</span>
            </label>
            <button 
              form="payment-form" 
              disabled={isProcessing}
              className="bg-[#008cff] hover:bg-blue-600 text-white font-black text-[16px] px-16 py-3 rounded shadow-md transition-colors w-[220px] h-[50px] flex items-center justify-center opacity-90 disabled:opacity-70"
            >
               {isProcessing ? 'PROCESSING...' : 'PAY NOW'}
            </button>
          </div>

        </div>

        {/* Right Column (Sticky) */}
        <div className="flex-[0.8] w-full shrink-0 sticky top-6 space-y-4">
           
           {/* Price Summary */}
           <div className="bg-white border border-gray-200 rounded shadow-sm">
              <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                 <h2 className="text-lg font-black text-gray-900">Price Summary</h2>
                 <span className="text-xs font-bold text-[#008cff] cursor-pointer">View Price Breakup <ChevronDown size={14} className="inline"/></span>
              </div>
              <div className="p-4 space-y-3">
                 <div className="flex justify-between text-sm font-bold text-gray-800">
                    <span>Price ({nights} Night x 1 Room)</span>
                    <span>₹{basePrice.toLocaleString()}</span>
                 </div>
                 {tripSecure && (
                   <div className="flex justify-between text-sm font-bold text-gray-800">
                      <span>Trip Secure (2 Guests)</span>
                      <span>₹{tripSecurePrice}</span>
                   </div>
                 )}
                 <div className="flex justify-between text-sm font-bold text-gray-800">
                    <span>Taxes & Service Fees</span>
                    <span>₹{taxPrice.toLocaleString()}</span>
                 </div>
              </div>
              <div className="px-4 py-4 border-t border-gray-200 flex justify-between items-center bg-[#fafafa] rounded-b">
                 <span className="font-black text-lg text-gray-900">Total Amount to be paid</span>
                 <span className="font-black text-[22px] text-gray-900">₹{totalPayable.toLocaleString()}</span>
              </div>
           </div>

           {/* Coupon Codes */}
           <div className="bg-white border border-gray-200 rounded shadow-sm">
              <div className="px-4 py-3 border-b border-gray-100">
                 <h2 className="text-[15px] font-black text-gray-900">Coupon Codes</h2>
              </div>
              <div className="p-4">
                 <div className="flex gap-0 bg-[#fafafa] border border-gray-200 rounded overflow-hidden">
                    <input type="text" placeholder="Have A Coupon Code?" className="flex-1 px-3 py-2 text-sm font-bold bg-transparent outline-none uppercase placeholder:capitalize" />
                    <button className="bg-gray-100 text-gray-400 font-black text-[11px] px-4 border-l border-gray-200 tracking-widest active:bg-gray-200 uppercase">Apply</button>
                 </div>
                 <p className="text-[10px] font-bold text-gray-500 mt-3 mb-2">No coupon codes applicable for this property.</p>
                 <div className="bg-[#fcf8e3] text-[#8a6d3b] text-[10px] font-bold px-3 py-1.5 rounded border border-[#faebcc]">
                    MMT Gift Cards can be applied at payment step
                 </div>
              </div>
           </div>

           {/* Login Promo Banner */}
           <div className="bg-white border border-gray-200 rounded shadow-sm p-4">
              <h2 className="text-xs font-black text-gray-900 uppercase tracking-tight mb-3">Why <span className="text-[#008cff]">Sign Up</span> or <span className="text-[#008cff]">Login</span></h2>
              <ul className="text-xs text-gray-600 font-bold space-y-2">
                 <li className="flex gap-2 items-start"><Check size={14} className="text-[#00c598] shrink-0 mt-0.5"/> Get access to <span className="font-black text-gray-900">Secret Deals</span></li>
                 <li className="flex gap-2 items-start"><Check size={14} className="text-[#00c598] shrink-0 mt-0.5"/> <span className="font-black text-gray-900">Book Faster</span> - we'll save & pre-enter your details</li>
                 <li className="flex gap-2 items-start"><Check size={14} className="text-[#00c598] shrink-0 mt-0.5"/> <span className="font-black text-gray-900">Manage your bookings</span> from one place</li>
              </ul>
           </div>

        </div>

      </div>
    </div>
  );
};

export default HotelReviewPage;
