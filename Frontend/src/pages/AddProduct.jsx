import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { productContext } from "../context/ProductContext";
import { DashboardContext } from "../context/DashboardContext";

const AddProduct = () => {

    const { addProduct } = useContext(productContext)
     const { fetchData } = useContext(DashboardContext)


  const navigate = useNavigate();

   const [productName, setProductName] = useState("");
   const [sku, setSku] = useState("");
   const [description, setDescription] = useState("");
   const [purchasePrice, setPurchasePrice] = useState("");
   const [sellingPrice, setSellingPrice] = useState("");
   const [quantity, setQuantity] = useState("")


  const handleSubmit = async (e) => {
    e.preventDefault();

    await addProduct(productName, sku, description, purchasePrice, sellingPrice, quantity)

    fetchData()
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-6">

      <div className="max-w-3xl mx-auto">
  <button
  onClick={() => navigate('/dashboard/products')}
  className="flex items-center gap-2 text-[#101828] hover:text-[#10B981] mb-5 text-lg cursor-pointer active:scale-95 font-semibold"
>
  <ArrowLeft size={18} />
  Back
</button>
        
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-[#101828]">
           Add New Product
          </h1>

          <p className="text-gray-500 mt-2">
            Create a product or service item to speed up invoicing and track sales.
          </p>
        </div>

       
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 md:p-8">

          <div className="mb-7">
            <div className="w-12 h-12 bg-emerald-50 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">📦</span>
            </div>

            <h2 className="text-lg font-semibold text-[#101828]">
             Product Information
            </h2>

            <p className="text-sm text-gray-500 mt-1">
            Enter your product details and pricing below.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Name
              </label>

              <input
                type="text"
                name="ProductName"
                value={productName}
               onChange={(e)=> { setProductName(e.target.value) }}
                placeholder="Enter product name"
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>

    
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
               SKU
              </label>

              <input
                type="text"
                name="sku"
                value={sku}
                onChange={(e)=> { setSku(e.target.value) }}
                placeholder="e.g., ELEC-HD-042"
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
                name="phone"
                value={description}
                onChange={(e)=> { setDescription(e.target.value) }}
                placeholder="Enter description"
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Purchase Price
              </label>

              <input
                name="number"
                value={purchasePrice}
                onChange={(e)=> { setPurchasePrice(e.target.value) }}
                placeholder="Enter purchase Price"
                rows="3"
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 resize-none"
              />
            </div>

             <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Selling Price
              </label>

              <input
                name="number"
                value={sellingPrice}
                onChange={(e)=> { setSellingPrice(e.target.value) }}
                placeholder="Enter selling Price"
                rows="3"
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 resize-none"
              />
            </div>

             <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quantity
              </label>

              <input
                name="number"
                value={quantity}
                onChange={(e)=> { setQuantity(e.target.value) }}
                placeholder="Enter Quantity"
                rows="3"
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 resize-none"
              />
            </div>

            <div className="flex justify-end gap-3 pt-5 border-t border-gray-100">

              <button
                type="button"
                onClick={() => navigate("/dashboard/products")}
                className="px-5 py-2.5 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition cursor-pointer active:scale-95"
              >
                Cancel
              </button>

              <button
                type="submit"
                 onClick={() => navigate("/dashboard/products")}
                className="px-5 py-2.5 rounded-lg bg-[#10B981] text-white font-medium hover:bg-[#059669] transition cursor-pointer active:scale-95 "
              >
                Add Product
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

export default AddProduct