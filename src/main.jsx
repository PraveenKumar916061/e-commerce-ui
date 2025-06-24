import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './index.css'
import Login from './comps/Login.jsx'
import Register from './comps/Register.jsx'
import Dashboard from './comps/Dashboard.jsx'
import Products from './comps/Products.jsx'
import Orders from './comps/Orders.jsx'
import Inventory from './comps/Inventory.jsx'
import HomeContent from './comps/HomeContent.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path='/dashboard' element={<Dashboard/>}>
          <Route path="" element={<HomeContent/>}/>
          <Route path="products" element={<Products />} />
          <Route path="orders" element={<Orders />} />
          <Route path="inventory" element={<Inventory />} />
        </Route>
        
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)