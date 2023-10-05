import Navbar from '@/components/Navbar'
import SearchBar from '@/components/SearchBar'
import ServicesGrid from '@/components/ServicesGrid'
import React from 'react'

export default function services() {
  return (
    <div className='bg-white h-screen'>
      <Navbar />
      <ServicesGrid />
    </div>
  )
}
