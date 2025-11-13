'use client'
import React, { useState, useEffect } from 'react';
import { IoAirplaneSharp } from "react-icons/io5";
import { MdOutlineMailOutline } from "react-icons/md";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import useAuth from '@/lib/useAuth';


export default function Page() {
  const [view, setView] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const router = useRouter();
  const { user } = useAuth();

    useEffect(() => {
      if (user) router.replace('/');
    }, [user, router]);
  

  const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!email.trim() || !password) {
      setError('Please enter email and password.');
      return;
    }

    setLoading(true);
    try {
      const { data } = await axios.post(`${API_BASE}/auth/login`, {
        email: email.trim(),
        password,
      });

      const { token, user } = data;

      if (token) {
        try {
          localStorage.setItem('token', token);
          if (user) localStorage.setItem('user', JSON.stringify(user));
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        } catch (err) {
          console.warn('Storage error:', err);
        }
      }

      router.push('/');
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'Login failed';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
            <IoAirplaneSharp color='#fff' size={30} />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-2">
          Log In to Journey Booking Platform
        </h1>
        <div className="text-sm text-gray-500 text-center mb-8">
          <p>Welcome back! Please enter your</p>
          <p>credentials to continue.</p>
        </div>

        {/* Error banner - matches signup style (no layout change) */}
        {error && (
          <div className="mb-4 text-sm text-red-600 bg-red-100 p-2 rounded">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* Email Field */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <div className="relative">
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e)=> setEmail(e.target.value)}
                placeholder="Johnsmith234@gmail.com"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
                <MdOutlineMailOutline />
              </div>
            </div>
          </div>

          {/* Password Field */}
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={view ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e)=> setPassword(e.target.value)}
                placeholder="23546887"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              />
              <button
                type="button"
                onClick={() => setView(v => !v)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                aria-label={view ? 'Hide password' : 'Show password'}
              >
                {view ? <FaRegEyeSlash /> : <FaRegEye />}
              </button>
            </div>
          </div>

          {/* Forgot Password */}
          <div className="text-right mb-6">
            <a href="#" onClick={(e)=> e.preventDefault()} className="text-sm text-blue-600 hover:text-blue-800">
              Forgot password?
            </a>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
            disabled={loading}
          >
            {loading ? 'Signing in...' : 'Log In'}
          </button>
        </form>

        {/* Sign Up Link */}
        <div className="mt-6 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link href="/signup" className="text-blue-600 hover:text-blue-800 font-medium">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}
