import React from 'react'
import { FaFacebook } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import { FaTwitter } from "react-icons/fa";
import Link from 'next/link';

export default function Footer() {
  return (
    <div className='text-[#4B5563] text-sm flex flex-col p-10 border-t border-gray-300 '>
        <div className='flex justify-between items-center mx-10 pb-12 border-b border-gray-300'>
            <div className='flex gap-10'>
                <div className='flex flex-col gap-2'>
                    <div className='text-[#111827] font-semibold'>Company</div>
                    <Link href={'#'} >About Us</Link>
                    <Link href={'#'} >Careers</Link>
                    <Link href={'#'} >Contact</Link>
                </div>
                <div className='flex flex-col gap-2'>
                    <div className='text-[#111827] font-semibold'>Resources</div>
                    <Link href={'#'} >Help Center</Link>
                    <Link href={'#'} >Safety</Link>
                    <Link href={'#'} >Guidelines</Link>
                </div>
                <div className='flex flex-col gap-2'>
                    <div className='text-[#111827] font-semibold'>Legal</div>
                    <Link href={'#'} >Privacy Policy</Link>
                    <Link href={'#'} >Terms of Service</Link>
                </div>
            </div>
            <div className='flex gap-3'>
                <Link href={'#'}><FaFacebook size={20} /></Link>
                <Link href={'#'}><FaLinkedin size={20} /></Link>
                <Link href={'#'}><FaInstagram size={20} /></Link>
                <Link href={'#'}><FaTwitter size={20} /></Link>
            </div>
        </div>
        <div className='mx-auto py-10'>© 2024 TravelPro. All rights reserved.</div>
    </div>
  )
}
