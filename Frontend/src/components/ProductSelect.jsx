
import React from 'react'
import { useContext } from 'react'
import { productContext } from '../context/ProductContext'
import { useState } from 'react'
import { Trash2 } from 'lucide-react'
import { SaleContext } from '../context/SaleContext'
import { useNavigate } from 'react-router-dom'
import { DashboardContext } from '../context/DashboardContext'
import { customerContext } from '../context/CustomerContext'

const ProductSelect = () => {

  const navigate = useNavigate()

   const { setSearchQuery: setCustomerSearchQuery } = useContext(customerContext);
    const { filteredProducts, searchQuery, setSearchQuery } = useContext(productContext)
    const {items, setItems, amountPaid, setAmountPaid, setCustomer, createSale} = useContext(SaleContext)
     const { getSalesHistory,  fetchData } = useContext(DashboardContext)

    const [isOpen, setIsOpen] = useState(false)

    function removeProduct(productId) {
      const updatedProducts = items.filter(
        (item) => item.product !== productId
      )

      setItems(updatedProducts)
    }

  

    const calculateTotalAmount = items.reduce((sum, item) =>  sum + (item.quantity * item.unitPrice), 0)

 

    const calculateOutstanding = calculateTotalAmount - amountPaid;

    let paymentStatus;
     
    if(amountPaid === 0) {
      paymentStatus = "unpaid"
    }

    else if(amountPaid < calculateTotalAmount) {
      paymentStatus = "partially_paid"
    }

    else {
      paymentStatus = "paid"
    }
    

    function updateQuantity(index, value) {
      const updatedProducts = [...items]

      updatedProducts[index].quantity = Number(value)

      setItems(updatedProducts)
    }

    const handleSubmit = async (e) => {
      e.preventDefault();

       try {
      await createSale();

      setCustomerSearchQuery("")
      setSearchQuery("")
      setItems([])
      setAmountPaid(0)

       fetchData()
      getSalesHistory()
      navigate('/dashboard');
    } catch (error) {
      console.error('Failed to create sale:', error);
    }

    
    }

  return (
     <div>
            <h2 className="text-xl font-semibold text-[#101828] my-4">
                Product Information
            </h2>


  <form onSubmit={handleSubmit}>
         <div className="relative">

  <input
    type="text"
    value={searchQuery}
    onChange={(e) => {
      setSearchQuery(e.target.value);
      setIsOpen(true);
    }}
    placeholder="Search Product"
    onClick={() => setIsOpen(true)}
    className="w-full border rounded-lg px-3 py-2"
  />

  {isOpen && searchQuery.trim() !== "" && (
    <div className="absolute w-full bg-white border rounded-lg mt-1 z-10">

      {filteredProducts.length > 0 ? (
        filteredProducts.map((product) => (
          <div
            key={product._id}
            onClick={() => {

              const alreadyAdded = items.some(
                (item) => item.product === product._id
              );

              if (alreadyAdded) {
                alert("Product already added");
                return;
              }

              setItems([
                ...items,
                {
                  product: product._id,
                  productName: product.productName,
                  quantity: 1,
                  unitPrice: product.sellingPrice
                }
              ]);

              setSearchQuery("");
              setIsOpen(false);
            }}
            className="p-3 cursor-pointer hover:bg-gray-100"
          >
            {product.productName}
          </div>
        ))
      ) : (
        <p className="p-3 text-gray-500">
          No products found
        </p>
      )}

    </div>
  )}

</div>

     <div className="mt-5 space-y-3">

  {items.map((item, index) => (

    <div key={item.product} className="border rounded-lg p-4">

      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-[#101828]">
          {item.productName}
        </h3>

        <button
          type="button"
          onClick={() => removeProduct(item.product)}
          className="text-red-500 hover:text-red-700"
        >
          <Trash2 size={18} />
        </button>
      </div>

      <div className="flex gap-5 items-center mt-3">

        <div>
          <label className="text-sm text-gray-500">
            Quantity
          </label>

          <input
            type="number"
            min="1"
            value={item.quantity}
            onChange={(e) => updateQuantity(index, e.target.value)}
            className="w-full border rounded-lg px-3 py-2 mt-1"
          />
        </div>

        <div>
          <label className="text-sm text-gray-500">
            Unit Price
          </label>

          <p className="font-semibold mt-3">
            Rs. {item.unitPrice}
          </p>
        </div>

        <div>
          <label className="text-sm text-gray-500">
            Subtotal
          </label>

          <p className="font-semibold mt-3">
            Rs. {item.quantity * item.unitPrice}
          </p>
        </div>

      </div>

    </div>

  ))}
</div>

       <h2 className="text-xl font-semibold text-[#101828] my-4">
                Payment Information
            </h2>

      <div className="mt-5 border rounded-lg p-4 md:flex md:justify-between md:gap-4">
      <div>
         <label className="text-sm font-medium text-gray-600">
          Total Amount
        </label>
         <div className='w-full border px-3 rounded-lg md:pr-30 py-2 mt-2'>
          Rs. {calculateTotalAmount}
          </div>
        </div>

  <div>
        <label className="text-sm font-medium text-gray-600">
          Amount Paid
        </label>

        <input
          type="number"
          value={amountPaid}
          onChange={(e) => setAmountPaid(Number(e.target.value))}
          placeholder="Enter amount paid"
          className="w-full border rounded-lg px-3 py-2 mt-2"
        />
        </div>

      </div>

      <div className='flex justify-between items-center'>
        <div>
         <h2 className="text-xl font-semibold text-[#101828] mt-4">
               Outstanding
            </h2>
            <p className="text-gray-500 text-sm font-medium">
           Payment status: {paymentStatus}
          </p>
          </div>
         
         <div>
          <div className='w-full px-3 font-semibold text-lg text-center py-2 mt-2'>
          Rs. {calculateOutstanding}
          </div>
          </div>
      </div>

      <div>
        <button type='submit' 
        className='w-full text-center mt-6 py-2.5 rounded-lg bg-[#10B981] text-white font-medium hover:bg-[#059669] transition cursor-pointer active:scale-95'>
            Create Sale
        </button>
      </div>
      </form>

    </div>
  )
}

export default ProductSelect
