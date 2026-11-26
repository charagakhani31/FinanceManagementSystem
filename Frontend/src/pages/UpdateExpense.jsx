
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { ExpenseContext } from "../context/ExpenseContext";
import { DashboardContext } from "../context/DashboardContext";

const UpdateExpense = () => {

  const {expenses,  editingExpense, setEditingExpense, editExpense} = useContext(ExpenseContext)
   const {fetchData} = useContext(DashboardContext)

  const navigate = useNavigate();

  const selectedExpense = expenses.find((e) => e._id === editingExpense)

 
   const [formData, setFormData] = useState({
    amount: '', 
    description: ''
   })



   useEffect(() => {
    if(selectedExpense) {
    setFormData(selectedExpense)
    }
   }, [selectedExpense])

   if(!editingExpense || !selectedExpense) {
    return null
   }

  const handleSubmit = async (e) => {
    e.preventDefault();

  await editExpense(editingExpense, formData)
    setEditingExpense(null)

    await fetchData()
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-6">

      <div className="max-w-3xl mx-auto">
  <button
  onClick={() => navigate('/dashboard/expenses')}
  className="flex items-center gap-2 text-[#101828] hover:text-[#10B981] mb-5 text-lg cursor-pointer active:scale-95 font-semibold"
>
  <ArrowLeft size={18} />
  Back
</button>
        
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-[#101828]">
            Edit Expense
          </h1>

          <p className="text-gray-500 mt-2">
           Update the expense amount or description. Other details are locked for record accuracy.
          </p>
        </div>

       
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 md:p-8">

          <div className="mb-7">
            <div className="w-12 h-12 bg-emerald-50 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">✏️</span>
            </div>

            <h2 className="text-lg font-semibold text-[#101828]">
             Expense Information
            </h2>

            <p className="text-sm text-gray-500 mt-1">
           Only the amount and description can be edited below.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title
              </label>

              <input
                type="text"
                value={selectedExpense.title}
                readOnly
                className="w-full border border-gray-300 pointer-events-none text-gray-900 rounded-lg px-4 py-3 outline-none"
              />
            </div>

          
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>

             <input
                type="text"
                value={selectedExpense.category}
                readOnly
                className="w-full border border-gray-300 pointer-events-none text-gray-900 rounded-lg px-4 py-3 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Amount
              </label>

              <input
                type="number"
                name="amount"
                 value={formData.amount || ''}
                onChange={(e) =>  setFormData({...formData, amount: e.target.value}) }
                placeholder="Enter amount"
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
               Description
              </label>

              <input
                type="text"
                 name="description"
                 value={formData.description || ''}
                 onChange={(e) =>  setFormData({...formData, description: e.target.value}) }
                placeholder="Enter description"
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 resize-none"
              />
            </div>

             <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date
              </label>

             <input
                type="text"
                value={selectedExpense.date}
                readOnly
                className="w-full border border-gray-300 pointer-events-none text-gray-900 rounded-lg px-4 py-3 outline-none"
              />
            </div>

            <div className="flex justify-end gap-3 pt-5 border-t border-gray-100">

              <button
                type="button"
                onClick={() => navigate("/dashboard/expenses")}
                className="px-5 py-2.5 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition cursor-pointer active:scale-95"
              >
                Cancel
              </button>

              <button
                type="submit"
                 onClick={() => navigate("/dashboard/expenses")}
                className="px-5 py-2.5 rounded-lg bg-[#10B981] text-white font-medium hover:bg-[#059669] transition cursor-pointer active:scale-95 "
              >
                Save Changes
              </button>

            </div>

          </form>
        </div>

        <p className="text-center text-sm text-gray-400 mt-6">
          FinTrack — Manage your business finances in one place.
        </p>

      </div>
    </div>
  )
}

export default UpdateExpense;