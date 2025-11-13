'use client'
import React, { useState, useEffect } from 'react';
import { IoAirplaneSharp } from "react-icons/io5";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import useAuth from '@/lib/useAuth';


export default function Page() {
  const [viewPassword, setViewPassword] = useState(false);
  const [viewConfirm, setViewConfirm] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const router = useRouter();
  const { user } = useAuth();

    useEffect(() => {
      if (user) router.replace('/');
    }, [user, router]);


  const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

  const resetMessages = () => {
    setError(null);
    setSuccess(null);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    resetMessages();

    if (!name.trim() || !email.trim() || !password) {
      setError("Please fill all required fields.");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      
      await axios.post(`${API_BASE}/auth/register`, {
        name: name.trim(),
        email: email.trim(),
        password,
      });

      setSuccess("Account created successfully!");
      setLoading(false);
      router.push("/login");
    } catch (err) {
      console.error(err);
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
        {/* Icon */}
        <div className="flex justify-center mb-2">
          <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
            <IoAirplaneSharp color='#fff' size={30} />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-2">
          Create Your Account
        </h1>
        <p className="text-sm text-gray-500 text-center mb-4">
          Join us today and get started
        </p>

        {/* messages */}
        {error && <div className="mb-4 text-sm text-red-600 bg-red-100 p-2 rounded">{error}</div>}
        {success && <div className="mb-4 text-sm text-green-700 bg-green-100 p-2 rounded">{success}</div>}

        {/* Form */}
        <form onSubmit={handleSubmit}>

          {/* Full Name */}
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e)=> setName(e.target.value)}
              placeholder="John Doe"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
            />
          </div>

          {/* Email Field */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e)=> setEmail(e.target.value)}
              placeholder="john.doe@example.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
            />
          </div>

          {/* Password Field */}
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={viewPassword ? 'text' : 'password'}
                id="password"
                value={password}
                onChange={(e)=> setPassword(e.target.value)}
                placeholder="Choose a strong password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition pr-10"
              />
              <button
                type="button"
                onClick={() => setViewPassword(v => !v)}
                className="absolute right-2 top-2/4 -translate-y-2/4 text-gray-500 text-lg"
                aria-label={viewPassword ? 'Hide password' : 'Show password'}
              >
                {viewPassword ? <FaRegEyeSlash /> : <FaRegEye />}
              </button>
            </div>
            <div className='text-xs text-gray-500 mt-1'>Password must be at least 8 characters long.</div>
          </div>

          {/* Confirm Password Field */}
          <div className="mb-6">
            <label htmlFor="ConfirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={viewConfirm ? 'text' : 'password'}
                id="ConfirmPassword"
                value={confirmPassword}
                onChange={(e)=> setConfirmPassword(e.target.value)}
                placeholder="Re-enter your password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition pr-10"
              />
              <button
                type="button"
                onClick={() => setViewConfirm(v => !v)}
                className="absolute right-2 top-2/4 -translate-y-2/4 text-gray-500 text-lg"
                aria-label={viewConfirm ? 'Hide password' : 'Show password'}
              >
                {viewConfirm ? <FaRegEyeSlash /> : <FaRegEye />}
              </button>
            </div>
          </div>

          {/* Sign Up Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {loading ? 'Creating account...' : 'Sign Up'}
          </button>
        </form>

        {/* Sign In Link */}
        <div className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-600 hover:text-blue-800 font-medium">
            Log In
          </Link>
        </div>
      </div>
    </div>
  );
}
