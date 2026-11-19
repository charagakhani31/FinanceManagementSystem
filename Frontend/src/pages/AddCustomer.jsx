
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { customerContext } from "../context/CustomerContext";

const AddCustomer = () => {

  const {addCustomer} = useContext(customerContext)

  const navigate = useNavigate();

  

   const [customerName, setCustomerName] = useState("");
   const [customerEmail, setCustomerEmail] = useState("");
   const [phone, setPhone] = useState("");
   const [address, setAddress] = useState("");



  const handleSubmit = async (e) => {
    e.preventDefault();

  await addCustomer(customerName, customerEmail, phone, address)
  
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-6">

      <div className="max-w-3xl mx-auto">
  <button
  onClick={() => navigate('/dashboard/customers')}
  className="flex items-center gap-2 text-[#101828] hover:text-[#10B981] mb-5 text-lg cursor-pointer active:scale-95 font-semibold"
>
  <ArrowLeft size={18} />
  Back
</button>
        
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-[#101828]">
           Add New Customer
          </h1>

          <p className="text-gray-500 mt-2">
            Create a customer profile to start tracking invoices and payments.
          </p>
        </div>

       
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 md:p-8">

          <div className="mb-7">
            <div className="w-12 h-12 bg-emerald-50 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">👤</span>
            </div>

            <h2 className="text-lg font-semibold text-[#101828]">
             Customer Information
            </h2>

            <p className="text-sm text-gray-500 mt-1">
             Enter customer details below to create a new profile.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Customer Name
              </label>

              <input
                type="text"
                name="customerName"
                value={customerName}
               onChange={(e)=> { setCustomerName(e.target.value) }}
                placeholder="Enter customer name"
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>

          
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Customer Email
              </label>

              <input
                type="email"
                name="customerEmail"
                value={customerEmail}
                onChange={(e)=> { setCustomerEmail(e.target.value) }}
                placeholder="customername@example.com"
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>

              <input
                type="tel"
                name="phone"
                value={phone}
                onChange={(e)=> { setPhone(e.target.value) }}
                placeholder="Enter phone number"
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Customer Address
              </label>

              <textarea
                name="address"
                value={address}
                onChange={(e)=> { setAddress(e.target.value) }}
                placeholder="Enter customer address"
                rows="3"
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 resize-none"
              />
            </div>

            <div className="flex justify-end gap-3 pt-5 border-t border-gray-100">

              <button
                type="button"
                onClick={() => navigate("/dashboard/customers")}
                className="px-5 py-2.5 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition cursor-pointer active:scale-95"
              >
                Cancel
              </button>

              <button
                type="submit"
                 onClick={() => navigate("/dashboard/customers")}
                className="px-5 py-2.5 rounded-lg bg-[#10B981] text-white font-medium hover:bg-[#059669] transition cursor-pointer active:scale-95 "
              >
                Add Customer
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

export default AddCustomer;
