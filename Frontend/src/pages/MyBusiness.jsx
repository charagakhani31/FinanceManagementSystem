
import { useContext, useEffect, useState } from "react";
import { Building2, Mail, Phone, MapPin, ArrowLeft } from "lucide-react";
import { BusinessContext } from "../context/BusinessContext";
import {  useNavigate } from "react-router-dom";

const MyBusiness = () => {

  const navigate = useNavigate()

  const { businesses } = useContext(BusinessContext)

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-6">

      <div className="max-w-4xl mx-auto">
       <button
  onClick={() => navigate('/dashboard')}
  className="flex items-center gap-2 text-[#101828] hover:text-[#10B981] mb-5 text-lg cursor-pointer active:scale-95 font-semibold"
>
  <ArrowLeft size={18} />
  Back
</button>

        <div className="mb-8">
          <h1 className="text-2xl font-bold text-[#101828]">
            My Businesses
          </h1>
          <p className="text-gray-500 mt-2">
            View your business information.
          </p>
        </div>

    { businesses.map((business) => (
        <div key={business._id}className="bg-white border mt-5 border-gray-200 rounded-xl shadow-sm overflow-hidden">

          <div className="bg-[#101828] p-6 flex items-center gap-4">
            <div className="bg-white/10 p-3 rounded-xl">
              <Building2 size={30} className="text-white" />
            </div>

            <div>
              <h2 className="text-xl font-semibold text-white">
                {business.businessName}
              </h2>
              <p className="text-gray-300 text-sm">
                Business Profile
              </p>
            </div>
          </div>

          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">

            <div>
              <p className="text-sm text-gray-500 mb-2 flex items-center gap-2">
                <Mail size={16} /> Business Email
              </p>
              <p className="font-medium text-[#101828]">
                {business.businessEmail}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500 mb-2 flex items-center gap-2">
                <Phone size={16} /> Phone Number
              </p>
              <p className="font-medium text-[#101828]">
                {business.phone}
              </p>
            </div>

            <div className="md:col-span-2">
              <p className="text-sm text-gray-500 mb-2 flex items-center gap-2">
                <MapPin size={16} /> Business Address
              </p>
              <p className="font-medium text-[#101828]">
                {business.address}
              </p>
            </div>
            
          </div>

        </div>
    
        ))}
      </div>

    </div>
  )
}

export default MyBusiness;
