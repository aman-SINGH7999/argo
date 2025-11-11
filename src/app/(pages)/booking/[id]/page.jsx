import SeatSelector from '@/components/booking/SeatSelector'
import TripDetailsCard from '@/components/booking/TripDetailsCard'
import React from 'react'

export default function page() {
  return (
    <div>
      <TripDetailsCard />
      <SeatSelector />
    </div>
  )
}
