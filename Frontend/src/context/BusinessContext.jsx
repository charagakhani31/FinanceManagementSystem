import axios from 'axios'
import React, { createContext, useEffect, useState } from 'react'
import { useAuth } from './AuthContext'

export const BusinessContext = createContext()

const BusinessProvider = ({children}) => {

    const {user} = useAuth()

    const [business, setBusiness] = useState(null)

    const [businesses, setbusinesses] = useState([])

async function register(businessName, businessEmail, phone, address) {
    try {

        const response = await axios.post('http://localhost:3000/api/create/business', {businessName, businessEmail, phone, address}, {withCredentials: true})

         alert(response.data.message)
         setBusiness(response.data.business)
        
    } catch (error) {
        alert(error.response?.data?.message || error.message)
    }
}

async function viewBusiness() {
    try {
          const response = await axios.get("http://localhost:3000/api/business",  {withCredentials: true})

          setbusinesses(response.data.businesses)
          
        } catch (error) {
           alert(error.response?.data?.message || error.message)
        }   
      
}

 useEffect(()=> {
    if(user) {
        viewBusiness()
    }
 },[user])


  return (
            <BusinessContext.Provider value={{register, businesses}}>
                {children}
            </BusinessContext.Provider>
        )
  
}

export default BusinessProvider