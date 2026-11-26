import React from 'react'
import ExpenseHeader from '../components/ExpenseHeader'
import ExpenseList from '../components/ExpenseList'

const Expenses = () => {
  return (
    <div className='min-h-screen bg-[#F8FAFC] p-6' >
        <ExpenseHeader />
        <ExpenseList />
    </div>
  )
}

export default Expenses