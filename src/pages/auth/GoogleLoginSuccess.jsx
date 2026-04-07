import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const GoogleLoginSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const token = query.get('token');

    if (token) {
      localStorage.setItem('token', token);
      
      // Dispatch custom event to notify components that auth has changed
      window.dispatchEvent(new Event('auth-change'));
      
      toast.success("Identity synchronized! Welcome back.");
      
      // Navigate to homepage after a brief delay
      setTimeout(() => {
        navigate('/');
      }, 800);
    } else {
      toast.error("Google login failed. No token received.");
      navigate('/auth/login');
    }
  }, [location, navigate]);

  return (
    <div className="min-h-screen bg-[#05070a] flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p className="text-white font-black uppercase tracking-widest text-xs opacity-50">Synchronizing Identity...</p>
      </div>
    </div>
  );
};

export default GoogleLoginSuccess;
