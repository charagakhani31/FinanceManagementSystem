import {
  TrendingUp,
  Wallet,
  ChartNoAxesCombined,
  Clock
} from "lucide-react";
import { useContext } from "react";
import { DashboardContext } from "../context/DashboardContext";


const DashboardCards = () => {

    const { dashboardData } = useContext(DashboardContext);

  return (
    <div className="grid grid-cols-2 gap-5 px-5 py-5">

      <div className="min-h-36 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between pb-5">
          <h4 className="text-sm font-medium text-gray-500">
            Total Sales
          </h4>
          <TrendingUp className="text-emerald-500" size={22} />
        </div>
        <p className="mt-4 text-2xl font-semibold text-gray-900">
         {dashboardData.totalSales}
        </p>
      </div>

      <div className="min-h-36 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between pb-5">
          <h4 className="text-sm font-medium text-gray-500">
            Total Expenses
          </h4>
          <Wallet className="text-emerald-500" size={22} />
        </div>
        <p className="mt-4 text-2xl font-semibold text-gray-900">
          {dashboardData.totalExpenses}
        </p>
      </div>

      <div className="min-h-36 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between pb-5">
          <h4 className="text-sm font-medium text-gray-500">
           Total Payments Received
          </h4>
          <ChartNoAxesCombined className="text-emerald-500" size={22} />
        </div>
        <p className="mt-4 text-2xl font-semibold text-gray-900">
          {dashboardData.totalPaymentsReceived}
        </p>
      </div>

      <div className="min-h-36 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between pb-5">
          <h4 className="text-sm font-medium text-gray-500">
            Outstanding Payments
          </h4>
          <Clock className="text-emerald-500" size={22} />
        </div>
        <p className="mt-4 text-2xl font-semibold text-gray-900">
          {dashboardData.totalOutstanding}
        </p>
      </div>

      <div className="min-h-36 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between pb-5">
          <h4 className="text-sm font-medium text-gray-500">
           Total Products
          </h4>
          <Wallet className="text-emerald-500" size={22} />
        </div>
        <p className="mt-4 text-2xl font-semibold text-gray-900">
          {dashboardData.totalProducts}
        </p>
      </div>

      <div className="min-h-36 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between pb-5">
          <h4 className="text-sm font-medium text-gray-500">
            Low Stock Products
          </h4>
          <Wallet className="text-emerald-500" size={22} />
        </div>
        <p className="mt-4 text-2xl font-semibold text-gray-900">
          {dashboardData.lowStockProducts}
        </p>
      </div>

    </div>
  );
};

export default DashboardCards;
