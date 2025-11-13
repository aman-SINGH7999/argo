// app/page.js
'use client';
import MyBooking from "@/components/booking/MyBooking";

export default function Page() {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <MyBooking />
    </div>
  );
}