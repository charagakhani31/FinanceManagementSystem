import { createContext, useEffect, useState } from "react"
import { useAuth } from './AuthContext'
import axios from "axios"

export const ExpenseContext = createContext()

const ExpenseProvider = ({children}) => {

    const {user} = useAuth()

    const [expenses, setExpenses] = useState([])
    const [searchQuery, setSearchQuery] = useState('')
    const [expense, setExpense] = useState(null)
    const [editingExpense, setEditingExpense] = useState(null)

     const filteredExpenses = expenses.filter((expense) => 
                   expense.title?.toLowerCase().includes(searchQuery.toLocaleLowerCase()));

    async function getExpenses() {
            try {
    
                const response = await axios.get('http://localhost:3000/api/expenses', { withCredentials: true})
                                          
                setExpenses(response.data.expenses)
    
            } catch (error) {
                alert(error.response?.data?.message || error.message)
                
            }
        }

          async function addExpense(title, category, amount, description, date) {
                try {
        
                    const response = await axios.post('http://localhost:3000/api/expenses',
                         {title, category, amount, description, date},
                          { withCredentials: true})
        
                     alert(response.data.message)
                     setExpense(response.data.expense)
        
                     setExpenses((prev) => [...prev, response.data.expense])
                    
                } catch (error) {
                    alert(error.response?.data?.message || error.message)
                }
            }
        
            async function deleteExpense(expenseID) {
                    try {
            
                    const response = await axios.delete(`http://localhost:3000/api/expense/${expenseID}`, {withCredentials: true})
            
                       alert(response.data.message)
            
                     if(response.status === 200 ) {
                        setExpenses((prev) => prev.filter((expense) => expense._id != expenseID))
                     }
                        
                    } catch (error) {
                        alert(error.response?.data?.message || error.message)
                    }
                }
        
            async function editExpense(expenseID, {amount, description}) {
                try {
        
                    const response = await axios.patch(`http://localhost:3000/api/expense/${expenseID}`, 
                                          {amount, description},
                                           { withCredentials: true})
        
                                   alert(response.data.message)
                                 if(response.status === 200 ) {
                        setExpenses((prev) =>
                        prev.map((expense) =>
                    expense._id === expenseID ? {...expense, amount, description } : expense))
                 }                       
                    
                } catch (error) {
                    alert(error.response?.data?.message || error.message)
                }
                
            }

useEffect(() => {
    if (user) {
        getExpenses()
    }
}, [user])

  return (
   <ExpenseContext.Provider value={{filteredExpenses, searchQuery,
                                    setSearchQuery, editingExpense, setEditingExpense,
                                    addExpense, expenses, deleteExpense, editExpense}} >
      {children}
   </ExpenseContext.Provider>
  )
}

export default ExpenseProvider