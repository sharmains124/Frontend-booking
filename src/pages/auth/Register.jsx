import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { useRegisterMutation } from '../../services/authService';
import { toast } from 'react-hot-toast';
import { useAuthModal } from '../../context/AuthContext';

const inputCls = `
  block w-full py-3 bg-transparent border-0 border-b-2 border-gray-300
  focus:ring-0 focus:border-[#0B1A4B] transition-colors text-[15px] font-medium text-gray-900
  placeholder:text-gray-400 outline-none px-1
`;

const Register = ({ isModal = false }) => {
  const [tab, setTab] = useState('email');
  const [formData, setFormData] = useState({
    first_name: '', last_name: '', email: '', mobile: '', password: '', confirm_password: '',
  });
  const [registerMutation, { isLoading: loading }] = useRegisterMutation();
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { switchAuthView, closeAuthModal } = useAuthModal();
  const set = (k) => (e) => setFormData({ ...formData, [k]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (tab === 'email' && formData.password !== formData.confirm_password) {
      setError('Passwords do not match');
      return;
    }

    try {
      const payload = {
        first_name: formData.first_name,
        last_name: formData.last_name,
      };
      if (tab === 'email') {
        payload.email = formData.email;
        payload.password = formData.password;
      } else {
        payload.mobile = formData.mobile;
      }

      const res = await registerMutation(payload).unwrap();
      if (res.status && res.data?.userId) {
        toast.success('OTP dispatched! Please verify.');
        if (isModal) {
            closeAuthModal();
        }
        navigate('/auth/verify-otp', {
          state: { userId: res.data.userId, type: tab },
        });
      } else {
        setError(res.message || 'Registration failed.');
        toast.error(res.message || 'Registration failed.');
      }
    } catch (err) {
      const msg = err?.data?.message || err?.message || 'Something went wrong.';
      setError(msg);
      toast.error(msg);
    }
  };

  return (
    <div className="w-full">
      <div className="text-center mb-5">
        <h1 className="text-3xl font-semibold text-gray-900 tracking-tight">Sign Up</h1>
      </div>

      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 text-red-600 text-[13px] font-medium p-3 rounded-lg text-center animate-shake">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text" required placeholder="First Name"
              className={inputCls}
              value={formData.first_name} onChange={set('first_name')}
            />
            <input
              type="text" required placeholder="Last Name"
              className={inputCls}
              value={formData.last_name} onChange={set('last_name')}
            />
          </div>

          {tab === 'email' ? (
            <>
              <input
                type="email" required placeholder="Email"
                className={inputCls}
                value={formData.email} onChange={set('email')}
              />
              <input
                type="password" required placeholder="Password"
                className={inputCls}
                value={formData.password} onChange={set('password')}
              />
              <input
                type="password" required placeholder="Confirm Password"
                className={inputCls}
                value={formData.confirm_password} onChange={set('confirm_password')}
              />
            </>
          ) : (
            <input
              type="tel" required placeholder="Mobile Number"
              className={inputCls}
              value={formData.mobile} onChange={set('mobile')}
            />
          )}

          <label className="flex items-start gap-2 cursor-pointer group pt-2">
            <input
              type="checkbox" required
              className="mt-1 w-3.5 h-3.5 accent-[#0B1A4B] rounded shrink-0 border-gray-300"
            />
            <span className="text-[12px] text-gray-500 leading-relaxed">
              I agree to the <span className="text-[#0B1A4B] font-semibold hover:underline">Terms of Service</span> and confirm I am 18+.
            </span>
          </label>
        </div>

        <button
          type="submit" disabled={loading}
          className="w-full py-3 rounded-[12px] bg-[#0B1A4B] text-white font-semibold text-sm transition-all hover:bg-black disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg shadow-blue-900/20 active:scale-95"
        >
          {loading ? <Loader2 className="animate-spin" size={18} /> : (tab === 'email' ? 'Create Account' : 'Send OTP')}
        </button>

      </form>

      <div className="mt-5 text-center">
        <button 
          onClick={() => { setTab(tab === 'email' ? 'mobile' : 'email'); setError(''); }}
          className="text-[12px] font-medium text-[#0B1A4B] hover:underline"
        >
          {tab === 'email' ? 'Sign up with Mobile Number' : 'Sign up with Email'}
        </button>
      </div>

      <div className="mt-8 text-center text-[13px] font-medium text-gray-600">
        Already have an account?{' '}
        {isModal ? (
          <button 
            onClick={() => switchAuthView('login')}
            className="text-[#0B1A4B] font-semibold hover:underline"
          >
            Login
          </button>
        ) : (
          <Link to="/auth/login" className="text-[#0B1A4B] font-semibold hover:underline">
            Login
          </Link>
        )}
      </div>

      <div className="mt-6 flex items-center gap-4">
        <div className="flex-1 h-px bg-gray-200"></div>
        <span className="text-[12px] font-medium text-gray-400 uppercase tracking-widest">Or continue with</span>
        <div className="flex-1 h-px bg-gray-200"></div>
      </div>

      <div className="mt-5 flex flex-col gap-3">
        <a 
          href="http://localhost:5000/auth/google"
          className="w-full flex items-center justify-center gap-3 py-3 border border-gray-200 rounded-[12px] hover:bg-gray-50 transition-colors text-sm font-semibold text-gray-700"
        >
          <img src="https://img.icons8.com/color/48/google-logo.png" alt="Google" className="w-5 h-5" />
          Google
        </a>
        <a 
          href="#"
          className="w-full flex items-center justify-center gap-3 py-3 border border-gray-200 rounded-[12px] hover:bg-[#1877F2]/5 hover:border-[#1877F2]/30 transition-colors text-sm font-semibold text-gray-700 opacity-50 cursor-not-allowed"
        >
          <img src="https://img.icons8.com/color/48/facebook-new.png" alt="Facebook" className="w-5 h-5" />
          Facebook
        </a>
      </div>
    </div>
  );
};

export default Register;
