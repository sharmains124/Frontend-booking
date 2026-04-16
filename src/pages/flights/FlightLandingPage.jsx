import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import FlightHero from '../../components/Hero';
import TopFlightDeals from './components/TopFlightDeals';
import PopularAirlines from './components/PopularAirlines';

const OFFER_TABS = ['All Offers', 'Flights', 'Hotels', 'Holidays', 'Trains', 'Visa', 'Cabs', 'Bank Offers'];

const OFFERS_DATA = [
  {
    tag: 'FLIGHTS SALE',
    tagColor: 'text-gray-500',
    title: 'The Great Summer Sale: FLAT 15% OFF*',
    subtitle: 'on Domestic & International Flights. Use code: MMTSUMMER',
    img: 'https://promos.makemytrip.com/appfest/2x//Desktop-SummerSale-Common-02Apr.jpg?im=Resize=(134,134)',
    validity: "T&C's Apply",
    cta: 'BOOK NOW',
    category: 'Flights'
  },
  {
    tag: 'PILGRIMAGE',
    tagColor: 'text-gray-500',
    title: 'Plan Your Holy Char Dham Journey Now:',
    subtitle: 'Get FLAT ₹2,500 OFF* on flights and special pilgrimage packages.',
    img: 'https://promos.makemytrip.com/appfest/2x//Desktop-CharDham-1Apr.jpg?im=Resize=(134,134)',
    validity: "T&C's Apply",
    cta: 'VIEW DETAILS',
    category: 'Flights'
  },
  {
    tag: 'HOTEL DEALS',
    tagColor: 'text-gray-500',
    title: 'Explore the Magic of North East:',
    subtitle: 'Up to 30% Savings* on hotels in Gangtok, Darjeeling & more.',
    img: 'https://promos.makemytrip.com/images//Desktop-EastOffer-20Dec.jpg?im=Resize=(134,134)',
    validity: "T&C's Apply",
    cta: 'BOOK NOW',
    category: 'Hotels'
  },
  {
    tag: 'INTL HOTELS',
    tagColor: 'text-gray-500',
    title: 'Songkran Special: Celebrate in Thailand!',
    subtitle: 'Grab Up to 25% OFF* on luxury stays across Thailand.',
    img: 'https://promos.makemytrip.com/appfest/2x//Desktop-Songkran-10Mar.jpg?im=Resize=(134,134)',
    validity: "T&C's Apply",
    cta: 'VIEW DETAILS',
    category: 'Hotels'
  },
  {
    tag: 'HOLIDAYS',
    tagColor: 'text-gray-500',
    title: 'Kashmir: Paradise on Earth Awaits You:',
    subtitle: 'Book your dream Kashmir holiday starting at ₹18,990*.',
    img: 'https://promos.makemytrip.com/appfest/2x//desktop-DH-Kashmir-200326.jpg?im=Resize=(134,134)',
    validity: "Expires 30 Jun 26",
    cta: 'VIEW DETAILS',
    category: 'Holidays'
  },
  {
    tag: 'HOLIDAYS',
    tagColor: 'text-gray-500',
    title: 'Ladakh: The Journey of a Lifetime:',
    subtitle: 'Special group departures and customized trips to Leh-Ladakh.',
    img: 'https://promos.makemytrip.com/appfest/2x//desktop-DH-Ladakh-200326.jpg?im=Resize=(134,134)',
    validity: "T&C's Apply",
    cta: 'BOOK NOW',
    category: 'Holidays'
  },
  {
    tag: 'BANK OFFERS',
    tagColor: 'text-gray-500',
    title: 'Grab FLAT 12% OFF* with RuPay Cards:',
    subtitle: 'on Domestic Flights bookings. Limited time offer!',
    img: 'https://promos.makemytrip.com/notification/xhdpi//rupay-116x116-19082022.jpg?im=Resize=(134,134)',
    validity: "T&C's Apply",
    cta: 'BOOK NOW',
    category: 'Bank Offers'
  },
  {
    tag: 'BANK OFFERS',
    tagColor: 'text-gray-500',
    title: 'ICICI Bank RuPay Credit Card Special:',
    subtitle: 'Enjoy additional benefits & rewards on travel bookings.',
    img: 'https://promos.makemytrip.com/appfest/2x//icici-rupay-bg-23082125.jpg?im=Resize=(134,134)',
    validity: "T&C's Apply",
    cta: 'APPLY NOW',
    category: 'Bank Offers'
  }
];

