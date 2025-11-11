import React from 'react'
import { FaFacebook, FaLinkedin, FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import Link from 'next/link';

export default function Footer() {
  return (
    <div className="text-[#4B5563] text-sm flex flex-col px-5 md:px-20 py-10 border-t border-gray-200">
      
      {/* TOP SECTION */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mx-0 md:mx-10 pb-12 gap-10 md:gap-0 border-b border-gray-200">

        {/* LEFT LINKS GROUP */}
        <div className="flex flex-row gap-10">

          <div className="flex flex-col gap-2">
            <div className="text-[#111827] font-semibold">Company</div>
            <Link href="#">About Us</Link>
            <Link href="#">Careers</Link>
            <Link href="#">Contact</Link>
          </div>

          <div className="flex flex-col gap-2">
            <div className="text-[#111827] font-semibold">Resources</div>
            <Link href="#">Help Center</Link>
            <Link href="#">Safety</Link>
            <Link href="#">Guidelines</Link>
          </div>

          <div className="flex flex-col gap-2">
            <div className="text-[#111827] font-semibold">Legal</div>
            <Link href="#">Privacy Policy</Link>
            <Link href="#">Terms of Service</Link>
          </div>
        </div>

        {/* SOCIAL ICONS */}
        <div className="flex gap-4 justify-center md:justify-start">
          <Link href="#"><FaFacebook size={20} /></Link>
          <Link href="#"><FaLinkedin size={20} /></Link>
          <Link href="#"><FaInstagram size={20} /></Link>
          <Link href="#"><FaTwitter size={20} /></Link>
        </div>

      </div>

      {/* BOTTOM COPYRIGHT */}
      <div className="mx-auto pt-10 text-center">
        © 2024 TravelPro. All rights reserved.
      </div>
    </div>
  );
}
