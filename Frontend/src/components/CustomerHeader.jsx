import { ArrowLeft, Search, Plus } from 'lucide-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'


const CustomerHeader = () => {

    const navigate = useNavigate()

  return (
    <div>
        <div className='mx-auto'>
        <button
        onClick={()=> { navigate('/dashboard') }}
        className='flex items-center gap-2 text-[#101828] hover:text-[#10B981] mb-3 text-lg cursor-pointer active:scale-95 font-semibold'
        >
        <ArrowLeft size={18} />
        Back
        </button>
         
         <div className='mb-6'>
        <h2 className='font-semibold text-2xl text-black'>Customers</h2>
        <p className='font-medium text-gray-500 mt-1'>Manage your business customers.</p>
       </div>

 <div className='flex flex-wrap gap-3 justify-between'>
 <div className="relative w-full md:max-w-sm">
  <Search
    size={18}
    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
  />
  <input
    type="text"
    placeholder="Search customers..."
    className="w-full border border-gray-300 rounded-lg py-2 pl-10 pr-3 outline-none focus:border-[#10B981]"
  />
</div>

   <button 
   onClick={() => { navigate('/dashboard/customers/addcustomer') }}
   className="flex w-full md:w-auto items-center justify-center gap-2 rounded-lg bg-[#10B981] px-4 py-3 font-medium cursor-pointer active:scale-95 text-white transition hover:bg-[#059669]">
         <Plus size={18} />
         Add Customer
       </button>
       </div>

      

        </div>
    </div>
  )
}

export default CustomerHeader