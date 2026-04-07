import { Outlet } from 'react-router-dom';
import React from 'react';

const AuthLayout = () => {
  return (
    <div className="min-h-screen flex font-sans antialiased overflow-hidden">
      {/* ── Left Side: Image & Branding ──────────────────────────── */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-slate-200">
        <div className="absolute inset-0 z-0">
          <img
            src="/assets/Amrit.png"
            alt="Welcome Background"
            className="w-full h-full object-cover grayscale-[30%] contrast-[1.1] brightness-[0.8]"
          />
        </div>
        
        {/* Decorative mask similar to screenshot (optional, but requested simple image) */}
        
        {/* WELCOME text centered */}
        <div className="relative z-10 flex items-center justify-center w-full h-full pt-16">
          <h1 className="text-white text-6xl md:text-7xl lg:text-8xl font-medium tracking-[0.2em] drop-shadow-lg opacity-95 text-center">
            WELCOME
          </h1>
        </div>
      </div>

      {/* ── Right Side: Auth Form Container ─────────────────────── */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center bg-white p-6 sm:p-12 relative">
        <div className="w-full max-w-[450px]">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
