import React from 'react'
import Login from './pages/Login'
import { Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Register from './pages/Register'
import ProtectedRoute from './components/ProtectedRoute'
import BusinessCreate from './pages/BusinessCreate'
import MyBusiness from './pages/MyBusiness'
import Customer from './pages/Customer'
import AddCustomer from './pages/AddCustomer'
import UpdateCustomer from './pages/UpdateCustomer'
import Product from './pages/Product'
import AddProduct from './pages/AddProduct'
import UpdateProduct from './pages/UpdateProduct'
import Vendors from './pages/Vendors'
import AddVendor from './pages/AddVendor'
import UpdateVendor from './pages/UpdateVendor'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>

        <Route element={<ProtectedRoute />} >
          <Route path='/dashboard' element={<Dashboard/>}/>
          <Route path='/dashboard/createbusiness' element={<BusinessCreate />} />
           <Route path='/dashboard/mybusiness' element={<MyBusiness />} />
           <Route path='/dashboard/customers' element={<Customer />} />
           <Route path='/dashboard/customers/addcustomer' element={<AddCustomer />} />
           <Route path='/dashboard/customers/editcustomer' element={<UpdateCustomer />} />
           <Route path='/dashboard/products' element={<Product />} />
           <Route path='/dashboard/products/addproduct' element={<AddProduct />} />
          <Route path='/dashboard/products/editproduct' element={<UpdateProduct />} />
           <Route path='/dashboard/vendors' element={<Vendors />} />
           <Route path='/dashboard/vendors/addvendor' element={<AddVendor />} />
           <Route path='/dashboard/vendors/editvendor' element={<UpdateVendor />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App