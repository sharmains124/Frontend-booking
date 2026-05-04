import React from 'react';
import { X } from 'lucide-react';
import { useAuthModal } from '../context/AuthContext';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import ForgetPassword from '../pages/auth/ForgetPassword';

const AuthModal = () => {
  const { isAuthModalOpen, authModalView, closeAuthModal } = useAuthModal();

  if (!isAuthModalOpen) return null;

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 sm:p-6">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-fade-in"
        onClick={closeAuthModal}
      ></div>

      {/* Modal Content */}
      <div 
        className="relative w-full max-w-[850px] bg-white rounded-[24px] overflow-hidden shadow-2xl flex flex-col md:flex-row animate-fade-in-up"
        style={{ maxHeight: '90vh' }}
      >
        {/* Left Side: Image/Info */}
        <div className="hidden md:flex md:w-[45%] relative bg-slate-200 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img
              src="/assets/Amrit.png"
              alt="Welcome Background"
              className="w-full h-full object-cover grayscale-[30%] contrast-[1.1] brightness-[0.8]"
            />
          </div>
          
          <div className="relative z-10 flex items-center justify-center w-full h-full">
            <h1 className="text-white text-5xl lg:text-6xl font-medium tracking-[0.2em] drop-shadow-lg opacity-95 text-center">
              WELCOME
            </h1>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="w-full md:w-[55%] p-6 sm:p-8 md:p-10 relative flex flex-col overflow-y-auto">
          <button 
            onClick={closeAuthModal}
            className="absolute top-4 right-4 p-2 bg-slate-50 hover:bg-slate-100 text-slate-500 rounded-full transition-all z-10 shadow-sm"
          >
            <X size={18} />
          </button>

          <div className="flex-1 flex flex-col justify-center">
            {authModalView === 'login' && <Login isModal={true} />}
            {authModalView === 'register' && <Register isModal={true} />}
            {authModalView === 'forgot-password' && <ForgetPassword isModal={true} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
