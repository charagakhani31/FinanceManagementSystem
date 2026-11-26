
import { useContext, useEffect } from 'react'
import { DashboardContext } from '../context/DashboardContext'
import { useNavigate } from 'react-router-dom'
import {Pencil, Trash } from 'lucide-react'
import { ExpenseContext } from '../context/ExpenseContext'


const ExpenseList = () => {

     const navigate = useNavigate()

    const {filteredExpenses, deleteExpense, setEditingExpense} = useContext(ExpenseContext)
    const { fetchData } = useContext(DashboardContext)

     
    const handleDelete = async (expense) => {
        await deleteExpense(expense)

        await fetchData()
     }

  return (
     <div>
           <h3 className='font-medium text-lg pt-1'>Expense History</h3>
           <div className='border rounded-lg mt-2 h-full py-2 px-4 w-full'>
     
         {filteredExpenses.map((e) => (
           <div key={e._id}>
         <div className='flex justify-between items-start gap-3'>
  <div className='my-3'>
    <h3 className='font-semibold  text-lg'>{e.title}</h3>
    <p className='font-medium text-sm text-gray-400'>{e.date} . {e.category}</p>
     <p className='font-medium text-sm text-gray-400'>{e.description}</p>
  </div>

<div className='flex flex-col gap-4 text-center py-3'>
 
    <p  className='font-semibold text-xl'>RS. {e.amount}</p>

   <div className='flex gap-6 flex-wrap pl-12'>
           <button className='cursor-pointer active:scale-95'
            onClick={() => { setEditingExpense(e._id);
             navigate('/dashboard/expenses/editexpense') }}
             >
             <Pencil size={18}  />
             </button>

             <button  onClick={() => handleDelete(e._id)}
             className='cursor-pointer active:scale-95'>
             <Trash  size={18} className='text-red-500'/>
             </button>
           </div>
  </div>
</div>
          <hr className='border-0 border-t-2 my-3 border-[#ccc]' />
           </div>
           ))}

           </div>
  
    </div>
  )
}

export default ExpenseList