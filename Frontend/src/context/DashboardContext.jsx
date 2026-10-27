import { createContext, useEffect, useState } from "react";
import axios from 'axios';

export const DashboardContext = createContext();

const DashboardProvider = ({children}) => {

    const [dashboardData, setDashboardData] = useState({
  totalSales: 0,
  totalPaymentsReceived: 0,
  totalOutstanding: 0,
  totalExpenses: 0,
  totalProducts: 0,
  lowStockProducts: 0
})
  const [saleHistory, setSaleHistory] = useState([])

      async function fetchData() {

        try {

            const response = await axios.get('http://localhost:3000/api/dashboard', { withCredentials: true})
             
              setDashboardData(response.data.summary)
            
        } catch (error) {

           alert(error.response?.data?.message || error.message)
            
        }
        
      }

      async function getSalesHistory() {

        try {
          const response = await axios.get("http://localhost:3000/api/history", {withCredentials: true})

          setSaleHistory(response.data.sales)
          
          
        } catch (error) {
           alert(error.response?.data?.message || error.message)
        }
        
      }

      useEffect(()=> {
        fetchData();
        getSalesHistory()
      }, [])

    
      

    return (
                <DashboardContext.Provider value={{dashboardData, saleHistory}}>
              {children}
                </DashboardContext.Provider>
        )
    }

    
 export default DashboardProvider
