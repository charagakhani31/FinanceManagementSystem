import {UserRound, Phone,Pencil, MapPin, Trash } from 'lucide-react'
import { customerContext } from '../context/CustomerContext'
import { useContext } from 'react'

const CustomerList = () => {
    const {customers} = useContext(customerContext)
        
  return (
    
    <div className='border rounded-lg mt-6 h-full py-2 px-4 w-full'>
           <h3 className='font-medium text-lg pt-1'>Customer Details</h3>
        <hr className='border-0 border-t-2 my-3 border-[#ccc]' />


       {customers.map((customer) => (
   <div key={customer._id}>
        <div className='flex justify-between'>
   
        <div>
        <div className='flex gap-6 items-center px-4'>
         <UserRound size={20}   className="w-5 h-5 md:w-6 md:h-6 text-gray-400" />
         <div>
           <h2 className='font-medium text-lg'>{customer.customerName}</h2>
           <h3>{customer.customerEmail}</h3>
           <h3>{customer.business.businessName}</h3>
           
           </div>
           </div>
           <div className='flex px-3 gap-3 items-center mt-1'>
             <Phone size={14}   className="w-5 h-5 md:w-6 md:h-6 text-gray-400"/>
             <h3>{customer.phone}</h3>
             <MapPin size={14}   className="w-5 h-5 md:w-6 md:h-6 text-gray-400" />
             <h3>{customer.address}</h3>
           </div>
           </div>
   
           <div className='flex gap-10 pr-4 flex-col md:flex-row justify-center md:gap-5 '>
             <button className='cursor-pointer active:scale-95'>
             <Pencil size={18}  />
             </button>
             <button className='cursor-pointer active:scale-95'>
             <Trash  size={18} className='text-red-500'/>
             </button>
           </div>
   
           </div>
   
           <hr className='border-0 border-t-2 my-3 border-[#ccc]'/>
           </div>
         ))}
          </div>
  )
}

export default CustomerList