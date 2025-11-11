'use client'
import React, { useState } from 'react';
import { IoAirplaneSharp } from "react-icons/io5";
import { MdOutlineMailOutline } from "react-icons/md";
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa6";
import Link from 'next/link';

export default function Page() {
  const [view, setView] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
        <p className="text-sm text-gray-500 text-center mb-8">
          <p>Welcome back! Please enter your</p> 
          <p>credentials to continue.</p>
        </p>

        {/* Form */}
        <form>
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
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
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
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer">
                {
                  view ? <FaRegEye onClick={()=> setView(!view)} /> : <FaRegEyeSlash onClick={()=> setView(!view)} />
                }
              </div>
            </div>
          </div>

          {/* Forgot Password */}
          <div className="text-right mb-6">
            <a href="#" className="text-sm text-blue-600 hover:text-blue-800">
              Forgot password?
            </a>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
          >
            Log In
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