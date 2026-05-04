import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Globe, User, ChevronDown, Search, LogOut, Wallet, Settings, Shield, HelpCircle, Briefcase, UserCircle, History } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useGetUserQuery } from '../services/userService';
import { useAuthModal } from '../context/AuthContext';

const Header = () => {
  const [isScrolledState, setIsScrolledState] = useState(false);
  const [user, setuser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { openAuthModal } = useAuthModal();
  const location = useLocation();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  // Use RTK Query to get latest avatar and first name
  const { data: userData, refetch } = useGetUserQuery(undefined, { skip: !token });

  const transparentRoutes = ['/', '/flights', '/hotels', '/trains', '/bus', '/destinations', '/offers'];
  const isTransparentRoute = transparentRoutes.includes(location.pathname);
  const isScrolled = isScrolledState || !isTransparentRoute;

  // React to successful fetch
  useEffect(() => {
    if (userData) {
      const fetchedUser = userData.data || userData;
      setuser(fetchedUser);
      localStorage.setItem('user', JSON.stringify(fetchedUser));
    }
  }, [userData]);

  useEffect(() => {
    const handleScroll = () => setIsScrolledState(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);

    const syncLocal = () => {
      const currentToken = localStorage.getItem('token');
      const storedUser = localStorage.getItem('user');
      if (storedUser && !userData) {
        try { setuser(JSON.parse(storedUser)); } catch (e) { }
      }
      // Only refetch if token exists (query is not skipped)
      if (currentToken && refetch) {
        refetch();
      }
    };

    const handleClickOutside = (e) => {
      if (!e.target.closest('.account-pill-container')) setShowDropdown(false);
    };

    syncLocal();
    window.addEventListener('click', handleClickOutside);
    window.addEventListener('auth-change', syncLocal);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('click', handleClickOutside);
      window.removeEventListener('auth-change', syncLocal);
    };
  }, [location.pathname, refetch, userData]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setuser(null);
    setShowDropdown(false);
    setIsMenuOpen(false);
    toast.success("Logout Successful! See you soon. 👋");
    window.dispatchEvent(new Event('auth-change'));
    navigate('/');
    setTimeout(() => {
      openAuthModal('login');
    }, 100);
  };

  const navLinks = [
    { name: 'HOME', path: '/' },
    { name: 'FLIGHTS', path: '/flights' },
    { name: 'HOTELS', path: '/hotels' },
    { name: 'TRAINS', path: '/trains' },
    { name: 'BUSES', path: '/bus' },
    { name: 'DESTINATIONS', path: '/destinations' },
    { name: 'OFFERS', path: '/offers' }
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 py-3 z-[100] transition-all duration-300
        ${isScrolled
          ? 'bg-white shadow-soft py-2'
          : 'bg-transparent'}`}
    >
      <div className="container-custom flex items-center justify-between">
        {/* Left Side: Logo */}
        <Link to="/" className="flex items-center gap-2">
          <span className={`text-3xl font-bold tracking-tight transition-colors
            ${isScrolled ? 'text-text-main' : 'text-white'}`}>
            Wing<span className="text-primary">Trip</span>
          </span>
        </Link>

        {/* Center: Main Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.name}
                to={link.path}
                className="relative group px-1"
              >
                <span className={`text-[11px] font-bold tracking-[0.15em] uppercase transition-all duration-300
                  ${isScrolled
                    ? (isActive ? 'text-primary' : 'text-text-muted hover:text-text-main')
                    : (isActive ? 'text-white' : 'text-white/80 hover:text-white')}`}>
                  {link.name}
                </span>
                {isActive && (
                  <div className={`absolute -bottom-2 left-0 right-0 h-[2px] rounded-full
                    ${isScrolled ? 'bg-primary' : 'bg-white'}`}></div>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right Side: Account Pill & Mobile Toggle */}
        <div className="flex items-center gap-4">
          <div className="relative account-pill-container hidden md:block">
            <div
              onClick={() => localStorage.getItem('token') ? setShowDropdown(!showDropdown) : openAuthModal('login')}
              className={`flex items-center gap-3 pl-1 pr-5 py-1 rounded-full border transition-all cursor-pointer group/pill
                ${isScrolled
                  ? 'bg-slate-50 border-slate-200 text-[#0B1A4B] hover:shadow-sm'
                  : 'bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/20'}`}
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center shadow-sm overflow-hidden border border-white/40 ${localStorage.getItem('token') && !user?.avatar ? 'bg-[#0B1A4B] text-white' : 'bg-white text-[#0B1A4B]'}`}>
                {localStorage.getItem('token') ? (
                  user?.avatar ? (
                    <img
                      src={user.avatar}
                      alt="User"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-white font-black text-sm">
                      {(user?.first_name?.[0] || 'U').toUpperCase()}
                    </span>
                  )
                ) : (
                  <User size={20} className="text-primary" />
                )}
              </div>

              <div className="flex flex-col">
                {localStorage.getItem('token') ? (
                  <span className={`text-[12px] font-black whitespace-nowrap ${isScrolled ? 'text-[#0B1A4B]' : 'text-white'}`}>
                    Hi, {user?.first_name || 'Explorer'}
                  </span>
                ) : (
                  <span className={`text-[13px] font-black whitespace-nowrap ${isScrolled ? 'text-[#0B1A4B]' : 'text-white'}`}>
                    Login / Signup
                  </span>
                )}
              </div>

              <ChevronDown size={12} className={`opacity-50 transition-transform duration-300 ${showDropdown ? 'rotate-180 text-primary' : ''}`} />
            </div>

            {/* Dropdown Menu */}
            {showDropdown && (
              <div 
                className="absolute top-full right-0 mt-2 w-72 bg-white rounded-[24px] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] border border-gray-100 overflow-y-auto overflow-x-hidden max-h-[85vh] custom-scrollbar z-[110] transition-all duration-300 transform origin-top-right animate-fade-in-up"
                style={{ animation: 'slideIn 0.3s ease-out' }}
              >
                {/* Header Section (Dark) */}
                <div className="bg-[#0B1A4B] p-6 text-white relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl -mr-16 -mt-16"></div>
                  <div className="relative z-10 flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full border-2 border-white/20 p-1 bg-white/10 backdrop-blur-md overflow-hidden">
                      {user?.avatar ? (
                        <img src={user.avatar} alt="Avatar" className="w-full h-full object-cover rounded-full" />
                      ) : (
                        <div className="w-full h-full rounded-full bg-primary flex items-center justify-center font-black text-xl">
                          {(user?.first_name?.[0] || 'U').toUpperCase()}
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col min-w-0">
                      <h4 className="font-black text-lg leading-tight truncate">{user?.first_name} {user?.last_name}</h4>
                      <p className="text-[10px] font-bold text-white/60 truncate uppercase tracking-widest">{user?.email}</p>
                    </div>
                  </div>
                </div>

                {/* Menu Items */}
                <div className="py-2">
                  <div className="px-4">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-2 mt-4 mb-3">Personal Workspace</p>
                    
                    <Link to="/profile" onClick={() => setShowDropdown(false)} className="flex items-start gap-4 p-3 rounded-[20px] hover:bg-slate-50 transition-all group">
                      <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all">
                        <UserCircle size={20} />
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="font-black text-[#0B1A4B] text-[14px]">My Profile</span>
                        <span className="text-[11px] font-medium text-slate-500 leading-tight">Manage your account and settings</span>
                      </div>
                    </Link>

                    <Link to="/my-trips" onClick={() => setShowDropdown(false)} className="flex items-start gap-4 p-3 rounded-[20px] hover:bg-slate-50 transition-all group">
                      <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-all">
                        <Briefcase size={20} />
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="font-black text-[#0B1A4B] text-[14px]">My Trips</span>
                        <span className="text-[11px] font-medium text-slate-500 leading-tight">View bookings and travel history</span>
                      </div>
                    </Link>

                    <Link to="/wallet" onClick={() => setShowDropdown(false)} className="flex items-start gap-4 p-3 rounded-[20px] hover:bg-slate-50 transition-all group cursor-pointer">
                      <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-all">
                        <Wallet size={20} />
                      </div>
                      <div className="flex flex-col flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="font-black text-[#0B1A4B] text-[14px]">wingtrip Wallet</span>
                          <span className="text-[11px] font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-lg group-hover:bg-white transition-colors">₹{user?.wallet_balance || '450'}</span>
                        </div>
                        <span className="text-[11px] font-medium text-slate-500 leading-tight">Check balance and transactions</span>
                      </div>
                    </Link>
                  </div>

                  <div className="h-[1px] bg-slate-100 mx-8 my-4 opacity-50"></div>

                  <div className="px-4">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-2 mt-2 mb-3">Security & Identity</p>
                    
                    <Link to="/settings" onClick={() => setShowDropdown(false)} className="flex items-start gap-4 p-3 rounded-[20px] hover:bg-slate-50 transition-all group">
                      <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                        <Settings size={20} />
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="font-black text-[#0B1A4B] text-[14px]">Manage Settings</span>
                        <span className="text-[11px] font-medium text-slate-500 leading-tight">2FA, Privacy & Notifications</span>
                      </div>
                    </Link>

                    <Link to="/security" onClick={() => setShowDropdown(false)} className="flex items-start gap-4 p-3 rounded-[20px] hover:bg-slate-50 transition-all group">
                      <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600 group-hover:bg-slate-800 group-hover:text-white transition-all">
                        <Shield size={20} />
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="font-black text-[#0B1A4B] text-[14px]">Security Activity</span>
                        <span className="text-[11px] font-medium text-slate-500 leading-tight">Login history and active devices</span>
                      </div>
                    </Link>

                    <Link to="/account" onClick={() => setShowDropdown(false)} className="flex items-start gap-4 p-3 rounded-[20px] hover:bg-slate-50 transition-all group">
                      <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600 group-hover:bg-amber-600 group-hover:text-white transition-all">
                        <User size={20} />
                      </div>
                      <div className="flex flex-col min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-black text-[#0B1A4B] text-[14px]">My Account</span>
                          <span className="text-[8px] font-black text-white bg-amber-500 px-1.5 py-0.5 rounded uppercase tracking-tighter shadow-sm">VIP</span>
                        </div>
                        <span className="text-[11px] font-medium text-slate-500 leading-tight">Verify identity and tier status</span>
                      </div>
                    </Link>

                    <Link to="/support" onClick={() => setShowDropdown(false)} className="flex items-start gap-4 p-3 rounded-[20px] hover:bg-slate-50 transition-all group">
                      <div className="w-10 h-10 rounded-xl bg-rose-50 flex items-center justify-center text-rose-600 group-hover:bg-rose-600 group-hover:text-white transition-all">
                        <HelpCircle size={20} />
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="font-black text-[#0B1A4B] text-[14px]">Help Center</span>
                        <span className="text-[11px] font-medium text-slate-500 leading-tight">FAQs, chat and customer support</span>
                      </div>
                    </Link>
                  </div>

                  <div className="px-6 py-5 mt-4 border-t border-slate-50 bg-slate-50/50">
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center justify-center gap-3 py-3.5 rounded-[20px] bg-white border border-accent/20 text-accent font-black text-[12px] uppercase tracking-widest hover:bg-accent hover:text-white hover:border-accent transition-all shadow-sm active:scale-95 group"
                    >
                      <LogOut size={18} className="transition-transform group-hover:-translate-x-1" />
                      Logout Session
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          <button 
            onClick={() => setIsMenuOpen(true)}
            className={`lg:hidden p-2 rounded-xl transition-all
              ${isScrolled ? 'text-text-main hover:bg-slate-100' : 'text-white hover:bg-white/10'}`}>
            <Menu size={24} />
          </button>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      <div className={`fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[150] lg:hidden transition-all duration-500 ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`} onClick={() => setIsMenuOpen(false)}></div>
      
      {/* Mobile Drawer Content */}
      <div className={`fixed top-0 right-0 bottom-0 w-[80%] max-w-sm bg-white z-[200] lg:hidden transition-transform duration-500 transform ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} shadow-2xl flex flex-col`}>
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <Link to="/" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-2">
            <span className="text-2xl font-bold text-text-main tracking-tight">Wing<span className="text-primary">Trip</span></span>
          </Link>
          <button onClick={() => setIsMenuOpen(false)} className="p-2 bg-slate-50 text-slate-500 rounded-xl h-10 w-10 flex items-center justify-center"><X size={20} /></button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-2 mb-8">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-4">Quick Navigation</p>
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                className={`flex items-center justify-between p-4 rounded-2xl font-bold text-sm tracking-wide transition-all
                  ${location.pathname === link.path ? 'bg-primary/5 text-primary' : 'hover:bg-slate-50 text-slate-600'}`}
              >
                {link.name}
                {location.pathname === link.path && <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>}
              </Link>
            ))}
          </div>

          <div className="space-y-4">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-4">Account</p>
            {localStorage.getItem('token') ? (
              <>
                <Link to="/profile" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-sm">
                    {user?.avatar ? <img src={user.avatar} className="w-full h-full object-cover" /> : <div className="w-full h-full bg-primary flex items-center justify-center text-white font-black text-lg">{(user?.first_name?.[0] || 'U').toUpperCase()}</div>}
                  </div>
                  <div>
                    <p className="font-black text-text-main text-base leading-none mb-1">Hi, {user?.first_name || 'Explorer'}</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest truncate max-w-[150px]">{user?.email}</p>
                  </div>
                </Link>
                <button onClick={handleLogout} className="w-full py-4 rounded-2xl bg-accent/10 text-accent font-bold text-sm uppercase tracking-widest">Logout Session</button>
              </>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                <button 
                  onClick={() => { setIsMenuOpen(false); openAuthModal('login'); }} 
                  className="py-4 rounded-2xl bg-primary text-white text-center font-bold text-sm uppercase tracking-widest"
                >
                  Login
                </button>
                <button 
                  onClick={() => { setIsMenuOpen(false); openAuthModal('register'); }} 
                  className="py-4 rounded-2xl bg-white border border-slate-200 text-text-main text-center font-bold text-sm uppercase tracking-widest"
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="p-6 bg-slate-50 border-t border-gray-100">
           <p className="text-[10px] text-center text-slate-400 font-bold uppercase tracking-widest">© 2026 WingTrip Global Reach Ltd.</p>
        </div>
      </div>
    </header>
  );
};

export default Header;
