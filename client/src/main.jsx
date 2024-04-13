import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Layout from './Components/Layout'
import Home from './Components/Home'
import About from './Components/About'
import Login from './Components/user/Login'
import Cart from './Components/Cart'
import UserDashboard from './Components/user/dashboard'
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout/>}>
      <Route path='' element={<Home />}/>
      <Route path='about' element={<About />}/>
      <Route path='login' element={<Login />}/>
      <Route path='cart' element={<Cart />}/>
      <Route path='UserDashboard' element={<UserDashboard/>}/>
    </Route>
  )
)
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
)
