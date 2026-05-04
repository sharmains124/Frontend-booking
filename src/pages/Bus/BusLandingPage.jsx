import React, { useState } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  ShieldCheck, 
  Clock, 
  MapPin, 
  Bus, 
  ChevronDown, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin,
  Map,
  Zap,
  CheckCircle,
  Headphones,
  Settings,
  HelpCircle,
  FileText
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Hero from '../../components/Hero';

const OFFER_TABS = ['Bus', 'All Offers', 'Cabs', 'Hotels', 'Flights', 'Holidays', 'Trains'];

const OFFERS_DATA = [
  {
    tag: 'BUS SPECIAL',
    title: 'Grab Up to 40% OFF* on',
    subtitle: 'on Stays, Flights, Buses, Cabs, Trains, Packages & More.',
    img: 'https://promos.makemytrip.com/appfest/2x//Desktop-SummerSale-Common-02Apr.jpg?im=Resize=(134,134)',
    validity: "T&C's Apply",
    cta: 'BOOK NOW',
    category: 'Bus'
  },
  {
    tag: 'DOMESTIC BUSES',
    title: 'Grab FLAT 8% OFF* on Buses',
    subtitle: 'from Kolkata, Bihar, Jharkhand & more.',
    img: 'https://promos.makemytrip.com/appfest/2x//Desktop-CharDham-1Apr.jpg?im=Resize=(134,134)',
    validity: 'Code: MMTBEST',
    cta: 'BOOK NOW',
    category: 'Bus'
  },
  {
    tag: 'PILGRIMAGE',
    title: 'For Your Char Dham Journey: Up to 40% OFF*',
    subtitle: 'on stays, packages, buses, cabs, trains & flights.',
    img: 'https://promos.makemytrip.com/images//Desktop-EastOffer-20Dec.jpg?im=Resize=(134,134)',
    validity: "T&C's Apply",
    cta: 'BOOK NOW',
    category: 'Bus'
  },
  {
    tag: 'TRAVEL SMART',
    title: 'Save Big and Travel Smart:',
    subtitle: 'Grab up to 25% OFF* on Flights, Hotels and Packages.',
    img: 'https://promos.makemytrip.com/appfest/2x//Desktop-Songkran-10Mar.jpg?im=Resize=(134,134)',
    validity: "T&C's Apply",
    cta: 'VIEW DETAILS',
    category: 'Bus'
  },
  {
    tag: 'NEW ROUTE',
    title: 'Explore South: Flat 15% OFF*',
    subtitle: 'on bus bookings to Bangalore, Chennai & Hyderabad.',
    img: 'https://promos.makemytrip.com/appfest/2x//desktop-DH-Kashmir-200326.jpg?im=Resize=(134,134)',
    validity: 'Code: BUSSOUTH',
    cta: 'BOOK NOW',
    category: 'Bus'
  },
  {
    tag: 'SUMMER SPECIAL',
    title: 'Hill Station Getaways: 10% OFF*',
    subtitle: 'Special discounts on buses to Shimla, Manali & Nainital.',
    img: 'https://promos.makemytrip.com/appfest/2x//desktop-DH-Ladakh-200326.jpg?im=Resize=(134,134)',
    validity: 'Valid until 30th June',
    cta: 'BOOK NOW',
    category: 'Bus'
  },
  {
    tag: 'BANK OFFER',
    title: 'Flat 8% Instant Discount*',
    subtitle: 'with SBI Credit Cards on all bus bookings.',
    img: 'https://promos.makemytrip.com/notification/xhdpi//rupay-116x116-19082022.jpg?im=Resize=(134,134)',
    validity: 'Code: MMTSBI',
    cta: 'BOOK NOW',
    category: 'Bus'
  },
  {
    tag: 'FIRST BOOKING',
    title: 'Flat ₹150 OFF* on First Bus',
    subtitle: 'Grab this welcome offer for your first bus journey.',
    img: 'https://promos.makemytrip.com/appfest/2x//icici-rupay-bg-23082125.jpg?im=Resize=(134,134)',
    validity: 'Code: MMTBUSCK',
    cta: 'BOOK NOW',
    category: 'Bus'
  }
];

