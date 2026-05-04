import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthModal } from '../context/AuthContext';
import { useGetUserQuery, useUpdateUserMutation } from '../services/userService';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  ShieldCheck, 
  Camera, 
  Edit3, 
  Check, 
  X,
  Loader2,
  ChevronRight,
  LogOut,
  CreditCard,
  ShoppingBag,
  Settings
} from 'lucide-react';


const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const { data: userData, isLoading: isFetching, refetch } = useGetUserQuery();
  const [updateUserMutation, { isLoading: isUpdating }] = useUpdateUserMutation();
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    mobile: '',
    location: '',
    bio: ''
  });


  useEffect(() => {
    if (userData) {
      const fetched = userData.data || userData;
      setUser(fetched);
      setFormData({
        first_name: fetched.first_name || '',
        last_name: fetched.last_name || '',
        email: fetched.email || '',
        mobile: fetched.mobile || '',
        location: fetched.location || '',
        bio: fetched.bio || ''
      });
    }
  }, [userData]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await updateUserMutation(formData).unwrap();
      if (response.status) {
        const updated = response.data || response;
        setUser(updated);
        localStorage.setItem('user', JSON.stringify(updated));
        setEditing(false);
        window.dispatchEvent(new Event('auth-change'));
      }
    } catch (error) {
      console.error("Failed to update profile:", error);
      alert("Update failed. Please try again.");
    }
  };

  const { openAuthModal } = useAuthModal();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
    setTimeout(() => {
      openAuthModal('login');
    }, 100);
  };

  if (isFetching) {
    return (
      <div className="min-h-screen bg-[#f8fafc] flex flex-col items-center justify-center">
        <Loader2 className="w-10 h-10 text-blue-600 animate-spin mb-4" />
        <p className="text-sm font-black text-gray-400 uppercase tracking-widest">Loading your profile...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFDFD] pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-5xl font-black text-[#111] tracking-tight mb-3">My Profile</h1>
            <p className="text-[#666] font-medium text-lg">Manage your personal information and account settings</p>
          </div>
          <div className="flex gap-4">
            <button 
              onClick={() => setEditing(!editing)}
              className={`flex items-center gap-2 px-8 py-3.5 rounded-full font-bold transition-all shadow-sm
                ${editing 
                  ? 'bg-white text-gray-800 border border-gray-200 hover:bg-gray-50' 
                  : 'bg-[#111] text-white hover:bg-black active:scale-95'}`}
            >
              {editing ? <><X size={18} /> Cancel</> : <><Edit3 size={18} /> Edit Profile</>}
            </button>
            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 px-8 py-3.5 rounded-full bg-red-50 text-red-600 font-bold hover:bg-red-100 transition-all active:scale-95"
            >
              <LogOut size={18} /> Logout
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Profile Card & Navigation */}
          <div className="lg:col-span-4 space-y-8">
            
            {/* User Profile Card */}
            <div className="bg-white rounded-[2rem] p-8 border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] text-center relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-40 overflow-hidden">
                <img src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070&auto=format&fit=crop" alt="Cover" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-black/10"></div>
              </div>
              
              <div className="relative z-10 mt-16">
                <div className="relative inline-block mb-6">
                  <div className="w-36 h-36 rounded-[2.5rem] bg-white p-2 overflow-hidden shadow-xl mx-auto">
                    <img 
                      src={user?.avatar || '/avatars/custom_a.png'} 
                      alt="Avatar" 
                      className="w-full h-full object-cover rounded-[2rem]"
                    />
                  </div>
                  <button className="absolute -bottom-3 -right-3 w-12 h-12 bg-[#111] text-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-800 transition-all active:scale-95 border-4 border-white">
                    <Camera size={20} />
                  </button>
                </div>

                <h2 className="text-3xl font-black text-[#111] tracking-tight mb-2">
                  {user?.first_name} {user?.last_name}
                </h2>
                <p className="text-[#666] text-sm font-medium mb-8">Member since {new Date(user?.createdAt).getFullYear()}</p>
                
                <div className="flex items-center justify-center gap-12 py-6 border-t border-gray-100/60">
                  <div className="text-center">
                    <p className="text-3xl font-black text-[#111]">12</p>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Trips</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-black text-[#111]">2.4k</p>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Miles</p>
                  </div>
                </div>

                <div className="mt-2 inline-flex items-center justify-center gap-2 bg-emerald-50 text-emerald-700 px-5 py-2.5 rounded-full text-xs font-bold">
                  <ShieldCheck size={16} /> Verified Traveler
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="bg-white rounded-[2rem] p-6 border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] space-y-3">
              {[
                { label: 'Booking History', icon: ShoppingBag, color: 'text-purple-500', bg: 'bg-purple-50' },
                { label: 'Payment Methods', icon: CreditCard, color: 'text-blue-500', bg: 'bg-blue-50' },
                { label: 'Notification Settings', icon: Settings, color: 'text-orange-500', bg: 'bg-orange-50' }
              ].map((link, i) => (
                <button key={i} className="w-full flex items-center justify-between p-4 rounded-2xl hover:bg-gray-50 transition-all group border border-transparent hover:border-gray-100">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-[1rem] flex items-center justify-center ${link.bg} ${link.color} transition-transform group-hover:scale-110`}>
                      <link.icon size={22} />
                    </div>
                    <span className="font-bold text-[#111] tracking-tight text-lg">{link.label}</span>
                  </div>
                  <ChevronRight size={20} className="text-gray-300 group-hover:text-gray-500 group-hover:translate-x-1 transition-all" />
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Information & Form */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden h-full">
              
              <div className="p-10 border-b border-gray-100/60 flex items-center justify-between">
                <h3 className="text-2xl font-black text-[#111] tracking-tight">Personal Information</h3>
                {editing && (
                  <span className="bg-[#111] text-white px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-widest">Editing Mode</span>
                )}
              </div>

              <div className="p-10">
                {editing ? (
                  <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-3">
                        <label className="text-xs font-black text-gray-500 uppercase tracking-widest ml-2">First Name</label>
                        <input 
                          type="text" 
                          name="first_name" 
                          value={formData.first_name} 
                          onChange={handleInputChange} 
                          className="w-full px-6 py-4 rounded-[1.5rem] bg-gray-50/80 border border-gray-200 focus:bg-white focus:border-[#111] focus:ring-4 focus:ring-gray-100 transition-all outline-none font-bold text-[#111] text-lg" 
                          placeholder="First Name"
                        />
                      </div>
                      <div className="space-y-3">
                        <label className="text-xs font-black text-gray-500 uppercase tracking-widest ml-2">Last Name</label>
                        <input 
                          type="text" 
                          name="last_name" 
                          value={formData.last_name} 
                          onChange={handleInputChange} 
                          className="w-full px-6 py-4 rounded-[1.5rem] bg-gray-50/80 border border-gray-200 focus:bg-white focus:border-[#111] focus:ring-4 focus:ring-gray-100 transition-all outline-none font-bold text-[#111] text-lg" 
                          placeholder="Last Name"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-3">
                        <label className="text-xs font-black text-gray-500 uppercase tracking-widest ml-2">Email Address</label>
                        <div className="relative">
                          <Mail size={20} className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400" />
                          <input 
                            type="email" 
                            name="email" 
                            value={formData.email} 
                            disabled 
                            className="w-full pl-14 pr-6 py-4 rounded-[1.5rem] bg-gray-100 border border-transparent text-gray-400 font-bold text-lg cursor-not-allowed" 
                          />
                        </div>
                      </div>
                      <div className="space-y-3">
                        <label className="text-xs font-black text-gray-500 uppercase tracking-widest ml-2">Phone Number</label>
                        <div className="relative">
                          <Phone size={20} className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400" />
                          <input 
                            type="text" 
                            name="mobile" 
                            value={formData.mobile} 
                            onChange={handleInputChange} 
                            className="w-full pl-14 pr-6 py-4 rounded-[1.5rem] bg-gray-50/80 border border-gray-200 focus:bg-white focus:border-[#111] focus:ring-4 focus:ring-gray-100 transition-all outline-none font-bold text-[#111] text-lg" 
                            placeholder="Mobile Number"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label className="text-xs font-black text-gray-500 uppercase tracking-widest ml-2">Location</label>
                      <div className="relative">
                        <MapPin size={20} className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input 
                          type="text" 
                          name="location" 
                          value={formData.location} 
                          onChange={handleInputChange} 
                          className="w-full pl-14 pr-6 py-4 rounded-[1.5rem] bg-gray-50/80 border border-gray-200 focus:bg-white focus:border-[#111] focus:ring-4 focus:ring-gray-100 transition-all outline-none font-bold text-[#111] text-lg" 
                          placeholder="City, Country"
                        />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label className="text-xs font-black text-gray-500 uppercase tracking-widest ml-2">Biography</label>
                      <textarea 
                        name="bio" 
                        value={formData.bio} 
                        onChange={handleInputChange} 
                        rows="4"
                        className="w-full px-6 py-5 rounded-[1.5rem] bg-gray-50/80 border border-gray-200 focus:bg-white focus:border-[#111] focus:ring-4 focus:ring-gray-100 transition-all outline-none font-bold text-[#111] text-lg resize-none" 
                        placeholder="Tell us a bit about yourself and your travel style..."
                      ></textarea>
                    </div>

                    <div className="pt-8 border-t border-gray-100/60 flex justify-end">
                      <button 
                        type="submit" 
                        disabled={isUpdating}
                        className="bg-[#111] text-white px-12 py-4 rounded-full font-black uppercase tracking-widest shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:bg-black hover:shadow-2xl hover:-translate-y-1 transition-all active:scale-95 disabled:opacity-70 disabled:translate-y-0"
                      >
                        {isUpdating ? <Loader2 className="animate-spin inline mr-2" /> : <Check className="inline mr-2" />}
                        Save Changes
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="space-y-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12">
                      
                      <div className="flex gap-6 group cursor-pointer p-4 -m-4 rounded-2xl hover:bg-gray-50 transition-colors">
                        <div className="w-16 h-16 rounded-[1.2rem] bg-blue-50/80 flex items-center justify-center text-blue-600 transition-transform group-hover:scale-110">
                          <User size={28} strokeWidth={2.5} />
                        </div>
                        <div className="flex flex-col justify-center">
                          <p className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1.5">Full Name</p>
                          <p className="text-xl font-bold text-[#111]">{user?.first_name} {user?.last_name}</p>
                        </div>
                      </div>

                      <div className="flex gap-6 group cursor-pointer p-4 -m-4 rounded-2xl hover:bg-gray-50 transition-colors">
                        <div className="w-16 h-16 rounded-[1.2rem] bg-indigo-50/80 flex items-center justify-center text-indigo-600 transition-transform group-hover:scale-110">
                          <Mail size={28} strokeWidth={2.5} />
                        </div>
                        <div className="flex flex-col justify-center">
                          <p className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1.5">Email</p>
                          <p className="text-xl font-bold text-[#111]">{user?.email}</p>
                        </div>
                      </div>

                      <div className="flex gap-6 group cursor-pointer p-4 -m-4 rounded-2xl hover:bg-gray-50 transition-colors">
                        <div className="w-16 h-16 rounded-[1.2rem] bg-orange-50/80 flex items-center justify-center text-orange-600 transition-transform group-hover:scale-110">
                          <Phone size={28} strokeWidth={2.5} />
                        </div>
                        <div className="flex flex-col justify-center">
                          <p className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1.5">Phone</p>
                          <p className="text-xl font-bold text-[#111]">{user?.mobile || 'Not set'}</p>
                        </div>
                      </div>

                      <div className="flex gap-6 group cursor-pointer p-4 -m-4 rounded-2xl hover:bg-gray-50 transition-colors">
                        <div className="w-16 h-16 rounded-[1.2rem] bg-red-50/80 flex items-center justify-center text-red-600 transition-transform group-hover:scale-110">
                          <MapPin size={28} strokeWidth={2.5} />
                        </div>
                        <div className="flex flex-col justify-center">
                          <p className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1.5">Location</p>
                          <p className="text-xl font-bold text-[#111]">{user?.location || 'Not set'}</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50/80 rounded-[2rem] p-10 border border-gray-100/60">
                      <p className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] mb-5">Biography</p>
                      <p className="text-[#555] font-medium leading-relaxed text-lg italic">
                        {user?.bio || '"No bio yet. Tell the world about your adventures!"'}
                      </p>
                    </div>

                    <div className="pt-8 border-t border-gray-100/60">
                       <div className="bg-blue-50/50 p-6 rounded-[1.5rem] inline-flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                            <Calendar size={20} className="text-blue-600" />
                          </div>
                          <span className="text-sm font-bold text-blue-800">Joined wingtrip in {new Date(user?.createdAt).toLocaleDateString()}</span>
                       </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
