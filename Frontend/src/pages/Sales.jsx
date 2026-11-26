import React from 'react'
import SaleHeader from '../components/SaleHeader'
import SalesList from '../components/SalesList'

const Sales = () => {
  return (
    <div className='min-h-screen bg-[#F8FAFC] p-6' >
        <SaleHeader />
        <SalesList />
    </div>
  )
}

export default Sales