const MAJOR_CITY_ROUTES = [
  { 
    city: 'Bangalore', 
    icon: 'https://promos.makemytrip.com/store/BangaloreDT.JPG',
    destinations: 'Chennai, Hyderabad, Coimbatore, Mumbai, Goa' 
  },
  { 
    city: 'Chennai', 
    icon: 'https://promos.makemytrip.com/images/50x50-Other-23052019.png',
    destinations: 'Bangalore, Coimbatore, Madurai, Hyderabad, Trichy' 
  },
  { 
    city: 'Hyderabad', 
    icon: 'https://promos.makemytrip.com/images/50x50-Ooty-23052019.png',
    destinations: 'Bangalore, Chennai, Mumbai, Pune, Vijayawada' 
  },
  { 
    city: 'Pune', 
    icon: 'https://promos.makemytrip.com/store/PuneDT.JPG',
    destinations: 'Goa, Bangalore, Hyderabad, Mumbai' 
  },
  { 
    city: 'Delhi', 
    icon: 'https://promos.makemytrip.com/store/DelhiDT.JPG',
    destinations: 'Lucknow, Dehradun, Manalic, Kanpur, Jaipur' 
  },
  { 
    city: 'Mumbai', 
    icon: 'https://promos.makemytrip.com/store/MumbaiDT.JPG',
    destinations: 'Bangalore, Goa, Pune, Indore, Ahmedabad' 
  },
  { 
    city: 'Ahmedabad', 
    icon: 'https://promos.makemytrip.com/store/JaipurDT.JPG',
    destinations: 'Mumbai, Rajkot, Surat, Pune, Indore' 
  },
  { 
    city: 'Coimbatore', 
    icon: 'https://promos.makemytrip.com/images/50x50-Ooty-23052019.png',
    destinations: 'Chennai, Bangalore, Madurai, Pondicherry, Nagercoil' 
  },
  { 
    city: 'Kolkata', 
    icon: 'https://promos.makemytrip.com/store/SingaporeDT.JPG',
    destinations: 'Durgapur, Asansol, Siliguri, Bhubaneshwar, Bardhaman' 
  }
];



