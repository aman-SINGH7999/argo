import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import React from 'react'

export default function layout({children}) {
  return (
    <>
      <Navbar />
      <div className='bg-gray-50'>
          {children}
      </div>
      <Footer />      
    </>
  )
}
