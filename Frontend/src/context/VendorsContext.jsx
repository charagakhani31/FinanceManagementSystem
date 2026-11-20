import React, { createContext, useEffect, useState } from 'react'
import { useAuth } from './AuthContext'
import axios from 'axios'
export const VendorsContext = createContext()

const VendorsProvider = ({children}) => {

   const {user} = useAuth()

   const [vendors, setVendors] = useState([])
   const [searchQuery, setSearchQuery] = useState("")
   const [vendor, setVendor] = useState(null)
   const [editingvendor, setEditingVendor] = useState(null)

   const filteredVendors = vendors.filter((v) => 
                 v.vendorName?.toLowerCase().includes(searchQuery.toLocaleLowerCase()))

   async function getVendors() {

    try {

        const response = await axios.get('http://localhost:3000/api/vendors', { withCredentials: true})

             setVendors(response.data.vendors)
        
    } catch (error) {
        alert(error.response?.data?.message || error.message)
    }
    
   }

   async function addVendor(vendorName, email, phone, address) {
     try {

        const response = await axios.post('http://localhost:3000/api/create/vendor', 
                                           {vendorName, email, phone, address},
                                           { withCredentials: true})
                  alert(response.data.message)
                  setVendor(response.data.vendor)       
                  
                  setVendors((prev) => [...prev, response.data.vendor])
        
     } catch (error) {
        alert(error.response?.data?.message || error.message)
     }
   }

   async function deleteVendor(vendorID) {
    
    try {

        const response = await axios.delete(`http://localhost:3000/api/delete/vendor/${vendorID}`, { withCredentials: true})

             alert(response.data.message)

              if(response.status === 200 ) {
                setVendors((prev) => prev.filter((vendor) => vendor._id != vendorID))
             }
        
    } catch (error) {
        alert(error.response?.data?.message || error.message)
    }

   }

     async function editVendor(vendorID, {vendorName, email, phone, address}) {
        try {

            const response = await axios.patch(`http://localhost:3000/api/update/vendor/${vendorID}`, 
                                  {vendorName, email, phone, address},
                                   { withCredentials: true})

                           alert(response.data.message)

                         if(response.status === 200 ) {
                setVendors((prev) =>
                prev.map((v) =>
            v._id === vendorID ? {...v, vendorName, email, phone, address} : v))
         }                       
            
        } catch (error) {
            alert(error.response?.data?.message || error.message)
        }
        
    }



   useEffect(() => {
    if(user) {
        getVendors()
    }
   }, [user])

  return (
    <VendorsContext.Provider value={{vendors, filteredVendors, searchQuery,
                                     setSearchQuery, addVendor, deleteVendor,
                                     editingvendor, setEditingVendor, editVendor}}>
        {children}
    </VendorsContext.Provider>
  )
}

export default VendorsProvider