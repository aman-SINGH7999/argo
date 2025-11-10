'use client';

import React from 'react'
import { IoAirplaneSharp } from "react-icons/io5";
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function Navbar() {

  const pathname = usePathname();

  const linkClass = (path) =>
    pathname === path
      ? "text-[#2563EB]"
      : "text-[#4B5563]";

  return (
    <div className='flex justify-between items-center h-20 px-5'>
      
      <div className='flex gap-2 items-center'>
        <IoAirplaneSharp
          color='#fff'
          size={20}
          className='p-1 rounded-full bg-[#2563EB]'
        />
        <span className='font-semibold text-lg'>Argo</span>
      </div>

      <div className='flex gap-5 items-center'>
        <Link href="/" className={linkClass("/")}>Home</Link>
        <Link href="/my-bookings" className={linkClass("/my-bookings")}>My Bookings</Link>
        <Link href="/profile" className={linkClass("/profile")}>Profile</Link>
        <Link href="/admin" className={linkClass("/admin")}>Admin</Link>
      </div>

      <div className="rounded-full w-8 h-8 bg-red-300 overflow-hidden">
        <Image
          src="/user.jpg"
          alt="User"
          width={40}
          height={40}
          className="object-cover w-full h-full"
        />
      </div>

    </div>
  )
}
