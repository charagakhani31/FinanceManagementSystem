import React, { useContext } from 'react'
import { Plus } from 'lucide-react'
import { AuthContext } from '../context/AuthContext'


const DashboardHeader = () => {

      const {user} = useContext(AuthContext)

      console.log(user);
      
      
  return (
   <div className="flex flex-col gap-4 px-5 py-5 sm:flex-row sm:items-center sm:justify-between">
     <div>
       <h2 className="text-2xl font-semibold">
         Welcome back, {user.fullName}
       </h2>
       <p className="text-sm text-[#667085] sm:text-base">
         Here's how Northwind Traders is doing this month.
       </p>
     </div>
   
     <div className="flex flex-wrap gap-3">
       <button className="flex items-center justify-center gap-2 rounded-lg border bg-white px-4 py-3 font-medium text-[#101828] transition hover:bg-gray-50">
         <Plus size={18} />
         Record Expense
       </button>
   
       <button className="flex items-center justify-center gap-2 rounded-lg bg-[#10B981] px-4 py-3 font-medium text-white transition hover:bg-[#059669]">
         <Plus size={18} />
         Record Sale
       </button>
     </div>
   </div>
  )
}

export default DashboardHeader