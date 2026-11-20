import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import AuthProvider from './context/AuthContext.jsx'
import DashboardProvider from './context/DashboardContext.jsx'
import BusinessProvider from './context/BusinessContext.jsx'
import CustomerProvider from './context/CustomerContext.jsx'
import ProductProvider from './context/ProductContext.jsx'
import VendorsProvider from './context/VendorsContext.jsx'

createRoot(document.getElementById('root')).render(
 <BrowserRouter>
 <AuthProvider>
   <DashboardProvider>
    <BusinessProvider >
      <CustomerProvider>
        <ProductProvider>
          <VendorsProvider>
    <App />
    </VendorsProvider>
    </ProductProvider>
   </CustomerProvider>
    </BusinessProvider>
    </DashboardProvider>
    </AuthProvider>
 </BrowserRouter>
)
