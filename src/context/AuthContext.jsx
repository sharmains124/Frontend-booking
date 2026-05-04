import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalView, setAuthModalView] = useState('login'); // 'login', 'register', 'forgot-password'

  const openAuthModal = (view = 'login') => {
    setAuthModalView(view);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const switchAuthView = (view) => {
    setAuthModalView(view);
  };

  return (
    <AuthContext.Provider value={{ 
      isAuthModalOpen, 
      authModalView, 
      openAuthModal, 
      closeAuthModal, 
      switchAuthView 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthModal = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthModal must be used within an AuthProvider');
  }
  return context;
};
