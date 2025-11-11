'use client';

import React, { useState } from 'react';
import { IoAirplaneSharp, IoMenu, IoClose } from 'react-icons/io5';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // keep exactly the same classes as your original for desktop
  const linkClass = (path) =>
    pathname === path ? "text-[#2563EB]" : "text-[#4B5563]";

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/my-bookings', label: 'My Bookings' },
    { href: '/profile', label: 'Profile' },
    { href: '/admin', label: 'Admin' },
  ];

  return (
    <>
      {/* outer wrapper preserved exactly like your original for md+ */}
      <div className='flex justify-between items-center h-20 px-5'>
        <div className='flex gap-2 items-center'>
          <IoAirplaneSharp
            color='#fff'
            size={20}
            className='p-1 rounded-full bg-[#2563EB]'
          />
          <span className='font-semibold text-lg'>Argo</span>
        </div>

        {/* Desktop links: exactly same layout & classes as you had */}
        <div className='hidden md:flex gap-5 items-center'>
          <Link href="/" className={linkClass("/")}>Home</Link>
          <Link href="/my-bookings" className={linkClass("/my-bookings")}>My Bookings</Link>
          <Link href="/profile" className={linkClass("/profile")}>Profile</Link>
          <Link href="/admin" className={linkClass("/admin")}>Admin</Link>
        </div>

        <div className="rounded-full w-8 h-8 bg-red-300 overflow-hidden hidden md:block">
          <Image
            src="/user.jpg"
            alt="User"
            width={40}
            height={40}
            className="object-cover w-full h-full"
          />
        </div>

        {/* Mobile: hamburger and compact avatar visible on small screens */}
        <div className="flex items-center md:hidden gap-3">
          <div className="rounded-full w-8 h-8 bg-red-300 overflow-hidden block md:hidden">
            <Image
              src="/user.jpg"
              alt="User"
              width={40}
              height={40}
              className="object-cover w-full h-full"
            />
          </div>

          <button
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen(s => !s)}
            className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
          >
            {open ? <IoClose size={22} /> : <IoMenu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown (only for small screens) */}
      <div className={`md:hidden px-5 transition-all duration-200 ease-in-out ${open ? 'max-h-96' : 'max-h-0 overflow-hidden'}`}>
        <div className="flex flex-col gap-2 py-3">
          {navLinks.map(l => (
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
