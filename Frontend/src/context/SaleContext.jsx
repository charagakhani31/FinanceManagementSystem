import axios from 'axios'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { useAuth } from './AuthContext'


export const SaleContext = createContext()

const SaleProvider = ({children}) => {

    const {user} = useAuth()


     const [customer, setCustomer] = useState(null)
     const [items, setItems] = useState([])
     const [amountPaid, setAmountPaid] = useState(0)
     const [sales, setSales] = useState([])
     const [sale, setSale] = useState(null)
      const [searchQuery, setSearchQuery] = useState('')
      const [selectedSale, setSelectedSale] = useState(null)

       const filteredSales = sales.filter((sale) => 
                    (sale?.customer?.customerName || "").toLowerCase().includes(searchQuery.toLocaleLowerCase()));
       
       
        async function getSales() {
        try {

            const response = await axios.get('http://localhost:3000/api/sales', { withCredentials: true})
            
            setSales(response.data.sales)

        } catch (error) {
            alert(error.response?.data?.message || error.message)
        }
     }

async function createSale() {
        
        try {

            const response = await axios.post('http://localhost:3000/api/sales',
                                               {customer, items, amountPaid},
                                                { withCredentials: true})
                       alert(response.data.message)
                        setSale(response.data.sale)   
                        
                         setSales((prev) => [...prev, response.data.sale])
        
        } catch (error) {
            alert(error.response?.data?.message || error.message)
        }
     }

      async function editSale(saleID, amountPaid) {
        try {

            const response = await axios.patch(`http://localhost:3000/api/update/sales/${saleID}`, 
                                  {amountPaid},
                                   { withCredentials: true})

                           alert(response.data.message)
                         if(response.status === 200 ) {
               setSales((prev) =>
    prev.map((sale) =>
      sale._id === saleID
        ? {
            ...sale,
            ...response.data.updatedSale,
            customer: sale.customer, 
          }
        : sale
    )
  );
    }                     
            
        } catch (error) {
            alert(error.response?.data?.message || error.message)
        }
        
    }


     useEffect(() => {
        if (user) {
        getSales()
        }
     },[user])

  return (
    <SaleContext.Provider value={{customer, setCustomer,
                                 items, setItems, amountPaid, setAmountPaid, createSale
                                 ,searchQuery, setSearchQuery, sales, filteredSales,
                                 selectedSale,setSelectedSale, editSale}}>
        {children}
    </SaleContext.Provider>
  )
}

export default SaleProvider