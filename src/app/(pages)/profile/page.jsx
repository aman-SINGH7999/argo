'use client';

import Image from "next/image";
import MyBooking from "@/components/booking/MyBooking";
import Link from "next/link";

export default function Page() {
  // Mock user data
  const user = {
    name: "Alex Johnson",
    email: "alex.johnson@email.com",
    avatar: "/user.jpg", // Default placeholder image
  };

  return (
    <div className="p-6 min-h-screen max-w-7xl mx-auto">
      <div className="bg-white p-4 mb-10 rounded-lg shadow-sm border border-gray-200">
        <h3 className="font-semibold text-lg mb-4">Your Profile</h3>
        <div className="flex items-center space-x-4">
          <div className="relative w-12 h-12">
            <Image
              src={user.avatar}
              alt="User Avatar"
              fill
              className="rounded-full object-cover border-2 border-gray-200"
              sizes="48px"
              priority
            />
          </div>
          <div>
            <div className="font-medium text-gray-900">{user.name}</div>
            <div className="text-sm text-gray-500">{user.email}</div>
            <Link
              href="/profile/setting"
              className="text-blue-600 text-sm hover:underline mt-1 inline-block"
            >
              Manage Profile
            </Link>
          </div>
        </div>
      </div>
      <MyBooking />
    </div>
  );
}
