import axios from 'axios'
import React, { createContext, useEffect, useState } from 'react'
import { useAuth } from './AuthContext'

export const customerContext =  createContext()


  const CustomerProvider = ({children}) => {

      const {user} = useAuth()
    

    const [customers, setCustomers] = useState([])
    const [customer, setCustomer] = useState(null)
    const [editingCustomer, setEditingCustomer] = useState(null)
    const [searchQuery, setSearchQuery] = useState('')

    const filteredCustomers = customers.filter((customer) => 
                   customer.customerName?.toLowerCase().includes(searchQuery.toLocaleLowerCase()));

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

    async function editCustomer(customerID, {customerName, customerEmail, phone, address}) {
        try {

            const response = await axios.patch(`http://localhost:3000/api/update/customer/${customerID}`, 
                                   {customerName, customerEmail, phone, address},
                                   { withCredentials: true})

                           alert(response.data.message)
        if(response.status === 200 ) {
            setCustomers((prev) =>
                prev.map((customer) =>
            customer._id === customerID ? {...customer, customerName, customerEmail, phone, address} : customer))
         }                       
            
        } catch (error) {
            alert(error.response?.data?.message || error.message)
        }
        
    }

    async function deleteCustomer(customerID) {
        try {

        const response = await axios.delete(`http://localhost:3000/api/delete/customer/${customerID}`, {withCredentials: true})

           alert(response.data.message)

         if(response.status === 200 ) {
            setCustomers((prev) => prev.filter((customer) => customer._id != customerID))
         }
            
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
      <customerContext.Provider value={{customers, addCustomer, deleteCustomer,
                                        editingCustomer, setEditingCustomer,
                                        editCustomer, filteredCustomers,
                                        searchQuery, setSearchQuery}}>
        {children}
      </customerContext.Provider>
  )
}

export default CustomerProvider