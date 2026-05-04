import React from 'react';
import { Tag, Plane, Hotel, Bus as BusIcon, Train, Palmtree, CreditCard } from 'lucide-react';

export const ALL_OFFERS = [
  // Flight Offers
  {
    id: 'f1',
    category: 'Flights',
    tag: 'FLIGHTS SALE',
    title: 'The Great Summer Sale: FLAT 15% OFF*',
    subtitle: 'on Domestic & International Flights. Use code: MMTSUMMER',
    img: 'https://promos.makemytrip.com/appfest/2x//Desktop-SummerSale-Common-02Apr.jpg?im=Resize=(134,134)',
    validity: "T&C's Apply",
    cta: 'BOOK NOW',
    code: 'MMTSUMMER'
  },
  {
    id: 'f2',
    category: 'Flights',
    tag: 'PILGRIMAGE',
    title: 'Plan Your Holy Char Dham Journey Now:',
    subtitle: 'Get FLAT ₹2,500 OFF* on flights and special pilgrimage packages.',
    img: 'https://promos.makemytrip.com/appfest/2x//Desktop-CharDham-1Apr.jpg?im=Resize=(134,134)',
    validity: "T&C's Apply",
    cta: 'VIEW DETAILS',
    code: 'CHAR DHAM'
  },
  // Hotel Offers
  {
    id: 'h1',
    category: 'Hotels',
    tag: 'HOTEL DEALS',
    title: 'Explore the Magic of North East:',
    subtitle: 'Up to 30% Savings* on hotels in Gangtok, Darjeeling & more.',
    img: 'https://promos.makemytrip.com/images//Desktop-EastOffer-20Dec.jpg?im=Resize=(134,134)',
    validity: "T&C's Apply",
    cta: 'BOOK NOW',
    code: 'NE30'
  },
  {
    id: 'h2',
    category: 'Hotels',
    tag: 'INTL HOTELS',
    title: 'Songkran Special: Celebrate in Thailand!',
    subtitle: 'Grab Up to 25% OFF* on luxury stays across Thailand.',
    img: 'https://promos.makemytrip.com/appfest/2x//Desktop-Songkran-10Mar.jpg?im=Resize=(134,134)',
    validity: "T&C's Apply",
    cta: 'VIEW DETAILS',
    code: 'THAI25'
  },
  {
    id: 'h3',
    category: 'Hotels',
    tag: 'LUXURY',
    title: 'Luxury Stay at Amritara',
    subtitle: 'Indulge in a premium holiday experience at unbeatable prices.',
    img: 'https://promos.makemytrip.com/notification/xhdpi//116X116-amritara-21022024.jpg?im=Resize=(134,134)',
    validity: "T&C's Apply",
    cta: 'BOOK NOW'
  },
  // Holidays
  {
    id: 'hol1',
    category: 'Holidays',
    tag: 'HOLIDAYS',
    title: 'Kashmir: Paradise on Earth Awaits You:',
    subtitle: 'Book your dream Kashmir holiday starting at ₹18,990*.',
    img: 'https://promos.makemytrip.com/appfest/2x//desktop-DH-Kashmir-200326.jpg?im=Resize=(134,134)',
    validity: "Expires 30 Jun 26",
    cta: 'VIEW DETAILS'
  },
  {
    id: 'hol2',
    category: 'Holidays',
    tag: 'HOLIDAYS',
    title: 'Ladakh: The Journey of a Lifetime:',
    subtitle: 'Special group departures and customized trips to Leh-Ladakh.',
    img: 'https://promos.makemytrip.com/appfest/2x//desktop-DH-Ladakh-200326.jpg?im=Resize=(134,134)',
    validity: "T&C's Apply",
    cta: 'BOOK NOW'
  },
  // Bus Offers
  {
    id: 'b1',
    category: 'Buses',
    tag: 'BUS SPECIAL',
    title: 'Grab Up to 40% OFF* on Buses',
    subtitle: 'Applicable on all major routes across India.',
    img: 'https://promos.makemytrip.com/appfest/2x//Desktop-SummerSale-Common-02Apr.jpg?im=Resize=(134,134)',
    validity: 'Code: MMTBUS40',
    cta: 'BOOK NOW',
    code: 'MMTBUS40'
  },
  {
    id: 'b2',
    category: 'Buses',
    tag: 'NEW ROUTE',
    title: 'Explore South: Flat 15% OFF*',
    subtitle: 'on bus bookings to Bangalore, Chennai & Hyderabad.',
    img: 'https://promos.makemytrip.com/appfest/2x//desktop-DH-Kashmir-200326.jpg?im=Resize=(134,134)',
    validity: 'Code: BUSSOUTH',
    cta: 'BOOK NOW',
    code: 'BUSSOUTH'
  },
  // Train Offers
  {
    id: 't1',
    category: 'Trains',
    tag: 'TRAINS',
    title: "FLAT ₹20 OFF* on Train Bookings",
    subtitle: "Valid on all IRCTC train bookings via WingTrip.",
    img: 'https://promos.makemytrip.com/appfest/2x//116X116-bhim-16022026.jpg?im=Resize=(134,134)',
    validity: 'Code: MMTBHIM',
    cta: 'VIEW DETAILS',
    code: 'MMTBHIM'
  },
  {
    id: 't2',
    category: 'Trains',
    tag: 'REFUND',
    title: "Get ₹100 Extra Refund",
    subtitle: "with Free Cancellation on Train Tickets.",
    img: 'https://promos.makemytrip.com/notification/xhdpi//116x116-trip-gurantee-08072021.jpg?im=Resize=(134,134)',
    validity: 'T&C Apply',
    cta: 'BOOK NOW'
  },
  // Bank Offers
  {
    id: 'bank1',
    category: 'Bank Offers',
    tag: 'RUPAY',
    title: 'Grab FLAT 12% OFF* with RuPay Cards:',
    subtitle: 'on Domestic Flights bookings. Limited time offer!',
    img: 'https://promos.makemytrip.com/notification/xhdpi//rupay-116x116-19082022.jpg?im=Resize=(134,134)',
    validity: "T&C's Apply",
    cta: 'BOOK NOW'
  },
  {
    id: 'bank2',
    category: 'Bank Offers',
    tag: 'SBI',
    title: 'Flat 8% Instant Discount*',
    subtitle: 'with SBI Credit Cards on all bus bookings.',
    img: 'https://promos.makemytrip.com/notification/xhdpi//rupay-116x116-19082022.jpg?im=Resize=(134,134)',
    validity: 'Code: MMTSBI',
    cta: 'BOOK NOW',
    code: 'MMTSBI'
  }
];

export const CATEGORIES = [
  { name: 'All Offers', icon: <Tag size={18} /> },
  { name: 'Flights', icon: <Plane size={18} /> },
  { name: 'Hotels', icon: <Hotel size={18} /> },
  { name: 'Buses', icon: <BusIcon size={18} /> },
  { name: 'Trains', icon: <Train size={18} /> },
  { name: 'Holidays', icon: <Palmtree size={18} /> },
  { name: 'Bank Offers', icon: <CreditCard size={18} /> }
];
