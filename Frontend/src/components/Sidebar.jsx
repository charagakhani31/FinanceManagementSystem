import React, { useContext } from 'react'
import Logo from './logo'
import {
  X,
  LayoutDashboard,
  Users,
  Package,
  ShoppingCart,
  Receipt,
  Truck, LogOut
} from 'lucide-react'
import { AuthContext } from '../context/AuthContext'

const Sidebar = ({ setSidebar }) => {
  

const {logOut} = useContext(AuthContext);

 const handleLogout = async () => {
  await logOut();
};

  return (
  <div className='fixed inset-0 z-50 bg-black/50'>

      <div className='relative flex flex-col bg-[#101828] w-72 max-w-[85vw] h-full overflow-hidden'>

        <div className='flex justify-between items-center px-4 py-5'>
          <Logo textColor="text-white"/>

          <button onClick={() => setSidebar(false)}>
            <X
              size={23}
              strokeWidth={2}
              className='text-white cursor-pointer active:scale-95'
            />
          </button>
        </div>

        <div className='flex-1 overflow-y-auto px-6 py-4 flex flex-col gap-5 text-gray-300 font-medium'>

          <div className='flex items-center gap-3 cursor-pointer active:scale-95 hover:text-[#10B981]'>
            <LayoutDashboard size={20} />
            <h3>Dashboard</h3>
          </div>

          <div className='flex items-center gap-3 cursor-pointer active:scale-95 hover:text-[#10B981]'>
            <Users size={20} />
            <h3>Customers</h3>
          </div>

          <div className='flex items-center gap-3 cursor-pointer active:scale-95 hover:text-[#10B981]'>
            <Package size={20} />
            <h3>Products</h3>
          </div>

          <div className='flex items-center gap-3 cursor-pointer active:scale-95 hover:text-[#10B981]'>
            <ShoppingCart size={20} />
            <h3>Sales</h3>
          </div>

          <div className='flex items-center gap-3 cursor-pointer active:scale-95 hover:text-[#10B981]'>
            <Receipt size={20} />
            <h3>Expenses</h3>
          </div>

          <div className='flex items-center gap-3 cursor-pointer active:scale-95 hover:text-[#10B981]'>
            <Truck size={20} />
            <h3>Vendors</h3>
          </div>
        </div>

<div className='shrink-0 px-6 py-5 border-t border-gray-700'>
  <button className='flex items-center gap-3 text-gray-300 font-medium hover:text-[#10B981] cursor-pointer active:scale-95'
  onClick={handleLogout} 
  >
    <LogOut size={20} />
    <span>Logout</span>
  </button>
</div>

      </div>
    </div>
  )
}

export default Sidebar
