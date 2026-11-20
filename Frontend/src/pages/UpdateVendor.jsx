import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { VendorsContext } from "../context/VendorsContext";

const UpdateVendor = () => {
  
  const {vendors, editingvendor, setEditingVendor, editVendor} = useContext(VendorsContext)

  const navigate = useNavigate();

  const selectedVendor = vendors.find((c) => c._id === editingvendor)

   const [formData, setFormData] = useState({
    vendorName: '',
    email: '', 
    phone: '', 
    address: ''
   })

   useEffect(() => {
    if(selectedVendor) {
    setFormData(selectedVendor)
    }
   }, [selectedVendor])

   if(!editingvendor || !selectedVendor) {
    return null
   }


  const handleSubmit = async (e) => {
    e.preventDefault();

  await editVendor(editingvendor, formData)
    setEditingVendor(null)
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-6">

      <div className="max-w-3xl mx-auto">
  <button
  onClick={() => navigate('/dashboard/vendors')}
  className="flex items-center gap-2 text-[#101828] hover:text-[#10B981] mb-5 text-lg cursor-pointer active:scale-95 font-semibold"
>
  <ArrowLeft size={18} />
  Back
</button>
        
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-[#101828]">
           Edit Vendor
          </h1>

          <p className="text-gray-500 mt-2">
           Update vendor details to keep your purchases, bills, and supplier records accurate. </p>
        </div>

       
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 md:p-8">

          <div className="mb-7">
            <div className="w-12 h-12 bg-emerald-50 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">✏️</span>
            </div>

            <h2 className="text-lg font-semibold text-[#101828]">
             Vendor Information
            </h2>

            <p className="text-sm text-gray-500 mt-1">
          Modify the vendor details below and save your changes.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Vendor Name
              </label>

              <input
                type="text"
                name="vendorName"
                value={formData.vendorName || ''}
               onChange={(e) =>  setFormData({...formData, vendorName: e.target.value}) }
                placeholder="Enter vendor name"
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>

          
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
               Vendor Email
              </label>

              <input
                type="email"
                name="email"
                value={formData.email || ''}
               onChange={(e) =>  setFormData({...formData, email: e.target.value}) }
                placeholder="vendorname@example.com"
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
                 value={formData.phone || ''}
               onChange={(e) =>  setFormData({...formData, phone: e.target.value}) }
                placeholder="Enter phone number"
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Vendor Address
              </label>

              <textarea
                name="address"
                 value={formData.address || ''}
                 onChange={(e) =>  setFormData({...formData, address: e.target.value}) }
                placeholder="Enter Vendor address"
                rows="3"
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 resize-none"
              />
            </div>

            <div className="flex justify-end gap-3 pt-5 border-t border-gray-100">

              <button
                type="button"
                onClick={() => navigate("/dashboard/vendors")}
                className="px-5 py-2.5 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition cursor-pointer active:scale-95"
              >
                Cancel
              </button>

              <button
                type="submit"
                 onClick={() => navigate("/dashboard/vendors")}
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

export default UpdateVendor