
import {Pencil, Trash } from 'lucide-react'
import { useContext, useEffect } from 'react'
import { productContext } from '../context/ProductContext'
import { DashboardContext } from '../context/DashboardContext'
import { useNavigate } from 'react-router-dom'


const ProductList = () => {

     const navigate = useNavigate()

    const {filteredProducts, deleteProduct, setEditingProduct} = useContext(productContext)
    const { fetchData } = useContext(DashboardContext)

     const productStatus = filteredProducts.map((product) => ({
      ...product, 
      status: product.quantity > 5 ? 'In Stock' : 'Low Stock', 
     }))

     const handleDelete = async (product) => {
        await deleteProduct(product)

        await fetchData()
     }


  return (
     <div>
           <h3 className='font-medium text-lg pt-1'>Product List</h3>
           <div className='border rounded-lg mt-2 h-full py-2 px-4 w-full'>
     
         {productStatus.map((p) => (
           <div key={p._id}>
         <div className='flex justify-between items-start gap-3'>
  <div>
    <h3 className='font-semibold text-lg'>{p.productName}</h3>
    <p className='font-medium text-sm text-gray-400'>SKU: {p.sku}</p>
    <p className='font-medium text-sm text-gray-400'>{p.description}</p>
  </div>

  <div className='shrink-0'>
    <span
      className={`inline-block whitespace-nowrap rounded-full px-3 py-1 text-xs font-medium ${
        p.status === 'In Stock'
          ? 'bg-green-100 text-green-700'
          : 'bg-red-100 text-red-700'
      }`}
    >
      {p.status}
    </span>
  </div>
</div>

          
           <div className='flex justify-between items-center gap-5 py-3'>
            <div className='text-center'>
            <p className='font-medium text-sm text-gray-400'>Purchase Price</p>
            <p  className='font-semibold text-xl'>{p.purchasePrice}</p>
            </div>
            <div className='text-center'>
            <p className='font-medium text-sm text-gray-400'>Selling Price</p>
            <p className='font-semibold text-xl'>{p.sellingPrice}</p>
            </div>
            <div className='text-center'>
            <p className='font-medium text-sm text-gray-400'>Quantity</p>
            <p  className='font-semibold text-xl'>{p.quantity}</p>
            </div>
           
         <div className='flex gap-6 flex-wrap pl-12'>
           <button className='cursor-pointer active:scale-95'
           onClick={() => { setEditingProduct(p._id),
             navigate('/dashboard/products/editproduct') }}
             >
             <Pencil size={18}  />
             </button>
             <button className='cursor-pointer active:scale-95'
              onClick={() => handleDelete(p._id)}>
             <Trash  size={18} className='text-red-500'/>
             </button>
           </div>
           
          </div> 

          <hr className='border-0 border-t-2 my-3 border-[#ccc]' />
          
           </div>
           ))}

           </div>
  
    </div>
  )
}

export default ProductList