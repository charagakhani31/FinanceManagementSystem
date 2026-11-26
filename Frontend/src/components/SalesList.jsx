
import { useContext, useEffect } from 'react'
import { DashboardContext } from '../context/DashboardContext'
import { useNavigate } from 'react-router-dom'
import { SaleContext } from '../context/SaleContext'


const SalesList = () => {

     const navigate = useNavigate()

    const {filteredSales, setSelectedSale} = useContext(SaleContext)
    const { fetchData } = useContext(DashboardContext)

useEffect(() => {
    fetchData()
}, [])

  return (
     <div>
           <h3 className='font-medium text-lg pt-1'>Recent Sales</h3>
           <div className='border rounded-lg mt-2 h-full py-2 px-4 w-full'>
     
         {filteredSales.map((s) => (
           <div key={s._id}>
         <div className='flex justify-between items-start gap-3'>
  <div className='my-3'>
    <h3 className='font-semibold text-lg mb-3'>{s?._id?.slice(-6).toUpperCase()}</h3>
    <h3 className='font-semibold  text-lg'>{s.customer.customerName}</h3>
    <p className='font-medium text-sm text-gray-400'>Customer</p>
  </div>

<div className='flex flex-col gap-4'>
  <div className='shrink-0'>
    <span
      className={`inline-block whitespace-nowrap rounded-full px-3 py-1 text-xs font-medium ${
        s.paymentStatus === 'paid'
          ? 'bg-green-100 text-green-700'
          : s.paymentStatus === 'unpaid'  
          ? 'bg-red-100 text-red-700'
          : 'bg-yellow-100 text-yellow-700'
      }`}
    >
      {s.paymentStatus}
    </span>
  </div>

    <p  className='font-semibold text-xl'>RS. {s.totalAmount}</p>

    <button className='text-gray-500 cursor-pointer active:scale-95 active:text-green-700'
      onClick={() => { setSelectedSale(s._id);
                        navigate('/dashboard/sales/viewdetail') }}
     >
        View Details→</button>
  </div>
</div>
          <hr className='border-0 border-t-2 my-3 border-[#ccc]' />
           </div>
           ))}

           </div>
  
    </div>
  )
}

export default SalesList