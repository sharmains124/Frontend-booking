import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import PageLoader from './components/PageLoader';

// Layouts
import MainLayout from './layout/MainLayout';
import AuthLayout from './layout/AuthLayout';

// Main Pages
import HomePage from './pages/HomePage';
import FlightsRoot from './pages/flights/FlightsRoot';
import BookingPage from './pages/BookingPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import UXBreakdown from './pages/UXBreakdown';
import BusRoot from './pages/Bus/BusRoot';
import TrainsRoot from './pages/trains/TrainsRoot';
import HotelsRoot from './pages/hotels/HotelsRoot';
import ProfilePage from './pages/ProfilePage';
import Support from './components/Support';
import OffersRoot from './pages/offers/OffersRoot';
import DestinationsRoot from './pages/destinations/DestinationsRoot';

// Profile Dropdown Pages
import MyTrips from './pages/auth/MyTrips';
import Wallet from './pages/auth/Wallet';
import Settings from './pages/auth/Settings';
import Security from './pages/auth/Security';
import MyAccount from './pages/auth/MyAccount';

// Auth Pages
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ForgetPassword from './pages/auth/ForgetPassword';
import ResetPassword from './pages/auth/ResetPassword';
import OtpVerify from './pages/auth/OtpVerify';
import GoogleLoginSuccess from './pages/auth/GoogleLoginSuccess';
import { Toaster } from 'react-hot-toast';

// ─── Loader duration (ms) ───────────────────────────────────
const LOADER_DURATION = 900;

function App() {
  const location = useLocation();

  // Only show loader on initial visit
  const [loading, setLoading] = useState(true);

  // Initial load
  useEffect(() => {
    const t = setTimeout(() => {
      setLoading(false);
    }, LOADER_DURATION);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      {/* Loader renders on top for initial load */}
      <PageLoader isLoading={loading} />
      <Toaster position="top-center" reverseOrder={false} />

      <Routes location={location}>
        {/* Main Pages with Header & Footer */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/flights/*" element={<FlightsRoot />} />
          <Route path="/hotels/*" element={<HotelsRoot />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/ux-analysis" element={<UXBreakdown />} />
          <Route path="/bus/*" element={<BusRoot />} />
          <Route path="/trains/*" element={<TrainsRoot />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/support" element={<Support />} />
          <Route path="/offers/*" element={<OffersRoot />} />
          <Route path="/destinations/*" element={<DestinationsRoot />} />
          <Route path="/my-trips" element={<MyTrips />} />
          <Route path="/wallet" element={<Wallet />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/security" element={<Security />} />
          <Route path="/account" element={<MyAccount />} />
        </Route>

        {/* Checkout/Booking Page without standard Header/Footer */}
        <Route path="/booking" element={<BookingPage />} />

        {/* Auth Pages with Centered Layout */}
        <Route element={<AuthLayout />}>
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/register" element={<Register />} />
          <Route path="/auth/forgot-password" element={<ForgetPassword />} />
          <Route path="/auth/reset-password" element={<ResetPassword />} />
          <Route path="/auth/verify-otp" element={<OtpVerify />} />
          <Route path="/auth/login/success" element={<GoogleLoginSuccess />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
