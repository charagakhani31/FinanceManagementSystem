import React from 'react'
import VendorsHeader from '../components/VendorsHeader'
import VendorsList from '../components/VendorsList'

const Vendors = () => {
  return (
    <div className='min-h-screen bg-[#F8FAFC] p-6' >
        <VendorsHeader />
        <VendorsList />
    </div>
  )
}

export default Vendors