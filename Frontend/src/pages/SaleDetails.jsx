
import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { SaleContext } from '../context/SaleContext'
import {ArrowLeft, Pencil} from 'lucide-react'
import { DashboardContext } from '../context/DashboardContext'


const SaleDetails = () => {

     const navigate = useNavigate()

    const {selectedSale, sales, editSale} = useContext(SaleContext)
     const { fetchData, getSalesHistory } = useContext(DashboardContext)

  const [isEditing, setIsEditing] = useState(false);
  const [amountInput, setAmountInput] = useState('');
  const [isSaving, setIsSaving] = useState(false);

     useEffect(() => {
      if(selectedSale) {
    getSalesHistory(selectedSale);
      }
       }, [selectedSale])

  const sale = sales.find((s) => s?._id === selectedSale)

  if (!sale) {
  return <div className="p-6 text-gray-500">Loading sale details...</div>;
}


  const Outstanding = sale.totalAmount - sale.amountPaid;

  
  const handleStartEdit = () => {
    setAmountInput(sale.amountPaid);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setAmountInput('');
  };

  const handleSave = async () => {
    const updatedAmount = Number(amountInput);

    setIsSaving(true);
    await editSale(sale._id, updatedAmount);
    await getSalesHistory(sale._id);
    await fetchData()
    setIsSaving(false);
    setIsEditing(false);
  };
  

  return (
    <div className='min-h-screen bg-[#F8FAFC] p-6' >
         <div className='mx-auto'>
         <button
        onClick={()=> { navigate('/dashboard/sales') }}
        className='flex items-center gap-2 text-[#101828] hover:text-[#10B981] mb-3 text-lg cursor-pointer active:scale-95 font-semibold'
        >
        <ArrowLeft size={18} />
        Back
        </button>
        </div>

        <div className='border rounded-lg my-4 h-full py-2 px-4 w-full'>
        <div className='flex justify-between items-center'>
        <div>
           <h3 className='font-semibold text-xl pt-1'>Sale Details</h3>
           <p className='font-medium text-sm text-gray-400'>Sale ID: {sale?._id?.slice(-6).toUpperCase()}</p>
           </div>
           <div className='shrink-0'>
    <span
      className={`inline-block whitespace-nowrap rounded-full px-3 py-1 text-xs font-medium ${
        sale.paymentStatus === 'paid'
          ? 'bg-green-100 text-green-700'
          : sale.paymentStatus === 'unpaid'  
          ? 'bg-red-100 text-red-700'
          : 'bg-yellow-100 text-yellow-700'
      }`}
    >
      {sale.paymentStatus}
    </span>
  </div>
           </div>

           <div className='border rounded-lg my-4 h-full py-2 px-4 w-full'>
                <h3 className='text-lg font-medium text-gray-500 mb-2'>CUSTOMER INFORMATION</h3>
                 <h3 className='font-semibold mb-2 text-xl'>{sale.customer.customerName}</h3>
                   <p className='font-medium text-sm mb-2 text-gray-500'>{sale.customer.customerEmail}</p>
                     <p className='font-medium text-sm text-gray-500 mb-2'>{sale.customer.phone}</p>
            </div>

              <div className='border rounded-lg my-4 h-full py-2 px-4 w-full'>
                <h3 className='text-lg font-medium text-gray-500 mb-2'>PRODUCTS</h3>
                {sale.items.map((s) => ( 
                <div key={s.product}>
                <div className='flex justify-between'>
                 <h3 className='font-semibold mb-2 text-xl'>{s.productName}</h3>
                   <p className='font-medium text-sm mb-2 shrink-0 text-gray-500'>{s.quantity} x {s.unitPrice}</p>
                     </div>
                      <hr className='border-0 border-t my-3 border-[#ccc]' />
                      </div>
                      ))}
            </div>

            <div className='flex justify-between my-3'>
                 <h4 className='text-lg font-medium text-gray-500 mb-2'>Total Amount</h4>
                 <h4 className='font-semibold mb-2 text-xl'>RS. {sale.totalAmount}</h4>
            </div>

             <div className='flex justify-between my-3'>
                 <h4 className='text-lg font-medium text-gray-500 mb-2'>Amount Paid</h4>
       {!isEditing ? (
                <div className='flex gap-5 items-center'>
                  {sale.paymentStatus !== 'paid' && (
                  <button onClick={handleStartEdit}
                  className='cursor-pointer active:scale-95'>
             <Pencil size={18}  />
             </button>
                  )}
                 <h4 className='font-semibold mb-2 text-xl'>RS. {sale.amountPaid}</h4>
                 </div>
                ) : (
         <div className='flex items-center gap-2'>
    <input
      type='number'
      value={amountInput}
      onChange={(e) => setAmountInput(e.target.value)}
      className='border rounded px-2 py-1 w-28 text-right font-semibold'
      autoFocus
    />
    <button
      onClick={handleSave}
      disabled={isSaving}
      className='bg-[#10B981] text-white px-3 py-1 rounded text-sm cursor-pointer'
    >
      {isSaving ? '...' : 'Save'}
    </button>
    <button
      onClick={handleCancel}
      className='bg-gray-200 px-3 py-1 rounded text-sm cursor-pointer'
    >
      Cancel
      </button>
        </div>
         )}    
            </div>

             <div className='flex justify-between my-3'>
                 <h4 className='text-lg font-medium text-gray-500 mb-2'>Outstanding</h4>
                 <h4 className='font-semibold mb-2 text-xl'>RS. {Outstanding}</h4>
            </div>

</div>  
    </div>
  )
}

export default SaleDetails