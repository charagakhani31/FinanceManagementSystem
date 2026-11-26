import { useContext } from 'react'
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid
} from 'recharts'
import { DashboardContext } from '../context/DashboardContext'

const FinanceChart = () => {

  const { chartData } = useContext(DashboardContext)
             
  return (
    <div className="bg-white p-5 rounded-xl border border-gray-200">
      <h2 className="text-lg font-semibold text-[#101828] mb-5">
        Sales vs Expenses
      </h2>

      <div className="w-full h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="month" />
            <YAxis />

            <Tooltip />
            <Legend />

            <Bar dataKey="sales" fill="#10B981" />
            <Bar dataKey="expenses" fill="#101828" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default FinanceChart
