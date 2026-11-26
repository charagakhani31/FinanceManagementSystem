import React from 'react'
import { ArrowLeft } from "lucide-react";
import CustomerSelect from '../components/CustomerSelect';
import ProductSelect from '../components/ProductSelect';
import { useNavigate } from 'react-router-dom';

const CreateSale = () => {

 const navigate =  useNavigate()

  return (
    <div className='min-h-screen bg-[#F8FAFC] p-6 md:flex md:flex-col md:justify-center'>
    <div className="max-w-3xl mx-auto border rounded-lg p-6 border-gray-500 ">
  <button
  onClick={() => navigate('/dashboard')}
  className="flex items-center gap-2 text-[#101828] hover:text-[#10B981] mb-5 text-lg cursor-pointer active:scale-95 font-semibold"
>
  <ArrowLeft size={18} />
  Back
</button>

  <div className="mb-8">
          <h1 className="text-2xl font-bold text-[#101828]">
           Create New Sale
          </h1>

          <p className="text-gray-500 mt-2">
           Record a new customer sale.
          </p>
        </div>

         <hr className='border-0 border-t-2 my-3 border-[#ccc]'/>

        <CustomerSelect />
        <ProductSelect />
</div>
    </div>
  )
}

export default CreateSale