const POPULAR_ROUTES = [
  { city: 'Chennai', subtitle: 'Flights from Delhi, Mumbai, Bengaluru, Hyderabad', src: 'https://promos.makemytrip.com/images/50x50-Other-23052019.png' },
  { city: 'Goa', subtitle: 'Flights from Delhi, Mumbai, Bengaluru, Pune', src: 'https://promos.makemytrip.com/store/GoaDT.JPG' },
  { city: 'Mumbai', subtitle: 'Flights from Delhi, Bengaluru, Chennai, Ahmedabad', src: 'https://promos.makemytrip.com/store/MumbaiDT.JPG' },
  { city: 'Hyderabad', subtitle: 'Flights from Chennai, Mumbai, Bengaluru, Kochi', src: 'https://promos.makemytrip.com/images/50x50-Ooty-23052019.png' },
  { city: 'Delhi', subtitle: 'Flights from Mumbai, Bangalore, Chennai, Kolkata', src: 'https://promos.makemytrip.com/store/DelhiDT.JPG' },
  { city: 'Pune', subtitle: 'Flights from Delhi, Bengaluru, Chennai, Ahmedabad', src: 'https://promos.makemytrip.com/store/PuneDT.JPG' },
  { city: 'Kolkata', subtitle: 'Flights from Delhi, Mumbai, Bengaluru, Pune', src: 'https://promos.makemytrip.com/store/SingaporeDT.JPG' },
  { city: 'Bangalore', subtitle: 'Flights from Delhi, Pune, Mumbai, Kolkata', src: 'https://promos.makemytrip.com/store/BangaloreDT.JPG' },
  { city: 'Jaipur', subtitle: 'Flights from Mumbai, Delhi, Ahmedabad, Lucknow', src: 'https://promos.makemytrip.com/store/JaipurDT.JPG' },
];

const AIRLINE_PARTNERS = [
  { name: 'Air India', tail: 'https://platforms.makemytrip.com/contents/1064b316-32ab-4a74-8634-c5c782ee757b', bg: 'bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900' },
  { name: 'AirAsia', tail: 'https://platforms.makemytrip.com/contents/7e84cd04-75d3-4de6-bae6-506ccc90d50f', bg: 'bg-gradient-to-r from-[#e71d24] via-[#c4121a] to-[#e71d24]' },
  { name: 'Etihad Airways', tail: 'https://platforms.makemytrip.com/contents/3a55ec7e-43cd-4b9c-8b34-9660a4cab675', bg: 'bg-gradient-to-r from-[#212121] via-[#333333] to-[#212121]' },
  { name: 'Malaysia Airlines', tail: 'https://platforms.makemytrip.com/contents/3567fd3f-5d06-4e8b-a482-26a960e77f3f', bg: 'bg-gradient-to-r from-[#003399] via-[#002266] to-[#003399]' },
];

