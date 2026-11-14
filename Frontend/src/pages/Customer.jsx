import React, { useContext } from 'react'

import CustomerHeader from '../components/CustomerHeader'
import CustomerList from '../components/CustomerList'



const Customer = () => {
        
  return (
    <div className='min-h-screen bg-[#F8FAFC] p-6' >
        <CustomerHeader />
        <CustomerList />
    </div>
  )
}

export default Customer