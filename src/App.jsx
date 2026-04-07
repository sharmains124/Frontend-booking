import React from 'react';
import { Routes, Route } from 'react-router-dom';

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
import { BusPage } from './pages/ServicePlaceholders';
import TrainsRoot from './pages/trains/TrainsRoot';
import HotelsRoot from './pages/hotels/HotelsRoot';
import ProfilePage from './pages/ProfilePage';
import Support from './components/Support';

// Auth Pages
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ForgetPassword from './pages/auth/ForgetPassword';
import ResetPassword from './pages/auth/ResetPassword';
import OtpVerify from './pages/auth/OtpVerify';
import GoogleLoginSuccess from './pages/auth/GoogleLoginSuccess';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        {/* Main Pages with Header & Footer */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/flights/*" element={<FlightsRoot />} />
          <Route path="/hotels/*" element={<HotelsRoot />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/ux-analysis" element={<UXBreakdown />} />
          <Route path="/bus" element={<BusPage />} />
          <Route path="/trains/*" element={<TrainsRoot />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/support" element={<Support />} />
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
