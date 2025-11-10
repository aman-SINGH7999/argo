import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import React from 'react'

export default function layout({children}) {
  return (
    <>
      <Navbar />
      <div className='px-20'>
          {children}
      </div>
      <Footer />      
    </>
  )
}
