
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { ExpenseContext } from "../context/ExpenseContext";
import { DashboardContext } from "../context/DashboardContext";

const AddExpense = () => {

  const {addExpense} = useContext(ExpenseContext)
   const {fetchData} = useContext(DashboardContext)

  const navigate = useNavigate();

   const [title, setTitle] = useState("");
   const [category, setCategory] = useState("");
   const [amount, setAmount] = useState("");
   const [description, setDescription] = useState("");
   const [date, setDate] = useState("");


  const handleSubmit = async (e) => {
    e.preventDefault();

  await addExpense(title, category, amount, description, date)

  navigate("/dashboard/expenses")

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
            Add New Expense
          </h1>

          <p className="text-gray-500 mt-2">
             Record a business expense to track spending and manage receipts.
          </p>
        </div>

       
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 md:p-8">

          <div className="mb-7">
            <div className="w-12 h-12 bg-emerald-50 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">🧾</span>
            </div>

            <h2 className="text-lg font-semibold text-[#101828]">
              Expense Information
            </h2>

            <p className="text-sm text-gray-500 mt-1">
             Enter expense details below to log a new transaction.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title
              </label>

              <input
                type="text"
                name="title"
                value={title}
               onChange={(e)=> { setTitle(e.target.value) }}
                placeholder="Enter title"
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>

          
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
               Category
              </label>

              <input
                type="text"
                name="category"
                value={category}
                onChange={(e)=> { setCategory(e.target.value) }}
                placeholder="Enter category"
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
              Amount
              </label>

              <input
                type="number"
                name="amount"
                value={amount}
                onChange={(e)=> { setAmount(e.target.value) }}
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
                name="text"
                value={description}
                onChange={(e)=> { setDescription(e.target.value) }}
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
                name="text"
                value={date}
                onChange={(e)=> { setDate(e.target.value) }}
                placeholder="Enter date"
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 resize-none"
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
                className="px-5 py-2.5 rounded-lg bg-[#10B981] text-white font-medium hover:bg-[#059669] transition cursor-pointer active:scale-95 "
              >
                Add Expense
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

export default AddExpense;
