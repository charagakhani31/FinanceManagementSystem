import {Truck , Phone,Pencil, MapPin, Trash } from 'lucide-react'
import { useContext } from 'react'
import { VendorsContext } from '../context/VendorsContext'
import { useNavigate } from 'react-router-dom'

const VendorsList = () => {

    const { filteredVendors, deleteVendor, setEditingVendor } = useContext(VendorsContext)
   const navigate =  useNavigate()

  return (
     <div className='border rounded-lg mt-6 h-full py-2 px-4 w-full'>
           <h3 className='font-medium text-lg pt-1'>Vendors Details</h3>
        <hr className='border-0 border-t-2 my-3 border-[#ccc]' />
      
       {filteredVendors.map((v) => (
   <div key={v._id}>
        <div className='flex justify-between'>
        <div>
        <div className='flex gap-6 items-center px-4'>
         <Truck   size={20}   className="w-5 h-5 md:w-6 md:h-6 shrink-0" />
         <div>
           <h2 className='font-medium text-lg'>{v.vendorName}</h2>
           <h3>{v.email}</h3>
           
           </div>
           </div>
           <div className='flex px-3 gap-3 items-center mt-3'>
             <Phone size={14}   className="w-5 h-5 md:w-4 md:h-4 text-gray-400 shrink-0"/>
             <h3>{v.phone}</h3>
             <MapPin size={14}   className="w-5 h-5 md:w-4 md:h-4 text-gray-400 shrink-0" />
             <h3>{v.address}</h3>
           </div>
           </div>
   
           <div className='flex gap-10 pr-4 flex-col md:flex-row justify-center md:gap-5'>
             <button 
             className='cursor-pointer active:scale-95'
              onClick={() => { setEditingVendor(v._id);
             navigate('/dashboard/vendors/editvendor') }}>
             <Pencil size={18}  />
             </button>
             <button 
             className='cursor-pointer active:scale-95'
              onClick={() => deleteVendor(v._id) }>
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

export default VendorsList