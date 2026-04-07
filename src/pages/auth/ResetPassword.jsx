import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, Loader2, ShieldCheck } from 'lucide-react';
import { useResetPasswordMutation } from '../../services/authService';
import { toast } from 'react-hot-toast';

const inputCls = `
  block w-full py-3 bg-transparent border-0 border-b-2 border-gray-300
  focus:ring-0 focus:border-[#0B1A4B] transition-colors text-[15px] font-medium text-gray-900
  placeholder:text-gray-400 outline-none px-1
`;

const ResetPassword = () => {
  const [formData, setFormData] = useState({ password: '', confirm_password: '' });
  const [resetPasswordMutation, { isLoading: loading }] = useResetPasswordMutation();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const token = location.state?.token || new URLSearchParams(location.search).get('token');

  useEffect(() => { if (!token) navigate('/auth/login'); }, [token, navigate]);

  const set = (k) => (e) => setFormData({ ...formData, [k]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (formData.password !== formData.confirm_password) {
      setError('Passwords do not match');
      return;
    }
    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }
    try {
      const res = await resetPasswordMutation({ body: formData, token }).unwrap();
      if (res.status) {
        toast.success('Password reset successfully!');
        setSuccess(true);
        setTimeout(() => navigate('/auth/login'), 2500);
      } else {
        setError(res.message || 'Reset failed.');
        toast.error(res.message || 'Reset failed.');
      }
    } catch (err) {
      const msg = err?.data?.message || err?.message || 'Something went wrong.';
      setError(msg);
      toast.error(msg);
    }
  };

  if (success) {
    return (
      <div className="w-full text-center py-6 space-y-6">
        <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle2 className="text-green-500" size={32} />
        </div>
        <h2 className="text-3xl font-semibold text-gray-900">Password Updated!</h2>
        <p className="text-gray-500 text-sm">
          Your password has been reset successfully.<br />Redirecting to sign in…
        </p>
        <div className="pt-4 flex justify-center">
          <Loader2 className="animate-spin text-[#0B1A4B]" size={28} />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-semibold text-gray-900 tracking-tight">New Password</h1>
      </div>

      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 text-red-600 text-[13px] font-medium p-3 rounded-lg text-center">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="space-y-6">
          <input
            type="password"
            required
            placeholder="New Password (min 8 chars)"
            className={inputCls}
            value={formData.password}
            onChange={set('password')}
          />
          <input
            type="password"
            required
            placeholder="Confirm Password"
            className={inputCls}
            value={formData.confirm_password}
            onChange={set('confirm_password')}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3.5 rounded-[12px] bg-[#0B1A4B] text-white font-semibold text-sm transition-all hover:bg-black disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {loading ? <Loader2 className="animate-spin" size={18} /> : 'Reset Password'}
        </button>
      </form>

      <div className="mt-8 text-center text-[13px] font-medium text-gray-600">
        <Link to="/auth/login" className="text-[#0B1A4B] font-semibold hover:underline flex items-center justify-center gap-1">
          <ArrowLeft size={14} /> Back to Sign In
        </Link>
      </div>
    </div>
  );
};

export default ResetPassword;
