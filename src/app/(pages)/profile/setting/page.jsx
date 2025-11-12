// app/components/AccountSettings.js
'use client';

import Image from 'next/image';
import { useState } from 'react';
import { RiEditBoxFill } from "react-icons/ri";
import { MdEdit } from "react-icons/md";


export default function Page() {
  // Mock user data
  const [user, setUser] = useState({
    name: "Alex Johnson",
    email: "john.doe@gmail.com",
    password: "••••••••",
    phone: "+1 000-000-0000",
    address: "St 32 main downtown, Los Angeles, California, USA",
    dob: "01-01-1992",
  });

  // For demo: Edit button click → alert
  const handleEdit = (field) => {
    alert(`Editing ${field}...`);
    // Here you can open modal or enable input fields
  };

  const handleAvatarEdit = () => {
    alert('Open avatar upload modal...');
  };

  return (
    <div className="p-6 min-h-screen max-w-7xl mx-auto">

      <div className="p-6">
        <div className="flex flex-col items-center mb-6">
          <div className="relative">
            {/* Profile Image */}
            <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-2 border-blue-500">
              <Image
                src="/user.jpg"          
                alt={`${user.name} avatar`}
                fill                     
                className="object-cover"
                sizes="80px"
                priority
              />
            </div>

            {/* Edit icon / button */}
            <button
              onClick={handleAvatarEdit}
              aria-label="Edit avatar"
              className="absolute bottom-1 right-1 transform translate-x-1/4 translate-y-1/4 bg-[#FF8682] border border-gray-200 rounded-full p-2 shadow-sm text-sm flex items-center justify-center"
              title="Edit avatar"
            >
              <MdEdit />
            </button>
          </div>

          <h3 className="font-medium mt-2">{user.name}</h3>
          <p className="text-sm text-gray-500">{user.email}</p>
        </div>

        {/* Account Fields */}
        <div className="space-y-4">
          <h4 className="font-semibold text-lg mb-4">Account</h4>
          <div className="bg-blue-50 rounded-md shadow-md p-5">
            {/* Name */}
            <div className="flex justify-between items-center p-3">
              <div>
                <div className="text-xs text-gray-500">Name</div>
                <div className="font-medium">{user.name}</div>
              </div>
              <button
                onClick={() => handleEdit('Name')}
                className="text-blue-600 flex items-center gap-1 text-sm border border-blue-600 px-2 py-1 rounded hover:bg-blue-50"
              >
                <RiEditBoxFill />
                Change
              </button>
            </div>

            {/* Email */}
            <div className="flex justify-between items-center p-3">
              <div>
                <div className="text-xs text-gray-500">Email</div>
                <div className="font-medium">{user.email}</div>
              </div>
              <button
                onClick={() => handleEdit('Email')}
                className="text-blue-600 text-sm border border-blue-600 px-2 py-1 rounded hover:bg-blue-50 flex items-center space-x-1"
              >
                <span>+</span>
                <span>Add another email</span>
              </button>
            </div>

            {/* Password */}
            <div className="flex justify-between items-center p-3">
              <div>
                <div className="text-xs text-gray-500">Password</div>
                <div className="font-medium">{user.password}</div>
              </div>
              <button
                onClick={() => handleEdit('Password')}
                className="text-blue-600 text-sm flex items-center gap-1 border border-blue-600 px-2 py-1 rounded hover:bg-blue-50"
              >
                <RiEditBoxFill />
                Change
              </button>
            </div>

            {/* Phone */}
            <div className="flex justify-between items-center p-3">
              <div>
                <div className="text-xs text-gray-500">Phone number</div>
                <div className="font-medium">{user.phone}</div>
              </div>
            </div>

            {/* Address */}
            <div className="flex justify-between items-center p-3">
              <div>
                <div className="text-xs text-gray-500">Address</div>
                <div className="font-medium">{user.address}</div>
              </div>
              <button
                onClick={() => handleEdit('Address')}
                className="text-blue-600 text-sm flex items-center gap-1 border border-blue-600 px-2 py-1 rounded hover:bg-blue-50"
              >
                <RiEditBoxFill />
                Change
              </button>
            </div>

            {/* Date of Birth */}
            <div className="flex justify-between items-center p-3 rounded-b-md">
              <div>
                <div className="text-xs text-gray-500">Date of birth</div>
                <div className="font-medium">{user.dob}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
