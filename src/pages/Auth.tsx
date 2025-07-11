import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { signInWithPopup, signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider } from 'firebase/auth';
import { auth, provider } from '../lib/firebase';

const Auth: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    setError('');
    setIsLoading(true);
    try {
      await signInWithPopup(auth, provider);
    } catch (err: any) {
      setError(err.message || 'Google sign-in failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      if (email && password) {
        if (isLogin) {
          await signInWithEmailAndPassword(auth, email, password);
        } else {
          await createUserWithEmailAndPassword(auth, email, password);
        }
      } else {
        throw new Error('Please enter both email and password');
      }
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-600 to-secondary-600 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-xl border border-white/20">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center w-12 h-12 bg-white/20 rounded-xl mx-auto mb-4">
              <div className="text-2xl font-bold text-white">E</div>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">
              {isLogin ? 'Welcome back!' : 'Create your account'}
            </h2>
            <p className="text-white/80">
              {isLogin
                ? 'Log in to access your journal'
                : 'Start your journaling journey today'}
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-error-500/10 border border-error-500/20 rounded-xl text-white flex items-center gap-2">
              <AlertCircle size={18} />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-white/60" size={20} />
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-xl px-10 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30"
                required
                disabled={isLoading}
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-white/60" size={20} />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-xl px-10 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30"
                required
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-white text-primary-600 rounded-xl py-3 font-semibold hover:bg-white/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
                  <span>Please wait...</span>
                </div>
              ) : (
                isLogin ? 'Log in' : 'Sign up'
              )}
            </button>
          </form>

          <div className="mt-4 flex flex-col items-center gap-2">
            <button
              onClick={handleGoogleSignIn}
              className="w-full flex items-center justify-center gap-2 bg-white text-primary-600 rounded-xl py-3 font-semibold hover:bg-white/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              <svg width="20" height="20" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_17_40)">
                  <path d="M47.5 24.5C47.5 22.6 47.3 20.8 47 19H24.5V29H37.4C36.8 32.1 34.7 34.7 31.7 36.3V42H39.3C44 38.1 47.5 32 47.5 24.5Z" fill="#4285F4"/>
                  <path d="M24.5 48C31.1 48 36.7 45.8 39.3 42L31.7 36.3C30.3 37.2 28.5 37.8 26.5 37.8C20.2 37.8 14.9 33.7 13.1 28.1H5.3V33.1C8.9 40.1 16.1 45.1 24.5 48Z" fill="#34A853"/>
                  <path d="M13.1 28.1C12.6 26.2 12.3 24.2 12.3 22C12.3 19.8 12.6 17.8 13.1 15.9V10.9H5.3C3.2 14.9 2 19.3 2 24C2 28.7 3.2 33.1 5.3 37.1L13.1 28.1Z" fill="#FBBC05"/>
                  <path d="M24.5 9.2C27.2 9.2 29.6 10.1 31.5 11.9L39.4 4C36.7 1.5 31.1 0 24.5 0C16.1 0 8.9 4.9 5.3 10.9L13.1 15.9C14.9 10.3 20.2 6.2 26.5 6.2C28.5 6.2 30.3 6.8 31.7 7.7L39.3 2C36.7 -1.8 31.1 -4 24.5 -4C16.1 -4 8.9 0.9 5.3 6.9L13.1 11.9C14.9 6.3 20.2 2.2 26.5 2.2C28.5 2.2 30.3 2.8 31.7 3.7L39.3 -2C36.7 -5.8 31.1 -8 24.5 -8C16.1 -8 8.9 -3.1 5.3 2.9L13.1 7.9C14.9 2.3 20.2 -1.8 26.5 -1.8C28.5 -1.8 30.3 -1.2 31.7 -0.3L39.3 -6C36.7 -9.8 31.1 -12 24.5 -12C16.1 -12 8.9 -7.1 5.3 -1.1L13.1 3.9C14.9 -1.7 20.2 -5.8 26.5 -5.8C28.5 -5.8 30.3 -5.2 31.7 -4.3L39.3 -10C36.7 -13.8 31.1 -16 24.5 -16C16.1 -16 8.9 -11.1 5.3 -5.1L13.1 -0.1C14.9 -5.7 20.2 -9.8 26.5 -9.8C28.5 -9.8 30.3 -9.2 31.7 -8.3L39.3 -14C36.7 -17.8 31.1 -20 24.5 -20C16.1 -20 8.9 -15.1 5.3 -9.1L13.1 -4.1C14.9 -9.7 20.2 -13.8 26.5 -13.8C28.5 -13.8 30.3 -13.2 31.7 -12.3L39.3 -18C36.7 -21.8 31.1 -24 24.5 -24C16.1 -24 8.9 -19.1 5.3 -13.1L13.1 -8.1C14.9 -13.7 20.2 -17.8 26.5 -17.8C28.5 -17.8 30.3 -17.2 31.7 -16.3L39.3 -22C36.7 -25.8 31.1 -28 24.5 -28C16.1 -28 8.9 -23.1 5.3 -17.1L13.1 -12.1C14.9 -17.7 20.2 -21.8 26.5 -21.8C28.5 -21.8 30.3 -21.2 31.7 -20.3L39.3 -26C36.7 -29.8 31.1 -32 24.5 -32C16.1 -32 8.9 -27.1 5.3 -21.1L13.1 -16.1C14.9 -21.7 20.2 -25.8 26.5 -25.8C28.5 -25.8 30.3 -25.2 31.7 -24.3L39.3 -30C36.7 -33.8 31.1 -36 24.5 -36C16.1 -36 8.9 -31.1 5.3 -25.1L13.1 -20.1C14.9 -25.7 20.2 -29.8 26.5 -29.8C28.5 -29.8 30.3 -29.2 31.7 -28.3L39.3 -34C36.7 -37.8 31.1 -40 24.5 -40C16.1 -40 8.9 -35.1 5.3 -29.1L13.1 -24.1C14.9 -29.7 20.2 -33.8 26.5 -33.8C28.5 -33.8 30.3 -33.2 31.7 -32.3L39.3 -38C36.7 -41.8 31.1 -44 24.5 -44C16.1 -44 8.9 -39.1 5.3 -33.1L13.1 -28.1Z" fill="#EA4335"/>
                </g>
                <defs>
                  <clipPath id="clip0_17_40">
                    <rect width="48" height="48" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              Sign in with Google
            </button>
          </div>

          <div className="mt-6 text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-white/80 hover:text-white text-sm"
              disabled={isLoading}
            >
              {isLogin
                ? "Don't have an account? Sign up"
                : 'Already have an account? Log in'}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Auth;