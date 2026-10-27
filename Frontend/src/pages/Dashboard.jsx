import React from 'react'
import Navbar from '../components/Navbar'
import DashboardHeader from '../components/DashboardHeader'
import DashboardCards from '../components/DashboardCards'
import FinanceChart from '../components/FinanceChart'
import SaleHistory from '../components/saleHistory'


const Dashboard = () => {
  return (
    <div className='min-h-screen  bg-[#F8FAFC]'>

    <Navbar />
   <DashboardHeader />
   <DashboardCards />
   <FinanceChart />
   <SaleHistory />

    </div>
  )
}

export default Dashboard