import { createContext, useEffect, useState } from "react";
import axios from 'axios';
import { useAuth } from "./AuthContext";

export const DashboardContext = createContext();

const DashboardProvider = ({children}) => {

 const {user} = useAuth()

  const [dashboardData, setDashboardData] = useState({
  totalSales: 0,
  totalPaymentsReceived: 0,
  totalOutstanding: 0,
  totalExpenses: 0,
  totalProducts: 0,
  lowStockProducts: 0,
  inStockProducts: 0
})

  const [saleHistory, setSaleHistory] = useState([])
  const [chartData, setChartData] = useState([]);

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
          const response = await axios.get("http://localhost:3000/api/history",  {withCredentials: true})

          setSaleHistory(response.data.sales)
          
          
        } catch (error) {
           alert(error.response?.data?.message || error.message)
        }
        
      }

      async function getchartData() {
        try {

           const response = await axios.get("http://localhost:3000/api/chart",  {withCredentials: true})

const sales = response.data.totalSales;
const expenses = response.data.totalExpenses;

const chartData = sales.map((sale) => {

  const expense = expenses.find(
    (item) =>
      item._id.month === sale._id.month &&
      item._id.year === sale._id.year
  );

  return {
    month: new Date(
      sale._id.year,
      sale._id.month - 1
    ).toLocaleString("en-US", { month: "long" }),

    sales: sale.totalAmount,

    expenses: expense ? expense.totalAmount : 0
  };

});

  setChartData(chartData)

        } catch (error) {
          alert(error.response?.data?.message || error.message)
        }
      }

      
      

      useEffect(()=> {
        if(user) {
        fetchData()
        getSalesHistory()
        getchartData()
        }
      }, [user])

    return (
                <DashboardContext.Provider value={{dashboardData, saleHistory, setSaleHistory ,fetchData, getSalesHistory,
                                                    getchartData, chartData}}>
              {children}
                </DashboardContext.Provider>
        )
    }

 export default DashboardProvider