const FlightLandingPage = () => {
  const [activeOfferTab, setActiveOfferTab] = useState('All Offers');
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

  // Reset pagination when tab changes
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
      {/* Hero + Search Form */}
      <FlightHero
        bgType="image"
        bgUrl="/assets/Amrit.png"
        animate={true}
        isFlight={true}
      />

      <main className="pt-8">

        {/* ═══════════════════════════════════════════════════════
            OFFERS SECTION - MakeMyTrip Style
        ═══════════════════════════════════════════════════════ */}
        <section className="bg-white rounded-2xl shadow-xl border border-gray-100 max-w-[1200px] mx-auto overflow-hidden mt-6 mb-12 z-20 relative p-8">
          {/* Offers Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 pb-1 border-b border-gray-100">
            <div className="flex items-center gap-10">
              <h2 className="text-3xl font-black text-slate-800 tracking-tight">Offers</h2>
              <div className="flex items-center gap-8 overflow-x-auto hide-scrollbar pt-2">
                {OFFER_TABS.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => handleTabChange(tab)}
                    className={`pb-3 text-[14px] font-bold whitespace-nowrap transition-all relative
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
            <div className="flex items-center gap-4">
              <button className="hidden md:block text-[#008cff] text-[13px] font-black hover:underline whitespace-nowrap uppercase tracking-[0.1em] mr-4">
                VIEW ALL
              </button>
              {totalPages > 1 && (
                <div className="flex items-center gap-2">
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

          {/* Offers Slider - MMT Paginated Style */}
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
                      className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 cursor-pointer group/card flex h-[150px] sm:h-[165px]"
                    >
                      {/* Left: Image Section - Proportional Square */}
                      <div className="relative w-[120px] sm:w-[140px] h-full flex-shrink-0 flex items-center justify-center p-3 bg-white">
                        <img
                          src={offer.img}
                          alt={offer.title}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-contain rounded-xl group-hover/card:scale-105 transition-transform duration-500"
                        />
                      </div>

                      {/* Right: Content Section */}
                      <div className="flex-1 p-3 sm:p-4 flex flex-col min-w-0 bg-white justify-center">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest truncate">{offer.tag}</span>
                          <span className="text-[9px] font-bold text-gray-400 uppercase whitespace-nowrap ml-2">{offer.validity}</span>
                        </div>

                        <div className="mb-1.5">
                          <h3 className="text-[14px] sm:text-[15px] font-black text-slate-800 leading-[1.3] mb-1 line-clamp-2 transition-colors tracking-tight">
                            {offer.title}
                          </h3>
                          <div className="w-8 h-[2px] bg-red-500 mb-1.5 rounded-full" />
                          <p className="text-[10px] sm:text-[11px] text-gray-500 line-clamp-2 leading-relaxed font-semibold">
                            {offer.subtitle}
                          </p>
                        </div>

                        <div className="mt-1 flex justify-end">
                          <span className="text-[#008cff] text-[10px] font-black uppercase tracking-widest group-hover/card:underline">
                            {offer.cta || 'BOOK NOW'}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                  {/* Fill empty slots in grid if last page has < 4 items to maintain layout integrity */}
                  {page.length < 4 && pageIdx === offerPages.length - 1 && [...Array(4 - page.length)].map((_, i) => (
                    <div key={`empty-${i}`} className="hidden lg:block h-[200px] pointer-events-none" />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            AIRLINE PARTNERS SECTION
        ═══════════════════════════════════════════════════════ */}
        <section className="max-w-[1200px] mx-auto px-6 py-10">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-10">
            <h2 className="text-[24px] font-black text-slate-800 mb-8">Experience Flying with our Airline Partners</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-2">
              {AIRLINE_PARTNERS.map((partner, idx) => (
                <a
                  href="#"
                  key={idx}
                  className="group cursor-pointer block transition-transform duration-300 hover:-translate-y-2"
                >
                  <div className="relative w-full overflow-visible">
                    <img
                      src={partner.tail}
                      alt={partner.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-auto object-contain transition-all mix-blend-darken"
                      onError={(e) => {
                        e.target.src = "https://promos.makemytrip.com/notification/xhdpi/Vistara-116x116-23052019.png";
                      }}
                    />
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            DOWNLOAD APP SECTION - MakeMyTrip White Banner
        ═══════════════════════════════════════════════════════ */}
        <section className="max-w-[1200px] mx-auto px-6 py-8">
          <div className="bg-white rounded-2xl p-8 md:p-10 shadow-sm border border-gray-200 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-6 flex-1">
              {/* Phone/Gift Icon */}
              <div className="w-[80px] h-auto flex-shrink-0">
                <img src="https://promos.makemytrip.com/Growth/Images/B2C/2x/mac_monument_new.png" referrerPolicy="no-referrer" alt="Download App" className="w-full h-full object-contain drop-shadow-md" />
              </div>
              <div className="flex-1">
                <h3 className="text-[26px] md:text-[30px] font-black text-slate-900 tracking-tight leading-tight mb-2">Download App Now !</h3>
                <p className="text-gray-500 text-[14px] mb-5">
                  Use code <span className="font-bold text-slate-800">WELCOMEMMT</span> and get <span className="font-bold text-slate-800">FLAT 12% OFF*</span> on your first domestic flight booking
                </p>
                <div className="flex items-center w-full max-w-[460px] bg-white rounded border border-gray-300">
                  <div className="flex items-center gap-2 px-4 py-3 text-[14px] font-bold text-slate-800 border-r border-gray-300 bg-gray-50/50">
                    <img src="https://flagcdn.com/w20/in.png" alt="India" className="w-[18px] opacity-90" />
                    <span>+91</span>
                  </div>
                  <input
                    type="text"
                    placeholder="Enter Mobile number"
                    className="flex-1 bg-transparent border-none outline-none text-[15px] px-4 text-slate-800 placeholder:text-gray-400 font-medium"
                  />
                  <button className="text-[#008cff] hover:text-[#0077e6] hover:bg-blue-50 px-6 py-3 text-[14px] font-bold transition-colors border-l border-gray-300">
                    GET APP LINK
                  </button>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-6 border-l border-gray-100 pl-8">
              <div className="flex flex-col gap-3">
                <a href="#" className="w-[130px] transition-transform hover:scale-105">
                  <img src="https://promos.makemytrip.com/Growth/Images/B2C/2x/google-play-store.png" referrerPolicy="no-referrer" alt="Google Play" className="w-full h-auto drop-shadow-sm" />
                </a>
                <a href="#" className="w-[130px] transition-transform hover:scale-105">
                  <img src="https://promos.makemytrip.com/Growth/Images/B2C/2x/apple-app-store.png" referrerPolicy="no-referrer" alt="App Store" className="w-full h-auto drop-shadow-sm" />
                </a>
              </div>
              <div className="w-[110px] h-[110px] bg-white p-2 border border-gray-100 rounded-lg shadow-sm shrink-0">
                <img src="https://promos.makemytrip.com/Growth/Images/B2C/2x/qrCodeNew.png" referrerPolicy="no-referrer" alt="QR Code" className="w-full h-full object-contain opacity-90" />
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            POPULAR FLIGHT ROUTES - MakeMyTrip Grid
        ═══════════════════════════════════════════════════════ */}
        <section className="max-w-[1200px] mx-auto px-6 py-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-5">
            {POPULAR_ROUTES.map((route, idx) => (
              <div
                key={idx}
                className="flex items-center gap-4 py-3 cursor-pointer group"
              >
                <div className="w-[50px] h-[50px] rounded-full overflow-hidden flex-shrink-0 border-2 border-gray-200 group-hover:border-[#008cff] transition-colors">
                  <img
                    src={route.src}
                    alt={route.city}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-[14px] font-bold text-slate-800 group-hover:text-[#008cff] transition-colors">
                    {route.city} Flights
                  </h4>
                  <p className="text-[11px] text-gray-400 leading-snug">{route.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            MMT BOTTOM NAV BAR (Sticky)
        ═══════════════════════════════════════════════════════ */}
        <section className="bg-[#1a1a2e] py-3">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="flex items-center gap-6 overflow-x-auto hide-scrollbar">
              {['Flights', 'Hotels', 'Homestays', 'Holiday Packages', 'Trains', 'Buses', 'Cabs', 'Forex', 'Travel Insurance', 'Gift Cards'].map((item, i) => (
                <span key={i} className={`text-[11px] font-bold whitespace-nowrap cursor-pointer transition-colors ${i === 0 ? 'text-white border-b-2 border-[#008cff] pb-1' : 'text-gray-400 hover:text-white'}`}>
                  {item}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            SEO CONTENT SECTIONS (MAPPING, PRODUCTS, etc.)
        ═══════════════════════════════════════════════════════ */}
        <section className="max-w-[1200px] mx-auto px-6 py-10 space-y-8">
          {/* Main SEO Block */}
          <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
            <p className="text-[12px] text-gray-500 leading-relaxed mb-6">
              MakeMyTrip is India's leading online travel company and in this role, we believe, we have a responsibility to build a sustainable tourism ecosystem. Enter your departure and arrival destinations, Select your preferred date, Choose from our wide range of cheapest flight fares and airlines - IndiGo, GoFirst, Air India, Air India Express, Akasa Air, Vistara, Spicejet, Air Asia in India, Let your flight booking be done in just a few easy steps.
            </p>

            <div className="space-y-6">
              <div>
                <h4 className="text-[11px] font-black text-gray-900 uppercase tracking-wider mb-2">MAPPING</h4>
                <p className="text-[10px] text-gray-400 leading-relaxed">
                  Flights Tickets: Chennai, Mumbai, Kolkata, Hyderabad, Bengaluru, Pune, Ahmedabad, Jaipur, Lucknow, Chandigarh, Nagpur, Goa, Amritsar, Guwahati, Patna, Udaipur, Varanasi, Mangalore, Visakhapatnam, Thiruvananthapuram, Madurai, Srinagar, Cochin, Coimbatore, Ranchi, Bhubaneswar, Tirupati, Leh, Dehradun, Siliguri, Imphal, Raipur, Agartala, Vadodara, Port Blair, Aurangabad, Surat.
                </p>
              </div>

              <div>
                <h4 className="text-[11px] font-black text-gray-900 uppercase tracking-wider mb-2">PRODUCT OFFERING</h4>
                <p className="text-[10px] text-gray-400 leading-relaxed">
                  Flights, International Flights, Charter Flights, Hotels, International Hotels, Homestays and Villas, Activities, Holidays in India, International Holidays, Book Hotels From UAE, myBiz for Corporate Travel Management, Book Online Cabs, Buy Gift Cards, Gift Boxes, Trip Ideas, Travel Blog, PNR Status, MakeMyTrip Advertising Solutions, One Way Cab.
                </p>
              </div>

              <div>
                <h4 className="text-[11px] font-black text-gray-900 uppercase tracking-wider mb-2">INTERNATIONAL FLIGHTS</h4>
                <p className="text-[10px] text-gray-400 leading-relaxed">
                  Cheap Flights to Dubai, Cheap Flights to Bangkok, Flights to Singapore, Flights to Toronto, Flights to New York, Flights to London, Flights to Kuala Lumpur, Flights to Phuket, Flights to Bali, Flights to Tokyo, Flights to Colombo, Flights to Kathmandu, Flights to Hong Kong, Flights to Sydney, Flights to Melbourne.
                </p>
              </div>

              <div>
                <h4 className="text-[11px] font-black text-gray-900 uppercase tracking-wider mb-2">TOP ROUTES</h4>
                <p className="text-[10px] text-gray-400 leading-relaxed">
                  Delhi to Mumbai Flights, Delhi to Bangalore Flights, Delhi to Goa Flights, Mumbai to Delhi Flights, Bangalore to Delhi Flights, Mumbai to Goa Flights, Chennai to Delhi Flights, Kolkata to Delhi Flights, Delhi to Chennai Flights, Mumbai to Bangalore Flights, Bangalore to Mumbai Flights, Delhi to Hyderabad Flights.
                </p>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 space-y-8">
            <h3 className="text-[18px] font-black text-gray-900 tracking-tight mb-4 uppercase">FAQs</h3>
            <div className="space-y-6">
              <div>
                <h4 className="text-[14px] font-bold text-gray-800 mb-2">Q: How can I find the cheapest flight on MakeMyTrip?</h4>
                <p className="text-[12px] text-gray-500 leading-relaxed">
                  A: To find the cheapest flights, use our 'Fare Calendar' which shows the lowest prices across different dates. You can also filter by 'Lowest Price' and 'Non-stop' flights for the best deals.
                </p>
              </div>
              <div>
                <h4 className="text-[14px] font-bold text-gray-800 mb-2">Q: How do I check my flight status on MakeMyTrip?</h4>
                <p className="text-[12px] text-gray-500 leading-relaxed">
                  A: You can check your flight status by navigating to the 'Flight Status' section in our top menu. Enter your flight number and date to get real-time updates on schedules and baggage details.
                </p>
              </div>
              <div>
                <h4 className="text-[14px] font-bold text-gray-800 mb-2">Q: Can I book multi-city flights on MakeMyTrip?</h4>
                <p className="text-[12px] text-gray-500 leading-relaxed">
                  A: Yes, certainly! Select the 'Multi City' option in our search bar to plan complex itineraries with up to 6 different sectors in a single booking.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            SOCIAL LINKS + COPYRIGHT
        ═══════════════════════════════════════════════════════ */}
        <section className="border-t border-gray-200 bg-white py-6 mt-12">
          <div className="max-w-[1200px] mx-auto px-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* Instagram */}
              <a href="#" className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="5" /><circle cx="17.5" cy="6.5" r="1.5" fill="#333" /></svg>
              </a>
              {/* X (Twitter) */}
              <a href="#" className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="#333"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
              </a>
              {/* LinkedIn */}
              <a href="#" className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="#333"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
              </a>
              {/* Facebook */}
              <a href="#" className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="#333"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
              </a>
            </div>
            <p className="text-[11px] text-gray-400 font-medium">© 2026 MAKEMYTRIP PVT. LTD.</p>
          </div>
        </section>

      </main>

      {/* Hide scrollbar CSS */}
      <style dangerouslySetInnerHTML={{
        __html: `
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
    </div>
  );
};

export default FlightLandingPage;
