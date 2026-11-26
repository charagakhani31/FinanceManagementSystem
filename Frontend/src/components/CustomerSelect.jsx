import React from 'react'
import { useState } from 'react'
import { useContext } from 'react'
import { customerContext } from '../context/CustomerContext'
import { SaleContext } from '../context/SaleContext'

const CustomerSelect = () => {

    const {searchQuery, setSearchQuery, filteredCustomers } = useContext(customerContext)
    const {customer, setCustomer} = useContext(SaleContext)

    const [isOpen, setIsOpen] = useState(false)

  return (
     <div>
            <h2 className="text-xl font-semibold text-[#101828] mb-4">
                Customer Information
            </h2>
             <div className="relative">
            <input  
            type="text"
            value={searchQuery}
            onChange={(e) => { 
                setSearchQuery(e.target.value);
                setIsOpen(true);
                setCustomer(null)            
            }}
            placeholder='Search customer...'
             onClick={() => setIsOpen(true)}
            className="w-full border rounded-lg px-3 py-2"
             />

              {isOpen && searchQuery.trim() !== "" && (
    <div className="w-full bg-white border rounded-lg mt-1">
        
         {filteredCustomers.length > 0 ? (
        filteredCustomers.map((customer) => (
            <div
            key={customer._id}
            onClick={() => {
              setCustomer(customer._id);
              setSearchQuery(customer.customerName);
              setIsOpen(false);
            }}
            className="p-3 cursor-pointer hover:bg-gray-100"
          >
              {customer.customerName}
          </div>
        ))
         ) : (
        <p className="p-3 text-gray-500">
          No customers found
        </p>
           )}

          </div>
               )}

              
             </div>
         </div>
    
  )
}

export default CustomerSelect