const BusLandingPage = () => {
  const [activeOfferTab, setActiveOfferTab] = useState('Bus');
  const [currentPage, setCurrentPage] = useState(0);

  const filteredOffers = OFFERS_DATA.filter(off =>
    activeOfferTab === 'All Offers' || off.category === activeOfferTab
  );

  // Pagination logic: 4 items per page (2x2 grid)
  const itemsPerPage = 4;
  const totalPages = Math.ceil(filteredOffers.length / itemsPerPage);

  const nextPage = () => {
    if (currentPage < totalPages - 1) setCurrentPage(prev => prev + 1);
  };

  const prevPage = () => {
    if (currentPage > 0) setCurrentPage(prev => prev - 1);
  };

  const handleTabChange = (tab) => {
    setActiveOfferTab(tab);
    setCurrentPage(0);
  };

  // Group offers into pages
  const offerPages = [];
  for (let i = 0; i < filteredOffers.length; i += itemsPerPage) {
    offerPages.push(filteredOffers.slice(i, i + itemsPerPage));
  }

  return (
    <div className="bg-[#ebeae8] min-h-screen font-sans antialiased text-slate-900 overflow-x-hidden pb-0">
      <Hero
        bgType="video"
        bgUrl="/assets/Bus video.mp4"
        animate={true}
        isFlight={false}
        hideSearchTabs={true}
        initialTab="Bus"
        title={
          <>
            Travel Smarter. <br className="md:hidden" />
            <span className="decoration-primary/80 decoration-4 underline underline-offset-[12px]">Travel Faster.</span>
          </>
        }
        subTitle="Compare, book, and manage flights, hotels, buses, and trains with ease."
      />

      <main className="max-w-[1240px] mx-auto px-4 md:px-0">
        {/* Offers Section */}
        <section className="bg-white rounded-[24px] shadow-2xl border border-gray-100 overflow-hidden mt-8 mb-12 z-20 relative p-6 md:p-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 pb-1 border-b border-gray-50">
            <div className="flex items-center gap-12">
              <h2 className="text-[32px] font-black text-slate-800 tracking-tight">Offers</h2>
              <div className="flex items-center gap-8 overflow-x-auto hide-scrollbar pt-2">
                {OFFER_TABS.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => handleTabChange(tab)}
                    className={`pb-3 text-[15px] font-black whitespace-nowrap transition-all relative
                      ${activeOfferTab === tab
                        ? 'text-[#008cff] border-b-[3px] border-[#008cff]'
                        : 'text-gray-500 hover:text-gray-800'
                      }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>
            <div className="hidden md:flex items-center gap-4">
              <Link to="/offers" className="text-[#008cff] text-[13px] font-black uppercase tracking-widest flex items-center gap-1 hover:gap-2 transition-all mr-4">
                VIEW ALL
              </Link>
              {totalPages > 1 && (
                <div className="flex gap-2">
                   <button 
                    onClick={prevPage}
                    disabled={currentPage === 0}
                    className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all shadow-sm
                      ${currentPage === 0 
                        ? 'border-gray-100 text-gray-200 cursor-not-allowed' 
                        : 'border-gray-200 text-gray-400 hover:border-[#008cff] hover:text-[#008cff]'
                      }`}
                   >
                    <ChevronLeft size={20} />
                   </button>
                   <button 
                    onClick={nextPage}
                    disabled={currentPage === totalPages - 1}
                    className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all shadow-sm
                      ${currentPage === totalPages - 1 
                        ? 'border-gray-100 text-gray-200 cursor-not-allowed' 
                        : 'border-gray-200 text-gray-400 hover:border-[#008cff] hover:text-[#008cff]'
                      }`}
                   >
                    <ChevronRight size={20} />
                   </button>
                </div>
              )}
            </div>
          </div>

          <div className="relative overflow-hidden">
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${currentPage * 100}%)` }}
            >
              {offerPages.map((page, pageIdx) => (
                <div key={pageIdx} className="w-full flex-shrink-0 grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {page.map((offer, idx) => (
                    <div 
                      key={idx} 
                      className="bg-white rounded-[20px] overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 cursor-pointer group/card flex h-[160px]"
                    >
                      {/* Left: Image Section */}
                      <div className="relative w-[140px] h-full flex-shrink-0 flex items-center justify-center p-3 bg-white">
                        <img 
                          src={offer.img} 
                          alt={offer.title} 
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-contain rounded-xl group-hover/card:scale-105 transition-transform duration-500" 
                        />
                      </div>

                      {/* Right: Content Section */}
                      <div className="flex-1 p-4 flex flex-col justify-center min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{offer.tag}</span>
                          <span className="text-[9px] font-bold text-gray-400 uppercase">{offer.validity}</span>
                        </div>
                        
                        <div className="mb-2">
                          <h3 className="text-[16px] font-black text-slate-800 leading-tight mb-1 line-clamp-2 uppercase">
                            {offer.title}
                          </h3>
                          <div className="w-8 h-[2px] bg-red-500 mb-1.5 rounded-full" />
                          <p className="text-[11px] text-gray-500 font-medium line-clamp-2">
                            {offer.subtitle}
                          </p>
                        </div>

                        <div className="mt-auto flex justify-end">
                           <span className="text-[#008cff] text-[12px] font-black uppercase tracking-widest group-hover/card:underline">
                            {offer.cta}
                           </span>
                        </div>
                      </div>
                    </div>
                  ))}
                  {/* Fill empty slots in grid if last page has < 4 items */}
                  {page.length < 4 && pageIdx === offerPages.length - 1 && [...Array(4 - page.length)].map((_, i) => (
                    <div key={`empty-${i}`} className="hidden lg:block h-[160px] pointer-events-none" />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Major City Routes Section */}
        <section className="bg-white rounded-[24px] shadow-sm border border-gray-100 p-8 md:p-12 mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-12 gap-x-16">
            {MAJOR_CITY_ROUTES.map((route, idx) => (
              <div key={idx} className="flex items-center gap-6 group hover:bg-slate-50 p-2 rounded-2xl transition-all">
                <div className="w-[60px] h-[60px] rounded-full overflow-hidden shrink-0 border-2 border-slate-100 shadow-sm group-hover:border-[#008cff] transition-all bg-white p-1">
                   <img src={route.icon} alt={route.city} referrerPolicy="no-referrer" className="w-full h-full object-contain" />
                </div>
                <div className="flex flex-col justify-center min-w-0">
                  <h4 className="text-[15px] font-black text-slate-800 mb-0.5 leading-tight group-hover:text-[#008cff] transition-colors">Buses From {route.city} To</h4>
                  <p className="text-[11px] font-bold text-slate-400 leading-relaxed truncate">{route.destinations}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Informational SEO Content Section */}
        <section className="max-w-[1240px] mx-auto py-16 px-6">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-16">
              <div>
                 <h2 className="text-[20px] font-black text-slate-900 mb-6 tracking-tight">Make Your Bus Booking Smoother With WingTrip</h2>
                 <p className="text-[13px] text-slate-600 leading-[1.8] mb-4 font-medium">Imagine the thrill of feeling the wind in your hair, while looking at the changing landscape from a window seat on a bus. It lets you soak in the scenery and stay filled with many memorable and fun moments, which no bus booking beats. And in our continuous endeavour to bring our customers the best travel experience, we now offer easy bus booking services on our platform. Read on to know why you should make your upcoming bus ticket booking online on WingTrip.</p>
              </div>
              <div>
                 <h2 className="text-[20px] font-black text-slate-900 mb-6 tracking-tight">Reasons to Choose WingTrip For Bus Booking:</h2>
                 <p className="text-[13px] text-slate-600 leading-[1.8] mb-4 font-medium">Prioritize Assurance: All the buses listed on our platform are WingTrip assured with regular maintenance of the vehicle cleared out after every trip, regular temperature checks done on drivers before boarding the bus and the staff following all safety protocols. Customer Care Online: When you complete your online bus booking on WingTrip, be sure of getting the highest standards of customer service, including resolve to travel related queries on email. Compare Bus...</p>
              </div>
              <div>
                 <h2 className="text-[20px] font-black text-slate-900 mb-6 tracking-tight">Advantages of booking bus tickets online on WingTrip:</h2>
                 <p className="text-[13px] text-slate-600 leading-[1.8] mb-4 font-medium">The most important part of any trip is planned pleasure. If you plan well, you are sure to enjoy your trip to the bit. And online bus booking allows just that. You can check from a number of bus destination, compare prices with other nearby routes, choose from AC/non-AC buses as per your preference and more, all within a few minutes and with just a few taps on your phone. You can also avail of immediate cancellation in case of a sudden change in plans, as per a few seconds, all within the hour...</p>
              </div>
              <div>
                 <h2 className="text-[20px] font-black text-slate-900 mb-6 tracking-tight">What's more?</h2>
                 <p className="text-[13px] text-slate-600 leading-[1.8] mb-4 font-medium">Online bus ticket booking also gives you the freedom to choose your mode of payment. No more do you have to carry cash or pay for your tickets in cash. You can avail a range of payment modes available on our platform: Debit Card, Credit Card & Net Banking via banks like: HDFC Bank, ICICI Bank, Axis Bank, State Bank of India and many more, UPI mode of payment, Trip Money, Wallets & more: Google Pay, Pho...</p>
              </div>
              <div>
                 <h2 className="text-[20px] font-black text-slate-900 mb-6 tracking-tight">How to Book Bus Online on WingTrip:</h2>
                 <p className="text-[13px] text-slate-600 leading-[1.8] mb-4 font-medium italic">Booking bus tickets online is super easy and comfortable. All you have to do is follow the steps below: <br/>
                    Tap on the 'Trains & Bus' icon on the WingTrip homepage. <br/>
                    Select the 'Book Bus Tickets' tab <br/>
                    Enter details of your bus journey and tap on the SEARCH button <br/>
                    Choose your preferred bus service <br/>
                    Select your seat next <br/>
                    Choose the nearest pick-up and drop-off points <br/>
                    Enter traveller details and coupon code <br/>
                    You can even choose to insure your journey so that you will be covered f...
                 </p>
              </div>
              <div>
                 <h2 className="text-[20px] font-black text-slate-900 mb-6 tracking-tight">MySafety Assurance on Bus Bookings:</h2>
                 <p className="text-[13px] text-slate-600 leading-[1.8] mb-4 font-medium">All the buses available on our platform follow stringent safety protocols and government-mandated social distancing guidelines, with the primary focus on customer safety. All passengers have to undergo temperature checks mandatorily before boarding the bus. All the buses come with hand sanitizers. All the staff wear masks and gloves to minimize direct contact. The vehicle is thoroughly disinfected after the completion of every bus ride. Seats are allocated, keeping the social dist...</p>
              </div>
           </div>
        </section>


      </main>



      <style dangerouslySetInnerHTML={{
        __html: `
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .shadow-premium-lg { box-shadow: 0 30px 100px -20px rgba(0,0,0,0.15); }
      `}} />
    </div>
  );
};

export default BusLandingPage;
