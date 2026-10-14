import React from 'react'
import Login from './pages/Login'
import { Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Register from './pages/Register'
import ProtectedRoute from './components/ProtectedRoute'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>

        <Route element={<ProtectedRoute />} >
          <Route path='/dashboard' element={<Dashboard/>}/>
        </Route>
      </Routes>
    </div>
  )
}

export default App