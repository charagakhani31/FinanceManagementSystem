import {ArrowLeft, Search, Plus, Box, CircleCheck, TriangleAlert } from 'lucide-react'
import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { DashboardContext } from '../context/DashboardContext'
import { productContext } from '../context/ProductContext'


const ProductHeader = () => {

     const { dashboardData } =  useContext(DashboardContext)
     const {searchQuery, setSearchQuery} = useContext(productContext)

     useEffect(() => {
        dashboardData
     },[])



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
        <h2 className='font-semibold text-2xl text-black'>Products</h2>
        <p className='font-medium text-gray-500 mt-1'>Manage your business products and inventory.</p>
       </div>

 <div className='flex flex-wrap gap-3 justify-between'>
 <div className="relative w-full md:max-w-sm">
  <Search
    size={18}
    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
  />
  <input
    type="text"
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
    placeholder="Search products..."
    className="w-full border border-gray-300 rounded-lg py-2 pl-10 pr-3 outline-none focus:border-[#10B981]"
  />
   </div>

   <button 
   onClick={() => { navigate('/dashboard/products/addproduct') }}
   className="flex w-full md:w-auto items-center justify-center gap-2 rounded-lg bg-[#10B981] px-4 py-3 font-medium cursor-pointer active:scale-95 text-white transition hover:bg-[#059669]">
         <Plus size={18} />
         Add Product
       </button>
       </div>

      <div className='px-2 sm:px-10  py-6  flex gap-8 justify-between'>
       <div>
        <Box 
        size={20}
        className='text-emerald-500'/>
        <p className='font-semibold py-1 text-xl'>
            {dashboardData.totalProducts}
        </p>
        <h4 className='font-medium text-gray-500'>
            Total Products
        </h4>
       </div>

       <div>
        <CircleCheck 
        size={20}
        className='text-emerald-500'/>
        <p className='font-semibold py-1 text-xl'>
            {dashboardData.inStockProducts}
        </p>
        <h4 className='font-medium text-gray-500'>
            In Stock
        </h4>
       </div>

       <div>
       <TriangleAlert 
       size={20}
        className='text-red-500' />
        <p className='font-semibold py-1 text-xl'>
            {dashboardData.lowStockProducts}
        </p>
        <h4 className='font-medium text-gray-500'>
            Low Stock
        </h4>
       </div>

       </div>

        </div>
    </div>
  )
}

export default ProductHeader