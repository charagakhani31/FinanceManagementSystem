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

const data = [
  { month: 'Jan', income: 50000, expenses: 20000 },
  { month: 'Feb', income: 65000, expenses: 30000 },
  { month: 'Mar', income: 45000, expenses: 25000 },
  { month: 'Apr', income: 80000, expenses: 40000 },
]

const FinanceChart = () => {
  return (
    <div className="bg-white p-5 rounded-xl border border-gray-200">
      <h2 className="text-lg font-semibold text-[#101828] mb-5">
        Income vs Expenses
      </h2>

      <div className="w-full h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="month" />
            <YAxis />

            <Tooltip />
            <Legend />

            <Bar dataKey="income" fill="#10B981" />
            <Bar dataKey="expenses" fill="#101828" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default FinanceChart
