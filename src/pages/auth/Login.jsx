import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { useLoginMutation } from '../../services/authService';
import { toast } from 'react-hot-toast';

const inputCls = `
  block w-full py-3 bg-transparent border-0 border-b-2 border-gray-300
  focus:ring-0 focus:border-[#0B1A4B] transition-colors text-[15px] font-medium text-gray-900
  placeholder:text-gray-400 outline-none px-1
`;

const Login = () => {
  const [tab, setTab] = useState('email');
  const [formData, setFormData] = useState({ email: '', mobile: '', password: '' });
  const [loginMutation, { isLoading: loading }] = useLoginMutation();
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const payload = tab === 'email' 
        ? { email: formData.email, password: formData.password } 
        : { mobile: formData.mobile };

      const res = await loginMutation(payload).unwrap();
      if (res.status) {
        if (res.data?.userId) {
          toast.success(`OTP sent to your ${tab === 'email' ? 'email' : 'mobile'}!`);
          navigate('/auth/verify-otp', { state: { userId: res.data.userId, type: tab } });
        } else {
          toast.success('Login Successful!');
          localStorage.setItem('user', JSON.stringify(res.data?.user || res.data));
          if (res.data?.token) localStorage.setItem('token', res.data.token);
          window.dispatchEvent(new Event('auth-change'));
          navigate('/');
        }
      } else {
        setError(res.message || 'Authentication failed.');
        toast.error(res.message || 'Login failed.');
      }
    } catch (err) {
      const msg = err?.data?.message || err?.message || 'Something went wrong.';
      setError(msg);
      toast.error(msg);
    }
  };

  return (
    <div className="w-full">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-semibold text-gray-900 tracking-tight">Login</h1>
      </div>

      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 text-red-600 text-[13px] font-medium p-3 rounded-lg text-center">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        
        <div className="space-y-6">
          {tab === 'email' ? (
            <>
              <div>
                <input
                  type="email"
                  required
                  placeholder="Email"
                  className={inputCls}
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div className="relative">
                <input
                  type="password"
                  required
                  placeholder="Password"
                  className={inputCls}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <Link
                  to="/auth/forgot-password"
                  className="absolute right-0 top-3 text-[12px] font-semibold text-[#0B1A4B] hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
            </>
          ) : (
            <div>
              <input
                type="tel"
                required
                placeholder="Mobile Number"
                className={inputCls}
                value={formData.mobile}
                onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
              />
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3.5 rounded-[12px] bg-[#0B1A4B] text-white font-semibold text-sm transition-all hover:bg-black disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {loading ? <Loader2 className="animate-spin" size={18} /> : (tab === 'email' ? 'Login' : 'Send OTP')}
        </button>

      </form>

      <div className="mt-5 text-center">
        <button 
          onClick={() => { setTab(tab === 'email' ? 'mobile' : 'email'); setError(''); }}
          className="text-[12px] font-medium text-[#0B1A4B] hover:underline"
        >
          {tab === 'email' ? 'Login with Mobile Number' : 'Login with Email'}
        </button>
      </div>

      <div className="mt-8 text-center text-[13px] font-medium text-gray-600">
        Don't have an account?{' '}
        <Link to="/auth/register" className="text-[#0B1A4B] font-semibold hover:underline">
          Sign up
        </Link>
      </div>

      <div className="mt-8 flex items-center gap-4">
        <div className="flex-1 h-px bg-gray-200"></div>
        <span className="text-[12px] font-medium text-gray-400">Or continue with</span>
        <div className="flex-1 h-px bg-gray-200"></div>
      </div>

      <div className="mt-6 flex flex-col gap-3">
        <a 
          href="http://localhost:5000/auth/google"
          className="w-full flex items-center justify-center gap-3 py-3 border border-gray-200 rounded-[12px] hover:bg-gray-50 transition-colors text-sm font-semibold text-gray-700"
        >
          <img src="https://img.icons8.com/color/48/google-logo.png" alt="Google" className="w-5 h-5" />
          Google
        </a>
        <a 
          href="#"
          className="w-full flex items-center justify-center gap-3 py-3 border border-gray-200 rounded-[12px] hover:bg-[#1877F2]/5 hover:border-[#1877F2]/30 transition-colors text-sm font-semibold text-gray-700"
        >
          <img src="https://img.icons8.com/color/48/facebook-new.png" alt="Facebook" className="w-5 h-5" />
          Facebook
        </a>
      </div>
    </div>
  );
};

export default Login;
