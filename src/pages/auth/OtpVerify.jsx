import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { Loader2, ArrowLeft } from 'lucide-react';
import { useVerifyMutation } from '../../services/authService';
import { toast } from 'react-hot-toast';

const OtpVerify = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [verifyMutation, { isLoading: loading }] = useVerifyMutation();
  const [error, setError] = useState('');
  const [timer, setTimer] = useState(60);
  const [resending, setResending] = useState(false);
  const inputRefs = useRef([]);
  const location = useLocation();
  const navigate = useNavigate();

  const { userId: stateUserId, type: stateType, intent } = location.state || {};
  const [userId, setUserId] = useState(stateUserId || localStorage.getItem('pending_verify_id'));
  const [type, setType] = useState(stateType || localStorage.getItem('pending_verify_type') || 'email');
  const isResetFlow = intent === 'reset-password';

  useEffect(() => {
    if (stateUserId) {
      localStorage.setItem('pending_verify_id', stateUserId);
      localStorage.setItem('pending_verify_type', stateType);
    }
    if (!userId) {
      navigate('/auth/login');
    }
    inputRefs.current[0]?.focus();
  }, [userId, stateUserId, stateType, navigate]);

  useEffect(() => {
    if (timer <= 0) return;
    const interval = setInterval(() => setTimer((p) => (p > 0 ? p - 1 : 0)), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const handleChange = (idx, val) => {
    if (!/^\d*$/.test(val)) return;
    const next = [...otp];
    next[idx] = val.slice(-1);
    setOtp(next);
    setError('');
    if (val && idx < 5) inputRefs.current[idx + 1]?.focus();
  };

  const handleKeyDown = (idx, e) => {
    if (e.key === 'Backspace' && !otp[idx] && idx > 0) {
      inputRefs.current[idx - 1]?.focus();
    }
    if (e.key === 'ArrowLeft' && idx > 0) inputRefs.current[idx - 1]?.focus();
    if (e.key === 'ArrowRight' && idx < 5) inputRefs.current[idx + 1]?.focus();
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (pasted) {
      const next = [...pasted.split(''), ...Array(6).fill('')].slice(0, 6);
      setOtp(next);
      inputRefs.current[Math.min(pasted.length, 5)]?.focus();
    }
  };

  const handleResend = () => {
    setResending(true);
    setTimer(60);
    setOtp(['', '', '', '', '', '']);
    inputRefs.current[0]?.focus();
    toast.success('New OTP dispatched!');
    setTimeout(() => setResending(false), 1000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const code = otp.join('');
    if (code.length < 6) {
      setError('Please enter all 6 digits');
      return;
    }
    try {
      const res = await verifyMutation({ userId, otp: code, type }).unwrap();
      if (res.status) {
        if (res.data?.user) localStorage.setItem('user', JSON.stringify(res.data.user));
        if (res.data?.token) localStorage.setItem('token', res.data.token);
        if (isResetFlow) {
          toast.success('Identity verified! Set your new password.');
          navigate('/auth/reset-password', { state: { token: res.data?.token } });
        } else {
          toast.success('Welcome to WingTrip!');
          window.dispatchEvent(new Event('auth-change'));
          navigate('/');
        }
      } else {
        setError(res.message || 'Invalid OTP. Please try again.');
        setOtp(['', '', '', '', '', '']);
        inputRefs.current[0]?.focus();
      }
    } catch (err) {
      const msg = err?.data?.message || err?.message || 'Verification failed.';
      setError(msg);
      toast.error(msg);
      setOtp(['', '', '', '', '', '']);
      inputRefs.current[0]?.focus();
    }
  };

  const isFilled = otp.every((d) => d !== '');
  const timerDisplay = `${Math.floor(timer / 60)}:${String(timer % 60).padStart(2, '0')}`;

  return (
    <div className="w-full">
      <div className="text-center mb-6">
        <h1 className="text-4xl font-semibold text-gray-900 tracking-tight">Enter OTP</h1>
      </div>

      <div className="text-center mb-8">
        <p className="text-sm text-gray-600">
          6-digit code sent to your {type === 'email' ? 'email' : 'mobile number'}
        </p>
      </div>

      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 text-red-600 text-[13px] font-medium p-3 rounded-lg text-center">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="flex justify-center gap-3" onPaste={handlePaste}>
          {otp.map((digit, idx) => (
            <input
              key={idx}
              ref={(el) => (inputRefs.current[idx] = el)}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(idx, e.target.value)}
              onKeyDown={(e) => handleKeyDown(idx, e)}
              className="w-14 h-16 text-center text-2xl font-semibold bg-transparent border-0 border-b-2 border-gray-300 focus:ring-0 focus:border-[#0B1A4B] transition-colors"
            />
          ))}
        </div>

        <button
          type="submit"
          disabled={loading || !isFilled}
          className="w-full py-3.5 rounded-[12px] bg-[#0B1A4B] text-white font-semibold text-sm transition-all hover:bg-black disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {loading ? <Loader2 className="animate-spin" size={18} /> : 'Verify'}
        </button>

        <div className="text-center mt-4">
          <button
            type="button"
            disabled={timer > 0 || resending}
            onClick={handleResend}
            className={`text-[12px] font-medium ${timer > 0 ? 'text-gray-400' : 'text-[#0B1A4B] hover:underline'}`}
          >
            {timer > 0 ? `Resend in ${timerDisplay}` : 'Resend OTP'}
          </button>
        </div>
      </form>

      <div className="mt-8 text-center text-[13px] font-medium text-gray-600">
        <Link to="/auth/login" className="text-[#0B1A4B] font-semibold hover:underline flex items-center justify-center gap-1">
          <ArrowLeft size={14} /> Back to Sign In
        </Link>
      </div>
    </div>
  );
};

export default OtpVerify;
