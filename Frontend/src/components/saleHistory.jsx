import React, { useContext } from 'react'
import { Search, Eye, Plus, Filter } from 'lucide-react'
import { DashboardContext } from '../context/DashboardContext'

const SaleHistory = () => {

    const { saleHistory } = useContext(DashboardContext)

    console.log(saleHistory);
    console.log(saleHistory[0].customer);
    
     console.log(saleHistory[0].customer.customerName);
    

  const sales = [
    {
      id: 'SAL-001',
      customer: 'Ali Khan',
      date: '25 Oct 2026',
      totalAmount: 25000,
      amountPaid: 25000,
      status: 'Paid'
    },
    {
      id: 'SAL-002',
      customer: 'Ahmed Ali',
      date: '24 Oct 2026',
      totalAmount: 40000,
      amountPaid: 20000,
      status: 'Partially Paid'
    },
    {
      id: 'SAL-003',
      customer: 'Sara Ahmed',
      date: '23 Oct 2026',
      totalAmount: 15000,
      amountPaid: 0,
      status: 'Unpaid'
    },
    {
      id: 'SAL-004',
      customer: 'Usman Khan',
      date: '22 Oct 2026',
      totalAmount: 30000,
      amountPaid: 30000,
      status: 'Paid'
    }
  ]

  return (
    <div className='min-h-screen bg-[#F8FAFC] p-4 md:p-6'>

     
      <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6'>
        <div>
          <h1 className='text-2xl font-bold text-[#101828]'>
            Sale History
          </h1>
          <p className='text-sm text-gray-500 mt-1'>
            View and manage all your sales.
          </p>
        </div>

        <button className='flex items-center justify-center gap-2 rounded-lg bg-[#10B981] px-4 py-2.5 font-medium text-white hover:bg-[#059669]'>
          <Plus size={20} />
          Add Sale
        </button>
      </div>

     
      <div className='flex flex-col gap-3 sm:flex-row sm:items-center mb-5'>

        <div className='flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2.5 sm:max-w-sm sm:flex-1'>
          <Search size={20} className='text-gray-400' />
          <input
            type='text'
            placeholder='Search by customer or sale ID'
            className='w-full outline-none text-sm'
          />
        </div>

        <button className='flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-600 hover:bg-gray-50'>
          <Filter size={18} />
          Filters
        </button>

      </div>

      <div className='overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm'>

        <div className='overflow-x-auto'>
          <table className='w-full min-w-[850px] text-left'>

            <thead className='bg-gray-50 text-sm text-gray-500'>
              <tr>
                <th className='px-5 py-4 font-medium'>Sale ID</th>
                <th className='px-5 py-4 font-medium'>Customer</th>
                <th className='px-5 py-4 font-medium'>Date</th>
                <th className='px-5 py-4 font-medium'>Total Amount</th>
                <th className='px-5 py-4 font-medium'>Amount Paid</th>
                <th className='px-5 py-4 font-medium'>Outstanding</th>
                <th className='px-5 py-4 font-medium'>Status</th>
                <th className='px-5 py-4 font-medium'>Action</th>
              </tr>
            </thead>

            <tbody className='divide-y divide-gray-100 text-sm'>

              {saleHistory.map((sale) => (
                <tr key={sale._id} className='hover:bg-gray-50'>

                  <td className='px-5 py-4 font-medium text-[#101828]'>
                    {sale._id}
                  </td>

                  <td className='px-5 py-4 text-gray-700'>
                    {sale.customer.customerName}
                    
                  </td>

                  <td className='px-5 py-4 text-gray-500'>
                    {new Date(sale.createdAt).toLocaleDateString()}
                  </td>

                  <td className='px-5 py-4 text-gray-700'>
                    PKR {sale.totalAmount.toLocaleString()}
                  </td>

                  <td className='px-5 py-4 text-gray-700'>
                    PKR {sale.amountPaid.toLocaleString()}
                  </td>

                  <td className='px-5 py-4 text-gray-700'>
                    PKR {(sale.totalAmount - sale.amountPaid).toLocaleString()}
                  </td>

                  <td className='px-5 py-4'>
                    <span className={`rounded-full px-3 py-1 text-xs font-medium ${
                      sale.paymentStatus === 'paid'
                        ? 'bg-green-100 text-green-700'
                        : sale.paymentStatus === 'unpaid'
                        ? 'bg-red-100 text-red-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {sale.paymentStatus}
                    </span>
                  </td>

                  <td className='px-5 py-4'>
                    <button
                      title='View sale'
                      className='rounded-md p-2 text-gray-500 hover:bg-emerald-50 hover:text-[#059669]'
                    >
                      <Eye size={18} />
                    </button>
                  </td>

                </tr>
              ))}

            </tbody>

          </table>
        </div>

        {/* Table Footer */}
        <div className='border-t border-gray-200 px-5 py-4 text-sm text-gray-500'>
          Showing {sales.length} sales
        </div>

      </div>

    </div>
  )
}

export default SaleHistory
