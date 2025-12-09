import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, ArrowRight, Shield } from 'lucide-react';
import axios from 'axios';
import { useToast } from '../components/Toast';

export default function AdminLogin() {
    const navigate = useNavigate();
    const { toast } = useToast();
    const [step, setStep] = useState('email'); // 'email' or 'otp'
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [loading, setLoading] = useState(false);
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

    const handleRequestOTP = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axios.post(`${API_URL}/api/auth/request-otp`, { email });

            if (response.data.success) {
                toast.success('OTP sent to your email!');
                setStep('otp');
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to send OTP');
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyOTP = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axios.post(`${API_URL}/api/auth/verify-otp`, { email, otp });

            if (response.data.success) {
                // Store token
                localStorage.setItem('adminToken', response.data.token);
                toast.success('Login successful!');
                navigate('/pasan100323/dashboard');
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Invalid OTP');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-zinc-50 to-zinc-100 dark:from-zinc-950 dark:to-zinc-900 flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md"
            >
                <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl p-8 border border-zinc-200 dark:border-zinc-800">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-sky-500/10 rounded-full mb-4">
                            <Shield className="w-8 h-8 text-sky-500" />
                        </div>
                        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                            Admin Portal
                        </h1>
                        <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2">
                            {step === 'email' ? 'Enter your email to receive OTP' : 'Enter the OTP sent to your email'}
                        </p>
                    </div>

                    {/* Email Step */}
                    {step === 'email' && (
                        <form onSubmit={handleRequestOTP} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                                    Admin Email
                                </label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full pl-10 pr-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-sky-500 focus:border-transparent outline-none transition-all"
                                        placeholder="admin@example.com"
                                        required
                                    />
                                </div>
                            </div>

                            <motion.button
                                type="submit"
                                disabled={loading}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full bg-sky-500 hover:bg-sky-600 text-white font-medium py-3 rounded-lg flex items-center justify-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? (
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                ) : (
                                    <>
                                        Send OTP
                                        <ArrowRight className="w-5 h-5" />
                                    </>
                                )}
                            </motion.button>
                        </form>
                    )}

                    {/* OTP Step */}
                    {step === 'otp' && (
                        <form onSubmit={handleVerifyOTP} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                                    One-Time Password
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
                                    <input
                                        type="text"
                                        value={otp}
                                        onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                                        className="w-full pl-10 pr-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-sky-500 focus:border-transparent outline-none transition-all text-center text-2xl tracking-widest font-mono"
                                        placeholder="000000"
                                        maxLength={6}
                                        required
                                    />
                                </div>
                                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-2 text-center">
                                    Code expires in 10 minutes
                                </p>
                            </div>

                            <motion.button
                                type="submit"
                                disabled={loading || otp.length !== 6}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full bg-sky-500 hover:bg-sky-600 text-white font-medium py-3 rounded-lg flex items-center justify-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? (
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                ) : (
                                    <>
                                        Verify & Login
                                        <ArrowRight className="w-5 h-5" />
                                    </>
                                )}
                            </motion.button>

                            <button
                                type="button"
                                onClick={() => setStep('email')}
                                className="w-full text-sm text-zinc-600 dark:text-zinc-400 hover:text-sky-500 transition-colors"
                            >
                                ← Back to email
                            </button>
                        </form>
                    )}
                </div>

                <p className="text-center text-xs text-zinc-500 dark:text-zinc-400 mt-4">
                    Secure admin access with one-time password authentication
                </p>
            </motion.div>
        </div>
    );
}
