import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, Loader2 } from 'lucide-react';
import { useForgotPasswordMutation } from '../../services/authService';
import { toast } from 'react-hot-toast';

const inputCls = `
  block w-full py-3 bg-transparent border-0 border-b-2 border-gray-300
  focus:ring-0 focus:border-[#0B1A4B] transition-colors text-[15px] font-medium text-gray-900
  placeholder:text-gray-400 outline-none px-1
`;

const ForgetPassword = () => {
  const [tab, setTab] = useState('email');
  const [value, setValue] = useState('');
  const [forgotPasswordMutation, { isLoading: loading }] = useForgotPasswordMutation();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const payload = tab === 'email' ? { email: value } : { mobile: value };
      const res = await forgotPasswordMutation(payload).unwrap();
      if (res.status) {
        if (tab === 'email') {
          toast.success('Reset link sent to your email!');
          setSuccess(true);
        } else {
          toast.success('OTP dispatched to your mobile!');
          if (res.data?.userId) {
            navigate('/auth/verify-otp', {
              state: { userId: res.data.userId, type: 'mobile', intent: 'reset-password' },
            });
          }
        }
      } else {
        setError(res.message || 'Verification failed.');
        toast.error(res.message || 'Failed to send reset link.');
      }
    } catch (err) {
      const msg = err?.data?.message || err?.message || 'Something went wrong.';
      setError(msg);
      toast.error(msg);
    }
  };

  /* ── Email Success State ─────────────────────────────────── */
  if (success && tab === 'email') {
    return (
      <div className="w-full text-center py-6 space-y-6">
        <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle2 className="text-green-500" size={32} />
        </div>
        <h2 className="text-3xl font-semibold text-gray-900">Link Sent!</h2>
        <p className="text-gray-500 text-sm">
          A secure reset link was sent to: <span className="text-gray-900 font-semibold">{value}</span>
        </p>
        <div className="pt-4">
          <Link
            to="/auth/login"
            className="text-[#0B1A4B] text-sm font-semibold hover:underline flex items-center justify-center gap-2"
          >
            <ArrowLeft size={16} /> Back to Sign In
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-semibold text-gray-900 tracking-tight">Recover Access</h1>
      </div>

      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 text-red-600 text-[13px] font-medium p-3 rounded-lg text-center">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        
        <div className="space-y-6">
          <p className="text-xs text-gray-500 text-center">
            {tab === 'email'
                ? 'We\'ll send a secure reset link to your registered email address.'
                : 'We\'ll send an OTP to your registered mobile number to verify your identity.'}
          </p>

          {tab === 'email' ? (
            <input
              type="email" required
              placeholder="Email"
              className={inputCls}
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          ) : (
            <input
              type="tel" required
              placeholder="Mobile Number"
              className={inputCls}
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          )}
        </div>

        <button
          type="submit" disabled={loading}
          className="w-full py-3.5 rounded-[12px] bg-[#0B1A4B] text-white font-semibold text-sm transition-all hover:bg-black disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {loading ? <Loader2 className="animate-spin" size={18} /> : (tab === 'email' ? 'Send Reset Link' : 'Send OTP')}
        </button>
      </form>

      <div className="mt-5 text-center">
        <button 
          onClick={() => { setTab(tab === 'email' ? 'mobile' : 'email'); setError(''); }}
          className="text-[12px] font-medium text-[#0B1A4B] hover:underline"
        >
          {tab === 'email' ? 'Use Mobile Number' : 'Use Email'}
        </button>
      </div>

      <div className="mt-8 text-center text-[13px] font-medium text-gray-600">
        <Link to="/auth/login" className="text-[#0B1A4B] font-semibold hover:underline flex items-center justify-center gap-1">
          <ArrowLeft size={14} /> Back to Sign In
        </Link>
      </div>
    </div>
  );
};

export default ForgetPassword;
