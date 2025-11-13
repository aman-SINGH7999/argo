'use client';

import React, { useState, useRef, useEffect } from 'react';
import { IoAirplaneSharp, IoMenu, IoClose } from 'react-icons/io5';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import axios from 'axios'; 

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  
  const desktopMenuRef = useRef(null);
  const mobileMenuRef = useRef(null);

  const linkClass = (path) =>
    pathname === path ? 'text-[#2563EB]' : 'text-[#4B5563]';

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/my-bookings', label: 'My Bookings' },
    { href: '/profile', label: 'Profile' },
    { href: '/admin', label: 'Admin' },
  ];

  // logout handler
  const handleLogout = async () => {
    console.log('handleLogout called');
    
    setMenuOpen(false);

    try {
      localStorage.removeItem('token');
      localStorage.removeItem('user');

      // clear axios default auth header
      if (axios.defaults.headers.common['Authorization']) {
        delete axios.defaults.headers.common['Authorization'];
      }

      toast.success('Logged out successfully');

      router.replace('/login');

    } catch (err) {
      console.error('Logout failed:', err);
      toast.error('Logout failed. Try again.');
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      const desktopContains = desktopMenuRef.current?.contains(e.target);
      const mobileContains = mobileMenuRef.current?.contains(e.target);
      if (!desktopContains && !mobileContains) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      {/* Top Navbar */}
      <div className="flex justify-between items-center h-20 px-5 relative">
        <div className="flex gap-2 items-center">
          <IoAirplaneSharp
            color="#fff"
            size={20}
            className="p-1 rounded-full bg-[#2563EB]"
          />
          <span className="font-semibold text-lg">Argo</span>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-5 items-center">
          {navLinks.map((l) => (
            <Link key={l.href} href={l.href} className={linkClass(l.href)}>
              {l.label}
            </Link>
          ))}
        </div>

        {/* Profile Dropdown (Desktop) */}
        <div className="relative hidden md:block" ref={desktopMenuRef}>
          <div
            className="rounded-full w-8 h-8 bg-red-300 overflow-hidden cursor-pointer"
            onClick={() => setMenuOpen((p) => !p)}
          >
            <Image
              src="/user.jpg"
              alt="User"
              width={40}
              height={40}
              className="object-cover w-full h-full"
            />
          </div>

          {menuOpen && (
            <div className="absolute right-0 mt-2 w-36 bg-white shadow-lg rounded-xl border border-gray-100 py-2 z-50">
              <Link
                href="/profile"
                onClick={() => setMenuOpen(false)}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Profile
              </Link>
              <button
                type="button"               // <-- important
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          )}
        </div>

        {/* Mobile avatar + menu button */}
        <div className="flex items-center md:hidden gap-3">
          <div className="relative" ref={mobileMenuRef}>
            <div
              className="rounded-full w-8 h-8 bg-red-300 overflow-hidden cursor-pointer"
              onClick={() => setMenuOpen((p) => !p)}
            >
              <Image
                src="/user.jpg"
                alt="User"
                width={40}
                height={40}
                className="object-cover w-full h-full"
              />
            </div>

            {menuOpen && (
              <div className="absolute right-0 mt-2 w-36 bg-white shadow-lg rounded-xl border border-gray-100 py-2 z-50">
                <Link
                  href="/profile"
                  onClick={() => setMenuOpen(false)}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Profile
                </Link>
                <button
                  type="button"               // <-- important
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>

          <button
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((s) => !s)}
            className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
          >
            {open ? <IoClose size={22} /> : <IoMenu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Links */}
      <div
        className={`md:hidden px-5 transition-all duration-200 ease-in-out ${
          open ? 'max-h-96' : 'max-h-0 overflow-hidden'
        }`}
      >
        <div className="flex flex-col gap-2 py-3">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`${linkClass(l.href)} block`}
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
