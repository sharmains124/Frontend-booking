import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Globe, User, ChevronDown, Search, LogOut } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useGetUserQuery } from '../services/userService';

const Header = () => {
  const [isScrolledState, setIsScrolledState] = useState(false);
  const [user, setuser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
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
    toast.success("Logout Successful! See you soon. 👋");
    window.dispatchEvent(new Event('auth-change'));
    navigate('/auth/login');
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

        {/* Center: Main Nav - Matching Image */}
        <nav className="hidden lg:flex items-center gap-6">
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

        {/* Right Side: Account Pill - Matching Image */}
        <div className="flex items-center gap-4 relative account-pill-container">
          <div
            onClick={() => localStorage.getItem('token') ? setShowDropdown(!showDropdown) : navigate('/auth/login')}
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
                    {(user?.first_name?.[0] || user?.username?.[0] || user?.email?.[0] || user?.mobile?.[0] || 'U').toUpperCase()}
                  </span>
                )
              ) : (
                <User size={20} />
              )}
            </div>

            <div className="flex flex-col">
              {!localStorage.getItem('token') && (
                <span className={`text-[9px] font-bold uppercase tracking-wider ${isScrolled ? 'text-slate-500' : 'opacity-80'}`}>
                  LOGIN OR
                </span>
              )}
              <span className={`text-[12px] font-bold whitespace-nowrap ${isScrolled && !localStorage.getItem('token') ? 'text-[#0B1A4B]' : ''}`}>
                {localStorage.getItem('token') ? (user?.first_name || user?.username || user?.email?.split('@')[0] || user?.mobile || 'User') : 'Create Account'}
              </span>
            </div>

            <ChevronDown size={12} className={`opacity-50 transition-transform ${showDropdown ? 'rotate-180' : ''}`} />
          </div>

          {/* Dropdown Menu */}
          {showDropdown && (
            <div className="absolute top-full right-0 mt-4 w-60 bg-white rounded-2xl shadow-premium border border-gray-100 py-3 animate-fade-in z-[110]">
              <Link
                to="/profile"
                onClick={() => setShowDropdown(false)}
                className="flex items-center gap-3 px-5 py-4 hover:bg-primary/5 transition-colors group"
              >
                <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all transform group-hover:scale-110">
                  <User size={18} />
                </div>
                <span className="font-black text-text-main text-sm tracking-tight">Profile & Booking</span>
              </Link>

              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-5 py-4 hover:bg-accent/5 transition-colors group"
              >
                <div className="w-9 h-9 rounded-xl bg-accent/10 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-all transform group-hover:scale-110">
                  <LogOut size={18} />
                </div>
                <span className="font-black text-accent text-sm tracking-tight italic">Logout Session</span>
              </button>
            </div>
          )}

          <button className={`xl:hidden p-2 rounded-xl 
            ${isScrolled ? 'text-text-main' : 'text-white'}`}>
            <Menu size={24} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
