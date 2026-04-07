import React from 'react';

const Button = ({ 
  children, 
  variant = 'pill', 
  size = 'md', 
  className = '', 
  ...props 
}) => {
  const variants = {
    pill: 'bg-secondary-900 text-white rounded-full hover:bg-black transition-all shadow-lg',
    'pill-secondary': 'bg-transparent text-secondary-900 border-2 border-secondary-900 rounded-full hover:bg-secondary-900 hover:text-white transition-all',
    'pill-gold': 'bg-accent-gold text-secondary-900 rounded-full hover:bg-black hover:text-white transition-all shadow-lg font-bold',
    ghost: 'bg-transparent text-secondary-900 hover:bg-secondary-50 transition-all'
  };

  const sizes = {
    sm: 'px-8 py-3 text-[10px] tracking-widest uppercase font-bold',
    md: 'px-12 py-4 text-[12px] tracking-widest uppercase font-bold',
    lg: 'px-16 py-6 text-[14px] tracking-widest uppercase font-bold'
  };

  return (
    <button 
      className={`inline-flex items-center justify-center gap-4 ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
