import axios from 'axios'
import React, { createContext, useEffect, useState } from 'react'
import { useAuth } from './AuthContext'

export const customerContext =  createContext()


  const CustomerProvider = ({children}) => {

      const {user} = useAuth()
    

    const [customers, setCustomers] = useState([])
    const [customer, setCustomer] = useState(null)

    async function viewCustomers() {
        try {

            const response = await axios.get('http://localhost:3000/api/customers', {withCredentials: true})

             setCustomers(response.data.customers)
             
            
        } catch (error) {
            alert(error.response?.data?.message || error.message)
        }
        
    }

    async function addCustomer(customerName, customerEmail, phone, address) {
        try {

            const response = await axios.post('http://localhost:3000/api/addcustomer', {customerName, customerEmail, phone, address}, {withCredentials: true})
            alert(response.data.message)
            setCustomer(response.data.customer)

            setCustomers((prev) => [...prev, response.data.customer])

            
        } catch (error) {
            alert(error.response?.data?.message || error.message)
        }
    }

    useEffect(()=>{
        if(user) {
            viewCustomers()
        }
    },[user])

    


  return (
      <customerContext.Provider value={{customers, addCustomer}}>
        {children}
      </customerContext.Provider>
  )
}

export default CustomerProvider