import React, { useState, useEffect } from 'react';
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

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/auth/login';
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
    <div className="min-h-screen bg-[#f8fafc] pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-4xl font-black text-gray-900 tracking-tight mb-2">My Profile</h1>
            <p className="text-gray-500 font-medium">Manage your personal information and account settings</p>
          </div>
          <div className="flex gap-4">
            <button 
              onClick={() => setEditing(!editing)}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold transition-all shadow-sm
                ${editing 
                  ? 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50' 
                  : 'bg-blue-600 text-white hover:bg-blue-700 active:scale-95'}`}
            >
              {editing ? <><X size={18} /> Cancel</> : <><Edit3 size={18} /> Edit Profile</>}
            </button>
            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-red-50 text-red-600 border border-red-100 font-bold hover:bg-red-100 transition-all active:scale-95"
            >
              <LogOut size={18} /> Logout
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Profile Card & Navigation */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* User Profile Card */}
            <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm text-center relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-br from-blue-500 to-indigo-600"></div>
              
              <div className="relative z-10">
                <div className="relative inline-block mt-4 mb-6">
                  <div className="w-32 h-32 rounded-3xl bg-white p-1 overflow-hidden shadow-2xl border-2 border-white/50">
                    <img 
                      src={user?.avatar || '/avatars/custom_a.png'} 
                      alt="Avatar" 
                      className="w-full h-full object-cover rounded-[22px]"
                    />
                  </div>
                  <button className="absolute -bottom-2 -right-2 w-10 h-10 bg-white rounded-2xl flex items-center justify-center text-gray-600 shadow-lg border border-gray-50 hover:bg-gray-50 transition-all">
                    <Camera size={20} />
                  </button>
                </div>

                <h2 className="text-2xl font-black text-gray-900 tracking-tight mb-1">
                  {user?.first_name} {user?.last_name}
                </h2>
                <p className="text-gray-500 text-sm font-medium mb-6">Member since {new Date(user?.createdAt).getFullYear()}</p>
                
                <div className="grid grid-cols-2 gap-4 py-6 border-t border-gray-50">
                  <div className="text-center">
                    <p className="text-2xl font-black text-blue-600">12</p>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Trips</p>
                  </div>
                  <div className="text-center border-l border-gray-50">
                    <p className="text-2xl font-black text-orange-500">2,450</p>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Miles</p>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-2xl text-xs font-bold border border-green-100">
                  <ShieldCheck size={16} /> Verified Traveler
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="bg-white rounded-3xl p-4 border border-gray-100 shadow-sm space-y-2">
              {[
                { label: 'Booking History', icon: ShoppingBag, color: 'text-purple-500' },
                { label: 'Payment Methods', icon: CreditCard, color: 'text-blue-500' },
                { label: 'Notification Settings', icon: Settings, color: 'text-orange-500' }
              ].map((link, i) => (
                <button key={i} className="w-full flex items-center justify-between p-4 rounded-2xl hover:bg-gray-50 transition-all group">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-xl bg-white border border-gray-100 shadow-sm flex items-center justify-center ${link.color}`}>
                      <link.icon size={20} />
                    </div>
                    <span className="font-bold text-gray-700 tracking-tight">{link.label}</span>
                  </div>
                  <ChevronRight size={18} className="text-gray-300 group-hover:text-gray-500 group-hover:translate-x-1 transition-all" />
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Information & Form */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden h-full">
              
              <div className="p-8 border-b border-gray-50 flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-900 tracking-tight">Personal Information</h3>
                {editing && (
                  <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border border-blue-100">Editing Mode</span>
                )}
              </div>

              <div className="p-8">
                {editing ? (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">First Name</label>
                        <input 
                          type="text" 
                          name="first_name" 
                          value={formData.first_name} 
                          onChange={handleInputChange} 
                          className="w-full px-5 py-3.5 rounded-2xl bg-gray-50 border border-transparent focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-50 transition-all outline-none font-bold text-gray-700" 
                          placeholder="First Name"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">Last Name</label>
                        <input 
                          type="text" 
                          name="last_name" 
                          value={formData.last_name} 
                          onChange={handleInputChange} 
                          className="w-full px-5 py-3.5 rounded-2xl bg-gray-50 border border-transparent focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-50 transition-all outline-none font-bold text-gray-700" 
                          placeholder="Last Name"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">Email Address</label>
                        <div className="relative">
                          <Mail size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" />
                          <input 
                            type="email" 
                            name="email" 
                            value={formData.email} 
                            disabled 
                            className="w-full pl-12 pr-5 py-3.5 rounded-2xl bg-gray-100 border border-transparent text-gray-400 font-bold cursor-not-allowed" 
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">Phone Number</label>
                        <div className="relative">
                          <Phone size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" />
                          <input 
                            type="text" 
                            name="mobile" 
                            value={formData.mobile} 
                            onChange={handleInputChange} 
                            className="w-full pl-12 pr-5 py-3.5 rounded-2xl bg-gray-50 border border-transparent focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-50 transition-all outline-none font-bold text-gray-700" 
                            placeholder="Mobile Number"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">Location</label>
                      <div className="relative">
                        <MapPin size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input 
                          type="text" 
                          name="location" 
                          value={formData.location} 
                          onChange={handleInputChange} 
                          className="w-full pl-12 pr-5 py-3.5 rounded-2xl bg-gray-50 border border-transparent focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-50 transition-all outline-none font-bold text-gray-700" 
                          placeholder="City, Country"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">Biography</label>
                      <textarea 
                        name="bio" 
                        value={formData.bio} 
                        onChange={handleInputChange} 
                        rows="4"
                        className="w-full px-5 py-4 rounded-2xl bg-gray-50 border border-transparent focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-50 transition-all outline-none font-bold text-gray-700 resize-none" 
                        placeholder="Tell us a bit about yourself and your travel style..."
                      ></textarea>
                    </div>

                    <div className="pt-6 border-t border-gray-50 flex justify-end">
                      <button 
                        type="submit" 
                        disabled={isUpdating}
                        className="bg-blue-600 text-white px-10 py-4 rounded-[20px] font-black uppercase tracking-widest shadow-lg shadow-blue-100 hover:bg-blue-700 hover:shadow-xl hover:translate-y-[-2px] transition-all active:scale-95 disabled:opacity-70 disabled:translate-y-0"
                      >
                        {isUpdating ? <Loader2 className="animate-spin inline mr-2" /> : <Check className="inline mr-2" />}
                        Save Changes
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="space-y-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                      
                      <div className="flex gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600">
                          <User size={24} />
                        </div>
                        <div>
                          <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1">Full Name</p>
                          <p className="text-base font-bold text-gray-800">{user?.first_name} {user?.last_name}</p>
                        </div>
                      </div>

                      <div className="flex gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600">
                          <Mail size={24} />
                        </div>
                        <div>
                          <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1">Email</p>
                          <p className="text-base font-bold text-gray-800">{user?.email}</p>
                        </div>
                      </div>

                      <div className="flex gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-orange-50 flex items-center justify-center text-orange-600">
                          <Phone size={24} />
                        </div>
                        <div>
                          <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1">Phone</p>
                          <p className="text-base font-bold text-gray-800">{user?.mobile || 'Not set'}</p>
                        </div>
                      </div>

                      <div className="flex gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center text-red-600">
                          <MapPin size={24} />
                        </div>
                        <div>
                          <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1">Location</p>
                          <p className="text-base font-bold text-gray-800">{user?.location || 'Not set'}</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100/50">
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4">Biography</p>
                      <p className="text-gray-600 font-medium leading-relaxed italic">
                        {user?.bio || '"No bio yet. Tell the world about your adventures!"'}
                      </p>
                    </div>

                    <div className="pt-6 border-t border-gray-50 grid grid-cols-1 sm:grid-cols-2 gap-4">
                       <div className="bg-blue-50/50 p-4 rounded-2xl flex items-center gap-3">
                          <Calendar size={18} className="text-blue-500" />
                          <span className="text-xs font-bold text-blue-700">Joined wingtrip in {new Date(user?.createdAt).toLocaleDateString()}</span>
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
